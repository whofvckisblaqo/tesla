"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

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

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [updatingId, setUpdatingId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.push("/admin/login");
      return;
    }

    if (status === "authenticated") {
      console.log("Session user:", session?.user);
      console.log("Role:", session?.user?.role);

      if (session?.user?.role !== "admin") {
        router.push("/");
        return;
      }

      fetchData();
    }
  }, [status, session]);

  const fetchData = async () => {
    try {
      const [ordersRes, usersRes] = await Promise.all([
        fetch("/api/admin/orders"),
        fetch("/api/admin/users"),
      ]);
      const ordersData = await ordersRes.json();
      const usersData = await usersRes.json();
      setOrders(ordersData.orders || []);
      setUsers(usersData.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) =>
            o._id === orderId ? { ...o, status: newStatus } : o
          )
        );
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  if (status === "loading") {
    return (
      <main style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", fontSize: "0.875rem" }}>
          Loading...
        </p>
      </main>
    );
  }

  if (status === "unauthenticated") return null;
  if (session?.user?.role !== "admin") return null;

  const totalRevenue = orders.reduce((s, o) => s + (o.totalPrice || 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "pending_payment").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;

  const tabs = ["overview", "orders", "users"];

  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ maxWidth: "80rem", margin: "0 auto", padding: isMobile ? "6rem 1rem 4rem" : "8rem 1.5rem 6rem" }}>

        {/* Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Admin Panel
          </p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 5vw, 3rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>
            Dashboard
          </h1>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: "1px", background: "rgba(255,255,255,0.06)", marginBottom: "2.5rem" }}>
          {[
            { label: "Total Orders", value: orders.length, color: "#fff" },
            { label: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, color: "#10B981" },
            { label: "Pending Payment", value: pendingOrders, color: "#F59E0B" },
            { label: "Total Users", value: users.length, color: "#3B82F6" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#000", padding: isMobile ? "1.25rem" : "1.75rem", textAlign: "center" }}>
              <p style={{ color: stat.color, fontFamily: "Georgia, serif", fontSize: isMobile ? "1.5rem" : "2rem", fontWeight: 900, marginBottom: "0.25rem" }}>
                {stat.value}
              </p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: "2rem", overflowX: "auto" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: isMobile ? "0.75rem 1rem" : "0.875rem 1.5rem",
                background: "none",
                border: "none",
                borderBottom: `2px solid ${activeTab === tab ? "#E31937" : "transparent"}`,
                color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.4)",
                fontSize: isMobile ? "0.7rem" : "0.8rem",
                fontWeight: activeTab === tab ? 700 : 400,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                marginBottom: "-1px",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "1.5rem" }}>

            {/* Recent Orders */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                <h3 style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: 700, textTransform: "uppercase" }}>
                  Recent Orders
                </h3>
                <button
                  onClick={() => setActiveTab("orders")}
                  style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.1em", background: "none", border: "none", cursor: "pointer", textTransform: "uppercase" }}
                >
                  View All
                </button>
              </div>

              {loading ? (
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", textAlign: "center", padding: "2rem 0" }}>Loading...</p>
              ) : orders.length === 0 ? (
                <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", textAlign: "center", padding: "2rem 0" }}>No orders yet</p>
              ) : (
                orders.slice(0, 5).map((order, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.875rem 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.06)" : "none", gap: "0.5rem", flexWrap: "wrap" }}>
                    <div>
                      <p style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600 }}>
                        #{order._id?.slice(-6).toUpperCase()}
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", marginTop: "0.15rem" }}>
                        {order.customerName}
                      </p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600 }}>
                        ${order.totalPrice?.toLocaleString()}
                      </p>
                      <span style={{
                        display: "inline-block",
                        marginTop: "0.25rem",
                        padding: "0.2rem 0.5rem",
                        background: `${STATUS_COLORS[order.status]}15`,
                        color: STATUS_COLORS[order.status] || "#9CA3AF",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}>
                        {STATUS_LABELS[order.status] || order.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Status Breakdown + Recent Users */}
            <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem" }}>
              <h3 style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "1.25rem" }}>
                Status Breakdown
              </h3>

              {Object.entries(STATUS_LABELS).map(([key, label]) => {
                const count = orders.filter((o) => o.status === key).length;
                const pct = orders.length > 0 ? (count / orders.length) * 100 : 0;
                return (
                  <div key={key} style={{ marginBottom: "1.1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                      <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem" }}>{label}</span>
                      <span style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 600 }}>{count}</span>
                    </div>
                    <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: STATUS_COLORS[key], borderRadius: "2px", transition: "width 0.5s ease" }} />
                    </div>
                  </div>
                );
              })}

              <h3 style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: 700, textTransform: "uppercase", marginTop: "2rem", marginBottom: "1rem" }}>
                Recent Users
              </h3>

              {users.slice(0, 4).map((user, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 0", borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <div>
                    <p style={{ color: "#fff", fontSize: "0.8rem", fontWeight: 600 }}>{user.name}</p>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem" }}>{user.email}</p>
                  </div>
                  <span style={{
                    padding: "0.2rem 0.6rem",
                    background: user.role === "admin" ? "rgba(227,25,55,0.15)" : "rgba(255,255,255,0.06)",
                    color: user.role === "admin" ? "#E31937" : "rgba(255,255,255,0.4)",
                    fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                  }}>
                    {user.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === "orders" && (
          <div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>
              <span style={{ color: "#fff", fontWeight: 700 }}>{orders.length}</span> total orders
            </p>

            {loading ? (
              <p style={{ color: "rgba(255,255,255,0.3)", textAlign: "center", padding: "3rem" }}>Loading...</p>
            ) : orders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}>
                No orders yet
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {orders.map((order, i) => (
                  <div key={i} style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", overflow: "hidden" }}>

                    {/* Order Header */}
                    <div style={{ padding: isMobile ? "1rem" : "1.25rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "0.75rem" : "1.5rem", flexWrap: "wrap" }}>
                        <div>
                          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Order</p>
                          <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>#{order._id?.slice(-8).toUpperCase()}</p>
                        </div>
                        <div>
                          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Customer</p>
                          <p style={{ color: "#fff", fontSize: "0.85rem" }}>{order.customerName}</p>
                        </div>
                        <div>
                          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Email</p>
                          <p style={{ color: "#fff", fontSize: "0.8rem" }}>{order.customerEmail}</p>
                        </div>
                        <div>
                          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Total</p>
                          <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem" }}>${order.totalPrice?.toLocaleString()}</p>
                        </div>
                        <div>
                          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>Date</p>
                          <p style={{ color: "#fff", fontSize: "0.8rem" }}>{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* Status Dropdown */}
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                        disabled={updatingId === order._id}
                        style={{
                          background: `${STATUS_COLORS[order.status]}15`,
                          border: `1px solid ${STATUS_COLORS[order.status]}40`,
                          color: STATUS_COLORS[order.status],
                          padding: "0.4rem 0.75rem",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                        {Object.entries(STATUS_LABELS).map(([val, label]) => (
                          <option key={val} value={val} style={{ background: "#111", color: "#fff" }}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Order Items */}
                    <div style={{ padding: isMobile ? "1rem" : "1.25rem 1.5rem" }}>
                      {order.items?.map((item, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: j < order.items.length - 1 ? "0.875rem" : 0 }}>
                          <div style={{ width: "60px", height: "44px", backgroundImage: `url(${item.image})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.7)", flexShrink: 0 }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem", fontFamily: "Georgia, serif", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {item.name}
                            </p>
                            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem" }}>{item.color} · Qty: {item.quantity}</p>
                          </div>
                          <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.8rem", flexShrink: 0 }}>
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      ))}

                      <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "space-between" }}>
                        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem" }}>
                          📍 {order.address}, {order.city}, {order.country}
                        </p>
                        {order.monthlyPayment > 0 && (
                          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.72rem" }}>
                            💳 ${order.downPayment?.toLocaleString(undefined, { maximumFractionDigits: 0 })} down · ${order.monthlyPayment?.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo × {order.loanTerm}mo
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === "users" && (
          <div>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", letterSpacing: "0.1em", marginBottom: "1.25rem" }}>
              <span style={{ color: "#fff", fontWeight: 700 }}>{users.length}</span> registered users
            </p>

            {isMobile ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {users.map((user, i) => (
                  <div key={i} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "1.1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <p style={{ color: "#fff", fontWeight: 600, fontSize: "0.875rem" }}>{user.name}</p>
                      <span style={{
                        padding: "0.2rem 0.6rem",
                        background: user.role === "admin" ? "rgba(227,25,55,0.15)" : "rgba(255,255,255,0.06)",
                        color: user.role === "admin" ? "#E31937" : "rgba(255,255,255,0.4)",
                        fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                      }}>
                        {user.role}
                      </span>
                    </div>
                    <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", marginBottom: "0.25rem" }}>{user.email}</p>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ border: "1px solid rgba(255,255,255,0.08)", overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr", background: "rgba(255,255,255,0.04)", padding: "0.875rem 1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  {["Name", "Email", "Role", "Joined"].map((h) => (
                    <p key={h} style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>{h}</p>
                  ))}
                </div>
                {users.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "3rem", color: "rgba(255,255,255,0.3)" }}>No users yet</div>
                ) : (
                  users.map((user, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 2fr 1fr 1fr", padding: "1rem 1.5rem", borderBottom: i < users.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none", alignItems: "center" }}>
                      <p style={{ color: "#fff", fontSize: "0.875rem", fontWeight: 600 }}>{user.name}</p>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem" }}>{user.email}</p>
                      <span style={{
                        display: "inline-block",
                        padding: "0.25rem 0.6rem",
                        background: user.role === "admin" ? "rgba(227,25,55,0.15)" : "rgba(255,255,255,0.06)",
                        color: user.role === "admin" ? "#E31937" : "rgba(255,255,255,0.4)",
                        fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
                      }}>
                        {user.role}
                      </span>
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem" }}>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}