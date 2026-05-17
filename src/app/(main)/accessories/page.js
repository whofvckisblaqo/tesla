"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";

const accessories = [
  {
    id: "wall-connector",
    name: "Wall Connector",
    category: "charging",
    price: 475,
    description: "The fastest charging option for your home. Delivers up to 44 miles of range per hour of charge.",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80",
    badge: "Best Seller",
    specs: ["Up to 44 mi/hr", "Wi-Fi enabled", "24ft cable", "Indoor/Outdoor"],
  },
  {
    id: "mobile-connector",
    name: "Mobile Connector",
    category: "charging",
    price: 230,
    description: "Charge from any outlet with the most versatile home charging solution for your Tesla.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    badge: null,
    specs: ["Works with any outlet", "20ft cable", "Multiple adapters", "Portable"],
  },
  {
    id: "portable-charger",
    name: "Portable Charger Bundle",
    category: "charging",
    price: 350,
    description: "Everything you need to charge at home or on the road. Includes multiple adapters.",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
    badge: "New",
    specs: ["Multiple adapters", "Carry case included", "Fast charge", "Universal"],
  },
  {
    id: "cybertruck-bed-liner",
    name: "Cybertruck Bed Liner",
    category: "vehicle",
    price: 300,
    description: "Custom-fit bed liner for the Cybertruck vault. Protects against scratches and damage.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    badge: null,
    specs: ["Custom fit", "Heavy duty", "Easy install", "Cybertruck only"],
  },
  {
    id: "all-weather-floor-mats",
    name: "All-Weather Floor Mats",
    category: "vehicle",
    price: 225,
    description: "Premium all-weather floor mats designed to fit every Tesla model perfectly.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    badge: null,
    specs: ["All-weather", "Custom fit", "Easy clean", "All models"],
  },
  {
    id: "roof-rack",
    name: "Roof Rack System",
    category: "vehicle",
    price: 485,
    description: "Expand your cargo capacity with the Tesla roof rack system. Perfect for outdoor adventures.",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80",
    badge: null,
    specs: ["165 lbs capacity", "Aerodynamic", "Tool-free install", "Model X/Y"],
  },
  {
    id: "wireless-charger",
    name: "Wireless Phone Charger",
    category: "lifestyle",
    price: 95,
    description: "Dual wireless charging pad designed specifically for Tesla center consoles.",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80",
    badge: "Popular",
    specs: ["Dual charging", "15W fast charge", "Auto-grip", "All Teslas"],
  },
  {
    id: "tesla-tote",
    name: "Tesla Tote Bag",
    category: "lifestyle",
    price: 45,
    description: "Premium canvas tote bag with Tesla branding. Perfect for everyday use.",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    badge: null,
    specs: ["Canvas material", "Large capacity", "Interior pocket", "Branded"],
  },
  {
    id: "tesla-cap",
    name: "Tesla Cap",
    category: "apparel",
    price: 35,
    description: "Structured cap with embroidered Tesla logo. One size fits most.",
    image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80",
    badge: null,
    specs: ["Adjustable strap", "Embroidered logo", "One size fits most", "Multiple colors"],
  },
  {
    id: "tesla-jacket",
    name: "Tesla Lightweight Jacket",
    category: "apparel",
    price: 195,
    description: "Water-resistant lightweight jacket with Tesla branding. Perfect for any weather.",
    image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=800&q=80",
    badge: "New",
    specs: ["Water resistant", "Lightweight", "Multiple pockets", "S-XXL"],
  },
  {
    id: "dashcam-viewer",
    name: "DashCam Viewer",
    category: "lifestyle",
    price: 55,
    description: "View and manage your Tesla dashcam footage easily with this compact viewer.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    badge: null,
    specs: ["HD playback", "USB-C", "Compact", "All Teslas"],
  },
  {
    id: "key-card",
    name: "Tesla Key Card (2 Pack)",
    category: "vehicle",
    price: 35,
    description: "Backup key cards for your Tesla. Tap to lock, unlock and start your car.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    badge: null,
    specs: ["2 cards included", "Tap to unlock", "Slim design", "All models"],
  },
];

const categories = ["all", "charging", "vehicle", "lifestyle", "apparel"];

const CATEGORY_COLORS = {
  charging: "#F59E0B",
  vehicle: "#3B82F6",
  lifestyle: "#10B981",
  apparel: "#8B5CF6",
};

