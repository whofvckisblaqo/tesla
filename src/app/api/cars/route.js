export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const cars = await db
      .collection("cars")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const serialized = cars.map((c) => ({
      ...c,
      _id: c._id.toString(),
    }));

    return NextResponse.json({ cars: serialized });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      name, slug, tagline, description, price,
      category, images, specs, colors, features,
      inStock, featured,
    } = body;

    if (!name || !slug || !price) {
      return NextResponse.json(
        { message: "Name, slug and price are required" },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Check slug is unique
    const existing = await db.collection("cars").findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { message: "A car with this slug already exists" },
        { status: 400 }
      );
    }

    const car = {
      name,
      slug,
      tagline: tagline || "",
      description: description || "",
      price: Number(price),
      category: category || "sedan",
      images: images || [],
      specs: specs || {},
      colors: colors || [],
      features: features || [],
      inStock: inStock !== false,
      featured: featured || false,
      createdAt: new Date(),
    };

    const result = await db.collection("cars").insertOne(car);

    return NextResponse.json(
      { message: "Car created", carId: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { carId, ...updates } = body;

    if (!carId) {
      return NextResponse.json({ message: "Car ID required" }, { status: 400 });
    }

    const db = await getDb();
    await db.collection("cars").updateOne(
      { _id: new ObjectId(carId) },
      { $set: { ...updates, updatedAt: new Date() } }
    );

    return NextResponse.json({ message: "Car updated" });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const carId = searchParams.get("carId");

    if (!carId) {
      return NextResponse.json({ message: "Car ID required" }, { status: 400 });
    }

    const db = await getDb();
    await db.collection("cars").deleteOne({ _id: new ObjectId(carId) });

    return NextResponse.json({ message: "Car deleted" });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}