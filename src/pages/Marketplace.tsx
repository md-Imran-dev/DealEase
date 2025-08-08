import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Search, LocationOn, Business } from "@mui/icons-material";

const Marketplace: React.FC = () => {
  const mockListings = [
    {
      id: 1,
      title: "TechStart Solutions",
      industry: "Technology",
      location: "San Francisco, CA",
      revenue: "$2.5M",
      employees: "25-50",
      description:
        "Innovative SaaS platform for project management with growing user base.",
      price: "$3.2M",
      tags: ["SaaS", "Growing", "Profitable"],
    },
    {
      id: 2,
      title: "Green Energy Co.",
      industry: "Energy",
      location: "Austin, TX",
      revenue: "$5.1M",
      employees: "50-100",
      description:
        "Renewable energy solutions provider with established client base.",
      price: "$8.5M",
      tags: ["Renewable", "Established", "ESG"],
    },
    {
      id: 3,
      title: "Urban Retail Chain",
      industry: "Retail",
      location: "New York, NY",
      revenue: "$12M",
      employees: "100-250",
      description:
        "Fashion retail chain with 15 locations across the northeast.",
      price: "$18M",
      tags: ["Retail", "Multi-location", "Fashion"],
    },
    {
      id: 4,
      title: "HealthTech Innovations",
      industry: "Healthcare",
      location: "Boston, MA",
      revenue: "$3.8M",
      employees: "30-75",
      description:
        "Medical device manufacturer specializing in diagnostic equipment.",
      price: "$6.2M",
      tags: ["MedTech", "IP Portfolio", "FDA Approved"],
    },
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}
      >
        Business Marketplace
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Discover acquisition opportunities that match your investment criteria
      </Typography>

      {/* Search and Filters */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search businesses by name, industry, or location..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
      </Box>

      {/* Filter Chips */}
      <Box sx={{ mb: 4, display: "flex", gap: 1, flexWrap: "wrap" }}>
        {[
          "All Industries",
          "Technology",
          "Healthcare",
          "Retail",
          "Energy",
          "Manufacturing",
        ].map((filter) => (
          <Chip
            key={filter}
            label={filter}
            variant={filter === "All Industries" ? "filled" : "outlined"}
            color={filter === "All Industries" ? "primary" : "default"}
            sx={{ borderRadius: 2 }}
          />
        ))}
      </Box>

      {/* Business Listings */}
      <Grid container spacing={3}>
        {mockListings.map((listing) => (
          <Grid item xs={12} md={6} key={listing.id}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {listing.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <Business
                          sx={{ fontSize: 16, color: "text.secondary" }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {listing.industry}
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                      >
                        <LocationOn
                          sx={{ fontSize: 16, color: "text.secondary" }}
                        />
                        <Typography variant="caption" color="text.secondary">
                          {listing.location}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Chip
                    label={listing.price}
                    color="primary"
                    variant="filled"
                    sx={{ fontWeight: 600 }}
                  />
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {listing.description}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Annual Revenue
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {listing.revenue}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="caption" color="text.secondary">
                        Employees
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {listing.employees}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mb: 3 }}>
                  {listing.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 0.5, mb: 0.5 }}
                    />
                  ))}
                </Box>

                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ borderRadius: 2 }}
                  >
                    View Details
                  </Button>
                  <Button variant="outlined" fullWidth sx={{ borderRadius: 2 }}>
                    Save
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Load More */}
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button variant="outlined" size="large" sx={{ borderRadius: 2, px: 4 }}>
          Load More Listings
        </Button>
      </Box>
    </Box>
  );
};

export default Marketplace;
