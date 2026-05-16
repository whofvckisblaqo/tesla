import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";

async function isAdmin() {
  const session = await getServerSession();
  return session?.user?.role === "admin";
}

export async function GET() {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const orders = await db
      .collection("orders")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    const serialized = orders.map((o) => ({
      ...o,
      _id: o._id.toString(),
    }));

    return NextResponse.json({ orders: serialized });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function PATCH(req) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    const db = await getDb();
    await db.collection("orders").updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status, updatedAt: new Date() } }
    );

    return NextResponse.json({ message: "Order updated" });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}