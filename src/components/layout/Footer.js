"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "3rem", marginBottom: "4rem" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <svg width="24" height="24" viewBox="0 0 342 512" fill="white">
                <path d="M0 0l171 512L342 0H216l-45 236L126 0H0zm171 57l36 193H135L171 57z" />
              </svg>
              <span style={{ fontFamily: "Georgia, serif", letterSpacing: "0.3em", color: "#fff", fontWeight: 700, fontSize: "1.1rem", textTransform: "uppercase" }}>Tesla</span>
            </div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.875rem", lineHeight: 1.7 }}>
              Accelerating the world&apos;s transition to sustainable energy.
            </p>
          </div>

          <div>
            <p style={{ color: "#fff", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem", fontWeight: 700 }}>Vehicles</p>
            {["Model S", "Model 3", "Model X", "Model Y", "Cybertruck"].map((v) => (
              <div key={v} style={{ marginBottom: "0.75rem" }}>
                <Link href={`/models/${v.toLowerCase().replace(" ", "-")}`} style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", textDecoration: "none" }}>{v}</Link>
              </div>
            ))}
          </div>

          <div>
            <p style={{ color: "#fff", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem", fontWeight: 700 }}>Company</p>
            {["About Us", "Careers", "Press", "Contact"].map((item) => (
              <div key={item} style={{ marginBottom: "0.75rem" }}>
                <Link href="#" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", textDecoration: "none" }}>{item}</Link>
              </div>
            ))}
          </div>

          <div>
            <p style={{ color: "#fff", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.5rem", fontWeight: 700 }}>Support</p>
            {["FAQ", "Find Us", "Service Centers", "Charging"].map((item) => (
              <div key={item} style={{ marginBottom: "0.75rem" }}>
                <Link href="#" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", textDecoration: "none" }}>{item}</Link>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
            © {new Date().getFullYear()} TeslaStore. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Privacy", "Terms", "Accessibility"].map((item) => (
              <Link key={item} href="#" style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", letterSpacing: "0.05em", textDecoration: "none" }}>{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}