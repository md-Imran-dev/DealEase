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
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import {
  Close,
  Person,
  Business,
  LocationOn,
  Description,
} from "@mui/icons-material";
import { useUserStore } from "../../store/userStore";
import type { User } from "../../types/auth";

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (userData: Partial<User>) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  bio: string;
  location: string;
  website: string;
  linkedin: string;
  twitter: string;
}

const EditProfileDialog: React.FC<EditProfileDialogProps> = ({
  open,
  onClose,
  onSave,
}) => {
  const theme = useTheme();
  const { user } = useUserStore();
  const [activeTab, setActiveTab] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    website: "",
    linkedin: "",
    twitter: "",
  });

  const [industries, setIndustries] = useState<string[]>([]);
  const [skills, setSkills] = useState<string[]>([]);

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

  const skillOptions = [
    "Due Diligence",
    "Financial Analysis",
    "Valuation",
    "Negotiation",
    "Deal Structuring",
    "Risk Assessment",
    "Market Research",
    "Strategic Planning",
    "Legal Review",
    "Integration Planning",
    "Financial Modeling",
    "Industry Expertise",
  ];

  useEffect(() => {
    if (user && open) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        title: user.title || "",
        company: user.company || "",
        email: user.email || "",
        phone: user.phone || "",
        bio: user.bio || "",
        location: user.location || "",
        website: user.website || "",
        linkedin: user.linkedin || "",
        twitter: user.twitter || "",
      });
      setIndustries(user.industries || []);
      setSkills(user.skills || []);
    }
  }, [user, open]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleIndustryChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setIndustries(typeof value === "string" ? value.split(",") : value);
  };

  const handleSkillChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSkills(typeof value === "string" ? value.split(",") : value);
  };

  const handleSave = () => {
    const updatedData = {
      ...formData,
      industries,
      skills,
    };
    onSave(updatedData);
    onClose();
  };

  const handleClose = () => {
    setActiveTab(0);
    onClose();
  };

  const tabContent = [
    // Personal Information
    <Box key="personal" sx={{ pt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Professional Title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="e.g., Senior Investment Manager, CEO, Business Broker"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Company"
            value={formData.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location"
            value={formData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            placeholder="City, State/Country"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Professional Bio"
            multiline
            rows={4}
            value={formData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            placeholder="Tell other professionals about your experience, expertise, and what you're looking for..."
            helperText={`${formData.bio.length}/500 characters`}
            inputProps={{ maxLength: 500 }}
          />
        </Grid>
      </Grid>
    </Box>,

    // Professional Details
    <Box key="professional" sx={{ pt: 2 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Industries of Interest</InputLabel>
            <Select
              multiple
              value={industries}
              onChange={handleIndustryChange}
              input={<OutlinedInput label="Industries of Interest" />}
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
          <FormControl fullWidth>
            <InputLabel>Skills & Expertise</InputLabel>
            <Select
              multiple
              value={skills}
              onChange={handleSkillChange}
              input={<OutlinedInput label="Skills & Expertise" />}
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
              {skillOptions.map((skill) => (
                <MenuItem key={skill} value={skill}>
                  {skill}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Website"
            value={formData.website}
            onChange={(e) => handleInputChange("website", e.target.value)}
            placeholder="https://yourcompany.com"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="LinkedIn Profile"
            value={formData.linkedin}
            onChange={(e) => handleInputChange("linkedin", e.target.value)}
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Twitter Handle"
            value={formData.twitter}
            onChange={(e) => handleInputChange("twitter", e.target.value)}
            placeholder="@yourusername"
          />
        </Grid>
      </Grid>
    </Box>,
  ];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Edit Profile
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ px: 0 }}>
        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            variant="fullWidth"
            sx={{
              "& .MuiTab-root": {
                textTransform: "none",
                fontWeight: 600,
                minHeight: 64,
              },
            }}
          >
            <Tab label="Personal Info" icon={<Person />} iconPosition="start" />
            <Tab
              label="Professional"
              icon={<Business />}
              iconPosition="start"
            />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <Box sx={{ px: 3 }}>{tabContent[activeTab]}</Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={handleClose} sx={{ borderRadius: 2 }}>
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

export default EditProfileDialog;
