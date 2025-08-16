import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Alert,
  InputAdornment,
  Switch,
  FormControlLabel,
  Divider,
  Paper,
  IconButton,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Business as BusinessIcon,
  AttachMoney as MoneyIcon,
  LocationOn as LocationIcon,
  Category as CategoryIcon,
} from "@mui/icons-material";
import {
  businessService,
  storageService,
  authService,
} from "../../lib/Appwrite";
import { useUserStore } from "../../store/userStore";
import type { CreateBusinessData } from "../../types/business";

interface CreateBusinessFormProps {
  onSuccess?: (businessId: string) => void;
  onCancel?: () => void;
}

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Retail",
  "Manufacturing",
  "Real Estate",
  "Food & Beverage",
  "Education",
  "Transportation",
  "Entertainment",
  "Consulting",
  "Other",
];

const BUSINESS_MODELS = [
  "B2B",
  "B2C",
  "B2B2C",
  "Marketplace",
  "SaaS",
  "E-commerce",
  "Subscription",
  "Franchise",
  "Other",
];

const BUSINESS_STAGES = [
  "Idea Stage",
  "Startup",
  "Growth",
  "Established",
  "Mature",
];

export default function CreateBusinessForm({
  onSuccess,
  onCancel,
}: CreateBusinessFormProps) {
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImages, setUploadingImages] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<CreateBusinessData>>({
    title: "",
    description: "",
    industry: "",
    businessModel: "",
    stage: "",
    location: "",
    employees: 1,
    revenue: 0,
    askingPrice: 0,
    assets: [],
    tags: [],
    images: [],
    documents: [],
    isActive: true,
  });

  const [newTag, setNewTag] = useState("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<File[]>([]);

  const handleInputChange =
    (field: keyof CreateBusinessData) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
    ) => {
      const value = event.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]:
          field === "employees" ||
          field === "revenue" ||
          field === "askingPrice"
            ? Number(value) || 0
            : value,
      }));
    };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
    }));
  };

  const handleImageSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length + selectedImages.length > 5) {
      setError("Maximum 5 images allowed");
      return;
    }

    setSelectedImages((prev) => [...prev, ...imageFiles]);
  };

  const handleDocumentSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    setSelectedDocuments((prev) => [...prev, ...files]);
  };

  const removeSelectedImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeSelectedDocument = (index: number) => {
    setSelectedDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (): Promise<{
    imageIds: string[];
    documentIds: string[];
  }> => {
    const imageIds: string[] = [];
    const documentIds: string[] = [];

    try {
      setUploadingImages(true);

      // Upload images
      for (const image of selectedImages) {
        const result = await storageService.uploadBusinessImage(image);
        imageIds.push(result.$id);
      }

      // Upload documents
      for (const document of selectedDocuments) {
        const result = await storageService.uploadBusinessDocument(document);
        documentIds.push(result.$id);
      }

      return { imageIds, documentIds };
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("🚀 Form submission started");

    // Get user from store directly or try to get current user
    const currentUser = user;
    if (!currentUser?.id) {
      console.log("❌ No user ID found, trying to get current user...");
      // Try to get user from auth service as backup
      try {
        const authUser = await authService.getCurrentUser();
        console.log("✅ Got user from auth service:", authUser);
        if (!authUser) {
          setError("You must be logged in to create a business listing");
          return;
        }
      } catch (err) {
        console.log("❌ Failed to get current user:", err);
        setError("Please refresh the page and try again");
        return;
      }
    }

    if (!formData.title || !formData.description || !formData.industry) {
      console.log("❌ Missing required fields");
      setError("Please fill in all required fields");
      return;
    }

    console.log("✅ Validation passed, starting submission...");
    setLoading(true);
    setError(null);

    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log("⏰ Submission timeout - forcing loading to false");
      setLoading(false);
      setError("Submission timed out. Please try again.");
    }, 30000); // 30 seconds

    try {
      console.log("📁 Uploading files...");
      // Upload files first
      const { imageIds, documentIds } = await uploadFiles();
      console.log("✅ Files uploaded:", { imageIds, documentIds });

      // Create business listing - only include fields that exist in Appwrite
      const businessData: CreateBusinessData = {
        title: formData.title || "",
        description: formData.description || "",
        industry: formData.industry || "",
        businessModel: formData.businessModel || "",
        stage: formData.stage || "",
        location: formData.location || "",
        employees: formData.employees || 1,
        revenue: formData.revenue || 0,
        askingPrice: formData.askingPrice || 0,
        assets: formData.assets || [],
        tags: formData.tags || [],
        images: imageIds,
        documents: documentIds,
        isActive: formData.isActive ?? true,
      };

      console.log("💼 Creating business with data:", businessData);

      // Use current user ID (either from store or auth service)
      const userId =
        currentUser?.id || (await authService.getCurrentUser()).$id;
      console.log("📝 Using user ID:", userId);

      const business = await businessService.createBusiness(
        userId,
        businessData
      );
      console.log("✅ Business created successfully:", business);

      if (onSuccess) {
        console.log("🎉 Calling onSuccess callback");
        onSuccess(business.$id);
      }
    } catch (err: any) {
      console.error("❌ Error creating business:", err);
      setError(err.message || "Failed to create business listing");
    } finally {
      clearTimeout(timeoutId);
      console.log("🏁 Setting loading to false");
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Card>
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <BusinessIcon color="primary" />
            Create Business Listing
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            List your business for sale and connect with qualified buyers
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Basic Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Business Title"
                  value={formData.title}
                  onChange={handleInputChange("title")}
                  required
                  placeholder="e.g., Profitable E-commerce Store"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={formData.description}
                  onChange={handleInputChange("description")}
                  required
                  placeholder="Describe your business, what it does, and why someone should buy it..."
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Industry</InputLabel>
                  <Select
                    value={formData.industry}
                    onChange={handleInputChange("industry")}
                    label="Industry"
                    startAdornment={
                      <CategoryIcon sx={{ mr: 1, color: "text.secondary" }} />
                    }
                  >
                    {INDUSTRIES.map((industry) => (
                      <MenuItem key={industry} value={industry}>
                        {industry}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Business Model</InputLabel>
                  <Select
                    value={formData.businessModel}
                    onChange={handleInputChange("businessModel")}
                    label="Business Model"
                  >
                    {BUSINESS_MODELS.map((model) => (
                      <MenuItem key={model} value={model}>
                        {model}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Business Stage</InputLabel>
                  <Select
                    value={formData.stage}
                    onChange={handleInputChange("stage")}
                    label="Business Stage"
                  >
                    {BUSINESS_STAGES.map((stage) => (
                      <MenuItem key={stage} value={stage}>
                        {stage}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Location"
                  value={formData.location}
                  onChange={handleInputChange("location")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationIcon />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="City, State/Country"
                />
              </Grid>

              {/* Financial Information */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Financial Information
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Employees"
                  value={formData.employees}
                  onChange={handleInputChange("employees")}
                  inputProps={{ min: 0 }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Annual Revenue"
                  value={formData.revenue}
                  onChange={handleInputChange("revenue")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MoneyIcon />$
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Asking Price"
                  value={formData.askingPrice}
                  onChange={handleInputChange("askingPrice")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MoneyIcon />$
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Additional Details */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Additional Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Key Assets"
                  value={
                    Array.isArray(formData.assets)
                      ? formData.assets.join(", ")
                      : ""
                  }
                  onChange={(e) => {
                    const assetsText = e.target.value;
                    const assetsArray = assetsText
                      .split(",")
                      .map((item) => item.trim())
                      .filter((item) => item.length > 0);
                    setFormData((prev) => ({ ...prev, assets: assetsArray }));
                  }}
                  placeholder="Enter assets separated by commas (e.g., Equipment, inventory, intellectual property)"
                  helperText="Separate multiple assets with commas"
                />
              </Grid>

              {/* Tags */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Tags
                </Typography>
                <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
                  {formData.tags?.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      onDelete={() => handleRemoveTag(tag)}
                      size="small"
                    />
                  ))}
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    size="small"
                    placeholder="Add a tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), handleAddTag())
                    }
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleAddTag}
                    startIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                </Box>
              </Grid>

              {/* Images */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Images (Optional, max 5)
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelection}
                    style={{ display: "none" }}
                    id="image-upload"
                  />
                  <label htmlFor="image-upload">
                    <Button
                      component="span"
                      variant="outlined"
                      startIcon={<UploadIcon />}
                      disabled={uploadingImages}
                    >
                      Upload Images
                    </Button>
                  </label>

                  {selectedImages.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      {selectedImages.map((file, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <Typography variant="body2" sx={{ flex: 1 }}>
                            {file.name}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => removeSelectedImage(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Paper>
              </Grid>

              {/* Documents */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Documents (Optional)
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx"
                    onChange={handleDocumentSelection}
                    style={{ display: "none" }}
                    id="document-upload"
                  />
                  <label htmlFor="document-upload">
                    <Button
                      component="span"
                      variant="outlined"
                      startIcon={<UploadIcon />}
                    >
                      Upload Documents
                    </Button>
                  </label>

                  {selectedDocuments.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      {selectedDocuments.map((file, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                          }}
                        >
                          <Typography variant="body2" sx={{ flex: 1 }}>
                            {file.name}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => removeSelectedDocument(index)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Paper>
              </Grid>

              {/* Active Toggle */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.isActive}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          isActive: e.target.checked,
                        }))
                      }
                    />
                  }
                  label="List as Active (visible to buyers)"
                />
              </Grid>

              {/* Actions */}
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    justifyContent: "flex-end",
                    mt: 3,
                  }}
                >
                  {onCancel && (
                    <Button
                      variant="outlined"
                      onClick={onCancel}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading || uploadingImages}
                    sx={{ minWidth: 120 }}
                  >
                    {loading || uploadingImages
                      ? "Creating..."
                      : "Create Listing"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