function AccessoryCard({ item }) {
  const { addToCart } = useCart();
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({
      slug: item.id,
      name: item.name,
      color: "Standard",
      price: item.price,
      image: item.image,
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
      <div style={{ position: "relative", height: "clamp(180px, 25vw, 220px)", overflow: "hidden" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "rgba(255,255,255,0.04)",
            filter: hovered ? "brightness(0.85)" : "brightness(0.6)",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            transition: "all 0.6s ease",
          }}
        />

        {/* Category Badge */}
        <div style={{ position: "absolute", top: "1rem", left: "1rem", padding: "0.25rem 0.75rem", background: `${CATEGORY_COLORS[item.category] || "#E31937"}cc`, color: "#fff", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          {item.category}
        </div>

        {/* Hot Badge */}
        {item.badge && (
          <div style={{ position: "absolute", top: "1rem", right: "1rem", padding: "0.25rem 0.75rem", background: "#E31937", color: "#fff", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            {item.badge}
          </div>
        )}

        {/* Gradient */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "50%", background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }} />
      </div>

      {/* Content */}
      <div style={{ padding: "clamp(1rem, 3vw, 1.5rem)", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "clamp(1rem, 2.5vw, 1.2rem)", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.5rem", lineHeight: 1.2 }}>
          {item.name}
        </h3>

        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", lineHeight: 1.7, marginBottom: "1rem", flex: 1 }}>
          {item.description}
        </p>

        {/* Specs Pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
          {item.specs.map((spec, i) => (
            <span key={i} style={{ padding: "0.2rem 0.6rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)", fontSize: "0.6rem", letterSpacing: "0.08em" }}>
              {spec}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.75rem", flexWrap: "wrap", marginTop: "auto" }}>
          <p style={{ color: "#fff", fontWeight: 800, fontSize: "clamp(1.1rem, 3vw, 1.35rem)" }}>
            ${item.price.toLocaleString()}
          </p>
          <button
            onClick={handleAdd}
            style={{
              padding: "0.625rem 1.25rem",
              background: added ? "#10B981" : "#E31937",
              color: "#fff",
              border: "none",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.3s",
              whiteSpace: "nowrap",
            }}
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AccessoriesPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const filtered = accessories
    .filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  return (
    <>
      <style>{`
        .accessories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        .acc-filters {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .acc-cats {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .accessories-grid { grid-template-columns: 1fr; }
          .acc-filters { flex-direction: column; align-items: stretch; }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .accessories-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <main style={{ background: "#000", minHeight: "100vh" }}>
        <Navbar />

        {/* Hero */}
        <div style={{ padding: "7rem 1rem 3.5rem", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 80% at 50% 100%, rgba(227,25,55,0.07) 0%, transparent 70%)" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>
              Tesla Store
            </p>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 6rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "1.25rem" }}>
              Accessories
            </h1>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(0.875rem, 2vw, 1rem)", maxWidth: "36rem", margin: "0 auto", fontWeight: 300, padding: "0 1rem" }}>
              Enhance your Tesla experience with official accessories — from home charging to lifestyle products.
            </p>

            {/* Stats */}
            <div style={{ display: "flex", justifyContent: "center", gap: "clamp(1.5rem, 5vw, 3rem)", marginTop: "2.5rem", flexWrap: "wrap" }}>
              {[
                { value: `${accessories.length}+`, label: "Products" },
                { value: "4", label: "Categories" },
                { value: "Free", label: "Shipping over $200" },
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
              placeholder="Search accessories..."
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
          <div className="acc-filters">
            <div className="acc-cats">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "0.5rem 1.1rem",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    border: `1px solid ${activeCategory === cat ? (CATEGORY_COLORS[cat] || "#E31937") : "rgba(255,255,255,0.15)"}`,
                    background: activeCategory === cat ? (CATEGORY_COLORS[cat] || "#E31937") : "transparent",
                    color: "#fff",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", padding: "0.5rem 1rem", fontSize: "0.75rem", cursor: "pointer", outline: "none" }}
            >
              <option value="default" style={{ background: "#111" }}>Sort: Default</option>
              <option value="price-asc" style={{ background: "#111" }}>Price: Low to High</option>
              <option value="price-desc" style={{ background: "#111" }}>Price: High to Low</option>
              <option value="name" style={{ background: "#111" }}>Name: A–Z</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "1.25rem 1rem 0" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            {searchQuery ? (
              <>Showing <span style={{ color: "#fff", fontWeight: 700 }}>{filtered.length}</span> results for &quot;<span style={{ color: "#E31937" }}>{searchQuery}</span>&quot;</>
            ) : (
              <>Showing <span style={{ color: "#fff", fontWeight: 700 }}>{filtered.length}</span> accessories</>
            )}
          </p>
        </div>

        {/* Grid */}
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "1.5rem 1rem 6rem" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "5rem 2rem", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.3 }}>🔍</div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem", marginBottom: "0.5rem" }}>No accessories found</p>
              <button
                onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
                style={{ padding: "0.75rem 1.5rem", background: "#E31937", color: "#fff", border: "none", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", marginTop: "1rem" }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="accessories-grid">
              {filtered.map((item) => (
                <AccessoryCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          <div style={{ marginTop: "4rem", padding: "clamp(1.5rem, 4vw, 3rem)", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center", background: "rgba(255,255,255,0.02)" }}>
            <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Can&apos;t Find What You Need?
            </p>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "1rem" }}>
              Contact Our Team
            </h3>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", maxWidth: "28rem", margin: "0 auto 1.75rem" }}>
              Our team can help you find the right accessories for your Tesla.
            </p>
            <a
              href="mailto:teslasuppport@outlook.com"
              style={{ display: "inline-block", padding: "0.875rem 2.5rem", background: "#E31937", color: "#fff", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}
            >
              Get in Touch
            </a>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}