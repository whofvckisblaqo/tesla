export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const db = await getDb();
    const accessories = await db
      .collection("accessories")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const serialized = accessories.map((a) => ({
      ...a,
      _id: a._id.toString(),
    }));

    return NextResponse.json({ accessories: serialized });
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
    const { name, category, price, description, image, specs, badge, inStock } = body;

    if (!name || !price) {
      return NextResponse.json(
        { message: "Name and price are required" },
        { status: 400 }
      );
    }

    const db = await getDb();

    const accessory = {
      name,
      category: category || "lifestyle",
      price: Number(price),
      description: description || "",
      image: image || "",
      specs: specs || [],
      badge: badge || "",
      inStock: inStock !== false,
      createdAt: new Date(),
    };

    const result = await db.collection("accessories").insertOne(accessory);

    return NextResponse.json(
      { message: "Accessory created", id: result.insertedId.toString() },
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
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ message: "ID required" }, { status: 400 });
    }

    const db = await getDb();
    await db.collection("accessories").updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...updates, updatedAt: new Date() } }
    );

    return NextResponse.json({ message: "Accessory updated" });
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
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID required" }, { status: 400 });
    }

    const db = await getDb();
    await db.collection("accessories").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: "Accessory deleted" });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}