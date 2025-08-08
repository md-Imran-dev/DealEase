import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  Box,
  Chip,
  Button,
  IconButton,
  Tooltip,
  useTheme,
  Stack,
  Divider,
} from "@mui/material";
import {
  ThumbUp,
  ThumbDown,
  Visibility,
  LocationOn,
  Business,
  TrendingUp,
  Verified,
  Schedule,
} from "@mui/icons-material";
import type { BuyerProfile } from "../../types/buyer";

interface BuyerCardProps {
  buyer: BuyerProfile;
  onAccept: (buyerId: string) => void;
  onReject: (buyerId: string) => void;
  onViewDetails: (buyerId: string) => void;
  disabled?: boolean;
}

const BuyerCard: React.FC<BuyerCardProps> = ({
  buyer,
  onAccept,
  onReject,
  onViewDetails,
  disabled = false,
}) => {
  const theme = useTheme();

  const formatInvestmentRange = () => {
    const formatAmount = (amount: number) => {
      if (amount >= 1000000) {
        return `$${(amount / 1000000).toFixed(1)}M`;
      }
      return `$${(amount / 1000).toFixed(0)}K`;
    };
    return `${formatAmount(buyer.investmentRangeMin)} - ${formatAmount(
      buyer.investmentRangeMax
    )}`;
  };

  const getExperienceLabel = () => {
    switch (buyer.acquisitionExperience) {
      case "first-time":
        return "🌱 First-time buyer";
      case "some-experience":
        return "📈 Some experience";
      case "experienced":
        return "🏆 Experienced";
      case "serial-acquirer":
        return "🚀 Serial acquirer";
      default:
        return "Unknown";
    }
  };

  const getLastActiveText = () => {
    if (!buyer.lastActive) return "Unknown";
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - buyer.lastActive.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Active today";
    if (diffDays === 1) return "Active yesterday";
    if (diffDays < 7) return `Active ${diffDays} days ago`;
    if (diffDays < 30) return `Active ${Math.floor(diffDays / 7)} weeks ago`;
    return `Active ${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        transition: "all 0.3s ease",
        border: "1px solid",
        borderColor: disabled ? theme.palette.grey[300] : "transparent",
        opacity: disabled ? 0.7 : 1,
        "&:hover": {
          transform: disabled ? "none" : "translateY(-4px)",
          boxShadow: disabled ? 1 : 4,
          borderColor: disabled
            ? theme.palette.grey[300]
            : theme.palette.primary.main,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        {/* Header with Avatar and Basic Info */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar
            src={buyer.profilePicture}
            sx={{
              width: 60,
              height: 60,
              mr: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              fontSize: "1.25rem",
              fontWeight: 600,
            }}
          >
            {buyer.avatar}
          </Avatar>

          <Box sx={{ flexGrow: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {buyer.firstName} {buyer.lastName}
              </Typography>
              {buyer.verifiedStatus && (
                <Tooltip title="Verified Buyer">
                  <Verified
                    sx={{ color: theme.palette.success.main, fontSize: 20 }}
                  />
                </Tooltip>
              )}
            </Box>

            {buyer.company && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
              >
                <Business sx={{ fontSize: 16 }} />
                {buyer.title} at {buyer.company}
              </Typography>
            )}

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.5 }}
            >
              <Schedule sx={{ fontSize: 14 }} />
              {getLastActiveText()}
            </Typography>
          </Box>
        </Box>

        {/* Investment Range */}
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              mb: 1,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <TrendingUp
              sx={{ fontSize: 18, color: theme.palette.success.main }}
            />
            Investment Range
          </Typography>
          <Chip
            label={formatInvestmentRange()}
            color="success"
            variant="outlined"
            sx={{
              fontWeight: 600,
              fontSize: "0.875rem",
              borderRadius: 2,
            }}
          />
        </Box>

        {/* Target Industries */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            Target Industries
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {buyer.industries.slice(0, 3).map((industry) => (
              <Chip
                key={industry}
                label={industry}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ borderRadius: 2, fontSize: "0.75rem" }}
              />
            ))}
            {buyer.industries.length > 3 && (
              <Chip
                label={`+${buyer.industries.length - 3} more`}
                size="small"
                variant="outlined"
                sx={{ borderRadius: 2, fontSize: "0.75rem" }}
              />
            )}
          </Box>
        </Box>

        {/* Experience & Location */}
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Chip
              label={getExperienceLabel()}
              size="small"
              color="secondary"
              variant="filled"
              sx={{ borderRadius: 2, fontSize: "0.75rem" }}
            />
            {buyer.totalDeals && buyer.totalDeals > 0 && (
              <Chip
                label={`${buyer.totalDeals} deals`}
                size="small"
                color="info"
                variant="outlined"
                sx={{ borderRadius: 2, fontSize: "0.75rem" }}
              />
            )}
          </Stack>

          {buyer.preferredLocations.length > 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <LocationOn sx={{ fontSize: 16 }} />
              {buyer.preferredLocations.slice(0, 2).join(", ")}
              {buyer.preferredLocations.length > 2 &&
                ` +${buyer.preferredLocations.length - 2} more`}
              {buyer.remoteBusinessInterest && " • Remote OK"}
            </Typography>
          )}
        </Box>

        {/* Bio Preview */}
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            About
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.4,
            }}
          >
            {buyer.bio}
          </Typography>
        </Box>
      </CardContent>

      <Divider />

      {/* Action Buttons */}
      <CardActions sx={{ p: 2, justifyContent: "space-between" }}>
        <Button
          startIcon={<Visibility />}
          onClick={() => onViewDetails(buyer.id)}
          variant="outlined"
          size="small"
          sx={{
            borderRadius: 2,
            fontWeight: 600,
            flexGrow: 1,
            mr: 1,
          }}
        >
          View Details
        </Button>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="Reject this buyer">
            <IconButton
              onClick={() => onReject(buyer.id)}
              disabled={disabled}
              sx={{
                color: theme.palette.error.main,
                border: `1px solid ${theme.palette.error.main}`,
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: `${theme.palette.error.main}08`,
                },
              }}
            >
              <ThumbDown />
            </IconButton>
          </Tooltip>

          <Tooltip title="Accept this buyer">
            <IconButton
              onClick={() => onAccept(buyer.id)}
              disabled={disabled}
              sx={{
                color: theme.palette.success.main,
                border: `1px solid ${theme.palette.success.main}`,
                borderRadius: 2,
                "&:hover": {
                  backgroundColor: `${theme.palette.success.main}08`,
                },
              }}
            >
              <ThumbUp />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
};

export default BuyerCard;
