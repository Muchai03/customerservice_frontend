import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FeedbackForm from "./pages/FeedbackForm";
import FeedbackList from "./pages/FeedbackList";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="navbar">
        <Link to="/">Form</Link>
        <Link to="/feedbacks">Feedbacks</Link>
      </div>
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/feedbacks" element={<FeedbackList />} />
      </Routes>
    </Router>
  );
}

export default App;
