"use client";

import { useEffect, useState } from "react";

const slides = [
  {
    model: "Model S",
    tagline: "Plaid Performance",
    subtitle: "0–60 mph in 1.99s. The quickest production car ever made.",
    image: "https://images.unsplash.com/photo-1658030074520-74e1acd0865c?w=1600&q=80",
    accent: "#E31937",
    slug: "model-s",
  },
  {
    model: "Model 3",
    tagline: "Built for Everyday",
    subtitle: "Award-winning safety. Up to 358 miles of range.",
    image: "https://images.unsplash.com/photo-1685270386994-ae66d13d021e?w=1600&q=80",
    accent: "#3B82F6",
    slug: "model-3",
  },
  {
    model: "Cybertruck",
    tagline: "The Future of Utility",
    subtitle: "Exoskeleton body. 500+ miles range. Unmatched towing capacity.",
    image: "https://images.unsplash.com/photo-1705771801928-4fceafdd6e55?w=1600&q=80",
    accent: "#9CA3AF",
    slug: "cybertruck",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setAnimating(false);
      }, 400);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#000" }}>
      {/* Background Car Image */}
      <div
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${slide.image})`,
          backgroundSize: "cover", backgroundPosition: "center",
          opacity: animating ? 0 : 1,
          transition: "opacity 0.6s ease",
          filter: "brightness(0.35)",
        }}
      />
      {/* Gradient Overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #000 0%, transparent 50%, #00000088 100%)" }} />
      {/* Accent Glow */}
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 40% at 50% 70%, ${slide.accent}22 0%, transparent 70%)`, transition: "background 1s ease" }} />

      {/* Content */}
      <div
        style={{
          position: "relative", zIndex: 10, textAlign: "center",
          padding: "0 1.5rem", maxWidth: "60rem", margin: "0 auto",
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(20px)" : "translateY(0)",
          transition: "all 0.4s ease",
        }}
      >
        <div style={{ display: "inline-block", marginBottom: "1.5rem", padding: "0.375rem 1rem", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", border: `1px solid ${slide.accent}`, color: slide.accent }}>
          {slide.model}
        </div>

        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(3rem, 10vw, 7rem)", fontWeight: 900, textTransform: "uppercase", color: "#fff", lineHeight: 1, marginBottom: "1rem", textShadow: `0 0 80px ${slide.accent}44` }}>
          {slide.tagline}
        </h1>

        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "clamp(1rem, 2vw, 1.25rem)", maxWidth: "36rem", margin: "0 auto 2.5rem", fontWeight: 300, letterSpacing: "0.05em" }}>
          {slide.subtitle}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
          <a href={`/models/${slide.slug}`} style={{ padding: "1rem 2.5rem", fontWeight: 700, fontSize: "0.875rem", letterSpacing: "0.2em", textTransform: "uppercase", background: slide.accent, color: "#fff", textDecoration: "none" }}>
            Order Now
          </a>
          <a href={`/models/${slide.slug}`} style={{ padding: "1rem 2.5rem", fontWeight: 700, fontSize: "0.875rem", letterSpacing: "0.2em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", textDecoration: "none" }}>
            Learn More
          </a>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginTop: "4rem" }}>
          {slides.map((s, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? "2rem" : "0.5rem", height: "0.5rem", borderRadius: i === current ? "4px" : "50%", background: i === current ? slide.accent : "rgba(255,255,255,0.3)", border: "none", cursor: "pointer", transition: "all 0.3s ease", padding: 0 }} />
          ))}
        </div>
      </div>

      <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.3)" }}>
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Scroll</span>
        <div style={{ width: 1, height: "2.5rem", background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
      </div>
    </section>
  );
}