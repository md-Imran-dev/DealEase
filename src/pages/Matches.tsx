import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  IconButton,
  Divider,
  useTheme,
  Stack,
  Badge,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";
import {
  Search,
  Message,
  Business,
  Schedule,
  Star,
  MoreVert,
  VideoCall,
  Archive,
} from "@mui/icons-material";
import { useUserStore } from "../store/userStore";
import { useMatchStore } from "../store/matchStore";
import type { Match } from "../types/match";

const Matches: React.FC = () => {
  const theme = useTheme();
  const { user } = useUserStore();
  const { getMatchesByUser, updateMatchStatus } = useMatchStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("active");
  const [stageFilter, setStageFilter] = useState<string>("all");

  // Get matches for current user
  const userMatches = useMemo(() => {
    if (!user?.id) return [];
    return getMatchesByUser(user.id);
  }, [user?.id, getMatchesByUser]);

  // Filter matches
  const filteredMatches = useMemo(() => {
    return userMatches.filter((match) => {
      // Status filter
      if (statusFilter !== "all" && match.status !== statusFilter) {
        return false;
      }

      // Stage filter
      if (stageFilter !== "all" && match.dealStage !== stageFilter) {
        return false;
      }

      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const otherParty =
          user?.id === match.buyerId ? match.seller : match.buyer;
        const business = match.business;

        const matchesSearch =
          otherParty.firstName.toLowerCase().includes(searchLower) ||
          otherParty.lastName.toLowerCase().includes(searchLower) ||
          otherParty.company?.toLowerCase().includes(searchLower) ||
          business?.name.toLowerCase().includes(searchLower) ||
          business?.industry.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [userMatches, statusFilter, stageFilter, searchTerm, user?.id]);

  const getOtherParty = (match: Match) => {
    return user?.id === match.buyerId ? match.seller : match.buyer;
  };

  const getUserRole = (match: Match) => {
    return user?.id === match.buyerId ? "buyer" : "seller";
  };

  const getDealStageColor = (stage: Match["dealStage"]) => {
    switch (stage) {
      case "initial-contact":
        return theme.palette.info.main;
      case "interest-confirmed":
        return theme.palette.primary.main;
      case "due-diligence":
        return theme.palette.warning.main;
      case "negotiation":
        return theme.palette.secondary.main;
      case "closing":
        return theme.palette.success.main;
      case "completed":
        return theme.palette.grey[600];
      default:
        return theme.palette.grey[500];
    }
  };

  const getDealStageLabel = (stage: Match["dealStage"]) => {
    switch (stage) {
      case "initial-contact":
        return "Initial Contact";
      case "interest-confirmed":
        return "Interest Confirmed";
      case "due-diligence":
        return "Due Diligence";
      case "negotiation":
        return "Negotiation";
      case "closing":
        return "Closing";
      case "completed":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const getTimeSinceLastActivity = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
    } else {
      return "Just now";
    }
  };

  const handleArchiveMatch = async (matchId: string) => {
    await updateMatchStatus(matchId, "archived");
  };

  if (!user) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6">
          Please log in to view your matches.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}
        >
          My Matches
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your connections and track deal progress
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr auto" },
            gap: 3,
            alignItems: "center",
          }}
        >
          <TextField
            fullWidth
            placeholder="Search matches, businesses, or people..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />

          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              label="Status"
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ borderRadius: 3 }}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="archived">Archived</MenuItem>
              <MenuItem value="blocked">Blocked</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Deal Stage</InputLabel>
            <Select
              value={stageFilter}
              label="Deal Stage"
              onChange={(e) => setStageFilter(e.target.value)}
              sx={{ borderRadius: 3 }}
            >
              <MenuItem value="all">All Stages</MenuItem>
              <MenuItem value="initial-contact">Initial Contact</MenuItem>
              <MenuItem value="interest-confirmed">Interest Confirmed</MenuItem>
              <MenuItem value="due-diligence">Due Diligence</MenuItem>
              <MenuItem value="negotiation">Negotiation</MenuItem>
              <MenuItem value="closing">Closing</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            {filteredMatches.length} match
            {filteredMatches.length !== 1 ? "es" : ""}
          </Typography>
        </Box>
      </Paper>

      {/* Matches Grid */}
      {filteredMatches.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {filteredMatches.map((match) => {
            const otherParty = getOtherParty(match);
            const userRole = getUserRole(match);
            const unreadCount =
              userRole === "buyer"
                ? match.unreadCount.buyer
                : match.unreadCount.seller;

            return (
              <Card
                key={match.id}
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  transition: "all 0.3s ease",
                  border: "1px solid",
                  borderColor: theme.palette.divider,
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                    borderColor: theme.palette.primary.main,
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  {/* Header with Avatar and Actions */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Badge
                        badgeContent={unreadCount > 0 ? unreadCount : undefined}
                        color="error"
                        overlap="circular"
                      >
                        <Avatar
                          src={otherParty.profilePicture}
                          sx={{
                            width: 50,
                            height: 50,
                            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          }}
                        >
                          {otherParty.avatar}
                        </Avatar>
                      </Badge>

                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {otherParty.firstName} {otherParty.lastName}
                        </Typography>
                        {otherParty.company && (
                          <Typography variant="body2" color="text.secondary">
                            {otherParty.title} at {otherParty.company}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    <IconButton size="small">
                      <MoreVert />
                    </IconButton>
                  </Box>

                  {/* Business Info */}
                  {match.business && (
                    <Box
                      sx={{
                        mb: 2,
                        p: 2,
                        borderRadius: 2,
                        backgroundColor: theme.palette.grey[50],
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 600,
                          mb: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                        }}
                      >
                        <Business sx={{ fontSize: 16 }} />
                        {match.business.name}
                      </Typography>
                      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                        <Typography variant="caption" color="text.secondary">
                          {match.business.industry}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {match.business.revenue} revenue
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {match.business.location}
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {/* Deal Stage and Score */}
                  <Box
                    sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}
                  >
                    <Chip
                      label={getDealStageLabel(match.dealStage)}
                      size="small"
                      sx={{
                        backgroundColor:
                          getDealStageColor(match.dealStage) + "20",
                        color: getDealStageColor(match.dealStage),
                        border: `1px solid ${getDealStageColor(
                          match.dealStage
                        )}40`,
                      }}
                    />

                    {match.matchScore && (
                      <Chip
                        icon={<Star sx={{ fontSize: 16 }} />}
                        label={`${match.matchScore}% match`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    )}
                  </Box>

                  {/* Last Message */}
                  {match.lastMessage && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {match.lastMessage.content}
                      </Typography>
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          mt: 0.5,
                        }}
                      >
                        <Schedule sx={{ fontSize: 12 }} />
                        {getTimeSinceLastActivity(match.lastMessage.timestamp)}
                      </Typography>
                    </Box>
                  )}

                  {/* Next Steps */}
                  {match.nextSteps && match.nextSteps.length > 0 && (
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        Next Steps:
                      </Typography>
                      <Stack spacing={0.5}>
                        {match.nextSteps.slice(0, 2).map((step, index) => (
                          <Typography
                            key={index}
                            variant="caption"
                            color="text.secondary"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            • {step}
                          </Typography>
                        ))}
                        {match.nextSteps.length > 2 && (
                          <Typography variant="caption" color="text.secondary">
                            +{match.nextSteps.length - 2} more
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                  )}

                  <Divider sx={{ my: 2 }} />

                  {/* Action Buttons */}
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      startIcon={<Message />}
                      size="small"
                      fullWidth
                      sx={{
                        borderRadius: 2,
                        fontWeight: 600,
                      }}
                    >
                      Message
                    </Button>

                    <Button
                      variant="outlined"
                      startIcon={<VideoCall />}
                      size="small"
                      sx={{
                        borderRadius: 2,
                        minWidth: "auto",
                        px: 2,
                      }}
                    >
                      Call
                    </Button>

                    <IconButton
                      size="small"
                      onClick={() => handleArchiveMatch(match.id)}
                      sx={{
                        border: "1px solid",
                        borderColor: theme.palette.divider,
                        borderRadius: 2,
                      }}
                    >
                      <Archive sx={{ fontSize: 16 }} />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            );
          })}
        </Box>
      ) : (
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            background: theme.palette.grey[50],
          }}
        >
          <Business
            sx={{ fontSize: 64, color: theme.palette.grey[400], mb: 2 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            No matches found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {userMatches.length === 0
              ? "You don't have any matches yet. Start browsing the marketplace to connect with potential partners!"
              : "Try adjusting your filters or search terms to find more matches."}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => (window.location.href = "/marketplace")}
            sx={{ borderRadius: 2 }}
          >
            Browse Marketplace
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default Matches;
