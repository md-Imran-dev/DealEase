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
  Grid,
  useTheme,
  Alert,
  InputAdornment,
} from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  Store,
  AttachMoney,
} from "@mui/icons-material";
import ProgressBar from "./ProgressBar";
import type { SellerOnboardingData } from "../../types/onboarding";

interface SellerQuestionnaireProps {
  onComplete: (data: SellerOnboardingData) => void;
  onBack?: () => void;
}

const businessTypes = [
  "Sole Proprietorship",
  "Partnership",
  "LLC",
  "Corporation",
  "S-Corp",
  "Franchise",
  "Online Business",
  "Service Business",
  "Manufacturing",
];

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
  "E-commerce",
  "SaaS",
  "Consulting",
];

const sellingReasons = [
  "Retirement",
  "Career Change",
  "Relocation",
  "Health Reasons",
  "Partnership Dissolution",
  "Focus on Other Ventures",
  "Market Timing",
  "Financial Opportunity",
  "Burnout",
  "Family Reasons",
  "Strategic Opportunity",
];

const businessAttractions = [
  "Strong Brand Recognition",
  "Loyal Customer Base",
  "Recurring Revenue",
  "Growth Potential",
  "Proprietary Technology",
  "Prime Location",
  "Experienced Team",
  "Market Leadership",
  "Scalable Operations",
  "Multiple Revenue Streams",
  "Low Competition",
  "High Margins",
];

const includedAssets = [
  "Real Estate",
  "Equipment & Machinery",
  "Inventory",
  "Customer Database",
  "Intellectual Property",
  "Brand & Trademarks",
  "Software & Technology",
  "Employee Contracts",
  "Supplier Relationships",
  "Permits & Licenses",
];

const steps = [
  "Business Information",
  "Financial Details",
  "Sale Motivation",
  "Business Highlights",
];

