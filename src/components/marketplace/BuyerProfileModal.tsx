import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Avatar,
  Box,
  Chip,
  Button,
  IconButton,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
  Stack,
  Link,
  Card,
  CardContent,
} from "@mui/material";
import {
  Close,
  ThumbUp,
  ThumbDown,
  Business,
  LocationOn,
  TrendingUp,
  Schedule,
  Verified,
  LinkedIn,
  Language,
  Email,
  Star,
} from "@mui/icons-material";
import type { BuyerProfile } from "../../types/buyer";

interface BuyerProfileModalProps {
  buyer: BuyerProfile | null;
  open: boolean;
  onClose: () => void;
  onAccept: (buyerId: string) => void;
  onReject: (buyerId: string) => void;
  disabled?: boolean;
}

const BuyerProfileModal: React.FC<BuyerProfileModalProps> = ({
  buyer,
  open,
  onClose,
  onAccept,
  onReject,
  disabled = false,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  if (!buyer) return null;

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
        return "📈 Some experience (1-2 deals)";
      case "experienced":
        return "🏆 Experienced (3-5 deals)";
      case "serial-acquirer":
        return "🚀 Serial acquirer (5+ deals)";
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
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : 4,
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle sx={{ p: 3, pb: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar
              src={buyer.profilePicture}
              sx={{
                width: 60,
                height: 60,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                fontSize: "1.25rem",
                fontWeight: 600,
              }}
            >
              {buyer.avatar}
            </Avatar>

            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {buyer.firstName} {buyer.lastName}
                </Typography>
                {buyer.verifiedStatus && (
                  <Verified
                    sx={{ color: theme.palette.success.main, fontSize: 24 }}
                  />
                )}
              </Box>

              {buyer.company && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <Business sx={{ fontSize: 18 }} />
                  {buyer.title} at {buyer.company}
                </Typography>
              )}

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  mt: 0.5,
                }}
              >
                <Schedule sx={{ fontSize: 16 }} />
                {getLastActiveText()}
              </Typography>
            </Box>
          </Box>

          <IconButton onClick={onClose} sx={{ borderRadius: 2 }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Investment Profile */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%", borderRadius: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <TrendingUp sx={{ color: theme.palette.success.main }} />
                  Investment Profile
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Investment Range
                  </Typography>
                  <Chip
                    label={formatInvestmentRange()}
                    color="success"
                    variant="filled"
                    sx={{ fontWeight: 600, fontSize: "1rem", borderRadius: 2 }}
                  />
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Target Industries
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {buyer.industries.map((industry) => (
                      <Chip
                        key={industry}
                        label={industry}
                        color="primary"
                        variant="outlined"
                        sx={{ borderRadius: 2 }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Experience Level
                  </Typography>
                  <Chip
                    label={getExperienceLabel()}
                    color="secondary"
                    variant="filled"
                    sx={{ borderRadius: 2 }}
                  />
                  {buyer.totalDeals && buyer.totalDeals > 0 && (
                    <Chip
                      label={`${buyer.totalDeals} total deals completed`}
                      color="info"
                      variant="outlined"
                      sx={{ ml: 1, borderRadius: 2 }}
                    />
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Location & Preferences */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: "100%", borderRadius: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <LocationOn sx={{ color: theme.palette.info.main }} />
                  Location & Preferences
                </Typography>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Preferred Locations
                  </Typography>
                  {buyer.preferredLocations.length > 0 ? (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                      {buyer.preferredLocations.map((location) => (
                        <Chip
                          key={location}
                          label={location}
                          variant="outlined"
                          sx={{ borderRadius: 2 }}
                        />
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No specific location preferences
                    </Typography>
                  )}
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Remote Business Interest
                  </Typography>
                  <Chip
                    label={
                      buyer.remoteBusinessInterest
                        ? "Open to remote businesses"
                        : "Prefers local businesses"
                    }
                    color={buyer.remoteBusinessInterest ? "success" : "default"}
                    variant="outlined"
                    sx={{ borderRadius: 2 }}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Timeline to Close
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {buyer.timelineToClose || "Not specified"}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Investment Goals */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Star sx={{ color: theme.palette.warning.main }} />
                  Investment Goals & Support Needed
                </Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      Investment Goals
                    </Typography>
                    {buyer.investmentGoals.length > 0 ? (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {buyer.investmentGoals.map((goal) => (
                          <Chip
                            key={goal}
                            label={goal}
                            color="secondary"
                            variant="outlined"
                            sx={{ borderRadius: 2 }}
                          />
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No specific goals listed
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      Support Needed
                    </Typography>
                    {buyer.supportNeeded.length > 0 ? (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {buyer.supportNeeded.map((support) => (
                          <Chip
                            key={support}
                            label={support}
                            color="info"
                            variant="outlined"
                            sx={{ borderRadius: 2 }}
                          />
                        ))}
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        No support needs specified
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Bio */}
          <Grid item xs={12}>
            <Card sx={{ borderRadius: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  About {buyer.firstName}
                </Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                  {buyer.bio}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Contact Information */}
          {(buyer.email || buyer.linkedIn || buyer.website) && (
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    Contact Information
                  </Typography>

                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    {buyer.email && (
                      <Button
                        startIcon={<Email />}
                        variant="outlined"
                        href={`mailto:${buyer.email}`}
                        sx={{ borderRadius: 2 }}
                      >
                        Email
                      </Button>
                    )}

                    {buyer.linkedIn && (
                      <Button
                        startIcon={<LinkedIn />}
                        variant="outlined"
                        href={`https://linkedin.com/in/${buyer.linkedIn}`}
                        target="_blank"
                        sx={{ borderRadius: 2 }}
                      >
                        LinkedIn
                      </Button>
                    )}

                    {buyer.website && (
                      <Button
                        startIcon={<Language />}
                        variant="outlined"
                        href={buyer.website}
                        target="_blank"
                        sx={{ borderRadius: 2 }}
                      >
                        Website
                      </Button>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>
      </DialogContent>

      <Divider />

      <DialogActions sx={{ p: 3, justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Close
        </Button>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            startIcon={<ThumbDown />}
            onClick={() => onReject(buyer.id)}
            disabled={disabled}
            variant="outlined"
            color="error"
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
            }}
          >
            Reject
          </Button>

          <Button
            startIcon={<ThumbUp />}
            onClick={() => onAccept(buyer.id)}
            disabled={disabled}
            variant="contained"
            color="success"
            sx={{
              borderRadius: 2,
              px: 3,
              fontWeight: 600,
              background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
              "&:hover": {
                background: `linear-gradient(45deg, ${theme.palette.success.dark}, ${theme.palette.success.main})`,
              },
            }}
          >
            Accept Buyer
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default BuyerProfileModal;
