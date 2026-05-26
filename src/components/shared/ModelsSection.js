"use client";

import { useState, useEffect } from "react";

function ModelCard({ model }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? `${model.color || "#E31937"}11` : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}`,
        transition: "all 0.5s ease",
        overflow: "hidden",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Image */}
      <div style={{ width: "100%", height: "clamp(140px, 25vw, 200px)", backgroundImage: model.images?.[0] ? `url(${model.images[0]})` : "none", backgroundSize: "cover", backgroundPosition: "center", backgroundColor: "rgba(255,255,255,0.04)", filter: hovered ? "brightness(0.9)" : "brightness(0.6)", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "all 0.6s ease" }} />

      {/* Content */}
      <div style={{ padding: "clamp(1rem, 3vw, 1.5rem)" }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: model.color || "#E31937", marginBottom: "0.875rem" }} />
        <h3 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.25rem, 4vw, 1.75rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "0.25rem" }}>
          {model.name}
        </h3>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(0.7rem, 2vw, 0.875rem)", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>
          {model.tagline}
        </p>

        {/* Specs */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", padding: "1rem 0", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)", marginBottom: "1.25rem" }}>
          {[{ val: model.specs?.range, label: "Range" }, { val: model.specs?.acceleration, label: "0–60" }, { val: model.specs?.topSpeed, label: "Top Spd" }].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(0.75rem, 2.5vw, 1rem)" }}>{s.val || "—"}</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(0.55rem, 1.5vw, 0.65rem)", letterSpacing: "0.08em", marginTop: "0.2rem" }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.6rem", letterSpacing: "0.1em" }}>Starting at</p>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(1rem, 3vw, 1.25rem)" }}>${model.price?.toLocaleString()}</p>
          </div>
          <a href={`/models/${model.slug}`} style={{ background: model.color || "#E31937", color: "#fff", padding: "0.5rem 1.25rem", fontSize: "clamp(0.65rem, 2vw, 0.75rem)", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", whiteSpace: "nowrap" }}>
            Order
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ModelsSection() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch("/api/cars")
      .then((r) => r.json())
      .then((data) => setModels((data.cars || []).filter((c) => c.featured)))
      .catch(() => {});
  }, []);

  return (
    <>
      <style>{`
        .models-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.25rem;
        }
        @media (max-width: 640px) {
          .models-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .models-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <section id="models" style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 4vw, 1.5rem)", background: "#000" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 6vw, 5rem)" }}>
            <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Our Lineup</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 7vw, 4.5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>
              Choose Your Tesla
            </h2>
          </div>

          <div className="models-grid">
            {models.map((model) => (
              <ModelCard key={model._id || model.slug} model={model} />
            ))}

            {/* Roadster Teaser */}
            <div style={{ background: "rgba(227,25,55,0.05)", border: "1px solid rgba(227,25,55,0.2)", padding: "clamp(1.25rem, 4vw, 2rem)", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "200px" }}>
              <div>
                <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Coming Soon</p>
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.25rem, 4vw, 1.75rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "0.5rem" }}>Roadster</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem" }}>0–60 in 1.1 seconds</p>
              </div>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "1.5rem" }}>Reserve Your Spot</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
