import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
  Paper,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Alert,
} from "@mui/material";

import {
  Search,
  TuneRounded,
  Business as BusinessIcon,
  Visibility as ViewIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  AttachMoney as MoneyIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  Close as CloseIcon,
  ContactMail as ContactIcon,
} from "@mui/icons-material";
import { useUserStore } from "../store/userStore";
import { useUIStore } from "../store/uiStore";
import { businessService, storageService } from "../lib/Appwrite";

import type { Business } from "../types/business";

const Marketplace: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { user } = useUserStore();
  const { showToast } = useUIStore();

  // State for business listings
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [industryFilter, setIndustryFilter] = useState<string[]>([]);
  const [stageFilter, setStageFilter] = useState<string[]>([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState<string>("");

  // Load all businesses on component mount
  useEffect(() => {
    loadAllBusinesses();
  }, []);

  const loadAllBusinesses = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("🔄 Loading all businesses for marketplace...");

      // Get all active business listings
      const allBusinesses = await businessService.getAllBusinesses();
      console.log("✅ Loaded businesses:", allBusinesses);
      console.log("📊 Total businesses found:", allBusinesses.length);

      setBusinesses(allBusinesses);
    } catch (err: any) {
      console.error("❌ Error loading businesses:", err);
      setError("Failed to load business listings");
    } finally {
      setLoading(false);
    }
  };

  const getBusinessImageUrl = (business: Business) => {
    if (business.images && business.images.length > 0) {
      try {
        const url = storageService.getBusinessImageUrl(
          business.images[0],
          300,
          200
        );
        return url.toString();
      } catch (error) {
        console.error("❌ Error getting image URL:", error);
        return null;
      }
    }
    return null;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleToggleFavorite = (businessId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(businessId)) {
        newFavorites.delete(businessId);
        showToast({
          type: "info",
          title: "Removed from Favorites",
          message: "Business removed from your favorites",
        });
      } else {
        newFavorites.add(businessId);
        showToast({
          type: "success",
          title: "Added to Favorites",
          message: "Business added to your favorites",
        });
      }
      return newFavorites;
    });
  };

  const handleContactSeller = (business: Business) => {
    showToast({
      type: "success",
      title: "Interest Sent!",
      message: `Your interest in "${business.title}" has been sent to the seller.`,
    });
  };

  const handleViewDetails = (business: Business) => {
    setSelectedBusiness(business);
    setModalOpen(true);
  };

  // Available filter options
  const availableIndustries = useMemo(() => {
    return Array.from(
      new Set(businesses.map((business) => business.industry).filter(Boolean))
    ).sort();
  }, [businesses]);

  const availableStages = useMemo(() => {
    return Array.from(
      new Set(businesses.map((business) => business.stage).filter(Boolean))
    ).sort();
  }, [businesses]);

  // Filter businesses based on search and filters
  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          business.title.toLowerCase().includes(searchLower) ||
          business.description.toLowerCase().includes(searchLower) ||
          business.industry.toLowerCase().includes(searchLower) ||
          (business.location &&
            business.location.toLowerCase().includes(searchLower));

        if (!matchesSearch) return false;
      }

      // Industry filter
      if (
        industryFilter.length > 0 &&
        !industryFilter.includes(business.industry)
      ) {
        return false;
      }

      // Stage filter
      if (
        stageFilter.length > 0 &&
        !stageFilter.includes(business.stage || "")
      ) {
        return false;
      }

      // Price range filter
      if (priceRangeFilter) {
        const price = business.askingPrice || 0;
        switch (priceRangeFilter) {
          case "under-100k":
            if (price >= 100000) return false;
            break;
          case "100k-500k":
            if (price < 100000 || price >= 500000) return false;
            break;
          case "500k-1m":
            if (price < 500000 || price >= 1000000) return false;
            break;
          case "over-1m":
            if (price < 1000000) return false;
            break;
        }
      }

      return true;
    });
  }, [businesses, searchTerm, industryFilter, stageFilter, priceRangeFilter]);

  const handleIndustryFilterToggle = (industry: string) => {
    setIndustryFilter((prev) =>
      prev.includes(industry)
        ? prev.filter((i) => i !== industry)
        : [...prev, industry]
    );
  };

  const handleStageFilterToggle = (stage: string) => {
    setStageFilter((prev) =>
      prev.includes(stage) ? prev.filter((s) => s !== stage) : [...prev, stage]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setIndustryFilter([]);
    setStageFilter([]);
    setPriceRangeFilter("");
  };

  const activeFiltersCount =
    industryFilter.length + stageFilter.length + (priceRangeFilter ? 1 : 0);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 400,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}
        >
          Business Marketplace
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover and explore business opportunities from verified sellers
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Stack spacing={3}>
          {/* Search Bar */}
          <TextField
            fullWidth
            placeholder="Search businesses by name, description, industry, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          {/* Filter Controls */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <TuneRounded color="action" />
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                Filters:
              </Typography>
            </Box>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Price Range</InputLabel>
              <Select
                value={priceRangeFilter}
                label="Price Range"
                onChange={(e) => setPriceRangeFilter(e.target.value)}
                sx={{ borderRadius: 2 }}
              >
                <MenuItem value="">All Prices</MenuItem>
                <MenuItem value="under-100k">Under $100K</MenuItem>
                <MenuItem value="100k-500k">$100K - $500K</MenuItem>
                <MenuItem value="500k-1m">$500K - $1M</MenuItem>
                <MenuItem value="over-1m">Over $1M</MenuItem>
              </Select>
            </FormControl>

            {activeFiltersCount > 0 && (
              <Button
                variant="text"
                size="small"
                onClick={clearFilters}
                sx={{ borderRadius: 2 }}
              >
                Clear All ({activeFiltersCount})
              </Button>
            )}
          </Box>

          {/* Industry Filter Chips */}
          {availableIndustries.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Industries:
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {availableIndustries.map((industry) => (
                  <Chip
                    key={industry}
                    label={industry}
                    variant={
                      industryFilter.includes(industry) ? "filled" : "outlined"
                    }
                    color={
                      industryFilter.includes(industry) ? "primary" : "default"
                    }
                    onClick={() => handleIndustryFilterToggle(industry)}
                    sx={{ borderRadius: 2 }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Stage Filter Chips */}
          {availableStages.length > 0 && (
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Business Stage:
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {availableStages.map((stage) => (
                  <Chip
                    key={stage}
                    label={stage}
                    variant={
                      stageFilter.includes(stage) ? "filled" : "outlined"
                    }
                    color={
                      stageFilter.includes(stage) ? "secondary" : "default"
                    }
                    onClick={() => handleStageFilterToggle(stage)}
                    sx={{ borderRadius: 2 }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Stack>
      </Paper>

      {/* Results Summary */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body1" color="text.secondary">
          {filteredBusinesses.length} business
          {filteredBusinesses.length !== 1 ? "es" : ""} found
          {searchTerm && ` for "${searchTerm}"`}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FavoriteIcon
              sx={{ color: theme.palette.error.main, fontSize: 20 }}
            />
            <Typography variant="body2" color="text.secondary">
              {favorites.size} favorites
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Business Cards Grid */}
      {filteredBusinesses.length > 0 ? (
        <Grid container spacing={3}>
          {filteredBusinesses.map((business) => (
            <Grid item xs={12} sm={6} lg={4} key={business.$id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: theme.shadows[8],
                  },
                }}
              >
                {getBusinessImageUrl(business) ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={getBusinessImageUrl(business)!}
                    alt={business.title}
                  />
                ) : (
                  <CardMedia
                    sx={{
                      height: 200,
                      bgcolor: "grey.200",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <BusinessIcon sx={{ fontSize: 48, color: "grey.400" }} />
                  </CardMedia>
                )}

                <CardContent sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" component="h2" sx={{ flex: 1 }}>
                      {business.title}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleToggleFavorite(business.$id)}
                      sx={{
                        color: favorites.has(business.$id)
                          ? "error.main"
                          : "grey.400",
                      }}
                    >
                      {favorites.has(business.$id) ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {business.description}
                  </Typography>

                  <Box
                    sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}
                  >
                    <Chip
                      size="small"
                      label={business.industry}
                      color="primary"
                      variant="outlined"
                    />
                    {business.stage && (
                      <Chip
                        size="small"
                        label={business.stage}
                        variant="outlined"
                      />
                    )}
                    <Chip
                      size="small"
                      label={business.isActive ? "Active" : "Inactive"}
                      color={business.isActive ? "success" : "default"}
                      variant="filled"
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 1,
                      flexWrap: "wrap",
                    }}
                  >
                    {business.askingPrice > 0 && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <MoneyIcon
                          sx={{ fontSize: 16, color: "text.secondary" }}
                        />
                        <Typography variant="body2" fontWeight="bold">
                          {formatCurrency(business.askingPrice)}
                        </Typography>
                      </Box>
                    )}

                    {business.employees && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <PeopleIcon
                          sx={{ fontSize: 16, color: "text.secondary" }}
                        />
                        <Typography variant="body2">
                          {business.employees} employees
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {business.location && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mb: 2,
                      }}
                    >
                      <LocationIcon
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {business.location}
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ display: "flex", gap: 1, mt: "auto" }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ViewIcon />}
                      onClick={() => handleViewDetails(business)}
                      sx={{ flex: 1 }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<ContactIcon />}
                      onClick={() => handleContactSeller(business)}
                      sx={{ flex: 1 }}
                    >
                      Contact Seller
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            background: theme.palette.grey[50],
          }}
        >
          <BusinessIcon
            sx={{ fontSize: 64, color: theme.palette.grey[400], mb: 2 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            No businesses found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Try adjusting your search terms or filters to find more businesses.
          </Typography>
          <Button
            variant="outlined"
            onClick={clearFilters}
            sx={{ borderRadius: 2 }}
          >
            Clear Filters
          </Button>
        </Paper>
      )}

      {/* Business Details Modal */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedBusiness && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {selectedBusiness.title}
              <IconButton onClick={() => setModalOpen(false)}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="body1" paragraph>
                    {selectedBusiness.description}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Industry
                  </Typography>
                  <Typography variant="body2">
                    {selectedBusiness.industry}
                  </Typography>
                </Grid>

                {selectedBusiness.businessModel && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Business Model
                    </Typography>
                    <Typography variant="body2">
                      {selectedBusiness.businessModel}
                    </Typography>
                  </Grid>
                )}

                {selectedBusiness.stage && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Stage
                    </Typography>
                    <Typography variant="body2">
                      {selectedBusiness.stage}
                    </Typography>
                  </Grid>
                )}

                {selectedBusiness.location && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Location
                    </Typography>
                    <Typography variant="body2">
                      {selectedBusiness.location}
                    </Typography>
                  </Grid>
                )}

                {selectedBusiness.askingPrice > 0 && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Asking Price
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {formatCurrency(selectedBusiness.askingPrice)}
                    </Typography>
                  </Grid>
                )}

                {selectedBusiness.revenue && selectedBusiness.revenue > 0 && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Annual Revenue
                    </Typography>
                    <Typography variant="body2">
                      {formatCurrency(selectedBusiness.revenue)}
                    </Typography>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<ContactIcon />}
                      onClick={() => handleContactSeller(selectedBusiness)}
                      sx={{ flex: 1 }}
                    >
                      Contact Seller
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={
                        favorites.has(selectedBusiness.$id) ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )
                      }
                      onClick={() => handleToggleFavorite(selectedBusiness.$id)}
                      sx={{
                        color: favorites.has(selectedBusiness.$id)
                          ? "error.main"
                          : "primary.main",
                        borderColor: favorites.has(selectedBusiness.$id)
                          ? "error.main"
                          : "primary.main",
                      }}
                    >
                      {favorites.has(selectedBusiness.$id)
                        ? "Remove from Favorites"
                        : "Add to Favorites"}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Marketplace;

