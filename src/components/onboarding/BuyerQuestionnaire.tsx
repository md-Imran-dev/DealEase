import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  Grid,
  useTheme,
  Alert,
} from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  Business,
  TrendingUp,
} from "@mui/icons-material";
import ProgressBar from "./ProgressBar";
import type { BuyerOnboardingData } from "../../types/onboarding";

interface BuyerQuestionnaireProps {
  onComplete: (data: BuyerOnboardingData) => void;
  onBack?: () => void;
}

const industries = [
  "Technology",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Food & Beverage",
  "Professional Services",
  "Construction",
  "Real Estate",
  "Transportation",
  "Education",
  "Financial Services",
  "Energy",
  "Media & Entertainment",
];

const investmentGoals = [
  "Passive Income",
  "Business Growth",
  "Industry Expertise",
  "Portfolio Diversification",
  "Lifestyle Business",
  "Quick Flip",
  "Long-term Hold",
  "Strategic Acquisition",
];

const supportTypes = [
  "Legal Support",
  "Financial Analysis",
  "Due Diligence",
  "Valuation Services",
  "Transition Planning",
  "Financing Assistance",
  "Tax Planning",
  "Industry Connections",
];

const steps = [
  "Investment Profile",
  "Experience & Location",
  "Personal Background",
  "Preferences & Goals",
];

