import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();

    const orders = await db
      .collection("orders")
      .find({ customerEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    const serialized = orders.map((order) => ({
      ...order,
      _id: order._id.toString(),
    }));

    return NextResponse.json({ orders: serialized }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: err.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}