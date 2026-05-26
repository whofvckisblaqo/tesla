"use client";

import { useEffect, useState } from "react";

const ACCENT = "#E31937";

export default function HeroSection() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    fetch("/api/cars")
      .then((r) => r.json())
      .then((data) => {
        const featured = (data.cars || []).filter((c) => c.featured);
        setSlides(featured);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setAnimating(false);
      }, 400);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  const slide = slides[current];

  return (
    <>
      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #000;
        }
        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          padding: 0 1.25rem;
          max-width: 56rem;
          margin: 0 auto;
          width: 100%;
        }
        .hero-title {
          font-family: Georgia, serif;
          font-weight: 900;
          text-transform: uppercase;
          color: #fff;
          line-height: 1;
          margin-bottom: 1rem;
          font-size: clamp(2.5rem, 10vw, 7rem);
        }
        .hero-subtitle {
          color: rgba(255,255,255,0.65);
          max-width: 36rem;
          margin: 0 auto 2rem;
          font-weight: 300;
          letter-spacing: 0.05em;
          font-size: clamp(0.875rem, 2.5vw, 1.25rem);
          line-height: 1.6;
          padding: 0 0.5rem;
        }
        .hero-buttons {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }
        .hero-btn-primary {
          padding: 0.875rem 2rem;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
          text-decoration: none;
          display: inline-block;
          width: 100%;
          max-width: 200px;
          text-align: center;
          box-sizing: border-box;
        }
        .hero-btn-secondary {
          padding: 0.875rem 2rem;
          font-weight: 700;
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: 1px solid rgba(255,255,255,0.4);
          color: #fff;
          text-decoration: none;
          display: inline-block;
          width: 100%;
          max-width: 200px;
          text-align: center;
          box-sizing: border-box;
        }
        .hero-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          margin-top: 3rem;
        }
        .hero-dot {
          height: 0.5rem;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 0;
        }
        .hero-scroll {
          position: absolute;
          bottom: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          color: rgba(255,255,255,0.3);
        }
        @media (max-width: 480px) {
          .hero-btn-primary,
          .hero-btn-secondary {
            max-width: 100%;
            padding: 0.875rem 1.5rem;
          }
          .hero-buttons {
            flex-direction: column;
            width: 100%;
            padding: 0 1rem;
          }
          .hero-dots {
            margin-top: 2rem;
          }
        }
      `}</style>

      <section className="hero-section">
        {/* Background Image */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: slide?.images?.[0] ? `url(${slide.images[0]})` : "none",
            backgroundSize: "cover", backgroundPosition: "center",
            opacity: animating ? 0 : 1,
            transition: "opacity 0.6s ease",
            filter: "brightness(0.35)",
          }}
        />
        {/* Gradient */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #000 0%, transparent 50%, #00000088 100%)" }} />
        {/* Glow */}
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 40% at 50% 70%, ${ACCENT}22 0%, transparent 70%)` }} />

        {/* Content */}
        {slide && (
          <div
            className="hero-content"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(20px)" : "translateY(0)",
              transition: "all 0.4s ease",
            }}
          >
            {/* Model Label */}
            <div style={{ display: "inline-block", marginBottom: "1.25rem", padding: "0.35rem 1rem", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase", border: `1px solid ${ACCENT}`, color: ACCENT }}>
              {slide.name}
            </div>

            <h1 className="hero-title" style={{ textShadow: `0 0 80px ${ACCENT}44` }}>
              {slide.tagline || slide.name}
            </h1>

            <p className="hero-subtitle">
              {slide.description
                ? slide.description.slice(0, 100) + (slide.description.length > 100 ? "…" : "")
                : [slide.specs?.range && `${slide.specs.range} range`, slide.specs?.acceleration && `0–60 in ${slide.specs.acceleration}`].filter(Boolean).join(" · ")}
            </p>

            <div className="hero-buttons">
              <a href={`/models/${slide.slug}`} className="hero-btn-primary" style={{ background: ACCENT }}>
                Order Now
              </a>
              <a href={`/models/${slide.slug}`} className="hero-btn-secondary">
                Learn More
              </a>
            </div>

            {/* Dots */}
            {slides.length > 1 && (
              <div className="hero-dots">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="hero-dot"
                    style={{
                      width: i === current ? "2rem" : "0.5rem",
                      background: i === current ? ACCENT : "rgba(255,255,255,0.3)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Scroll */}
        <div className="hero-scroll">
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: "2rem", background: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)" }} />
        </div>
      </section>
    </>
  );
}
