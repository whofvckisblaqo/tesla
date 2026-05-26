"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const MODELS = ["Model S", "Model 3", "Model X", "Model Y", "Cybertruck"];
const LOCATIONS = ["New York", "Los Angeles", "Chicago", "Houston", "Miami", "Seattle"];
const TIMES = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"];

export default function TestDrivePage() {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    model: "", location: "", date: "", time: "", notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: "100%", padding: "0.875rem 1rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff", fontSize: "0.875rem", outline: "none",
    boxSizing: "border-box", fontFamily: "inherit",
  };
  const labelStyle = {
    display: "block", fontSize: "0.65rem", letterSpacing: "0.2em",
    textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "0.4rem",
  };

  const set = (field) => (e) => setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1000);
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "8rem 1rem 4rem", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(227,25,55,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "48rem", margin: "0 auto" }}>
          <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Experience It</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "1rem" }}>
            Book a Test Drive
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "clamp(0.9rem, 2vw, 1.1rem)", lineHeight: 1.8, fontWeight: 300 }}>
            Fill in your details and we'll confirm your test drive slot via email.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "4rem 1.5rem 6rem" }}>
        {submitted ? (
          /* Confirmation */
          <div style={{ textAlign: "center", padding: "4rem 2rem", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "1.75rem" }}>
              ✓
            </div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "1rem" }}>
              You're Booked!
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.8, maxWidth: "28rem", margin: "0 auto 2rem" }}>
              Thank you, <strong style={{ color: "#fff" }}>{form.firstName}</strong>. Your test drive confirmation — including your appointment details, location address, and what to bring — will be sent to{" "}
              <strong style={{ color: "#E31937" }}>{form.email}</strong> shortly.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.06)", maxWidth: "26rem", margin: "0 auto 2.5rem", textAlign: "left" }}>
              {[
                ["Model", form.model],
                ["Location", form.location],
                ["Date", new Date(form.date + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })],
                ["Time", form.time],
              ].map(([label, val]) => (
                <div key={label} style={{ background: "#000", padding: "1rem 1.25rem" }}>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{label}</p>
                  <p style={{ color: "#fff", fontSize: "0.875rem", fontWeight: 600 }}>{val}</p>
                </div>
              ))}
            </div>

            <a href="/" style={{ display: "inline-block", padding: "0.875rem 2.5rem", background: "#E31937", color: "#fff", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
              Back to Home
            </a>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Name */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>First Name *</label>
                <input required value={form.firstName} onChange={set("firstName")} placeholder="John" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
              </div>
              <div>
                <label style={labelStyle}>Last Name *</label>
                <input required value={form.lastName} onChange={set("lastName")} placeholder="Doe" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
              </div>
            </div>

            {/* Contact */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Email Address *</label>
                <input required type="email" value={form.email} onChange={set("email")} placeholder="john@example.com" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number *</label>
                <input required type="tel" value={form.phone} onChange={set("phone")} placeholder="+1 (555) 000-0000" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
              </div>
            </div>

            {/* Model */}
            <div>
              <label style={labelStyle}>Preferred Model *</label>
              <select required value={form.model} onChange={set("model")} style={{ ...inputStyle, cursor: "pointer" }} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}>
                <option value="" style={{ background: "#111" }}>Select a model</option>
                {MODELS.map((m) => <option key={m} value={m} style={{ background: "#111" }}>{m}</option>)}
              </select>
            </div>

            {/* Location */}
            <div>
              <label style={labelStyle}>Preferred Location *</label>
              <select required value={form.location} onChange={set("location")} style={{ ...inputStyle, cursor: "pointer" }} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}>
                <option value="" style={{ background: "#111" }}>Select a showroom</option>
                {LOCATIONS.map((l) => <option key={l} value={l} style={{ background: "#111" }}>{l}</option>)}
              </select>
            </div>

            {/* Date & Time */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={labelStyle}>Preferred Date *</label>
                <input required type="date" min={minDate} value={form.date} onChange={set("date")} style={{ ...inputStyle, colorScheme: "dark" }} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
              </div>
              <div>
                <label style={labelStyle}>Preferred Time *</label>
                <select required value={form.time} onChange={set("time")} style={{ ...inputStyle, cursor: "pointer" }} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}>
                  <option value="" style={{ background: "#111" }}>Select a time</option>
                  {TIMES.map((t) => <option key={t} value={t} style={{ background: "#111" }}>{t}</option>)}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label style={labelStyle}>Additional Notes</label>
              <textarea value={form.notes} onChange={set("notes")} rows={3} placeholder="Any specific requests or questions..." style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
            </div>

            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", lineHeight: 1.6 }}>
              By submitting this form, you agree to be contacted by our team to confirm your appointment. A confirmation email will be sent to your address with all booking details.
            </p>

            <button type="submit" disabled={loading} style={{ padding: "1rem 2.5rem", background: loading ? "rgba(227,25,55,0.5)" : "#E31937", color: "#fff", border: "none", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", alignSelf: "flex-start" }}>
              {loading ? "Booking..." : "Confirm Test Drive"}
            </button>
          </form>
        )}
      </div>

      <Footer />
    </main>
  );
}
