import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const locations = [
  { city: "New York", address: "405 W 38th St, New York, NY 10018", phone: "+1 (212) 555-0181", hours: "Mon–Sat 9am–8pm, Sun 10am–6pm", services: ["Sales", "Test Drive", "Delivery"] },
  { city: "Los Angeles", address: "8500 Beverly Blvd, Los Angeles, CA 90048", phone: "+1 (310) 555-0142", hours: "Mon–Sat 9am–8pm, Sun 10am–6pm", services: ["Sales", "Test Drive", "Delivery", "Service"] },
  { city: "Chicago", address: "301 N Michigan Ave, Chicago, IL 60601", phone: "+1 (312) 555-0199", hours: "Mon–Sat 10am–7pm, Sun 11am–5pm", services: ["Sales", "Test Drive", "Delivery"] },
  { city: "Houston", address: "5115 Westheimer Rd, Houston, TX 77056", phone: "+1 (713) 555-0167", hours: "Mon–Sat 9am–8pm, Sun 10am–6pm", services: ["Sales", "Test Drive", "Delivery", "Service"] },
  { city: "Miami", address: "700 NW 2nd Ave, Miami, FL 33136", phone: "+1 (305) 555-0123", hours: "Mon–Sat 9am–8pm, Sun 11am–5pm", services: ["Sales", "Test Drive", "Delivery"] },
  { city: "Seattle", address: "400 Pine St, Seattle, WA 98101", phone: "+1 (206) 555-0154", hours: "Mon–Sat 10am–7pm, Sun 11am–5pm", services: ["Sales", "Test Drive", "Delivery", "Service"] },
];

export default function FindUsPage() {
  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "8rem 1rem 5rem", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(227,25,55,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "48rem", margin: "0 auto" }}>
          <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Locations</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "1.5rem" }}>Find Us</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.8, fontWeight: 300 }}>
            Visit a TeslaStore showroom near you to see our vehicles in person, take a test drive, or pick up your order.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <section style={{ maxWidth: "80rem", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {locations.map((loc) => (
            <div key={loc.city} style={{ background: "#000", padding: "2rem" }}>
              <p style={{ color: "#E31937", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Showroom</p>
              <h3 style={{ fontFamily: "Georgia, serif", color: "#fff", fontSize: "1.4rem", fontWeight: 900, marginBottom: "1.25rem", textTransform: "uppercase" }}>{loc.city}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.2rem" }}>Address</p>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>{loc.address}</p>
                </div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.2rem" }}>Phone</p>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>{loc.phone}</p>
                </div>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.2rem" }}>Hours</p>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem" }}>{loc.hours}</p>
                </div>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap", paddingTop: "0.5rem" }}>
                  {loc.services.map((s) => (
                    <span key={s} style={{ background: "rgba(227,25,55,0.1)", color: "#E31937", fontSize: "0.6rem", fontWeight: 700, padding: "0.2rem 0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Book Test Drive CTA */}
      <section style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "1rem" }}>Book a Test Drive</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", marginBottom: "2rem" }}>Experience any model before you buy — at a location near you.</p>
          <a href="/contact" style={{ display: "inline-block", padding: "0.875rem 2.5rem", background: "#E31937", color: "#fff", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
            Schedule Now
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
