export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const seedCars = [
  {
    name: "Model S",
    slug: "model-s",
    tagline: "Plaid Performance",
    description: "Model S is built for speed and range, with beyond ludicrous acceleration, unparalleled performance and a refined design. It's the quickest production car ever made, capable of accelerating from 0 to 60 mph in as little as 1.99 seconds.",
    price: 74990,
    category: "sedan",
    images: [
      "https://images.unsplash.com/photo-1658030074520-74e1acd0865c?w=1600&q=80",
    ],
    specs: {
      range: "405 mi",
      topSpeed: "200 mph",
      acceleration: "1.99s",
      peakPower: "1,020 hp",
      drive: "AWD",
      seats: 5,
      cargo: "28 cu ft",
      display: '17" Cinematic',
      autopilot: "Standard",
      charging: "250 kW Max",
    },
    colors: ["Pearl White", "Solid Black", "Midnight Silver", "Deep Blue", "Ultra Red"],
    features: ["Dual Motor All-Wheel Drive", "Autopilot Included", "17-Inch Cinematic Display", "Premium Audio System", "Over-the-Air Updates", "Glass Roof"],
    inStock: true,
    featured: true,
    createdAt: new Date(),
  },
  {
    name: "Model 3",
    slug: "model-3",
    tagline: "For Every Journey",
    description: "Model 3 is a fully electric, mid-size sedan with impressive range and performance. Award-winning safety, long range and high performance with the style and technology of a premium vehicle.",
    price: 40240,
    category: "sedan",
    images: [
      "https://images.unsplash.com/photo-1565789655460-5ba30acce4be?w=1600&q=80",
    ],
    specs: {
      range: "358 mi",
      topSpeed: "162 mph",
      acceleration: "3.1s",
      peakPower: "480 hp",
      drive: "AWD",
      seats: 5,
      cargo: "23 cu ft",
      display: '15.4" Touch',
      autopilot: "Standard",
      charging: "170 kW Max",
    },
    colors: ["Pearl White", "Solid Black", "Midnight Silver", "Deep Blue", "Ultra Red"],
    features: ["Dual Motor All-Wheel Drive", "Autopilot Included", "15.4-Inch Touchscreen", "Glass Roof", "Mobile App", "Over-the-Air Updates"],
    inStock: true,
    featured: true,
    createdAt: new Date(),
  },
  {
    name: "Model X",
    slug: "model-x",
    tagline: "Maximum Versatility",
    description: "Model X is designed for the road ahead — built with best in class storage, seating for up to seven adults, and HEPA filtration. The falcon wing doors are unlike anything else on the road.",
    price: 79990,
    category: "suv",
    images: [
      "https://images.pexels.com/photos/18978489/pexels-photo-18978489/free-photo-of-tesla-model-x-with-open-doors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    ],
    specs: {
      range: "348 mi",
      topSpeed: "163 mph",
      acceleration: "2.5s",
      peakPower: "1,020 hp",
      drive: "AWD",
      seats: 7,
      cargo: "91 cu ft",
      display: '17" Cinematic',
      autopilot: "Standard",
      charging: "250 kW Max",
    },
    colors: ["Pearl White", "Solid Black", "Midnight Silver", "Deep Blue", "Ultra Red"],
    features: ["Falcon Wing Doors", "HEPA Filtration System", "7-Seat Capacity", "Dual Motor AWD", "Tow Package Ready", "17-Inch Display"],
    inStock: true,
    featured: false,
    createdAt: new Date(),
  },
  {
    name: "Model Y",
    slug: "model-y",
    tagline: "Most Popular EV",
    description: "Model Y is a fully electric, mid-size SUV with seating for up to seven and plenty of cargo space. The world's best-selling EV, loved for its versatility, safety, and long range.",
    price: 43990,
    category: "suv",
    images: [
      "https://images.unsplash.com/photo-1600661288038-cb63953bfc9f?w=1600&q=80",
    ],
    specs: {
      range: "330 mi",
      topSpeed: "155 mph",
      acceleration: "3.5s",
      peakPower: "456 hp",
      drive: "AWD",
      seats: 7,
      cargo: "76 cu ft",
      display: '15.4" Touch',
      autopilot: "Standard",
      charging: "250 kW Max",
    },
    colors: ["Pearl White", "Solid Black", "Midnight Silver", "Deep Blue", "Ultra Red"],
    features: ["7-Seat Option", "Dual Motor AWD", "Glass Roof", "15.4-Inch Display", "76 cu ft Cargo", "Autopilot Included"],
    inStock: true,
    featured: true,
    createdAt: new Date(),
  },
  {
    name: "Cybertruck",
    slug: "cybertruck",
    tagline: "Built for the Future",
    description: "Cybertruck is built on a platform of ultra-hard stainless steel exoskeleton for maximum durability and passenger protection. With incredible power and versatility, Cybertruck is the ultimate utility vehicle.",
    price: 49890,
    category: "truck",
    images: [
      "https://images.unsplash.com/photo-1705771801928-4fceafdd6e55?w=1600&q=80",
    ],
    specs: {
      range: "500+ mi",
      topSpeed: "130 mph",
      acceleration: "2.6s",
      peakPower: "845 hp",
      drive: "AWD",
      seats: 6,
      cargo: "123 cu ft",
      display: '18.5" Touch',
      autopilot: "Standard",
      charging: "350 kW Max",
    },
    colors: ["Stainless Steel", "Matte Black Wrap", "Satin White Wrap"],
    features: ["Ultra-Hard Stainless Steel Body", "Adaptive Air Suspension", "Built-in 120V/240V Power", "Armor Glass", "On/Off-Road Capability", "18.5-Inch Display"],
    inStock: true,
    featured: true,
    createdAt: new Date(),
  },
];

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const db = await getDb();
    await db.collection("cars").deleteMany({});
    await db.collection("cars").insertMany(seedCars);

    return NextResponse.json({
      message: `Successfully seeded ${seedCars.length} cars`,
    });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}