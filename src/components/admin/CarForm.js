"use client";

import { useState } from "react";

const CATEGORIES = ["sedan", "suv", "truck", "sports"];

const DEFAULT_SPECS = {
  range: "",
  topSpeed: "",
  acceleration: "",
  peakPower: "",
  drive: "AWD",
  seats: "",
  cargo: "",
  display: "",
  autopilot: "Standard",
  charging: "",
};

export default function CarForm({ car, onSave, onCancel }) {
  const isEditing = !!car;

  const [form, setForm] = useState({
    name: car?.name || "",
    slug: car?.slug || "",
    tagline: car?.tagline || "",
    description: car?.description || "",
    price: car?.price || "",
    category: car?.category || "sedan",
    images: car?.images || [],
    specs: car?.specs || DEFAULT_SPECS,
    colors: car?.colors?.join(", ") || "",
    features: car?.features?.join("\n") || "",
    inStock: car?.inStock !== false,
    featured: car?.featured || false,
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "name" && !isEditing) {
      setForm((prev) => ({
        ...prev,
        name: value,
        slug: value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      }));
    }
  };

  const handleSpecChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      specs: { ...prev.specs, [name]: value },
    }));
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setUploading(true);
    setUploadProgress(`Uploading ${files.length} image(s)...`);

    try {
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        setUploadProgress(`Uploading image ${i + 1} of ${files.length}...`);
        const formData = new FormData();
        formData.append("file", files[i]);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (res.ok) {
          uploadedUrls.push(data.url);
        } else {
          throw new Error(data.message || "Upload failed");
        }
      }

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
      setUploadProgress(`✅ ${uploadedUrls.length} image(s) uploaded!`);
      setTimeout(() => setUploadProgress(""), 3000);
    } catch (err) {
      setError("Image upload failed: " + err.message);
      setUploadProgress("");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
        features: form.features.split("\n").map((f) => f.trim()).filter(Boolean),
      };

      let res;
      if (isEditing) {
        res = await fetch("/api/cars", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ carId: car._id, ...payload }),
        });
      } else {
        res = await fetch("/api/cars", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (res.ok) {
        onSave();
      } else {
        setError(data.message || "Failed to save car");
      }
    } catch (err) {
      setError("Something went wrong: " + err.message);
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
          {isEditing ? `Edit ${car.name}` : "Add New Car"}
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
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ color: "#E31937", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Basic Information</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
            <div>
              <label style={labelStyle}>Car Name *</label>
              <input name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Model S" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
            </div>
            <div>
              <label style={labelStyle}>Slug *</label>
              <input name="slug" value={form.slug} onChange={handleChange} required placeholder="e.g. model-s" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
            </div>
            <div>
              <label style={labelStyle}>Price (USD) *</label>
              <input name="price" type="number" value={form.price} onChange={handleChange} required placeholder="74990" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
            </div>
            <div>
              <label style={labelStyle}>Category</label>
              <select name="category" value={form.category} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer" }}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c} style={{ background: "#111" }}>{c}</option>
                ))}
              </select>
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Tagline</label>
              <input name="tagline" value={form.tagline} onChange={handleChange} placeholder="e.g. Plaid Performance" style={inputStyle} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Full description of the car..." rows={4} style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit", lineHeight: 1.6 }} onFocus={(e) => (e.target.style.borderColor = "#E31937")} onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")} />
            </div>
          </div>
        </div>

        {/* Images */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ color: "#E31937", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Car Images</p>

          {/* Upload Button */}
          <label style={{ display: "inline-block", padding: "0.75rem 1.5rem", background: "rgba(255,255,255,0.06)", border: "1px dashed rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.1em", cursor: "pointer", marginBottom: "1rem", textTransform: "uppercase" }}>
            {uploading ? uploadProgress || "Uploading..." : "📁 Upload Images"}
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} style={{ display: "none" }} disabled={uploading} />
          </label>

          {uploadProgress && !uploading && (
            <p style={{ color: "#10B981", fontSize: "0.8rem", marginBottom: "1rem" }}>{uploadProgress}</p>
          )}

          {/* Image Previews */}
          {form.images.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "0.75rem" }}>
              {form.images.map((img, i) => (
                <div key={i} style={{ position: "relative" }}>
                  <div style={{ width: "100%", paddingBottom: "60%", backgroundImage: `url(${img})`, backgroundSize: "cover", backgroundPosition: "center", border: "1px solid rgba(255,255,255,0.1)" }} />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    style={{ position: "absolute", top: "4px", right: "4px", background: "rgba(227,25,55,0.9)", border: "none", color: "#fff", width: "20px", height: "20px", fontSize: "0.65rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%" }}
                  >
                    ✕
                  </button>
                  {i === 0 && (
                    <span style={{ position: "absolute", bottom: "4px", left: "4px", background: "rgba(0,0,0,0.8)", color: "#10B981", fontSize: "0.55rem", padding: "2px 6px", letterSpacing: "0.1em", textTransform: "uppercase" }}>Main</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Specs */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ color: "#E31937", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Specifications</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1rem" }}>
            {Object.entries(DEFAULT_SPECS).map(([key, _]) => (
              <div key={key}>
                <label style={labelStyle}>{key === "acceleration" ? "0-60 mph" : key.replace(/([A-Z])/g, " $1").trim()}</label>
                <input
                  name={key}
                  value={form.specs[key] || ""}
                  onChange={handleSpecChange}
                  placeholder={key === "range" ? "405 mi" : key === "topSpeed" ? "200 mph" : ""}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#E31937")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Colors & Features */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
          <div>
            <p style={{ color: "#E31937", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Colors</p>
            <label style={labelStyle}>Comma separated</label>
            <textarea
              name="colors"
              value={form.colors}
              onChange={handleChange}
              placeholder="Pearl White, Solid Black, Midnight Silver"
              rows={3}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
              onFocus={(e) => (e.target.style.borderColor = "#E31937")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>
          <div>
            <p style={{ color: "#E31937", fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>Features</p>
            <label style={labelStyle}>One per line</label>
            <textarea
              name="features"
              value={form.features}
              onChange={handleChange}
              placeholder={"Autopilot Included\nGlass Roof\nPremium Audio"}
              rows={3}
              style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }}
              onFocus={(e) => (e.target.style.borderColor = "#E31937")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
          </div>
        </div>

        {/* Toggles */}
        <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem", flexWrap: "wrap" }}>
          {[
            { name: "inStock", label: "In Stock" },
            { name: "featured", label: "Featured on Homepage" },
          ].map((toggle) => (
            <label key={toggle.name} style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
              <div style={{ position: "relative", width: "40px", height: "22px" }}>
                <input
                  type="checkbox"
                  name={toggle.name}
                  checked={form[toggle.name]}
                  onChange={handleChange}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <div style={{ position: "absolute", inset: 0, background: form[toggle.name] ? "#E31937" : "rgba(255,255,255,0.1)", borderRadius: "11px", transition: "0.3s", cursor: "pointer" }} onClick={() => setForm((prev) => ({ ...prev, [toggle.name]: !prev[toggle.name] }))} />
                <div style={{ position: "absolute", top: "3px", left: form[toggle.name] ? "21px" : "3px", width: "16px", height: "16px", background: "#fff", borderRadius: "50%", transition: "0.3s", pointerEvents: "none" }} />
              </div>
              <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>{toggle.label}</span>
            </label>
          ))}
        </div>

        {/* Submit */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <button
            type="submit"
            disabled={saving || uploading}
            style={{ padding: "0.875rem 2rem", background: saving ? "rgba(227,25,55,0.5)" : "#E31937", color: "#fff", border: "none", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: saving ? "not-allowed" : "pointer" }}
          >
            {saving ? "Saving..." : isEditing ? "Update Car" : "Add Car"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            style={{ padding: "0.875rem 2rem", background: "transparent", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.15)", fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}