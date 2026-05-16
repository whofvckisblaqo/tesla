"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import ReviewsSection from "@/components/shared/ReviewsSection";

const modelsData = {
  "model-s": {
    name: "Model S",
    tagline: "Plaid Performance",
    description:
      "Model S is built for speed and range, with beyond ludicrous acceleration, unparalleled performance and a refined design. It's the quickest production car ever made, capable of accelerating from 0 to 60 mph in as little as 1.99 seconds.",
    price: 74990,
    color: "#E31937",
    category: "sedan",
    images: [
      "https://images.unsplash.com/photo-1658030074520-74e1acd0865c?w=1600&q=80",
      "https://images.unsplash.com/photo-1630716059383-b3203bdda1e4?w=1600&q=80",
      "https://images.unsplash.com/photo-1562911791-b75a0f9c7f70?w=1600&q=80",
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
    features: [
      "Dual Motor All-Wheel Drive",
      "Autopilot Included",
      "17-Inch Cinematic Display",
      "Premium Audio System",
      "Over-the-Air Updates",
      "Glass Roof",
    ],
  },
  "model-3": {
    name: "Model 3",
    tagline: "For Every Journey",
    description:
      "Model 3 is a fully electric, mid-size sedan with impressive range and performance. Award-winning safety, long range and high performance with the style and technology of a premium vehicle.",
    price: 40240,
    color: "#3B82F6",
    category: "sedan",
    images: [
      "https://images.unsplash.com/photo-1565789655460-5ba30acce4be?w=1600&q=80",
      "https://images.unsplash.com/photo-1685270386994-ae66d13d021e?w=1600&q=80",
      "https://images.unsplash.com/photo-1555652736-e92021d28a10?w=1600&q=80",
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
    features: [
      "Dual Motor All-Wheel Drive",
      "Autopilot Included",
      "15.4-Inch Touchscreen",
      "Glass Roof",
      "Mobile App",
      "Over-the-Air Updates",
    ],
  },
  "model-x": {
    name: "Model X",
    tagline: "Maximum Versatility",
    description:
      "Model X is designed for the road ahead — built with best in class storage, seating for up to seven adults, and HEPA filtration. The falcon wing doors are unlike anything else on the road.",
    price: 79990,
    color: "#8B5CF6",
    category: "suv",
    images: [
      "https://images.pexels.com/photos/18978489/pexels-photo-18978489/free-photo-of-tesla-model-x-with-open-doors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      "https://images.unsplash.com/photo-1562911791-b75a0f9c7f70?w=1600&q=80",
      "https://images.unsplash.com/photo-1555652736-e92021d28a10?w=1600&q=80",
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
    features: [
      "Falcon Wing Doors",
      "HEPA Filtration System",
      "7-Seat Capacity",
      "Dual Motor AWD",
      "Tow Package Ready",
      "17-Inch Display",
    ],
  },
  "model-y": {
    name: "Model Y",
    tagline: "Most Popular EV",
    description:
      "Model Y is a fully electric, mid-size SUV with seating for up to seven and plenty of cargo space. The world's best-selling EV, loved for its versatility, safety, and long range.",
    price: 43990,
    color: "#10B981",
    category: "suv",
    images: [
      "https://images.unsplash.com/photo-1600661288038-cb63953bfc9f?w=1600&q=80",
      "https://images.unsplash.com/photo-1555652736-e92021d28a10?w=1600&q=80",
      "https://images.unsplash.com/photo-1562911791-b75a0f9c7f70?w=1600&q=80",
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
    features: [
      "7-Seat Option",
      "Dual Motor AWD",
      "Glass Roof",
      "15.4-Inch Display",
      "76 cu ft Cargo",
      "Autopilot Included",
    ],
  },
  cybertruck: {
    name: "Cybertruck",
    tagline: "Built for the Future",
    description:
      "Cybertruck is built on a platform of ultra-hard stainless steel exoskeleton for maximum durability and passenger protection. With incredible power and versatility, Cybertruck is the ultimate utility vehicle.",
    price: 49890,
    color: "#9CA3AF",
    category: "truck",
    images: [
      "https://images.unsplash.com/photo-1705771801928-4fceafdd6e55?w=1600&q=80",
      "https://images.unsplash.com/photo-1562911791-b75a0f9c7f70?w=1600&q=80",
      "https://images.unsplash.com/photo-1555652736-e92021d28a10?w=1600&q=80",
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
    features: [
      "Ultra-Hard Stainless Steel Body",
      "Adaptive Air Suspension",
      "Built-in 120V/240V Power",
      "Armor Glass",
      "On/Off-Road Capability",
      "18.5-Inch Display",
    ],
  },
};

export default function ModelDetailPage() {
  const { slug } = useParams();
  const model = modelsData[slug];
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!model) {
    return (
      <main style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Navbar />
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1.25rem", marginBottom: "1rem" }}>Model not found</p>
          <Link href="/models" style={{ color: "#E31937", textDecoration: "none", fontSize: "0.875rem", letterSpacing: "0.1em" }}>← Back to Models</Link>
        </div>
      </main>
    );
  }

  const totalPrice = model.price.toLocaleString("en-US");

  const handleOrder = () => {
    addToCart({
      slug,
      name: model.name,
      color: model.colors[selectedColor],
      price: model.price,
      image: model.images[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <style>{`
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }
        .specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1px;
          background: rgba(255,255,255,0.06);
        }
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1rem;
        }
        .related-grid {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .thumbnails-row {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .colors-row {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        @media (max-width: 768px) {
          .detail-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .specs-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (max-width: 480px) {
          .specs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <main style={{ background: "#000", minHeight: "100vh" }}>
        <Navbar />

        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: isMobile ? "6rem 1rem 4rem" : "8rem 1.5rem 6rem" }}>

          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2.5rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Home</Link>
            <span>/</span>
            <Link href="/models" style={{ color: "rgba(255,255,255,0.3)", textDecoration: "none" }}>Models</Link>
            <span>/</span>
            <span style={{ color: "#fff" }}>{model.name}</span>
          </div>

          {/* Main Grid */}
          <div className="detail-grid">

            {/* LEFT — Images */}
            <div>
              {/* Main Image */}
              <div style={{ width: "100%", height: isMobile ? "260px" : "420px", backgroundImage: `url(${model.images[selectedImage]})`, backgroundSize: "cover", backgroundPosition: "center", marginBottom: "1rem", border: "1px solid rgba(255,255,255,0.08)" }} />

              {/* Thumbnails */}
              <div className="thumbnails-row">
                {model.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    style={{ width: "70px", height: "52px", backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", border: `2px solid ${i === selectedImage ? model.color : "rgba(255,255,255,0.1)"}`, cursor: "pointer", padding: 0, opacity: i === selectedImage ? 1 : 0.5, transition: "all 0.2s ease", flexShrink: 0 }}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT — Details */}
            <div>
              <div style={{ marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: model.color }}>
                  {model.category}
                </span>
              </div>

              <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "0.5rem" }}>
                {model.name}
              </h1>

              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(0.875rem, 2vw, 1rem)", letterSpacing: "0.15em", marginBottom: "1.25rem" }}>
                {model.tagline}
              </p>

              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(0.8rem, 2vw, 0.875rem)", lineHeight: 1.8, marginBottom: "1.75rem" }}>
                {model.description}
              </p>

              {/* Quick Specs */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "1.75rem" }}>
                {[
                  { val: model.specs.range, label: "Range" },
                  { val: model.specs.acceleration, label: "0–60 mph" },
                  { val: model.specs.topSpeed, label: "Top Speed" },
                ].map((s) => (
                  <div key={s.label} style={{ textAlign: "center", padding: "1rem 0.5rem", background: "#000" }}>
                    <p style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(0.9rem, 2.5vw, 1.25rem)" }}>{s.val}</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.25rem" }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Color Selection */}
              <div style={{ marginBottom: "1.75rem" }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "0.75rem" }}>
                  Color — <span style={{ color: "#fff" }}>{model.colors[selectedColor]}</span>
                </p>
                <div className="colors-row">
                  {model.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(i)}
                      style={{ padding: "0.35rem 0.875rem", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", border: `1px solid ${i === selectedColor ? model.color : "rgba(255,255,255,0.15)"}`, background: i === selectedColor ? `${model.color}22` : "transparent", color: i === selectedColor ? "#fff" : "rgba(255,255,255,0.4)", cursor: "pointer", transition: "all 0.2s ease" }}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div style={{ padding: "1.25rem", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
                  <div>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Starting Price</p>
                    <p style={{ color: "#fff", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 800 }}>${totalPrice}</p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.1em" }}>Est. monthly</p>
                    <p style={{ color: model.color, fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)", fontWeight: 700 }}>
                      ${Math.round(model.price / 60).toLocaleString()}/mo
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button
                  onClick={handleOrder}
                  style={{ flex: 1, minWidth: "120px", padding: "0.875rem", background: added ? "#10B981" : model.color, color: "#fff", border: "none", fontSize: "clamp(0.75rem, 2vw, 0.875rem)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.3s" }}
                >
                  {added ? "Added to Cart ✓" : "Order Now"}
                </button>
                <button
                  style={{ flex: 1, minWidth: "120px", padding: "0.875rem", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", fontSize: "clamp(0.75rem, 2vw, 0.875rem)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}
                >
                  Test Drive
                </button>
              </div>
            </div>
          </div>

          {/* Full Specs */}
          <div style={{ marginTop: "5rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "3.5rem" }}>
            <p style={{ color: model.color, fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Specifications</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "2.5rem" }}>
              Full Specs
            </h2>
            <div className="specs-grid">
              {Object.entries(model.specs).map(([key, value]) => (
                <div key={key} style={{ padding: "1.25rem", background: "#000", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    {key === "acceleration" ? "0–60 mph" : key.replace(/([A-Z])/g, " $1").trim()}
                  </p>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", textAlign: "right" }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div style={{ marginTop: "4rem" }}>
            <p style={{ color: model.color, fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Included</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "2.5rem" }}>
              Key Features
            </h2>
            <div className="features-grid">
              {model.features.map((f, i) => (
                <div key={i} style={{ padding: "1.25rem", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: "1rem", background: "rgba(255,255,255,0.02)" }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: model.color, flexShrink: 0 }} />
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "clamp(0.8rem, 2vw, 0.875rem)", letterSpacing: "0.05em" }}>{f}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Related Models */}
          <div style={{ marginTop: "5rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "3.5rem" }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "1.75rem" }}>
              Explore Other Models
            </h2>
            <div className="related-grid">
              {Object.entries(modelsData)
                .filter(([s]) => s !== slug)
                .slice(0, 3)
                .map(([s, m]) => (
                  <Link
                    key={s}
                    href={`/models/${s}`}
                    style={{ flex: "1 1 180px", padding: "1.25rem", border: "1px solid rgba(255,255,255,0.08)", textDecoration: "none", background: "rgba(255,255,255,0.02)" }}
                  >
                    <p style={{ color: m.color, fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{m.category}</p>
                    <p style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)", fontFamily: "Georgia, serif", textTransform: "uppercase" }}>{m.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "0.25rem" }}>{m.tagline}</p>
                  </Link>
                ))}
            </div>
          </div>

          {/* Reviews */}
          <ReviewsSection
            slug={slug}
            modelName={model.name}
            accentColor={model.color}
          />

        </div>

        <Footer />
      </main>
    </>
  );
}