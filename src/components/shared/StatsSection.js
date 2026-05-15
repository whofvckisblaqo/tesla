"use client";

const stats = [
  { value: "6", unit: "Models", label: "Available Now" },
  { value: "620", unit: "Miles", label: "Max Range" },
  { value: "1.1", unit: "Seconds", label: "Fastest 0–60" },
  { value: "40K+", unit: "Owners", label: "Happy Customers" },
];

export default function StatsSection() {
  return (
    <section style={{
      background: "#E31937",
      padding: "80px 40px",
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "40px",
        textAlign: "center",
      }}>
        {stats.map((stat, i) => (
          <div key={i}>
            <div style={{
              fontSize: "clamp(48px, 6vw, 80px)",
              fontWeight: "900",
              fontFamily: "'Bebas Neue', sans-serif",
              color: "#fff",
              lineHeight: "1",
              letterSpacing: "2px",
            }}>
              {stat.value}
              <span style={{ fontSize: "40%", verticalAlign: "super", marginLeft: "4px" }}>
                {stat.unit}
              </span>
            </div>
            <div style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.75)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              marginTop: "8px",
              fontWeight: "500",
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
      `}</style>
    </section>
  );
}