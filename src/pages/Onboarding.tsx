import React from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  useTheme,
  Container,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  CheckCircle,
  BusinessCenter,
  Storefront,
  TrendingUp,
  Handshake,
  Speed,
  Security,
} from "@mui/icons-material";

const Onboarding: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, completeOnboarding } = useAuth();

  const handleGetStarted = async () => {
    try {
      await completeOnboarding();
      navigate("/");
    } catch (error) {
      // Error is handled by context
      console.error("Failed to complete onboarding:", error);
    }
  };

  const buyerFeatures = [
    "Browse verified business listings",
    "AI-powered business matching",
    "Deal pipeline management",
    "Due diligence document management",
    "Direct messaging with business owners",
    "Market insights and analytics",
  ];

  const sellerFeatures = [
    "Create compelling business profiles",
    "Professional business valuation tools",
    "Connect with qualified investors",
    "Manage buyer inquiries efficiently",
    "Showcase financials securely",
    "Market positioning guidance",
  ];

  const features = user?.role === "buyer" ? buyerFeatures : sellerFeatures;
  const roleTitle =
    user?.role === "buyer" ? "Buyer/Investor" : "Seller/Business Owner";
  const roleIcon = user?.role === "buyer" ? <BusinessCenter /> : <Storefront />;

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 4,
        }}
      >
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            Welcome to DealEase!
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
            You're all set, {user?.firstName}! 🎉
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto" }}
          >
            Your account has been created successfully. Here's what you can do
            as a {roleTitle}:
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 6 }}>
          {/* User Role Card */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 3,
                height: "100%",
                background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}08 100%)`,
                border: `1px solid ${theme.palette.primary.main}20`,
              }}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mx: "auto",
                    mb: 3,
                    background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    fontSize: "2rem",
                  }}
                >
                  {user?.avatar || "U"}
                </Avatar>

                <Box
                  sx={{
                    mb: 2,
                    color: theme.palette.primary.main,
                  }}
                >
                  {roleIcon}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {roleTitle}
                </Typography>
                {user?.company && (
                  <Typography variant="body2" color="text.secondary">
                    {user.company}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Features Card */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 3,
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                  What you can do:
                </Typography>

                <List dense>
                  {features.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircle
                          sx={{
                            color: theme.palette.primary.main,
                            fontSize: 20,
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{
                          variant: "body2",
                          color: "text.secondary",
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Platform Benefits */}
        <Card
          sx={{
            borderRadius: 3,
            mb: 4,
            background: theme.palette.grey[50],
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, mb: 3, textAlign: "center" }}
            >
              Why choose DealEase?
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Speed
                    sx={{
                      fontSize: 40,
                      color: theme.palette.primary.main,
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Fast & Efficient
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Streamlined processes to accelerate your business deals
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: "center" }}>
                  <Security
                    sx={{
                      fontSize: 40,
                      color: theme.palette.secondary.main,
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    Secure & Trusted
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bank-level security with verified users and businesses
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: "center" }}>
                  <TrendingUp
                    sx={{
                      fontSize: 40,
                      color: theme.palette.accent?.main,
                      mb: 2,
                    }}
                  />
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    AI-Powered
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Smart matching and insights to find the perfect deals
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Action Button */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            size="large"
            onClick={handleGetStarted}
            sx={{
              borderRadius: 3,
              px: 6,
              py: 2,
              fontSize: "1.1rem",
              fontWeight: 600,
              boxShadow: "0 8px 32px rgba(79, 195, 247, 0.3)",
            }}
          >
            Get Started with DealEase
          </Button>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            You can update your profile and preferences anytime in Settings
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Onboarding;
