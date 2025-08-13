import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  useTheme,
  Container,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAppwrite";

const AppwriteLogin: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { login, signup, user, loading, error, isAuthenticated } = useAuth();

  const [isSignupMode, setIsSignupMode] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  const handleInputChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (isSignupMode) {
      const result = await signup(
        formData.email,
        formData.password,
        formData.name
      );
      if (result.success) {
        navigate("/onboarding");
      }
    } else {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate("/dashboard");
      }
    }
  };

  const toggleMode = () => {
    setIsSignupMode(!isSignupMode);
    setFormData({ email: "", password: "", name: "" });
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          minHeight: "100vh",
          pt: 8,
        }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 400,
            boxShadow: theme.shadows[8],
            borderRadius: 2,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Stack spacing={3}>
              <Box textAlign="center">
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {isSignupMode ? "Sign Up" : "Welcome Back"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {isSignupMode
                    ? "Create your DealEase account"
                    : "Sign in to your DealEase account"}
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ borderRadius: 1 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Stack spacing={3}>
                  {isSignupMode && (
                    <TextField
                      fullWidth
                      label="Full Name"
                      value={formData.name}
                      onChange={handleInputChange("name")}
                      required
                      disabled={loading}
                      variant="outlined"
                    />
                  )}

                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange("email")}
                    required
                    disabled={loading}
                    variant="outlined"
                    autoComplete="email"
                  />

                  <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange("password")}
                    required
                    disabled={loading}
                    variant="outlined"
                    autoComplete={
                      isSignupMode ? "new-password" : "current-password"
                    }
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={
                      loading ||
                      !formData.email ||
                      !formData.password ||
                      (isSignupMode && !formData.name)
                    }
                    sx={{
                      mt: 3,
                      py: 1.5,
                      borderRadius: 1.5,
                      textTransform: "none",
                      fontSize: "1rem",
                      fontWeight: 600,
                    }}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : isSignupMode ? (
                      "Create Account"
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </Stack>
              </Box>

              <Box textAlign="center">
                <Typography variant="body2" color="text.secondary">
                  {isSignupMode
                    ? "Already have an account?"
                    : "Don't have an account?"}{" "}
                  <Button
                    variant="text"
                    onClick={toggleMode}
                    disabled={loading}
                    sx={{
                      textTransform: "none",
                      fontWeight: 600,
                      p: 0,
                      minWidth: "auto",
                    }}
                  >
                    {isSignupMode ? "Sign In" : "Sign Up"}
                  </Button>
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default AppwriteLogin;
