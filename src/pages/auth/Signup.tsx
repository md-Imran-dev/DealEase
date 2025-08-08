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
  Step,
  Stepper,
  StepLabel,
  Divider,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import type { SignupData } from "../../types/auth";
import RoleSelector from "../../components/auth/RoleSelector";

const Signup: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { signup, isLoading, error, clearError } = useAuth();

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<SignupData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: undefined,
    company: "",
    agreeToTerms: false,
  });

  const [fieldErrors, setFieldErrors] = useState<{
    [key in keyof SignupData]?: string;
  }>({});

  const steps = ["Account Details", "Choose Your Role", "Company Info"];

  const validateStep = (step: number): boolean => {
    const errors: typeof fieldErrors = {};

    if (step === 0) {
      if (!formData.firstName.trim()) {
        errors.firstName = "First name is required";
      }
      if (!formData.lastName.trim()) {
        errors.lastName = "Last name is required";
      }
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
      if (!formData.confirmPassword) {
        errors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }

    if (step === 1) {
      if (!formData.role) {
        errors.role = "Please select your role";
      }
    }

    if (step === 2) {
      if (!formData.agreeToTerms) {
        errors.agreeToTerms = "You must agree to the Terms of Service";
      }
      // Company is optional but recommended for sellers
      if (formData.role === "seller" && !formData.company?.trim()) {
        // This is just a warning, not an error
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange =
    (field: keyof SignupData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // Clear field error when user starts typing
      if (fieldErrors[field]) {
        setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
      }

      // Clear global error
      if (error) {
        clearError();
      }
    };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleRoleSelect = (role: "buyer" | "seller") => {
    setFormData((prev) => ({ ...prev, role }));
    setFieldErrors((prev) => ({ ...prev, role: undefined }));
    if (error) clearError();
  };

  const handleSubmit = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();

    if (!validateStep(2)) {
      return;
    }

    try {
      await signup(formData);
      // After successful signup, redirect to role selection or onboarding
      if (!formData.role) {
        navigate("/auth/role-selection");
      } else {
        navigate("/onboarding");
      }
    } catch (error) {
      // Error is handled by context
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Stack spacing={3}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="First Name"
                value={formData.firstName}
                onChange={handleChange("firstName")}
                error={!!fieldErrors.firstName}
                helperText={fieldErrors.firstName}
                fullWidth
                autoFocus
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
              <TextField
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange("lastName")}
                error={!!fieldErrors.lastName}
                helperText={fieldErrors.lastName}
                fullWidth
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              />
            </Box>

            <TextField
              label="Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange("email")}
              error={!!fieldErrors.email}
              helperText={fieldErrors.email}
              fullWidth
              autoComplete="email"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            <TextField
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange("password")}
              error={!!fieldErrors.password}
              helperText={fieldErrors.password}
              fullWidth
              autoComplete="new-password"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />

            <TextField
              label="Confirm Password"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange("confirmPassword")}
              error={!!fieldErrors.confirmPassword}
              helperText={fieldErrors.confirmPassword}
              fullWidth
              autoComplete="new-password"
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
            />
          </Stack>
        );

      case 1:
        return (
          <Box>
            <RoleSelector
              selectedRole={formData.role}
              onRoleSelect={handleRoleSelect}
            />
            {fieldErrors.role && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {fieldErrors.role}
              </Alert>
            )}
          </Box>
        );

      case 2:
        return (
          <Stack spacing={3}>
            <TextField
              label="Company Name (Optional)"
              value={formData.company}
              onChange={handleChange("company")}
              fullWidth
              placeholder={
                formData.role === "seller"
                  ? "Enter your business name"
                  : "Enter your company or investment firm"
              }
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
              helperText={
                formData.role === "seller" && !formData.company
                  ? "Recommended: Adding your company name helps buyers find you"
                  : undefined
              }
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.agreeToTerms}
                  onChange={handleChange("agreeToTerms")}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2" color="text.secondary">
                  I agree to the{" "}
                  <Link
                    href="#"
                    color="primary"
                    sx={{ textDecoration: "none" }}
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    color="primary"
                    sx={{ textDecoration: "none" }}
                  >
                    Privacy Policy
                  </Link>
                </Typography>
              }
            />
            {fieldErrors.agreeToTerms && (
              <Alert severity="error">{fieldErrors.agreeToTerms}</Alert>
            )}
          </Stack>
        );

      default:
        return null;
    }
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
            Create Your Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join the leading business marketplace platform
          </Typography>
        </Box>

        {/* Stepper */}
        <Box sx={{ mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Form */}
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

            {renderStepContent(activeStep)}

            {/* Navigation Buttons */}
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}
            >
              <Button
                onClick={handleBack}
                disabled={activeStep === 0}
                sx={{ borderRadius: 2 }}
              >
                Back
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  sx={{ borderRadius: 2, px: 4 }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Create Account"
                  )}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ borderRadius: 2, px: 4 }}
                >
                  Next
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Login Link */}
        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{" "}
            <Link
              component={RouterLink}
              to="/auth/login"
              color="primary"
              sx={{ textDecoration: "none", fontWeight: 500 }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>

        {/* Footer */}
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="caption" color="text.secondary">
            © 2024 DealEase. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;
