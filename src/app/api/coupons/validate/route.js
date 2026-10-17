export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function POST(req) {
  try {
    const { code, email } = await req.json();

    if (!code) {
      return NextResponse.json(
        { message: "Coupon code is required" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const coupon = await db
      .collection("coupons")
      .findOne({ code: code.toUpperCase().trim() });

    if (!coupon) {
      return NextResponse.json(
        { valid: false, message: "Invalid coupon code" },
        { status: 200 }
      );
    }

    if (coupon.used) {
      return NextResponse.json(
        { valid: false, message: "This coupon has already been used" },
        { status: 200 }
      );
    }

    if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
      return NextResponse.json(
        { valid: false, message: "This coupon has expired" },
        { status: 200 }
      );
    }

    if (coupon.assignedTo && coupon.assignedTo !== email) {
      return NextResponse.json(
        { valid: false, message: "This coupon is not assigned to your account" },
        { status: 200 }
      );
    }

    return NextResponse.json({
      valid: true,
      coupon: {
        _id: coupon._id.toString(),
        code: coupon.code,
        description: coupon.description,
        discount: coupon.discount,
        type: coupon.type,
      },
      message: "Coupon applied! Full payment covered.",
    });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}