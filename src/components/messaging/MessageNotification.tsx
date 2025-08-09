import React, { useState, useEffect } from "react";
import {
  Snackbar,
  Alert,
  Avatar,
  Box,
  Typography,
  IconButton,
  Slide,
  useTheme,
} from "@mui/material";
import {
  Close,
  Reply,
  Message as MessageIcon,
  AttachFile,
} from "@mui/icons-material";
import type { Message, Match } from "../../types/match";

interface MessageNotificationProps {
  message: Message | null;
  match: Match | null;
  open: boolean;
  onClose: () => void;
  onReply?: () => void;
  autoHideDuration?: number;
}

const MessageNotification: React.FC<MessageNotificationProps> = ({
  message,
  match,
  open,
  onClose,
  onReply,
  autoHideDuration = 6000,
}) => {
  const theme = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open && message && match) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [open, message, match]);

  if (!message || !match) return null;

  const getSender = () => {
    return message.senderId === match.buyerId ? match.buyer : match.seller;
  };

  const getMessagePreview = () => {
    if (
      message.type === "file" &&
      message.attachments &&
      message.attachments.length > 0
    ) {
      const attachmentTypes = message.attachments.map((att) => att.type);
      const uniqueTypes = [...new Set(attachmentTypes)];

      if (uniqueTypes.length === 1) {
        const type = uniqueTypes[0];
        const count = message.attachments.length;

        switch (type) {
          case "image":
            return `📷 Sent ${count} image${count > 1 ? "s" : ""}`;
          case "video":
            return `🎥 Sent ${count} video${count > 1 ? "s" : ""}`;
          case "audio":
            return `🎵 Sent ${count} audio file${count > 1 ? "s" : ""}`;
          case "document":
            return `📄 Sent ${count} document${count > 1 ? "s" : ""}`;
          default:
            return `📎 Sent ${count} file${count > 1 ? "s" : ""}`;
        }
      } else {
        return `📎 Sent ${message.attachments.length} files`;
      }
    }

    if (message.content) {
      return message.content.length > 50
        ? message.content.substring(0, 50) + "..."
        : message.content;
    }

    return "New message";
  };

  const handleReply = () => {
    onReply?.();
    onClose();
  };

  return (
    <Snackbar
      open={isVisible}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={Slide}
      TransitionProps={{ direction: "left" }}
      sx={{
        mt: 8, // Account for top bar
        mr: 2,
      }}
    >
      <Alert
        severity="info"
        variant="filled"
        onClose={onClose}
        sx={{
          width: 350,
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          borderRadius: 3,
          boxShadow: 4,
          "& .MuiAlert-icon": {
            display: "none",
          },
          "& .MuiAlert-message": {
            width: "100%",
            p: 0,
          },
          "& .MuiAlert-action": {
            p: 0,
            alignItems: "flex-start",
          },
        }}
        action={
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {onReply && (
              <IconButton
                size="small"
                onClick={handleReply}
                sx={{
                  color: "inherit",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <Reply fontSize="small" />
              </IconButton>
            )}
            <IconButton
              size="small"
              onClick={onClose}
              sx={{
                color: "inherit",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>
        }
      >
        <Box sx={{ p: 1.5 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
            <Avatar
              src={getSender().profilePicture}
              sx={{
                width: 32,
                height: 32,
                background: "rgba(255, 255, 255, 0.2)",
              }}
            >
              {getSender().avatar}
            </Avatar>

            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  color: "inherit",
                  lineHeight: 1.2,
                }}
              >
                {getSender().firstName} {getSender().lastName}
              </Typography>
              {match.business && (
                <Typography
                  variant="caption"
                  sx={{
                    color: "inherit",
                    opacity: 0.9,
                    fontSize: "0.7rem",
                  }}
                >
                  {match.business.name}
                </Typography>
              )}
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {message.type === "file" ? (
                <AttachFile sx={{ fontSize: 16, opacity: 0.8 }} />
              ) : (
                <MessageIcon sx={{ fontSize: 16, opacity: 0.8 }} />
              )}
            </Box>
          </Box>

          <Typography
            variant="body2"
            sx={{
              color: "inherit",
              opacity: 0.95,
              lineHeight: 1.3,
            }}
          >
            {getMessagePreview()}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: "inherit",
              opacity: 0.7,
              fontSize: "0.65rem",
              mt: 0.5,
              display: "block",
            }}
          >
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Box>
      </Alert>
    </Snackbar>
  );
};

export default MessageNotification;
