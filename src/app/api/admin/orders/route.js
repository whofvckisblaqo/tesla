export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId } from "mongodb";
import { sendOrderStatusEmail } from "@/lib/emails";

async function isAdmin() {
  const session = await getServerSession(authOptions);
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
    console.error("Admin orders GET error:", err);
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
      return NextResponse.json(
        { message: "Missing orderId or status" },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Get order before updating to get customer email
    const order = await db
      .collection("orders")
      .findOne({ _id: new ObjectId(orderId) });

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    // Update status
    await db.collection("orders").updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { status, updatedAt: new Date() } }
    );

    // Send email notification to customer
    try {
      await sendOrderStatusEmail({
        order: { ...order, _id: order._id.toString() },
        newStatus: status,
      });
    } catch (emailErr) {
      console.error("Status email failed:", emailErr);
      // Don't fail the update if email fails
    }

    return NextResponse.json({ message: "Order updated successfully" });
  } catch (err) {
    console.error("Admin orders PATCH error:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}