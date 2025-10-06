import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "/api/customer-service-feedback";

export default function CSWFeedbackList() {
  const [responses, setResponses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(API_URL);
        setResponses(res.data);
      } catch (err) {
        console.error("Error fetching feedback:", err.message);
        setError("Failed to load feedback. Please try again later.");
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#0066cc" }}>
        📊 Submitted Feedback
      </h1>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px",
        }}
      >
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Account No</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Days With Water</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Water Quality</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Service Rating</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Recommend Us</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Improvement Suggestions</th>
            {/* <th style={{ border: "1px solid #ccc", padding: "8px" }}>Longitude</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Latitude</th> */}
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Submitted On</th>
          </tr>
        </thead>
        <tbody>
          {responses.length === 0 ? (
            <tr>
              <td colSpan="10" style={{ textAlign: "center", padding: "20px" }}>
                No feedback received yet.
              </td>
            </tr>
          ) : (
            responses.map((r) => (
              <tr key={r.id}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{r.id}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{r.account_number}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{r.days_with_water}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{r.water_quality}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{r.service_rating}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {r.recommend_us ? "Yes" : "No"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {r.improvement_suggestions || "—"}
                </td>
                {/* <td style={{ border: "1px solid #ccc", padding: "8px" }}>{r.longitude}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{r.latitude}</td> */}
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {new Date(r.created_at).toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