const BuyerQuestionnaire: React.FC<BuyerQuestionnaireProps> = ({
  onComplete,
  onBack,
}) => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<BuyerOnboardingData>({
    industries: [],
    investmentRangeMin: 50000,
    investmentRangeMax: 500000,
    acquisitionExperience: "first-time",
    preferredLocations: [],
    remoteBusinessInterest: false,
    bio: "",
    investmentGoals: [],
    dealStructurePreferences: [],
    timelineToClose: "",
    supportNeeded: [],
    communicationPreferences: [],
  });

  const handleIndustryToggle = (industry: string) => {
    setFormData((prev) => ({
      ...prev,
      industries: prev.industries.includes(industry)
        ? prev.industries.filter((i) => i !== industry)
        : [...prev.industries, industry],
    }));
  };

  const handleGoalToggle = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      investmentGoals: prev.investmentGoals.includes(goal)
        ? prev.investmentGoals.filter((g) => g !== goal)
        : [...prev.investmentGoals, goal],
    }));
  };

  const handleSupportToggle = (support: string) => {
    setFormData((prev) => ({
      ...prev,
      supportNeeded: prev.supportNeeded.includes(support)
        ? prev.supportNeeded.filter((s) => s !== support)
        : [...prev.supportNeeded, support],
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.industries.length > 0;
      case 1:
        return (
          formData.preferredLocations.length > 0 ||
          formData.remoteBusinessInterest
        );
      case 2:
        return formData.bio.trim().length > 0;
      case 3:
        return formData.investmentGoals.length > 0;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Stack spacing={4}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                🎯 What industries interest you?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Tell us which industries you'd like to explore for investment
                opportunities. Select all that apply!
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {industries.map((industry) => (
                  <Chip
                    key={industry}
                    label={industry}
                    onClick={() => handleIndustryToggle(industry)}
                    color={
                      formData.industries.includes(industry)
                        ? "primary"
                        : "default"
                    }
                    variant={
                      formData.industries.includes(industry)
                        ? "filled"
                        : "outlined"
                    }
                    sx={{
                      borderRadius: 3,
                      fontWeight: 500,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: 2,
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                💰 What's your investment range?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Current range: ${formData.investmentRangeMin.toLocaleString()} -
                ${formData.investmentRangeMax.toLocaleString()}
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Minimum Investment"
                    type="number"
                    value={formData.investmentRangeMin}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        investmentRangeMin: Number(e.target.value),
                      }))
                    }
                    fullWidth
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Maximum Investment"
                    type="number"
                    value={formData.investmentRangeMax}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        investmentRangeMax: Number(e.target.value),
                      }))
                    }
                    fullWidth
                    InputProps={{
                      startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>,
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Stack>
        );

      case 1:
        return (
          <Stack spacing={4}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                🎓 Tell us about your experience
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                This helps us match you with opportunities that fit your
                expertise level.
              </Typography>

              <FormControl fullWidth>
                <InputLabel>Acquisition Experience</InputLabel>
                <Select
                  value={formData.acquisitionExperience}
                  label="Acquisition Experience"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      acquisitionExperience: e.target.value as any,
                    }))
                  }
                >
                  <MenuItem value="first-time">🌱 First-time buyer</MenuItem>
                  <MenuItem value="some-experience">
                    📈 Some experience (1-2 deals)
                  </MenuItem>
                  <MenuItem value="experienced">
                    🏆 Experienced (3-5 deals)
                  </MenuItem>
                  <MenuItem value="serial-acquirer">
                    🚀 Serial acquirer (5+ deals)
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                📍 Where are you looking to invest?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Add cities, states, or regions you're interested in
              </Typography>

              <TextField
                label="Add Location"
                placeholder="e.g., New York, California, Southeast US"
                fullWidth
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    const value = (e.target as HTMLInputElement).value.trim();
                    if (value && !formData.preferredLocations.includes(value)) {
                      setFormData((prev) => ({
                        ...prev,
                        preferredLocations: [...prev.preferredLocations, value],
                      }));
                      (e.target as HTMLInputElement).value = "";
                    }
                  }
                }}
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {formData.preferredLocations.map((location, index) => (
                  <Chip
                    key={index}
                    label={location}
                    onDelete={() => {
                      setFormData((prev) => ({
                        ...prev,
                        preferredLocations: prev.preferredLocations.filter(
                          (_, i) => i !== index
                        ),
                      }));
                    }}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.remoteBusinessInterest}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        remoteBusinessInterest: e.target.checked,
                      }))
                    }
                  />
                }
                label="🌐 I'm also interested in remote/online businesses"
              />
            </Box>
          </Stack>
        );

      case 2:
        return (
          <Stack spacing={4}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                👋 Tell us about yourself
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Share a bit about your background, interests, and what drives
                your investment goals. This helps sellers understand who you
                are!
              </Typography>

              <TextField
                label="Your Background & Interests"
                multiline
                rows={4}
                value={formData.bio}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    bio: e.target.value,
                  }))
                }
                placeholder="Tell us about your professional background, interests, and what motivates you to invest in businesses..."
                fullWidth
                helperText={`${formData.bio.length}/500 characters`}
                inputProps={{ maxLength: 500 }}
              />
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                🎯 What are your investment goals?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Select all that apply to your investment strategy
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {investmentGoals.map((goal) => (
                  <Chip
                    key={goal}
                    label={goal}
                    onClick={() => handleGoalToggle(goal)}
                    color={
                      formData.investmentGoals.includes(goal)
                        ? "primary"
                        : "default"
                    }
                    variant={
                      formData.investmentGoals.includes(goal)
                        ? "filled"
                        : "outlined"
                    }
                    sx={{
                      borderRadius: 3,
                      fontWeight: 500,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: 2,
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Stack>
        );

      case 3:
        return (
          <Stack spacing={4}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                ⚡ Final preferences
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Let's wrap up with a few more details to help us serve you
                better.
              </Typography>

              <TextField
                label="How quickly do you want to close a deal?"
                value={formData.timelineToClose}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    timelineToClose: e.target.value,
                  }))
                }
                placeholder="e.g., Within 3 months, No rush, ASAP"
                fullWidth
                sx={{ mb: 3 }}
              />
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                🤝 What support do you need?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                We can connect you with professionals to help with your
                acquisition
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {supportTypes.map((support) => (
                  <Chip
                    key={support}
                    label={support}
                    onClick={() => handleSupportToggle(support)}
                    color={
                      formData.supportNeeded.includes(support)
                        ? "secondary"
                        : "default"
                    }
                    variant={
                      formData.supportNeeded.includes(support)
                        ? "filled"
                        : "outlined"
                    }
                    sx={{
                      borderRadius: 3,
                      fontWeight: 500,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: 2,
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Alert severity="success" sx={{ borderRadius: 3 }}>
              <Typography variant="body2">
                🎉 <strong>Almost done!</strong> Click "Complete Profile" to
                finish your onboarding and start discovering amazing investment
                opportunities.
              </Typography>
            </Alert>
          </Stack>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${theme.palette.primary.main}05 0%, ${theme.palette.secondary.main}05 50%, ${theme.palette.accent?.main}05 100%)`,
        py: 4,
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 800, mx: "auto" }}>
        <ProgressBar
          currentStep={currentStep}
          totalSteps={steps.length}
          steps={steps}
        />

        <Card
          sx={{
            borderRadius: 4,
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.1)",
            mb: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>{renderStep()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handlePrevious}
            variant="outlined"
            sx={{
              borderRadius: 3,
              px: 3,
              py: 1.5,
              fontWeight: 600,
            }}
          >
            {currentStep === 0 ? "Back" : "Previous"}
          </Button>

          <Button
            endIcon={
              currentStep === steps.length - 1 ? <Business /> : <ArrowForward />
            }
            onClick={handleNext}
            variant="contained"
            disabled={!canProceed()}
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              "&:hover": {
                background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.secondary.dark})`,
                transform: "translateY(-2px)",
                boxShadow: 4,
              },
            }}
          >
            {currentStep === steps.length - 1 ? "Complete Profile" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BuyerQuestionnaire;
