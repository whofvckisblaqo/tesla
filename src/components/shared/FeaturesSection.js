"use client";

import { useState } from "react";

const Icon = ({ d, viewBox = "0 0 24 24" }) => (
  <svg width="32" height="32" viewBox={viewBox} fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((path, i) => <path key={i} d={path} />) : <path d={d} />}
  </svg>
);

const features = [
  {
    icon: <Icon d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
    title: "Ludicrous Speed",
    desc: "Go from 0 to 60 mph in under 2 seconds. The most exhilarating acceleration ever engineered.",
  },
  {
    icon: <Icon d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    title: "Safest Cars Ever",
    desc: "All Tesla models receive top safety ratings. Rigid body structure and side-impact protection.",
  },
  {
    icon: (
      <Icon d={[
        "M7 17H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2h-2",
        "M12 12v5M9 19h6",
        "M5 12h4M15 12h4",
      ]} />
    ),
    title: "Longest Range",
    desc: "Drive up to 405 miles on a single charge. Supercharge to 80% in just 25 minutes.",
  },
  {
    icon: (
      <Icon d={[
        "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z",
        "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
        "M12 2v3M12 19v3M2 12h3M19 12h3",
      ]} />
    ),
    title: "Autopilot",
    desc: "Advanced safety and convenience features. Full Self-Driving capability available on all new vehicles.",
  },
  {
    icon: (
      <Icon d={[
        "M1.42 9a16 16 0 0 1 21.16 0",
        "M5 12.55a11 11 0 0 1 14.08 0",
        "M8.53 16.11a6 6 0 0 1 6.95 0",
        "M12 20h.01",
      ]} />
    ),
    title: "Over-the-Air Updates",
    desc: "Your car improves over time with regular software updates adding new features and performance.",
  },
  {
    icon: (
      <Icon d={[
        "M11 5L6 9H2v6h4l5 4V5z",
        "M19.07 4.93a10 10 0 0 1 0 14.14",
        "M15.54 8.46a5 5 0 0 1 0 7.07",
      ]} />
    ),
    title: "Immersive Sound",
    desc: "Premium audio system with up to 22 speakers, active noise cancellation, and spatial audio.",
  },
];

function FeatureCard({ f }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? "rgba(255,255,255,0.05)" : "#050505", padding: "clamp(1.5rem, 4vw, 2.5rem)", transition: "all 0.3s ease", cursor: "default" }}
    >
      <div style={{ marginBottom: "1.5rem", opacity: hovered ? 1 : 0.7, transition: "opacity 0.3s" }}>
        {f.icon}
      </div>
      <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)", marginBottom: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase" }}>{f.title}</h3>
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
          .features-grid { grid-template-columns: repeat(2, 1fr); }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .features-grid { grid-template-columns: 1fr; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
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
