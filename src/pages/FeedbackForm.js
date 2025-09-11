import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000/feedback";

function FeedbackForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    water_account_number: "",
    phone_number: "",
    zone: "",          // ✅ new
    village: "",       // ✅ new
    uses_giwasco: true,
    alternative_source: "",
    water_quality: "", // ✅ new
    days_per_week: "",
    contact_method: "",
    service_rating: "",
    improvement_areas: "",
    refer_neighbour: true,
  });

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
    await axios.post(API_URL, formData);
    navigate("/feedbacks");
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
          Full Name:
          <input
            type="text"
            name="full_name"
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>

        <label>
          Water Account Number:
          <input
            type="text"
            name="water_account_number"
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>

        <label>
          Phone Number:
          <input
            type="text"
            name="phone_number"
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>

        <label>
          Zone:
          <input
            type="text"
            name="zone"
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>

        <label>
          Village:
          <input
            type="text"
            name="village"
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </label>

        <label>
          Do you use GIWASCO water?
          <div>
            <input
              type="radio"
              name="uses_giwasco"
              value="true"
              defaultChecked
              onChange={handleChange}
            />{" "}
            Yes
            <input
              type="radio"
              name="uses_giwasco"
              value="false"
              onChange={handleChange}
              style={{ marginLeft: "10px" }}
            />{" "}
            No
          </div>
        </label>

        <label>
          If NO, alternative source:
          <input
            type="text"
            name="alternative_source"
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
          How is the quality of our water?
          <select
            name="water_quality"
            onChange={handleChange}
            required
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
          How many days per week do you receive water?
          <input
            type="number"
            name="days_per_week"
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
          If you experience a problem, how do you contact us?
          <select
            name="contact_method"
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">-- Select --</option>
            <option value="Email">Email</option>
            <option value="Mobile">Mobile</option>
            <option value="Visit Office">Visit Office</option>
          </select>
        </label>

        <label>
          Rate our service (0–10):
          <input
            type="number"
            name="service_rating"
            min="0"
            max="10"
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
            name="improvement_areas"
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
              name="refer_neighbour"
              value="true"
              defaultChecked
              onChange={handleChange}
            />{" "}
            Yes
            <input
              type="radio"
              name="refer_neighbour"
              value="false"
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

export default FeedbackForm;
