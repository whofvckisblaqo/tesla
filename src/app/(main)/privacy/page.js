import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const sections = [
  { title: "Information We Collect", body: "We collect information you provide directly, such as your name, email address, phone number, shipping address, and payment information when you place an order. We also collect vehicle usage data to improve our products and services, subject to your consent. Automatically collected data includes IP addresses, browser type, device identifiers, and browsing activity on our site." },
  { title: "How We Use Your Information", body: "We use your information to process and fulfil orders, send order confirmations and updates, improve our website and products, personalise your experience, send marketing communications where you have opted in, and comply with legal obligations. We do not sell your personal data to third parties." },
  { title: "Cookies & Tracking", body: "We use cookies and similar technologies to enable site functionality, remember your preferences, and analyse traffic. You can control cookie settings through your browser. Disabling certain cookies may affect site functionality. We use Google Analytics in anonymised form." },
  { title: "Data Sharing", body: "We share your data only with service providers who assist in operating our business (payment processors, logistics partners, cloud infrastructure), and only to the extent necessary to provide those services. All partners are bound by confidentiality agreements. We may disclose data if required by law." },
  { title: "Data Retention", body: "We retain your personal data for as long as necessary to fulfil the purposes for which it was collected, including for legal, accounting, or reporting requirements. Order data is retained for 7 years. You may request deletion of your account and associated data at any time." },
  { title: "Your Rights", body: "Depending on your jurisdiction, you have rights to access, correct, delete, or export your personal data. You also have the right to withdraw consent and opt out of marketing at any time. To exercise these rights, contact us at teslasuppport@outlook.com." },
  { title: "Security", body: "We implement industry-standard security measures including TLS encryption, tokenised payment processing, and regular security audits. No system is completely secure; we encourage you to use a strong password and protect your account credentials." },
  { title: "Children's Privacy", body: "Our services are not directed to individuals under 18. We do not knowingly collect personal information from minors. If we become aware that we have inadvertently collected such data, we will delete it promptly." },
  { title: "Changes to This Policy", body: "We may update this policy periodically. We'll notify you of material changes by email or through a notice on our website. The date of the most recent revision is shown at the top of this page." },
];

export default function PrivacyPage() {
  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      <section style={{ padding: "8rem 1rem 5rem", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Legal</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 4rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "1rem" }}>Privacy Policy</h1>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>Last updated: May 2026</p>
        </div>
      </section>

      <section style={{ maxWidth: "56rem", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "3rem" }}>
          This Privacy Policy describes how TeslaStore ("we", "us", or "our") collects, uses, and shares information about you when you use our website, mobile applications, and services. By using our services, you agree to the collection and use of information in accordance with this policy.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {sections.map((s, i) => (
            <div key={s.title}>
              <h2 style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                <span style={{ color: "#E31937", marginRight: "0.75rem" }}>{String(i + 1).padStart(2, "0")}.</span>
                {s.title}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem", lineHeight: 1.8 }}>{s.body}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "3rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "2rem" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>For privacy-related questions, contact us at <a href="mailto:teslasuppport@outlook.com" style={{ color: "#E31937" }}>teslasuppport@outlook.com</a></p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
