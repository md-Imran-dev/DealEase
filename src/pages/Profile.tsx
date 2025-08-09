import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
  Button,
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Badge,
  Stack,
  LinearProgress,
  Tooltip,
  IconButton,
} from "@mui/material";
import {
  Edit,
  Business,
  LocationOn,
  Email,
  Phone,
  TrendingUp,
  AttachMoney,
  Handshake,
  CameraAlt,
  Quiz,
  Verified,
  Language,
  LinkedIn,
  Twitter,
  Star,
} from "@mui/icons-material";
import { useAuth } from "../contexts/AuthContext";
import { useMatch } from "../contexts/MatchContext";
import ProfilePictureUpload from "../components/profile/ProfilePictureUpload";
import EditProfileDialog from "../components/profile/EditProfileDialog";
import EditQuestionnaireDialog from "../components/profile/EditQuestionnaireDialog";
import type { User } from "../types/auth";
import type {
  BuyerOnboardingData,
  SellerOnboardingData,
} from "../types/onboarding";

const Profile: React.FC = () => {
  const theme = useTheme();
  const { user, updateUser } = useAuth();
  const { getMatchesByUser } = useMatch();

  const [profilePictureOpen, setProfilePictureOpen] = useState(false);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editQuestionnaireOpen, setEditQuestionnaireOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(
    user?.profilePicture || ""
  );

  // Get user's matches and statistics
  const userMatches = useMemo(() => {
    if (!user?.id) return [];
    return getMatchesByUser(user.id);
  }, [user?.id, getMatchesByUser]);

  const profileCompletion = useMemo(() => {
    if (!user) return 0;

    const fields = [
      user.firstName,
      user.lastName,
      user.email,
      user.company,
      user.bio,
      user.phone,
      user.location,
      user.isOnboarded ? "completed" : null,
      profileImage,
    ];

    const completed = fields.filter((field) => field && field.trim()).length;
    return Math.round((completed / fields.length) * 100);
  }, [user, profileImage]);

  const handleProfileImageUpdate = (imageUrl: string) => {
    setProfileImage(imageUrl);
    if (user) {
      updateUser({ ...user, profilePicture: imageUrl });
    }
  };

  const handleProfileUpdate = (updatedData: Partial<User>) => {
    if (user) {
      updateUser({ ...user, ...updatedData });
    }
  };

  const handleQuestionnaireUpdate = (
    data: BuyerOnboardingData | SellerOnboardingData
  ) => {
    if (user) {
      updateUser({ ...user, onboardingData: data });
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    });
  };

  if (!user) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6">
          Please log in to view your profile.
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
          Profile
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your personal information and{" "}
          {user.role === "buyer" ? "investment criteria" : "business details"}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} md={4}>
          {/* Profile Picture & Basic Info */}
          <Card sx={{ borderRadius: 2, mb: 3 }}>
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <Box
                sx={{ position: "relative", display: "inline-block", mb: 2 }}
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  badgeContent={
                    <IconButton
                      size="small"
                      onClick={() => setProfilePictureOpen(true)}
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: "white",
                        "&:hover": {
                          backgroundColor: theme.palette.primary.dark,
                        },
                      }}
                    >
                      <CameraAlt sx={{ fontSize: 16 }} />
                    </IconButton>
                  }
                >
                  <Avatar
                    src={profileImage}
                    sx={{
                      width: 120,
                      height: 120,
                      background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      fontSize: "3rem",
                      fontWeight: 600,
                    }}
                  >
                    {!profileImage &&
                      getInitials(`${user.firstName} ${user.lastName}`)}
                  </Avatar>
                </Badge>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                  {user.firstName} {user.lastName}
                </Typography>
                {user.isOnboarded && (
                  <Tooltip title="Profile verified">
                    <Verified color="primary" sx={{ fontSize: 20 }} />
                  </Tooltip>
                )}
              </Box>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                {user.title ||
                  `${
                    user.role === "buyer"
                      ? "Investment Professional"
                      : "Business Owner"
                  }`}
              </Typography>

              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {user.company}
              </Typography>

              {/* Profile Completion */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Profile Completion
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary.main"
                    sx={{ fontWeight: 600 }}
                  >
                    {profileCompletion}%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={profileCompletion}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: theme.palette.grey[200],
                    "& .MuiLinearProgress-bar": {
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>

              <Stack spacing={1}>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  fullWidth
                  onClick={() => setEditProfileOpen(true)}
                  sx={{ borderRadius: 2 }}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<Quiz />}
                  fullWidth
                  onClick={() => setEditQuestionnaireOpen(true)}
                  sx={{ borderRadius: 2 }}
                >
                  Edit {user.role === "buyer" ? "Investment" : "Business"}{" "}
                  Profile
                </Button>
              </Stack>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: "block", mt: 2 }}
              >
                Member since {formatDate(user.createdAt)}
              </Typography>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card sx={{ borderRadius: 2, mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Contact Information
              </Typography>
              <List dense>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Email color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary={user.email}
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </ListItem>
                {user.phone && (
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <Phone color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary={user.phone}
                      primaryTypographyProps={{ variant: "body2" }}
                    />
                  </ListItem>
                )}
                {user.location && (
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <LocationOn color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary={user.location}
                      primaryTypographyProps={{ variant: "body2" }}
                    />
                  </ListItem>
                )}
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Business color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary={user.company}
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Social Links */}
          {(user.website || user.linkedin || user.twitter) && (
            <Card sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                  Links
                </Typography>
                <Stack spacing={1}>
                  {user.website && (
                    <Button
                      startIcon={<Language />}
                      variant="outlined"
                      size="small"
                      href={user.website}
                      target="_blank"
                      sx={{ justifyContent: "flex-start", borderRadius: 2 }}
                    >
                      Website
                    </Button>
                  )}
                  {user.linkedin && (
                    <Button
                      startIcon={<LinkedIn />}
                      variant="outlined"
                      size="small"
                      href={user.linkedin}
                      target="_blank"
                      sx={{ justifyContent: "flex-start", borderRadius: 2 }}
                    >
                      LinkedIn
                    </Button>
                  )}
                  {user.twitter && (
                    <Button
                      startIcon={<Twitter />}
                      variant="outlined"
                      size="small"
                      href={`https://twitter.com/${user.twitter.replace(
                        "@",
                        ""
                      )}`}
                      target="_blank"
                      sx={{ justifyContent: "flex-start", borderRadius: 2 }}
                    >
                      Twitter
                    </Button>
                  )}
                </Stack>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* About */}
          <Card sx={{ borderRadius: 2, mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  About
                </Typography>
                <Button
                  startIcon={<Edit />}
                  size="small"
                  onClick={() => setEditProfileOpen(true)}
                  sx={{ borderRadius: 2 }}
                >
                  Edit
                </Button>
              </Box>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                {user.bio ||
                  `No bio provided. Click "Edit" to add information about yourself and your ${
                    user.role === "buyer"
                      ? "investment experience"
                      : "business background"
                  }.`}
              </Typography>
            </CardContent>
          </Card>

          {/* Match Statistics */}
          <Card sx={{ borderRadius: 2, mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Activity & Statistics
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: theme.palette.primary.main + "08",
                      border: `1px solid ${theme.palette.primary.main}20`,
                    }}
                  >
                    <Box sx={{ color: theme.palette.primary.main, mb: 1 }}>
                      <Handshake />
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                      }}
                    >
                      {userMatches.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Matches
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: theme.palette.success.main + "08",
                      border: `1px solid ${theme.palette.success.main}20`,
                    }}
                  >
                    <Box sx={{ color: theme.palette.success.main, mb: 1 }}>
                      <Star />
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.success.main,
                      }}
                    >
                      {profileCompletion}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Profile Complete
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Box
                    sx={{
                      textAlign: "center",
                      p: 2,
                      borderRadius: 2,
                      backgroundColor: theme.palette.info.main + "08",
                      border: `1px solid ${theme.palette.info.main}20`,
                    }}
                  >
                    <Box sx={{ color: theme.palette.info.main, mb: 1 }}>
                      <TrendingUp />
                    </Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        color: theme.palette.info.main,
                      }}
                    >
                      {user.role === "buyer" ? "Buyer" : "Seller"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Account Type
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Professional Details */}
          <Card sx={{ borderRadius: 2, mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {user.role === "buyer"
                    ? "Investment Criteria"
                    : "Business Details"}
                </Typography>
                <Button
                  startIcon={<Quiz />}
                  size="small"
                  onClick={() => setEditQuestionnaireOpen(true)}
                  sx={{ borderRadius: 2 }}
                >
                  Edit
                </Button>
              </Box>

              {user.industries && user.industries.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Industries of Interest
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {user.industries.map((industry) => (
                      <Chip
                        key={industry}
                        label={industry}
                        size="small"
                        sx={{ mb: 1 }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              {user.skills && user.skills.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Skills & Expertise
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    {user.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        color="primary"
                        variant="outlined"
                        sx={{ mb: 1 }}
                      />
                    ))}
                  </Stack>
                </Box>
              )}

              {!user.isOnboarded && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontStyle: "italic" }}
                >
                  Complete your{" "}
                  {user.role === "buyer" ? "investment" : "business"} profile to
                  improve matching with potential{" "}
                  {user.role === "buyer" ? "sellers" : "buyers"}.
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialogs */}
      <ProfilePictureUpload
        open={profilePictureOpen}
        onClose={() => setProfilePictureOpen(false)}
        onImageUploaded={handleProfileImageUpdate}
        currentImage={profileImage}
        userName={`${user.firstName} ${user.lastName}`}
      />

      <EditProfileDialog
        open={editProfileOpen}
        onClose={() => setEditProfileOpen(false)}
        onSave={handleProfileUpdate}
      />

      <EditQuestionnaireDialog
        open={editQuestionnaireOpen}
        onClose={() => setEditQuestionnaireOpen(false)}
        onSave={handleQuestionnaireUpdate}
      />
    </Box>
  );
};

export default Profile;
