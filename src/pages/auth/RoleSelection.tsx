import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  useTheme,
  Container,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import RoleSelector from "../../components/auth/RoleSelector";

const RoleSelection: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { updateUserRole, isLoading, error, user } = useUserStore();

  const [selectedRole, setSelectedRole] = useState<
    "buyer" | "seller" | undefined
  >(user?.role);

  const handleRoleSelect = (role: "buyer" | "seller") => {
    setSelectedRole(role);
  };

  const handleContinue = async () => {
    if (!selectedRole) return;

    try {
      await updateUserRole(selectedRole);
      navigate("/onboarding");
    } catch (error) {
      // Error is handled by context
    }
  };

  const handleSkip = () => {
    // Allow users to skip role selection and go to main app
    navigate("/");
  };

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 4,
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1,
            }}
          >
            DealEase
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
            Welcome, {user?.firstName}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Let's set up your profile to get the most out of DealEase
          </Typography>
        </Box>

        {/* Role Selection */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <RoleSelector
              selectedRole={selectedRole}
              onRoleSelect={handleRoleSelect}
            />

            {/* Action Buttons */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 4,
              }}
            >
              <Button
                variant="text"
                onClick={handleSkip}
                sx={{ color: "text.secondary" }}
              >
                Skip for now
              </Button>

              <Button
                variant="contained"
                onClick={handleContinue}
                disabled={!selectedRole || isLoading}
                sx={{ borderRadius: 2, px: 4 }}
              >
                {isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Continue"
                )}
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Footer */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="caption" color="text.secondary">
            You can change your role anytime in Settings
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default RoleSelection;
