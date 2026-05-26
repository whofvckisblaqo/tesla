import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const releases = [
  { date: "May 2026", tag: "Product", title: "TeslaStore Introduces Instant Delivery in 12 New Cities", excerpt: "Customers in select metropolitan areas can now receive their new Tesla within 48 hours of order confirmation." },
  { date: "Apr 2026", tag: "Milestone", title: "TeslaStore Surpasses 100,000 Online Orders", excerpt: "Our online-first retail model reaches a major milestone, proving that the future of car buying is digital." },
  { date: "Mar 2026", tag: "Partnership", title: "New Supercharger Partnership Expands Coverage by 30%", excerpt: "A new infrastructure agreement adds over 2,000 charging stalls across the country." },
  { date: "Feb 2026", tag: "Update", title: "Over-the-Air Update Brings Full Self-Driving v13 to All Eligible Vehicles", excerpt: "The latest FSD update significantly improves city street navigation and reduces intervention rate by 40%." },
  { date: "Jan 2026", tag: "Award", title: "TeslaStore Named Top EV Retailer by AutoExcellence 2026", excerpt: "For the second consecutive year, TeslaStore has been recognized as the leading online electric vehicle retailer." },
  { date: "Dec 2025", tag: "Community", title: "Cybertruck Waitlist Opens — 200,000 Sign Up in 72 Hours", excerpt: "The overwhelming demand for the Cybertruck on our platform underscores the appetite for next-gen utility vehicles." },
];

export default function PressPage() {
  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "8rem 1rem 5rem", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(227,25,55,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "48rem", margin: "0 auto" }}>
          <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Media</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "1.5rem" }}>Press Room</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.8, fontWeight: 300 }}>
            The latest news, press releases, and announcements from TeslaStore.
          </p>
        </div>
      </section>

      {/* Press Releases */}
      <section style={{ maxWidth: "80rem", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {releases.map((r) => (
            <div key={r.title} style={{ background: "#000", padding: "2rem", display: "grid", gridTemplateColumns: "120px 1fr", gap: "2rem", alignItems: "start" }}>
              <div>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>{r.date}</p>
                <span style={{ display: "inline-block", marginTop: "0.5rem", background: "rgba(227,25,55,0.1)", color: "#E31937", fontSize: "0.6rem", fontWeight: 700, padding: "0.2rem 0.5rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{r.tag}</span>
              </div>
              <div>
                <p style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "1.05rem", fontWeight: 700, marginBottom: "0.75rem" }}>{r.title}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", lineHeight: 1.6 }}>{r.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Media Contact */}
      <section style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "5rem 1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Media Inquiries</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "1rem" }}>Press Contact</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", lineHeight: 1.7 }}>
              For media inquiries, interview requests, or press kit access, please reach out to our communications team.
            </p>
          </div>
          <div style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "2rem" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Email</p>
            <p style={{ color: "#fff", fontSize: "1rem", marginBottom: "1.5rem" }}>teslasuppport@outlook.com</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Response Time</p>
            <p style={{ color: "#fff", fontSize: "1rem" }}>Within 24 business hours</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
