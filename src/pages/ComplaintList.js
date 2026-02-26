import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";

const API_URL = "/api/complaints";

function ComplaintsList() {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await axios.get(API_URL);
      setComplaints(response.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const formatDate = (isoDate) => (isoDate ? isoDate.split("T")[0] : "");

  // Edit handlers
  const handleEditClick = (complaint) => {
    setEditingId(complaint.id);
    setEditData({ ...complaint });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const saveEdit = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, editData);
      setEditingId(null);
      fetchComplaints();
    } catch (error) {
      console.error("Error updating complaint:", error);
      alert("Failed to update");
    }
  };

  const deleteComplaint = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchComplaints();
    } catch (error) {
      console.error("Error deleting complaint:", error);
      alert("Failed to delete");
    }
  };

  const exportExcel = () => {
    const data = complaints.map(c => ({
      Date: formatDate(c.date),
      Customer: c.customer_name,
      "Connection No.": c.connection_number,
      Location: c.location,
      "Complaint Type": c.complaint_type,
      "Assigned To": c.assigned_to,
      Description: c.description,
      Status: c.status || "Pending",
      "Registered By": c.registered_by
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Complaints");
    XLSX.writeFile(wb, "Complaints.xlsx");
  };

  // Filter and search
  const filteredComplaints = complaints.filter(c => {
    const matchesSearch =
      c.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.complaint_type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFrom = filterFrom ? formatDate(c.date) >= filterFrom : true;
    const matchesTo = filterTo ? formatDate(c.date) <= filterTo : true;
    return matchesSearch && matchesFrom && matchesTo;
  });

  // Dashboard stats
  const total = complaints.length;
  const pending = complaints.filter(c => (c.status || "Pending") === "Pending").length;
  const inProgress = complaints.filter(c => c.status === "In Progress").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>📋 Registered Complaints</h1>

      {/* Dashboard */}
      <div style={dashboardStyle}>
        <div>Total: {total}</div>
        <div>Pending: {pending}</div>
        <div>In Progress: {inProgress}</div>
        <div>Resolved: {resolved}</div>
      </div>

      {/* Filters */}
      <div style={filterStyle}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={searchInputStyle}
        />
        <input
          type="date"
          value={filterFrom}
          onChange={e => setFilterFrom(e.target.value)}
          style={searchInputStyle}
        />
        <input
          type="date"
          value={filterTo}
          onChange={e => setFilterTo(e.target.value)}
          style={searchInputStyle}
        />
        <button onClick={exportExcel} style={buttonStyle}>Export to Excel</button>
      </div>

      <table style={tableStyle}>
        <thead style={theadStyle}>
          <tr>
            <th style={thStyle}>Date</th>
            <th style={thStyle}>Customer</th>
            <th style={thStyle}>Connection No.</th>
            <th style={thStyle}>Location</th>
            <th style={thStyle}>Complaint Type</th>
            <th style={thStyle}>Assigned To</th>
            <th style={thStyle}>Description</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Registered By</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints.length === 0 ? (
            <tr>
              <td colSpan="10" style={{ textAlign: "center", padding: "10px" }}>No complaints found</td>
            </tr>
          ) : (
            filteredComplaints.map(c => (
              <tr key={c.id}>
                <td style={tdStyle}>{formatDate(c.date)}</td>
                <td style={tdStyle}>{c.customer_name}</td>
                <td style={tdStyle}>{c.connection_number}</td>
                <td style={tdStyle}>{c.location}</td>
                <td style={tdStyle}>{c.complaint_type}</td>
                <td style={tdStyle}>{c.assigned_to}</td>
                <td style={tdStyle}>{c.description}</td>
                <td style={tdStyle}>
                  {editingId === c.id ? (
                    <select name="status" value={editData.status || "Pending"} onChange={handleEditChange}>
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  ) : c.status || "Pending"}
                </td>
                <td style={tdStyle}>{c.registered_by}</td>
                <td style={tdStyle}>
                  {editingId === c.id ? (
                    <>
                      <button onClick={() => saveEdit(c.id)} style={smallButton}>Save</button>
                      <button onClick={() => setEditingId(null)} style={smallButton}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(c)} style={smallButton}>Edit</button>
                      <button onClick={() => deleteComplaint(c.id)} style={smallButton}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/* ========== STYLES ========== */
const containerStyle = {
  width: "95%",
  margin: "30px auto",
  background: "#fff",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#0066cc",
};

const dashboardStyle = {
  display: "flex",
  justifyContent: "space-around",
  marginBottom: "15px",
  fontWeight: "bold",
};

const filterStyle = {
  display: "flex",
  gap: "10px",
  marginBottom: "15px",
  flexWrap: "wrap",
};

const searchInputStyle = {
  padding: "8px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  padding: "8px 12px",
  background: "#0066cc",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const smallButton = {
  padding: "4px 6px",
  margin: "2px",
  borderRadius: "4px",
  border: "none",
  cursor: "pointer",
  background: "#0066cc",
  color: "#fff",
};

const tableStyle = { width: "100%", borderCollapse: "collapse" };
const theadStyle = { background: "#f0f0f0" };
const thStyle = { border: "1px solid #ccc", padding: "8px", textAlign: "left" };
const tdStyle = { border: "1px solid #ccc", padding: "8px" };

export default ComplaintsList;