"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function OrderSuccessPage() {
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const email = params.get("email");

  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: "2rem 1.5rem" }}>
        <div style={{ maxWidth: "560px", width: "100%", textAlign: "center" }}>

          {/* Icon */}
          <div style={{ width: "5rem", height: "5rem", borderRadius: "50%", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 2rem", fontSize: "2rem", color: "#10B981" }}>
            ✓
          </div>

          <p style={{ color: "#10B981", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Order Received
          </p>

          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 2.75rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Thank You!
          </h1>

          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "2.5rem" }}>
            Your order has been successfully placed. We are reviewing your details and will send payment instructions to your email shortly.
          </p>

          {/* Email Notice */}
          <div style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)", padding: "1.75rem", marginBottom: "2rem", textAlign: "left" }}>
            <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
              <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>📧</span>
              <div>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                  Check Your Email
                </p>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", lineHeight: 1.7 }}>
                  Payment details and instructions have been sent to{" "}
                  {email ? (
                    <strong style={{ color: "#fff" }}>{email}</strong>
                  ) : (
                    "your email address"
                  )}
                  . Please follow the instructions to complete your payment and confirm your order.
                </p>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.75rem", marginBottom: "2rem", textAlign: "left" }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              What Happens Next
            </p>
            {[
              { step: "01", text: "You receive payment instructions in your email." },
              { step: "02", text: "Complete payment using the provided details." },
              { step: "03", text: "We confirm your payment and process your order." },
              { step: "04", text: "Your Tesla is prepared for delivery." },
            ].map((item) => (
              <div key={item.step} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1rem" }}>
                <span style={{ color: "#E31937", fontWeight: 900, fontSize: "0.8rem", fontFamily: "Georgia, serif", flexShrink: 0, marginTop: "0.1rem" }}>{item.step}</span>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", lineHeight: 1.6 }}>{item.text}</p>
              </div>
            ))}
          </div>

          {/* Order ID */}
          {orderId && (
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", padding: "1rem", marginBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Order ID</span>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", letterSpacing: "0.05em" }}>#{orderId.slice(-8).toUpperCase()}</span>
            </div>
          )}

          {/* CTAs */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <Link href="/dashboard" style={{ padding: "1rem", background: "#E31937", color: "#fff", textDecoration: "none", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", display: "block" }}>
              View My Orders
            </Link>
            <Link href="/models" style={{ padding: "1rem", background: "transparent", color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.15)", display: "block" }}>
              Continue Browsing
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}