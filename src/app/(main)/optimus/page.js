"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const specs = [
  { label: "Height", value: "5′ 8″", sub: "172 cm" },
  { label: "Weight", value: "125 lb", sub: "57 kg" },
  { label: "Carry Capacity", value: "45 lb", sub: "20 kg" },
  { label: "Deadlift", value: "150 lb", sub: "68 kg" },
  { label: "Top Speed", value: "5 mph", sub: "8 km/h" },
  { label: "Hand DOF", value: "22", sub: "11 per hand" },
  { label: "Battery", value: "Full Day", sub: "Hot-swappable" },
  { label: "Actuators", value: "28", sub: "Rotary + linear" },
];

const capabilities = [
  {
    title: "Dexterous Hands",
    desc: "11 degrees of freedom per hand with tactile sensing. Optimus can handle fragile objects, use tools, and perform precise assembly tasks.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 11V8a2 2 0 0 0-4 0v3M14 8V6a2 2 0 0 0-4 0v2M10 7.5V5a2 2 0 0 0-4 0v9l-1-1a2 2 0 0 0-2.83 2.83L5 18a6 6 0 0 0 6 3h2a6 6 0 0 0 6-6V11a2 2 0 0 0-4 0" />
      </svg>
    ),
  },
  {
    title: "Tesla Vision",
    desc: "The same AI-powered camera array used in Tesla vehicles gives Optimus full spatial awareness, object recognition, and safe navigation.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Full-Day Battery",
    desc: "A hot-swappable battery pack powers Optimus through a full work shift. Swap in seconds — no downtime, no interruptions.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="16" height="10" rx="2" />
        <path d="M22 11v2M6 11v2M10 11v2M14 11v2" />
      </svg>
    ),
  },
  {
    title: "Self-Learning AI",
    desc: "Trained on real-world human motion data, Optimus adapts to new tasks through demonstration. No complex programming required.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z" />
        <path d="M12 8v4l3 3" />
        <path d="M8.5 8.5l7 7M15.5 8.5l-7 7" strokeOpacity="0.3" />
      </svg>
    ),
  },
  {
    title: "Safe by Design",
    desc: "Force-limited actuators prevent harm in every scenario. Optimus is designed to work alongside humans without barriers or cages.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "OTA Evolution",
    desc: "Like all Tesla products, Optimus improves over time through over-the-air updates — gaining new skills and capabilities remotely.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1.42 9a16 16 0 0 1 21.16 0M5 12.55a11 11 0 0 1 14.08 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
      </svg>
    ),
  },
];

const useCases = [
  { label: "Manufacturing", desc: "Repetitive assembly, materials handling, and quality inspection — at scale, around the clock." },
  { label: "Warehousing", desc: "Autonomous pick-and-place, inventory management, and logistics in dynamic environments." },
  { label: "Home Assistance", desc: "Household tasks, elderly care, and daily errands — your personal assistant, always on." },
  { label: "Hazardous Work", desc: "Operate in environments too dangerous for humans — extreme heat, radiation, or chemical exposure." },
];

const faqs = [
  { q: "When will Optimus be available?", a: "Tesla is targeting limited production units for industrial customers in 2025, with broader availability in 2026. Reserve your unit today to secure your position." },
  { q: "What tasks can Optimus perform?", a: "Optimus is designed for a wide range of tasks — from factory assembly and warehouse logistics to home assistance. Its AI allows it to learn new tasks through demonstration." },
  { q: "Is Optimus safe around people?", a: "Yes. Optimus uses force-limited actuators, redundant sensors, and real-time obstacle avoidance to ensure safe operation alongside humans without physical barriers." },
  { q: "How is Optimus controlled?", a: "Optimus operates autonomously using Tesla's AI and vision stack. It can also be directed through a simple app interface or trained by demonstration." },
  { q: "What is the expected price?", a: "Tesla is targeting a price point below $30,000 for production units — significantly less than the cost of equivalent industrial automation solutions." },
];

