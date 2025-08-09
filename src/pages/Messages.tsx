import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Badge,
  Divider,
  useTheme,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Message as MessageIcon,
  Schedule,
  Business,
  Add,
  Archive,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { useMatch } from "../contexts/MatchContext";
import MessagesList from "../components/messaging/MessagesList";
import ConversationFilters from "../components/messaging/ConversationFilters";
import MessageNotification from "../components/messaging/MessageNotification";
import type { Match, MatchFilters } from "../types/match";

const Messages: React.FC = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { getMatchesByUser, getMessagesByMatch, sendMessage } = useMatch();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<MatchFilters>({});
  const [notificationMessage, setNotificationMessage] = useState<any>(null);
  const [notificationMatch, setNotificationMatch] = useState<Match | null>(
    null
  );
  const [showNotification, setShowNotification] = useState(false);

  // Get matches for current user
  const userMatches = useMemo(() => {
    if (!user?.id) return [];
    const matches = getMatchesByUser(user.id);
    return matches.filter((match) => match.status === "active");
  }, [user?.id, getMatchesByUser]);

  // Filter matches based on search and filters
  const filteredMatches = useMemo(() => {
    let filtered = userMatches;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((match) => {
        const otherParty =
          user?.id === match.buyerId ? match.seller : match.buyer;
        const business = match.business;
        const searchLower = searchTerm.toLowerCase();

        return (
          otherParty.firstName.toLowerCase().includes(searchLower) ||
          otherParty.lastName.toLowerCase().includes(searchLower) ||
          otherParty.company?.toLowerCase().includes(searchLower) ||
          business?.name.toLowerCase().includes(searchLower) ||
          match.lastMessage?.content.toLowerCase().includes(searchLower)
        );
      });
    }

    // Apply additional filters
    if (filters.hasUnreadMessages) {
      filtered = filtered.filter((match) => {
        const unreadCount =
          user?.id === match.buyerId
            ? match.unreadCount.buyer
            : match.unreadCount.seller;
        return unreadCount > 0;
      });
    }

    if (filters.status && filters.status.length > 0) {
      filtered = filtered.filter((match) =>
        filters.status!.includes(match.status)
      );
    }

    if (filters.dealStage && filters.dealStage.length > 0) {
      filtered = filtered.filter(
        (match) =>
          match.dealStage && filters.dealStage!.includes(match.dealStage)
      );
    }

    if (filters.lastActivityDays) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - filters.lastActivityDays);
      filtered = filtered.filter((match) => match.lastActivity >= cutoffDate);
    }

    return filtered;
  }, [userMatches, searchTerm, filters, user?.id]);

  // Get messages for selected match
  const selectedMatchMessages = useMemo(() => {
    if (!selectedMatch) return [];
    return getMessagesByMatch(selectedMatch.id);
  }, [selectedMatch, getMessagesByMatch]);

  const getOtherParty = (match: Match) => {
    return user?.id === match.buyerId ? match.seller : match.buyer;
  };

  const getUnreadCount = (match: Match) => {
    return user?.id === match.buyerId
      ? match.unreadCount.buyer
      : match.unreadCount.seller;
  };

  const formatLastMessageTime = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
      return "now";
    } else if (diffMinutes < 60) {
      return `${diffMinutes}m`;
    } else if (diffHours < 24) {
      return `${diffHours}h`;
    } else if (diffDays < 7) {
      return `${diffDays}d`;
    } else {
      return timestamp.toLocaleDateString();
    }
  };

  // Simulate new message notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly show notification for demo purposes
      if (Math.random() > 0.7 && filteredMatches.length > 0) {
        const randomMatch =
          filteredMatches[Math.floor(Math.random() * filteredMatches.length)];
        const mockMessage = {
          id: `msg-${Date.now()}`,
          matchId: randomMatch.id,
          senderId:
            randomMatch.buyerId === user?.id
              ? randomMatch.sellerId
              : randomMatch.buyerId,
          receiverId: user?.id || "",
          content: "Hey, I wanted to follow up on our discussion...",
          timestamp: new Date(),
          type: "text" as const,
        };

        setNotificationMessage(mockMessage);
        setNotificationMatch(randomMatch);
        setShowNotification(true);
      }
    }, 30000); // Show demo notification every 30 seconds

    return () => clearInterval(interval);
  }, [filteredMatches, user?.id]);

  const handleSendMessage = async (content: string, attachments?: any) => {
    if (selectedMatch && user?.id) {
      // In a real app, you'd handle attachments properly
      await sendMessage(selectedMatch.id, content, attachments);
    }
  };

  const handleNotificationReply = () => {
    if (notificationMatch) {
      setSelectedMatch(notificationMatch);
    }
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    setNotificationMessage(null);
    setNotificationMatch(null);
  };

  if (!user) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6">
          Please log in to view your messages.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "calc(100vh - 120px)" }}>
      <Grid container sx={{ height: "100%" }}>
        {/* Conversations List */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              height: "100%",
              borderRadius: 0,
              borderRight: "1px solid",
              borderColor: theme.palette.divider,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <Box
              sx={{
                borderBottom: "1px solid",
                borderColor: theme.palette.divider,
              }}
            >
              <Box sx={{ p: 2, pb: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Messages
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Tooltip title="New conversation">
                      <IconButton size="small" color="primary">
                        <Add />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Archive">
                      <IconButton size="small">
                        <Archive />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>

              <ConversationFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filters={filters}
                onFiltersChange={setFilters}
                totalConversations={userMatches.length}
                filteredConversations={filteredMatches.length}
              />
            </Box>

            {/* Conversations */}
            <Box sx={{ flexGrow: 1, overflow: "auto" }}>
              {filteredMatches.length > 0 ? (
                <List sx={{ p: 0 }}>
                  {filteredMatches
                    .sort((a, b) => {
                      const aTime = a.lastMessage?.timestamp || a.lastActivity;
                      const bTime = b.lastMessage?.timestamp || b.lastActivity;
                      return bTime.getTime() - aTime.getTime();
                    })
                    .map((match) => {
                      const otherParty = getOtherParty(match);
                      const unreadCount = getUnreadCount(match);
                      const isSelected = selectedMatch?.id === match.id;

                      return (
                        <React.Fragment key={match.id}>
                          <ListItem
                            button
                            selected={isSelected}
                            onClick={() => setSelectedMatch(match)}
                            sx={{
                              py: 2,
                              px: 2,
                              "&.Mui-selected": {
                                backgroundColor:
                                  theme.palette.primary.main + "08",
                                borderRight: `3px solid ${theme.palette.primary.main}`,
                              },
                              "&:hover": {
                                backgroundColor: theme.palette.grey[50],
                              },
                            }}
                          >
                            <ListItemAvatar>
                              <Badge
                                badgeContent={
                                  unreadCount > 0 ? unreadCount : undefined
                                }
                                color="error"
                                overlap="circular"
                              >
                                <Avatar
                                  src={otherParty.profilePicture}
                                  sx={{
                                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                  }}
                                >
                                  {otherParty.avatar}
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
                                    mb: 0.5,
                                  }}
                                >
                                  <Typography
                                    variant="subtitle2"
                                    sx={{
                                      fontWeight: unreadCount > 0 ? 600 : 500,
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                    }}
                                  >
                                    {otherParty.firstName} {otherParty.lastName}
                                  </Typography>

                                  {match.lastMessage && (
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      sx={{ ml: 1, flexShrink: 0 }}
                                    >
                                      {formatLastMessageTime(
                                        match.lastMessage.timestamp
                                      )}
                                    </Typography>
                                  )}
                                </Box>
                              }
                              secondary={
                                <Box>
                                  {match.business && (
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                        mb: 0.5,
                                      }}
                                    >
                                      <Business sx={{ fontSize: 12 }} />
                                      {match.business.name}
                                    </Typography>
                                  )}

                                  {match.lastMessage && (
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      sx={{
                                        fontWeight: unreadCount > 0 ? 500 : 400,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                      }}
                                    >
                                      {match.lastMessage.content}
                                    </Typography>
                                  )}
                                </Box>
                              }
                            />
                          </ListItem>
                          <Divider />
                        </React.Fragment>
                      );
                    })}
                </List>
              ) : (
                <Box sx={{ p: 3, textAlign: "center" }}>
                  <MessageIcon
                    sx={{ fontSize: 48, color: theme.palette.grey[400], mb: 2 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {userMatches.length === 0
                      ? "No conversations yet. Start by accepting buyers in the marketplace!"
                      : "No conversations match your search."}
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Messages Area */}
        <Grid item xs={12} md={8} lg={9}>
          {selectedMatch && user ? (
            <MessagesList
              match={selectedMatch}
              messages={selectedMatchMessages}
              currentUserId={user.id}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <Paper
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 0,
              }}
            >
              <Box sx={{ textAlign: "center" }}>
                <MessageIcon
                  sx={{ fontSize: 64, color: theme.palette.grey[400], mb: 2 }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  Select a conversation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Choose a conversation from the list to start messaging
                </Typography>
              </Box>
            </Paper>
          )}
        </Grid>
      </Grid>

      {/* Message Notifications */}
      <MessageNotification
        message={notificationMessage}
        match={notificationMatch}
        open={showNotification}
        onClose={handleCloseNotification}
        onReply={handleNotificationReply}
      />
    </Box>
  );
};

export default Messages;
