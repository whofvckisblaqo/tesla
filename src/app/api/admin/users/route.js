import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session?.user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    const users = await db
      .collection("users")
      .find({}, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    const serialized = users.map((u) => ({
      ...u,
      _id: u._id.toString(),
    }));

    return NextResponse.json({ users: serialized });
  } catch (err) {
    console.error("Admin users GET error:", err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}