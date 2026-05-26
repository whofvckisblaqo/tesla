"use client";

import { useState } from "react";

const CATEGORIES = ["charging", "vehicle", "lifestyle", "apparel"];

export default function AccessoryForm({ accessory, onSave, onCancel }) {
  const isEditing = !!accessory;

  const [form, setForm] = useState({
    name: accessory?.name || "",
    category: accessory?.category || "lifestyle",
    price: accessory?.price || "",
    description: accessory?.description || "",
    image: accessory?.image || "",
    specs: accessory?.specs?.join("\n") || "",
    badge: accessory?.badge || "",
    inStock: accessory?.inStock !== false,
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setForm((prev) => ({ ...prev, image: data.url }));
      } else {
        setError("Upload failed: " + data.message);
      }
    } catch (err) {
      setError("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        specs: form.specs.split("\n").map((s) => s.trim()).filter(Boolean),
      };

      let res;
      if (isEditing) {
        res = await fetch("/api/accessories", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: accessory._id, ...payload }),
        });
      } else {
        res = await fetch("/api/accessories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (res.ok) {
        onSave();
      } else {
        setError(data.message || "Failed to save");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    fontSize: "0.875rem",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.5)",
    marginBottom: "0.4rem",
  };

  return (
    <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)", padding: "clamp(1.25rem, 4vw, 2rem)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#fff", textTransform: "uppercase" }}>
          {isEditing ? `Edit ${accessory.name}` : "Add New Accessory"}
        </h2>
        <button onClick={onCancel} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.5)", padding: "0.5rem 1rem", fontSize: "0.75rem", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          Cancel
        </button>
      </div>

      {error && (
        <div style={{ background: "rgba(227,25,55,0.1)", border: "1px solid rgba(227,25,55,0.3)", color: "#E31937", padding: "0.875rem 1rem", fontSize: "0.8rem", marginBottom: "1.5rem" }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          <div>
            <label style={labelStyle}>Name *</label>
            <input name="name" value={form.name} onChange={handleChange} required placeholder="Wall Connector" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
          </div>
          <div>
            <label style={labelStyle}>Price (USD) *</label>
            <input name="price" type="number" value={form.price} onChange={handleChange} required placeholder="475" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
          </div>
          <div>
            <label style={labelStyle}>Category</label>
            <select name="category" value={form.category} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer" }}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c} style={{ background: "#111" }}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Badge (optional)</label>
            <input name="badge" value={form.badge} onChange={handleChange} placeholder="New, Popular, Best Seller" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
          </div>
          <div style={{ gridColumn: "1 / -1" }}>
            <label style={labelStyle}>Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Describe this accessory..." style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 }} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
          </div>
        </div>

        {/* Image */}
        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ color: "#E31937", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Image</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1rem", alignItems: "end" }}>
            <div>
              <label style={labelStyle}>Image URL</label>
              <input name="image" value={form.image} onChange={handleChange} placeholder="https://... or upload below" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
            </div>
            <label style={{ display: "inline-block", padding: "0.75rem 1.25rem", background: "rgba(255,255,255,0.06)", border: "1px dashed rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em", cursor: "pointer", textTransform: "uppercase", whiteSpace: "nowrap" }}>
              {uploading ? "Uploading..." : "📁 Upload"}
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} disabled={uploading} />
            </label>
          </div>

          {/* Preview */}
          {form.image && (
            <div style={{ marginTop: "1rem", width: "120px", height: "80px", backgroundImage: `url(${form.image})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)" }} />
          )}
        </div>

        {/* Specs */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label style={labelStyle}>Specs (one per line)</label>
          <textarea
            name="specs"
            value={form.specs}
            onChange={handleChange}
            rows={4}
            placeholder={"Up to 44 mi/hr\nWi-Fi enabled\n24ft cable\nIndoor/Outdoor"}
            style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 }}
            onFocus={(e) => (e.target.style.borderColor = "#E31937")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
          />
        </div>

        {/* In Stock Toggle */}
        <div style={{ marginBottom: "2rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
            <div style={{ position: "relative", width: "40px", height: "22px" }}>
              <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} style={{ opacity: 0, width: 0, height: 0 }} />
              <div style={{ position: "absolute", inset: 0, background: form.inStock ? "#E31937" : "rgba(255,255,255,0.1)", borderRadius: "11px", transition: "0.3s", cursor: "pointer" }} />
              <div style={{ position: "absolute", top: "3px", left: form.inStock ? "21px" : "3px", width: "16px", height: "16px", background: "#fff", borderRadius: "50%", transition: "0.3s", pointerEvents: "none" }} />
            </div>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>In Stock</span>
          </label>
        </div>

        {/* Submit */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button type="submit" disabled={saving || uploading} style={{ padding: "0.875rem 2rem", background: saving ? "rgba(227,25,55,0.5)" : "#E31937", color: "#fff", border: "none", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: saving ? "not-allowed" : "pointer" }}>
            {saving ? "Saving..." : isEditing ? "Update Accessory" : "Add Accessory"}
          </button>
          <button type="button" onClick={onCancel} style={{ padding: "0.875rem 2rem", background: "transparent", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.15)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}