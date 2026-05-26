"use client";

import Link from "next/link";
import TeslaLogo from "@/components/shared/TeslaLogo";

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-grid {
          display: grid;
          gap: 2.5rem;
          margin-bottom: clamp(2.5rem, 6vw, 4rem);
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
        }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          flex-wrap: wrap;
        }
        .footer-links {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr; gap: 2rem; }
          .footer-bottom { flex-direction: column; align-items: flex-start; }
        }
      `}</style>

      <footer style={{ background: "#000", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "clamp(3rem, 8vw, 5rem) clamp(1rem, 4vw, 1.5rem)" }}>

          <div className="footer-grid">
            {/* Brand */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <TeslaLogo width={22} height={22} />
                <span style={{ fontFamily: "Georgia, serif", letterSpacing: "0.3em", color: "#fff", fontWeight: 700, fontSize: "1rem", textTransform: "uppercase" }}>
                  Tesla
                </span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.875rem", lineHeight: 1.7, maxWidth: "220px" }}>
                Accelerating the world&apos;s transition to sustainable energy.
              </p>
            </div>

            {/* Vehicles */}
            <div>
              <p style={{ color: "#fff", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.25rem", fontWeight: 700 }}>
                Vehicles
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {["Model S", "Model 3", "Model X", "Model Y", "Cybertruck"].map((v) => (
                  <Link
                    key={v}
                    href={`/models/${v.toLowerCase().replace(" ", "-")}`}
                    style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", textDecoration: "none" }}
                  >
                    {v}
                  </Link>
                ))}
                <Link href="/accessories" style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", textDecoration: "none" }}>
                  Accessories
                </Link>
              </div>
            </div>

            {/* Company */}
            <div>
              <p style={{ color: "#fff", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.25rem", fontWeight: 700 }}>
                Company
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Careers", href: "/careers" },
                  { label: "Press", href: "/press" },
                  { label: "Contact", href: "/contact" },
                ].map((item) => (
                  <Link key={item.label} href={item.href} style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", textDecoration: "none" }}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Support */}
            <div>
              <p style={{ color: "#fff", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.25rem", fontWeight: 700 }}>
                Support
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { label: "FAQ", href: "/faq" },
                  { label: "Find Us", href: "/find-us" },
                  { label: "Service Centers", href: "/service-centers" },
                  { label: "Charging", href: "/charging" },
                  { label: "Track Order", href: "/order/track" },
                ].map((item) => (
                  <Link key={item.label} href={item.href} style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", textDecoration: "none" }}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="footer-bottom">
            <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", letterSpacing: "0.05em" }}>
              © {new Date().getFullYear()} TeslaStore. All rights reserved.
            </p>
            <div className="footer-links">
              {[
                { label: "Privacy", href: "/privacy" },
                { label: "Terms", href: "/terms" },
                { label: "Accessibility", href: "/accessibility" },
              ].map((item) => (
                <Link key={item.label} href={item.href} style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", textDecoration: "none" }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}