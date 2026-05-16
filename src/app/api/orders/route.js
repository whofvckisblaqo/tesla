export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  sendOrderConfirmationEmail,
  sendAdminNotificationEmail,
} from "@/lib/emails";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();

    const {
      items,
      totalPrice,
      downPayment,
      monthlyPayment,
      loanTerm,
      interestRate,
      address,
      city,
      country,
      phone,
      name,
      email,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ message: "No items in order" }, { status: 400 });
    }

    if (!email || !name) {
      return NextResponse.json({ message: "Name and email are required" }, { status: 400 });
    }

    const db = await getDb();

    const order = {
      userId: session?.user?.id || null,
      customerName: name,
      customerEmail: email,
      customerPhone: phone || "",
      items: items.map((item) => ({
        slug: item.slug,
        name: item.name,
        color: item.color,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      totalPrice: Number(totalPrice) || 0,
      downPayment: Number(downPayment) || 0,
      monthlyPayment: Number(monthlyPayment) || 0,
      loanTerm: Number(loanTerm) || 0,
      interestRate: Number(interestRate) || 0,
      status: "pending_payment",
      address: address || "",
      city: city || "",
      country: country || "",
      createdAt: new Date(),
    };

    const result = await db.collection("orders").insertOne(order);
    const savedOrder = { ...order, _id: result.insertedId };

    // Send emails
    try {
      await sendOrderConfirmationEmail({ order: savedOrder });
      await sendAdminNotificationEmail({ order: savedOrder });
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr);
      // Don't fail the order if email fails
    }

    return NextResponse.json(
      { message: "Order received", orderId: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (err) {
    console.error("Order error:", err);
    return NextResponse.json(
      { message: err.message || "Order failed" },
      { status: 500 }
    );
  }
}