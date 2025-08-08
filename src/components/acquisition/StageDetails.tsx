import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  IconButton,
  Button,
  Chip,
  Avatar,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  useTheme,
  Stack,
  Badge,
  Tooltip,
  Paper,
} from "@mui/material";
import {
  ExpandMore,
  CheckCircle,
  RadioButtonUnchecked,
  CloudUpload,
  Download,
  Comment as CommentIcon,
  Add,
  Edit,
  Delete,
  Visibility,
  Assignment,
  Schedule,
  Warning,
  Person,
  Business,
} from "@mui/icons-material";
import type {
  DealStageData,
  ChecklistItem,
  DealDocument,
  StageComment,
} from "../../types/acquisition";

interface StageDetailsProps {
  stage: DealStageData;
  currentUserId: string;
  userRole: "buyer" | "seller";
  onChecklistUpdate: (itemId: string, completed: boolean) => void;
  onDocumentUpload: (file: File, category: string) => void;
  onCommentAdd: (content: string, isPrivate: boolean) => void;
  onApprovalAction: (
    approvalId: string,
    action: "approve" | "reject",
    reason?: string
  ) => void;
}

const StageDetails: React.FC<StageDetailsProps> = ({
  stage,
  currentUserId,
  userRole,
  onChecklistUpdate,
  onDocumentUpload,
  onCommentAdd,
  onApprovalAction,
}) => {
  const theme = useTheme();
  const [expandedSections, setExpandedSections] = useState({
    checklist: true,
    documents: true,
    comments: true,
    approvals: true,
  });
  const [newComment, setNewComment] = useState("");
  const [commentPrivate, setCommentPrivate] = useState(false);

  const handleSectionToggle = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      onCommentAdd(newComment.trim(), commentPrivate);
      setNewComment("");
      setCommentPrivate(false);
    }
  };

  const getDocumentIcon = (type: DealDocument["type"]) => {
    const iconProps = { sx: { fontSize: 20, color: theme.palette.grey[600] } };
    switch (type) {
      case "pdf":
        return <Visibility {...iconProps} />;
      case "excel":
        return <Assignment {...iconProps} />;
      default:
        return <CloudUpload {...iconProps} />;
    }
  };

  const getDocumentStatusColor = (status: DealDocument["status"]) => {
    switch (status) {
      case "approved":
        return "success";
      case "rejected":
        return "error";
      case "review":
        return "warning";
      default:
        return "default";
    }
  };

  const getPriorityColor = (priority: ChecklistItem["priority"]) => {
    switch (priority) {
      case "high":
        return theme.palette.error.main;
      case "medium":
        return theme.palette.warning.main;
      case "low":
        return theme.palette.info.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const canUserCompleteTask = (item: ChecklistItem) => {
    return item.owner === "both" || item.owner === userRole;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const completedTasks = stage.checklist.filter(
    (item) => item.completed
  ).length;
  const totalTasks = stage.checklist.length;
  const pendingApprovals = stage.approvals.filter(
    (approval) => approval.status === "pending"
  ).length;

  return (
    <Box>
      {/* Stage Header */}
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
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {stage.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {stage.description}
              </Typography>
            </Box>

            <Box sx={{ textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: getPriorityColor("medium") }}
              >
                {stage.progress}%
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Complete
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <Chip
              icon={<Assignment />}
              label={`${completedTasks}/${totalTasks} Tasks`}
              color={completedTasks === totalTasks ? "success" : "primary"}
              variant="outlined"
            />
            <Chip
              icon={<CloudUpload />}
              label={`${stage.documents.length} Documents`}
              color="secondary"
              variant="outlined"
            />
            <Chip
              icon={<CommentIcon />}
              label={`${stage.comments.length} Comments`}
              color="info"
              variant="outlined"
            />
            {pendingApprovals > 0 && (
              <Chip
                icon={<Warning />}
                label={`${pendingApprovals} Pending Approvals`}
                color="warning"
                variant="outlined"
              />
            )}
          </Box>

          {stage.dueDate && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                backgroundColor: theme.palette.warning.main + "08",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center", gap: 1 }}
              >
                <Schedule sx={{ fontSize: 16 }} />
                Due Date: {stage.dueDate.toLocaleDateString()}
                {stage.dueDate < new Date() && (
                  <Chip label="Overdue" size="small" color="error" />
                )}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Checklist Section */}
        <Grid item xs={12} lg={6}>
          <Accordion
            expanded={expandedSections.checklist}
            onChange={() => handleSectionToggle("checklist")}
            sx={{ borderRadius: 3 }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Assignment color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Tasks & Checklist
                </Typography>
                <Badge
                  badgeContent={`${completedTasks}/${totalTasks}`}
                  color="primary"
                />
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <List sx={{ pt: 0 }}>
                {stage.checklist.map((item) => (
                  <ListItem
                    key={item.id}
                    sx={{
                      mb: 1,
                      borderRadius: 2,
                      backgroundColor: item.completed
                        ? theme.palette.success.main + "08"
                        : theme.palette.grey[50],
                      border: `1px solid ${
                        item.completed
                          ? theme.palette.success.main + "40"
                          : theme.palette.grey[200]
                      }`,
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={item.completed}
                        onChange={(e) =>
                          onChecklistUpdate(item.id, e.target.checked)
                        }
                        disabled={!canUserCompleteTask(item)}
                        icon={<RadioButtonUnchecked />}
                        checkedIcon={<CheckCircle />}
                        sx={{
                          color: getPriorityColor(item.priority),
                          "&.Mui-checked": {
                            color: theme.palette.success.main,
                          },
                        }}
                      />
                    </ListItemIcon>

                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              textDecoration: item.completed
                                ? "line-through"
                                : "none",
                              color: item.completed
                                ? "text.secondary"
                                : "text.primary",
                              fontWeight: item.required ? 600 : 400,
                            }}
                          >
                            {item.title}
                          </Typography>

                          {item.required && (
                            <Chip label="Required" size="small" color="error" />
                          )}

                          <Chip
                            label={item.priority}
                            size="small"
                            sx={{
                              backgroundColor:
                                getPriorityColor(item.priority) + "20",
                              color: getPriorityColor(item.priority),
                            }}
                          />

                          <Chip
                            label={item.owner === "both" ? "Both" : item.owner}
                            size="small"
                            icon={
                              item.owner === "both" ? <Business /> : <Person />
                            }
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          {item.description && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 0.5 }}
                            >
                              {item.description}
                            </Typography>
                          )}

                          {item.completedBy && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ mt: 0.5, display: "block" }}
                            >
                              Completed {item.completedAt?.toLocaleDateString()}{" "}
                              by {item.completedBy}
                            </Typography>
                          )}
                        </Box>
                      }
                    />

                    <ListItemSecondaryAction>
                      <IconButton size="small">
                        <Edit sx={{ fontSize: 16 }} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>

              <Button
                startIcon={<Add />}
                variant="outlined"
                size="small"
                sx={{ mt: 1, borderRadius: 2 }}
              >
                Add Task
              </Button>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Documents Section */}
        <Grid item xs={12} lg={6}>
          <Accordion
            expanded={expandedSections.documents}
            onChange={() => handleSectionToggle("documents")}
            sx={{ borderRadius: 3 }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                }}
              >
                <CloudUpload color="secondary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Documents
                </Typography>
                <Badge
                  badgeContent={stage.documents.length}
                  color="secondary"
                />
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              <List sx={{ pt: 0 }}>
                {stage.documents.map((doc) => (
                  <ListItem
                    key={doc.id}
                    sx={{
                      mb: 1,
                      borderRadius: 2,
                      backgroundColor: theme.palette.grey[50],
                      border: `1px solid ${theme.palette.grey[200]}`,
                    }}
                  >
                    <ListItemIcon>{getDocumentIcon(doc.type)}</ListItemIcon>

                    <ListItemText
                      primary={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {doc.name}
                          </Typography>

                          <Chip
                            label={doc.status}
                            size="small"
                            color={getDocumentStatusColor(doc.status)}
                          />

                          <Chip
                            label={doc.category}
                            size="small"
                            variant="outlined"
                          />

                          <Chip
                            label={doc.confidentialityLevel}
                            size="small"
                            color={
                              doc.confidentialityLevel === "highly-confidential"
                                ? "error"
                                : "default"
                            }
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          {doc.description && (
                            <Typography variant="body2" color="text.secondary">
                              {doc.description}
                            </Typography>
                          )}

                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", mt: 0.5 }}
                          >
                            {formatFileSize(doc.size)} • Uploaded{" "}
                            {doc.uploadedAt.toLocaleDateString()} • v
                            {doc.version}
                          </Typography>

                          {doc.reviewComments && (
                            <Typography
                              variant="caption"
                              color="error"
                              sx={{ display: "block", mt: 0.5 }}
                            >
                              Review: {doc.reviewComments}
                            </Typography>
                          )}
                        </Box>
                      }
                    />

                    <ListItemSecondaryAction>
                      <Stack direction="row" spacing={0.5}>
                        <IconButton size="small">
                          <Download sx={{ fontSize: 16 }} />
                        </IconButton>
                        <IconButton size="small">
                          <Edit sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Stack>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>

              <Button
                startIcon={<CloudUpload />}
                variant="outlined"
                size="small"
                component="label"
                sx={{ mt: 1, borderRadius: 2 }}
              >
                Upload Document
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onDocumentUpload(file, "general");
                    }
                  }}
                />
              </Button>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Comments Section */}
        <Grid item xs={12}>
          <Accordion
            expanded={expandedSections.comments}
            onChange={() => handleSectionToggle("comments")}
            sx={{ borderRadius: 3 }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                }}
              >
                <CommentIcon color="info" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Comments & Discussion
                </Typography>
                <Badge badgeContent={stage.comments.length} color="info" />
              </Box>
            </AccordionSummary>

            <AccordionDetails>
              {/* Comments List */}
              <Stack spacing={2} sx={{ mb: 3 }}>
                {stage.comments.map((comment) => (
                  <Paper
                    key={comment.id}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: comment.isPrivate
                        ? theme.palette.warning.main + "08"
                        : theme.palette.grey[50],
                      border: `1px solid ${
                        comment.isPrivate
                          ? theme.palette.warning.main + "40"
                          : theme.palette.grey[200]
                      }`,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {comment.authorName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
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
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                          >
                            {comment.authorName}
                          </Typography>

                          <Chip
                            label={comment.authorRole}
                            size="small"
                            color={
                              comment.authorRole === "buyer"
                                ? "primary"
                                : "secondary"
                            }
                          />

                          {comment.isPrivate && (
                            <Chip
                              label="Private"
                              size="small"
                              color="warning"
                            />
                          )}

                          <Typography variant="caption" color="text.secondary">
                            {comment.createdAt.toLocaleDateString()} at{" "}
                            {comment.createdAt.toLocaleTimeString()}
                          </Typography>

                          {comment.editedAt && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              (edited)
                            </Typography>
                          )}
                        </Box>

                        <Typography variant="body2">
                          {comment.content}
                        </Typography>

                        {comment.attachments &&
                          comment.attachments.length > 0 && (
                            <Box sx={{ mt: 1 }}>
                              {comment.attachments.map((attachment, index) => (
                                <Chip
                                  key={index}
                                  label={`Attachment ${index + 1}`}
                                  size="small"
                                  icon={<CloudUpload />}
                                  variant="outlined"
                                  sx={{ mr: 0.5 }}
                                />
                              ))}
                            </Box>
                          )}
                      </Box>

                      <IconButton size="small">
                        <Edit sx={{ fontSize: 16 }} />
                      </IconButton>
                    </Box>
                  </Paper>
                ))}
              </Stack>

              {/* Add Comment */}
              <Paper
                sx={{
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                  Add Comment
                </Typography>

                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Share your thoughts, questions, or updates..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  sx={{ mb: 2 }}
                />

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Checkbox
                      checked={commentPrivate}
                      onChange={(e) => setCommentPrivate(e.target.checked)}
                      size="small"
                    />
                    <Typography variant="body2" color="text.secondary">
                      Private comment (only visible to your team)
                    </Typography>
                  </Box>

                  <Button
                    variant="contained"
                    onClick={handleCommentSubmit}
                    disabled={!newComment.trim()}
                    sx={{ borderRadius: 2 }}
                  >
                    Add Comment
                  </Button>
                </Box>
              </Paper>
            </AccordionDetails>
          </Accordion>
        </Grid>

        {/* Approvals Section */}
        {stage.approvals.length > 0 && (
          <Grid item xs={12}>
            <Accordion
              expanded={expandedSections.approvals}
              onChange={() => handleSectionToggle("approvals")}
              sx={{ borderRadius: 3 }}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    width: "100%",
                  }}
                >
                  <Warning color="warning" />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Approvals Required
                  </Typography>
                  <Badge badgeContent={pendingApprovals} color="warning" />
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                <List sx={{ pt: 0 }}>
                  {stage.approvals.map((approval) => (
                    <ListItem
                      key={approval.id}
                      sx={{
                        mb: 1,
                        borderRadius: 2,
                        backgroundColor:
                          approval.status === "approved"
                            ? theme.palette.success.main + "08"
                            : approval.status === "rejected"
                            ? theme.palette.error.main + "08"
                            : theme.palette.warning.main + "08",
                        border: `1px solid ${
                          approval.status === "approved"
                            ? theme.palette.success.main + "40"
                            : approval.status === "rejected"
                            ? theme.palette.error.main + "40"
                            : theme.palette.warning.main + "40"
                        }`,
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: 500 }}
                            >
                              {approval.title}
                            </Typography>

                            <Chip
                              label={approval.status}
                              size="small"
                              color={
                                approval.status === "approved"
                                  ? "success"
                                  : approval.status === "rejected"
                                  ? "error"
                                  : "warning"
                              }
                            />

                            <Chip
                              label={`Required from ${approval.requiredFrom}`}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              {approval.description}
                            </Typography>

                            {approval.rejectionReason && (
                              <Typography
                                variant="body2"
                                color="error"
                                sx={{ mt: 0.5 }}
                              >
                                Rejection Reason: {approval.rejectionReason}
                              </Typography>
                            )}

                            {approval.conditions &&
                              approval.conditions.length > 0 && (
                                <Box sx={{ mt: 1 }}>
                                  <Typography
                                    variant="caption"
                                    color="text.secondary"
                                  >
                                    Conditions:
                                  </Typography>
                                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                                    {approval.conditions.map(
                                      (condition, index) => (
                                        <li key={index}>
                                          <Typography
                                            variant="caption"
                                            color="text.secondary"
                                          >
                                            {condition}
                                          </Typography>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </Box>
                              )}
                          </Box>
                        }
                      />

                      {approval.status === "pending" && (
                        <ListItemSecondaryAction>
                          <Stack direction="row" spacing={1}>
                            <Button
                              size="small"
                              variant="contained"
                              color="success"
                              onClick={() =>
                                onApprovalAction(approval.id, "approve")
                              }
                            >
                              Approve
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() =>
                                onApprovalAction(approval.id, "reject")
                              }
                            >
                              Reject
                            </Button>
                          </Stack>
                        </ListItemSecondaryAction>
                      )}
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default StageDetails;
