import React, { useState, useRef } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  InputAdornment,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Stack,
  useTheme,
} from "@mui/material";
import {
  Send,
  AttachFile,
  EmojiEmotions,
  Schedule,
  Description,
  Image as ImageIcon,
  VideoFile,
  Mic,
  Close,
} from "@mui/icons-material";
import AttachmentHandler from "./AttachmentHandler";
import type { MessageAttachment } from "../../types/match";

interface MessageComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSendMessage: (content: string, attachments?: MessageAttachment[]) => void;
  disabled?: boolean;
  placeholder?: string;
}

const MessageComposer: React.FC<MessageComposerProps> = ({
  value,
  onChange,
  onSendMessage,
  disabled = false,
  placeholder = "Type a message...",
}) => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachmentDialogOpen, setAttachmentDialogOpen] = useState(false);
  const [attachmentMenuAnchor, setAttachmentMenuAnchor] =
    useState<null | HTMLElement>(null);
  const [pendingAttachments, setPendingAttachments] = useState<
    MessageAttachment[]
  >([]);

  const handleSendMessage = () => {
    if (value.trim() || pendingAttachments.length > 0) {
      onSendMessage(
        value.trim(),
        pendingAttachments.length > 0 ? pendingAttachments : undefined
      );
      onChange("");
      setPendingAttachments([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAttachmentMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAttachmentMenuAnchor(event.currentTarget);
  };

  const handleAttachmentMenuClose = () => {
    setAttachmentMenuAnchor(null);
  };

  const handleQuickImageUpload = () => {
    fileInputRef.current?.click();
    handleAttachmentMenuClose();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // For demo purposes, create mock attachments
      const newAttachments: MessageAttachment[] = Array.from(files).map(
        (file, index) => ({
          id: `${file.name}-${Date.now()}-${index}`,
          name: file.name,
          type: file.type.startsWith("image/") ? "image" : "document",
          url: URL.createObjectURL(file),
          size: file.size,
          uploadedAt: new Date(),
        })
      );

      setPendingAttachments((prev) => [...prev, ...newAttachments]);
    }

    // Reset input
    if (event.target) {
      event.target.value = "";
    }
  };

  const handleAdvancedAttachment = () => {
    setAttachmentDialogOpen(true);
    handleAttachmentMenuClose();
  };

  const handleAttachmentsReady = (attachments: MessageAttachment[]) => {
    setPendingAttachments((prev) => [...prev, ...attachments]);
  };

  const removeAttachment = (attachmentId: string) => {
    setPendingAttachments((prev) =>
      prev.filter((att) => att.id !== attachmentId)
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getAttachmentIcon = (type: MessageAttachment["type"]) => {
    switch (type) {
      case "image":
        return <ImageIcon sx={{ fontSize: 16 }} />;
      case "video":
        return <VideoFile sx={{ fontSize: 16 }} />;
      case "audio":
        return <Mic sx={{ fontSize: 16 }} />;
      default:
        return <Description sx={{ fontSize: 16 }} />;
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 0,
        borderTop: "1px solid",
        borderColor: theme.palette.divider,
      }}
    >
      {/* Pending Attachments */}
      {pendingAttachments.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {pendingAttachments.map((attachment) => (
              <Chip
                key={attachment.id}
                icon={getAttachmentIcon(attachment.type)}
                label={`${attachment.name} (${formatFileSize(
                  attachment.size
                )})`}
                onDelete={() => removeAttachment(attachment.id)}
                deleteIcon={<Close />}
                size="small"
                sx={{
                  backgroundColor: theme.palette.primary.main + "10",
                  border: `1px solid ${theme.palette.primary.main}40`,
                  "& .MuiChip-deleteIcon": {
                    "&:hover": {
                      color: theme.palette.error.main,
                    },
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {/* Message Input */}
      <TextField
        fullWidth
        multiline
        maxRows={4}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip title="Add emoji">
                <IconButton size="small" edge="start" disabled={disabled}>
                  <EmojiEmotions />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Tooltip title="Attach files">
                <IconButton
                  size="small"
                  onClick={handleAttachmentMenuClick}
                  disabled={disabled}
                >
                  <AttachFile />
                </IconButton>
              </Tooltip>

              <Tooltip title="Schedule message">
                <IconButton size="small" disabled={disabled}>
                  <Schedule />
                </IconButton>
              </Tooltip>

              <Tooltip
                title={
                  value.trim() || pendingAttachments.length > 0
                    ? "Send message"
                    : "Type a message"
                }
              >
                <IconButton
                  size="small"
                  onClick={handleSendMessage}
                  disabled={
                    (!value.trim() && pendingAttachments.length === 0) ||
                    disabled
                  }
                  edge="end"
                  sx={{
                    backgroundColor:
                      (value.trim() || pendingAttachments.length > 0) &&
                      !disabled
                        ? theme.palette.primary.main
                        : "transparent",
                    color:
                      (value.trim() || pendingAttachments.length > 0) &&
                      !disabled
                        ? theme.palette.primary.contrastText
                        : theme.palette.text.disabled,
                    "&:hover": {
                      backgroundColor:
                        (value.trim() || pendingAttachments.length > 0) &&
                        !disabled
                          ? theme.palette.primary.dark
                          : "transparent",
                    },
                    ml: 0.5,
                  }}
                >
                  <Send />
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          },
        }}
      />

      {/* Hidden file input for quick image upload */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx"
        style={{ display: "none" }}
        onChange={handleFileSelect}
      />

      {/* Attachment Menu */}
      <Menu
        anchorEl={attachmentMenuAnchor}
        open={Boolean(attachmentMenuAnchor)}
        onClose={handleAttachmentMenuClose}
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <MenuItem onClick={handleQuickImageUpload}>
          <ListItemIcon>
            <ImageIcon />
          </ListItemIcon>
          <ListItemText>
            Quick Upload
            <Box
              component="span"
              sx={{
                fontSize: "0.75rem",
                color: "text.secondary",
                display: "block",
              }}
            >
              Images, videos & documents
            </Box>
          </ListItemText>
        </MenuItem>

        <MenuItem onClick={handleAdvancedAttachment}>
          <ListItemIcon>
            <AttachFile />
          </ListItemIcon>
          <ListItemText>
            Advanced Upload
            <Box
              component="span"
              sx={{
                fontSize: "0.75rem",
                color: "text.secondary",
                display: "block",
              }}
            >
              Multiple files, progress tracking
            </Box>
          </ListItemText>
        </MenuItem>
      </Menu>

      {/* Advanced Attachment Dialog */}
      <AttachmentHandler
        open={attachmentDialogOpen}
        onClose={() => setAttachmentDialogOpen(false)}
        onAttachmentsReady={handleAttachmentsReady}
      />
    </Paper>
  );
};

export default MessageComposer;
