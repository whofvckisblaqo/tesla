export default function TestDriveSection() {
  return (
    <section style={{ background: "#000", padding: "clamp(4rem, 10vw, 7rem) clamp(1rem, 4vw, 1.5rem)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "80rem", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(2rem, 5vw, 3.5rem)" }}>
          <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Experience It</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 7vw, 4.5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "1rem" }}>
            Test Drive
          </h2>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "clamp(0.875rem, 2vw, 1rem)", maxWidth: "32rem", margin: "0 auto", fontWeight: 300 }}>
            Feel the performance before you order. Watch what it's like behind the wheel.
          </p>
        </div>

        {/* Video */}
        <div style={{ position: "relative", width: "100%", maxWidth: "900px", margin: "0 auto", aspectRatio: "16/9", background: "#111", border: "1px solid rgba(255,255,255,0.08)" }}>
          <iframe
            src="https://www.youtube.com/embed/h78gfwG5BXs?rel=0&modestbranding=1"
            title="Tesla Test Drive"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
          />
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <a
            href="/find-us"
            style={{ display: "inline-block", padding: "0.875rem 2.5rem", background: "#E31937", color: "#fff", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}
          >
            Book a Test Drive
          </a>
        </div>

      </div>
    </section>
  );
}
