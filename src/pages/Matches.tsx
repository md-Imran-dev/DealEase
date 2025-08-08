import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  useTheme,
  Avatar,
  LinearProgress,
} from "@mui/material";
import { FavoriteOutlined, TrendingUp, Schedule } from "@mui/icons-material";

const Matches: React.FC = () => {
  const theme = useTheme();

  const matchedBusinesses = [
    {
      id: 1,
      name: "TechStart Solutions",
      industry: "Technology",
      matchScore: 95,
      logo: "TS",
      criteria: ["Revenue Range", "Industry", "Location", "Growth Rate"],
      keyMetrics: {
        revenue: "$2.5M",
        growth: "+45%",
        employees: 42,
        profitability: "Profitable",
      },
      status: "New Match",
      lastUpdate: "2 hours ago",
    },
    {
      id: 2,
      name: "Green Energy Co.",
      industry: "Energy",
      matchScore: 88,
      logo: "GE",
      criteria: ["ESG Criteria", "Revenue Range", "Market Position"],
      keyMetrics: {
        revenue: "$5.1M",
        growth: "+32%",
        employees: 78,
        profitability: "Profitable",
      },
      status: "Under Review",
      lastUpdate: "1 day ago",
    },
    {
      id: 3,
      name: "HealthTech Innovations",
      industry: "Healthcare",
      matchScore: 82,
      logo: "HI",
      criteria: ["Innovation Score", "IP Portfolio", "Regulatory"],
      keyMetrics: {
        revenue: "$3.8M",
        growth: "+28%",
        employees: 55,
        profitability: "Break-even",
      },
      status: "Contacted",
      lastUpdate: "3 days ago",
    },
  ];

  const getMatchScoreColor = (score: number) => {
    if (score >= 90)
      return theme.palette.success?.main || theme.palette.primary.main;
    if (score >= 80)
      return theme.palette.warning?.main || theme.palette.secondary.main;
    return theme.palette.error?.main || theme.palette.accent?.main;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New Match":
        return "success";
      case "Under Review":
        return "warning";
      case "Contacted":
        return "info";
      default:
        return "default";
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}
      >
        Your Matches
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Businesses that align with your acquisition criteria
      </Typography>

      {/* Match Summary */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <FavoriteOutlined
              sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: theme.palette.primary.main }}
            >
              {matchedBusinesses.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Matches
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <TrendingUp
              sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 1 }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: theme.palette.secondary.main }}
            >
              88%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Avg Match Score
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <Schedule
              sx={{ fontSize: 40, color: theme.palette.accent?.main, mb: 1 }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: theme.palette.accent?.main }}
            >
              2
            </Typography>
            <Typography variant="body2" color="text.secondary">
              New This Week
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Matched Businesses */}
      <Grid container spacing={3}>
        {matchedBusinesses.map((business) => (
          <Grid item xs={12} key={business.id}>
            <Card
              sx={{
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  {/* Business Info */}
                  <Grid item xs={12} md={4}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Avatar
                        sx={{
                          width: 56,
                          height: 56,
                          mr: 2,
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          fontSize: "1.2rem",
                          fontWeight: 600,
                        }}
                      >
                        {business.logo}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {business.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {business.industry}
                        </Typography>
                        <Chip
                          label={business.status}
                          size="small"
                          color={getStatusColor(business.status) as any}
                          sx={{ mt: 0.5 }}
                        />
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 500 }}
                      >
                        Match Score: {business.matchScore}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={business.matchScore}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: theme.palette.grey[200],
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 4,
                            backgroundColor: getMatchScoreColor(
                              business.matchScore
                            ),
                          },
                        }}
                      />
                    </Box>

                    <Typography variant="caption" color="text.secondary">
                      Last updated: {business.lastUpdate}
                    </Typography>
                  </Grid>

                  {/* Key Metrics */}
                  <Grid item xs={12} md={4}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 2, fontWeight: 600 }}
                    >
                      Key Metrics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Revenue
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {business.keyMetrics.revenue}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Growth
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {business.keyMetrics.growth}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Employees
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {business.keyMetrics.employees}
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="caption" color="text.secondary">
                          Status
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {business.keyMetrics.profitability}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                  {/* Matching Criteria & Actions */}
                  <Grid item xs={12} md={4}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 2, fontWeight: 600 }}
                    >
                      Matching Criteria
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      {business.criteria.map((criterion) => (
                        <Chip
                          key={criterion}
                          label={criterion}
                          size="small"
                          variant="outlined"
                          sx={{ mr: 0.5, mb: 0.5 }}
                        />
                      ))}
                    </Box>

                    <Box
                      sx={{ display: "flex", gap: 1, flexDirection: "column" }}
                    >
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ borderRadius: 2 }}
                      >
                        View Full Profile
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{ borderRadius: 2 }}
                      >
                        Schedule Meeting
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* No More Matches */}
      <Box sx={{ textAlign: "center", mt: 4, p: 4 }}>
        <Typography variant="body1" color="text.secondary">
          No more matches available. Try adjusting your criteria to discover new
          opportunities.
        </Typography>
        <Button variant="outlined" sx={{ mt: 2, borderRadius: 2 }}>
          Update Criteria
        </Button>
      </Box>
    </Box>
  );
};

export default Matches;
