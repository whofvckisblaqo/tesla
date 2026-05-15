"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useSession } from "next-auth/react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const orderSubmitted = useRef(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  });

  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate] = useState(9.9);

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

  // Payment calculations
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
    setStep(2);
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
          downPayment: downPaymentUSD,
          monthlyPayment: downPaymentPercent < 100 ? monthlyPayment : 0,
          loanTerm: downPaymentPercent < 100 ? loanTerm : 0,
          interestRate: downPaymentPercent < 100 ? interestRate : 0,
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

  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "8rem 1.5rem 6rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "3rem" }}>
          <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Secure Checkout
          </p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>
            Complete Your Order
          </h1>
        </div>

        {/* Step Indicators */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "3rem" }}>
          {[{ n: 1, label: "Your Details" }, { n: 2, label: "Payment Plan" }, { n: 3, label: "Confirm" }].map((s, i) => (
            <div key={s.n} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "auto" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <div style={{
                  width: "2rem", height: "2rem", borderRadius: "50%",
                  background: step >= s.n ? "#E31937" : "rgba(255,255,255,0.08)",
                  border: `1px solid ${step >= s.n ? "#E31937" : "rgba(255,255,255,0.15)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: "0.75rem", fontWeight: 700, flexShrink: 0,
                }}>
                  {step > s.n ? "✓" : s.n}
                </div>
                <span style={{ color: step >= s.n ? "#fff" : "rgba(255,255,255,0.3)", fontSize: "0.75rem", letterSpacing: "0.1em", whiteSpace: "nowrap" }}>
                  {s.label}
                </span>
              </div>
              {i < 2 && (
                <div style={{ flex: 1, height: "1px", background: step > s.n ? "#E31937" : "rgba(255,255,255,0.1)", margin: "0 1rem" }} />
              )}
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr min(380px, 100%)", gap: "2.5rem", alignItems: "start" }}>

          {/* LEFT */}
          <div>

            {/* STEP 1 — Details */}
            {step === 1 && (
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "2rem" }}>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", marginBottom: "1.75rem", letterSpacing: "0.05em" }}>
                  Your Details
                </h2>

                {error && (
                  <div style={{ background: "rgba(227,25,55,0.1)", border: "1px solid rgba(227,25,55,0.3)", color: "#E31937", padding: "0.875rem 1rem", fontSize: "0.8rem", marginBottom: "1.5rem" }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleDetailsSubmit}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
                    <div>
                      <label style={labelStyle}>Full Name</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "#E31937")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "#E31937")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 000 000 0000"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#E31937")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={labelStyle}>Delivery Address</label>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123 Main Street"
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "#E31937")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "2rem" }}>
                    <div>
                      <label style={labelStyle}>City</label>
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="New York"
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "#E31937")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Country</label>
                      <input
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        placeholder="United States"
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = "#E31937")}
                        onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{ width: "100%", padding: "1rem", background: "#E31937", color: "#fff", border: "none", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}
                  >
                    Continue to Payment Plan →
                  </button>
                </form>
              </div>
            )}

            {/* STEP 2 — Payment Plan */}
            {step === 2 && (
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "2rem" }}>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", marginBottom: "0.5rem", letterSpacing: "0.05em" }}>
                  Payment Plan
                </h2>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "2rem" }}>
                  Choose how you'd like to pay. Payment instructions will be sent to your email after confirmation.
                </p>

                {/* Down Payment Slider */}
                <div style={{ marginBottom: "2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <label style={labelStyle}>Down Payment</label>
                    <span style={{ color: "#E31937", fontWeight: 700, fontSize: "0.875rem" }}>
                      {downPaymentPercent}% — ${downPaymentUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="5"
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    style={{ width: "100%", accentColor: "#E31937", cursor: "pointer" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.70rem" }}>10% minimum</span>
                    <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.70rem" }}>100% full payment</span>
                  </div>
                </div>

                {/* Loan Term */}
                {downPaymentPercent < 100 && (
                  <div style={{ marginBottom: "2rem" }}>
                    <label style={{ ...labelStyle, marginBottom: "1rem" }}>Loan Term</label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem" }}>
                      {[24, 36, 48, 60, 72, 84].map((months) => (
                        <button
                          key={months}
                          onClick={() => setLoanTerm(months)}
                          style={{
                            padding: "0.875rem",
                            border: `1px solid ${loanTerm === months ? "#E31937" : "rgba(255,255,255,0.1)"}`,
                            background: loanTerm === months ? "rgba(227,25,55,0.15)" : "transparent",
                            color: loanTerm === months ? "#fff" : "rgba(255,255,255,0.5)",
                            cursor: "pointer",
                            fontSize: "0.8rem",
                            fontWeight: loanTerm === months ? 700 : 400,
                            transition: "all 0.2s",
                          }}
                        >
                          {months} months
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Breakdown */}
                <div style={{ background: "rgba(227,25,55,0.05)", border: "1px solid rgba(227,25,55,0.15)", padding: "1.5rem", marginBottom: "2rem" }}>
                  <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>
                    Payment Breakdown
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[
                      { label: "Vehicle Total", value: `$${cartTotal.toLocaleString()}` },
                      { label: `Down Payment (${downPaymentPercent}%)`, value: `$${downPaymentUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                      ...(downPaymentPercent < 100 ? [
                        { label: "Financed Amount", value: `$${loanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                        { label: `Monthly (${loanTerm}mo @ ${interestRate}% APR)`, value: `$${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo` },
                        { label: "Total Interest", value: `$${totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                      ] : []),
                    ].map((row) => (
                      <div key={row.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>{row.label}</span>
                        <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "1rem" }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, padding: "1rem", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>
                    ← Back
                  </button>
                  <button onClick={() => setStep(3)} style={{ flex: 2, padding: "1rem", background: "#E31937", color: "#fff", border: "none", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                    Review Order →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 — Confirm */}
            {step === 3 && (
              <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "2rem" }}>
                <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", marginBottom: "1.75rem", letterSpacing: "0.05em" }}>
                  Review & Confirm
                </h2>

                {/* Delivery Info */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                    Delivery Details
                  </p>
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "1.25rem" }}>
                    <p style={{ color: "#fff", fontWeight: 600, marginBottom: "0.4rem" }}>{form.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: "0.25rem" }}>{form.email}</p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: "0.25rem" }}>{form.phone}</p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>{form.address}, {form.city}, {form.country}</p>
                  </div>
                </div>

                {/* Payment Plan */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                    Payment Plan
                  </p>
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", padding: "1.25rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>Down Payment</span>
                      <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.8rem" }}>{downPaymentPercent}% — ${downPaymentUSD.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    {downPaymentPercent < 100 && (
                      <>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>Loan Term</span>
                          <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.8rem" }}>{loanTerm} months</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", }}>
                          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>Monthly Payment</span>
                          <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.8rem" }}>${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</span>
                        </div>
                      </>
                    )}
                    {downPaymentPercent === 100 && (
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>Payment Type</span>
                        <span style={{ color: "#10B981", fontWeight: 600, fontSize: "0.8rem" }}>Full Payment</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notice */}
                <div style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)", padding: "1.25rem", marginBottom: "1.75rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>📧</span>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.8rem", lineHeight: 1.7 }}>
                    After confirming your order, payment instructions will be sent to <strong style={{ color: "#fff" }}>{form.email}</strong>. Please check your inbox to complete the payment.
                  </p>
                </div>

                {error && (
                  <div style={{ background: "rgba(227,25,55,0.1)", border: "1px solid rgba(227,25,55,0.3)", color: "#E31937", padding: "0.875rem 1rem", fontSize: "0.8rem", marginBottom: "1.5rem" }}>
                    {error}
                  </div>
                )}

                <div style={{ display: "flex", gap: "1rem" }}>
                  <button onClick={() => setStep(2)} style={{ flex: 1, padding: "1rem", background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmitOrder}
                    disabled={loading}
                    style={{ flex: 2, padding: "1rem", background: loading ? "rgba(227,25,55,0.5)" : "#E31937", color: "#fff", border: "none", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer" }}
                  >
                    {loading ? "Submitting..." : "Confirm Order"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Order Summary */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem", position: "sticky", top: "6rem" }}>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.5rem" }}>
              Order Summary
            </h3>

            {cartItems.map((item, i) => (
              <div key={i} style={{ marginBottom: "1.25rem" }}>
                <div style={{ height: "100px", backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.7)", marginBottom: "0.75rem" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", fontFamily: "Georgia, serif", textTransform: "uppercase" }}>{item.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", marginTop: "0.2rem" }}>{item.color} · Qty: {item.quantity}</p>
                  </div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>${(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem", marginTop: "0.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>Subtotal</span>
                <span style={{ color: "#fff", fontSize: "0.8rem" }}>${cartTotal.toLocaleString()}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>Delivery</span>
                <span style={{ color: "#10B981", fontSize: "0.8rem" }}>Free</span>
              </div>
              {step >= 2 && (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>Down Payment</span>
                    <span style={{ color: "#E31937", fontSize: "0.8rem", fontWeight: 700 }}>{downPaymentPercent}%</span>
                  </div>
                  {downPaymentPercent < 100 && (
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>Monthly</span>
                      <span style={{ color: "#fff", fontSize: "0.8rem" }}>${monthlyPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo</span>
                    </div>
                  )}
                </>
              )}
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1rem", marginTop: "0.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>Total</span>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: "1.25rem" }}>${cartTotal.toLocaleString()}</span>
            </div>

            <div style={{ marginTop: "1.25rem", padding: "1rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", lineHeight: 1.6 }}>
                Payment instructions will be emailed to you after order confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}