import React, { useState } from "react";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Button,
  IconButton,
  Avatar,
  useTheme,
  Stack,
  Divider,
  Badge,
  Tooltip,
} from "@mui/material";
import {
  CheckCircle,
  Schedule,
  Warning,
  Block,
  ExpandMore,
  ExpandLess,
  Assignment,
  CloudUpload,
  Comment,
  Group,
} from "@mui/icons-material";
import type {
  AcquisitionDeal,
  DealStage,
  DealStageData,
} from "../../types/acquisition";

interface DealWorkflowProps {
  deal: AcquisitionDeal;
  currentUserId: string;
  onStageClick: (stage: DealStage) => void;
  compact?: boolean;
}

const DealWorkflow: React.FC<DealWorkflowProps> = ({
  deal,
  currentUserId,
  onStageClick,
  compact = false,
}) => {
  const theme = useTheme();
  const [expandedStage, setExpandedStage] = useState<DealStage | null>(
    deal.currentStage
  );

  const getStageIcon = (stage: DealStageData) => {
    switch (stage.status) {
      case "completed":
        return <CheckCircle sx={{ color: theme.palette.success.main }} />;
      case "in-progress":
        return <Schedule sx={{ color: theme.palette.primary.main }} />;
      case "blocked":
        return <Block sx={{ color: theme.palette.error.main }} />;
      default:
        return <Schedule sx={{ color: theme.palette.grey[400] }} />;
    }
  };

  const getStageColor = (stage: DealStageData) => {
    switch (stage.status) {
      case "completed":
        return theme.palette.success.main;
      case "in-progress":
        return theme.palette.primary.main;
      case "blocked":
        return theme.palette.error.main;
      case "pending":
        return theme.palette.grey[400];
      default:
        return theme.palette.grey[400];
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "success";
    if (progress >= 50) return "primary";
    if (progress >= 25) return "warning";
    return "error";
  };

  const getCurrentStageIndex = () => {
    return deal.stages.findIndex((stage) => stage.stage === deal.currentStage);
  };

  const getCompletedChecklistItems = (stage: DealStageData) => {
    return stage.checklist.filter((item) => item.completed).length;
  };

  const getPendingApprovals = (stage: DealStageData) => {
    return stage.approvals.filter((approval) => approval.status === "pending")
      .length;
  };

  const getUnreadComments = (stage: DealStageData) => {
    // In a real app, this would track read status per user
    return stage.comments.filter(
      (comment) => comment.authorId !== currentUserId && !comment.isPrivate
    ).length;
  };

  const handleStageToggle = (stageName: DealStage) => {
    setExpandedStage(expandedStage === stageName ? null : stageName);
  };

  const formatDuration = (startDate?: Date, endDate?: Date) => {
    if (!startDate) return null;
    const end = endDate || new Date();
    const diffMs = end.getTime() - startDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Started today";
    if (diffDays === 1) return "1 day";
    return `${diffDays} days`;
  };

  if (compact) {
    return (
      <Box>
        {/* Compact Progress Bar */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Deal Progress
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {deal.overallProgress}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={deal.overallProgress}
            color={getProgressColor(deal.overallProgress)}
            sx={{ height: 8, borderRadius: 4 }}
          />
        </Box>

        {/* Stage Pills */}
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {deal.stages.map((stage, index) => (
            <Chip
              key={stage.stage}
              label={stage.name}
              size="small"
              icon={getStageIcon(stage)}
              onClick={() => onStageClick(stage.stage)}
              sx={{
                backgroundColor:
                  stage.stage === deal.currentStage
                    ? theme.palette.primary.main + "20"
                    : stage.status === "completed"
                    ? theme.palette.success.main + "20"
                    : theme.palette.grey[100],
                color:
                  stage.stage === deal.currentStage
                    ? theme.palette.primary.main
                    : getStageColor(stage),
                border: `1px solid ${
                  stage.stage === deal.currentStage
                    ? theme.palette.primary.main
                    : getStageColor(stage)
                }40`,
                cursor: "pointer",
                "&:hover": {
                  backgroundColor:
                    stage.stage === deal.currentStage
                      ? theme.palette.primary.main + "30"
                      : stage.status === "completed"
                      ? theme.palette.success.main + "30"
                      : theme.palette.grey[200],
                },
              }}
            />
          ))}
        </Stack>
      </Box>
    );
  }

  return (
    <Box>
      {/* Deal Header */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {deal.business.name} - Acquisition Workflow
            </Typography>
            <Chip
              label={`${deal.overallProgress}% Complete`}
              color={getProgressColor(deal.overallProgress)}
              sx={{ fontWeight: 600 }}
            />
          </Box>

          <LinearProgress
            variant="determinate"
            value={deal.overallProgress}
            color={getProgressColor(deal.overallProgress)}
            sx={{ height: 8, borderRadius: 4, mb: 2 }}
          />

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Typography variant="body2" color="text.secondary">
              Current Stage:{" "}
              <strong>
                {deal.stages.find((s) => s.stage === deal.currentStage)?.name}
              </strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Deal Value: <strong>${deal.dealValue?.toLocaleString()}</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Target Closing:{" "}
              <strong>{deal.targetClosingDate?.toLocaleDateString()}</strong>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Workflow Stepper */}
      <Stepper
        activeStep={getCurrentStageIndex()}
        orientation="vertical"
        sx={{
          "& .MuiStepLabel-root": {
            cursor: "pointer",
          },
        }}
      >
        {deal.stages.map((stage, index) => {
          const isExpanded = expandedStage === stage.stage;
          const completedTasks = getCompletedChecklistItems(stage);
          const totalTasks = stage.checklist.length;
          const pendingApprovals = getPendingApprovals(stage);
          const unreadComments = getUnreadComments(stage);
          const documentsCount = stage.documents.length;

          return (
            <Step key={stage.stage} completed={stage.status === "completed"}>
              <StepLabel
                icon={getStageIcon(stage)}
                onClick={() => handleStageToggle(stage.stage)}
                sx={{
                  "& .MuiStepLabel-labelContainer": {
                    cursor: "pointer",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {stage.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stage.description}
                    </Typography>
                    {stage.startedAt && (
                      <Typography variant="caption" color="text.secondary">
                        Duration:{" "}
                        {formatDuration(stage.startedAt, stage.completedAt)}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {/* Progress */}
                    <Tooltip title={`${stage.progress}% complete`}>
                      <Box sx={{ width: 60 }}>
                        <LinearProgress
                          variant="determinate"
                          value={stage.progress}
                          color={getProgressColor(stage.progress)}
                          sx={{ height: 4, borderRadius: 2 }}
                        />
                      </Box>
                    </Tooltip>

                    {/* Metrics */}
                    <Stack direction="row" spacing={0.5}>
                      {totalTasks > 0 && (
                        <Badge
                          badgeContent={`${completedTasks}/${totalTasks}`}
                          color="primary"
                        >
                          <Assignment
                            sx={{
                              fontSize: 16,
                              color: theme.palette.grey[600],
                            }}
                          />
                        </Badge>
                      )}

                      {documentsCount > 0 && (
                        <Badge badgeContent={documentsCount} color="secondary">
                          <CloudUpload
                            sx={{
                              fontSize: 16,
                              color: theme.palette.grey[600],
                            }}
                          />
                        </Badge>
                      )}

                      {unreadComments > 0 && (
                        <Badge badgeContent={unreadComments} color="error">
                          <Comment
                            sx={{
                              fontSize: 16,
                              color: theme.palette.grey[600],
                            }}
                          />
                        </Badge>
                      )}

                      {pendingApprovals > 0 && (
                        <Badge badgeContent={pendingApprovals} color="warning">
                          <Warning
                            sx={{
                              fontSize: 16,
                              color: theme.palette.orange[600],
                            }}
                          />
                        </Badge>
                      )}
                    </Stack>

                    <IconButton size="small">
                      {isExpanded ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </Box>
                </Box>
              </StepLabel>

              <StepContent>
                {isExpanded && (
                  <Card
                    sx={{
                      ml: 4,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    <CardContent>
                      {/* Stage Progress Details */}
                      <Box sx={{ mb: 3 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                          >
                            Stage Progress
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {stage.progress}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={stage.progress}
                          color={getProgressColor(stage.progress)}
                          sx={{ height: 6, borderRadius: 3 }}
                        />
                      </Box>

                      {/* Checklist Preview */}
                      {stage.checklist.length > 0 && (
                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, mb: 1 }}
                          >
                            Tasks ({completedTasks}/{totalTasks} completed)
                          </Typography>
                          <Stack spacing={1}>
                            {stage.checklist.slice(0, 3).map((item) => (
                              <Box
                                key={item.id}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  p: 1,
                                  borderRadius: 1,
                                  backgroundColor: item.completed
                                    ? theme.palette.success.main + "08"
                                    : theme.palette.grey[50],
                                }}
                              >
                                <CheckCircle
                                  sx={{
                                    fontSize: 16,
                                    color: item.completed
                                      ? theme.palette.success.main
                                      : theme.palette.grey[400],
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{
                                    textDecoration: item.completed
                                      ? "line-through"
                                      : "none",
                                    color: item.completed
                                      ? "text.secondary"
                                      : "text.primary",
                                  }}
                                >
                                  {item.title}
                                </Typography>
                                {item.required && (
                                  <Chip
                                    label="Required"
                                    size="small"
                                    color="warning"
                                  />
                                )}
                              </Box>
                            ))}
                            {stage.checklist.length > 3 && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                +{stage.checklist.length - 3} more tasks
                              </Typography>
                            )}
                          </Stack>
                        </Box>
                      )}

                      {/* Documents */}
                      {stage.documents.length > 0 && (
                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, mb: 1 }}
                          >
                            Documents ({stage.documents.length})
                          </Typography>
                          <Stack spacing={1}>
                            {stage.documents.slice(0, 2).map((doc) => (
                              <Box
                                key={doc.id}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  p: 1,
                                  borderRadius: 1,
                                  backgroundColor: theme.palette.grey[50],
                                }}
                              >
                                <CloudUpload
                                  sx={{
                                    fontSize: 16,
                                    color: theme.palette.grey[600],
                                  }}
                                />
                                <Typography
                                  variant="body2"
                                  sx={{ flexGrow: 1 }}
                                >
                                  {doc.name}
                                </Typography>
                                <Chip
                                  label={doc.status}
                                  size="small"
                                  color={
                                    doc.status === "approved"
                                      ? "success"
                                      : "default"
                                  }
                                />
                              </Box>
                            ))}
                            {stage.documents.length > 2 && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                +{stage.documents.length - 2} more documents
                              </Typography>
                            )}
                          </Stack>
                        </Box>
                      )}

                      {/* Comments Preview */}
                      {stage.comments.length > 0 && (
                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, mb: 1 }}
                          >
                            Recent Comments ({stage.comments.length})
                          </Typography>
                          <Stack spacing={1}>
                            {stage.comments.slice(-2).map((comment) => (
                              <Box
                                key={comment.id}
                                sx={{
                                  display: "flex",
                                  gap: 1,
                                  p: 1,
                                  borderRadius: 1,
                                  backgroundColor: theme.palette.grey[50],
                                }}
                              >
                                <Avatar
                                  sx={{ width: 24, height: 24, fontSize: 12 }}
                                >
                                  {comment.authorName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </Avatar>
                                <Box sx={{ flexGrow: 1 }}>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    {comment.authorName} •{" "}
                                    {comment.createdAt.toLocaleDateString()}
                                  </Typography>
                                  <Typography variant="body2">
                                    {comment.content.length > 100
                                      ? comment.content.substring(0, 100) +
                                        "..."
                                      : comment.content}
                                  </Typography>
                                </Box>
                              </Box>
                            ))}
                          </Stack>
                        </Box>
                      )}

                      <Divider sx={{ my: 2 }} />

                      {/* Action Buttons */}
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => onStageClick(stage.stage)}
                          sx={{ borderRadius: 2 }}
                        >
                          View Details
                        </Button>

                        {stage.status === "in-progress" && (
                          <Button
                            variant="contained"
                            size="small"
                            sx={{ borderRadius: 2 }}
                          >
                            Update Progress
                          </Button>
                        )}

                        {stage.status === "pending" && (
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            sx={{ borderRadius: 2 }}
                          >
                            Start Stage
                          </Button>
                        )}
                      </Stack>
                    </CardContent>
                  </Card>
                )}
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
};

export default DealWorkflow;
