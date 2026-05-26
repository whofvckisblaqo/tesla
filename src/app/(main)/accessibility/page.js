import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const features = [
  { title: "Keyboard Navigation", desc: "All interactive elements are fully accessible via keyboard. Use Tab to navigate, Enter to activate, and Escape to close dialogs." },
  { title: "Screen Reader Support", desc: "Our pages use semantic HTML and ARIA labels to ensure compatibility with NVDA, JAWS, VoiceOver, and other screen readers." },
  { title: "High Contrast Mode", desc: "The site's dark theme with high-contrast text is designed to meet WCAG AA contrast requirements throughout." },
  { title: "Resizable Text", desc: "All text on the site scales correctly when your browser's base font size is increased up to 200% without loss of functionality." },
  { title: "Focus Indicators", desc: "Visible focus indicators are present on all interactive elements to assist keyboard and switch-access users." },
  { title: "Alt Text for Images", desc: "All product images include descriptive alternative text for users who cannot see images." },
];

const standards = [
  { name: "WCAG 2.1 AA", desc: "We target compliance with Web Content Accessibility Guidelines 2.1 at the AA level." },
  { name: "Section 508", desc: "Our site is designed to meet Section 508 standards for federal accessibility compliance." },
  { name: "ADA Compatible", desc: "We are committed to providing an ADA-compatible experience for all users." },
];

export default function AccessibilityPage() {
  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "8rem 1rem 5rem", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(227,25,55,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "48rem", margin: "0 auto" }}>
          <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Inclusion</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "1.5rem" }}>Accessibility</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.8, fontWeight: 300 }}>
            TeslaStore is committed to ensuring our website is accessible to everyone, regardless of ability or technology used.
          </p>
        </div>
      </section>

      {/* Statement */}
      <section style={{ maxWidth: "56rem", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.9, marginBottom: "4rem" }}>
          We believe that the future of transportation should be accessible to all. That includes our website. We continually work to improve the accessibility of our digital experience, and we welcome feedback from all users to help us identify and fix barriers.
        </p>

        {/* Standards */}
        <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Our Standards</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "4rem" }}>
          {standards.map((s) => (
            <div key={s.name} style={{ background: "#000", padding: "1.75rem" }}>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.5rem" }}>{s.name}</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Accessibility Features</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "4rem" }}>
          {features.map((f) => (
            <div key={f.title} style={{ background: "#000", padding: "1.5rem 1.75rem", display: "grid", gridTemplateColumns: "180px 1fr", gap: "1.5rem", alignItems: "start" }}>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{f.title}</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Known Issues */}
        <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Known Limitations</p>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "3rem" }}>
          Some third-party components (such as the live chat widget) may not fully meet WCAG 2.1 AA standards. We are working with our vendors to address these gaps and provide alternatives where necessary.
        </p>

        {/* Feedback */}
        <div style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "2rem" }}>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Report an Issue</p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", lineHeight: 1.7, marginBottom: "1rem" }}>
            If you encounter an accessibility barrier on our website, please let us know. We take all reports seriously and aim to resolve issues within 5 business days.
          </p>
          <a href="mailto:teslasuppport@outlook.com" style={{ color: "#E31937", fontSize: "0.9rem", textDecoration: "none" }}>teslasuppport@outlook.com</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
