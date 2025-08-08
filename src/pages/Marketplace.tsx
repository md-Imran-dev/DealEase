import React, { useState, useMemo } from "react";
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
  Alert,
  Snackbar,
  Paper,
  useTheme,
} from "@mui/material";

import {
  Search,
  TuneRounded,
  PersonSearch,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import BuyerCard from "../components/marketplace/BuyerCard";
import BuyerProfileModal from "../components/marketplace/BuyerProfileModal";
import { mockBuyers } from "../data/mockBuyers";
import type { BuyerProfile, BuyerFilters } from "../types/buyer";

const Marketplace: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBuyer, setSelectedBuyer] = useState<BuyerProfile | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [matchedBuyers, setMatchedBuyers] = useState<Set<string>>(new Set());
  const [rejectedBuyers, setRejectedBuyers] = useState<Set<string>>(new Set());
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "info";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  // Filters
  const [filters, setFilters] = useState<BuyerFilters>({
    industries: [],
    experience: [],
    verifiedOnly: false,
    remoteOnly: false,
  });

  // For non-sellers, show a different view
  if (user?.role !== "seller") {
    return (
      <Box>
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 3,
            background: `linear-gradient(135deg, ${theme.palette.info.main}08 0%, ${theme.palette.primary.main}08 100%)`,
          }}
        >
          <PersonSearch
            sx={{ fontSize: 64, color: theme.palette.info.main, mb: 2 }}
          />
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
            Buyer Marketplace
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            This marketplace is designed for sellers to browse and connect with
            potential buyers. As a {user?.role}, you can view business listings
            in other sections of the platform.
          </Typography>
          <Button
            variant="contained"
            sx={{
              borderRadius: 3,
              px: 4,
              py: 1.5,
              fontWeight: 600,
            }}
          >
            Browse Business Listings
          </Button>
        </Paper>
      </Box>
    );
  }

  // Available filter options
  const availableIndustries = Array.from(
    new Set(mockBuyers.flatMap((buyer) => buyer.industries))
  ).sort();

  const experienceLevels = [
    { value: "first-time", label: "First-time buyers" },
    { value: "some-experience", label: "Some experience" },
    { value: "experienced", label: "Experienced" },
    { value: "serial-acquirer", label: "Serial acquirers" },
  ];

  // Filter and search buyers
  const filteredBuyers = useMemo(() => {
    return mockBuyers.filter((buyer) => {
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          buyer.firstName.toLowerCase().includes(searchLower) ||
          buyer.lastName.toLowerCase().includes(searchLower) ||
          buyer.company?.toLowerCase().includes(searchLower) ||
          buyer.bio.toLowerCase().includes(searchLower) ||
          buyer.industries.some((industry) =>
            industry.toLowerCase().includes(searchLower)
          ) ||
          buyer.preferredLocations.some((location) =>
            location.toLowerCase().includes(searchLower)
          );

        if (!matchesSearch) return false;
      }

      // Industry filter
      if (filters.industries && filters.industries.length > 0) {
        const hasMatchingIndustry = buyer.industries.some((industry) =>
          filters.industries!.includes(industry)
        );
        if (!hasMatchingIndustry) return false;
      }

      // Experience filter
      if (filters.experience && filters.experience.length > 0) {
        if (!filters.experience.includes(buyer.acquisitionExperience))
          return false;
      }

      // Verified filter
      if (filters.verifiedOnly && !buyer.verifiedStatus) return false;

      // Remote filter
      if (filters.remoteOnly && !buyer.remoteBusinessInterest) return false;

      return true;
    });
  }, [searchTerm, filters]);

  const handleAcceptBuyer = (buyerId: string) => {
    setMatchedBuyers((prev) => new Set([...prev, buyerId]));
    setRejectedBuyers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(buyerId);
      return newSet;
    });
    setSnackbar({
      open: true,
      message: "Buyer accepted! They will be notified of your interest.",
      severity: "success",
    });
  };

  const handleRejectBuyer = (buyerId: string) => {
    setRejectedBuyers((prev) => new Set([...prev, buyerId]));
    setMatchedBuyers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(buyerId);
      return newSet;
    });
    setSnackbar({
      open: true,
      message: "Buyer rejected. They won't see your business in their matches.",
      severity: "info",
    });
  };

  const handleViewDetails = (buyerId: string) => {
    const buyer = mockBuyers.find((b) => b.id === buyerId);
    if (buyer) {
      setSelectedBuyer(buyer);
      setModalOpen(true);
    }
  };

  const handleIndustryFilterToggle = (industry: string) => {
    setFilters((prev) => ({
      ...prev,
      industries: prev.industries?.includes(industry)
        ? prev.industries.filter((i) => i !== industry)
        : [...(prev.industries || []), industry],
    }));
  };

  const clearFilters = () => {
    setFilters({
      industries: [],
      experience: [],
      verifiedOnly: false,
      remoteOnly: false,
    });
    setSearchTerm("");
  };

  const activeFiltersCount =
    (filters.industries?.length || 0) +
    (filters.experience?.length || 0) +
    (filters.verifiedOnly ? 1 : 0) +
    (filters.remoteOnly ? 1 : 0);

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}
        >
          Buyer Marketplace
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Connect with qualified buyers who are interested in acquiring
          businesses like yours
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Stack spacing={3}>
          {/* Search Bar */}
          <TextField
            fullWidth
            placeholder="Search buyers by name, company, industry, or location..."
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
              <InputLabel>Experience Level</InputLabel>
              <Select
                multiple
                value={filters.experience || []}
                label="Experience Level"
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    experience: e.target.value as string[],
                  }))
                }
                sx={{ borderRadius: 2 }}
              >
                {experienceLevels.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant={filters.verifiedOnly ? "contained" : "outlined"}
              size="small"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  verifiedOnly: !prev.verifiedOnly,
                }))
              }
              sx={{ borderRadius: 2 }}
            >
              Verified Only
            </Button>

            <Button
              variant={filters.remoteOnly ? "contained" : "outlined"}
              size="small"
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  remoteOnly: !prev.remoteOnly,
                }))
              }
              sx={{ borderRadius: 2 }}
            >
              Remote Interested
            </Button>

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
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Target Industries:
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              {availableIndustries.map((industry) => (
                <Chip
                  key={industry}
                  label={industry}
                  variant={
                    filters.industries?.includes(industry)
                      ? "filled"
                      : "outlined"
                  }
                  color={
                    filters.industries?.includes(industry)
                      ? "primary"
                      : "default"
                  }
                  onClick={() => handleIndustryFilterToggle(industry)}
                  sx={{ borderRadius: 2 }}
                />
              ))}
            </Box>
          </Box>
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
          {filteredBuyers.length} buyer{filteredBuyers.length !== 1 ? "s" : ""}{" "}
          found
          {searchTerm && ` for "${searchTerm}"`}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CheckCircle
              sx={{ color: theme.palette.success.main, fontSize: 20 }}
            />
            <Typography variant="body2" color="text.secondary">
              {matchedBuyers.size} accepted
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Cancel sx={{ color: theme.palette.error.main, fontSize: 20 }} />
            <Typography variant="body2" color="text.secondary">
              {rejectedBuyers.size} rejected
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Buyer Cards Grid */}
      {filteredBuyers.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {filteredBuyers.map((buyer) => (
            <BuyerCard
              key={buyer.id}
              buyer={buyer}
              onAccept={handleAcceptBuyer}
              onReject={handleRejectBuyer}
              onViewDetails={handleViewDetails}
              disabled={
                matchedBuyers.has(buyer.id) || rejectedBuyers.has(buyer.id)
              }
            />
          ))}
        </Box>
      ) : (
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            background: theme.palette.grey[50],
          }}
        >
          <PersonSearch
            sx={{ fontSize: 64, color: theme.palette.grey[400], mb: 2 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            No buyers found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Try adjusting your search terms or filters to find more buyers.
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

      {/* Load More (placeholder for pagination) */}
      {filteredBuyers.length > 0 && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Button
            variant="outlined"
            size="large"
            sx={{ borderRadius: 3, px: 4 }}
          >
            Load More Buyers
          </Button>
        </Box>
      )}

      {/* Buyer Profile Modal */}
      <BuyerProfileModal
        buyer={selectedBuyer}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAccept={handleAcceptBuyer}
        onReject={handleRejectBuyer}
        disabled={
          selectedBuyer
            ? matchedBuyers.has(selectedBuyer.id) ||
              rejectedBuyers.has(selectedBuyer.id)
            : false
        }
        isMatched={selectedBuyer ? matchedBuyers.has(selectedBuyer.id) : false}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Marketplace;
