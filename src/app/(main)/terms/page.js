import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const sections = [
  { title: "Acceptance of Terms", body: "By accessing or using TeslaStore's website and services, you confirm that you are at least 18 years of age and agree to be bound by these Terms of Service. If you do not agree, please do not use our services." },
  { title: "Orders & Purchases", body: "All orders are subject to availability and acceptance. We reserve the right to refuse or cancel any order at our discretion. Prices are shown in USD and are subject to change. A confirmed order email does not guarantee final acceptance; we will notify you of any issues." },
  { title: "Pricing & Payment", body: "All prices are exclusive of applicable taxes unless stated otherwise. Payment is processed securely at the time of order confirmation. We accept major credit cards, debit cards, and bank transfers. Fraudulent orders will be cancelled and reported to authorities." },
  { title: "Deposits & Cancellations", body: "A $250 refundable deposit is required at the time of order. Orders may be cancelled within 48 hours for a full refund. After 48 hours, deposits are non-refundable unless the vehicle is unavailable. Once production begins, cancellations are not permitted." },
  { title: "Delivery", body: "Estimated delivery timelines are provided in good faith but are not guaranteed. We are not liable for delays caused by supply chain issues, logistics, or events beyond our control. Risk of loss passes to you upon delivery." },
  { title: "Returns & Warranty", body: "Vehicles may be returned within 7 days or 1,000 miles of delivery if you are not satisfied, subject to inspection. Accessories may be returned within 30 days in original condition. Our warranty terms are outlined in the vehicle's warranty documentation provided at delivery." },
  { title: "Account Responsibilities", body: "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorised access. We are not liable for any losses resulting from your failure to protect your account." },
  { title: "Intellectual Property", body: "All content on this site — including text, images, logos, and software — is owned by TeslaStore or its licensors. You may not reproduce, distribute, or create derivative works without express written permission." },
  { title: "Limitation of Liability", body: "To the maximum extent permitted by law, TeslaStore shall not be liable for indirect, incidental, special, or consequential damages arising from use of our services. Our total liability shall not exceed the amount paid for the specific order giving rise to the claim." },
  { title: "Governing Law", body: "These terms are governed by the laws of the State of California, USA. Any disputes shall be resolved exclusively through binding arbitration in San Francisco, California, except where prohibited by law." },
  { title: "Changes to Terms", body: "We reserve the right to modify these terms at any time. Changes take effect upon posting to this page. Your continued use of the service after changes constitutes acceptance of the new terms." },
];

export default function TermsPage() {
  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      <section style={{ padding: "8rem 1rem 5rem", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto" }}>
          <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Legal</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 4rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "1rem" }}>Terms of Service</h1>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>Last updated: May 2026</p>
        </div>
      </section>

      <section style={{ maxWidth: "56rem", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "3rem" }}>
          Please read these Terms of Service carefully before using TeslaStore's website or placing an order. These terms apply to all visitors, users, and customers.
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
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.85rem" }}>For legal inquiries, contact us at <a href="mailto:legal@teslastore.com" style={{ color: "#E31937" }}>legal@teslastore.com</a></p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
