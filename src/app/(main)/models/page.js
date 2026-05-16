"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const categories = ["all", "sedan", "suv", "truck"];

function ModelCard({ model }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? (model.color || "#E31937") + "66" : "rgba(255,255,255,0.08)"}`,
        transition: "all 0.4s ease",
        overflow: "hidden",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      <div style={{ position: "relative", height: "clamp(160px, 25vw, 220px)", overflow: "hidden" }}>
        <div style={{ width: "100%", height: "100%", backgroundImage: model.images?.[0] ? `url(${model.images[0]})` : "none", backgroundSize: "cover", backgroundPosition: "center", filter: hovered ? "brightness(0.85)" : "brightness(0.55)", transform: hovered ? "scale(1.05)" : "scale(1)", transition: "all 0.6s ease", background: model.images?.[0] ? undefined : "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)" }} />
        <div style={{ position: "absolute", bottom: "1rem", left: "1.25rem" }}>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1 }}>
            {model.name}
          </h3>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", letterSpacing: "0.15em", marginTop: "0.25rem" }}>
            {model.tagline}
          </p>
        </div>
      </div>

      <div style={{ padding: "clamp(1rem, 3vw, 1.5rem)" }}>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", lineHeight: 1.7, marginBottom: "1.25rem" }}>
          {model.description}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem", padding: "0.875rem 0", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: "1.25rem" }}>
          {[
            { val: model.specs?.range, label: "Range" },
            { val: model.specs?.acceleration, label: "0–60" },
            { val: model.specs?.topSpeed, label: "Top Spd" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(0.7rem, 2vw, 0.875rem)" }}>{s.val || "—"}</p>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.55rem", letterSpacing: "0.08em", marginTop: "0.2rem", textTransform: "uppercase" }}>{s.label}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", flexWrap: "wrap" }}>
          <div>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.6rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Starting at</p>
            <p style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1rem, 3vw, 1.3rem)" }}>${model.price?.toLocaleString()}</p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link href={`/models/${model.slug}`} style={{ padding: "0.5rem 0.875rem", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", textDecoration: "none" }}>
              Details
            </Link>
            <Link href={`/models/${model.slug}`} style={{ padding: "0.5rem 0.875rem", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: model.color || "#E31937", color: "#fff", textDecoration: "none" }}>
              Order
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ModelsPage() {
  const [allModels, setAllModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await fetch("/api/cars");
      const data = await res.json();
      setAllModels(data.cars || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = allModels
    .filter((m) => {
      const matchesCategory = activeCategory === "all" || m.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        m.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return (a.price || 0) - (b.price || 0);
      if (sortBy === "price-desc") return (b.price || 0) - (a.price || 0);
      return 0;
    });

  return (
    <>
      <style>{`
        .models-page-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .filters-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .category-filters {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .models-page-grid { grid-template-columns: 1fr; }
          .filters-row { flex-direction: column; align-items: stretch; }
        }
      `}</style>

      <main style={{ background: "#000", minHeight: "100vh" }}>
        <Navbar />

        {/* Hero */}
        <div style={{ paddingTop: "7rem", paddingBottom: "3rem", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden", padding: "7rem 1rem 3rem" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(227,25,55,0.08) 0%, transparent 70%)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Our Fleet</p>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 6rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "1.25rem" }}>
              All Models
            </h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(0.875rem, 2vw, 1rem)", maxWidth: "32rem", margin: "0 auto", fontWeight: 300, padding: "0 1rem" }}>
              Every Tesla is engineered from the ground up as an electric vehicle, designed for exceptional performance and safety.
            </p>
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
              placeholder="Search models, categories..."
              style={{ width: "100%", padding: "0.875rem 1rem 0.875rem 2.75rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "0.875rem", outline: "none", boxSizing: "border-box" }}
              onFocus={(e) => (e.target.style.borderColor = "#E31937")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} style={{ position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: "1rem" }}>✕</button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "1.25rem 1rem", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <div className="filters-row">
            <div className="category-filters">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: "0.5rem 1.1rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", border: `1px solid ${activeCategory === cat ? "#E31937" : "rgba(255,255,255,0.15)"}`, background: activeCategory === cat ? "#E31937" : "transparent", color: "#fff", cursor: "pointer", transition: "all 0.3s" }}>
                  {cat}
                </button>
              ))}
            </div>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", padding: "0.5rem 1rem", fontSize: "0.75rem", cursor: "pointer", outline: "none" }}>
              <option value="default" style={{ background: "#111" }}>Sort: Default</option>
              <option value="price-asc" style={{ background: "#111" }}>Price: Low to High</option>
              <option value="price-desc" style={{ background: "#111" }}>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "1.25rem 1rem 0" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            {searchQuery ? (
              <>Showing <span style={{ color: "#fff", fontWeight: 700 }}>{filtered.length}</span> results for &quot;<span style={{ color: "#E31937" }}>{searchQuery}</span>&quot;</>
            ) : (
              <>Showing <span style={{ color: "#fff", fontWeight: 700 }}>{filtered.length}</span> models</>
            )}
          </p>
        </div>

        {/* Grid */}
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "1.5rem 1rem 6rem" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "5rem" }}>
              <p style={{ color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", fontSize: "0.875rem" }}>Loading models...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem 2rem", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.3 }}>🔍</div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", marginBottom: "0.5rem" }}>No models found</p>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Try a different search or filter</p>
              <button onClick={() => { setSearchQuery(""); setActiveCategory("all"); }} style={{ padding: "0.75rem 1.5rem", background: "#E31937", color: "#fff", border: "none", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="models-page-grid">
              {filtered.map((model) => (
                <ModelCard key={model._id || model.slug} model={model} />
              ))}
            </div>
          )}

          {/* CTA */}
          <div style={{ marginTop: "4rem", padding: "clamp(1.5rem, 4vw, 3rem)", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center", background: "rgba(255,255,255,0.02)" }}>
            <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.75rem" }}>Not Sure Which Model?</p>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "1rem" }}>We Help You Decide</h3>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", marginBottom: "1.75rem", maxWidth: "28rem", margin: "0 auto 1.75rem" }}>
              Our experts are available to walk you through every model and find the perfect Tesla for your lifestyle.
            </p>
            <a href="mailto:teslasuppport@outlook.com" style={{ display: "inline-block", padding: "0.875rem 2.5rem", background: "#E31937", color: "#fff", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
              Talk to an Expert
            </a>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}