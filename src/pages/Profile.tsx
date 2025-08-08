import React from "react";
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
} from "@mui/icons-material";

const Profile: React.FC = () => {
  const theme = useTheme();

  const userInfo = {
    name: "John Doe",
    title: "Senior Investment Manager",
    company: "Growth Capital Partners",
    email: "john.doe@growthcapital.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinDate: "January 2023",
    bio: "Experienced investment professional with 12+ years in private equity and M&A. Specialized in technology and healthcare sector acquisitions with a focus on growth-stage companies.",
  };

  const investmentCriteria = [
    { label: "Industries", value: "Technology, Healthcare, SaaS" },
    { label: "Company Stage", value: "Growth, Mature" },
    { label: "Revenue Range", value: "$2M - $50M" },
    { label: "Geographic Focus", value: "North America, Europe" },
    { label: "Investment Size", value: "$1M - $25M" },
    { label: "Ownership Target", value: "25% - 100%" },
  ];

  const achievements = [
    { title: "Total Deals Completed", value: "23", icon: <Handshake /> },
    { title: "Total Investment Value", value: "$145M", icon: <AttachMoney /> },
    { title: "Average ROI", value: "3.2x", icon: <TrendingUp /> },
  ];

  const recentDeals = [
    {
      company: "TechStart Solutions",
      value: "$3.2M",
      status: "In Progress",
      date: "Jan 2024",
    },
    {
      company: "Green Energy Co.",
      value: "$8.5M",
      status: "In Progress",
      date: "Nov 2023",
    },
    {
      company: "DataAnalytics Pro",
      value: "$5.8M",
      status: "Completed",
      date: "Sep 2023",
    },
    {
      company: "CloudService Inc.",
      value: "$12M",
      status: "Completed",
      date: "Jul 2023",
    },
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}
      >
        Profile
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your personal and investment information
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Information */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 2, mb: 3 }}>
            <CardContent sx={{ textAlign: "center", p: 3 }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: "auto",
                  mb: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  fontSize: "3rem",
                  fontWeight: 600,
                }}
              >
                JD
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 0.5 }}>
                {userInfo.name}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                {userInfo.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {userInfo.company}
              </Typography>
              <Button
                variant="contained"
                startIcon={<Edit />}
                fullWidth
                sx={{ borderRadius: 2, mb: 2 }}
              >
                Edit Profile
              </Button>
              <Typography variant="caption" color="text.secondary">
                Member since {userInfo.joinDate}
              </Typography>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card sx={{ borderRadius: 2 }}>
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
                    primary={userInfo.email}
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Phone color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary={userInfo.phone}
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <LocationOn color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary={userInfo.location}
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Business color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary={userInfo.company}
                    primaryTypographyProps={{ variant: "body2" }}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
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
                <Button startIcon={<Edit />} size="small">
                  Edit
                </Button>
              </Box>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ lineHeight: 1.6 }}
              >
                {userInfo.bio}
              </Typography>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card sx={{ borderRadius: 2, mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Key Achievements
              </Typography>
              <Grid container spacing={3}>
                {achievements.map((achievement, index) => (
                  <Grid item xs={12} sm={4} key={index}>
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
                        {achievement.icon}
                      </Box>
                      <Typography
                        variant="h4"
                        sx={{
                          fontWeight: 700,
                          color: theme.palette.primary.main,
                        }}
                      >
                        {achievement.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {achievement.title}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Investment Criteria */}
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
                  Investment Criteria
                </Typography>
                <Button startIcon={<Edit />} size="small">
                  Edit
                </Button>
              </Box>
              <Grid container spacing={2}>
                {investmentCriteria.map((criteria, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 500, mb: 0.5 }}
                      >
                        {criteria.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {criteria.value}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Recent Deals */}
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Recent Deals
              </Typography>
              {recentDeals.map((deal, index) => (
                <Box key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      py: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {deal.company}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {deal.date}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: "right" }}>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {deal.value}
                      </Typography>
                      <Chip
                        label={deal.status}
                        size="small"
                        color={deal.status === "Completed" ? "success" : "info"}
                        variant="outlined"
                      />
                    </Box>
                  </Box>
                  {index < recentDeals.length - 1 && <Divider />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
