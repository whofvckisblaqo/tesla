export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ message: "Slug required" }, { status: 400 });
    }

    const db = await getDb();
    const reviews = await db
      .collection("reviews")
      .find({ slug })
      .sort({ createdAt: -1 })
      .toArray();

    const serialized = reviews.map((r) => ({
      ...r,
      _id: r._id.toString(),
    }));

    return NextResponse.json({ reviews: serialized });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { message: "You must be logged in to leave a review" },
        { status: 401 }
      );
    }

    const { slug, rating, comment, modelName } = await req.json();

    if (!slug || !rating || !comment) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { message: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    if (comment.trim().length < 10) {
      return NextResponse.json(
        { message: "Review must be at least 10 characters" },
        { status: 400 }
      );
    }

    const db = await getDb();

    // Check if user already reviewed this model
    const existing = await db.collection("reviews").findOne({
      slug,
      userEmail: session.user.email,
    });

    if (existing) {
      return NextResponse.json(
        { message: "You have already reviewed this model" },
        { status: 400 }
      );
    }

    const review = {
      slug,
      modelName,
      rating: Number(rating),
      comment: comment.trim(),
      userName: session.user.name,
      userEmail: session.user.email,
      createdAt: new Date(),
    };

    const result = await db.collection("reviews").insertOne(review);

    return NextResponse.json(
      {
        message: "Review submitted successfully",
        review: { ...review, _id: result.insertedId.toString() },
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}