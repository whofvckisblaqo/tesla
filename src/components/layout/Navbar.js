"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "it", name: "Italian", flag: "🇮🇹" },
  { code: "pt", name: "Portuguese", flag: "🇵🇹" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "zh-CN", name: "Chinese (Simplified)", flag: "🇨🇳" },
  { code: "zh-TW", name: "Chinese (Traditional)", flag: "🇹🇼" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", flag: "🇧🇩" },
  { code: "nl", name: "Dutch", flag: "🇳🇱" },
  { code: "pl", name: "Polish", flag: "🇵🇱" },
  { code: "sv", name: "Swedish", flag: "🇸🇪" },
  { code: "no", name: "Norwegian", flag: "🇳🇴" },
  { code: "da", name: "Danish", flag: "🇩🇰" },
  { code: "fi", name: "Finnish", flag: "🇫🇮" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "id", name: "Indonesian", flag: "🇮🇩" },
  { code: "ms", name: "Malay", flag: "🇲🇾" },
  { code: "th", name: "Thai", flag: "🇹🇭" },
  { code: "vi", name: "Vietnamese", flag: "🇻🇳" },
  { code: "uk", name: "Ukrainian", flag: "🇺🇦" },
  { code: "cs", name: "Czech", flag: "🇨🇿" },
  { code: "el", name: "Greek", flag: "🇬🇷" },
  { code: "hu", name: "Hungarian", flag: "🇭🇺" },
  { code: "ro", name: "Romanian", flag: "🇷🇴" },
  { code: "sk", name: "Slovak", flag: "🇸🇰" },
  { code: "bg", name: "Bulgarian", flag: "🇧🇬" },
  { code: "hr", name: "Croatian", flag: "🇭🇷" },
  { code: "sr", name: "Serbian", flag: "🇷🇸" },
  { code: "lt", name: "Lithuanian", flag: "🇱🇹" },
  { code: "lv", name: "Latvian", flag: "🇱🇻" },
  { code: "et", name: "Estonian", flag: "🇪🇪" },
  { code: "he", name: "Hebrew", flag: "🇮🇱" },
  { code: "fa", name: "Persian", flag: "🇮🇷" },
  { code: "ur", name: "Urdu", flag: "🇵🇰" },
  { code: "sw", name: "Swahili", flag: "🇰🇪" },
  { code: "af", name: "Afrikaans", flag: "🇿🇦" },
  { code: "yo", name: "Yoruba", flag: "🇳🇬" },
  { code: "ig", name: "Igbo", flag: "🇳🇬" },
  { code: "ha", name: "Hausa", flag: "🇳🇬" },
  { code: "am", name: "Amharic", flag: "🇪🇹" },
  { code: "fil", name: "Filipino", flag: "🇵🇭" },
  { code: "ca", name: "Catalan", flag: "🏴" },
  { code: "gl", name: "Galician", flag: "🇪🇸" },
  { code: "eu", name: "Basque", flag: "🏴" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTranslate, setShowTranslate] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const translateRef = useRef(null);
  const { cartCount, setCartOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (translateRef.current && !translateRef.current.contains(e.target)) {
        setShowTranslate(false);
      }
    };
    if (showTranslate) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showTranslate]);

  const changeLanguage = (code) => {
    setSelectedLang(code);
    setShowTranslate(false);
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event("change"));
    }
  };

  const currentLang = LANGUAGES.find((l) => l.code === selectedLang) || LANGUAGES[0];

  const navLinks = [
    { label: "Models", href: "/models" },
    { label: "Optimus", href: "/optimus" },
    { label: "Accessories", href: "/accessories" },
    { label: "Track Order", href: "/order/track" },
    { label: "About", href: "/about" },
  ];

  const GlobeButton = () => (
    <button
      onClick={() => setShowTranslate((v) => !v)}
      title="Translate"
      style={{
        background: showTranslate ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "#fff",
        width: "2.25rem",
        height: "2.25rem",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.1rem",
        flexShrink: 0,
      }}
    >
      🌐
    </button>
  );

  return (
    <nav
      ref={translateRef}
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
          <GlobeButton />
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
          <GlobeButton />
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

      {/* Language picker — custom scrollable list */}
      <div className="translate-panel" style={{ display: showTranslate ? "flex" : "none" }}>
        {/* Header */}
        <div style={{ padding: "1rem 1.25rem 0.75rem", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700 }}>Language</p>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>{currentLang.flag} {currentLang.name}</span>
        </div>

        {/* Scrollable language list */}
        <div style={{ overflowY: "auto", flex: 1 }}>
          {LANGUAGES.map((lang) => {
            const active = selectedLang === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.875rem",
                  width: "100%",
                  padding: "0.75rem 1.25rem",
                  background: active ? "rgba(227,25,55,0.1)" : "transparent",
                  border: "none",
                  borderLeft: active ? "3px solid #E31937" : "3px solid transparent",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.15s",
                }}
              >
                <span style={{ fontSize: "1.3rem", lineHeight: 1, flexShrink: 0 }}>{lang.flag}</span>
                <span style={{ color: active ? "#fff" : "rgba(255,255,255,0.75)", fontSize: "0.875rem", fontWeight: active ? 700 : 400 }}>
                  {lang.name}
                </span>
                {active && (
                  <span style={{ marginLeft: "auto", color: "#E31937", fontSize: "0.8rem" }}>✓</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hidden Google Translate element — needed for initialization */}
      <div id="google_translate_element" style={{ position: "absolute", visibility: "hidden", pointerEvents: "none", width: 0, height: 0, overflow: "hidden" }} />

      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-nav { display: none !important; }
        .mobile-menu-btn { display: none !important; }

        .translate-panel {
          position: fixed;
          top: 4rem;
          right: 1.5rem;
          width: 260px;
          max-height: 65vh;
          background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 12px 40px rgba(0,0,0,0.85);
          z-index: 9999;
          flex-direction: column;
          overflow: hidden;
        }

        .translate-panel button:hover {
          background: rgba(255,255,255,0.05) !important;
        }

        /* Suppress Google translate banner */
        body { top: 0 !important; }
        .goog-te-banner-frame.skiptranslate { display: none !important; }
        .goog-te-gadget { display: none !important; }
        .goog-logo-link { display: none !important; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
          .mobile-menu-btn { display: block !important; }

          .translate-panel {
            left: 0.75rem;
            right: 0.75rem;
            width: auto;
            max-height: 60vh;
          }
        }
      `}</style>
    </nav>
  );
}
