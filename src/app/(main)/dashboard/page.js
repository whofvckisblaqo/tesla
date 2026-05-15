"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const STATUS_COLORS = {
  pending_payment: "#F59E0B",
  paid: "#10B981",
  processing: "#3B82F6",
  delivered: "#8B5CF6",
  cancelled: "#E31937",
};

const STATUS_LABELS = {
  pending_payment: "Awaiting Payment",
  paid: "Paid",
  processing: "Processing",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status]);

  useEffect(() => {
    if (status === "authenticated") {
      fetchOrders();
    }
  }, [status]);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders/my-orders");
      const data = await res.json();
      if (res.ok) setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <main style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", fontSize: "0.875rem" }}>Loading...</p>
      </main>
    );
  }

  if (!session) return null;

  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "8rem 1.5rem 6rem" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "3rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              My Account
            </p>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1 }}>
              Welcome, {session.user.name?.split(" ")[0]}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", marginTop: "0.5rem" }}>
              {session.user.email}
            </p>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            style={{ padding: "0.75rem 1.5rem", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}
          >
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "3rem" }}>
          {[
            { label: "Total Orders", value: orders.length },
            { label: "Pending Payment", value: orders.filter((o) => o.status === "pending_payment").length },
            { label: "Delivered", value: orders.filter((o) => o.status === "delivered").length },
            { label: "Total Spent", value: `$${orders.reduce((s, o) => s + (o.totalPrice || 0), 0).toLocaleString()}` },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#000", padding: "1.5rem", textAlign: "center" }}>
              <p style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "1.75rem", fontWeight: 900, marginBottom: "0.25rem" }}>
                {stat.value}
              </p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "0", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "2rem" }}>
          {[{ key: "orders", label: "My Orders" }, { key: "profile", label: "Profile" }].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: "0.875rem 1.5rem",
                background: "none",
                border: "none",
                borderBottom: `2px solid ${activeTab === tab.key ? "#E31937" : "transparent"}`,
                color: activeTab === tab.key ? "#fff" : "rgba(255,255,255,0.4)",
                fontSize: "0.8rem",
                fontWeight: activeTab === tab.key ? 700 : 400,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                marginBottom: "-1px",
                transition: "all 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            {loading ? (
              <div style={{ textAlign: "center", padding: "4rem", color: "rgba(255,255,255,0.3)" }}>
                <p style={{ letterSpacing: "0.2em", fontSize: "0.875rem" }}>Loading orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "5rem 2rem", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.3 }}>🚗</div>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", marginBottom: "1.5rem", letterSpacing: "0.1em" }}>
                  You haven&apos;t placed any orders yet
                </p>
                <Link
                  href="/models"
                  style={{ padding: "0.875rem 2rem", background: "#E31937", color: "#fff", textDecoration: "none", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}
                >
                  Browse Models
                </Link>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {orders.map((order, i) => (
                  <div
                    key={i}
                    style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", overflow: "hidden" }}
                  >
                    {/* Order Header */}
                    <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                        <div>
                          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.2rem" }}>Order ID</p>
                          <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>
                            #{order._id?.toString().slice(-8).toUpperCase()}
                          </p>
                        </div>
                        <div>
                          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.2rem" }}>Date</p>
                          <p style={{ color: "#fff", fontSize: "0.875rem" }}>
                            {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                          </p>
                        </div>
                        <div>
                          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.2rem" }}>Total</p>
                          <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>
                            ${order.totalPrice?.toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div style={{
                        padding: "0.375rem 0.875rem",
                        background: `${STATUS_COLORS[order.status] || "#9CA3AF"}15`,
                        border: `1px solid ${STATUS_COLORS[order.status] || "#9CA3AF"}40`,
                        color: STATUS_COLORS[order.status] || "#9CA3AF",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                      }}>
                        {STATUS_LABELS[order.status] || order.status}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div style={{ padding: "1.25rem 1.5rem" }}>
                      {order.items?.map((item, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: j < order.items.length - 1 ? "1rem" : 0 }}>
                          <div style={{ width: "80px", height: "56px", backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.7)", flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem", fontFamily: "Georgia, serif", textTransform: "uppercase" }}>{item.name}</p>
                            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "0.2rem" }}>{item.color} · Qty: {item.quantity}</p>
                          </div>
                          <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.875rem" }}>
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}

                      {/* Payment Plan */}
                      {order.monthlyPayment > 0 && (
                        <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                          <div>
                            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.2rem" }}>Down Payment</p>
                            <p style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600 }}>${order.downPayment?.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                          </div>
                          <div>
                            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.2rem" }}>Monthly</p>
                            <p style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600 }}>${order.monthlyPayment?.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo × {order.loanTerm}mo</p>
                          </div>
                        </div>
                      )}

                      {/* Delivery info */}
                      <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>
                          📍 {order.address}, {order.city}, {order.country}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "2rem", maxWidth: "500px" }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#fff", textTransform: "uppercase", marginBottom: "1.75rem" }}>
              Profile Info
            </h2>

            {[
              { label: "Full Name", value: session.user.name },
              { label: "Email Address", value: session.user.email },
              { label: "Account Role", value: session.user.role || "Customer" },
            ].map((row) => (
              <div key={row.label} style={{ marginBottom: "1.25rem" }}>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.5rem" }}>
                  {row.label}
                </p>
                <p style={{ color: "#fff", fontSize: "0.95rem", padding: "0.875rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  {row.value}
                </p>
              </div>
            ))}

            <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                style={{ width: "100%", padding: "0.875rem", background: "transparent", border: "1px solid rgba(227,25,55,0.3)", color: "#E31937", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}