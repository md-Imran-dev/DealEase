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
  LinearProgress,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import {
  Edit,
  Delete,
  Add,
  BusinessCenter,
  Schedule,
  AttachMoney,
} from "@mui/icons-material";

const AcquisitionTracker: React.FC = () => {
  const theme = useTheme();

  const deals = [
    {
      id: 1,
      company: "TechStart Solutions",
      value: "$3.2M",
      stage: "Due Diligence",
      progress: 60,
      startDate: "2024-01-15",
      expectedClose: "2024-03-30",
      status: "On Track",
      nextMilestone: "Financial audit completion",
    },
    {
      id: 2,
      company: "Green Energy Co.",
      value: "$8.5M",
      stage: "Negotiation",
      progress: 75,
      startDate: "2023-11-20",
      expectedClose: "2024-02-28",
      status: "Ahead",
      nextMilestone: "Final terms agreement",
    },
    {
      id: 3,
      company: "HealthTech Innovations",
      value: "$6.2M",
      stage: "Initial Contact",
      progress: 25,
      startDate: "2024-02-01",
      expectedClose: "2024-06-15",
      status: "On Track",
      nextMilestone: "Management presentation",
    },
  ];

  const acquisitionSteps = [
    "Initial Contact",
    "Preliminary Review",
    "Letter of Intent",
    "Due Diligence",
    "Negotiation",
    "Final Agreement",
    "Closing",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ahead":
        return "success";
      case "On Track":
        return "info";
      case "Behind":
        return "warning";
      case "At Risk":
        return "error";
      default:
        return "default";
    }
  };

  const getStageStep = (stage: string) => {
    return acquisitionSteps.indexOf(stage);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}
      >
        Acquisition Tracker
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Track the progress of your active acquisition deals
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <BusinessCenter
              sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: theme.palette.primary.main }}
            >
              {deals.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Active Deals
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ textAlign: "center", p: 2 }}>
            <AttachMoney
              sx={{ fontSize: 40, color: theme.palette.secondary.main, mb: 1 }}
            />
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: theme.palette.secondary.main }}
            >
              $18M
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Deal Value
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
              53%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Avg Progress
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Add New Deal Button */}
      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ borderRadius: 2 }}
        >
          Add New Deal
        </Button>
      </Box>

      {/* Active Deals */}
      <Grid container spacing={3}>
        {deals.map((deal) => (
          <Grid item xs={12} key={deal.id}>
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
                  {/* Deal Info */}
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Box>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, mb: 0.5 }}
                        >
                          {deal.company}
                        </Typography>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            color: theme.palette.primary.main,
                            mb: 1,
                          }}
                        >
                          {deal.value}
                        </Typography>
                        <Chip
                          label={deal.status}
                          color={getStatusColor(deal.status) as any}
                          size="small"
                        />
                      </Box>
                      <Box>
                        <IconButton size="small">
                          <Edit />
                        </IconButton>
                        <IconButton size="small">
                          <Delete />
                        </IconButton>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Started: {deal.startDate}
                      </Typography>
                      <br />
                      <Typography variant="caption" color="text.secondary">
                        Expected Close: {deal.expectedClose}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ mb: 1, fontWeight: 500 }}
                      >
                        Progress: {deal.progress}%
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={deal.progress}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          backgroundColor: theme.palette.grey[200],
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                  </Grid>

                  {/* Process Timeline */}
                  <Grid item xs={12} md={5}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 2, fontWeight: 600 }}
                    >
                      Acquisition Process
                    </Typography>
                    <Stepper
                      activeStep={getStageStep(deal.stage)}
                      orientation="vertical"
                      sx={{ ml: -1 }}
                    >
                      {acquisitionSteps.map((step, index) => (
                        <Step key={step}>
                          <StepLabel
                            sx={{
                              "& .MuiStepLabel-label": {
                                fontSize: "0.875rem",
                                fontWeight:
                                  index === getStageStep(deal.stage)
                                    ? 600
                                    : 400,
                              },
                            }}
                          >
                            {step}
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Grid>

                  {/* Next Steps */}
                  <Grid item xs={12} md={3}>
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 2, fontWeight: 600 }}
                    >
                      Next Milestone
                    </Typography>
                    <Paper
                      sx={{
                        p: 2,
                        backgroundColor: theme.palette.primary.main + "10",
                        borderLeft: `4px solid ${theme.palette.primary.main}`,
                        mb: 3,
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {deal.nextMilestone}
                      </Typography>
                    </Paper>

                    <Box
                      sx={{ display: "flex", gap: 1, flexDirection: "column" }}
                    >
                      <Button
                        variant="contained"
                        fullWidth
                        size="small"
                        sx={{ borderRadius: 2 }}
                      >
                        Update Progress
                      </Button>
                      <Button
                        variant="outlined"
                        fullWidth
                        size="small"
                        sx={{ borderRadius: 2 }}
                      >
                        View Details
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Recent Activity */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Recent Activity
        </Typography>
        <Paper sx={{ borderRadius: 2 }}>
          <List>
            {[
              {
                action: "Due diligence documents received",
                deal: "TechStart Solutions",
                time: "2 hours ago",
              },
              {
                action: "Meeting scheduled with management",
                deal: "Green Energy Co.",
                time: "1 day ago",
              },
              {
                action: "Initial offer submitted",
                deal: "HealthTech Innovations",
                time: "3 days ago",
              },
              {
                action: "Financial audit completed",
                deal: "TechStart Solutions",
                time: "1 week ago",
              },
            ].map((activity, index) => (
              <ListItem key={index} divider={index < 3}>
                <ListItemText
                  primary={activity.action}
                  secondary={`${activity.deal} • ${activity.time}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default AcquisitionTracker;
