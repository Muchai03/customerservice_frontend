import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FeedbackForm from "./pages/FeedbackForm";
import FeedbackList from "./pages/FeedbackList";
import "./App.css";
import CSWFeedbackForm from "./pages/CSWFeedbackForm";
import CSWFeedbackList from "./pages/CSWFeedback";

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
        <Route path="/cswf/:acc" element={<CSWFeedbackForm />} />
        <Route path="/cswf/" element={<CSWFeedbackForm />} />
        <Route path="/cswfeedback" element={<CSWFeedbackList />} />
      </Routes>
    </Router>
  );
}

export default App;
