import { getDb } from "./db";
import bcrypt from "bcryptjs";

export async function getUserByEmail(email) {
  const db = await getDb();
  return await db.collection("users").findOne({ email });
}

export async function createUser({ name, email, password }) {
  const db = await getDb();
  const existing = await db.collection("users").findOne({ email });
  if (existing) throw new Error("Email already in use");

  const hashed = await bcrypt.hash(password, 12);
  const result = await db.collection("users").insertOne({
    name,
    email,
    password: hashed,
    role: "user",
    createdAt: new Date(),
  });

  return { id: result.insertedId.toString(), name, email, role: "user" };
}