import React, { useState } from "react";
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
  Card,
  CardContent,
  LinearProgress,
  Rating,
  Badge,
  Tooltip,
  Collapse,
  Alert,
  Paper,
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
  ExpandMore,
  ExpandLess,
  Phone,
  School,
  EmojiEvents,
  Security,
  Speed,
  Psychology,
  AttachMoney,
  Assessment,
  Group,
  Timeline,
} from "@mui/icons-material";
import type { BuyerProfile } from "../../types/buyer";

interface BuyerProfileModalProps {
  buyer: BuyerProfile | null;
  open: boolean;
  onClose: () => void;
  onAccept: (buyerId: string) => void;
  onReject: (buyerId: string) => void;
  disabled?: boolean;
  isMatched?: boolean;
}

const BuyerProfileModal: React.FC<BuyerProfileModalProps> = ({
  buyer,
  open,
  onClose,
  onAccept,
  onReject,
  disabled = false,
  isMatched = false,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    questionnaire: false,
    stats: false,
    endorsements: false,
  });

  if (!buyer) return null;

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    return `$${(amount / 1000).toFixed(0)}K`;
  };

  const formatInvestmentRange = () => {
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

  const getOperationalInvolvementLabel = () => {
    switch (buyer.operationalInvolvement) {
      case "hands-off":
        return "🏖️ Hands-off investor";
      case "advisory":
        return "🎯 Advisory role";
      case "operational":
        return "⚙️ Operational partner";
      case "full-time":
        return "👔 Full-time operator";
      default:
        return "Not specified";
    }
  };

  const getRiskToleranceColor = () => {
    switch (buyer.riskTolerance) {
      case "conservative":
        return theme.palette.success.main;
      case "moderate":
        return theme.palette.warning.main;
      case "aggressive":
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: fullScreen ? 0 : 4,
          maxHeight: "95vh",
          background: theme.palette.grey[50],
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          p: 3,
          pb: 2,
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(248,250,252,0.9) 100%)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                buyer.verifiedStatus ? (
                  <Verified
                    sx={{
                      color: theme.palette.success.main,
                      background: "white",
                      borderRadius: "50%",
                      fontSize: 24,
                    }}
                  />
                ) : null
              }
            >
              <Avatar
                src={buyer.profilePicture}
                sx={{
                  width: 80,
                  height: 80,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  border: "4px solid white",
                  boxShadow: 3,
                }}
              >
                {buyer.avatar}
              </Avatar>
            </Badge>

            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                {buyer.firstName} {buyer.lastName}
              </Typography>

              {buyer.company && (
                <Typography
                  variant="h6"
                  color="text.secondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <Business sx={{ fontSize: 20 }} />
                  {buyer.title} at {buyer.company}
                </Typography>
              )}

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}
              >
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                >
                  <Schedule sx={{ fontSize: 16 }} />
                  {getLastActiveText()}
                </Typography>

                {buyer.profileCompleteness && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Profile:
                    </Typography>
                    <Box sx={{ width: 80 }}>
                      <LinearProgress
                        variant="determinate"
                        value={buyer.profileCompleteness}
                        sx={{
                          height: 6,
                          borderRadius: 3,
                          backgroundColor: theme.palette.grey[200],
                          "& .MuiLinearProgress-bar": {
                            borderRadius: 3,
                            background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                          },
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {buyer.profileCompleteness}%
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Badges */}
              {buyer.badges && buyer.badges.length > 0 && (
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {buyer.badges.slice(0, 3).map((badge) => (
                    <Tooltip key={badge.id} title={badge.description}>
                      <Chip
                        label={`${badge.icon} ${badge.name}`}
                        size="small"
                        sx={{
                          backgroundColor: badge.color + "20",
                          color: badge.color,
                          border: `1px solid ${badge.color}40`,
                          fontWeight: 600,
                        }}
                      />
                    </Tooltip>
                  ))}
                </Box>
              )}
            </Box>
          </Box>

          <IconButton onClick={onClose} sx={{ borderRadius: 2 }}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 0, background: theme.palette.grey[50] }}>
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Investment Overview */}
            <Grid item xs={12} md={4}>
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

                  <Stack spacing={2}>
                    <Box>
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
                        sx={{ fontWeight: 600, fontSize: "1rem" }}
                      />
                    </Box>

                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        Sweet Spot
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {buyer.dealSizeSweet || "Not specified"}
                      </Typography>
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
                    </Box>

                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        Operational Involvement
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {getOperationalInvolvementLabel()}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        Risk Tolerance
                      </Typography>
                      <Chip
                        label={
                          buyer.riskTolerance?.toUpperCase() || "Not specified"
                        }
                        sx={{
                          backgroundColor: getRiskToleranceColor() + "20",
                          color: getRiskToleranceColor(),
                          border: `1px solid ${getRiskToleranceColor()}40`,
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Key Statistics */}
            <Grid item xs={12} md={4}>
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
                    <Assessment sx={{ color: theme.palette.info.main }} />
                    Key Statistics
                  </Typography>

                  <Stack spacing={2}>
                    {buyer.totalDeals && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Total Deals
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {buyer.totalDeals}
                        </Typography>
                      </Box>
                    )}

                    {buyer.totalCapitalDeployed && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Capital Deployed
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {formatAmount(buyer.totalCapitalDeployed)}
                        </Typography>
                      </Box>
                    )}

                    {buyer.averageDealSize && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Avg Deal Size
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {formatAmount(buyer.averageDealSize)}
                        </Typography>
                      </Box>
                    )}

                    {buyer.successfulExits && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Successful Exits
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {buyer.successfulExits}
                        </Typography>
                      </Box>
                    )}

                    {buyer.averageHoldPeriod && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Avg Hold Period
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {buyer.averageHoldPeriod} years
                        </Typography>
                      </Box>
                    )}

                    {buyer.responseRate && (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          Response Rate
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {buyer.responseRate}%
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* Target Industries & Locations */}
            <Grid item xs={12} md={4}>
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
                    <LocationOn sx={{ color: theme.palette.warning.main }} />
                    Focus Areas
                  </Typography>

                  <Stack spacing={2}>
                    <Box>
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
                            size="small"
                            color="primary"
                            variant="outlined"
                            sx={{ borderRadius: 2 }}
                          />
                        ))}
                      </Box>
                    </Box>

                    {buyer.marketFocus && buyer.marketFocus.length > 0 && (
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          Market Focus
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {buyer.marketFocus.map((market) => (
                            <Chip
                              key={market}
                              label={market}
                              size="small"
                              color="secondary"
                              variant="outlined"
                              sx={{ borderRadius: 2 }}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}

                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        Preferred Locations
                      </Typography>
                      {buyer.preferredLocations.length > 0 ? (
                        <Typography variant="body2" color="text.secondary">
                          {buyer.preferredLocations.join(", ")}
                          {buyer.remoteBusinessInterest && " • Remote OK"}
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          No specific preferences
                        </Typography>
                      )}
                    </Box>

                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        Timeline to Close
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {buyer.timelineToClose || "Flexible"}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>

            {/* About Section */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                    About {buyer.firstName}
                  </Typography>
                  <Typography variant="body1" sx={{ lineHeight: 1.6, mb: 2 }}>
                    {buyer.bio}
                  </Typography>

                  {buyer.investmentPhilosophy && (
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 600, mb: 1 }}
                      >
                        Investment Philosophy
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontStyle: "italic" }}
                      >
                        "{buyer.investmentPhilosophy}"
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Expandable Sections */}

            {/* Detailed Questionnaire Answers */}
            <Grid item xs={12}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Button
                    fullWidth
                    onClick={() => toggleSection("questionnaire")}
                    sx={{
                      justifyContent: "space-between",
                      textTransform: "none",
                      fontWeight: 600,
                      p: 2,
                    }}
                    endIcon={
                      expandedSections.questionnaire ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )
                    }
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Psychology
                        sx={{ color: theme.palette.secondary.main }}
                      />
                      Detailed Questionnaire Answers
                    </Box>
                  </Button>

                  <Collapse in={expandedSections.questionnaire}>
                    <Divider sx={{ my: 2 }} />
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={2}>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 600, mb: 1 }}
                            >
                              Investment Goals
                            </Typography>
                            <Box
                              sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                            >
                              {buyer.investmentGoals.map((goal) => (
                                <Chip
                                  key={goal}
                                  label={goal}
                                  size="small"
                                  color="secondary"
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                          </Box>

                          {buyer.financingPreference && (
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 600, mb: 1 }}
                              >
                                Financing Preferences
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 1,
                                }}
                              >
                                {buyer.financingPreference.map((pref) => (
                                  <Chip
                                    key={pref}
                                    label={pref}
                                    size="small"
                                    color="info"
                                    variant="outlined"
                                  />
                                ))}
                              </Box>
                            </Box>
                          )}

                          {buyer.teamSize && (
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 600, mb: 1 }}
                              >
                                Team Size
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {buyer.teamSize} people
                              </Typography>
                            </Box>
                          )}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Stack spacing={2}>
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 600, mb: 1 }}
                            >
                              Support Needed
                            </Typography>
                            <Box
                              sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                            >
                              {buyer.supportNeeded.map((support) => (
                                <Chip
                                  key={support}
                                  label={support}
                                  size="small"
                                  color="warning"
                                  variant="outlined"
                                />
                              ))}
                            </Box>
                          </Box>

                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 600, mb: 1 }}
                            >
                              Communication Preferences
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {buyer.communicationPreferences.join(", ")}
                            </Typography>
                          </Box>

                          {buyer.preferredMultiples && (
                            <Box>
                              <Typography
                                variant="subtitle2"
                                sx={{ fontWeight: 600, mb: 1 }}
                              >
                                Preferred Multiples
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Revenue: {buyer.preferredMultiples.revenue}x •
                                EBITDA: {buyer.preferredMultiples.ebitda}x
                              </Typography>
                            </Box>
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  </Collapse>
                </CardContent>
              </Card>
            </Grid>

            {/* Badges & Credentials */}
            {buyer.badges && buyer.badges.length > 0 && (
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
                      <EmojiEvents sx={{ color: theme.palette.warning.main }} />
                      Badges & Credentials
                    </Typography>

                    <Grid container spacing={2}>
                      {buyer.badges.map((badge) => (
                        <Grid item xs={12} sm={6} md={4} key={badge.id}>
                          <Paper
                            sx={{
                              p: 2,
                              textAlign: "center",
                              borderRadius: 2,
                              border: `2px solid ${badge.color}40`,
                              background: `${badge.color}08`,
                            }}
                          >
                            <Typography variant="h4" sx={{ mb: 1 }}>
                              {badge.icon}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 600, mb: 0.5 }}
                            >
                              {badge.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {badge.description}
                            </Typography>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>

                    {buyer.certifications &&
                      buyer.certifications.length > 0 && (
                        <Box sx={{ mt: 3 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600, mb: 1 }}
                          >
                            Certifications
                          </Typography>
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                          >
                            {buyer.certifications.map((cert) => (
                              <Chip
                                key={cert}
                                label={cert}
                                color="primary"
                                variant="outlined"
                                icon={<School />}
                              />
                            ))}
                          </Box>
                        </Box>
                      )}

                    {buyer.awards && buyer.awards.length > 0 && (
                      <Box sx={{ mt: 2 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          Awards & Recognition
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                          {buyer.awards.map((award) => (
                            <Chip
                              key={award}
                              label={award}
                              color="secondary"
                              variant="outlined"
                              icon={<EmojiEvents />}
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Endorsements */}
            {buyer.endorsements && buyer.endorsements.length > 0 && (
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 3 }}>
                  <CardContent>
                    <Button
                      fullWidth
                      onClick={() => toggleSection("endorsements")}
                      sx={{
                        justifyContent: "space-between",
                        textTransform: "none",
                        fontWeight: 600,
                        p: 2,
                      }}
                      endIcon={
                        expandedSections.endorsements ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )
                      }
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Star sx={{ color: theme.palette.warning.main }} />
                        Endorsements ({buyer.endorsements.length})
                      </Box>
                    </Button>

                    <Collapse in={expandedSections.endorsements}>
                      <Divider sx={{ my: 2 }} />
                      <Stack spacing={2}>
                        {buyer.endorsements.map((endorsement) => (
                          <Paper
                            key={endorsement.id}
                            sx={{
                              p: 3,
                              borderRadius: 2,
                              border: "1px solid",
                              borderColor: theme.palette.divider,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                mb: 2,
                              }}
                            >
                              <Box>
                                <Typography
                                  variant="subtitle2"
                                  sx={{ fontWeight: 600 }}
                                >
                                  {endorsement.endorserName}
                                  {endorsement.verified && (
                                    <Verified
                                      sx={{
                                        fontSize: 16,
                                        color: theme.palette.success.main,
                                        ml: 0.5,
                                      }}
                                    />
                                  )}
                                </Typography>
                                <Typography
                                  variant="caption"
                                  color="text.secondary"
                                >
                                  {endorsement.endorserTitle} at{" "}
                                  {endorsement.endorserCompany} •{" "}
                                  {endorsement.relationship}
                                </Typography>
                              </Box>
                              <Rating
                                value={endorsement.rating}
                                readOnly
                                size="small"
                              />
                            </Box>
                            <Typography
                              variant="body2"
                              sx={{ fontStyle: "italic", mb: 1 }}
                            >
                              "{endorsement.message}"
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {endorsement.date.toLocaleDateString()}
                            </Typography>
                          </Paper>
                        ))}
                      </Stack>
                    </Collapse>
                  </CardContent>
                </Card>
              </Grid>
            )}

            {/* Contact Information - Privacy Protected */}
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
                    <Security sx={{ color: theme.palette.info.main }} />
                    Contact Information
                  </Typography>

                  {isMatched ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={2}>
                          {buyer.email && (
                            <Button
                              startIcon={<Email />}
                              variant="outlined"
                              href={`mailto:${buyer.email}`}
                              fullWidth
                              sx={{
                                borderRadius: 2,
                                justifyContent: "flex-start",
                              }}
                            >
                              {buyer.email}
                            </Button>
                          )}

                          {buyer.phone && (
                            <Button
                              startIcon={<Phone />}
                              variant="outlined"
                              href={`tel:${buyer.phone}`}
                              fullWidth
                              sx={{
                                borderRadius: 2,
                                justifyContent: "flex-start",
                              }}
                            >
                              {buyer.phone}
                            </Button>
                          )}
                        </Stack>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <Stack spacing={2}>
                          {buyer.linkedIn && (
                            <Button
                              startIcon={<LinkedIn />}
                              variant="outlined"
                              href={`https://linkedin.com/in/${buyer.linkedIn}`}
                              target="_blank"
                              fullWidth
                              sx={{
                                borderRadius: 2,
                                justifyContent: "flex-start",
                              }}
                            >
                              LinkedIn Profile
                            </Button>
                          )}

                          {buyer.website && (
                            <Button
                              startIcon={<Language />}
                              variant="outlined"
                              href={buyer.website}
                              target="_blank"
                              fullWidth
                              sx={{
                                borderRadius: 2,
                                justifyContent: "flex-start",
                              }}
                            >
                              Website
                            </Button>
                          )}
                        </Stack>
                      </Grid>
                    </Grid>
                  ) : (
                    <Alert
                      severity="info"
                      sx={{
                        borderRadius: 2,
                        "& .MuiAlert-message": {
                          width: "100%",
                        },
                      }}
                    >
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        🔒 Contact information is protected for buyer privacy
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Accept this buyer to unlock direct contact details and
                        start the conversation. All interactions are logged for
                        security and transparency.
                      </Typography>
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Education */}
            {buyer.education && buyer.education.length > 0 && (
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
                      <School sx={{ color: theme.palette.primary.main }} />
                      Education
                    </Typography>

                    <Stack spacing={2}>
                      {buyer.education.map((edu, index) => (
                        <Box
                          key={index}
                          sx={{
                            pb: 2,
                            borderBottom:
                              index < buyer.education!.length - 1
                                ? "1px solid"
                                : "none",
                            borderColor: theme.palette.divider,
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                          >
                            {edu.degree} in {edu.field}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {edu.institution} • Class of {edu.year}
                          </Typography>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions
        sx={{
          p: 3,
          justifyContent: "space-between",
          background: "rgba(255,255,255,0.9)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{ borderRadius: 3, px: 4 }}
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
              borderRadius: 3,
              px: 4,
              fontWeight: 600,
            }}
          >
            Pass
          </Button>

          <Button
            startIcon={<ThumbUp />}
            onClick={() => onAccept(buyer.id)}
            disabled={disabled}
            variant="contained"
            color="success"
            sx={{
              borderRadius: 3,
              px: 4,
              fontWeight: 600,
              background: `linear-gradient(45deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
              "&:hover": {
                background: `linear-gradient(45deg, ${theme.palette.success.dark}, ${theme.palette.success.main})`,
                transform: "translateY(-2px)",
                boxShadow: 4,
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
