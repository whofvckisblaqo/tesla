"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const SUPPORT_EMAIL = "teslasuppport@outlook.com";

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

  const labelStyle = {
    display: "block",
    color: "rgba(255,255,255,0.4)",
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    marginBottom: "0.4rem",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const openLiveChat = () => {
    if (typeof window !== "undefined" && window.Tawk_API) {
      window.Tawk_API.maximize();
    }
  };

  return (
    <>
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 4rem;
          align-items: start;
        }
        .form-name-email {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .form-name-email {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <main style={{ background: "#000", minHeight: "100vh" }}>
        <Navbar />

        {/* Hero */}
        <section style={{ padding: "8rem 1rem 5rem", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(227,25,55,0.08) 0%, transparent 70%)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: "48rem", margin: "0 auto" }}>
            <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Get in Touch</p>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "1.5rem" }}>Contact Us</h1>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.8, fontWeight: 300 }}>
              Our team is here to help. Reach out and we&apos;ll respond within one business day.
            </p>
          </div>
        </section>

        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "clamp(2.5rem, 6vw, 5rem) clamp(1rem, 4vw, 1.5rem)" }}>
          <div className="contact-grid">

            {/* Left: Contact Info */}
            <div>
              <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Support</p>

              {/* Single support card */}
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem", marginBottom: "1rem" }}>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Email Support</p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginBottom: "0.75rem" }}>For all inquiries — sales, technical help, orders, and more.</p>
                <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "#E31937", fontSize: "0.9rem", textDecoration: "none", wordBreak: "break-all" }}>{SUPPORT_EMAIL}</a>
              </div>

              {/* Live Chat card */}
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem", marginBottom: "1.5rem" }}>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.25rem" }}>Live Support</p>
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginBottom: "0.875rem" }}>Chat with a real agent instantly — available during business hours.</p>
                <button
                  onClick={openLiveChat}
                  style={{ padding: "0.6rem 1.25rem", background: "#E31937", color: "#fff", border: "none", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}
                >
                  Start Live Chat
                </button>
              </div>

              {/* Phone & Hours */}
              <div style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem" }}>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Phone</p>
                <p style={{ color: "#fff", fontSize: "1rem", marginBottom: "1.25rem" }}>+1 (800) 613-8744</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Hours</p>
                <p style={{ color: "#fff", fontSize: "0.9rem" }}>Mon – Fri: 8am – 8pm EST</p>
                <p style={{ color: "#fff", fontSize: "0.9rem" }}>Sat – Sun: 9am – 5pm EST</p>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem" }}>Send a Message</p>
              {sent ? (
                <div style={{ border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.05)", padding: "2.5rem", textAlign: "center" }}>
                  <p style={{ color: "#10B981", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>Message Sent ✓</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", marginBottom: "1.25rem" }}>We&apos;ll get back to you within one business day at {form.email}.</p>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>
                    Need faster help?{" "}
                    <button onClick={openLiveChat} style={{ background: "none", border: "none", color: "#E31937", cursor: "pointer", fontSize: "0.8rem", padding: 0, textDecoration: "underline" }}>
                      Start live chat
                    </button>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div className="form-name-email">
                    <div>
                      <label style={labelStyle}>Name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        placeholder="John Doe"
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "#E31937")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        placeholder="john@example.com"
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "#E31937")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Subject *</label>
                    <input
                      required
                      value={form.subject}
                      onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                      placeholder="How can we help?"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#E31937")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Message *</label>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      placeholder="Describe your question or concern..."
                      style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                      onFocus={(e) => (e.target.style.borderColor = "#E31937")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", flexWrap: "wrap" }}>
                    <button
                      type="submit"
                      style={{ padding: "0.875rem 2rem", background: "#E31937", color: "#fff", border: "none", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}
                    >
                      Send Message
                    </button>
                    <button
                      type="button"
                      onClick={openLiveChat}
                      style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", cursor: "pointer", letterSpacing: "0.1em", padding: 0 }}
                    >
                      or start live chat →
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
