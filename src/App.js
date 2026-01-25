import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import FeedbackForm from "./pages/FeedbackForm";
import FeedbackList from "./pages/FeedbackList";
import "./App.css";
import CSWFeedbackForm from "./pages/CSWFeedbackForm";
import CSWFeedbackList from "./pages/CSWFeedback";
import ThankYouPage from "./pages/Thankyou";
import TariffPublicParticipationForm from "./pages/TariffPublicParticipationForm";

function Navbar() {
  const location = useLocation();
  const isCSWFeedbackPage = location.pathname.startsWith("/cswf") || location.pathname.startsWith("/thankyou");;

  return (
    <div className="navbar" style={{
      background: "#0066cc",
      color: "white",
      padding: "10px",
      width: "100%",
      // display: "flex",
      justifyContent: "center",
      gap: "20px",
      fontWeight: "bold",
    }}>
      {isCSWFeedbackPage ? (
        <span>💧Githunguri Water</span>
      ) : (
        <>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>Feedback Form</Link>
          {/* <Link to="/feedbacks" style={{ color: "white", textDecoration: "none" }}>Feedbacks</Link>
          <Link to="/cswfeedback" style={{ color: "white", textDecoration: "none" }}>CSW Feedback</Link> */}
        </>
      )}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<FeedbackForm />} /> */}
        <Route path="/" element={<TariffPublicParticipationForm />} />
        <Route path="/tpp" element={<TariffPublicParticipationForm />} />
        <Route path="/feedbacks" element={<FeedbackList />} />
        <Route path="/cswf/:acc" element={<CSWFeedbackForm />} />
        <Route path="/cswf/" element={<CSWFeedbackForm />} />
        <Route path="/cswfeedback" element={<CSWFeedbackList />} />
        <Route path="/thankyou" element={<ThankYouPage />} />
      </Routes>
    </Router>
  );
}
