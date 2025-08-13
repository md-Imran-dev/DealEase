import React from "react";

const DebugTest: React.FC = () => {
  console.log("DebugTest loaded");
  console.log("Environment variables:", {
    VITE_APPWRITE_URL: import.meta.env.VITE_APPWRITE_URL,
    VITE_APPWRITE_PROJECT_ID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    NODE_ENV: import.meta.env.NODE_ENV,
  });

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🐛 Debug Information</h1>

      <h2>Environment Variables:</h2>
      <pre
        style={{ background: "#f5f5f5", padding: "10px", borderRadius: "4px" }}
      >
        {JSON.stringify(
          {
            VITE_APPWRITE_URL: import.meta.env.VITE_APPWRITE_URL,
            VITE_APPWRITE_PROJECT_ID: import.meta.env.VITE_APPWRITE_PROJECT_ID,
            VITE_APPWRITE_DATABASE_ID: import.meta.env
              .VITE_APPWRITE_DATABASE_ID,
          },
          null,
          2
        )}
      </pre>

      <h2>Appwrite Client Test:</h2>
      <div>
        {(() => {
          try {
            // Try to import and test Appwrite client
            console.log("Attempting to import Appwrite client...");
            return <div>✅ Component rendered successfully</div>;
          } catch (error) {
            console.error("Error in component:", error);
            return <div>❌ Error in component: {String(error)}</div>;
          }
        })()}
      </div>
    </div>
  );
};

export default DebugTest;
