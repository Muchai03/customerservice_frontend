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
      console.error(err);
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
            {/* Section A */}
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
                  <legend>Why are you not connected?</legend>
                  {[
                    "no_network",
                    "high_connection_fee",
                    "land_tenure",
                    "own_source",
                    "vendors",
                    "temporary_house"
                  ].map((r) => (
                    <label key={r} style={{ display: "block" }}>
                      <input
                        type="checkbox"
                        onChange={() => handleCheckboxArray("not_connected_reasons", r)}
                      />{" "}
                      {r.replaceAll("_", " ")}
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
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                    <option value="not_sure">Not sure</option>
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
                  <option value="individual">Individual household</option>
                  <option value="shared">Shared</option>
                  <option value="kiosk">Public kiosk</option>
                  <option value="commercial">Commercial</option>
                  <option value="institutional">Institutional</option>
                </select>
              </label>
            )}

            {/* Section F */}
            <label>
              Do you support the proposed tariff adjustment?
              <select
                name="supports_tariff_adjustment"
                value={formData.supports_tariff_adjustment}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">-- Select --</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="not_sure">Not sure</option>
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
