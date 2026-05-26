export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

const defaultReviews = [
  // Model S
  {
    slug: "model-s",
    modelName: "Model S",
    rating: 5,
    comment: "Ludicrous Mode is everything. I've owned performance cars my whole life and nothing comes close to the instantaneous torque of the Model S Plaid. Zero to 60 in under 2 seconds feels like a roller coaster every single time. The interior is luxurious, the autopilot is genuinely impressive, and I've saved a fortune on gas.",
    userName: "James R.",
    userEmail: "seed_james@reviews.internal",
  },
  {
    slug: "model-s",
    modelName: "Model S",
    rating: 5,
    comment: "I traded in my Mercedes S-Class for the Model S and I have zero regrets. The over-the-air updates keep making it better — features I didn't have at purchase just appeared one morning. The range on a single charge easily covers my daily commute plus weekend trips. Charging at home overnight is so convenient I barely notice the cost.",
    userName: "Patricia W.",
    userEmail: "seed_patricia@reviews.internal",
  },
  {
    slug: "model-s",
    modelName: "Model S",
    rating: 4,
    comment: "Absolutely stunning car. The 17-inch touchscreen controls everything which takes some getting used to, but once you learn the layout it's intuitive. Road trips with the Supercharger network are stress-free. The only reason I'm not giving 5 stars is the wait time I had for delivery.",
    userName: "Marcus T.",
    userEmail: "seed_marcus@reviews.internal",
  },
  {
    slug: "model-s",
    modelName: "Model S",
    rating: 5,
    comment: "Best car I have ever owned. Period. The Plaid's tri-motor setup is unreal — I drove it on a track day and left every ICE car in the dust. The 405-mile range means I almost never worry about charging. Tesla's service has been fantastic for the two years I've owned it.",
    userName: "Diana K.",
    userEmail: "seed_diana@reviews.internal",
  },

  // Model 3
  {
    slug: "model-3",
    modelName: "Model 3",
    rating: 5,
    comment: "Best value car I've ever owned by a mile. The Model 3 is everything the hype promised — sharp handling, quick acceleration, and a cabin that feels premium without the premium price tag. I charge at home every night and my monthly fuel cost dropped from $250 to less than $30. The autopilot on highway drives is genuinely life-changing.",
    userName: "Carlos M.",
    userEmail: "seed_carlos@reviews.internal",
  },
  {
    slug: "model-3",
    modelName: "Model 3",
    rating: 5,
    comment: "First EV and I will never go back to combustion. The minimalist interior looks stunning and the 15-inch screen handles navigation, music, and climate effortlessly. I've done three road trips across state lines using Superchargers and the routing was flawless every time. Highly recommend to anyone on the fence.",
    userName: "Sophie L.",
    userEmail: "seed_sophie@reviews.internal",
  },
  {
    slug: "model-3",
    modelName: "Model 3",
    rating: 4,
    comment: "After 18 months of ownership I can confidently say this is the most fun car I've driven. The rear-wheel drive in Performance mode is just silly fast for the price. The mobile app is excellent — I pre-heat the car on cold mornings without leaving the house. Minor quibble: the trunk opening is a little small for larger items.",
    userName: "Nathan B.",
    userEmail: "seed_nathan@reviews.internal",
  },
  {
    slug: "model-3",
    modelName: "Model S",
    rating: 5,
    comment: "Tesla completely changed my view of what a car can be. Software updates have added new features, improved range estimates, and fixed minor bugs over the two years I've owned this. The build quality is solid and the safety ratings are the best in class. If you're hesitating, just buy it.",
    userName: "Amelia H.",
    userEmail: "seed_amelia@reviews.internal",
  },

  // Model X
  {
    slug: "model-x",
    modelName: "Model X",
    rating: 5,
    comment: "The falcon wing doors changed our lives. Loading two car seats in a packed parking lot used to be a nightmare — now it's effortless. The Model X has seating for seven, a massive cargo area, and still does 0-60 in under 3.5 seconds. The HEPA air filtration is a real feature my family with allergies truly appreciates.",
    userName: "Rebecca S.",
    userEmail: "seed_rebecca@reviews.internal",
  },
  {
    slug: "model-x",
    modelName: "Model X",
    rating: 5,
    comment: "Upgraded from a Range Rover and the difference is night and day. The Model X is quieter, faster, safer, and costs a fraction to run. The Bioweapon Defense Mode actually cleaned the air during wildfire season — I could smell the smoke outside while the cabin stayed fresh. Remarkable machine.",
    userName: "David C.",
    userEmail: "seed_david@reviews.internal",
  },
  {
    slug: "model-x",
    modelName: "Model X",
    rating: 4,
    comment: "Took delivery of our Model X six months ago and the whole family loves it. Third-row seating is genuinely usable for adults unlike most SUVs. The panoramic windshield gives an amazing view. Autopilot on long road trips is outstanding. Docking one star only because the falcon wing doors occasionally need recalibration in very tight garages.",
    userName: "Linda F.",
    userEmail: "seed_linda@reviews.internal",
  },

  // Model Y
  {
    slug: "model-y",
    modelName: "Model Y",
    rating: 5,
    comment: "Perfect family car. The cargo space with the rear seats folded is enormous — we moved half our apartment in it. Kids love the back seat screen and the built-in games. The range on our Long Range version easily handles our weekly driving with charge to spare. We charge overnight at home and the running cost is a fraction of our old minivan.",
    userName: "Tom P.",
    userEmail: "seed_tom@reviews.internal",
  },
  {
    slug: "model-y",
    modelName: "Model Y",
    rating: 5,
    comment: "Best selling car in the world for a reason. The Model Y does everything well — it's fast, practical, safe, and cheap to run. The interior is clean and modern, the seats are comfortable on long drives, and the over-the-air updates keep improving it. We went from one Tesla to two in our household after just six months.",
    userName: "Grace N.",
    userEmail: "seed_grace@reviews.internal",
  },
  {
    slug: "model-y",
    modelName: "Model Y",
    rating: 4,
    comment: "Couldn't be happier with our Model Y. We road-tripped 2,000 miles last summer using the Supercharger network and it was seamless — the navigation automatically routes through chargers and calculates arrival battery level. Great visibility, comfortable seats, and the kids' camp mode is perfect for overnight stops.",
    userName: "Kevin O.",
    userEmail: "seed_kevin@reviews.internal",
  },
  {
    slug: "model-y",
    modelName: "Model Y",
    rating: 5,
    comment: "We downsized from a large SUV and actually have more usable space in the Model Y thanks to the frunk and flat cargo floor. The Performance version is genuinely quick and handles like a sports car despite the high seating position. Autopilot on daily highway commutes has reduced my stress immensely.",
    userName: "Susan A.",
    userEmail: "seed_susan@reviews.internal",
  },

  // Cybertruck
  {
    slug: "cybertruck",
    modelName: "Cybertruck",
    rating: 5,
    comment: "Absolutely turns heads everywhere I go. I've owned trucks my whole career and the Cybertruck redefines what a truck can do. The air suspension handles any terrain I've thrown at it, the tow rating is class-leading, and it's the quickest truck I've ever driven. The stainless steel body is a conversation starter at every gas station — well, Supercharger.",
    userName: "Ryan J.",
    userEmail: "seed_ryan@reviews.internal",
  },
  {
    slug: "cybertruck",
    modelName: "Cybertruck",
    rating: 5,
    comment: "I was skeptical about the design but seeing it in person is a different experience. The Cybertruck is genuinely huge and capable — I've used the power outlets on job sites instead of hauling a generator. The vault bed with the motorized tonneau cover is brilliant. The range is excellent for a truck of this size. Zero maintenance headaches so far.",
    userName: "Chris D.",
    userEmail: "seed_chris@reviews.internal",
  },
  {
    slug: "cybertruck",
    modelName: "Cybertruck",
    rating: 4,
    comment: "Switched from a F-150 Lightning and the Cybertruck is a step up in every measurable way. Faster, longer range, more towing capacity. The exoskeleton design is polarizing but I love it — nothing else looks like this on the road. The ultra-hard stainless steel feels indestructible. Only giving 4 stars because some software features are still rolling out.",
    userName: "Michelle V.",
    userEmail: "seed_michelle@reviews.internal",
  },
];

export async function GET() {
  try {
    const db = await getDb();
    const existing = await db.collection("reviews").countDocuments({ userEmail: { $regex: "seed_" } });

    if (existing > 0) {
      return NextResponse.json({ message: `${existing} seed reviews already exist.` });
    }

    const now = new Date();
    const reviews = defaultReviews.map((r, i) => ({
      ...r,
      createdAt: new Date(now.getTime() - i * 86400000 * 3),
    }));

    await db.collection("reviews").insertMany(reviews);
    return NextResponse.json({ message: `${reviews.length} reviews seeded successfully across all models!` });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
