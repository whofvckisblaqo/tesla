"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const STATUS_STEPS = [
  { key: "pending_payment", label: "Order Placed", desc: "Your order has been received", icon: "📋" },
  { key: "paid", label: "Payment Confirmed", desc: "Payment has been verified", icon: "✅" },
  { key: "processing", label: "Processing", desc: "Your Tesla is being prepared", icon: "⚙️" },
  { key: "delivered", label: "Delivered", desc: "Your Tesla has been delivered", icon: "🚗" },
];

const STATUS_COLORS = {
  pending_payment: "#F59E0B",
  paid: "#10B981",
  processing: "#3B82F6",
  delivered: "#8B5CF6",
  cancelled: "#E31937",
};

function getStepIndex(status) {
  const index = STATUS_STEPS.findIndex((s) => s.key === status);
  return index === -1 ? 0 : index;
}

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!orderId.trim() && !email.trim()) {
      setError("Please enter an Order ID or email address");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const params = new URLSearchParams();
      if (orderId.trim()) params.append("orderId", orderId.trim());
      if (email.trim()) params.append("email", email.trim());

      const res = await fetch(`/api/orders/track?${params.toString()}`);
      const data = await res.json();

      if (res.ok && data.order) {
        setOrder(data.order);
      } else {
        setError(data.message || "No order found. Please check your details.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const stepIndex = order ? getStepIndex(order.status) : -1;

  return (
    <>
      <style>{`
        .track-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        .steps-container {
          position: relative;
          padding-left: 2rem;
        }
        .steps-line {
          position: absolute;
          left: 0.6rem;
          top: 0;
          bottom: 0;
          width: 2px;
          background: rgba(255,255,255,0.08);
        }
        .steps-progress {
          position: absolute;
          left: 0.6rem;
          top: 0;
          width: 2px;
          background: linear-gradient(to bottom, #E31937, #10B981);
          transition: height 0.8s ease;
        }
        @media (max-width: 768px) {
          .track-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
      `}</style>

      <main style={{ background: "#000", minHeight: "100vh" }}>
        <Navbar />

        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "clamp(6rem, 12vw, 8rem) clamp(1rem, 4vw, 1.5rem) 5rem" }}>

          {/* Header */}
          <div style={{ marginBottom: "3rem" }}>
            <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Order Status
            </p>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 6vw, 3.5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1 }}>
              Track Your Order
            </h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.9rem", marginTop: "1rem" }}>
              Enter your Order ID or email address to track your Tesla delivery.
            </p>
          </div>

          {/* Search Form */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "clamp(1.25rem, 4vw, 2rem)", marginBottom: "2.5rem" }}>
            <form onSubmit={handleSearch}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem", alignItems: "end" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "0.5rem" }}>
                      Order ID
                    </label>
                    <input
                      type="text"
                      value={orderId}
                      onChange={(e) => { setOrderId(e.target.value); setError(""); }}
                      placeholder="e.g. ABC12345"
                      style={{ width: "100%", padding: "0.875rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
                      onFocus={(e) => (e.target.style.borderColor = "#E31937")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "0.5rem" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      placeholder="you@email.com"
                      style={{ width: "100%", padding: "0.875rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
                      onFocus={(e) => (e.target.style.borderColor = "#E31937")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{ padding: "0.875rem 1.75rem", background: loading ? "rgba(227,25,55,0.5)" : "#E31937", color: "#fff", border: "none", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", whiteSpace: "nowrap", height: "fit-content" }}
                >
                  {loading ? "Searching..." : "Track Order"}
                </button>
              </div>

              {error && (
                <div style={{ background: "rgba(227,25,55,0.1)", border: "1px solid rgba(227,25,55,0.3)", color: "#E31937", padding: "0.875rem 1rem", fontSize: "0.8rem", marginTop: "1rem" }}>
                  {error}
                </div>
              )}
            </form>
          </div>

          {/* Order Result */}
          {order && (
            <div>
              {/* Order Header */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
                <div>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.4rem" }}>Order Found</p>
                  <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>
                    #{order._id?.slice(-8).toUpperCase()}
                  </h2>
                </div>
                <div style={{ padding: "0.5rem 1.25rem", background: `${STATUS_COLORS[order.status] || "#9CA3AF"}15`, border: `1px solid ${STATUS_COLORS[order.status] || "#9CA3AF"}40`, color: STATUS_COLORS[order.status] || "#9CA3AF", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                  {order.status === "pending_payment" ? "Awaiting Payment" :
                   order.status === "paid" ? "Payment Confirmed" :
                   order.status === "processing" ? "Processing" :
                   order.status === "delivered" ? "Delivered" :
                   order.status === "cancelled" ? "Cancelled" : order.status}
                </div>
              </div>

              <div className="track-grid">

                {/* LEFT — Progress */}
                <div>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
                    Delivery Progress
                  </p>

                  {order.status === "cancelled" ? (
                    <div style={{ background: "rgba(227,25,55,0.08)", border: "1px solid rgba(227,25,55,0.2)", padding: "1.5rem", textAlign: "center" }}>
                      <p style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>❌</p>
                      <p style={{ color: "#E31937", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.5rem" }}>Order Cancelled</p>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>This order has been cancelled. Contact support for assistance.</p>
                    </div>
                  ) : (
                    <div className="steps-container">
                      <div className="steps-line" />
                      <div
                        className="steps-progress"
                        style={{ height: `${(stepIndex / (STATUS_STEPS.length - 1)) * 100}%` }}
                      />

                      {STATUS_STEPS.map((step, i) => {
                        const isCompleted = i <= stepIndex;
                        const isCurrent = i === stepIndex;

                        return (
                          <div
                            key={step.key}
                            style={{ position: "relative", marginBottom: i < STATUS_STEPS.length - 1 ? "2rem" : 0, paddingLeft: "1.5rem" }}
                          >
                            {/* Dot */}
                            <div style={{
                              position: "absolute",
                              left: "-1.65rem",
                              top: "0.15rem",
                              width: "1.1rem",
                              height: "1.1rem",
                              borderRadius: "50%",
                              background: isCompleted ? "#10B981" : "rgba(255,255,255,0.1)",
                              border: `2px solid ${isCurrent ? "#E31937" : isCompleted ? "#10B981" : "rgba(255,255,255,0.2)"}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.5rem",
                              transition: "all 0.5s ease",
                              zIndex: 1,
                            }}>
                              {isCompleted && <span style={{ color: "#fff" }}>✓</span>}
                            </div>

                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                                <span style={{ fontSize: "1rem" }}>{step.icon}</span>
                                <p style={{ color: isCompleted ? "#fff" : "rgba(255,255,255,0.3)", fontWeight: isCurrent ? 700 : 500, fontSize: "0.9rem", transition: "color 0.3s" }}>
                                  {step.label}
                                </p>
                                {isCurrent && (
                                  <span style={{ padding: "0.15rem 0.5rem", background: "rgba(227,25,55,0.15)", color: "#E31937", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                                    Current
                                  </span>
                                )}
                              </div>
                              <p style={{ color: isCompleted ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)", fontSize: "0.78rem", lineHeight: 1.5 }}>
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Payment Notice */}
                  {order.status === "pending_payment" && (
                    <div style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)", padding: "1.25rem", marginTop: "2rem" }}>
                      <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                        <span style={{ fontSize: "1.1rem", flexShrink: 0 }}>📧</span>
                        <div>
                          <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.85rem", marginBottom: "0.35rem" }}>Awaiting Payment</p>
                          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", lineHeight: 1.6 }}>
                            Payment instructions have been sent to <strong style={{ color: "#fff" }}>{order.customerEmail}</strong>. Please complete payment to proceed.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT — Order Details */}
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

                  {/* Items */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.25rem" }}>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>Items Ordered</p>
                    {order.items?.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.875rem", marginBottom: i < order.items.length - 1 ? "0.875rem" : 0 }}>
                        <div style={{ width: "60px", height: "44px", backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.7)", flexShrink: 0 }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem", fontFamily: "Georgia, serif", textTransform: "uppercase" }}>{item.name}</p>
                          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem" }}>{item.color} · Qty: {item.quantity}</p>
                        </div>
                        <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem", flexShrink: 0 }}>${(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  {/* Customer Info */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.25rem" }}>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>Delivery Details</p>
                    <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem", marginBottom: "0.35rem" }}>{order.customerName}</p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: "0.25rem" }}>{order.customerEmail}</p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginBottom: "0.25rem" }}>{order.customerPhone}</p>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>{order.address}, {order.city}, {order.country}</p>
                  </div>

                  {/* Payment Plan */}
                  <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.25rem" }}>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1rem" }}>Payment Summary</p>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>Total</span>
                      <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem" }}>${order.totalPrice?.toLocaleString()}</span>
                    </div>
                    {order.downPayment > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>Down Payment</span>
                        <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem" }}>${order.downPayment?.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                    )}
                    {order.monthlyPayment > 0 && (
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>Monthly</span>
                        <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem" }}>${order.monthlyPayment?.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo × {order.loanTerm}mo</span>
                      </div>
                    )}
                    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "0.75rem", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "0.5rem" }}>
                      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>Order Date</span>
                      <span style={{ color: "#fff", fontSize: "0.8rem" }}>
                        {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </span>
                    </div>
                  </div>

                  {/* Help */}
                  <div style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.06)", padding: "1.25rem", textAlign: "center" }}>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginBottom: "0.75rem" }}>Need help with your order?</p>
                    <a
                      href={`mailto:teslasuppport@outlook.com?subject=Order%20%23${order._id?.slice(-8).toUpperCase()}`}
                      style={{ color: "#E31937", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase" }}
                    >
                      Contact Support →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* No result state */}
          {searched && !order && !error && (
            <div style={{ textAlign: "center", padding: "4rem 2rem", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.3 }}>🔍</div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", marginBottom: "0.5rem" }}>No order found</p>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.875rem" }}>Check your Order ID or email and try again</p>
            </div>
          )}

          {/* Empty state */}
          {!searched && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.04)" }}>
              {[
                { icon: "📋", title: "Enter Order ID", desc: "Find your Order ID in your confirmation email" },
                { icon: "📧", title: "Or Use Email", desc: "Search using the email you ordered with" },
                { icon: "🚗", title: "Track Live", desc: "See real-time status of your delivery" },
              ].map((tip, i) => (
                <div key={i} style={{ background: "#000", padding: "2rem", textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{tip.icon}</div>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.5rem" }}>{tip.title}</p>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.78rem", lineHeight: 1.6 }}>{tip.desc}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </main>
    </>
  );
}