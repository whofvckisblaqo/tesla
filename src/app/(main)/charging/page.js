import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const options = [
  { name: "Supercharger", speed: "Up to 250 kW", range: "200 mi in 15 min", locations: "50,000+ stalls", desc: "The fastest charging experience available. Located along major highways, in cities, and at destinations worldwide.", tag: "Fastest" },
  { name: "Wall Connector", speed: "Up to 11.5 kW", range: "44 mi per hour", locations: "Home Installation", desc: "The most convenient home charging solution. Mount it in your garage for a full charge overnight, every night.", tag: "Home" },
  { name: "Mobile Connector", speed: "Up to 3 kW", range: "30 mi per hour", locations: "Any outlet", desc: "Plug into any standard household outlet. Ideal as a backup or when traveling where other options aren't available.", tag: "Portable" },
  { name: "Destination Charger", speed: "Up to 11.5 kW", range: "44 mi per hour", locations: "Hotels & restaurants", desc: "Available at thousands of hotels, restaurants, and resorts. Charge while you dine, sleep, or relax.", tag: "Destinations" },
];

const tips = [
  { title: "Charge to 80%", desc: "For daily driving, keep your battery between 20% and 80% to maximise long-term health." },
  { title: "Pre-condition in Cold", desc: "Use scheduled charging or climate controls to warm the battery before driving in cold weather." },
  { title: "Use Route Planner", desc: "The in-car navigation automatically routes you through Superchargers on long trips." },
  { title: "Charge Off-Peak", desc: "Charging between 10pm and 6am is cheaper and reduces strain on the grid." },
];

export default function ChargingPage() {
  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "8rem 1rem 5rem", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(227,25,55,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "48rem", margin: "0 auto" }}>
          <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Power Up</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "1.5rem" }}>Charging</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.8, fontWeight: 300 }}>
            Every Tesla comes with access to the world's largest and most reliable fast-charging network — the Supercharger network.
          </p>
        </div>
      </section>

      {/* Options */}
      <section style={{ maxWidth: "80rem", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Your Options</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>Ways to Charge</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {options.map((o) => (
            <div key={o.name} style={{ background: "#000", padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                <h3 style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 700 }}>{o.name}</h3>
                <span style={{ background: "rgba(227,25,55,0.1)", color: "#E31937", fontSize: "0.6rem", fontWeight: 700, padding: "0.2rem 0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{o.tag}</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "1.25rem" }}>{o.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "1rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Speed</span>
                  <span style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600 }}>{o.speed}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Range Added</span>
                  <span style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600 }}>{o.range}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Where</span>
                  <span style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600 }}>{o.locations}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      <section style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "5rem 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Best Practices</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>Charging Tips</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {tips.map((t) => (
              <div key={t.title} style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "1.75rem" }}>
                <p style={{ color: "#E31937", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{t.title}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", lineHeight: 1.6 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Wall Connector */}
      <section style={{ maxWidth: "80rem", margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "1rem" }}>Shop Charging Accessories</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", marginBottom: "2rem" }}>Wall Connectors, adapters, and cables available in our accessories store.</p>
        <a href="/accessories" style={{ display: "inline-block", padding: "0.875rem 2.5rem", background: "#E31937", color: "#fff", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
          Shop Now
        </a>
      </section>

      <Footer />
    </main>
  );
}
