"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const faqs = [
  {
    category: "Ordering",
    items: [
      { q: "How do I place an order?", a: "Browse our models, select the one you want, and click 'Order Now'. You'll be guided through configuration, payment, and delivery options. The entire process takes under 10 minutes." },
      { q: "Can I modify or cancel my order?", a: "You can modify or cancel your order within 48 hours of placing it, before it enters production. Visit your dashboard or contact our support team." },
      { q: "What payment methods do you accept?", a: "We accept all major credit and debit cards, bank transfers, and financing through our partner lenders. Trade-in credit can also be applied at checkout." },
      { q: "Is a deposit required?", a: "A refundable deposit of $250 is required to confirm your order. This is applied toward your final balance." },
    ],
  },
  {
    category: "Delivery",
    items: [
      { q: "How long does delivery take?", a: "Delivery times vary by model and location — typically 2 to 8 weeks. You'll receive real-time updates once your vehicle enters production." },
      { q: "Can I track my order?", a: "Yes. Visit /order/track and enter your order ID and email address to see real-time status updates from production to delivery." },
      { q: "Do you offer home delivery?", a: "Yes, we deliver directly to your door at no extra charge in most areas. Alternatively, you can pick up from a nearby delivery center." },
    ],
  },
  {
    category: "Vehicles",
    items: [
      { q: "What's included in the base price?", a: "The base price includes the vehicle, all standard features, and one year of free Supercharging. Autopilot is standard on all new vehicles." },
      { q: "Can I test drive before buying?", a: "Yes. Book a test drive through our contact page or visit a nearby service center. We offer 7-day return policy on all purchases." },
      { q: "What warranty comes with my Tesla?", a: "Every vehicle comes with a 4-year/50,000-mile basic vehicle warranty and an 8-year/150,000-mile battery and drive unit warranty." },
    ],
  },
  {
    category: "Charging",
    items: [
      { q: "Where can I charge my Tesla?", a: "Tesla's Supercharger network has over 50,000 stalls worldwide. You can also charge at home with a standard outlet or our Wall Connector." },
      { q: "How long does a full charge take?", a: "A Supercharger can add up to 200 miles in 15 minutes. A full charge at a Supercharger typically takes 20–40 minutes depending on the model." },
      { q: "What is the Wall Connector?", a: "The Wall Connector is a home charging unit that provides up to 44 miles of range per hour. Installation is straightforward and we can connect you with a certified electrician." },
    ],
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState(null);

  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "8rem 1rem 5rem", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(227,25,55,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "48rem", margin: "0 auto" }}>
          <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Help Center</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "1.5rem" }}>FAQ</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.8, fontWeight: 300 }}>
            Answers to the most common questions about ordering, delivery, vehicles, and charging.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section style={{ maxWidth: "60rem", margin: "0 auto", padding: "5rem 1.5rem" }}>
        {faqs.map((section) => (
          <div key={section.category} style={{ marginBottom: "3rem" }}>
            <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem", fontWeight: 700 }}>{section.category}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
              {section.items.map((item, idx) => {
                const key = `${section.category}-${idx}`;
                const isOpen = open === key;
                return (
                  <div key={key} style={{ background: "#000" }}>
                    <button
                      onClick={() => setOpen(isOpen ? null : key)}
                      style={{ width: "100%", padding: "1.25rem 1.5rem", background: "none", border: "none", color: "#fff", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}
                    >
                      <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.q}</span>
                      <span style={{ color: "#E31937", fontSize: "1.2rem", flexShrink: 0, transition: "transform 0.2s", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: "0 1.5rem 1.5rem" }}>
                        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.7 }}>{item.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Still need help */}
      <section style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "4rem 1.5rem", textAlign: "center" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "1rem" }}>Still Have Questions?</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", marginBottom: "2rem" }}>Our support team is available 7 days a week.</p>
          <a href="/contact" style={{ display: "inline-block", padding: "0.875rem 2.5rem", background: "#E31937", color: "#fff", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
            Contact Support
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
