import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const services = [
  { name: "Annual Service", desc: "Comprehensive inspection of brake fluid, cabin air filter, air conditioning, and key safety systems.", time: "2–3 hrs", price: "From $185" },
  { name: "Tire Rotation & Balance", desc: "Extend tire life and ensure even wear with a full rotation and precision balancing.", time: "1 hr", price: "From $95" },
  { name: "Brake Service", desc: "Inspection and replacement of brake pads, rotors, and caliper service.", time: "2–4 hrs", price: "From $250" },
  { name: "Software Diagnostics", desc: "Full vehicle scan and software update to ensure your Tesla is running the latest firmware.", time: "1 hr", price: "Complimentary" },
  { name: "Body Repair", desc: "Certified collision repair using original Tesla parts and paint-matching technology.", time: "Varies", price: "Custom Quote" },
  { name: "Battery Check", desc: "Comprehensive battery health diagnostics, cell balancing, and range estimation report.", time: "1–2 hrs", price: "From $75" },
];

const centers = [
  { city: "New York", address: "32-20 Northern Blvd, Queens, NY 11101", wait: "~3 days" },
  { city: "Los Angeles", address: "12225 W Olympic Blvd, Los Angeles, CA 90064", wait: "~2 days" },
  { city: "Chicago", address: "1400 S Wabash Ave, Chicago, IL 60605", wait: "~4 days" },
  { city: "Houston", address: "2601 South Loop W, Houston, TX 77054", wait: "~2 days" },
  { city: "Miami", address: "3600 NW 82nd Ave, Doral, FL 33166", wait: "~3 days" },
  { city: "Atlanta", address: "1550 Ellsworth Industrial Blvd NW, Atlanta, GA 30318", wait: "~5 days" },
];

export default function ServiceCentersPage() {
  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "8rem 1rem 5rem", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(227,25,55,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "48rem", margin: "0 auto" }}>
          <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>After Sales</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "1.5rem" }}>Service Centers</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.8, fontWeight: 300 }}>
            Tesla-certified technicians. Genuine parts. Most repairs scheduled within days.
          </p>
        </div>
      </section>

      {/* Services */}
      <section style={{ maxWidth: "80rem", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>What We Offer</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>Services</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {services.map((s) => (
            <div key={s.name} style={{ background: "#000", padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.05em" }}>{s.name}</p>
                <p style={{ color: "#E31937", fontWeight: 700, fontSize: "0.8rem", whiteSpace: "nowrap", marginLeft: "1rem" }}>{s.price}</p>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", lineHeight: 1.6, marginBottom: "0.75rem" }}>{s.desc}</p>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>Est. time: {s.time}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Centers */}
      <section style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "5rem 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Locations</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>Service Near You</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
            {centers.map((c) => (
              <div key={c.city} style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem" }}>
                <h3 style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>{c.city}</h3>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", marginBottom: "0.75rem" }}>{c.address}</p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>Typical wait: <span style={{ color: "#10B981" }}>{c.wait}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Book */}
      <section style={{ maxWidth: "80rem", margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "1rem" }}>Book a Service Appointment</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", marginBottom: "2rem" }}>Schedule through the Tesla app or contact us directly.</p>
        <a href="/contact" style={{ display: "inline-block", padding: "0.875rem 2.5rem", background: "#E31937", color: "#fff", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
          Schedule Service
        </a>
      </section>

      <Footer />
    </main>
  );
}
