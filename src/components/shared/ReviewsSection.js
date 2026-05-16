"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

function StarRating({ rating, interactive = false, onRate }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div style={{ display: "flex", gap: "0.25rem" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => interactive && onRate && onRate(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          style={{
            background: "none",
            border: "none",
            cursor: interactive ? "pointer" : "default",
            padding: "0.1rem",
            fontSize: interactive ? "1.5rem" : "1rem",
            color:
              star <= (hovered || rating)
                ? "#F59E0B"
                : "rgba(255,255,255,0.2)",
            transition: "color 0.15s ease",
            lineHeight: 1,
          }}
        >
          ★
        </button>
      ))}
    </div>
  );
}

function RatingBar({ label, count, total, color }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem", minWidth: "14px", textAlign: "right" }}>{label}</span>
      <span style={{ color: "#F59E0B", fontSize: "0.75rem" }}>★</span>
      <div style={{ flex: 1, height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color || "#F59E0B", borderRadius: "3px", transition: "width 0.5s ease" }} />
      </div>
      <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem", minWidth: "20px" }}>{count}</span>
    </div>
  );
}

export default function ReviewsSection({ slug, modelName, accentColor }) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [form, setForm] = useState({ rating: 0, comment: "" });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [slug]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?slug=${slug}`);
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.rating === 0) {
      setError("Please select a rating");
      return;
    }
    if (form.comment.trim().length < 10) {
      setError("Review must be at least 10 characters");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          modelName,
          rating: form.rating,
          comment: form.comment,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Review submitted successfully!");
        setForm({ rating: 0, comment: "" });
        setShowForm(false);
        fetchReviews();
      } else {
        setError(data.message || "Failed to submit review");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ marginTop: "6rem", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "4rem" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2.5rem" }}>
        <div>
          <p style={{ color: accentColor || "#E31937", fontSize: "0.7rem", letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            Customer Reviews
          </p>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 900, color: "#fff", textTransform: "uppercase" }}>
            What Owners Say
          </h2>
        </div>

        {session ? (
          <button
            onClick={() => setShowForm(!showForm)}
            style={{ padding: "0.75rem 1.5rem", background: showForm ? "transparent" : accentColor || "#E31937", border: `1px solid ${accentColor || "#E31937"}`, color: "#fff", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.3s" }}
          >
            {showForm ? "Cancel" : "Write a Review"}
          </button>
        ) : (
          <Link
            href="/auth/login"
            style={{ padding: "0.75rem 1.5rem", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", textDecoration: "none" }}
          >
            Login to Review
          </Link>
        )}
      </div>

      {/* Stats Row */}
      {reviews.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "auto 1fr", gap: "2rem", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "clamp(1.25rem, 4vw, 2rem)", marginBottom: "2rem" }}>
          {/* Average */}
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingRight: isMobile ? 0 : "2rem", borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,0.08)", borderBottom: isMobile ? "1px solid rgba(255,255,255,0.08)" : "none", paddingBottom: isMobile ? "1.5rem" : 0 }}>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(3rem, 8vw, 4rem)", fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: "0.5rem" }}>
              {avgRating}
            </p>
            <StarRating rating={Math.round(avgRating)} />
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.75rem", marginTop: "0.5rem", letterSpacing: "0.1em" }}>
              {reviews.length} {reviews.length === 1 ? "review" : "reviews"}
            </p>
          </div>

          {/* Breakdown */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {ratingCounts.map(({ star, count }) => (
              <RatingBar key={star} label={star} count={count} total={reviews.length} color={accentColor} />
            ))}
          </div>
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "clamp(1.25rem, 4vw, 2rem)", marginBottom: "2rem" }}>
          <h3 style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "1.5rem" }}>
            Your Review
          </h3>

          {error && (
            <div style={{ background: "rgba(227,25,55,0.1)", border: "1px solid rgba(227,25,55,0.3)", color: "#E31937", padding: "0.875rem 1rem", fontSize: "0.8rem", marginBottom: "1.25rem" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Star Rating */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "0.75rem" }}>
                Your Rating
              </label>
              <StarRating
                rating={form.rating}
                interactive={true}
                onRate={(r) => { setForm({ ...form, rating: r }); setError(""); }}
              />
              {form.rating > 0 && (
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", marginTop: "0.5rem" }}>
                  {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][form.rating]}
                </p>
              )}
            </div>

            {/* Comment */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "0.5rem" }}>
                Your Review
              </label>
              <textarea
                value={form.comment}
                onChange={(e) => { setForm({ ...form, comment: e.target.value }); setError(""); }}
                placeholder="Share your experience with this Tesla model..."
                rows={4}
                style={{ width: "100%", padding: "0.875rem 1rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontSize: "0.875rem", outline: "none", boxSizing: "border-box", resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 }}
                onFocus={(e) => (e.target.style.borderColor = accentColor || "#E31937")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem", marginTop: "0.4rem" }}>
                {form.comment.length} characters {form.comment.length < 10 ? `(${10 - form.comment.length} more needed)` : "✓"}
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              style={{ padding: "0.875rem 2rem", background: submitting ? "rgba(255,255,255,0.1)" : accentColor || "#E31937", color: "#fff", border: "none", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: submitting ? "not-allowed" : "pointer" }}
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", color: "#10B981", padding: "1rem", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
          {success}
        </div>
      )}

      {/* Reviews List */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "rgba(255,255,255,0.3)" }}>
          <p style={{ letterSpacing: "0.2em", fontSize: "0.875rem" }}>Loading reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", border: "1px solid rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.01)" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "1rem", opacity: 0.3 }}>⭐</div>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>No reviews yet</p>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.8rem" }}>Be the first to review the {modelName}</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {reviews.map((review, i) => (
            <div
              key={i}
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "clamp(1rem, 3vw, 1.5rem)" }}
            >
              {/* Review Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.35rem", flexWrap: "wrap" }}>
                    <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.9rem" }}>{review.userName}</p>
                    <StarRating rating={review.rating} />
                    <span style={{ padding: "0.15rem 0.6rem", background: `${accentColor || "#E31937"}15`, color: accentColor || "#E31937", fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                      {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][review.rating]}
                    </span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem", letterSpacing: "0.05em" }}>
                    {new Date(review.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
              </div>

              {/* Review Content */}
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}