import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const departments = [
  { name: "Engineering", roles: 142, desc: "Build the software, hardware, and systems that power the world's most advanced vehicles." },
  { name: "Design", roles: 28, desc: "Shape the future of transportation through bold, functional, and iconic product design." },
  { name: "Manufacturing", roles: 87, desc: "Drive the production of electric vehicles and energy products at scale." },
  { name: "Sales & Delivery", roles: 63, desc: "Help customers experience and own the Tesla of their dreams." },
  { name: "Energy", roles: 44, desc: "Deploy solar, Powerwall, and Megapack solutions that transform how the world uses energy." },
  { name: "AI & Autopilot", roles: 31, desc: "Develop the neural networks and autonomy stack that will define the future of driving." },
];

const perks = [
  { title: "Competitive Pay", desc: "Market-leading salaries, equity, and performance bonuses." },
  { title: "Full Benefits", desc: "Comprehensive medical, dental, vision, and life insurance from day one." },
  { title: "EV Discount", desc: "Significant discount on your first Tesla vehicle." },
  { title: "Stock Options", desc: "Participate in Tesla's growth through employee stock purchase plans." },
  { title: "Learning Budget", desc: "Annual allowance for courses, conferences, and certifications." },
  { title: "Flexible Work", desc: "Hybrid and remote options available for eligible roles." },
];

export default function CareersPage() {
  return (
    <main style={{ background: "#000", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "8rem 1rem 5rem", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(227,25,55,0.08) 0%, transparent 70%)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "48rem", margin: "0 auto" }}>
          <p style={{ color: "#E31937", fontSize: "0.75rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "1rem" }}>Join the Team</p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 8vw, 5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: "1.5rem" }}>Careers</h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.8, fontWeight: 300 }}>
            Work on problems that matter. Tesla is hiring passionate people who want to accelerate the world's transition to sustainable energy.
          </p>
          <a href="mailto:careers@teslastore.com" style={{ display: "inline-block", marginTop: "2rem", padding: "0.875rem 2.5rem", background: "#E31937", color: "#fff", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
            View Open Roles
          </a>
        </div>
      </section>

      {/* Departments */}
      <section style={{ maxWidth: "80rem", margin: "0 auto", padding: "5rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Where You'll Work</p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>Open Departments</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "rgba(255,255,255,0.06)" }}>
          {departments.map((d) => (
            <div key={d.name} style={{ background: "#000", padding: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                <p style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 700 }}>{d.name}</p>
                <span style={{ background: "rgba(227,25,55,0.1)", color: "#E31937", fontSize: "0.65rem", fontWeight: 700, padding: "0.25rem 0.6rem", letterSpacing: "0.1em" }}>{d.roles} roles</span>
              </div>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", lineHeight: 1.6 }}>{d.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Perks */}
      <section style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "5rem 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ color: "#E31937", fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Benefits</p>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>Why Tesla</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {perks.map((p) => (
              <div key={p.title} style={{ border: "1px solid rgba(255,255,255,0.08)", padding: "1.75rem" }}>
                <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>{p.title}</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.85rem", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: "80rem", margin: "0 auto", padding: "5rem 1.5rem", textAlign: "center" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase", marginBottom: "1rem" }}>Ready to Apply?</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.95rem", marginBottom: "2rem" }}>Send your resume and portfolio to our hiring team.</p>
        <a href="mailto:careers@teslastore.com" style={{ display: "inline-block", padding: "0.875rem 2.5rem", background: "#E31937", color: "#fff", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}>
          careers@teslastore.com
        </a>
      </section>

      <Footer />
    </main>
  );
}
