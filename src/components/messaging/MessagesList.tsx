import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Stack,
  Chip,
  useTheme,
  Divider,
  Badge,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Business, VideoCall, Phone, MoreVert } from "@mui/icons-material";
import type { Message, Match, MessageAttachment } from "../../types/match";
import MessageBubble from "./MessageBubble";
import MessageComposer from "./MessageComposer";

interface MessagesListProps {
  match: Match;
  messages: Message[];
  currentUserId: string;
  onSendMessage: (content: string, attachments?: MessageAttachment[]) => void;
}

const MessagesList: React.FC<MessagesListProps> = ({
  match,
  messages,
  currentUserId,
  onSendMessage,
}) => {
  const theme = useTheme();
  const [newMessage, setNewMessage] = useState("");
  const [isOnline, setIsOnline] = useState(Math.random() > 0.3); // Mock online status
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (
    content: string,
    attachments?: MessageAttachment[]
  ) => {
    if (content.trim() || (attachments && attachments.length > 0)) {
      onSendMessage(content, attachments);
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
    const showAvatar =
      !isCurrentUser &&
      message.type !== "system" &&
      (index === 0 || messages[index - 1]?.senderId !== message.senderId);

    const otherParty = getOtherParty();

    return (
      <MessageBubble
        key={message.id}
        message={message}
        isCurrentUser={isCurrentUser}
        showAvatar={showAvatar}
        senderAvatar={otherParty.avatar}
        senderName={`${otherParty.firstName} ${otherParty.lastName}`}
      />
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
          <Badge
            badgeContent=""
            color="success"
            variant="dot"
            invisible={!isOnline}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
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
          </Badge>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {getOtherParty().firstName} {getOtherParty().lastName}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {getOtherParty().company && (
                <Typography variant="body2" color="text.secondary">
                  {getOtherParty().title ? `${getOtherParty().title} at ` : ""}
                  {getOtherParty().company}
                </Typography>
              )}
              {isOnline && (
                <Chip
                  label="Online"
                  size="small"
                  color="success"
                  variant="outlined"
                  sx={{ height: 20, fontSize: "0.7rem" }}
                />
              )}
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Video call">
              <IconButton size="small" color="primary">
                <VideoCall />
              </IconButton>
            </Tooltip>

            <Tooltip title="Voice call">
              <IconButton size="small" color="primary">
                <Phone />
              </IconButton>
            </Tooltip>

            <Tooltip title="More options">
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </Tooltip>
          </Box>

          {match.business && (
            <Box>
              <Chip
                icon={<Business />}
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

      {/* Message Composer */}
      <MessageComposer
        value={newMessage}
        onChange={setNewMessage}
        onSendMessage={handleSendMessage}
        placeholder="Type a message..."
      />
    </Box>
  );
};

export default MessagesList;