export default function OptimusPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [reserved, setReserved] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", background: "#000" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(227,25,55,0.12) 0%, transparent 65%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "8rem 1.5rem 4rem", maxWidth: "72rem", margin: "0 auto" }}>
          <div style={{ display: "inline-block", marginBottom: "1.5rem", padding: "0.35rem 1.25rem", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.5em", textTransform: "uppercase", border: "1px solid #E31937", color: "#E31937" }}>
            Tesla Optimus
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(3rem, 12vw, 9rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 0.9, marginBottom: "2rem", textShadow: "0 0 120px rgba(227,25,55,0.2)" }}>
            The World's<br />Most Capable<br />
            <span style={{ color: "#E31937" }}>Robot</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(1rem, 2.5vw, 1.3rem)", maxWidth: "38rem", margin: "0 auto 3rem", fontWeight: 300, lineHeight: 1.7 }}>
            Optimus is a general-purpose humanoid robot, designed to perform dangerous, repetitive, or tedious tasks — so humans don't have to.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#reserve" style={{ padding: "1rem 2.5rem", background: "#E31937", color: "#fff", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
              Reserve Now
            </a>
            <a href="#capabilities" style={{ padding: "1rem 2.5rem", border: "1px solid rgba(255,255,255,0.25)", color: "#fff", fontSize: "0.85rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
              Learn More
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", color: "rgba(255,255,255,0.3)" }}>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: "2rem", background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
        </div>
      </section>

      {/* SPECS BAR */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
          {specs.slice(0, 4).map((s, i) => (
            <div key={s.label} style={{ padding: "2.5rem 1.5rem", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 900, color: "#fff", marginBottom: "0.25rem" }}>{s.value}</p>
              <p style={{ color: "#E31937", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.15rem" }}>{s.label}</p>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem" }}>{s.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" style={{ maxWidth: "80rem", margin: "0 auto", padding: "clamp(4rem, 10vw, 8rem) 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
          <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Engineering</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 7vw, 4.5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1 }}>
            Built Different
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {capabilities.map((c) => (
            <div key={c.title} style={{ background: "#000", padding: "2.5rem 2rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>{c.icon}</div>
              <h3 style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{c.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", lineHeight: 1.7 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FULL SPECS */}
      <section style={{ background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "clamp(4rem, 8vw, 6rem) 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Specifications</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>By the Numbers</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", maxWidth: "64rem", margin: "0 auto" }}>
            {specs.map((s, i) => (
              <div key={s.label} style={{ background: "rgba(255,255,255,0.015)", padding: "2rem 1.5rem", textAlign: "center" }}>
                <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.25rem, 3vw, 2rem)", fontWeight: 900, color: "#E31937", marginBottom: "0.4rem" }}>{s.value}</p>
                <p style={{ color: "#fff", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{s.label}</p>
                <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem" }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section style={{ maxWidth: "80rem", margin: "0 auto", padding: "clamp(4rem, 10vw, 8rem) 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
          <div>
            <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Applications</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1.05, marginBottom: "1.5rem" }}>
              Designed for Every Industry
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "2rem" }}>
              Optimus is not built for one task. Its general-purpose AI and humanoid form factor make it deployable anywhere humans work — from factory floors to living rooms.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
            {useCases.map((u, i) => (
              <div key={u.label} style={{ background: "#000", padding: "1.75rem 2rem", display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                <span style={{ color: "#E31937", fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 900, minWidth: "2rem", paddingTop: "0.1rem" }}>0{i + 1}</span>
                <div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>{u.label}</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", lineHeight: 1.6 }}>{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVE */}
      <section id="reserve" style={{ background: "rgba(227,25,55,0.04)", borderTop: "1px solid rgba(227,25,55,0.15)", borderBottom: "1px solid rgba(227,25,55,0.15)" }}>
        <div style={{ maxWidth: "48rem", margin: "0 auto", padding: "clamp(4rem, 10vw, 7rem) 1.5rem", textAlign: "center" }}>
          <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Reserve</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 6vw, 4rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "1rem" }}>
            Be First in Line
          </h2>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "clamp(0.9rem, 2vw, 1.05rem)", lineHeight: 1.8, marginBottom: "2.5rem", fontWeight: 300 }}>
            Production units are limited. Reserve your Optimus today with a fully refundable $500 deposit and we'll notify you the moment your unit is ready.
          </p>

          {reserved ? (
            <div style={{ border: "1px solid rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.05)", padding: "2.5rem" }}>
              <p style={{ color: "#10B981", fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.5rem" }}>Reservation Confirmed</p>
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.9rem" }}>
                A confirmation and next steps will be sent to <strong style={{ color: "#fff" }}>{email}</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setReserved(true); }} style={{ display: "flex", gap: "0.75rem", maxWidth: "32rem", margin: "0 auto", flexWrap: "wrap" }}>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                style={{ flex: 1, minWidth: "200px", padding: "0.875rem 1rem", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", fontSize: "0.875rem", outline: "none" }}
                onFocus={(e) => (e.target.style.borderColor = "#E31937")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
              />
              <button type="submit" style={{ padding: "0.875rem 2rem", background: "#E31937", color: "#fff", border: "none", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap" }}>
                Reserve — $500
              </button>
            </form>
          )}

          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", marginTop: "1.25rem" }}>
            Fully refundable. No commitment until production begins.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: "56rem", margin: "0 auto", padding: "clamp(4rem, 10vw, 7rem) 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Questions</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>FAQ</h2>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {faqs.map((f, i) => (
            <div key={i} style={{ background: "#000" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", padding: "1.5rem 1.75rem", background: "none", border: "none", color: "#fff", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}
              >
                <span style={{ fontWeight: 600, fontSize: "0.9rem", lineHeight: 1.4 }}>{f.q}</span>
                <span style={{ color: "#E31937", fontSize: "1.25rem", flexShrink: 0, transition: "transform 0.25s", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 1.75rem 1.5rem" }}>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.875rem", lineHeight: 1.8 }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section style={{ borderTop: "1px solid rgba(255,255,255,0.06)", background: "#000" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "clamp(3rem, 6vw, 5rem) 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
          <div>
            <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.5rem" }}>Tesla Optimus</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.25rem, 3vw, 2rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>The Future of Work is Here.</p>
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="#reserve" style={{ padding: "0.875rem 2rem", background: "#E31937", color: "#fff", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>Reserve Now</a>
            <a href="/contact" style={{ padding: "0.875rem 2rem", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>Contact Sales</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
