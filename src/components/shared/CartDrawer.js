"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
  const {
    cartItems,
    cartOpen,
    setCartOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
  } = useCart();

  return (
    <>
      {/* Backdrop */}
      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            zIndex: 100,
            backdropFilter: "blur(4px)",
          }}
        />
      )}

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "100%",
          maxWidth: "420px",
          background: "#0a0a0a",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          zIndex: 101,
          transform: cartOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <h2
              style={{
                color: "#fff",
                fontFamily: "Georgia, serif",
                fontSize: "1.25rem",
                fontWeight: 900,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
              }}
            >
              Your Cart
            </h2>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "0.2rem" }}>
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </p>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              width: "2.25rem",
              height: "2.25rem",
              cursor: "pointer",
              fontSize: "1.1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.5rem" }}>
          {cartItems.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "1rem",
                paddingTop: "4rem",
              }}
            >
              <div style={{ fontSize: "3rem", opacity: 0.2 }}>🚗</div>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.875rem", letterSpacing: "0.1em" }}>
                Your cart is empty
              </p>
              <button
                onClick={() => setCartOpen(false)}
                style={{
                  padding: "0.75rem 1.5rem",
                  background: "#E31937",
                  color: "#fff",
                  border: "none",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  marginTop: "0.5rem",
                }}
              >
                Browse Models
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {cartItems.map((item, i) => (
                <div
                  key={i}
                  style={{
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.02)",
                    overflow: "hidden",
                  }}
                >
                  {/* Car Image */}
                  <div
                    style={{
                      height: "140px",
                      backgroundImage: `url(${item.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "brightness(0.7)",
                    }}
                  />

                  {/* Item Info */}
                  <div style={{ padding: "1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <div>
                        <p
                          style={{
                            color: "#fff",
                            fontFamily: "Georgia, serif",
                            fontWeight: 700,
                            fontSize: "1rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {item.name}
                        </p>
                        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", letterSpacing: "0.1em", marginTop: "0.15rem" }}>
                          {item.color}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.slug, item.color)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "rgba(255,255,255,0.3)",
                          cursor: "pointer",
                          fontSize: "0.85rem",
                          padding: "0.2rem",
                        }}
                      >
                        ✕
                      </button>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "0.75rem" }}>
                      {/* Quantity */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.slug, item.color, item.quantity - 1)}
                          style={{
                            width: "2rem",
                            height: "2rem",
                            background: "none",
                            border: "none",
                            color: "#fff",
                            cursor: "pointer",
                            fontSize: "1rem",
                          }}
                        >
                          −
                        </button>
                        <span
                          style={{
                            width: "2rem",
                            textAlign: "center",
                            color: "#fff",
                            fontSize: "0.875rem",
                            fontWeight: 600,
                          }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.slug, item.color, item.quantity + 1)}
                          style={{
                            width: "2rem",
                            height: "2rem",
                            background: "none",
                            border: "none",
                            color: "#fff",
                            cursor: "pointer",
                            fontSize: "1rem",
                          }}
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <p style={{ color: "#fff", fontWeight: 700, fontSize: "1rem" }}>
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div
            style={{
              padding: "1.5rem",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Total */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.25rem",
              }}
            >
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Total
              </p>
              <p style={{ color: "#fff", fontSize: "1.5rem", fontWeight: 800 }}>
                ${cartTotal.toLocaleString()}
              </p>
            </div>

            {/* Checkout Button */}
            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              style={{
                display: "block",
                width: "100%",
                padding: "1rem",
                background: "#E31937",
                color: "#fff",
                textAlign: "center",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
                boxSizing: "border-box",
              }}
            >
              Checkout
            </Link>

            {/* Continue Shopping */}
            <button
              onClick={() => setCartOpen(false)}
              style={{
                width: "100%",
                padding: "0.875rem",
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}