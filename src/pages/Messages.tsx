import React from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  TextField,
  IconButton,
  Badge,
  useTheme,
} from "@mui/material";
import { Send, AttachFile, MoreVert } from "@mui/icons-material";

const Messages: React.FC = () => {
  const theme = useTheme();

  const conversations = [
    {
      id: 1,
      name: "John Smith",
      company: "TechStart Solutions",
      lastMessage:
        "Thanks for your interest in our company. When would be a good time to discuss?",
      timestamp: "2h ago",
      unread: 2,
      avatar: "JS",
      online: true,
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "Green Energy Co.",
      lastMessage: "I've attached the financial documents you requested.",
      timestamp: "1d ago",
      unread: 0,
      avatar: "SJ",
      online: false,
    },
    {
      id: 3,
      name: "Mike Chen",
      company: "HealthTech Innovations",
      lastMessage:
        "The due diligence phase is progressing well. Let's schedule a follow-up.",
      timestamp: "2d ago",
      unread: 1,
      avatar: "MC",
      online: true,
    },
    {
      id: 4,
      name: "Emily Davis",
      company: "Urban Retail Chain",
      lastMessage: "Looking forward to our meeting next week.",
      timestamp: "3d ago",
      unread: 0,
      avatar: "ED",
      online: false,
    },
  ];

  const currentMessages = [
    {
      id: 1,
      sender: "John Smith",
      message:
        "Hi there! I saw your profile and I'm interested in discussing a potential acquisition.",
      timestamp: "10:30 AM",
      isOwn: false,
    },
    {
      id: 2,
      sender: "You",
      message:
        "Hello John! Thank you for reaching out. I'd be happy to discuss this opportunity. Could you tell me more about your company?",
      timestamp: "10:35 AM",
      isOwn: true,
    },
    {
      id: 3,
      sender: "John Smith",
      message:
        "Absolutely! TechStart Solutions is a SaaS platform serving project management needs. We've been growing at 45% YoY and are profitable.",
      timestamp: "10:40 AM",
      isOwn: false,
    },
    {
      id: 4,
      sender: "John Smith",
      message:
        "Thanks for your interest in our company. When would be a good time to discuss?",
      timestamp: "2:15 PM",
      isOwn: false,
    },
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}
      >
        Messages
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Communicate directly with business owners and brokers
      </Typography>

      <Box
        sx={{
          display: "flex",
          height: "600px",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {/* Conversations List */}
        <Paper
          sx={{
            width: "350px",
            borderRadius: "12px 0 0 12px",
            borderRight: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Box
            sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Conversations
            </Typography>
          </Box>
          <List
            sx={{ p: 0, maxHeight: "calc(600px - 73px)", overflow: "auto" }}
          >
            {conversations.map((conversation) => (
              <React.Fragment key={conversation.id}>
                <ListItem
                  button
                  selected={conversation.id === 1}
                  sx={{
                    py: 2,
                    "&.Mui-selected": {
                      backgroundColor: theme.palette.primary.main + "10",
                      borderRight: `3px solid ${theme.palette.primary.main}`,
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      variant="dot"
                      color="success"
                      invisible={!conversation.online}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                    >
                      <Avatar
                        sx={{
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        }}
                      >
                        {conversation.avatar}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                        >
                          {conversation.name}
                        </Typography>
                        {conversation.unread > 0 && (
                          <Badge
                            badgeContent={conversation.unread}
                            color="primary"
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: "block" }}
                        >
                          {conversation.company}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "200px",
                          }}
                        >
                          {conversation.lastMessage}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {conversation.timestamp}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Paper>

        {/* Chat Area */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Chat Header */}
          <Paper
            sx={{
              p: 2,
              borderRadius: "0 12px 0 0",
              borderBottom: `1px solid ${theme.palette.divider}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  mr: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }}
              >
                JS
              </Avatar>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  John Smith
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  TechStart Solutions • Online
                </Typography>
              </Box>
            </Box>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Paper>

          {/* Messages */}
          <Box
            sx={{
              flex: 1,
              p: 2,
              overflow: "auto",
              backgroundColor: theme.palette.grey[50],
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {currentMessages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: "flex",
                  justifyContent: message.isOwn ? "flex-end" : "flex-start",
                }}
              >
                <Paper
                  sx={{
                    p: 2,
                    maxWidth: "70%",
                    backgroundColor: message.isOwn
                      ? theme.palette.primary.main
                      : theme.palette.background.paper,
                    color: message.isOwn ? "white" : "text.primary",
                    borderRadius: message.isOwn
                      ? "18px 18px 4px 18px"
                      : "18px 18px 18px 4px",
                  }}
                >
                  <Typography variant="body2">{message.message}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      mt: 0.5,
                      opacity: 0.8,
                      textAlign: "right",
                    }}
                  >
                    {message.timestamp}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Box>

          {/* Message Input */}
          <Box
            sx={{
              p: 2,
              borderTop: `1px solid ${theme.palette.divider}`,
              backgroundColor: theme.palette.background.paper,
              borderRadius: "0 0 12px 0",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton size="small">
                <AttachFile />
              </IconButton>
              <TextField
                fullWidth
                placeholder="Type your message..."
                variant="outlined"
                size="small"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 3,
                  },
                }}
              />
              <IconButton
                color="primary"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  color: "white",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                <Send />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Messages;
