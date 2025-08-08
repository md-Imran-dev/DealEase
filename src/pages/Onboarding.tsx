import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  useTheme,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import BuyerQuestionnaire from "../components/onboarding/BuyerQuestionnaire";
import SellerQuestionnaire from "../components/onboarding/SellerQuestionnaire";
import type {
  BuyerOnboardingData,
  SellerOnboardingData,
} from "../types/onboarding";

const Onboarding: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, completeOnboarding } = useAuth();
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [error, setError] = useState<string>("");

  const handleStartQuestionnaire = () => {
    setShowQuestionnaire(true);
  };

  const handleQuestionnaireComplete = async (
    data: BuyerOnboardingData | SellerOnboardingData
  ) => {
    try {
      // In a real app, you would save this data to your backend
      console.log("Onboarding data:", data);

      await completeOnboarding();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error completing onboarding:", error);
      setError("Failed to complete onboarding. Please try again.");
    }
  };

  const handleSkipQuestionnaire = async () => {
    try {
      await completeOnboarding();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error completing onboarding:", error);
      setError("Failed to complete onboarding. Please try again.");
    }
  };

  const handleBackToWelcome = () => {
    setShowQuestionnaire(false);
  };

  // Show the appropriate questionnaire if user has started it
  if (showQuestionnaire && user?.role === "buyer") {
    return (
      <BuyerQuestionnaire
        onComplete={handleQuestionnaireComplete}
        onBack={handleBackToWelcome}
      />
    );
  }

  if (showQuestionnaire && user?.role === "seller") {
    return (
      <SellerQuestionnaire
        onComplete={handleQuestionnaireComplete}
        onBack={handleBackToWelcome}
      />
    );
  }

  // Welcome screen
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 50%, ${theme.palette.accent?.main}08 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Container component="main" maxWidth="md">
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            background: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <CardContent sx={{ p: { xs: 4, sm: 6 }, textAlign: "center" }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                {error}
              </Alert>
            )}

            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 2,
                fontSize: { xs: "2.5rem", sm: "3.5rem" },
              }}
            >
              Welcome to DealEase! 🎉
            </Typography>

            <Typography
              variant="h4"
              sx={{ fontWeight: 600, mb: 2, color: "text.primary" }}
            >
              Hello {user?.firstName}! 👋
            </Typography>

            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ mb: 4, maxWidth: 600, mx: "auto" }}
            >
              You're all set up as a{" "}
              <Box
                component="span"
                sx={{
                  fontWeight: 700,
                  color:
                    user?.role === "buyer"
                      ? theme.palette.primary.main
                      : theme.palette.secondary.main,
                  textTransform: "capitalize",
                }}
              >
                {user?.role}
              </Box>
              . Let's personalize your experience to help you{" "}
              {user?.role === "buyer"
                ? "find amazing investment opportunities"
                : "connect with qualified buyers"}
              .
            </Typography>

            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                backgroundColor:
                  user?.role === "buyer"
                    ? `${theme.palette.primary.main}08`
                    : `${theme.palette.secondary.main}08`,
                border: `2px solid ${
                  user?.role === "buyer"
                    ? theme.palette.primary.main
                    : theme.palette.secondary.main
                }20`,
                mb: 4,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                🚀 Quick Setup (
                {user?.role === "buyer" ? "5 minutes" : "4 minutes"})
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Complete our quick questionnaire to get personalized matches and
                recommendations.
                {user?.role === "buyer"
                  ? " We'll ask about your investment preferences, experience, and goals."
                  : " We'll ask about your business, financials, and what makes it special."}
              </Typography>

              <Button
                variant="contained"
                size="large"
                onClick={handleStartQuestionnaire}
                sx={{
                  borderRadius: 3,
                  py: 2,
                  px: 4,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 12px 35px ${theme.palette.primary.main}50`,
                    background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                  },
                }}
              >
                {user?.role === "buyer"
                  ? "🏢 Set Up Investment Profile"
                  : "🏪 Set Up Business Profile"}
              </Button>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Want to explore first?
            </Typography>

            <Button
              variant="outlined"
              onClick={handleSkipQuestionnaire}
              sx={{
                borderRadius: 3,
                py: 1.5,
                px: 3,
                fontWeight: 600,
                borderWidth: 2,
                borderColor: theme.palette.grey[400],
                color: theme.palette.text.secondary,
                transition: "all 0.3s ease",
                "&:hover": {
                  borderWidth: 2,
                  borderColor: theme.palette.grey[600],
                  backgroundColor: `${theme.palette.grey[100]}`,
                  transform: "translateY(-1px)",
                },
              }}
            >
              Skip for now
            </Button>

            <Typography
              variant="caption"
              sx={{ display: "block", mt: 3, opacity: 0.7 }}
            >
              You can always complete this setup later from your profile
              settings
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Onboarding;
