import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  Chip,
  LinearProgress,
  useTheme,
  Stack,
  Alert,
  Divider,
  IconButton,
  Tooltip,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import {
  Close,
  TrendingUp,
  TrendingDown,
  Remove,
  Warning,
  CheckCircle,
  Info,
  Assignment,
  Psychology,
  Speed,
  AccountBalance,
  ShowChart,
  CompareArrows,
} from "@mui/icons-material";
import type {
  AIDocumentAnalysis,
  FinancialHighlight,
  RiskFlag,
  Recommendation,
} from "../../types/aiAnalysis";

interface AIAnalysisResultsProps {
  analysis: AIDocumentAnalysis;
  open: boolean;
  onClose: () => void;
}

const AIAnalysisResults: React.FC<AIAnalysisResultsProps> = ({
  analysis,
  open,
  onClose,
}) => {
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);

  const getHighlightIcon = (category: FinancialHighlight["category"]) => {
    const iconProps = { sx: { fontSize: 20 } };
    switch (category) {
      case "revenue":
        return <TrendingUp {...iconProps} color="success" />;
      case "profitability":
        return <AccountBalance {...iconProps} color="primary" />;
      case "cash-flow":
        return <ShowChart {...iconProps} color="info" />;
      case "growth":
        return <TrendingUp {...iconProps} color="success" />;
      case "efficiency":
        return <Speed {...iconProps} color="secondary" />;
      default:
        return <Info {...iconProps} color="action" />;
    }
  };

  const getHighlightColor = (importance: FinancialHighlight["importance"]) => {
    switch (importance) {
      case "critical":
        return "error";
      case "high":
        return "warning";
      case "medium":
        return "info";
      case "low":
        return "default";
      default:
        return "default";
    }
  };

  const getTrendIcon = (trend: FinancialHighlight["trend"]) => {
    switch (trend) {
      case "positive":
        return (
          <TrendingUp
            sx={{ fontSize: 16, color: theme.palette.success.main }}
          />
        );
      case "negative":
        return (
          <TrendingDown
            sx={{ fontSize: 16, color: theme.palette.error.main }}
          />
        );
      case "neutral":
        return <Remove sx={{ fontSize: 16, color: theme.palette.grey[500] }} />;
      default:
        return null;
    }
  };

  const getRiskIcon = (severity: RiskFlag["severity"]) => {
    const iconProps = { sx: { fontSize: 20 } };
    switch (severity) {
      case "critical":
        return <Warning {...iconProps} color="error" />;
      case "high":
        return <Warning {...iconProps} color="warning" />;
      case "medium":
        return <Info {...iconProps} color="info" />;
      case "low":
        return <CheckCircle {...iconProps} color="success" />;
      default:
        return <Info {...iconProps} color="action" />;
    }
  };

  const getRiskColor = (severity: RiskFlag["severity"]) => {
    switch (severity) {
      case "critical":
        return "error";
      case "high":
        return "warning";
      case "medium":
        return "info";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  const getRecommendationIcon = (type: Recommendation["type"]) => {
    const iconProps = { sx: { fontSize: 20 } };
    switch (type) {
      case "action":
        return <Assignment {...iconProps} color="primary" />;
      case "investigation":
        return <Psychology {...iconProps} color="info" />;
      case "negotiation":
        return <CompareArrows {...iconProps} color="secondary" />;
      case "due-diligence":
        return <CheckCircle {...iconProps} color="success" />;
      default:
        return <Info {...iconProps} color="action" />;
    }
  };

  const getRecommendationColor = (priority: Recommendation["priority"]) => {
    switch (priority) {
      case "urgent":
        return "error";
      case "high":
        return "warning";
      case "medium":
        return "info";
      case "low":
        return "default";
      default:
        return "default";
    }
  };

  const tabContent = [
    // Summary Tab
    <Box key="summary" sx={{ p: 2 }}>
      {/* Analysis Overview */}
      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Executive Summary
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.6 }}>
            {analysis.summary.overview}
          </Typography>

          <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
            {analysis.summary.conclusion}
          </Typography>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <Card sx={{ mb: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Key Financial Metrics
          </Typography>

          <Grid container spacing={2}>
            {analysis.summary.keyMetrics.map((metric, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    backgroundColor: theme.palette.grey[50],
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    {metric.name}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, my: 0.5 }}>
                    {metric.value}
                    {metric.unit && ` ${metric.unit}`}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {metric.period}
                  </Typography>

                  {metric.change && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        mt: 0.5,
                      }}
                    >
                      {metric.change.direction === "up" ? (
                        <TrendingUp
                          sx={{
                            fontSize: 12,
                            color: theme.palette.success.main,
                          }}
                        />
                      ) : (
                        <TrendingDown
                          sx={{ fontSize: 12, color: theme.palette.error.main }}
                        />
                      )}
                      <Typography
                        variant="caption"
                        color={
                          metric.change.direction === "up"
                            ? "success.main"
                            : "error.main"
                        }
                      >
                        {metric.change.value}% {metric.change.period}
                      </Typography>
                    </Box>
                  )}

                  {metric.benchmark && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: "block", mt: 0.5 }}
                    >
                      vs. {metric.benchmark.source}: {metric.benchmark.value}
                    </Typography>
                  )}
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Analysis Confidence */}
      <Alert severity="info" sx={{ borderRadius: 2 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
          AI Analysis Confidence: {analysis.confidence}%
        </Typography>
        <Typography variant="body2">
          This analysis was generated using {analysis.modelVersion} with{" "}
          {analysis.processingTime} seconds of processing time. Results should
          be reviewed by financial professionals as part of comprehensive due
          diligence.
        </Typography>
      </Alert>
    </Box>,

    // Highlights Tab
    <Box key="highlights" sx={{ p: 2 }}>
      <Stack spacing={3}>
        {analysis.highlights.map((highlight) => (
          <Card key={highlight.id} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Avatar
                  sx={{ backgroundColor: theme.palette.success.main + "20" }}
                >
                  {getHighlightIcon(highlight.category)}
                </Avatar>

                <Box sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {highlight.title}
                    </Typography>
                    {highlight.trend && getTrendIcon(highlight.trend)}
                    <Chip
                      label={highlight.importance}
                      size="small"
                      color={getHighlightColor(highlight.importance)}
                    />
                  </Box>

                  <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {highlight.description}
                  </Typography>

                  {highlight.value && (
                    <Paper
                      sx={{
                        p: 2,
                        backgroundColor: theme.palette.primary.main + "08",
                        borderRadius: 2,
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.primary.main,
                        }}
                      >
                        {highlight.value}
                      </Typography>
                    </Paper>
                  )}

                  {highlight.supportingData &&
                    highlight.supportingData.length > 0 && (
                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block", mb: 1 }}
                        >
                          Supporting Data:
                        </Typography>
                        <Stack
                          direction="row"
                          spacing={0.5}
                          flexWrap="wrap"
                          useFlexGap
                        >
                          {highlight.supportingData.map((data, index) => (
                            <Chip
                              key={index}
                              label={data}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Stack>
                      </Box>
                    )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>,

    // Risks Tab
    <Box key="risks" sx={{ p: 2 }}>
      <Stack spacing={3}>
        {analysis.risks.map((risk) => (
          <Card key={risk.id} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Avatar
                  sx={{ backgroundColor: theme.palette.warning.main + "20" }}
                >
                  {getRiskIcon(risk.severity)}
                </Avatar>

                <Box sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {risk.title}
                    </Typography>
                    <Chip
                      label={risk.severity}
                      size="small"
                      color={getRiskColor(risk.severity)}
                    />
                    <Chip
                      label={risk.category}
                      size="small"
                      variant="outlined"
                    />
                  </Box>

                  <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {risk.description}
                  </Typography>

                  <Paper
                    sx={{
                      p: 2,
                      backgroundColor: theme.palette.error.main + "08",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      Potential Impact:
                    </Typography>
                    <Typography variant="body2">{risk.impact}</Typography>
                  </Paper>

                  {risk.mitigation && risk.mitigation.length > 0 && (
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        Mitigation Strategies:
                      </Typography>
                      <List dense>
                        {risk.mitigation.map((strategy, index) => (
                          <ListItem key={index} sx={{ pl: 0 }}>
                            <ListItemIcon sx={{ minWidth: 24 }}>
                              <CheckCircle
                                sx={{
                                  fontSize: 16,
                                  color: theme.palette.success.main,
                                }}
                              />
                            </ListItemIcon>
                            <ListItemText
                              primary={strategy}
                              primaryTypographyProps={{ variant: "body2" }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  {risk.requiresAttention && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        This risk requires immediate attention during due
                        diligence.
                      </Typography>
                    </Alert>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>,

    // Recommendations Tab
    <Box key="recommendations" sx={{ p: 2 }}>
      <Stack spacing={3}>
        {analysis.recommendations.map((recommendation) => (
          <Card key={recommendation.id} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                <Avatar
                  sx={{ backgroundColor: theme.palette.info.main + "20" }}
                >
                  {getRecommendationIcon(recommendation.type)}
                </Avatar>

                <Box sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {recommendation.title}
                    </Typography>
                    <Chip
                      label={recommendation.priority}
                      size="small"
                      color={getRecommendationColor(recommendation.priority)}
                    />
                    <Chip
                      label={recommendation.type}
                      size="small"
                      variant="outlined"
                    />
                  </Box>

                  <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                    {recommendation.description}
                  </Typography>

                  <Paper
                    sx={{
                      p: 2,
                      backgroundColor: theme.palette.info.main + "08",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      Rationale:
                    </Typography>
                    <Typography variant="body2">
                      {recommendation.rationale}
                    </Typography>
                  </Paper>

                  {recommendation.expectedOutcome && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        Expected Outcome:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {recommendation.expectedOutcome}
                      </Typography>
                    </Box>
                  )}

                  <Grid container spacing={2}>
                    {recommendation.timeline && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" color="text.secondary">
                          Timeline:
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {recommendation.timeline}
                        </Typography>
                      </Grid>
                    )}

                    {recommendation.assignedTo && (
                      <Grid item xs={12} sm={6}>
                        <Typography variant="caption" color="text.secondary">
                          Assigned to:
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 500, textTransform: "capitalize" }}
                        >
                          {recommendation.assignedTo}
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>,
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3, maxHeight: "90vh" },
      }}
    >
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              AI Analysis Results
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {analysis.documentName}
            </Typography>
          </Box>

          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={(_, newValue) => setSelectedTab(newValue)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Summary" />
          <Tab label={`Highlights (${analysis.highlights.length})`} />
          <Tab label={`Risks (${analysis.risks.length})`} />
          <Tab label={`Recommendations (${analysis.recommendations.length})`} />
        </Tabs>
      </Box>

      <DialogContent sx={{ p: 0, minHeight: 400 }}>
        {tabContent[selectedTab]}
      </DialogContent>

      <DialogActions sx={{ p: 3, gap: 1 }}>
        <Button onClick={onClose} variant="outlined">
          Close
        </Button>
        <Button variant="contained">Export Report</Button>
        <Button variant="contained" color="success">
          Approve Analysis
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AIAnalysisResults;
