export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const seedAccessories = [
  { name: "Wall Connector", category: "charging", price: 475, description: "The fastest charging option for your home. Delivers up to 44 miles of range per hour of charge.", image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80", specs: ["Up to 44 mi/hr", "Wi-Fi enabled", "24ft cable", "Indoor/Outdoor"], badge: "Best Seller", inStock: true },
  { name: "Mobile Connector", category: "charging", price: 230, description: "Charge from any outlet with the most versatile home charging solution for your Tesla.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", specs: ["Works with any outlet", "20ft cable", "Multiple adapters", "Portable"], badge: "", inStock: true },
  { name: "Portable Charger Bundle", category: "charging", price: 350, description: "Everything you need to charge at home or on the road. Includes multiple adapters.", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80", specs: ["Multiple adapters", "Carry case included", "Fast charge", "Universal"], badge: "New", inStock: true },
  { name: "Cybertruck Bed Liner", category: "vehicle", price: 300, description: "Custom-fit bed liner for the Cybertruck vault. Protects against scratches and damage.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", specs: ["Custom fit", "Heavy duty", "Easy install", "Cybertruck only"], badge: "", inStock: true },
  { name: "All-Weather Floor Mats", category: "vehicle", price: 225, description: "Premium all-weather floor mats designed to fit every Tesla model perfectly.", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80", specs: ["All-weather", "Custom fit", "Easy clean", "All models"], badge: "", inStock: true },
  { name: "Roof Rack System", category: "vehicle", price: 485, description: "Expand your cargo capacity with the Tesla roof rack system.", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80", specs: ["165 lbs capacity", "Aerodynamic", "Tool-free install", "Model X/Y"], badge: "", inStock: true },
  { name: "Wireless Phone Charger", category: "lifestyle", price: 95, description: "Dual wireless charging pad designed specifically for Tesla center consoles.", image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80", specs: ["Dual charging", "15W fast charge", "Auto-grip", "All Teslas"], badge: "Popular", inStock: true },
  { name: "Tesla Tote Bag", category: "lifestyle", price: 45, description: "Premium canvas tote bag with Tesla branding. Perfect for everyday use.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80", specs: ["Canvas material", "Large capacity", "Interior pocket", "Branded"], badge: "", inStock: true },
  { name: "Tesla Cap", category: "apparel", price: 35, description: "Structured cap with embroidered Tesla logo. One size fits most.", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80", specs: ["Adjustable strap", "Embroidered logo", "One size fits most", "Multiple colors"], badge: "", inStock: true },
  { name: "Tesla Lightweight Jacket", category: "apparel", price: 195, description: "Water-resistant lightweight jacket with Tesla branding. Perfect for any weather.", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80", specs: ["Water resistant", "Lightweight", "Multiple pockets", "S-XXL"], badge: "New", inStock: true },
  { name: "DashCam Viewer", category: "lifestyle", price: 55, description: "View and manage your Tesla dashcam footage easily with this compact viewer.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", specs: ["HD playback", "USB-C", "Compact", "All Teslas"], badge: "", inStock: true },
  { name: "Tesla Key Card (2 Pack)", category: "vehicle", price: 35, description: "Backup key cards for your Tesla. Tap to lock, unlock and start your car.", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", specs: ["2 cards included", "Tap to unlock", "Slim design", "All models"], badge: "", inStock: true },
];

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    await db.collection("accessories").deleteMany({});
    await db.collection("accessories").insertMany(
      seedAccessories.map((a) => ({ ...a, createdAt: new Date() }))
    );

    return NextResponse.json({
      message: `Successfully seeded ${seedAccessories.length} accessories`,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}