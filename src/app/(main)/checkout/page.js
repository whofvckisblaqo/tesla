"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { data: session, status } = useSession();
  const router = useRouter();
  const orderSubmitted = useRef(false);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  const hasCarItems = cartItems.some((i) => i.type === "car" || !i.type);

  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate] = useState(9.9);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (session?.user) {
      setForm((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
      }));
    }
  }, [session]);

  useEffect(() => {
    if (cartItems.length === 0 && !orderSubmitted.current) {
      router.push("/models");
    }
  }, [cartItems]);

  const downPaymentUSD = (cartTotal * downPaymentPercent) / 100;
  const loanAmount = cartTotal - downPaymentUSD;
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment =
    loanAmount > 0 && downPaymentPercent < 100
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
        (Math.pow(1 + monthlyRate, loanTerm) - 1)
      : 0;
  const totalInterest = monthlyPayment * loanTerm - loanAmount;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.country) {
      setError("Please fill in all fields");
      return;
    }
    setStep(hasCarItems ? 2 : 3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmitOrder = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          totalPrice: cartTotal,
          downPayment: hasCarItems ? downPaymentUSD : cartTotal,
          monthlyPayment: hasCarItems && downPaymentPercent < 100 ? monthlyPayment : 0,
          loanTerm: hasCarItems && downPaymentPercent < 100 ? loanTerm : 0,
          interestRate: hasCarItems && downPaymentPercent < 100 ? interestRate : 0,
          address: form.address,
          city: form.city,
          country: form.country,
          phone: form.phone,
          name: form.name,
          email: form.email,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        orderSubmitted.current = true;
        clearCart();
        router.push(
          `/order/success?orderId=${data.orderId}&email=${encodeURIComponent(form.email)}`
        );
      } else {
        setError(data.message || "Order failed. Please try again.");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <main style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", fontSize: "0.875rem" }}>Loading...</p>
      </main>
    );
  }

  if (status === "unauthenticated") {
    return (
      <main style={{ background: "#000", minHeight: "100vh" }}>
        <Navbar />
        <div style={{ maxWidth: "40rem", margin: "0 auto", padding: "clamp(6rem, 14vw, 10rem) clamp(1rem, 4vw, 1.5rem) 5rem", textAlign: "center" }}>

          {/* Lock icon */}
          <div style={{ width: "4rem", height: "4rem", margin: "0 auto 2rem", background: "rgba(227,25,55,0.08)", border: "1px solid rgba(227,25,55,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E31937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Sign In Required
          </p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 5vw, 2.5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1.1, marginBottom: "1.25rem" }}>
            Continue to Checkout
          </h1>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "2.5rem" }}>
            You need to sign in or create an account before completing your purchase. Your cart will be saved.
          </p>

          {/* Cart preview */}
          {cartItems.length > 0 && (
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.25rem", marginBottom: "2.5rem", textAlign: "left" }}>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>Your Cart</p>
              {cartItems.map((item, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", paddingBottom: i < cartItems.length - 1 ? "0.75rem" : 0, marginBottom: i < cartItems.length - 1 ? "0.75rem" : 0, borderBottom: i < cartItems.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem", fontFamily: "Georgia, serif", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", marginTop: "0.15rem" }}>Qty: {item.quantity}</p>
                  </div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "0.875rem", marginTop: "0.875rem", display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>Total</span>
                <span style={{ color: "#fff", fontWeight: 800, fontSize: "1rem" }}>${cartTotal.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* CTA buttons */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
            <a
              href="/auth/login?callbackUrl=/checkout"
              style={{ display: "block", padding: "1rem", background: "#E31937", color: "#fff", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}
            >
              Sign In
            </a>
            <a
              href="/auth/signup?callbackUrl=/checkout"
              style={{ display: "block", padding: "1rem", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}
            >
              Create Account
            </a>
          </div>

          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.75rem", marginTop: "1.5rem" }}>
            Already have an account?{" "}
            <a href="/auth/login?callbackUrl=/checkout" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "underline" }}>Sign in here</a>
          </p>
        </div>
        <Footer />
      </main>
    );
  }

  const inputStyle = {
    width: "100%",
    padding: "0.875rem 1rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: "0.875rem",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.7rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.5)",
    marginBottom: "0.5rem",
  };

  const sectionCard = {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: isMobile ? "1.25rem" : "2rem",
  };

  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: isMobile ? "6rem 1rem 4rem" : "8rem 1.5rem 6rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Secure Checkout
          </p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 5vw, 3rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>
            Complete Your Order
          </h1>
        </div>

        {/* Step Indicators */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "2.5rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
          {(hasCarItems
            ? [{ n: 1, label: "Details" }, { n: 2, label: "Payment Plan" }, { n: 3, label: "Confirm" }]
            : [{ n: 1, label: "Details" }, { n: 3, label: "Confirm" }]
          ).map((s, i, arr) => (
            <div key={s.n} style={{ display: "flex", alignItems: "center", flex: i < arr.length - 1 ? 1 : "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", flexShrink: 0 }}>
                <div style={{
                  width: "1.75rem", height: "1.75rem", borderRadius: "50%",
                  background: step >= s.n ? "#E31937" : "rgba(255,255,255,0.08)",
                  border: `1px solid ${step >= s.n ? "#E31937" : "rgba(255,255,255,0.15)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: "0.7rem", fontWeight: 700, flexShrink: 0,
                }}>
                  {step > s.n ? "✓" : i + 1}
                </div>
                <span style={{
                  color: step >= s.n ? "#fff" : "rgba(255,255,255,0.3)",
                  fontSize: isMobile ? "0.65rem" : "0.75rem",
                  letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                }}>
                  {s.label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <div style={{ flex: 1, height: "1px", background: step > s.n ? "#E31937" : "rgba(255,255,255,0.1)", margin: "0 0.5rem" }} />
              )}
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 360px",
          gap: isMobile ? "1.5rem" : "2.5rem",
          alignItems: "start",
        }}>

          {/* LEFT — Steps */}
          <div>

            {/* STEP 1 */}
            {step === 1 && (
              <div style={sectionCard}>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", marginBottom: "1.5rem", letterSpacing: "0.05em" }}>
                  Your Details
                </h2>

                {error && (
                  <div style={{ background: "rgba(227,25,55,0.1)", border: "1px solid rgba(227,25,55,0.3)", color: "#E31937", padding: "0.875rem 1rem", fontSize: "0.8rem", marginBottom: "1.25rem" }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleDetailsSubmit}>
                  {/* Name + Email */}
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                    </div>
                  </div>

                  {/* Phone */}
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={labelStyle}>Phone Number</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+1 000 000 0000" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                  </div>

                  {/* Address */}
                  <div style={{ marginBottom: "1rem" }}>
                    <label style={labelStyle}>Delivery Address</label>
                    <input name="address" value={form.address} onChange={handleChange} placeholder="123 Main Street" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                  </div>

                  {/* City + Country */}
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1rem", marginBottom: "1.75rem" }}>
                    <div>
                      <label style={labelStyle}>City</label>
                      <input name="city" value={form.city} onChange={handleChange} placeholder="New York" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                    </div>
                    <div>
                      <label style={labelStyle}>Country</label>
                      <input name="country" value={form.country} onChange={handleChange} placeholder="United States" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
                    </div>
                  </div>

                  <button type="submit" style={{ width: "100%", padding: "1rem", background: "#E31937", color: "#fff", border: "none", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                    Continue to Payment Plan →
                  </button>
                </form>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div style={sectionCard}>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  Payment Plan
                </h2>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "2rem" }}>
                  Choose how you'd like to pay. Instructions will be emailed after confirmation.
                </p>

                {/* Down Payment */}
                <div style={{ marginBottom: "2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                    <label style={labelStyle}>Down Payment</label>
                    <span style={{ color: "#E31937", fontWeight: 700, fontSize: "0.875rem" }}>
                      {downPaymentPercent}% — ${downPaymentUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <input
                    type="range" min="10" max="100" step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#E31937", cursor: "pointer" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>10% min</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>100% full</span>
                  </div>
                </div>

                {/* Loan Term */}
                {downPaymentPercent < 100 && (
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ ...labelStyle, marginBottom: "0.75rem" }}>Loan Term</label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.6rem" }}>
                      {[24, 36, 48, 60, 72, 84].map((months) => (
                        <button
                          key={months}
                          onClick={() => setLoanTerm(months)}
                          style={{
                            padding: isMobile ? "0.625rem 0.25rem" : "0.875rem",
                            border: `1px solid ${loanTerm === months ? "#E31937" : "rgba(255,255,255,0.1)"}`,
                            background: loanTerm === months ? "rgba(227,25,55,0.15)" : "transparent",
                            color: loanTerm === months ? "#fff" : "rgba(255,255,255,0.5)",
                            cursor: "pointer",
                            fontSize: isMobile ? "0.7rem" : "0.8rem",
                            fontWeight: loanTerm === months ? 700 : 400,
                            transition: "all 0.2s",
                          }}
                        >
                          {months}mo
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Breakdown */}
                <div style={{ background: "rgba(227,25,55,0.05)", border: "1px solid rgba(227,25,55,0.15)", padding: "1.25rem", marginBottom: "1.75rem" }}>
                  <p style={{ color: "#E31937", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>
                    Breakdown
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                    {[
                      { label: "Vehicle Total", value: `$${cartTotal.toLocaleString()}` },
                      { label: `Down (${downPaymentPercent}%)`, value: `$${downPaymentUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                      ...(downPaymentPercent < 100 ? [
                        { label: "Financed", value: `$${loanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                        { label: `Monthly (${loanTerm}mo @ ${interestRate}%)`, value: `$${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo` },
                        { label: "Total Interest", value: `$${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                      ] : []),
                    ].map((row) => (
                      <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>{row.label}</span>
                        <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.8rem", flexShrink: 0 }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button onClick={() => { setStep(1); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ flex: 1, padding: "0.875rem", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
                    ← Back
                  </button>
                  <button onClick={() => { setStep(3); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ flex: 2, padding: "0.875rem", background: "#E31937", color: "#fff", border: "none", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div style={sectionCard}>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                  Review & Confirm
                </h2>

                {/* Delivery */}
                <div style={{ marginBottom: "1.25rem" }}>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                    Delivery Details
                  </p>
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "1.1rem" }}>
                    <p style={{ color: "#fff", fontWeight: 600, marginBottom: "0.35rem", fontSize: "0.9rem" }}>{form.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", marginBottom: "0.2rem" }}>{form.email}</p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", marginBottom: "0.2rem" }}>{form.phone}</p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>{form.address}, {form.city}, {form.country}</p>
                  </div>
                </div>

                {/* Payment Summary — only for car orders */}
                {hasCarItems && <div style={{ marginBottom: "1.25rem" }}>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.6rem" }}>
                    Payment Plan
                  </p>
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "1.1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>Down Payment</span>
                      <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.78rem" }}>{downPaymentPercent}% — ${downPaymentUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    {downPaymentPercent < 100 ? (
                      <>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>Loan Term</span>
                          <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.78rem" }}>{loanTerm} months</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>Monthly</span>
                          <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.78rem" }}>${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</span>
                        </div>
                      </>
                    ) : (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem" }}>Payment Type</span>
                        <span style={{ color: "#10B981", fontWeight: 600, fontSize: "0.78rem" }}>Full Payment</span>
                      </div>
                    )}
                  </div>
                </div>}

                {/* Email Notice */}
                <div style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)", padding: "1.1rem", marginBottom: "1.25rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>📧</span>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.78rem", lineHeight: 1.7 }}>
                    Payment instructions will be sent to <strong style={{ color: "#fff" }}>{form.email}</strong> after confirmation.
                  </p>
                </div>

                {error && (
                  <div style={{ background: "rgba(227,25,55,0.1)", border: "1px solid rgba(227,25,55,0.3)", color: "#E31937", padding: "0.875rem 1rem", fontSize: "0.8rem", marginBottom: "1.25rem" }}>
                    {error}
                  </div>
                )}

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button onClick={() => { setStep(hasCarItems ? 2 : 1); window.scrollTo({ top: 0, behavior: "smooth" }); }} style={{ flex: 1, padding: "0.875rem", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmitOrder}
                    disabled={loading}
                    style={{ flex: 2, padding: "0.875rem", background: loading ? "rgba(227,25,55,0.5)" : "#E31937", color: "#fff", border: "none", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer" }}
                  >
                    {loading ? "Submitting..." : "Confirm Order"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Order Summary */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: isMobile ? "1.25rem" : "1.5rem",
            position: isMobile ? "relative" : "sticky",
            top: isMobile ? "auto" : "6rem",
            order: isMobile ? -1 : 1,
          }}>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>
              Order Summary
            </h3>

            {cartItems.map((item, i) => (
              <div key={i} style={{ marginBottom: "1rem" }}>
                <div style={{ height: isMobile ? "80px" : "100px", backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.7)", marginBottom: "0.75rem" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                  <div>
                    <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", fontFamily: "Georgia, serif", textTransform: "uppercase" }}>{item.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", marginTop: "0.2rem" }}>{item.color} · Qty: {item.quantity}</p>
                  </div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", flexShrink: 0 }}>${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem", marginTop: "0.5rem" }}>
              {[
                { label: "Subtotal", value: `$${cartTotal.toLocaleString()}` },
                { label: "Delivery", value: "Free", color: "#10B981" },
                ...(hasCarItems && step >= 2 ? [{ label: "Down Payment", value: `${downPaymentPercent}%`, color: "#E31937" }] : []),
                ...(hasCarItems && step >= 2 && downPaymentPercent < 100 ? [{ label: "Monthly", value: `$${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo` }] : []),
              ].map((row) => (
                <div key={row.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem" }}>{row.label}</span>
                  <span style={{ color: row.color || "#fff", fontSize: "0.78rem", fontWeight: row.color ? 700 : 400 }}>{row.value}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem", marginTop: "0.25rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Total</span>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.2rem" }}>${cartTotal.toLocaleString()}</span>
            </div>

            <div style={{ marginTop: "1rem", padding: "0.875rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", lineHeight: 1.6 }}>
                Payment instructions will be emailed after confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}