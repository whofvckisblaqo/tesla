export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const coupons = await db
      .collection("coupons")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const serialized = coupons.map((c) => ({
      ...c,
      _id: c._id.toString(),
    }));

    return NextResponse.json({ coupons: serialized });
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
    const { code, description, assignedTo, expiresAt } = body;

    if (!code) {
      return NextResponse.json(
        { message: "Coupon code is required" },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Check if code already exists
    const existing = await db
      .collection("coupons")
      .findOne({ code: code.toUpperCase() });

    if (existing) {
      return NextResponse.json(
        { message: "Coupon code already exists" },
        { status: 400 }
      );
    }

    const coupon = {
      code: code.toUpperCase().trim(),
      description: description || "Full payment coupon",
      assignedTo: assignedTo || null, // email of user it's for (null = anyone)
      discount: 100, // always 100% off
      type: "full_payment",
      used: false,
      usedBy: null,
      usedAt: null,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      createdAt: new Date(),
    };

    const result = await db.collection("coupons").insertOne(coupon);

    return NextResponse.json(
      { message: "Coupon created", coupon: { ...coupon, _id: result.insertedId.toString() } },
      { status: 201 }
    );
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
    await db.collection("coupons").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: "Coupon deleted" });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}