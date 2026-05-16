"use client";

import { useState } from "react";

const features = [
  { icon: "⚡", title: "Ludicrous Speed", desc: "Go from 0 to 60 mph in under 2 seconds. The most exhilarating acceleration ever engineered." },
  { icon: "🛡️", title: "Safest Cars Ever", desc: "All Tesla models receive top safety ratings. Rigid body structure and side-impact protection." },
  { icon: "🌍", title: "Longest Range", desc: "Drive up to 405 miles on a single charge. Supercharge to 80% in just 25 minutes." },
  { icon: "🤖", title: "Autopilot", desc: "Advanced safety and convenience features. Full Self-Driving capability available on all new vehicles." },
  { icon: "📱", title: "Over-the-Air Updates", desc: "Your car improves over time with regular software updates adding new features and performance." },
  { icon: "🔊", title: "Immersive Sound", desc: "Premium audio system with up to 22 speakers, active noise cancellation, and spatial audio." },
];

function FeatureCard({ f }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? "rgba(255,255,255,0.05)" : "#050505", padding: "clamp(1.5rem, 4vw, 2.5rem)", transition: "all 0.3s ease", cursor: "default" }}
    >
      <div style={{ fontSize: "clamp(1.75rem, 5vw, 2.5rem)", marginBottom: "1.25rem" }}>{f.icon}</div>
      <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(0.95rem, 2.5vw, 1.25rem)", marginBottom: "0.75rem", letterSpacing: "0.05em" }}>{f.title}</h3>
      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(0.78rem, 2vw, 0.875rem)", lineHeight: 1.7 }}>{f.desc}</p>
      <div style={{ marginTop: "1.25rem", height: 1, background: "#E31937", width: hovered ? "3rem" : "0px", transition: "width 0.5s ease" }} />
    </div>
  );
}

export default function FeaturesSection() {
  return (
    <>
      <style>{`
        .features-grid {
          display: grid;
          gap: 1px;
          background: rgba(255,255,255,0.05);
          grid-template-columns: repeat(3, 1fr);
        }
        .stats-grid {
          display: grid;
          gap: 1px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.05);
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 480px) {
          .features-grid {
            grid-template-columns: 1fr;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>

      <section id="features" style={{ padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 4vw, 1.5rem)", background: "#050505" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem, 6vw, 5rem)" }}>
            <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Why Tesla</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 7vw, 4.5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>
              Beyond Electric
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "1.25rem", maxWidth: "40rem", margin: "1.25rem auto 0", fontSize: "clamp(0.875rem, 2.5vw, 1.125rem)", fontWeight: 300, padding: "0 0.5rem" }}>
              Tesla is more than a car company. We&apos;re accelerating the world&apos;s transition to sustainable energy.
            </p>
          </div>

          {/* Features Grid */}
          <div className="features-grid">
            {features.map((f, i) => <FeatureCard key={i} f={f} />)}
          </div>

          {/* Stats */}
          <div className="stats-grid" style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}>
            {[
              { value: "5M+", label: "Cars Delivered" },
              { value: "45,000+", label: "Superchargers" },
              { value: "99%", label: "Satisfaction" },
              { value: "#1", label: "EV Manufacturer" },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: "center", padding: "clamp(1.5rem, 4vw, 2.5rem) 1rem", background: "#050505" }}>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 5vw, 3rem)", fontWeight: 900, color: "#fff", marginBottom: "0.5rem" }}>
                  {stat.value}
                </p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}