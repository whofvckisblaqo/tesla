export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("orderId");
    const email = searchParams.get("email");

    if (!orderId && !email) {
      return NextResponse.json(
        { message: "Order ID or email required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    let order = null;

    // Search by Order ID first
    if (orderId) {
      // Try full ID
      try {
        const cleanId = orderId.replace("#", "").trim();
        // Try searching by last 8 chars
        const orders = await db
          .collection("orders")
          .find({})
          .toArray();

        order = orders.find(
          (o) =>
            o._id.toString().slice(-8).toUpperCase() ===
            cleanId.toUpperCase()
        );

        // If not found by short ID, try full ObjectId
        if (!order && cleanId.length === 24) {
          order = await db
            .collection("orders")
            .findOne({ _id: new ObjectId(cleanId) });
        }
      } catch (err) {
        console.error("Order ID search error:", err);
      }
    }

    // If not found by ID, search by email
    if (!order && email) {
      order = await db
        .collection("orders")
        .findOne(
          { customerEmail: email.toLowerCase().trim() },
          { sort: { createdAt: -1 } }
        );
    }

    if (!order) {
      return NextResponse.json(
        { message: "No order found with those details" },
        { status: 404 }
      );
    }

    // Serialize
    const serialized = {
      ...order,
      _id: order._id.toString(),
    };

    return NextResponse.json({ order: serialized });
  } catch (err) {
    console.error("Track order error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to track order" },
      { status: 500 }
    );
  }
}