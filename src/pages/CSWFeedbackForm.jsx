import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = "/api/customer-service-feedback";

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

  // Capture user location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setFormData((prev) => ({
            ...prev,
            latitude: pos.coords.latitude.toString(),
            longitude: pos.coords.longitude.toString(),
          }));
        },
        (err) => {
          alert("Please allow location access to submit your feedback.");
          console.error("Location error:", err);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    let finalValue = value;
    if (type === "radio") {
      finalValue = value === "true";
    }
    setFormData({ ...formData, [name]: finalValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(API_URL, formData);
      navigate("/feedbacks");
    } catch (error) {
      console.error("❌ Error submitting feedback:", error);
      alert("Something went wrong while submitting your feedback. Please try again.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#0066cc" }}>
        💧 GIWASCO Customer Service Week Feedback
      </h1>

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
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>

        <label>
          How many days per week do you receive water?
          <input
            type="text"
            name="days_with_water"
            value={formData.days_with_water}
            onChange={handleChange}
            placeholder="e.g. 3 days"
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
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
          <input
            type="number"
            name="service_rating"
            min="0"
            max="10"
            value={formData.service_rating}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>

        <label>
          Areas for improvement:
          <textarea
            name="improvement_suggestions"
            value={formData.improvement_suggestions}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
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
