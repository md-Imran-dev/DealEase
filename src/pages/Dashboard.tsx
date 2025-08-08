import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  Paper,
  LinearProgress,
} from "@mui/material";
import {
  TrendingUp,
  Business,
  Handshake,
  AttachMoney,
} from "@mui/icons-material";

const Dashboard: React.FC = () => {
  const theme = useTheme();

  const statsCards = [
    {
      title: "Active Deals",
      value: "12",
      change: "+2 this month",
      icon: (
        <Handshake sx={{ fontSize: 40, color: theme.palette.primary.main }} />
      ),
      color: theme.palette.primary.main,
    },
    {
      title: "Portfolio Value",
      value: "$2.4M",
      change: "+15% this quarter",
      icon: (
        <AttachMoney
          sx={{ fontSize: 40, color: theme.palette.secondary.main }}
        />
      ),
      color: theme.palette.secondary.main,
    },
    {
      title: "New Opportunities",
      value: "8",
      change: "+3 this week",
      icon: (
        <Business sx={{ fontSize: 40, color: theme.palette.accent?.main }} />
      ),
      color: theme.palette.accent?.main,
    },
    {
      title: "Success Rate",
      value: "67%",
      change: "+5% improvement",
      icon: (
        <TrendingUp
          sx={{
            fontSize: 40,
            color: theme.palette.success?.main || theme.palette.primary.main,
          }}
        />
      ),
      color: theme.palette.success?.main || theme.palette.primary.main,
    },
  ];

  const recentActivity = [
    {
      action: "New match found",
      target: "TechStart Solutions",
      time: "2 hours ago",
    },
    {
      action: "Deal updated",
      target: "E-commerce Platform",
      time: "4 hours ago",
    },
    {
      action: "Message received",
      target: "John from RetailCorp",
      time: "1 day ago",
    },
    {
      action: "Profile viewed",
      target: "Manufacturing Inc.",
      time: "2 days ago",
    },
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ mb: 3, fontWeight: 600, color: "text.primary" }}
      >
        Dashboard Overview
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                height: "100%",
                background: `linear-gradient(135deg, ${stat.color}15 0%, ${stat.color}08 100%)`,
                border: `1px solid ${stat.color}20`,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 8px 32px ${stat.color}25`,
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  {stat.icon}
                  <Box sx={{ ml: 2 }}>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 700, color: "text.primary" }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.title}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="caption"
                  sx={{ color: stat.color, fontWeight: 500 }}
                >
                  {stat.change}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              height: "400px",
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Recent Activity
            </Typography>
            <Box sx={{ space: 2 }}>
              {recentActivity.map((activity, index) => (
                <Box
                  key={index}
                  sx={{
                    p: 2,
                    mb: 2,
                    borderRadius: 1,
                    backgroundColor: theme.palette.grey[50],
                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {activity.action}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {activity.target}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {activity.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Progress Overview */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 2,
              height: "400px",
            }}
          >
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
              Deal Pipeline Progress
            </Typography>
            <Box sx={{ space: 3 }}>
              {[
                { stage: "Initial Contact", progress: 85, deals: 5 },
                { stage: "Due Diligence", progress: 60, deals: 3 },
                { stage: "Negotiation", progress: 40, deals: 2 },
                { stage: "Final Review", progress: 75, deals: 2 },
              ].map((stage, index) => (
                <Box key={index} sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {stage.stage}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stage.deals} deals
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={stage.progress}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: theme.palette.grey[200],
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                        backgroundColor: theme.palette.primary.main,
                      },
                    }}
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {stage.progress}% complete
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
