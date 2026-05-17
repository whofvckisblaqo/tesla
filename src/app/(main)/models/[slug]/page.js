"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useCart } from "@/context/CartContext";
import ReviewsSection from "@/components/shared/ReviewsSection";

export default function ModelDetailPage() {
  const { slug } = useParams();
  const { addToCart } = useCart();

  const [model, setModel] = useState(null);
  const [allModels, setAllModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    fetchModel();
  }, [slug]);

  const fetchModel = async () => {
    try {
      const res = await fetch("/api/cars");
      const data = await res.json();

      const cars = data.cars || [];
      const found = cars.find((c) => c.slug === slug);

      setModel(found || null);
      setAllModels(cars);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main
        style={{
          background: "#000",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Navbar />

        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.2em",
          }}
        >
          Loading...
        </p>
      </main>
    );
  }

  if (!model) {
    return (
      <main
        style={{
          background: "#000",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Navbar />

        <div style={{ textAlign: "center" }}>
          <p
            style={{
              color: "rgba(255,255,255,0.4)",
              fontSize: "1.25rem",
              marginBottom: "1rem",
            }}
          >
            Model not found
          </p>

          <Link
            href="/models"
            style={{
              color: "#E31937",
              textDecoration: "none",
              fontSize: "0.875rem",
              letterSpacing: "0.1em",
            }}
          >
            ← Back to Models
          </Link>
        </div>
      </main>
    );
  }

  const handleOrder = () => {
    addToCart({
      slug,
      name: model.name,
      color: model.colors?.[selectedColor] || "Standard",
      price: model.price,
      image: model.images?.[0] || "",
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <>
      <style>{`
        .detail-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: start;
        }

        .specs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1px;
          background: rgba(255,255,255,0.06);
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: 1rem;
        }

        .thumbnails-row {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .colors-row {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .related-grid {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        @media (max-width: 768px) {
          .detail-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .specs-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 480px) {
          .specs-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <main style={{ background: "#000", minHeight: "100vh" }}>
        <Navbar />

        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            padding: isMobile
              ? "6rem 1rem 4rem"
              : "8rem 1.5rem 6rem",
          }}
        >
          {/* Breadcrumb */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "2.5rem",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.1em",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/"
              style={{
                color: "rgba(255,255,255,0.3)",
                textDecoration: "none",
              }}
            >
              Home
            </Link>

            <span>/</span>

            <Link
              href="/models"
              style={{
                color: "rgba(255,255,255,0.3)",
                textDecoration: "none",
              }}
            >
              Models
            </Link>

            <span>/</span>

            <span style={{ color: "#fff" }}>{model.name}</span>
          </div>

          {/* Main Grid */}
          <div className="detail-grid">

            {/* LEFT — Images */}
            <div>

              {/* Main Image */}
              <div
                style={{
                  width: "100%",
                  height: isMobile ? "260px" : "420px",
                  backgroundImage: model.images?.[selectedImage]
                    ? `url(${model.images[selectedImage]})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundColor: "rgba(255,255,255,0.04)",
                  marginBottom: "1rem",
                  border: "1px solid rgba(255,255,255,0.08)",
                  overflow: "hidden",
                }}
              />

              {/* Thumbnails */}
              <div className="thumbnails-row">
                {model.images?.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    style={{
                      width: "70px",
                      height: "52px",
                      backgroundImage: `url(${img})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: `2px solid ${
                        i === selectedImage
                          ? model.color || "#E31937"
                          : "rgba(255,255,255,0.1)"
                      }`,
                      cursor: "pointer",
                      padding: 0,
                      opacity: i === selectedImage ? 1 : 0.5,
                      transition: "all 0.2s ease",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* RIGHT — Details */}
            <div>

              <span
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: model.color || "#E31937",
                }}
              >
                {model.category}
              </span>

              <h1
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 900,
                  color: "#fff",
                  textTransform: "uppercase",
                  lineHeight: 1,
                  margin: "0.5rem 0",
                }}
              >
                {model.name}
              </h1>

              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "clamp(0.875rem, 2vw, 1rem)",
                  letterSpacing: "0.15em",
                  marginBottom: "1.25rem",
                }}
              >
                {model.tagline}
              </p>

              <p
                style={{
                  color: "rgba(255,255,255,0.4)",
                  fontSize: "clamp(0.8rem, 2vw, 0.875rem)",
                  lineHeight: 1.8,
                  marginBottom: "1.75rem",
                }}
              >
                {model.description}
              </p>

              {/* Quick Specs */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: "1px",
                  background: "rgba(255,255,255,0.08)",
                  marginBottom: "1.75rem",
                }}
              >
                {[
                  { val: model.specs?.range, label: "Range" },
                  { val: model.specs?.acceleration, label: "0–60 mph" },
                  { val: model.specs?.topSpeed, label: "Top Speed" },
                ].map((s) => (
                  <div
                    key={s.label}
                    style={{
                      textAlign: "center",
                      padding: "1rem 0.5rem",
                      background: "#000",
                    }}
                  >
                    <p
                      style={{
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: "clamp(0.9rem, 2.5vw, 1.25rem)",
                      }}
                    >
                      {s.val || "—"}
                    </p>

                    <p
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: "0.6rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginTop: "0.25rem",
                      }}
                    >
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Colors */}
              {model.colors?.length > 0 && (
                <div style={{ marginBottom: "1.75rem" }}>
                  <p
                    style={{
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.4)",
                      marginBottom: "0.75rem",
                    }}
                  >
                    Color —{" "}
                    <span style={{ color: "#fff" }}>
                      {model.colors[selectedColor]}
                    </span>
                  </p>

                  <div className="colors-row">
                    {model.colors.map((color, i) => {
                      const colorMap = {
                        "Pearl White": "#F5F5F0",
                        "Solid Black": "#1a1a1a",
                        "Midnight Silver": "#6B7280",
                        "Deep Blue": "#1E3A5F",
                        "Ultra Red": "#CC0000",
                        "Stainless Steel": "#C0C0C0",
                        "Matte Black Wrap": "#222222",
                        "Satin White Wrap": "#F8F8F8",
                        Quicksilver: "#A8A8A8",
                        "Stealth Grey": "#4B4B4B",
                      };

                      const hexColor =
                        colorMap[color] ||
                        model.color ||
                        "#E31937";

                      const isSelected = i === selectedColor;

                      return (
                        <button
                          key={i}
                          onClick={() => setSelectedColor(i)}
                          title={color}
                          style={{
                            position: "relative",
                            width: "2rem",
                            height: "2rem",
                            borderRadius: "50%",
                            background: hexColor,
                            border: `3px solid ${
                              isSelected
                                ? "#fff"
                                : "rgba(255,255,255,0.15)"
                            }`,
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                            transform: isSelected
                              ? "scale(1.2)"
                              : "scale(1)",
                            boxShadow: isSelected
                              ? `0 0 0 2px ${
                                  model.color || "#E31937"
                                }`
                              : "none",
                            padding: 0,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price */}
              <div
                style={{
                  padding: "1.25rem",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.02)",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  <div>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Starting Price
                    </p>

                    <p
                      style={{
                        color: "#fff",
                        fontSize: "clamp(1.5rem, 4vw, 2rem)",
                        fontWeight: 800,
                      }}
                    >
                      ${model.price?.toLocaleString()}
                    </p>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                      }}
                    >
                      Est. monthly
                    </p>

                    <p
                      style={{
                        color: model.color || "#E31937",
                        fontSize: "clamp(0.9rem, 2.5vw, 1.1rem)",
                        fontWeight: 700,
                      }}
                    >
                      $
                      {Math.round(
                        (model.price || 0) / 60
                      ).toLocaleString()}
                      /mo
                    </p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  flexWrap: "wrap",
                }}
              >
                <button
                  onClick={handleOrder}
                  style={{
                    flex: 1,
                    minWidth: "120px",
                    padding: "0.875rem",
                    background: added
                      ? "#10B981"
                      : model.color || "#E31937",
                    color: "#fff",
                    border: "none",
                    fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "background 0.3s",
                  }}
                >
                  {added ? "Added ✓" : "Order Now"}
                </button>

                <button
                  style={{
                    flex: 1,
                    minWidth: "120px",
                    padding: "0.875rem",
                    background: "transparent",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.2)",
                    fontSize: "clamp(0.75rem, 2vw, 0.875rem)",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                  }}
                >
                  Test Drive
                </button>
              </div>
            </div>
          </div>

          {/* Full Specs */}
          {model.specs &&
            Object.keys(model.specs).length > 0 && (
              <div
                style={{
                  marginTop: "5rem",
                  borderTop:
                    "1px solid rgba(255,255,255,0.06)",
                  paddingTop: "3.5rem",
                }}
              >
                <p
                  style={{
                    color: model.color || "#E31937",
                    fontSize: "0.7rem",
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    marginBottom: "0.75rem",
                  }}
                >
                  Specifications
                </p>

                <h2
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(1.75rem, 4vw, 3rem)",
                    fontWeight: 900,
                    color: "#fff",
                    textTransform: "uppercase",
                    marginBottom: "2.5rem",
                  }}
                >
                  Full Specs
                </h2>

                <div className="specs-grid">
                  {Object.entries(model.specs).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        style={{
                          padding: "1.25rem",
                          background: "#000",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <p
                          style={{
                            color: "rgba(255,255,255,0.4)",
                            fontSize: "0.72rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                        >
                          {key === "acceleration"
                            ? "0–60 mph"
                            : key
                                .replace(/([A-Z])/g, " $1")
                                .trim()}
                        </p>

                        <p
                          style={{
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "0.875rem",
                            textAlign: "right",
                          }}
                        >
                          {value}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

          {/* Features */}
          {model.features?.length > 0 && (
            <div style={{ marginTop: "4rem" }}>
              <p
                style={{
                  color: model.color || "#E31937",
                  fontSize: "0.7rem",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  marginBottom: "0.75rem",
                }}
              >
                Included
              </p>

              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(1.75rem, 4vw, 3rem)",
                  fontWeight: 900,
                  color: "#fff",
                  textTransform: "uppercase",
                  marginBottom: "2.5rem",
                }}
              >
                Key Features
              </h2>

              <div className="features-grid">
                {model.features.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "1.25rem",
                      border:
                        "1px solid rgba(255,255,255,0.08)",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                      background: "rgba(255,255,255,0.02)",
                    }}
                  >
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background:
                          model.color || "#E31937",
                        flexShrink: 0,
                      }}
                    />

                    <p
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        fontSize:
                          "clamp(0.8rem, 2vw, 0.875rem)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {f}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Models */}
          {allModels.filter((m) => m.slug !== slug).length > 0 && (
            <div
              style={{
                marginTop: "5rem",
                borderTop:
                  "1px solid rgba(255,255,255,0.06)",
                paddingTop: "3.5rem",
              }}
            >
              <h2
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                  fontWeight: 900,
                  color: "#fff",
                  textTransform: "uppercase",
                  marginBottom: "1.75rem",
                }}
              >
                Explore Other Models
              </h2>

              <div className="related-grid">
                {allModels
                  .filter((m) => m.slug !== slug)
                  .slice(0, 3)
                  .map((m) => (
                    <Link
                      key={m._id}
                      href={`/models/${m.slug}`}
                      style={{
                        flex: "1 1 180px",
                        padding: "1.25rem",
                        border:
                          "1px solid rgba(255,255,255,0.08)",
                        textDecoration: "none",
                        background:
                          "rgba(255,255,255,0.02)",
                      }}
                    >
                      <p
                        style={{
                          color: m.color || "#E31937",
                          fontSize: "0.6rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {m.category}
                      </p>

                      <p
                        style={{
                          color: "#fff",
                          fontWeight: 700,
                          fontSize:
                            "clamp(0.9rem, 2.5vw, 1.1rem)",
                          fontFamily: "Georgia, serif",
                          textTransform: "uppercase",
                        }}
                      >
                        {m.name}
                      </p>

                      <p
                        style={{
                          color: "rgba(255,255,255,0.4)",
                          fontSize: "0.75rem",
                          marginTop: "0.25rem",
                        }}
                      >
                        {m.tagline}
                      </p>
                    </Link>
                  ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          <ReviewsSection
            slug={slug}
            modelName={model.name}
            accentColor={model.color}
          />
        </div>

        <Footer />
      </main>
    </>
  );
}