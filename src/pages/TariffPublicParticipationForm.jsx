import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "/api/public-participation";

export default function TariffPublicParticipationForm() {
  const navigate = useNavigate();

  const [enumeratorName, setEnumeratorName] = useState("");
  const [terminated, setTerminated] = useState(false);

  const [formData, setFormData] = useState({
    ward: "",
    consent_given: null,

    respondent_name: "",
    customer_status: "",
    phone_number: "",
    account_number: "",
    not_connected_reasons: [],
    wants_future_connection: "",
    connection_type: "",

    gender: "",
    age_group: "",
    vulnerable_groups: [],

    tariff_awareness_sources: [],
    tariff_understanding: "",

    willing_to_pay_more: "",
    payment_priorities: [],

    supports_tariff_adjustment: "",
    support_reason: "",
    expected_improvements: []
  });

  /* ---------------------------------------------
     Enumerator name (stored on device)
  ----------------------------------------------*/
  useEffect(() => {
    let name = localStorage.getItem("enumerator_name");
    if (!name) {
      name = prompt("Enter Enumerator Name");
      if (name) localStorage.setItem("enumerator_name", name);
    }
    setEnumeratorName(name || "");
  }, []);

  /* ---------------------------------------------
     Helpers
  ----------------------------------------------*/
  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "15px",
    boxSizing: "border-box"
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxArray = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value]
    }));
  };

  const handleConsent = (value) => {
    if (!value) {
      setTerminated(true);
    }
    setFormData((prev) => ({ ...prev, consent_given: value }));
  };

  /* ---------------------------------------------
     Submit
  ----------------------------------------------*/
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(API_URL, {
        ...formData,
        enumerator_name: enumeratorName
      });
      navigate("/thankyou");
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to submit response. Please try again.");
    }
  };

  /* ---------------------------------------------
     Early termination (no consent)
  ----------------------------------------------*/
  if (terminated) {
    return (
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
        <h3>Thank you.</h3>
        <p>You have chosen not to participate in this consultation.</p>
      </div>
    );
  }

  /* ---------------------------------------------
     Render
  ----------------------------------------------*/
  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center", color: "#0066cc" }}>
        Public Participation on Proposed Water Tariff Adjustment
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

        {/* Location */}
        <label>
          Location / Ward
          <input
            name="ward"
            value={formData.ward}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        {/* Consent */}
        <fieldset>
          <legend><strong>Consent to Participate</strong></legend>
          <label>
            <input
              type="radio"
              name="consent"
              onChange={() => handleConsent(true)}
            /> Yes
          </label>{" "}
          <label style={{ marginLeft: "15px" }}>
            <input
              type="radio"
              name="consent"
              onChange={() => handleConsent(false)}
            /> No
          </label>
        </fieldset>

        {formData.consent_given && (
          <>
          <label>
              Name of participant
              <input
                name="respondent_name"
                value={formData.respondent_name}
                onChange={handleChange}
                style={inputStyle}
              />
            </label>
            {/* Section A: Eligibility & Customer Status */}
            <label>
              Are you currently a user of the company’s water services?
              <select
                name="customer_status"
                value={formData.customer_status}
                onChange={handleChange}
                required
                style={inputStyle}
              >
                <option value="">-- Select --</option>
                <option value="registered_customer">Registered customer</option>
                <option value="shared_connection">Shared connection / kiosk</option>
                <option value="vendor_supplied">Buy from vendors</option>
                <option value="not_served">Not currently served</option>
              </select>
            </label>

            <label>
              Phone Number (optional)
              <input
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                style={inputStyle}
              />
            </label>

            {/* Non-customer */}
            {formData.customer_status === "not_served" && (
              <>
                <label>
                  Account Number (if any)
                  <input
                    name="account_number"
                    value={formData.account_number}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </label>

                <fieldset>
                  <legend>Why are you not connected? (Select all that apply)</legend>
                  {[
                    "No network coverage",
                    "Connection fee too high",
                    "Land tenure issues",
                    "Use borehole/well/river",
                    "Rely on vendors",
                    "House is temporary",
                    "Other"
                  ].map((r) => (
                    <label key={r} style={{ display: "block" }}>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxArray("not_connected_reasons", r)}
                      /> {r}
                    </label>
                  ))}
                </fieldset>

                <label>
                  Would you like to be connected in the future?
                  <select
                    name="wants_future_connection"
                    value={formData.wants_future_connection}
                    onChange={handleChange}
                    style={inputStyle}
                  >
                    <option value="">-- Select --</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Not sure">Not sure</option>
                  </select>
                </label>
              </>
            )}

            {/* Customers */}
            {formData.customer_status !== "not_served" && (
              <label>
                Type of connection
                <select
                  name="connection_type"
                  value={formData.connection_type}
                  onChange={handleChange}
                  style={inputStyle}
                >
                  <option value="">-- Select --</option>
                  <option value="Individual household">Individual household</option>
                  <option value="Shared">Shared</option>
                  <option value="Public kiosk">Public kiosk</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Institutional">Institutional</option>
                </select>
              </label>
            )}

            {/* Section B: Respondent Profile */}
            <label>
              Gender
              <select name="gender" value={formData.gender} onChange={handleChange} style={inputStyle}>
                <option value="">-- Select --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </label>

            <label>
              Age Group
              <select name="age_group" value={formData.age_group} onChange={handleChange} style={inputStyle}>
                <option value="">-- Select --</option>
                <option value="Below 18">Below 18</option>
                <option value="18–25">18–25</option>
                <option value="26–35">26–35</option>
                <option value="36–50">36–50</option>
                <option value="51–65">51–65</option>
                <option value="Above 65">Above 65</option>
              </select>
            </label>

            <fieldset>
              <legend>Do you identify as part of any vulnerable/marginalized group? (Select all that apply)</legend>
              {[
                "Person with disability",
                "Elderly (65+)",
                "Single-parent household",
                "Low-income household",
                "Informal settlement resident",
                "Refugee / IDP",
                "None",
                "Prefer not to say"
              ].map((v) => (
                <label key={v} style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxArray("vulnerable_groups", v)}
                  /> {v}
                </label>
              ))}
            </fieldset>

            {/* Section C: Awareness */}
            <fieldset>
              <legend>How did you learn about the tariff? (Select all that apply)</legend>
              {[
                "Utility staff",
                "Radio",
                "Social media",
                "Community meeting",
                "Posters / fliers",
                "Word of mouth",
                "Learnt today through this exercise",
                "Other"
              ].map((s) => (
                <label key={s} style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxArray("tariff_awareness_sources", s)}
                  /> {s}
                </label>
              ))}
            </fieldset>

            <label>
              How well do you understand why the tariff adjustment is being proposed?
              <select
                name="tariff_understanding"
                value={formData.tariff_understanding}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">-- Select --</option>
                <option value="Very well">Very well</option>
                <option value="Well">Well</option>
                <option value="Not sure">Not sure</option>
                <option value="Poorly">Poorly</option>
                <option value="Not at all">Not at all</option>
              </select>
            </label>

            {/* Section E: Affordability */}
            <label>
              If service quality improved, would you be willing to pay slightly more?
              <select
                name="willing_to_pay_more"
                value={formData.willing_to_pay_more}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">-- Select --</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Not sure">Not sure</option>
              </select>
            </label>

            <fieldset>
              <legend>What matters most when paying for water? (Select up to 2)</legend>
              {[
                "Reliability",
                "Water quality",
                "Low cost",
                "Fast customer service",
                "Sewer services",
                "Fair billing",
                "Meter accuracy"
              ].map((p) => (
                <label key={p} style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxArray("payment_priorities", p)}
                  /> {p}
                </label>
              ))}
            </fieldset>

            {/* Section F: Views on Tariff */}
            <label>
              Do you support the proposed tariff adjustment?
              <select
                name="supports_tariff_adjustment"
                value={formData.supports_tariff_adjustment}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">-- Select --</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Not sure">Not sure</option>
              </select>
            </label>

            <label>
              Why?
              <textarea
                name="support_reason"
                value={formData.support_reason}
                onChange={handleChange}
                style={inputStyle}
              />
            </label>

            <fieldset>
              <legend>What improvements do you expect if tariffs are adjusted? (Select all that apply)</legend>
              {[
                "More reliable supply",
                "Expanded coverage",
                "Better water quality",
                "Faster leak repairs",
                "Sewer services",
                "Better customer care",
                "Meter replacements",
                "Reduced illegal connections"
              ].map((i) => (
                <label key={i} style={{ display: "block" }}>
                  <input
                    type="checkbox"
                    onChange={() => handleCheckboxArray("expected_improvements", i)}
                  /> {i}
                </label>
              ))}
            </fieldset>

            <button
              type="submit"
              style={{
                padding: "12px",
                background: "#0066cc",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Submit Response
            </button>
          </>
        )}
      </form>
    </div>
  );
}
