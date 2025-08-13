import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useUserStore } from "../../store/userStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireOnboarding?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  requireOnboarding = true,
}) => {
  const { user, isAuthenticated, isLoading } = useUserStore();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: 2,
        }}
      >
        <CircularProgress size={40} />
        <Typography variant="body2" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  // Redirect to login if authentication is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Redirect to role selection if user doesn't have a role
  if (isAuthenticated && user && !user.role) {
    return <Navigate to="/auth/role-selection" replace />;
  }

  // Only redirect to onboarding if user explicitly needs questionnaire completion
  // Skip if user just signed up with a role (they can go straight to dashboard)
  if (
    requireOnboarding &&
    isAuthenticated &&
    user &&
    user.role &&
    !user.isOnboarded &&
    location.pathname !== "/onboarding" &&
    // Don't redirect if user just signed up with a role
    !sessionStorage.getItem("just_signed_up")
  ) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
