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
    phone_number: "",

    customer_status: "",

    not_connected_reasons: [],
    wants_future_connection: "",

    account_number: "",
    connection_type: "",
    length_of_service: "",
    receives_monthly_bill: "",

    gender: "",
    age_group: "",
    vulnerable_groups: [],

    aware_of_tariff: "",
    tariff_awareness_sources: [],
    tariff_understanding: "",

    service_rating: "",
    service_challenges: [],
    water_frequency: "",

    affordability: "",
    payment_difficulty: "",
    pay_more_conditions: [],
    acceptable_increase: "",
    payment_priorities: [],

    supports_tariff_adjustment: "",
    support_reason: "",
    expected_improvements: [],

    vulnerable_negative_effect: "",
    vulnerable_at_risk: [],
    protection_measures: [],
    cross_subsidy_support: "",

    engagement_rating: "",
    communication_channels: [],

    main_concern: "",
    single_improvement: ""
  });

  useEffect(() => {
    let name = localStorage.getItem("enumerator_name");
    if (!name) {
      name = prompt("Enter Enumerator Name");
      if (name) localStorage.setItem("enumerator_name", name);
    }
    setEnumeratorName(name || "");
  }, []);

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleArray = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value]
    }));
  };

  const handleConsent = (v) => {
    if (!v) setTerminated(true);
    setFormData(prev => ({ ...prev, consent_given: v }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API_URL, { ...formData, enumerator_name: enumeratorName });
    navigate("/thankyou");
  };

  if (terminated) return <p>Interview terminated – consent not given.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>

        <h3>PUBLIC PARTICIPATION QUESTIONNAIRE ON PROPOSED WATER TARIFF ADJUSTMENT</h3>

        <p><strong>Utility Name:</strong> Githunguri Water and Sanitation Company Limited (GIWASCO)</p>

        <p>
          You are invited to participate in a public consultation on the proposed upward water tariff adjustment by
          Githunguri Water and Sanitation Company Limited. The purpose of this exercise is to collect views, experiences,
          and concerns from customers and members of the public to inform decision-making.
        </p>

        <p>
          The feedback collected will form part of the evidence submitted to the Water Services Regulatory Board (WASREB)
          in support of the tariff application. Public participation informs the decision-making process but does not by
          itself determine the final tariff outcome.
        </p>

        <p>
          Your participation is voluntary. You may decline to answer any question. All information will be treated
          confidentially and used strictly for reporting, planning, and regulatory compliance purposes. No personal
          identifiers will be disclosed.
        </p>

        <p><strong>Do you consent to participate in this survey?</strong></p>

        <label><input type="radio" onChange={()=>handleConsent(true)} /> Yes</label>
        <label><input type="radio" onChange={()=>handleConsent(false)} /> No (If No, terminate interview)</label>

        {formData.consent_given && (
        <>
          <p>Location / Ward *</p>
          <input required name="ward" onChange={handleChange} style={inputStyle} />

          <p>Name of participant </p>
          <input
            name="respondent_name"
            value={formData.respondent_name}
            onChange={handleChange}
            style={inputStyle}
          />
          <p>Phone number of participant </p>
          <input
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            style={inputStyle}
          />
              
          
          <h3>SECTION A: ELIGIBILITY & CUSTOMER STATUS (MANDATORY)</h3>

          <p>A1. Are you currently a user of GIWASCO water services?</p>

          <select required name="customer_status" onChange={handleChange} style={inputStyle}>
            <option value="">-- Select --</option>
            <option value="registered_customer">Yes, registered customer</option>
            <option value="shared_connection">Yes, shared connection / kiosk / standpipe</option>
            <option value="vendor_supplied">Yes, buy from vendors supplied by GIWASCO</option>
            <option value="not_served">No, not currently served</option>
          </select>

          {formData.customer_status === "not_served" && (
          <>
            <h4>A2. For Non-Customers Only</h4>
            <p>Why are you not currently connected?</p>

            {["No network coverage","Connection fee too high","Land tenure issues","Use borehole/well/river","Rely on vendors","Temporary housing"].map(x =>
              <label key={x}><input type="checkbox" onChange={()=>toggleArray("not_connected_reasons",x)} /> {x}</label>
            )}

            <p>Would you like to be connected in future if services become available and affordable?</p>

            <select required name="wants_future_connection" onChange={handleChange} style={inputStyle}>
              <option value="">-- Select --</option>
              <option>Yes</option><option>No</option><option>Not sure</option>
            </select>
          </>
          )}

          {formData.customer_status !== "not_served" && (
            <>
            <h4>A3. For Customers Only</h4>

            <p>What is your water Connection/Account number </p>
            <input
              name="account_number"
              value={formData.account_number}
              onChange={handleChange}
              style={inputStyle}
            />

            <p>What type of water connection do you use?</p>
            <select required name="connection_type" onChange={handleChange} style={inputStyle}>
              <option value="">-- Select --</option>
              <option>Individual household</option>
              <option>Shared yard</option>
              <option>Public standpipe/kiosk</option>
              <option>Commercial</option>
              <option>Institution</option>
            </select>

            <p>How long have you been using GIWASCO water services?</p>
            <select required name="length_of_service" onChange={handleChange} style={inputStyle}>
              <option value="">-- Select --</option>
              <option>Less than 1 year</option>
              <option>1–3 years</option>
              <option>More than 3 years</option>
            </select>

            <p>Do you receive a monthly water bill?</p>
            <select required name="receives_monthly_bill" onChange={handleChange} style={inputStyle}>
              <option value="">-- Select --</option>
              <option>Yes</option>
              <option>No</option>
            </select>
            </>
          )}

          <h3>SECTION B: RESPONDENT PROFILE (INCLUSION & EQUITY)</h3>

          <p>B1. Gender</p>
          <select required name="gender" onChange={handleChange} style={inputStyle}>
            <option value="">-- Select --</option>
            <option>Male</option>
            <option>Female</option>
            <option>Prefer not to say</option>
          </select>

          <p>B2. Age Group</p>
          <select required name="age_group" onChange={handleChange} style={inputStyle}>
            <option value="">-- Select --</option>
            <option>18–25</option>
            <option>26–35</option>
            <option>36–50</option>
            <option>51–65</option>
            <option>Above 65</option>
          </select>

          <p>B3. Do you identify as part of any any vulnerable group?</p>
          {["Persons with disability","Elderly (65+)","Low-income household", "Informal settlement resident", "Refugee/IDP", "None", "Prefer not to say"].map(x =>
          <label key={x}><input type="checkbox" onChange={()=>toggleArray("vulnerable_groups",x)} /> {x}</label>
          )}

          <h3>SECTION C: AWARENESS OF PROPOSED TARIFF ADJUSTMENT</h3>

          <p>C1. Were you aware of the proposed tariff adjustment?</p>
          <select required name="aware_of_tariff" onChange={handleChange} style={inputStyle}>
          <option value="">-- Select --</option>
          <option>Yes</option><option>No</option>
          </select>

          <p>C2. Source of information (select all applicable)</p>
          {["Radio","Community meetings","Learnt today through this exercise","GIWASCO staff","Posters/notices","Social media", "SMS", "Website", "Word of mouth"].map(x =>
          <label key={x}><input type="checkbox" onChange={()=>toggleArray("tariff_awareness_sources",x)} /> {x}</label>
          )}

          <p>C3. How well do you understand the proposed changes?</p>
          <select required name="tariff_understanding" onChange={handleChange} style={inputStyle}>
          <option value="">-- Select --</option>
          <option>Very well</option>
          <option>Somewhat/Not sure</option>
          <option>Poorly</option>
          <option>Not at all</option>
          </select>

          {formData.customer_status !== "not_served" && (
          <>
            <h3>SECTION D: SERVICE QUALITY & EXPERIENCE</h3>

            <p>D1. Overall service rating</p>
            <select required name="service_rating" onChange={handleChange} style={inputStyle}>
            <option value="">-- Select --</option>
            <option>Excellent</option><option>Good</option><option>Fair</option><option>Poor</option><option>Very poor</option>
            </select>

            <p>D2. Main service challenges (select all applicable)</p>
            {["Low pressure","Frequent interruptions","Poor water quality","Billing errors/disputes", "High bills", "Slow response", "Sewer overflows/no sewer", "Long distance to water point", "No connection"].map(x =>
            <label key={x}><input type="checkbox" onChange={()=>toggleArray("service_challenges",x)} /> {x}</label>
            )}

            <p>D3. Frequency of water availability</p>
            <select required name="water_frequency" onChange={handleChange} style={inputStyle}>
            <option value="">-- Select --</option>
            <option>Daily</option><option>Several days per week</option> <option>Once a week</option><option>Rarely</option><option>Never</option>
            </select>
          </>
          )}

          <h3>SECTION E: AFFORDABILITY & WILLINGNESS TO PAY</h3>


          {formData.customer_status !== "not_served" && (
          <>
            <p>E1. Is current water bill affordable?</p>
            <select required name="affordability" onChange={handleChange} style={inputStyle}>
            <option value="">-- Select --</option>
            <option>Yes</option><option>No</option>
            </select>
            <p>E2. Do you struggle to pay on time?</p>
            <select required name="payment_difficulty" onChange={handleChange} style={inputStyle}>
            <option value="">-- Select --</option>
            <option>Sometimes</option><option>Rarely</option><option>Never</option>
            </select>
          </>
          )}

          <p>E3. Under what conditions would you accept paying more for water?</p>
          {["Improved reliability","Better water quality","Expanded coverage","Faster repairs", "Sewer services improvement", "None"].map(x =>
          <label key={x}><input type="checkbox" onChange={()=>toggleArray("pay_more_conditions",x)} /> {x}</label>
          )}

          <p>E4. What increase would be acceptable?</p>
          <select required name="acceptable_increase" onChange={handleChange} style={inputStyle}>
          <option value="">-- Select --</option>
          <option>Up to 10%</option>
          <option>10–20%</option>
          <option>Above 20%</option>
          <option>No increase acceptable</option>
          </select>

          <p>E4. What do you consider the most important factors when paying for water? (select up to 2)</p>
          {["Water quality","Consistent water flow","Fair billing","Meter accuracy","Customer service", "Sewer services"].map(x =>
          <label key={x}><input type="checkbox" onChange={()=>toggleArray("payment_priorities",x)} /> {x}</label>
          )}

          <h3>SECTION F: VIEWS ON THE PROPOSED TARIFF ADJUSTMENT</h3>

          <p>F1. Do you support the proposed tariff adjustment?</p>
          <select required name="supports_tariff_adjustment" onChange={handleChange} style={inputStyle}>
          <option value="">-- Select --</option>
          <option>Yes</option><option>No</option><option>Not sure</option>
          </select>

          <p>F2. Reason for your position</p>
          <textarea required name="support_reason" onChange={handleChange} style={inputStyle} />

          <p>F3. Expected improvements (select all)</p>
          {["Expanded coverage", "Better water quality","Better pressure", "Faster leak repairs","Sewer services","Improved customer service", "Meter replacement", "Reduction of illegal connections"].map(x =>
          <label key={x}><input type="checkbox" onChange={()=>toggleArray("expected_improvements",x)} /> {x}</label>
          )}

          <h3>SECTION G: VULNERABLE GROUPS & COMMUNICATION</h3>

          <p>G1. Do you think the tariff adjustment may negatively affect vulnerable households?</p>
          <select required name="vulnerable_negative_effect" onChange={handleChange} style={inputStyle}>
          <option value="">-- Select --</option>
          <option>Yes</option><option>No</option><option>Not sure</option>
          </select>

          <p>G2. Who is most at risk?</p>
          {["Elderly","Persons with disability","Low-income families","Informal settlement residents", "Orphans/child‑headed households", "Unemployed"].map(x =>
          <label key={x}><input type="checkbox" onChange={()=>toggleArray("vulnerable_at_risk",x)} /> {x}</label>
          )}

          <p>G3. Preferred protection measures for the vulnerable</p>
          {["Lifeline tariffs","Targeted subsidies","Flexible payment plans", "Community water points", "Waiver of penalties", "Cross‑subsidy from high‑income users", "Social assistance programs"].map(x =>
          <label key={x}><input type="checkbox" onChange={()=>toggleArray("protection_measures",x)} /> {x}</label>
          )}

          <p>G4. Would you support higher‑income users paying more to protect vulnerable groups?</p>
          <select required name="cross_subsidy_support" onChange={handleChange} style={inputStyle}>
          <option value="">-- Select --</option>
          <option>Yes</option><option>No</option><option>Not sure</option>
          </select>

          <h3>SECTION H: COMMUNICATION & TRUST</h3>
          <p>H1. How would you rate GIWASCO's customer engagement?</p>
          <select required name="engagement_rating" onChange={handleChange} style={inputStyle}>
          <option value="">-- Select --</option>
          <option>Good</option><option>Fair</option><option>Poor</option><option>Very poor</option>
          </select>

          <p>H2. Preferred communication channels</p>
          {["SMS","Radio","Community meetings","Social media", "Website", "Posters", "Email", "Chiefs’ barazas", "Door-to-door"].map(x =>
          <label key={x}><input type="checkbox" onChange={()=>toggleArray("communication_channels",x)} /> {x}</label>
          )}

          <h3>SECTION I: FINAL FEEDBACK</h3>

          <p>What is your main concern regarding tariff adjustment:</p>
          <textarea required name="main_concern" onChange={handleChange} style={inputStyle} />

          <p>Which is the single most important improvement expected:</p>
          <textarea required name="single_improvement" onChange={handleChange} style={inputStyle} />

          <div style={{ width: "100%" }}>
            <button
              type="submit"
              style={{
                display: "block",       // <-- add this
                margin: "10px auto",
                padding: "10px",
                background: "#0066cc",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Submit Response
            </button>
          </div>
        </>
        )}

      </div>
    </form>
  );
}
