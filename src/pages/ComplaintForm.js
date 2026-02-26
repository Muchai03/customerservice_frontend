import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const API_URL = "http://localhost:5000/complaints";
const API_URL = "/api/complaints";

const complaintCategories = {
  "Supply Issues": [
    "No Water","Low Pressure","Intermittent Supply","Dirty Water",
    "Smelly Water","Discolored Water","Airlocks","Supply Delay","Illegal Connection",
  ],
  
  "Leaks & Infrastructure": [
    "Pipe Burst","Pipe Leak","Meter Leak","Valve Leak",
    "Tank Leak","Tank Overflow",
  ],
  "Billing & Payments": [
    "High Bill","Wrong Bill","Bill Missing","Bill Not Received",
    "Payment Error","Double Payment","Balance Dispute","Arrears Query",
  ],
  "Meter Issues": [
    "Faulty Meter","Stalled Meter","Fast Meter","Slow Meter",
    "Meter Missing","Meter Relocation","Meter Reading","Reading Error",
  ],
  "Account Services": [
    "New Connection","Reconnection","Disconnection",
    "Ownership Change","Account Update","Account Closure",
  ],
  "Service Quality": [
    "Staff Complaint","Delay Complaint","Poor Service","Misconduct Report",
  ],
  "Technical / Other": [
    "Illegal Use","Vandalism Report","Water Theft",
    "Road Damage","Restoration Delay",
  ],
};

function ComplaintForm() {
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    date: today,
    customer_name: "",
    connection_number: "",
    location: "",
    category: "",
    complaint_type: "",
    description: "",
    assigned_to: "",
    registered_by: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    setFormData({
      ...formData,
      category: e.target.value,
      complaint_type: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalData = {
      date: formData.date,
      customer_name: formData.customer_name,
      connection_number: formData.connection_number,
      location: formData.location,
      complaint_type: `${formData.category} - ${formData.complaint_type}`,
      description: formData.description,
      assigned_to: formData.assigned_to,
      registered_by: formData.registered_by,
    };

    try {
      await axios.post(API_URL, finalData);
      navigate("/complaints");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint");
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>🚰 Customer Complaint Registration</h1>

      <form onSubmit={handleSubmit} style={formStyle}>

        {/* Date */}
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Customer Info */}
        <input
          type="text"
          name="customer_name"
          placeholder="Customer Name"
          value={formData.customer_name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="connection_number"
          placeholder="Connection Number"
          value={formData.connection_number}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* Complaint Type */}
        <label style={labelStyle}>Complaint Type</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleCategoryChange}
          required
          style={inputStyle}
        >
          <option value="">Select Complaint Type</option>
          {Object.keys(complaintCategories).map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        {/* Specific Issue */}
        {formData.category && (
          <>
            <label style={labelStyle}>Specific Issue</label>
            <select
              name="complaint_type"
              value={formData.complaint_type}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select Specific Issue</option>
              {complaintCategories[formData.category].map((issue) => (
                <option key={issue} value={issue}>{issue}</option>
              ))}
            </select>
          </>
        )}

        {/* Description */}
        <textarea
          name="description"
          placeholder="Additional Description"
          value={formData.description}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Assigned To */}
        <input
          type="text"
          name="assigned_to"
          placeholder="Assign To"
          value={formData.assigned_to}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Registered By - MOVED TO END */}
        <input
          type="text"
          name="registered_by"
          placeholder="Registered By"
          value={formData.registered_by}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Submit Complaint
        </button>
      </form>
    </div>
  );
}

/* ========== STYLES ========== */

const containerStyle = {
  maxWidth: "600px",
  margin: "40px auto",
  padding: "25px",
  background: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const titleStyle = {
  textAlign: "center",
  color: "#0066cc",
  marginBottom: "20px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const labelStyle = {
  fontWeight: "bold",
};

const buttonStyle = {
  padding: "12px",
  background: "#0066cc",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "bold",
};

export default ComplaintForm;