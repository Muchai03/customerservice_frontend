import React from "react";
import { useNavigate } from "react-router-dom";

export default function ThankYouPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "linear-gradient(135deg, #e0f7fa, #80deea)",
        textAlign: "center",
        color: "#0066cc",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Animated checkmark */}
      <div className="checkmark-container">
        <svg
          viewBox="0 0 52 52"
          style={{
            width: "100px",
            height: "100px",
            stroke: "#4CAF50",
            strokeWidth: "4",
            fill: "none",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            marginBottom: "20px",
          }}
        >
          <circle
            cx="26"
            cy="26"
            r="25"
            strokeDasharray="166"
            strokeDashoffset="166"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="166"
              to="0"
              dur="1s"
              fill="freeze"
            />
          </circle>
          <path
            d="M14 27l7 7 16-16"
            strokeDasharray="48"
            strokeDashoffset="48"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="48"
              to="0"
              begin="1s"
              dur="0.5s"
              fill="freeze"
            />
          </path>
        </svg>
      </div>

      {/* Animated text */}
      <h1
        style={{
          fontSize: "26px",
          animation: "fadeIn 2s ease-in-out",
        }}
      >
        🎉 Thank You for Your Feedback!
      </h1>

      <p
        style={{
          marginTop: "10px",
          fontSize: "18px",
          color: "#004d80",
          animation: "fadeIn 3s ease-in-out",
        }}
      >
        We value your feedback... 
        Your input helps us improve and serve you even better. 💧
      </p>

      {/* Go Home Button */}
      <button
        onClick={() => navigate("/")}
        style={{
          marginTop: "25px",
          padding: "12px 24px",
          backgroundColor: "#0066cc",
          color: "#fff",
          fontSize: "16px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          animation: "fadeIn 4s ease-in-out",
        }}
      >
        Go to Home Page
      </button>

      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </div>
  );
}
