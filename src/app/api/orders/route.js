import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";

export async function POST(req) {
  try {
    const session = await getServerSession();
    const body = await req.json();

    const {
      items, totalPrice, downPayment, monthlyPayment,
      loanTerm, interestRate,
      address, city, country, phone, name, email,
    } = body;

    if (!items || !email) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const db = await getDb();

    const order = {
      userId: session?.user?.id || null,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      items,
      totalPrice,
      downPayment,
      monthlyPayment: monthlyPayment || 0,
      loanTerm: loanTerm || 0,
      interestRate: interestRate || 0,
      status: "pending_payment",
      address,
      city,
      country,
      createdAt: new Date(),
    };

    const result = await db.collection("orders").insertOne(order);

    return NextResponse.json(
      { message: "Order received", orderId: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: err.message || "Order failed" },
      { status: 500 }
    );
  }
}