const SellerQuestionnaire: React.FC<SellerQuestionnaireProps> = ({
  onComplete,
  onBack,
}) => {
  const theme = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SellerOnboardingData>({
    businessType: "",
    industry: "",
    yearsInBusiness: 0,
    numberOfEmployees: "",
    annualRevenue: "",
    expectedValuation: "",
    profitMargin: "",
    sellingReason: [],
    dealReadinessTimeline: "exploring",
    minimumPrice: 0,
    businessAttractions: [],
    uniqueSellingPoints: "",
    growthPotential: "",
    includedAssets: [],
  });

  const handleReasonToggle = (reason: string) => {
    setFormData((prev) => ({
      ...prev,
      sellingReason: prev.sellingReason.includes(reason)
        ? prev.sellingReason.filter((r) => r !== reason)
        : [...prev.sellingReason, reason],
    }));
  };

  const handleAttractionToggle = (attraction: string) => {
    setFormData((prev) => ({
      ...prev,
      businessAttractions: prev.businessAttractions.includes(attraction)
        ? prev.businessAttractions.filter((a) => a !== attraction)
        : [...prev.businessAttractions, attraction],
    }));
  };

  const handleAssetToggle = (asset: string) => {
    setFormData((prev) => ({
      ...prev,
      includedAssets: prev.includedAssets.includes(asset)
        ? prev.includedAssets.filter((a) => a !== asset)
        : [...prev.includedAssets, asset],
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
        return (
          formData.businessType &&
          formData.industry &&
          formData.yearsInBusiness > 0
        );
      case 1:
        return formData.annualRevenue && formData.expectedValuation;
      case 2:
        return formData.sellingReason.length > 0;
      case 3:
        return (
          formData.businessAttractions.length > 0 &&
          formData.uniqueSellingPoints.trim().length > 0
        );
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
                🏢 Tell us about your business
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Help potential buyers understand what type of business you're
                offering.
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Business Type</InputLabel>
                    <Select
                      value={formData.businessType}
                      label="Business Type"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          businessType: e.target.value,
                        }))
                      }
                    >
                      {businessTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Industry</InputLabel>
                    <Select
                      value={formData.industry}
                      label="Industry"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          industry: e.target.value,
                        }))
                      }
                    >
                      {industries.map((industry) => (
                        <MenuItem key={industry} value={industry}>
                          {industry}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Years in Business"
                    type="number"
                    value={formData.yearsInBusiness || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        yearsInBusiness: Number(e.target.value),
                      }))
                    }
                    fullWidth
                    inputProps={{ min: 0 }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Number of Employees</InputLabel>
                    <Select
                      value={formData.numberOfEmployees}
                      label="Number of Employees"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          numberOfEmployees: e.target.value,
                        }))
                      }
                    >
                      <MenuItem value="1">Just me</MenuItem>
                      <MenuItem value="2-5">2-5 employees</MenuItem>
                      <MenuItem value="6-10">6-10 employees</MenuItem>
                      <MenuItem value="11-25">11-25 employees</MenuItem>
                      <MenuItem value="26-50">26-50 employees</MenuItem>
                      <MenuItem value="51-100">51-100 employees</MenuItem>
                      <MenuItem value="100+">100+ employees</MenuItem>
                    </Select>
                  </FormControl>
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
                💰 Financial overview
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Share key financial metrics to help buyers evaluate your
                business opportunity.
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Annual Revenue</InputLabel>
                    <Select
                      value={formData.annualRevenue}
                      label="Annual Revenue"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          annualRevenue: e.target.value,
                        }))
                      }
                    >
                      <MenuItem value="<50k">Less than $50K</MenuItem>
                      <MenuItem value="50k-100k">$50K - $100K</MenuItem>
                      <MenuItem value="100k-250k">$100K - $250K</MenuItem>
                      <MenuItem value="250k-500k">$250K - $500K</MenuItem>
                      <MenuItem value="500k-1m">$500K - $1M</MenuItem>
                      <MenuItem value="1m-5m">$1M - $5M</MenuItem>
                      <MenuItem value="5m+">$5M+</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Expected Valuation</InputLabel>
                    <Select
                      value={formData.expectedValuation}
                      label="Expected Valuation"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          expectedValuation: e.target.value,
                        }))
                      }
                    >
                      <MenuItem value="<100k">Less than $100K</MenuItem>
                      <MenuItem value="100k-250k">$100K - $250K</MenuItem>
                      <MenuItem value="250k-500k">$250K - $500K</MenuItem>
                      <MenuItem value="500k-1m">$500K - $1M</MenuItem>
                      <MenuItem value="1m-2.5m">$1M - $2.5M</MenuItem>
                      <MenuItem value="2.5m-5m">$2.5M - $5M</MenuItem>
                      <MenuItem value="5m+">$5M+</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Profit Margin</InputLabel>
                    <Select
                      value={formData.profitMargin}
                      label="Profit Margin"
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          profitMargin: e.target.value,
                        }))
                      }
                    >
                      <MenuItem value="<10%">Less than 10%</MenuItem>
                      <MenuItem value="10-20%">10% - 20%</MenuItem>
                      <MenuItem value="20-30%">20% - 30%</MenuItem>
                      <MenuItem value="30-40%">30% - 40%</MenuItem>
                      <MenuItem value="40%+">40%+</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Minimum Acceptable Price"
                    type="number"
                    value={formData.minimumPrice || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        minimumPrice: Number(e.target.value),
                      }))
                    }
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Stack>
        );

      case 2:
        return (
          <Stack spacing={4}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                🤔 Why are you selling?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Help buyers understand your motivation and timeline. Be honest -
                it builds trust!
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Select your reason(s) for selling:
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
                {sellingReasons.map((reason) => (
                  <Chip
                    key={reason}
                    label={reason}
                    onClick={() => handleReasonToggle(reason)}
                    color={
                      formData.sellingReason.includes(reason)
                        ? "primary"
                        : "default"
                    }
                    variant={
                      formData.sellingReason.includes(reason)
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
                ⏰ When do you want to close?
              </Typography>

              <FormControl fullWidth>
                <InputLabel>Deal Readiness Timeline</InputLabel>
                <Select
                  value={formData.dealReadinessTimeline}
                  label="Deal Readiness Timeline"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dealReadinessTimeline: e.target.value as any,
                    }))
                  }
                >
                  <MenuItem value="immediate">
                    🚀 Ready to close immediately
                  </MenuItem>
                  <MenuItem value="3-months">📅 Within 3 months</MenuItem>
                  <MenuItem value="6-months">📆 Within 6 months</MenuItem>
                  <MenuItem value="12-months">🗓️ Within 12 months</MenuItem>
                  <MenuItem value="exploring">
                    🔍 Just exploring options
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Stack>
        );

      case 3:
        return (
          <Stack spacing={4}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                ✨ What makes your business special?
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Highlight your business's strengths and unique advantages to
                attract the right buyers.
              </Typography>

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Key business attractions:
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
                {businessAttractions.map((attraction) => (
                  <Chip
                    key={attraction}
                    label={attraction}
                    onClick={() => handleAttractionToggle(attraction)}
                    color={
                      formData.businessAttractions.includes(attraction)
                        ? "secondary"
                        : "default"
                    }
                    variant={
                      formData.businessAttractions.includes(attraction)
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
                🎯 Unique selling points
              </Typography>
              <TextField
                label="What makes your business unique?"
                multiline
                rows={3}
                value={formData.uniqueSellingPoints}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    uniqueSellingPoints: e.target.value,
                  }))
                }
                placeholder="Describe what sets your business apart from competitors..."
                fullWidth
                sx={{ mb: 3 }}
              />
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                📈 Growth potential
              </Typography>
              <TextField
                label="Growth opportunities for new owner"
                multiline
                rows={3}
                value={formData.growthPotential}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    growthPotential: e.target.value,
                  }))
                }
                placeholder="What opportunities exist for growth and expansion?"
                fullWidth
                sx={{ mb: 3 }}
              />
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                📦 What's included in the sale?
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
                {includedAssets.map((asset) => (
                  <Chip
                    key={asset}
                    label={asset}
                    onClick={() => handleAssetToggle(asset)}
                    color={
                      formData.includedAssets.includes(asset)
                        ? "primary"
                        : "default"
                    }
                    variant={
                      formData.includedAssets.includes(asset)
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
                🎉 <strong>Excellent!</strong> Your business profile looks
                compelling. Click "Complete Profile" to start connecting with
                qualified buyers.
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
        background: `linear-gradient(135deg, ${theme.palette.secondary.main}05 0%, ${theme.palette.primary.main}05 50%, ${theme.palette.accent?.main}05 100%)`,
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
              currentStep === steps.length - 1 ? <Store /> : <ArrowForward />
            }
            onClick={handleNext}
            variant="contained"
            disabled={!canProceed()}
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              background: `linear-gradient(45deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              "&:hover": {
                background: `linear-gradient(45deg, ${theme.palette.secondary.dark}, ${theme.palette.primary.dark})`,
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

export default SellerQuestionnaire;
