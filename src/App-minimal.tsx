import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import SimpleDebug from "./components/SimpleDebug";
import AppwriteTest from "./components/AppwriteTest";
import AppwriteLogin from "./components/auth/AppwriteLogin";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Test Routes */}
          <Route
            path="/test"
            element={
              <div style={{ padding: "20px", fontSize: "24px" }}>
                ✅ Minimal React App Works!
              </div>
            }
          />
          <Route path="/debug" element={<SimpleDebug />} />
          <Route path="/appwrite-test" element={<AppwriteTest />} />
          <Route path="/login" element={<AppwriteLogin />} />

          {/* Default Route */}
          <Route
            path="/"
            element={
              <div style={{ padding: "20px", fontSize: "24px" }}>
                🎉 Welcome to DealEase (Minimal Mode)
                <br />
                <a href="/test">Test Basic Routing</a> |{" "}
                <a href="/debug">Debug Info</a> |{" "}
                <a href="/appwrite-test">Appwrite Test</a> |{" "}
                <a href="/login">Login Test</a>
              </div>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
