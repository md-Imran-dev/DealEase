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
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  Search,
  TuneRounded,
  PersonSearch,
  CheckCircle,
  Cancel,
} from "@mui/icons-material";
import { useUserStore } from "../store/userStore";
import { useMatchStore } from "../store/matchStore";
import { useBuyerStore } from "../store/buyerStore";
import { useUIStore } from "../store/uiStore";
import BuyerCard from "../components/marketplace/BuyerCard";
import BuyerProfileModal from "../components/marketplace/BuyerProfileModal";

import type { BuyerProfile } from "../types/buyer";

const Marketplace: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useUserStore();
  const { createMatch } = useMatchStore();
  const {
    buyers,
    setFilters: setBuyerFilters,
    setSearchTerm: setBuyerSearchTerm,
    getFilteredBuyers,
    searchTerm: buyerSearchTerm,
    filters: buyerFilters,
  } = useBuyerStore();
  const { showToast } = useUIStore();
  const [selectedBuyer, setSelectedBuyer] = useState<BuyerProfile | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [matchedBuyers, setMatchedBuyers] = useState<Set<string>>(new Set());
  const [rejectedBuyers, setRejectedBuyers] = useState<Set<string>>(new Set());

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
    new Set(buyers.flatMap((buyer) => buyer.industries))
  ).sort();

  const experienceLevels = [
    { value: "first-time", label: "First-time buyers" },
    { value: "some-experience", label: "Some experience" },
    { value: "experienced", label: "Experienced" },
    { value: "serial-acquirer", label: "Serial acquirers" },
  ];

  // Use filtered buyers from store
  const filteredBuyers = useMemo(() => {
    return getFilteredBuyers();
  }, [getFilteredBuyers]);

  const handleAcceptBuyer = async (buyerId: string) => {
    try {
      setMatchedBuyers((prev) => new Set([...prev, buyerId]));
      setRejectedBuyers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(buyerId);
        return newSet;
      });

      // Create a match between the seller and buyer
      if (user?.id) {
        await createMatch(buyerId, user.id);
      }

      showToast({
        type: "success",
        title: "Match Created!",
        message:
          "You can now message this buyer directly in your Matches section.",
      });
    } catch (error) {
      console.error("Error creating match:", error);
      showToast({
        type: "error",
        title: "Match Failed",
        message: "Failed to create match. Please try again.",
      });
    }
  };

  const handleRejectBuyer = (buyerId: string) => {
    setRejectedBuyers((prev) => new Set([...prev, buyerId]));
    setMatchedBuyers((prev) => {
      const newSet = new Set(prev);
      newSet.delete(buyerId);
      return newSet;
    });
    showToast({
      type: "info",
      title: "Buyer Rejected",
      message: "They won't see your business in their matches.",
    });
  };

  const handleViewDetails = (buyerId: string) => {
    const buyer = buyers.find((b) => b.id === buyerId);
    if (buyer) {
      setSelectedBuyer(buyer);
      setModalOpen(true);
    }
  };

  const handleIndustryFilterToggle = (industry: string) => {
    const currentIndustries = buyerFilters.industries || [];
    setBuyerFilters({
      industries: currentIndustries.includes(industry)
        ? currentIndustries.filter((i) => i !== industry)
        : [...currentIndustries, industry],
    });
  };

  const clearFilters = () => {
    setBuyerFilters({
      industries: [],
      experience: [],
      verifiedOnly: false,
      remoteOnly: false,
    });
    setBuyerSearchTerm("");
  };

  const activeFiltersCount =
    (buyerFilters.industries?.length || 0) +
    (buyerFilters.experience?.length || 0) +
    (buyerFilters.verifiedOnly ? 1 : 0) +
    (buyerFilters.remoteOnly ? 1 : 0);

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
            value={buyerSearchTerm}
            onChange={(e) => setBuyerSearchTerm(e.target.value)}
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
                value={buyerFilters.experience || []}
                label="Experience Level"
                onChange={(e) =>
                  setBuyerFilters({
                    experience: e.target.value as string[],
                  })
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
              variant={buyerFilters.verifiedOnly ? "contained" : "outlined"}
              size="small"
              onClick={() =>
                setBuyerFilters({
                  verifiedOnly: !buyerFilters.verifiedOnly,
                })
              }
              sx={{ borderRadius: 2 }}
            >
              Verified Only
            </Button>

            <Button
              variant={buyerFilters.remoteOnly ? "contained" : "outlined"}
              size="small"
              onClick={() =>
                setBuyerFilters({
                  remoteOnly: !buyerFilters.remoteOnly,
                })
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
                    buyerFilters.industries?.includes(industry)
                      ? "filled"
                      : "outlined"
                  }
                  color={
                    buyerFilters.industries?.includes(industry)
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
          {buyerSearchTerm && ` for "${buyerSearchTerm}"`}
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
    </Box>
  );
};

export default Marketplace;
