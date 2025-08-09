import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  TextField,
  Grid,
  IconButton,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Chip,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Checkbox,
  FormGroup,
  OutlinedInput,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import {
  Close,
  Quiz,
  TrendingUp,
  Business,
  AttachMoney,
} from "@mui/icons-material";
import { useAuth } from "../../contexts/AuthContext";
import type {
  BuyerOnboardingData,
  SellerOnboardingData,
} from "../../types/onboarding";

interface EditQuestionnaireDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: BuyerOnboardingData | SellerOnboardingData) => void;
}

const EditQuestionnaireDialog: React.FC<EditQuestionnaireDialogProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const theme = useTheme();
  const { user } = useAuth();
  const [buyerData, setBuyerData] = useState<BuyerOnboardingData>({
    desiredIndustries: [],
    investmentRange: { min: 100000, max: 10000000 },
    acquisitionExperience: "first-time",
    desiredLocation: "",
    timeline: "6-months",
    dealSize: "small",
    fundingSource: [],
    bio: "",
  });

  const [sellerData, setSellerData] = useState<SellerOnboardingData>({
    businessType: "",
    industry: "",
    valuation: 1000000,
    reasonForSelling: [],
    timeline: "6-months",
    businessAge: 1,
    employees: 1,
    grossRevenue: 100000,
    netProfit: 50000,
    assetsIncluded: [],
    sellingPoints: "",
  });

  const industryOptions = [
    "Technology",
    "Healthcare",
    "Finance",
    "Real Estate",
    "Manufacturing",
    "Retail",
    "Energy",
    "Transportation",
    "Media",
    "Education",
    "Agriculture",
    "Hospitality",
  ];

  const fundingSourceOptions = [
    "Personal Savings",
    "Bank Loan",
    "SBA Loan",
    "Investor Funding",
    "Private Equity",
    "Venture Capital",
    "Family/Friends",
    "Seller Financing",
  ];

  const reasonsForSelling = [
    "Retirement",
    "New Opportunity",
    "Health Reasons",
    "Financial Needs",
    "Market Conditions",
    "Partnership Changes",
    "Focus on Other Ventures",
    "Other",
  ];

  const assetsOptions = [
    "Equipment",
    "Inventory",
    "Real Estate",
    "Intellectual Property",
    "Customer Database",
    "Supplier Relationships",
    "Brand/Trademarks",
    "Employees",
  ];

  useEffect(() => {
    if (user && open) {
      if (user.role === "buyer" && user.onboardingData) {
        setBuyerData(user.onboardingData as BuyerOnboardingData);
      } else if (user.role === "seller" && user.onboardingData) {
        setSellerData(user.onboardingData as SellerOnboardingData);
      }
    }
  }, [user, open]);

  const handleBuyerChange = (field: keyof BuyerOnboardingData, value: any) => {
    setBuyerData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSellerChange = (
    field: keyof SellerOnboardingData,
    value: any
  ) => {
    setSellerData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInvestmentRangeChange = (value: number | number[]) => {
    const [min, max] = value as number[];
    setBuyerData((prev) => ({
      ...prev,
      investmentRange: { min, max },
    }));
  };

  const handleMultiSelectChange = (
    field: keyof BuyerOnboardingData | keyof SellerOnboardingData,
    event: SelectChangeEvent<string[]>,
    isBuyer: boolean = true
  ) => {
    const value = event.target.value;
    const selectedValues = typeof value === "string" ? value.split(",") : value;

    if (isBuyer) {
      handleBuyerChange(field as keyof BuyerOnboardingData, selectedValues);
    } else {
      handleSellerChange(field as keyof SellerOnboardingData, selectedValues);
    }
  };

  const handleSave = () => {
    const data = user?.role === "buyer" ? buyerData : sellerData;
    onSave(data);
    onClose();
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const renderBuyerQuestionnaire = () => (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Desired Industries</InputLabel>
          <Select
            multiple
            value={buyerData.desiredIndustries}
            onChange={(e) => handleMultiSelectChange("desiredIndustries", e)}
            input={<OutlinedInput label="Desired Industries" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            )}
          >
            {industryOptions.map((industry) => (
              <MenuItem key={industry} value={industry}>
                {industry}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormLabel component="legend" sx={{ fontWeight: 600, mb: 2 }}>
          Investment Range: {formatCurrency(buyerData.investmentRange.min)} -{" "}
          {formatCurrency(buyerData.investmentRange.max)}
        </FormLabel>
        <Slider
          value={[buyerData.investmentRange.min, buyerData.investmentRange.max]}
          onChange={(_, value) => handleInvestmentRangeChange(value)}
          valueLabelDisplay="auto"
          valueLabelFormat={formatCurrency}
          min={50000}
          max={50000000}
          step={50000}
          marks={[
            { value: 50000, label: "$50K" },
            { value: 1000000, label: "$1M" },
            { value: 10000000, label: "$10M" },
            { value: 50000000, label: "$50M" },
          ]}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <FormLabel component="legend">Acquisition Experience</FormLabel>
          <RadioGroup
            value={buyerData.acquisitionExperience}
            onChange={(e) =>
              handleBuyerChange("acquisitionExperience", e.target.value)
            }
          >
            <FormControlLabel
              value="first-time"
              control={<Radio />}
              label="First-time buyer"
            />
            <FormControlLabel
              value="some"
              control={<Radio />}
              label="Some experience (1-3 deals)"
            />
            <FormControlLabel
              value="experienced"
              control={<Radio />}
              label="Experienced (4+ deals)"
            />
            <FormControlLabel
              value="professional"
              control={<Radio />}
              label="Professional investor"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <FormLabel component="legend">Timeline</FormLabel>
          <RadioGroup
            value={buyerData.timeline}
            onChange={(e) => handleBuyerChange("timeline", e.target.value)}
          >
            <FormControlLabel
              value="immediately"
              control={<Radio />}
              label="Immediately"
            />
            <FormControlLabel
              value="3-months"
              control={<Radio />}
              label="Within 3 months"
            />
            <FormControlLabel
              value="6-months"
              control={<Radio />}
              label="Within 6 months"
            />
            <FormControlLabel
              value="1-year"
              control={<Radio />}
              label="Within 1 year"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Desired Location"
          value={buyerData.desiredLocation}
          onChange={(e) => handleBuyerChange("desiredLocation", e.target.value)}
          placeholder="Specific cities, states, or regions"
          helperText="Leave blank if location is not important"
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Funding Sources</InputLabel>
          <Select
            multiple
            value={buyerData.fundingSource}
            onChange={(e) => handleMultiSelectChange("fundingSource", e)}
            input={<OutlinedInput label="Funding Sources" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            )}
          >
            {fundingSourceOptions.map((source) => (
              <MenuItem key={source} value={source}>
                {source}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Tell Us About Yourself"
          multiline
          rows={4}
          value={buyerData.bio}
          onChange={(e) => handleBuyerChange("bio", e.target.value)}
          placeholder="Share your background, what you're looking for in a business, and what makes you a great buyer..."
          helperText={`${buyerData.bio.length}/500 characters`}
          inputProps={{ maxLength: 500 }}
        />
      </Grid>
    </Grid>
  );

  const renderSellerQuestionnaire = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Business Type"
          value={sellerData.businessType}
          onChange={(e) => handleSellerChange("businessType", e.target.value)}
          placeholder="e.g., Restaurant, E-commerce, Manufacturing"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel>Industry</InputLabel>
          <Select
            value={sellerData.industry}
            onChange={(e) => handleSellerChange("industry", e.target.value)}
            label="Industry"
          >
            {industryOptions.map((industry) => (
              <MenuItem key={industry} value={industry}>
                {industry}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Expected Valuation"
          type="number"
          value={sellerData.valuation}
          onChange={(e) =>
            handleSellerChange("valuation", parseFloat(e.target.value) || 0)
          }
          InputProps={{
            startAdornment: "$",
          }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Business Age (years)"
          type="number"
          value={sellerData.businessAge}
          onChange={(e) =>
            handleSellerChange("businessAge", parseInt(e.target.value) || 0)
          }
          inputProps={{ min: 0 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Number of Employees"
          type="number"
          value={sellerData.employees}
          onChange={(e) =>
            handleSellerChange("employees", parseInt(e.target.value) || 0)
          }
          inputProps={{ min: 0 }}
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          fullWidth
          label="Annual Gross Revenue"
          type="number"
          value={sellerData.grossRevenue}
          onChange={(e) =>
            handleSellerChange("grossRevenue", parseFloat(e.target.value) || 0)
          }
          InputProps={{
            startAdornment: "$",
          }}
        />
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Reasons for Selling</InputLabel>
          <Select
            multiple
            value={sellerData.reasonForSelling}
            onChange={(e) =>
              handleMultiSelectChange("reasonForSelling", e, false)
            }
            input={<OutlinedInput label="Reasons for Selling" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} size="small" />
                ))}
              </Box>
            )}
          >
            {reasonsForSelling.map((reason) => (
              <MenuItem key={reason} value={reason}>
                {reason}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <FormLabel component="legend">Timeline to Sell</FormLabel>
          <RadioGroup
            value={sellerData.timeline}
            onChange={(e) => handleSellerChange("timeline", e.target.value)}
            row
          >
            <FormControlLabel
              value="immediately"
              control={<Radio />}
              label="Immediately"
            />
            <FormControlLabel
              value="3-months"
              control={<Radio />}
              label="3 months"
            />
            <FormControlLabel
              value="6-months"
              control={<Radio />}
              label="6 months"
            />
            <FormControlLabel
              value="1-year"
              control={<Radio />}
              label="1+ years"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Assets Included in Sale</InputLabel>
          <Select
            multiple
            value={sellerData.assetsIncluded}
            onChange={(e) =>
              handleMultiSelectChange("assetsIncluded", e, false)
            }
            input={<OutlinedInput label="Assets Included in Sale" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                ))}
              </Box>
            )}
          >
            {assetsOptions.map((asset) => (
              <MenuItem key={asset} value={asset}>
                {asset}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <TextField
          fullWidth
          label="What Makes Your Business Attractive?"
          multiline
          rows={4}
          value={sellerData.sellingPoints}
          onChange={(e) => handleSellerChange("sellingPoints", e.target.value)}
          placeholder="Highlight your business's strengths, unique advantages, growth potential, and what makes it a great opportunity..."
          helperText={`${sellerData.sellingPoints.length}/500 characters`}
          inputProps={{ maxLength: 500 }}
        />
      </Grid>
    </Grid>
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Quiz sx={{ color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Edit {user?.role === "buyer" ? "Investment" : "Business"} Profile
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Update your{" "}
          {user?.role === "buyer"
            ? "investment criteria and preferences"
            : "business information and selling details"}{" "}
          to improve matching with potential{" "}
          {user?.role === "buyer" ? "sellers" : "buyers"}.
        </Typography>

        {user?.role === "buyer"
          ? renderBuyerQuestionnaire()
          : renderSellerQuestionnaire()}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={onClose} sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          sx={{ borderRadius: 2, fontWeight: 600 }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditQuestionnaireDialog;
