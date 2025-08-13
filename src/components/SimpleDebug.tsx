import React from "react";

const SimpleDebug: React.FC = () => {
  console.log("SimpleDebug component loaded");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🐛 Simple Debug Information</h1>

      <h2>Environment Variables:</h2>
      <div style={{ background: "#f5f5f5", padding: "10px", margin: "10px 0" }}>
        <p>
          <strong>VITE_APPWRITE_URL:</strong>{" "}
          {import.meta.env.VITE_APPWRITE_URL || "Not set"}
        </p>
        <p>
          <strong>VITE_APPWRITE_PROJECT_ID:</strong>{" "}
          {import.meta.env.VITE_APPWRITE_PROJECT_ID || "Not set"}
        </p>
        <p>
          <strong>VITE_APPWRITE_DATABASE_ID:</strong>{" "}
          {import.meta.env.VITE_APPWRITE_DATABASE_ID || "Not set"}
        </p>
        <p>
          <strong>NODE_ENV:</strong> {import.meta.env.NODE_ENV || "Not set"}
        </p>
      </div>

      <h2>Status:</h2>
      <p>✅ React component rendered successfully</p>
      <p>✅ Environment variables are being read</p>

      <h2>Next Steps:</h2>
      <ul>
        <li>
          If you see your Appwrite values above, the environment is working
          correctly
        </li>
        <li>If values show "Not set", check your .env file</li>
        <li>Once environment is confirmed, we can test Appwrite connection</li>
      </ul>

      <div style={{ marginTop: "20px" }}>
        <a href="/" style={{ marginRight: "10px" }}>
          ← Back to Home
        </a>
        <a href="/test">Basic Test</a>
      </div>
    </div>
  );
};

export default SimpleDebug;
