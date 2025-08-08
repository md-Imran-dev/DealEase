import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  Button,
  IconButton,
  Avatar,
  Chip,
  useTheme,
  Stack,
  Badge,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Divider,
  LinearProgress,
} from "@mui/material";
import {
  Search,
  Add,
  Business,
  TrendingUp,
  Schedule,
  Group,
  Assessment,
  Visibility,
  Edit,
  Archive,
  Warning,
  CheckCircle,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { useMatch } from "../contexts/MatchContext";
import DealWorkflow from "../components/acquisition/DealWorkflow";
import StageDetails from "../components/acquisition/StageDetails";
import { mockDeals } from "../data/mockDeals";
import type {
  AcquisitionDeal,
  DealStage,
  DealFilters,
} from "../types/acquisition";

const AcquisitionTracker: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { getMatchesByUser } = useMatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedDeal, setSelectedDeal] = useState<AcquisitionDeal | null>(
    null
  );
  const [selectedStage, setSelectedStage] = useState<DealStage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("active");
  const [stageFilter, setStageFilter] = useState<string>("all");

  // Get user's deals (mock data for now)
  const userDeals = useMemo(() => {
    if (!user?.id) return [];
    return mockDeals.filter(
      (deal) => deal.buyerId === user.id || deal.sellerId === user.id
    );
  }, [user?.id]);

  // Filter deals
  const filteredDeals = useMemo(() => {
    return userDeals.filter((deal) => {
      // Status filter
      if (statusFilter !== "all" && deal.status !== statusFilter) {
        return false;
      }

      // Stage filter
      if (stageFilter !== "all" && deal.currentStage !== stageFilter) {
        return false;
      }

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
          deal.business.name.toLowerCase().includes(searchLower) ||
          deal.business.industry.toLowerCase().includes(searchLower) ||
          deal.buyer.firstName.toLowerCase().includes(searchLower) ||
          deal.seller.firstName.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [userDeals, statusFilter, stageFilter, searchTerm]);

  const getUserRole = (deal: AcquisitionDeal) => {
    return user?.id === deal.buyerId ? "buyer" : "seller";
  };

  const getStageColor = (stage: DealStage) => {
    const colors: Record<DealStage, string> = {
      nda: theme.palette.info.main,
      "data-room": theme.palette.primary.main,
      offer: theme.palette.secondary.main,
      "due-diligence": theme.palette.warning.main,
      loi: theme.palette.orange?.[600] || theme.palette.warning.main,
      closing: theme.palette.success.main,
    };
    return colors[stage] || theme.palette.grey[500];
  };

  const getStageLabel = (stage: DealStage) => {
    const labels: Record<DealStage, string> = {
      nda: "NDA",
      "data-room": "Data Room",
      offer: "Offer",
      "due-diligence": "Due Diligence",
      loi: "LOI",
      closing: "Closing",
    };
    return labels[stage] || stage;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "success";
    if (progress >= 50) return "primary";
    if (progress >= 25) return "warning";
    return "error";
  };

  const handleStageClick = (dealId: string, stage: DealStage) => {
    const deal = userDeals.find((d) => d.id === dealId);
    if (deal) {
      setSelectedDeal(deal);
      setSelectedStage(stage);
      setSelectedTab(2); // Switch to stage details tab
    }
  };

  const handleChecklistUpdate = (itemId: string, completed: boolean) => {
    // In a real app, this would update the backend
    console.log("Update checklist item:", itemId, completed);
  };

  const handleDocumentUpload = (file: File, category: string) => {
    // In a real app, this would upload to backend
    console.log("Upload document:", file.name, category);
  };

  const handleCommentAdd = (content: string, isPrivate: boolean) => {
    // In a real app, this would add comment to backend
    console.log("Add comment:", content, isPrivate);
  };

  const handleApprovalAction = (
    approvalId: string,
    action: "approve" | "reject",
    reason?: string
  ) => {
    // In a real app, this would update approval status
    console.log("Approval action:", approvalId, action, reason);
  };

  const tabContent = [
    // Overview Tab
    <Box key="overview">
      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Business
                sx={{ fontSize: 40, color: theme.palette.primary.main, mb: 1 }}
              />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                {userDeals.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Deals
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <TrendingUp
                sx={{ fontSize: 40, color: theme.palette.success.main, mb: 1 }}
              />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                {Math.round(
                  userDeals.reduce(
                    (sum, deal) => sum + deal.overallProgress,
                    0
                  ) / userDeals.length
                ) || 0}
                %
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Avg. Progress
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Schedule
                sx={{ fontSize: 40, color: theme.palette.warning.main, mb: 1 }}
              />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                {
                  userDeals.filter(
                    (deal) =>
                      deal.targetClosingDate &&
                      deal.targetClosingDate < new Date()
                  ).length
                }
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Overdue
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ textAlign: "center" }}>
              <Assessment
                sx={{ fontSize: 40, color: theme.palette.info.main, mb: 1 }}
              />
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                $
                {userDeals
                  .reduce((sum, deal) => sum + (deal.dealValue || 0), 0)
                  .toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Value
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr auto" },
            gap: 3,
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            placeholder="Search deals, businesses, or people..."
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

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ borderRadius: 3 }}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="on-hold">On Hold</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Stage</InputLabel>
            <Select
              value={stageFilter}
              label="Stage"
              onChange={(e) => setStageFilter(e.target.value)}
              sx={{ borderRadius: 3 }}
            >
              <MenuItem value="all">All Stages</MenuItem>
              <MenuItem value="nda">NDA</MenuItem>
              <MenuItem value="data-room">Data Room</MenuItem>
              <MenuItem value="offer">Offer</MenuItem>
              <MenuItem value="due-diligence">Due Diligence</MenuItem>
              <MenuItem value="loi">LOI</MenuItem>
              <MenuItem value="closing">Closing</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{ borderRadius: 3, minWidth: 120 }}
          >
            New Deal
          </Button>
        </Box>
      </Paper>

      {/* Deals List */}
      {filteredDeals.length > 0 ? (
        <Grid container spacing={3}>
          {filteredDeals.map((deal) => {
            const userRole = getUserRole(deal);
            const otherParty = userRole === "buyer" ? deal.seller : deal.buyer;
            const currentStageData = deal.stages.find(
              (s) => s.stage === deal.currentStage
            );

            return (
              <Grid item xs={12} lg={6} key={deal.id}>
                <Card
                  sx={{
                    borderRadius: 3,
                    transition: "all 0.3s ease",
                    border: "1px solid",
                    borderColor: theme.palette.divider,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: 4,
                      borderColor: theme.palette.primary.main,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    {/* Header */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Avatar
                          src={otherParty.avatar}
                          sx={{
                            width: 40,
                            height: 40,
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          }}
                        >
                          {otherParty.avatar}
                        </Avatar>

                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            {deal.business.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            with {otherParty.firstName} {otherParty.lastName}
                          </Typography>
                        </Box>
                      </Box>

                      <IconButton size="small">
                        <Edit sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>

                    {/* Business Info */}
                    <Box
                      sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: theme.palette.grey[50],
                      }}
                    >
                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Typography variant="caption" color="text.secondary">
                          {deal.business.industry}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {deal.business.revenue} revenue
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ${deal.dealValue?.toLocaleString()} deal value
                        </Typography>
                      </Box>
                    </Box>

                    {/* Current Stage and Progress */}
                    <Box sx={{ mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 1,
                        }}
                      >
                        <Chip
                          label={getStageLabel(deal.currentStage)}
                          size="small"
                          sx={{
                            backgroundColor:
                              getStageColor(deal.currentStage) + "20",
                            color: getStageColor(deal.currentStage),
                            border: `1px solid ${getStageColor(
                              deal.currentStage
                            )}40`,
                          }}
                        />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {deal.overallProgress}%
                        </Typography>
                      </Box>

                      <LinearProgress
                        variant="determinate"
                        value={deal.overallProgress}
                        color={getProgressColor(deal.overallProgress)}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>

                    {/* Key Dates */}
                    {deal.targetClosingDate && (
                      <Box
                        sx={{
                          mb: 2,
                          p: 1,
                          borderRadius: 1,
                          backgroundColor: theme.palette.info.main + "08",
                        }}
                      >
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <Schedule sx={{ fontSize: 12 }} />
                          Target Closing:{" "}
                          {deal.targetClosingDate.toLocaleDateString()}
                          {deal.targetClosingDate < new Date() && (
                            <Chip label="Overdue" size="small" color="error" />
                          )}
                        </Typography>
                      </Box>
                    )}

                    {/* Deal Team */}
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          mb: 1,
                        }}
                      >
                        <Group sx={{ fontSize: 12 }} />
                        Deal Team ({deal.dealTeam?.length || 0} members)
                      </Typography>

                      <Stack direction="row" spacing={-0.5}>
                        {deal.dealTeam?.slice(0, 4).map((member) => (
                          <Avatar
                            key={member.id}
                            sx={{
                              width: 24,
                              height: 24,
                              fontSize: 10,
                              border: `2px solid ${theme.palette.background.paper}`,
                            }}
                            title={member.name}
                          >
                            {member.avatar}
                          </Avatar>
                        ))}
                        {(deal.dealTeam?.length || 0) > 4 && (
                          <Avatar
                            sx={{
                              width: 24,
                              height: 24,
                              fontSize: 10,
                              backgroundColor: theme.palette.grey[400],
                              border: `2px solid ${theme.palette.background.paper}`,
                            }}
                          >
                            +{(deal.dealTeam?.length || 0) - 4}
                          </Avatar>
                        )}
                      </Stack>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* Action Buttons */}
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        startIcon={<Visibility />}
                        size="small"
                        fullWidth
                        onClick={() => {
                          setSelectedDeal(deal);
                          setSelectedTab(1);
                        }}
                        sx={{
                          borderRadius: 2,
                          fontWeight: 600,
                        }}
                      >
                        View Workflow
                      </Button>

                      <Button
                        variant="outlined"
                        startIcon={<Assessment />}
                        size="small"
                        sx={{
                          borderRadius: 2,
                          minWidth: "auto",
                          px: 2,
                        }}
                      >
                        Reports
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
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
          <Business
            sx={{ fontSize: 64, color: theme.palette.grey[400], mb: 2 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            No deals found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {userDeals.length === 0
              ? "You don't have any active deals yet. Create matches in the marketplace to start tracking deals!"
              : "Try adjusting your filters or search terms to find more deals."}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => (window.location.href = "/marketplace")}
            sx={{ borderRadius: 2 }}
          >
            Browse Marketplace
          </Button>
        </Paper>
      )}
    </Box>,

    // Workflow Tab
    <Box key="workflow">
      {selectedDeal ? (
        <DealWorkflow
          deal={selectedDeal}
          currentUserId={user?.id || ""}
          onStageClick={(stage) => handleStageClick(selectedDeal.id, stage)}
        />
      ) : (
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            background: theme.palette.grey[50],
          }}
        >
          <Assessment
            sx={{ fontSize: 64, color: theme.palette.grey[400], mb: 2 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Select a Deal
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Choose a deal from the overview to view its workflow progress
          </Typography>
        </Paper>
      )}
    </Box>,

    // Stage Details Tab
    <Box key="stage-details">
      {selectedDeal && selectedStage ? (
        <StageDetails
          stage={selectedDeal.stages.find((s) => s.stage === selectedStage)!}
          currentUserId={user?.id || ""}
          userRole={getUserRole(selectedDeal)}
          onChecklistUpdate={handleChecklistUpdate}
          onDocumentUpload={handleDocumentUpload}
          onCommentAdd={handleCommentAdd}
          onApprovalAction={handleApprovalAction}
        />
      ) : (
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            background: theme.palette.grey[50],
          }}
        >
          <Assignment
            sx={{ fontSize: 64, color: theme.palette.grey[400], mb: 2 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Select a Stage
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Choose a deal and stage to view detailed tasks, documents, and
            collaboration tools
          </Typography>
        </Paper>
      )}
    </Box>,
  ];

  if (!user) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6">
          Please log in to view your acquisition tracker.
        </Typography>
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
          Acquisition Tracker
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track your deal progress from NDA to closing
        </Typography>
      </Box>

      {/* Selected Deal Breadcrumb */}
      {selectedDeal && (
        <Paper
          sx={{
            p: 2,
            mb: 3,
            borderRadius: 3,
            backgroundColor: theme.palette.primary.main + "08",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText,
              }}
            >
              <Business sx={{ fontSize: 16 }} />
            </Avatar>

            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {selectedDeal.business.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Current Stage: {getStageLabel(selectedDeal.currentStage)}
                {selectedStage && ` → ${getStageLabel(selectedStage)}`}
              </Typography>
            </Box>

            <Box sx={{ ml: "auto" }}>
              <Button
                size="small"
                onClick={() => {
                  setSelectedDeal(null);
                  setSelectedStage(null);
                  setSelectedTab(0);
                }}
                sx={{ borderRadius: 2 }}
              >
                Back to Overview
              </Button>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Tabs */}
      <Paper sx={{ borderRadius: 3, mb: 3 }}>
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontWeight: 600,
              minHeight: 64,
            },
          }}
        >
          <Tab label="Overview" icon={<Assessment />} iconPosition="start" />
          <Tab
            label="Workflow"
            icon={<Business />}
            iconPosition="start"
            disabled={!selectedDeal}
          />
          <Tab
            label="Stage Details"
            icon={<Assignment />}
            iconPosition="start"
            disabled={!selectedDeal || !selectedStage}
          />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      {tabContent[selectedTab]}
    </Box>
  );
};

export default AcquisitionTracker;
