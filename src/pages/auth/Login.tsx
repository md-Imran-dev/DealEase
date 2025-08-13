import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
  Alert,
  CircularProgress,
  useTheme,
  Container,
  Stack,
  Divider,
} from "@mui/material";
import {
  Link as RouterLink,
  useNavigate,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import { useUserStore } from "../../store/userStore";
import type { LoginCredentials } from "../../types/auth";
import { authService } from "../../lib/Appwrite";

const Login: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { login, isLoading, error, clearError } = useUserStore();

  // Check if user came from demo landing
  const isFromDemo = searchParams.get("demo") === "true";

  // Clear active session function
  const clearSession = async () => {
    try {
      await authService.logout();
      clearError();
      console.log("Session cleared successfully");
    } catch (error) {
      console.log("Session cleared or no active session");
    }
  };

  const [formData, setFormData] = useState<LoginCredentials>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [fieldErrors, setFieldErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  // Get the intended destination after login
  const from = (location.state as any)?.from?.pathname || "/";

  const validateForm = (): boolean => {
    const errors: typeof fieldErrors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange =
    (field: keyof LoginCredentials) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear field error when user starts typing
      if (fieldErrors[field as keyof typeof fieldErrors]) {
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
      }

      // Clear global error
      if (error) {
        clearError();
      }
    };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await login(formData);
      navigate(from, { replace: true });
    } catch (error) {
      // Error is handled by context
    }
  };

  const handleDemoLogin = async (role: "buyer" | "seller") => {
    const demoCredentials: LoginCredentials = {
      email: role === "buyer" ? "buyer@demo.com" : "seller@demo.com",
      password: "demo123",
    };

    try {
      await login(demoCredentials);
      navigate(from, { replace: true });
    } catch (error) {
      // Error is handled by context
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 50%, ${theme.palette.accent?.main}08 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 4, width: "100%" }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1,
                fontSize: { xs: "2.5rem", sm: "3rem" },
              }}
            >
              DealEase
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 400, mx: "auto" }}
            >
              Sign in to your account to access the leading business marketplace
              platform
            </Typography>
          </Box>

          {/* Login Form */}
          <Card
            sx={{
              width: "100%",
              maxWidth: 480,
              borderRadius: 4,
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              background: "rgba(255, 255, 255, 0.95)",
            }}
          >
            <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                  {error.includes("session is active") && (
                    <Button
                      size="small"
                      onClick={clearSession}
                      sx={{ mt: 1, ml: 1 }}
                      variant="outlined"
                      color="error"
                    >
                      Clear Session
                    </Button>
                  )}
                </Alert>
              )}

              {isFromDemo && (
                <Alert severity="info" sx={{ mb: 3 }}>
                  <Typography variant="body2">
                    <strong>Demo Mode:</strong> Use the credentials below to
                    experience the platform:
                    <br />
                    <strong>Buyer:</strong> buyer@demo.com / password123
                    <br />
                    <strong>Seller:</strong> seller@demo.com / password123
                  </Typography>
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleChange("email")}
                    error={!!fieldErrors.email}
                    helperText={fieldErrors.email}
                    fullWidth
                    autoComplete="email"
                    autoFocus
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          boxShadow: `0 0 0 2px ${theme.palette.primary.main}25`,
                        },
                      },
                    }}
                  />

                  <TextField
                    label="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange("password")}
                    error={!!fieldErrors.password}
                    helperText={fieldErrors.password}
                    fullWidth
                    autoComplete="current-password"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 3,
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.9)",
                        },
                        "&.Mui-focused": {
                          backgroundColor: "rgba(255, 255, 255, 1)",
                          boxShadow: `0 0 0 2px ${theme.palette.primary.main}25`,
                        },
                      },
                    }}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.rememberMe}
                          onChange={handleChange("rememberMe")}
                          color="primary"
                        />
                      }
                      label="Remember me"
                    />
                    <Link
                      component={RouterLink}
                      to="/auth/forgot-password"
                      variant="body2"
                      color="primary"
                      sx={{ textDecoration: "none" }}
                    >
                      Forgot password?
                    </Link>
                  </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={isLoading}
                    fullWidth
                    sx={{
                      borderRadius: 3,
                      py: 2,
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
                      "&:disabled": {
                        background: theme.palette.grey[300],
                        transform: "none",
                        boxShadow: "none",
                      },
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </Stack>
              </form>

              <Divider sx={{ my: 4 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ fontWeight: 500, px: 2 }}
                >
                  OR TRY DEMO
                </Typography>
              </Divider>

              <Button
                variant="outlined"
                size="large"
                fullWidth
                onClick={() => navigate("/demo")}
                sx={{
                  borderRadius: 3,
                  py: 1.5,
                  mb: 2,
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: `${theme.palette.primary.main}10`,
                    borderColor: theme.palette.primary.dark,
                  },
                }}
              >
                Explore Full Demo Experience
              </Button>

              {/* Demo Login Buttons */}
              <Stack spacing={2}>
                <Button
                  variant="outlined"
                  onClick={() => handleDemoLogin("buyer")}
                  disabled={isLoading}
                  fullWidth
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    borderWidth: 2,
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderWidth: 2,
                      borderColor: theme.palette.primary.main,
                      backgroundColor: `${theme.palette.primary.main}08`,
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  🏢 Demo as Buyer/Investor
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleDemoLogin("seller")}
                  disabled={isLoading}
                  fullWidth
                  sx={{
                    borderRadius: 3,
                    py: 1.5,
                    borderWidth: 2,
                    borderColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.main,
                    fontWeight: 600,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderWidth: 2,
                      borderColor: theme.palette.secondary.main,
                      backgroundColor: `${theme.palette.secondary.main}08`,
                      transform: "translateY(-1px)",
                    },
                  }}
                >
                  🏪 Demo as Seller/Business Owner
                </Button>
              </Stack>

              <Box sx={{ textAlign: "center", mt: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  Don't have an account?{" "}
                  <Link
                    component={RouterLink}
                    to="/auth/signup"
                    color="primary"
                    sx={{
                      textDecoration: "none",
                      fontWeight: 600,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </CardContent>
          </Card>

          {/* Footer */}
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ opacity: 0.7 }}
            >
              © 2024 DealEase. All rights reserved.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
