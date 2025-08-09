import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Tooltip,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  useTheme,
  Stack,
} from "@mui/material";
import {
  Check,
  DoneAll,
  Download,
  Visibility,
  Description,
  Image as ImageIcon,
  VideoFile,
  AudioFile,
  Close,
  PlayArrow,
  VolumeUp,
} from "@mui/icons-material";
import type { Message, MessageAttachment } from "../../types/match";

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
  showAvatar: boolean;
  senderAvatar?: string;
  senderName?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isCurrentUser,
  showAvatar,
  senderAvatar,
  senderName,
}) => {
  const theme = useTheme();
  const [mediaPreviewOpen, setMediaPreviewOpen] = useState(false);
  const [previewAttachment, setPreviewAttachment] =
    useState<MessageAttachment | null>(null);

  const formatMessageTime = (timestamp: Date) => {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffMs = now.getTime() - messageDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
      return "Just now";
    } else if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays < 7) {
      return `${diffDays}d ago`;
    } else {
      return messageDate.toLocaleDateString();
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDownload = (attachment: MessageAttachment) => {
    // In a real app, this would trigger a secure download
    const link = document.createElement("a");
    link.href = attachment.url;
    link.download = attachment.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePreview = (attachment: MessageAttachment) => {
    if (attachment.type === "image" || attachment.type === "video") {
      setPreviewAttachment(attachment);
      setMediaPreviewOpen(true);
    } else {
      handleDownload(attachment);
    }
  };

  const renderAttachment = (attachment: MessageAttachment) => {
    const isImage = attachment.type === "image";
    const isVideo = attachment.type === "video";
    const isAudio = attachment.type === "audio";
    const isDocument = attachment.type === "document";

    if (isImage) {
      return (
        <Card
          key={attachment.id}
          sx={{
            maxWidth: 300,
            borderRadius: 2,
            cursor: "pointer",
            transition: "transform 0.2s ease",
            "&:hover": {
              transform: "scale(1.02)",
            },
          }}
          onClick={() => handlePreview(attachment)}
        >
          <CardMedia
            component="img"
            height="200"
            image={attachment.url}
            alt={attachment.name}
            sx={{ objectFit: "cover" }}
          />
          <CardContent sx={{ p: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {attachment.name}
            </Typography>
          </CardContent>
        </Card>
      );
    }

    if (isVideo) {
      return (
        <Card
          key={attachment.id}
          sx={{
            maxWidth: 300,
            borderRadius: 2,
            cursor: "pointer",
            position: "relative",
          }}
          onClick={() => handlePreview(attachment)}
        >
          <CardMedia
            component="video"
            height="200"
            src={attachment.url}
            sx={{ objectFit: "cover" }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              borderRadius: "50%",
              p: 1,
            }}
          >
            <PlayArrow sx={{ color: "white", fontSize: 32 }} />
          </Box>
          <CardContent sx={{ p: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {attachment.name} • {formatFileSize(attachment.size)}
            </Typography>
          </CardContent>
        </Card>
      );
    }

    // Document or audio file
    return (
      <Card
        key={attachment.id}
        sx={{
          maxWidth: 300,
          borderRadius: 2,
          border: `1px solid ${theme.palette.divider}`,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: theme.palette.grey[50],
          },
        }}
        onClick={() => handleDownload(attachment)}
      >
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isAudio ? (
              <VolumeUp color="info" sx={{ fontSize: 32 }} />
            ) : isDocument ? (
              <Description color="action" sx={{ fontSize: 32 }} />
            ) : (
              <AudioFile color="info" sx={{ fontSize: 32 }} />
            )}

            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {attachment.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatFileSize(attachment.size)}
              </Typography>
            </Box>

            <Tooltip title="Download">
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(attachment);
                }}
              >
                <Download />
              </IconButton>
            </Tooltip>
          </Box>
        </CardContent>
      </Card>
    );
  };

  // System message
  if (message.type === "system") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: 2,
        }}
      >
        <Chip
          label={message.content}
          size="small"
          sx={{
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.text.secondary,
            fontStyle: "italic",
          }}
        />
      </Box>
    );
  }

  // Regular message
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: isCurrentUser ? "flex-end" : "flex-start",
          mb: 1,
          alignItems: "flex-end",
          gap: 1,
        }}
      >
        {showAvatar && !isCurrentUser && (
          <Avatar
            src={senderAvatar}
            sx={{
              width: 32,
              height: 32,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          >
            {senderAvatar ||
              (senderName ? senderName.substring(0, 2).toUpperCase() : "??")}
          </Avatar>
        )}

        {!showAvatar && !isCurrentUser && (
          <Box sx={{ width: 32 }} /> // Spacer
        )}

        <Box sx={{ maxWidth: "70%" }}>
          {/* Message content */}
          {message.content && (
            <Paper
              sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundColor: isCurrentUser
                  ? theme.palette.primary.main
                  : theme.palette.grey[100],
                color: isCurrentUser
                  ? theme.palette.primary.contrastText
                  : theme.palette.text.primary,
                borderTopLeftRadius: !isCurrentUser && showAvatar ? 2 : 12,
                borderTopRightRadius: isCurrentUser ? 2 : 12,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
                mb:
                  message.attachments && message.attachments.length > 0 ? 1 : 0,
              }}
            >
              <Typography variant="body2" sx={{ lineHeight: 1.4 }}>
                {message.content}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mt: 0.5,
                  gap: 1,
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    opacity: 0.7,
                    fontSize: "0.7rem",
                  }}
                >
                  {formatMessageTime(message.timestamp)}
                </Typography>

                {isCurrentUser && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {message.readAt ? (
                      <DoneAll sx={{ fontSize: 12, opacity: 0.7 }} />
                    ) : (
                      <Check sx={{ fontSize: 12, opacity: 0.7 }} />
                    )}
                  </Box>
                )}
              </Box>
            </Paper>
          )}

          {/* Attachments */}
          {message.attachments && message.attachments.length > 0 && (
            <Stack spacing={1} sx={{ mt: message.content ? 1 : 0 }}>
              {message.attachments.map(renderAttachment)}
            </Stack>
          )}
        </Box>
      </Box>

      {/* Media Preview Dialog */}
      <Dialog
        open={mediaPreviewOpen}
        onClose={() => setMediaPreviewOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogContent
          sx={{
            p: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {previewAttachment &&
            (previewAttachment.type === "image" ? (
              <img
                src={previewAttachment.url}
                alt={previewAttachment.name}
                style={{
                  maxWidth: "100%",
                  maxHeight: "80vh",
                  objectFit: "contain",
                }}
              />
            ) : previewAttachment.type === "video" ? (
              <video
                src={previewAttachment.url}
                controls
                style={{
                  maxWidth: "100%",
                  maxHeight: "80vh",
                }}
              />
            ) : null)}
        </DialogContent>

        <DialogActions>
          <Button
            startIcon={<Download />}
            onClick={() =>
              previewAttachment && handleDownload(previewAttachment)
            }
          >
            Download
          </Button>
          <Button onClick={() => setMediaPreviewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MessageBubble;
