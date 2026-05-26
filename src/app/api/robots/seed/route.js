export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

const defaultRobots = [
  {
    name: "Optimus Gen 2 Home",
    category: "home",
    price: 19999,
    description:
      "The home companion robot. Handles household chores, groceries, laundry, and daily repetitive tasks. Designed for seamless integration into modern homes.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    specs: ["5'8\" height", "~57 lbs", "22 DOF hands", "8hr battery", "Wi-Fi & BT 5.0", "4K vision"],
    badge: "Best Seller",
    inStock: true,
  },
  {
    name: "Optimus Gen 2 Pro",
    category: "professional",
    price: 29999,
    description:
      "Built for professional environments. Enhanced dexterity for precision tasks, stronger actuators for carrying loads up to 45 lbs, and advanced object recognition.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
    specs: ["5'8\" height", "~57 lbs", "45 lb carry", "12hr battery", "5G enabled", "LiDAR + 4K"],
    badge: "New",
    inStock: true,
  },
  {
    name: "Optimus Gen 2 Industrial",
    category: "industrial",
    price: 49999,
    description:
      "Purpose-built for factory and warehouse environments. High-endurance actuators, ruggedized frame, and real-time coordination with Tesla's fleet management platform.",
    image: "https://images.unsplash.com/photo-1563207153-f403bf289096?w=800&q=80",
    specs: ["6'0\" height", "~72 lbs", "90 lb carry", "20hr battery", "Fleet API", "Dust/water resistant"],
    badge: "Popular",
    inStock: true,
  },
  {
    name: "Optimus Gen 2 Research",
    category: "research",
    price: 39999,
    description:
      "Full SDK access and open hardware interfaces for robotics research teams. Ships with simulation environment, ROS2 support, and direct neural network access.",
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&q=80",
    specs: ["Full SDK", "ROS2 support", "Open hardware API", "Sim environment", "Neural net access", "12hr battery"],
    badge: "",
    inStock: true,
  },
  {
    name: "Optimus Gen 1 Refurbished",
    category: "home",
    price: 12999,
    description:
      "Certified refurbished Gen 1 unit. Fully tested, reconditioned, and updated to the latest firmware. Ideal entry point into the Optimus ecosystem.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    specs: ["5'8\" height", "~57 lbs", "20 DOF hands", "6hr battery", "Certified refurb", "1yr warranty"],
    badge: "Value",
    inStock: true,
  },
  {
    name: "Optimus Care Edition",
    category: "home",
    price: 24999,
    description:
      "Specialized for elder care and assisted living. Equipped with health monitoring sensors, fall detection, medication reminders, and emergency contact protocols.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    specs: ["Health sensors", "Fall detection", "Medication alerts", "Emergency SOS", "HIPAA compliant", "8hr battery"],
    badge: "Limited",
    inStock: false,
  },
];

export async function GET() {
  try {
    const db = await getDb();
    const existing = await db.collection("robots").countDocuments();

    if (existing > 0) {
      return NextResponse.json({ message: `Database already has ${existing} robots. Drop and re-seed if needed.` });
    }

    const now = new Date();
    const robots = defaultRobots.map((r) => ({ ...r, createdAt: now }));
    await db.collection("robots").insertMany(robots);

    return NextResponse.json({ message: `${robots.length} Optimus robots seeded successfully!` });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
