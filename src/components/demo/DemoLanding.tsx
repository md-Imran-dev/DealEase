import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Chip,
  Alert,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  useTheme,
} from "@mui/material";
import {
  PlayArrow,
  CheckCircle,
  People,
  Business,
  MessageOutlined,
  Assessment,
  Timeline,
  AttachMoney,
  Security,
  Speed,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { initDemo } from "../../utils/demoMode";
import { useAuth } from "../../contexts/AuthContext";

export const DemoLanding: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleStartDemo = async (density: "light" | "medium" | "heavy") => {
    setLoading(true);
    try {
      // Initialize demo mode with selected density
      initDemo(density);

      // Auto-login with demo buyer credentials
      await login({
        email: "buyer@demo.com",
        password: "password123",
        rememberMe: false,
      });

      // Navigate to dashboard after successful login
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to start demo:", error);
      // If auto-login fails, redirect to login page with demo flag
      navigate("/auth/login?demo=true");
    } finally {
      setLoading(false);
    }
  };

  const demoFeatures = [
    {
      icon: <People color="primary" />,
      title: "6 Detailed Buyer Profiles",
      description:
        "Comprehensive investor profiles with investment criteria, experience levels, and funding capabilities",
    },
    {
      icon: <Business color="secondary" />,
      title: "6 Realistic Seller Profiles",
      description:
        "Diverse business profiles across Technology, Healthcare, Manufacturing, Food & Beverage, and more",
    },
    {
      icon: <MessageOutlined color="primary" />,
      title: "Live Conversation Flows",
      description:
        "Realistic chat conversations between buyers and sellers at different deal stages",
    },
    {
      icon: <Assessment color="secondary" />,
      title: "AI Document Analysis",
      description:
        "Sample AI-powered financial document analysis with risk assessment and recommendations",
    },
    {
      icon: <Timeline color="primary" />,
      title: "Multi-Stage Deal Tracking",
      description:
        "Complete acquisition workflows from NDA to closing with progress tracking",
    },
    {
      icon: <AttachMoney color="secondary" />,
      title: "Financial Data Simulation",
      description:
        "Realistic business valuations, revenue data, and deal structures",
    },
  ];

  const densityOptions = [
    {
      type: "light" as const,
      title: "Quick Demo",
      description: "Essential features with minimal data",
      features: [
        "3 buyers, 3 sellers",
        "2 active matches",
        "1 deal in progress",
        "Basic conversations",
      ],
      duration: "~5 minutes",
      color: "success",
    },
    {
      type: "medium" as const,
      title: "Standard Demo",
      description: "Full feature showcase with comprehensive data",
      features: [
        "6 buyers, 6 sellers",
        "6 active matches",
        "3 deals at different stages",
        "Rich conversation history",
        "AI analysis samples",
      ],
      duration: "~15 minutes",
      color: "primary",
    },
    {
      type: "heavy" as const,
      title: "Deep Dive Demo",
      description: "Complete platform experience with extensive data",
      features: [
        "All sample profiles",
        "Extensive message history",
        "Multiple deals",
        "Full document library",
        "Auto-generated activity",
      ],
      duration: "~30 minutes",
      color: "secondary",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            background: "linear-gradient(45deg, #667eea 30%, #764ba2 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Experience DealEase Demo
        </Typography>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          Explore the complete business acquisition platform with realistic
          sample data
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 800, mx: "auto" }}
        >
          See how DealEase connects buyers and sellers, facilitates deal
          negotiations, and provides AI-powered insights throughout the
          acquisition process.
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 4 }}>
        <Typography variant="body2">
          <strong>Demo Mode:</strong> All data in the demo is simulated and for
          demonstration purposes only. No real transactions or personal
          information is involved.
        </Typography>
      </Alert>

      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
        gap={4}
        sx={{ mb: 6 }}
      >
        <Box>
          <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              What You'll Experience
            </Typography>
            <List dense>
              {demoFeatures.map((feature, index) => (
                <ListItem key={index} sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    {feature.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={feature.title}
                    secondary={feature.description}
                    primaryTypographyProps={{ fontWeight: "medium" }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Box>

        <Box>
          <Paper elevation={2} sx={{ p: 3, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Key Platform Features
            </Typography>
            <List dense>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Security color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Secure Matching System"
                  secondary="AI-powered buyer-seller matching based on criteria and preferences"
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Speed color="secondary" />
                </ListItemIcon>
                <ListItemText
                  primary="Streamlined Deal Flow"
                  secondary="Guided acquisition process from initial contact to closing"
                />
              </ListItem>
              <ListItem sx={{ px: 0 }}>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <Assessment color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="AI-Powered Analytics"
                  secondary="Document analysis, risk assessment, and deal insights"
                />
              </ListItem>
            </List>
          </Paper>
        </Box>
      </Box>

      <Typography variant="h4" textAlign="center" gutterBottom>
        Choose Your Demo Experience
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Select the demo depth that fits your time and interest level
      </Typography>

      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
        gap={3}
      >
        {densityOptions.map((option) => (
          <Box key={option.type}>
            <Card
              elevation={3}
              sx={{
                height: "100%",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography variant="h6" component="h3">
                    {option.title}
                  </Typography>
                  <Chip
                    label={option.duration}
                    size="small"
                    color={option.color as any}
                    sx={{ ml: "auto" }}
                  />
                </Box>

                <Typography variant="body2" color="text.secondary" mb={2}>
                  {option.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <List dense>
                  {option.features.map((feature, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <CheckCircle
                          color={option.color as any}
                          fontSize="small"
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{ variant: "body2" }}
                      />
                    </ListItem>
                  ))}
                </List>

                <Button
                  fullWidth
                  variant="contained"
                  color={option.color as any}
                  size="large"
                  startIcon={<PlayArrow />}
                  onClick={() => handleStartDemo(option.type)}
                  disabled={loading}
                  sx={{ mt: 3 }}
                >
                  Start {option.title}
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Box textAlign="center" mt={6}>
        <Typography variant="h6" gutterBottom>
          Quick Demo Access
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={2}>
          Already familiar with the platform? Jump right in:
        </Typography>
        <Box display="flex" justifyContent="center" gap={2} mb={4}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => handleStartDemo("medium")}
            disabled={loading}
          >
            Demo as Buyer
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={async () => {
              setLoading(true);
              try {
                initDemo("medium");
                await login({
                  email: "seller@demo.com",
                  password: "password123",
                  rememberMe: false,
                });
                navigate("/dashboard");
              } catch (error) {
                console.error("Failed to start seller demo:", error);
                navigate("/auth/login?demo=true");
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
          >
            Demo as Seller
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Need help? Check out our{" "}
          <Button variant="text" size="small" onClick={() => navigate("/help")}>
            documentation
          </Button>{" "}
          or{" "}
          <Button
            variant="text"
            size="small"
            onClick={() => navigate("/contact")}
          >
            contact support
          </Button>
        </Typography>
      </Box>
    </Container>
  );
};
