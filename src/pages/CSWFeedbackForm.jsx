import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "/api/customerswf";

export default function CSWFeedbackForm() {
  const navigate = useNavigate();
  const { acc } = useParams(); // e.g. /customerswf/{acc}
  const [formData, setFormData] = useState({
    account_number: acc || "",
    days_with_water: "",
    water_quality: "",
    service_rating: "",
    recommend_us: true,
    improvement_suggestions: "",
    longitude: "",
    latitude: "",
  });

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
    fontSize: "16px",
  };

  // Capture user location quietly on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((prev) => ({
            ...prev,
            latitude: pos.coords.latitude.toString(),
            longitude: pos.coords.longitude.toString(),
          }));
        },
        (err) => {
          // Do not alert — just silently skip if permission denied or unavailable
          console.warn("Location not captured:", err.message);
        },
        {
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      console.warn("Geolocation not supported by this browser.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const finalValue = type === "radio" ? value === "true" : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      navigate("/thankyou");
    } catch (error) {
      console.error("❌ Error submitting feedback:", error);
      alert("Something went wrong while submitting your feedback. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#0066cc", fontSize: "20px"}}>
        🎊 Happy Customer Service Week 🎊
      </h1>
      <p style={{ textAlign: "center", color: "#0066cc" }}>Thank you for being our valued customer. Please inform us to help us serve you better.</p>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <label>
          Account Number:
          <input
            type="text"
            name="account_number"
            value={formData.account_number}
            onChange={handleChange}
            style={inputStyle}
          />
        </label>

        <label>
          How many days per week do you receive water?
          <input
            type="text"
            name="days_with_water"
            value={formData.days_with_water}
            onChange={handleChange}
            placeholder="e.g. 7"
            style={inputStyle}
          />
        </label>

        <label>
          How is the quality of our water?
          <select
            name="water_quality"
            value={formData.water_quality}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">-- Select --</option>
            <option value="Very Clean">Very Clean</option>
            <option value="Clean">Clean</option>
            <option value="Salty">Salty</option>
            <option value="Dirty">Dirty</option>
          </select>
        </label>

        <label>
          Rate our service (0–10):
          <select
            name="service_rating"
            value={formData.service_rating}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">-- Select Rating --</option>
            {[...Array(11).keys()].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>

        <label>
          What should we do better/improve on?
          <textarea
            name="improvement_suggestions"
            value={formData.improvement_suggestions}
            onChange={handleChange}
            style={inputStyle}
          ></textarea>
        </label>

        <label>
          Would you recommend us?
          <div>
            <input
              type="radio"
              name="recommend_us"
              value="true"
              checked={formData.recommend_us === true}
              onChange={handleChange}
            />{" "}
            Yes
            <input
              type="radio"
              name="recommend_us"
              value="false"
              checked={formData.recommend_us === false}
              onChange={handleChange}
              style={{ marginLeft: "10px" }}
            />{" "}
            No
          </div>
        </label>

        <button
          type="submit"
          style={{
            padding: "10px",
            background: "#0066cc",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}
