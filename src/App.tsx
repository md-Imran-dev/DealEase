import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import {
  useUserStore,
  useBuyerStore,
  useSellerStore,
  useMatchStore,
  useChatStore,
  useDealStore,
} from "./store";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import Matches from "./pages/Matches";
import Messages from "./pages/Messages";
import AcquisitionTracker from "./pages/AcquisitionTracker";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import SellerBusinesses from "./pages/SellerBusinesses";
import Deals from "./pages/Deals";
import ErrorBoundary from "./components/ErrorBoundary";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import RoleSelection from "./pages/auth/RoleSelection-Simple";
import Onboarding from "./pages/Onboarding";
import { DemoLanding } from "./components/demo/DemoLanding";
import { ResponsiveTestHelper } from "./components/common/ResponsiveTestHelper";
import AppwriteTest from "./components/AppwriteTest";
import SimpleTest from "./components/SimpleTest";
import DebugTest from "./components/DebugTest";

function App() {
  const { checkAuthStatus } = useUserStore();
  const { loadBuyers } = useBuyerStore();
  const { loadSellers } = useSellerStore();
  const { loadMatches } = useMatchStore();
  const { loadMessages, loadNotifications } = useChatStore();
  const { loadDeals } = useDealStore();

  // Initialize stores on app startup - Only check auth status for now
  React.useEffect(() => {
    const initializeStores = async () => {
      try {
        // Only initialize auth - skip other stores until they're updated for Appwrite
        await checkAuthStatus();
      } catch (error) {
        console.error("Failed to initialize auth:", error);
      }
    };

    initializeStores();
  }, [checkAuthStatus]);

  try {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/demo" element={<DemoLanding />} />
            <Route path="/simple-test" element={<SimpleTest />} />
            <Route path="/appwrite-test" element={<AppwriteTest />} />
            <Route path="/debug" element={<DebugTest />} />
            <Route
              path="/test"
              element={
                <div style={{ padding: "20px", fontSize: "24px" }}>
                  ✅ Basic React Routing Works!
                </div>
              }
            />

            {/* Authentication Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/auth/role-selection" element={<RoleSelection />} />

            {/* Onboarding Route */}
            <Route
              path="/onboarding"
              element={
                <div
                  style={{
                    padding: "20px",
                    fontSize: "24px",
                    textAlign: "center",
                  }}
                >
                  🎉 Onboarding Page Works!
                  <br />
                  <div style={{ marginTop: "20px", fontSize: "18px" }}>
                    Selected Role:{" "}
                    {localStorage.getItem("selectedRole") || "Not found"}
                  </div>
                  <button
                    onClick={() => (window.location.href = "/")}
                    style={{ marginTop: "20px", padding: "10px 20px" }}
                  >
                    Go to Dashboard
                  </button>
                </div>
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
              <Route path="deals" element={<Deals />} />
              <Route path="tracker" element={<AcquisitionTracker />} />
              <Route path="businesses" element={<SellerBusinesses />} />
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

        {/* Development Helper - Remove in production */}
        {import.meta.env.DEV && <ResponsiveTestHelper />}
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
