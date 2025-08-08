import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Paper,
  Stack,
  Chip,
  useTheme,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  Send,
  AttachFile,
  EmojiEmotions,
  Schedule,
  Check,
  DoneAll,
} from "@mui/icons-material";
import type { Message, Match } from "../../types/match";

interface MessagesListProps {
  match: Match;
  messages: Message[];
  currentUserId: string;
  onSendMessage: (content: string) => void;
}

const MessagesList: React.FC<MessagesListProps> = ({
  match,
  messages,
  currentUserId,
  onSendMessage,
}) => {
  const theme = useTheme();
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

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

  const getOtherParty = () => {
    return currentUserId === match.buyerId ? match.seller : match.buyer;
  };

  const getCurrentParty = () => {
    return currentUserId === match.buyerId ? match.buyer : match.seller;
  };

  const renderMessage = (message: Message, index: number) => {
    const isCurrentUser = message.senderId === currentUserId;
    const isSystem = message.type === "system";
    const showAvatar =
      !isCurrentUser &&
      !isSystem &&
      (index === 0 || messages[index - 1]?.senderId !== message.senderId);

    if (isSystem) {
      return (
        <Box
          key={message.id}
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

    return (
      <Box
        key={message.id}
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
            src={getOtherParty().profilePicture}
            sx={{
              width: 32,
              height: 32,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          >
            {getOtherParty().avatar}
          </Avatar>
        )}

        {!showAvatar && !isCurrentUser && (
          <Box sx={{ width: 32 }} /> // Spacer
        )}

        <Paper
          sx={{
            maxWidth: "70%",
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
      </Box>
    );
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <Paper
        sx={{
          p: 2,
          borderRadius: 0,
          borderBottom: "1px solid",
          borderColor: theme.palette.divider,
          background: theme.palette.grey[50],
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={getOtherParty().profilePicture}
            sx={{
              width: 40,
              height: 40,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            }}
          >
            {getOtherParty().avatar}
          </Avatar>

          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {getOtherParty().firstName} {getOtherParty().lastName}
            </Typography>
            {getOtherParty().company && (
              <Typography variant="body2" color="text.secondary">
                {getOtherParty().title} at {getOtherParty().company}
              </Typography>
            )}
          </Box>

          {match.business && (
            <Box sx={{ ml: "auto" }}>
              <Chip
                label={match.business.name}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Box>
          )}
        </Box>
      </Paper>

      {/* Messages */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          p: 2,
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Stack spacing={0.5}>
          {messages.map((message, index) => renderMessage(message, index))}
        </Stack>
        <div ref={messagesEndRef} />
      </Box>

      {/* Message Input */}
      <Paper
        sx={{
          p: 2,
          borderRadius: 0,
          borderTop: "1px solid",
          borderColor: theme.palette.divider,
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={3}
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton size="small" edge="start">
                  <EmojiEmotions />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small">
                  <AttachFile />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  edge="end"
                  sx={{
                    backgroundColor: newMessage.trim()
                      ? theme.palette.primary.main
                      : "transparent",
                    color: newMessage.trim()
                      ? theme.palette.primary.contrastText
                      : theme.palette.text.disabled,
                    "&:hover": {
                      backgroundColor: newMessage.trim()
                        ? theme.palette.primary.dark
                        : "transparent",
                    },
                  }}
                >
                  <Send />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
            },
          }}
        />
      </Paper>
    </Box>
  );
};

export default MessagesList;
