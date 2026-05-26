"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

const categories = ["all", "home", "professional", "industrial", "research"];

const CATEGORY_COLORS = {
  home: "#10B981",
  professional: "#3B82F6",
  industrial: "#F59E0B",
  research: "#8B5CF6",
};

function RobotCard({ item }) {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      slug: item._id || item.id,
      name: item.name,
      color: "Standard",
      price: item.price,
      image: item.image,
      type: "robot",
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)"}`,
        transition: "all 0.4s ease",
        overflow: "hidden",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", height: "clamp(160px, 22vw, 220px)", overflow: "hidden" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: item.image ? `url(${item.image})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "rgba(255,255,255,0.04)",
            filter: hovered ? "brightness(0.85)" : "brightness(0.6)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "all 0.6s ease",
          }}
        />

        <div
          style={{
            position: "absolute", top: "1rem", left: "1rem",
            padding: "0.25rem 0.75rem",
            background: `${CATEGORY_COLORS[item.category] || "#E31937"}cc`,
            color: "#fff", fontSize: "0.6rem", fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase",
          }}
        >
          {item.category}
        </div>

        {item.badge && (
          <div
            style={{
              position: "absolute", top: "1rem", right: "1rem",
              padding: "0.25rem 0.75rem",
              background: "#E31937", color: "#fff",
              fontSize: "0.6rem", fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
            }}
          >
            {item.badge}
          </div>
        )}

        {item.inStock === false && (
          <div
            style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0.6)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <span style={{ color: "#fff", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", background: "rgba(0,0,0,0.8)", padding: "0.5rem 1rem" }}>
              Coming Soon
            </span>
          </div>
        )}

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }} />
      </div>

      {/* Content */}
      <div style={{ padding: "clamp(1rem, 3vw, 1.5rem)", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3
          style={{
            color: "#fff", fontFamily: "Georgia, serif",
            fontSize: "clamp(1rem, 2.5vw, 1.2rem)", fontWeight: 700,
            textTransform: "uppercase", marginBottom: "0.5rem", lineHeight: 1.2,
          }}
        >
          {item.name}
        </h3>

        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", lineHeight: 1.7, marginBottom: "1rem", flex: 1 }}>
          {item.description}
        </p>

        {item.specs?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
            {item.specs.map((spec, i) => (
              <span
                key={i}
                style={{
                  padding: "0.2rem 0.6rem",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.6rem", letterSpacing: "0.08em",
                }}
              >
                {spec}
              </span>
            ))}
          </div>
        )}

        <div
          style={{
            display: "flex", alignItems: "center",
            justifyContent: "space-between", gap: "0.75rem",
            flexWrap: "wrap", marginTop: "auto",
          }}
        >
          <p style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1.1rem, 3vw, 1.35rem)" }}>
            ${item.price?.toLocaleString()}
          </p>
          <button
            onClick={handleAdd}
            disabled={item.inStock === false}
            style={{
              padding: "0.625rem 1.25rem",
              background: item.inStock === false ? "rgba(255,255,255,0.08)" : added ? "#10B981" : "#E31937",
              color: item.inStock === false ? "rgba(255,255,255,0.3)" : "#fff",
              border: "none", fontSize: "0.7rem", fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase",
              cursor: item.inStock === false ? "not-allowed" : "pointer",
              transition: "background 0.3s", whiteSpace: "nowrap",
            }}
          >
            {item.inStock === false ? "Coming Soon" : added ? "Added ✓" : "Reserve Now"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OptimusPage() {
  const [robots, setRobots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    fetchRobots();
  }, []);

  const fetchRobots = async () => {
    try {
      const res = await fetch("/api/robots");
      const data = await res.json();
      setRobots(data.robots || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = robots
    .filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-desc") return (b.price || 0) - (a.price || 0);
      if (sortBy === "name") return a.name?.localeCompare(b.name);
      return 0;
    });

  return (
    <>
      <style>{`
        .robots-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .robot-filters {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .robot-cats {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .robots-grid { grid-template-columns: 1fr; }
          .robot-filters { flex-direction: column; align-items: stretch; }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .robots-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <main style={{ background: "#000", minHeight: "100vh" }}>
        <Navbar />

        {/* Hero */}
        <div
          style={{
            padding: "7rem 1rem 3.5rem", textAlign: "center",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            position: "relative", overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 80% at 50% 100%, rgba(227,25,55,0.07) 0%, transparent 70%)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Tesla Robotics
            </p>
            <h1
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(2.5rem, 8vw, 6rem)",
                fontWeight: 900, color: "#fff",
                textTransform: "uppercase", lineHeight: 1,
                marginBottom: "1.25rem",
              }}
            >
              Optimus
            </h1>
            <p
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "clamp(0.875rem, 2vw, 1rem)",
                maxWidth: "40rem", margin: "0 auto",
                fontWeight: 300, padding: "0 1rem",
              }}
            >
              A general-purpose humanoid robot designed to eliminate dangerous, repetitive, and boring tasks. Built on Tesla&apos;s AI platform.
            </p>

            <div
              style={{
                display: "flex", justifyContent: "center",
                gap: "clamp(1.5rem, 5vw, 3rem)",
                marginTop: "2.5rem", flexWrap: "wrap",
              }}
            >
              {[
                { value: `${robots.length}+`, label: "Configurations" },
                { value: "4", label: "Use Cases" },
                { value: "22", label: "DOF Hands" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <p style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "clamp(1.25rem, 4vw, 1.75rem)", fontWeight: 900 }}>{s.value}</p>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: "0.25rem" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search */}
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "1.5rem 1rem 0" }}>
          <div style={{ position: "relative" }}>
            <span style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)", fontSize: "1rem" }}>🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Optimus models..."
              style={{
                width: "100%", padding: "0.875rem 1rem 0.875rem 2.75rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#fff", fontSize: "0.875rem",
                outline: "none", boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#E31937")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "1rem" }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "1.25rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="robot-filters">
            <div className="robot-cats">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "0.5rem 1.1rem",
                    fontSize: "0.7rem", fontWeight: 700,
                    letterSpacing: "0.2em", textTransform: "uppercase",
                    border: `1px solid ${activeCategory === cat ? (CATEGORY_COLORS[cat] || "#E31937") : "rgba(255,255,255,0.15)"}`,
                    background: activeCategory === cat ? (CATEGORY_COLORS[cat] || "#E31937") : "transparent",
                    color: "#fff", cursor: "pointer", transition: "all 0.3s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#fff", padding: "0.5rem 1rem",
                fontSize: "0.75rem", cursor: "pointer", outline: "none",
              }}
            >
              <option value="default" style={{ background: "#111" }}>Sort: Default</option>
              <option value="price-asc" style={{ background: "#111" }}>Price: Low to High</option>
              <option value="price-desc" style={{ background: "#111" }}>Price: High to Low</option>
              <option value="name" style={{ background: "#111" }}>Name: A–Z</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "1.25rem 1rem 0" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            {searchQuery ? (
              <>Showing <span style={{ color: "#fff", fontWeight: 700 }}>{filtered.length}</span> results for &quot;<span style={{ color: "#E31937" }}>{searchQuery}</span>&quot;</>
            ) : (
              <>Showing <span style={{ color: "#fff", fontWeight: 700 }}>{filtered.length}</span> Optimus configurations</>
            )}
          </p>
        </div>

        {/* Grid */}
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "1.5rem 1rem 6rem" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "5rem" }}>
              <p style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", fontSize: "0.875rem" }}>Loading Optimus models...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem 2rem", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.3 }}>🤖</div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", marginBottom: "0.5rem" }}>No models found</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                style={{ padding: "0.75rem 1.5rem", background: "#E31937", color: "#fff", border: "none", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", marginTop: "1rem" }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="robots-grid">
              {filtered.map((item) => (
                <RobotCard key={item._id || item.id} item={item} />
              ))}
            </div>
          )}

          {/* CTA */}
          <div
            style={{
              marginTop: "4rem",
              padding: "clamp(1.5rem, 4vw, 3rem)",
              border: "1px solid rgba(255,255,255,0.08)",
              textAlign: "center",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Enterprise &amp; Fleet Orders
            </p>
            <h3
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: 900, color: "#fff",
                textTransform: "uppercase", marginBottom: "1rem",
              }}
            >
              Talk to Our Team
            </h3>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", maxWidth: "28rem", margin: "0 auto 1.75rem" }}>
              Need multiple units or a custom deployment? Our robotics team can build a solution for your operation.
            </p>
            <a
              href="/contact"
              style={{
                display: "inline-block", padding: "0.875rem 2.5rem",
                background: "#E31937", color: "#fff",
                fontSize: "0.75rem", fontWeight: 700,
                letterSpacing: "0.2em", textTransform: "uppercase",
                textDecoration: "none",
              }}
            >
              Contact Sales
            </a>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
