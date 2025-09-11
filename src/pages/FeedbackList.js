import React, { useEffect, useState } from "react"; 
import axios from "axios";

const API_URL = "http://localhost:5000/feedback";

function FeedbackList() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    axios.get(API_URL).then((res) => setResponses(res.data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#0066cc" }}>
        📊 Submitted Feedbacks
      </h1>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th> {/* ✅ New */}
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Account</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Phone</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Zone</th> {/* ✅ New */}
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Village</th> {/* ✅ New */}
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Water Quality
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Contact Method
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Days/Week
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Rating</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Improvement
            </th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>
              Recommend
            </th>
          </tr>
        </thead>
        <tbody>
          {responses.map((r) => (
            <tr key={r.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {r.id} 
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {r.full_name}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {r.water_account_number}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {r.phone_number}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {r.zone}
              </td> 
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {r.village}
              </td> 
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {r.water_quality}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {r.contact_method}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {r.days_per_week}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {r.service_rating}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {r.improvement_areas}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {r.refer_neighbour ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FeedbackList;
