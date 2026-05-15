"use client";

import { useState } from "react";

const models = [
  {
    name: "Model S",
    slug: "model-s",
    tagline: "Plaid Performance",
    range: "405 mi",
    speed: "1.99s",
    topSpeed: "200 mph",
    price: "$74,990",
    color: "#E31937",
    image: "https://images.unsplash.com/photo-1658030074520-74e1acd0865c?w=800&q=80",
  },
  {
    name: "Model 3",
    slug: "model-3",
    tagline: "For Every Journey",
    range: "358 mi",
    speed: "3.1s",
    topSpeed: "162 mph",
    price: "$40,240",
    color: "#3B82F6",
    image: "https://images.unsplash.com/photo-1565789655460-5ba30acce4be?w=800&q=80",
  },
  {
    name: "Model X",
    slug: "model-x",
    tagline: "Maximum Versatility",
    range: "348 mi",
    speed: "2.5s",
    topSpeed: "163 mph",
    price: "$79,990",
    color: "#8B5CF6",
    // Model X — replace image URL with this confirmed Tesla Model X photo:
image: "https://images.pexels.com/photos/18978489/pexels-photo-18978489/free-photo-of-tesla-model-x-with-open-doors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
},
 
  {
    name: "Model Y",
    slug: "model-y",
    tagline: "Most Popular EV",
    range: "330 mi",
    speed: "3.5s",
    topSpeed: "155 mph",
    price: "$43,990",
    color: "#10B981",
    image: "https://images.unsplash.com/photo-1600661288038-cb63953bfc9f?w=800&q=80",
  },
  {
    name: "Cybertruck",
    slug: "cybertruck",
    tagline: "Built for the Future",
    range: "500+ mi",
    speed: "2.6s",
    topSpeed: "130 mph",
    price: "$49,890",
    color: "#9CA3AF",
    image: "https://images.unsplash.com/photo-1705771801928-4fceafdd6e55?w=800&q=80",
  },
];

function ModelCard({ model }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${model.color}11` : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}`,
        transition: "all 0.5s ease",
        overflow: "hidden",
        position: "relative",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Car Image */}
      <div
        style={{
          width: "100%", height: "200px",
          backgroundImage: `url(${model.image})`,
          backgroundSize: "cover", backgroundPosition: "center",
          filter: hovered ? "brightness(0.9)" : "brightness(0.6)",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "all 0.6s ease",
        }}
      />

      {/* Card Content */}
      <div style={{ padding: "1.5rem" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: model.color, marginBottom: "1rem" }} />
        <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.75rem", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "0.25rem" }}>
          {model.name}
        </h3>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
          {model.tagline}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", padding: "1.25rem 0", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: "1.5rem" }}>
          {[{ val: model.range, label: "Range" }, { val: model.speed, label: "0–60 mph" }, { val: model.topSpeed, label: "Top Speed" }].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>{s.val}</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.1em", marginTop: "0.25rem" }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.1em" }}>Starting at</p>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: "1.25rem" }}>{model.price}</p>
          </div>
          <a href={`/models/${model.slug}`} style={{ background: model.color, color: "#fff", padding: "0.625rem 1.5rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}>
            Order
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ModelsSection() {
  return (
    <section id="models" style={{ padding: "8rem 1.5rem", background: "#000" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Our Lineup</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>
            Choose Your Tesla
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
          {models.map((model) => (
            <ModelCard key={model.slug} model={model} />
          ))}

          {/* Roadster Teaser */}
          <div style={{ background: "rgba(227,25,55,0.05)", border: "1px solid rgba(227,25,55,0.2)", padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "300px" }}>
            <div>
              <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Coming Soon</p>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.75rem", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "0.5rem" }}>Roadster</h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem" }}>0–60 in 1.1 seconds</p>
            </div>
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "2rem" }}>Reserve Your Spot</p>
          </div>
        </div>
      </div>
    </section>
  );
}