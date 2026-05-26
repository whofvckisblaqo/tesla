"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, setCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Models", href: "/models" },
    { label: "Accessories", href: "/accessories" },
    { label: "Track Order", href: "/order/track" },
    { label: "Features", href: "/#features" },
    { label: "About", href: "/#about" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.5s ease",
        background: scrolled ? "rgba(0,0,0,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "80rem",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "4rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
          <svg width="24" height="24" viewBox="0 0 342 512" fill="white">
            <path d="M0 0l171 512L342 0H216l-45 236L126 0H0zm171 57l36 193H135L171 57z" />
          </svg>
          <span style={{ fontFamily: "Georgia, serif", letterSpacing: "0.3em", color: "#fff", fontWeight: 700, fontSize: "1rem", textTransform: "uppercase" }}>
            Tesla
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }} className="desktop-nav">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }} className="desktop-nav">
          <Link
            href="/auth/login"
            style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}
          >
            Sign In
          </Link>

          {/* Cart */}
          <button
            onClick={() => setCartOpen(true)}
            style={{ position: "relative", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", width: "2.25rem", height: "2.25rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}
          >
            🛒
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#E31937", color: "#fff", fontSize: "0.6rem", fontWeight: 700, width: "16px", height: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {cartCount}
              </span>
            )}
          </button>

          <Link
            href="/models"
            style={{ padding: "0.5rem 1.25rem", background: "#E31937", color: "#fff", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}
          >
            Order Now
          </Link>
        </div>

        {/* Mobile Right */}
        <div style={{ display: "none", alignItems: "center", gap: "0.75rem" }} className="mobile-nav">
          <button
            onClick={() => setCartOpen(true)}
            style={{ position: "relative", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "#fff", width: "2.25rem", height: "2.25rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}
          >
            🛒
            {cartCount > 0 && (
              <span style={{ position: "absolute", top: "-6px", right: "-6px", background: "#E31937", color: "#fff", fontSize: "0.6rem", fontWeight: 700, width: "16px", height: "16px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem" }}
            className="mobile-menu-btn"
          >
            <div style={{ width: "1.5rem", display: "flex", flexDirection: "column", gap: "5px" }}>
              <span style={{ display: "block", height: "2px", background: "#fff", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none" }} />
              <span style={{ display: "block", height: "2px", background: "#fff", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: "block", height: "2px", background: "#fff", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none" }} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background: "rgba(0,0,0,0.98)", borderTop: "1px solid rgba(255,255,255,0.08)", padding: "1.5rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none" }}
              >
                {item.label}
              </Link>
            ))}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Link
                href="/auth/login"
                onClick={() => setMenuOpen(false)}
                style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", textAlign: "center" }}
              >
                Sign In
              </Link>
              <Link
                href="/models"
                onClick={() => setMenuOpen(false)}
                style={{ padding: "0.875rem", background: "#E31937", color: "#fff", fontSize: "0.875rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", textDecoration: "none", textAlign: "center" }}
              >
                Order Now
              </Link>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-nav { display: none !important; }
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}