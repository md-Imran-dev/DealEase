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
import { BusinessCenter, Storefront } from "@mui/icons-material";
import { useUserStore } from "../../store/userStore";

const RoleSelectionSimple: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { updateUserRole } = useUserStore();
  const [selectedRole, setSelectedRole] = useState<
    "buyer" | "seller" | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleSelect = (role: "buyer" | "seller") => {
    console.log("Role selected:", role);
    setSelectedRole(role);
  };

  const handleContinue = async () => {
    console.log("Continue clicked, selectedRole:", selectedRole);
    if (!selectedRole) {
      console.log("No role selected, returning");
      return;
    }

    setIsLoading(true);

    try {
      // Save role to Appwrite database
      console.log("Saving role to Appwrite database...");
      await updateUserRole(selectedRole);
      console.log("Role saved successfully to database");

      // Also save to localStorage as backup
      localStorage.setItem("selectedRole", selectedRole);

      // Redirect to dashboard (user is now fully onboarded)
      console.log("Navigating to dashboard...");
      navigate("/");
    } catch (error) {
      console.error("Error saving role:", error);
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: theme.shadows[8],
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
            >
              Choose Your Role
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              sx={{ mb: 4 }}
            >
              Select how you'll be using DealEase
            </Typography>

            <Box sx={{ display: "flex", gap: 3, mb: 4 }}>
              {/* Buyer Card */}
              <Card
                sx={{
                  flex: 1,
                  cursor: "pointer",
                  border:
                    selectedRole === "buyer"
                      ? `2px solid ${theme.palette.primary.main}`
                      : "2px solid transparent",
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: theme.shadows[4],
                  },
                }}
                onClick={() => handleRoleSelect("buyer")}
              >
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <BusinessCenter
                    sx={{
                      fontSize: 48,
                      color:
                        selectedRole === "buyer"
                          ? theme.palette.primary.main
                          : theme.palette.text.secondary,
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Buyer / Investor
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Looking to acquire businesses and investment opportunities
                  </Typography>
                </CardContent>
              </Card>

              {/* Seller Card */}
              <Card
                sx={{
                  flex: 1,
                  cursor: "pointer",
                  border:
                    selectedRole === "seller"
                      ? `2px solid ${theme.palette.primary.main}`
                      : "2px solid transparent",
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: theme.shadows[4],
                  },
                }}
                onClick={() => handleRoleSelect("seller")}
              >
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Storefront
                    sx={{
                      fontSize: 48,
                      color:
                        selectedRole === "seller"
                          ? theme.palette.primary.main
                          : theme.palette.text.secondary,
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Seller / Business Owner
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Looking to sell your business or raise capital
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleContinue}
              disabled={!selectedRole || isLoading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Continue"
              )}
            </Button>

            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="body2">
                Don't worry - you can change this later in your profile
                settings.
              </Typography>
            </Alert>

            {/* Debug info */}
            <Box sx={{ mt: 2, p: 2, bgcolor: "#f5f5f5", borderRadius: 1 }}>
              <Typography variant="caption">
                Debug: Selected Role = {selectedRole || "None"}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default RoleSelectionSimple;
