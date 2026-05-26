import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const stats = [
  { value: "2003", label: "Founded" },
  { value: "50K+", label: "Employees" },
  { value: "5M+", label: "Vehicles Delivered" },
  { value: "40+", label: "Countries" },
];

const milestones = [
  { year: "2008", title: "Roadster Launches", desc: "Tesla delivers the world's first highway-capable all-electric vehicle using lithium-ion battery cells." },
  { year: "2012", title: "Model S Ships", desc: "The Model S earns the highest safety rating ever recorded by NHTSA and redefines the sedan." },
  { year: "2015", title: "Model X Arrives", desc: "Falcon Wing doors and seating for seven make the Model X the safest, quickest SUV ever." },
  { year: "2017", title: "Model 3 Begins", desc: "Tesla's first mass-market vehicle opens sustainable transport to millions." },
  { year: "2020", title: "Cybertruck Unveiled", desc: "Stainless steel exoskeleton and adaptive air suspension redefine the pickup truck." },
  { year: "2024", title: "5 Million Delivered", desc: "Tesla surpasses 5 million cumulative vehicle deliveries worldwide." },
];

export default function AboutPage() {
  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "8rem 1rem 5rem", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(227,25,55,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "48rem", margin: "0 auto" }}>
          <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Our Story</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "1.5rem" }}>About Tesla</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.8, fontWeight: 300 }}>
            Tesla's mission is to accelerate the world's transition to sustainable energy. We design and manufacture electric vehicles, battery energy storage, and solar products that together form an integrated clean energy company.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{ padding: "3rem 2rem", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#E31937", marginBottom: "0.5rem" }}>{s.value}</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section style={{ maxWidth: "80rem", margin: "0 auto", padding: "5rem 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
        <div>
          <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Our Mission</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "1.5rem", lineHeight: 1.1 }}>Accelerating Sustainable Energy</h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1rem" }}>
            We believe the faster the world stops relying on fossil fuels and moves toward a zero-emission future, the better. That's why Tesla makes products that are as attractive and compelling as possible.
          </p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.8 }}>
            From our vehicles to our solar panels and energy storage, every product we build is designed to make clean energy accessible to everyone — not just the few.
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {["Performance", "Safety", "Efficiency", "Innovation"].map((val) => (
            <div key={val} style={{ background: "#000", padding: "2rem", textAlign: "center" }}>
              <p style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{val}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "5rem 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>History</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>Key Milestones</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
            {milestones.map((m) => (
              <div key={m.year} style={{ background: "#000", padding: "2rem" }}>
                <p style={{ color: "#E31937", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", marginBottom: "0.5rem" }}>{m.year}</p>
                <p style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: 700, marginBottom: "0.75rem" }}>{m.title}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", lineHeight: 1.6 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
