import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import { AuthProvider } from "./contexts/AuthContext";
import { MatchProvider } from "./contexts/MatchContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import Matches from "./pages/Matches";
import Messages from "./pages/Messages";
import AcquisitionTracker from "./pages/AcquisitionTracker";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import RoleSelection from "./pages/auth/RoleSelection";
import Onboarding from "./pages/Onboarding";
import { DemoLanding } from "./components/demo/DemoLanding";

function App() {
  try {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <MatchProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route path="/demo" element={<DemoLanding />} />

                {/* Authentication Routes */}
                <Route path="/auth/login" element={<Login />} />
                <Route path="/auth/signup" element={<Signup />} />
                <Route
                  path="/auth/role-selection"
                  element={
                    <ProtectedRoute requireOnboarding={false}>
                      <RoleSelection />
                    </ProtectedRoute>
                  }
                />

                {/* Onboarding Route */}
                <Route
                  path="/onboarding"
                  element={
                    <ProtectedRoute requireOnboarding={false}>
                      <Onboarding />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Main Application Routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <MainLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="marketplace" element={<Marketplace />} />
                  <Route path="matches" element={<Matches />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="tracker" element={<AcquisitionTracker />} />
                  <Route
                    path="profile"
                    element={
                      <ErrorBoundary>
                        <Profile />
                      </ErrorBoundary>
                    }
                  />
                  <Route
                    path="settings"
                    element={
                      <ErrorBoundary>
                        <Settings />
                      </ErrorBoundary>
                    }
                  />
                </Route>

                {/* Catch all route - redirect to dashboard */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </MatchProvider>
        </AuthProvider>
      </ThemeProvider>
    );
  } catch (error) {
    console.error("App rendering error:", error);
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Something went wrong</h1>
        <p>Please check the console for errors.</p>
        <pre>{String(error)}</pre>
      </div>
    );
  }
}

export default App;
