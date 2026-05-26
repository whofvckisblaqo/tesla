"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const contacts = [
  { label: "Sales", email: "sales@teslastore.com", desc: "Questions about ordering or pricing" },
  { label: "Support", email: "support@teslastore.com", desc: "Technical help and vehicle assistance" },
  { label: "Press", email: "press@teslastore.com", desc: "Media and press inquiries" },
  { label: "Careers", email: "careers@teslastore.com", desc: "Job opportunities and applications" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const inputStyle = {
    width: "100%",
    padding: "0.875rem 1rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: "0.875rem",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "8rem 1rem 5rem", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(227,25,55,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "48rem", margin: "0 auto" }}>
          <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Get in Touch</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "1.5rem" }}>Contact Us</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.8, fontWeight: 300 }}>
            Our team is here to help. Reach out and we'll respond within one business day.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "5rem 1.5rem", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "4rem", alignItems: "start" }}>

        {/* Contact Cards */}
        <div>
          <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "2rem" }}>Direct Contacts</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "2rem" }}>
            {contacts.map((c) => (
              <div key={c.label} style={{ background: "#000", padding: "1.5rem" }}>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{c.label}</p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginBottom: "0.5rem" }}>{c.desc}</p>
                <a href={`mailto:${c.email}`} style={{ color: "#E31937", fontSize: "0.85rem", textDecoration: "none" }}>{c.email}</a>
              </div>
            ))}
          </div>
          <div style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Phone</p>
            <p style={{ color: "#fff", fontSize: "1rem", marginBottom: "1rem" }}>+1 (800) 613-8744</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Hours</p>
            <p style={{ color: "#fff", fontSize: "0.9rem" }}>Mon – Fri: 8am – 8pm EST</p>
            <p style={{ color: "#fff", fontSize: "0.9rem" }}>Sat – Sun: 9am – 5pm EST</p>
          </div>
        </div>

        {/* Form */}
        <div>
          <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "2rem" }}>Send a Message</p>
          {sent ? (
            <div style={{ border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.05)", padding: "2rem", textAlign: "center" }}>
              <p style={{ color: "#10B981", fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Message Sent</p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem" }}>We'll get back to you within one business day.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Name *</label>
                  <input required value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} placeholder="John Doe" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                </div>
                <div>
                  <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Email *</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} placeholder="john@example.com" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                </div>
              </div>
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Subject *</label>
                <input required value={form.subject} onChange={(e) => setForm(p => ({ ...p, subject: e.target.value }))} placeholder="How can we help?" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
              </div>
              <div>
                <label style={{ display: "block", color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Message *</label>
                <textarea required rows={6} value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Describe your question or concern..." style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
              </div>
              <button type="submit" style={{ padding: "0.875rem 2rem", background: "#E31937", color: "#fff", border: "none", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", alignSelf: "flex-start" }}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
