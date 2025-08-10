import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  TextField,
  Alert,
  LinearProgress,
  Chip,
  Paper,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Favorite, Share, MoreVert } from "@mui/icons-material";
import { colors } from "../../theme/theme";

/**
 * ThemeExample Component
 *
 * This component demonstrates how to use the DealEase color theme system
 * with Material-UI components. It shows various color applications and
 * accessibility considerations.
 */
const ThemeExample: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{ color: theme.palette.primary.dark }}
      >
        DealEase Theme Showcase
      </Typography>

      <Typography
        variant="body1"
        sx={{ mb: 4, color: theme.palette.text.secondary }}
      >
        This page demonstrates the DealEase color palette and theme system
        implementation.
      </Typography>

      {/* Primary Actions Section */}
      <Paper
        elevation={1}
        sx={{
          p: 3,
          mb: 3,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: theme.palette.primary.main }}
        >
          Primary Actions & Buttons
        </Typography>

        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 2 }}>
          {/* Primary Button - Celestial Blue */}
          <Button variant="contained" color="primary">
            Primary Action
          </Button>

          {/* Secondary Button - Cerise */}
          <Button variant="contained" color="secondary">
            Secondary Action
          </Button>

          {/* Outlined Button */}
          <Button variant="outlined" color="primary">
            Outlined
          </Button>

          {/* Text Button */}
          <Button variant="text" color="primary">
            Text Button
          </Button>
        </Box>

        <Typography
          variant="caption"
          sx={{ color: theme.palette.text.secondary }}
        >
          Primary buttons use Celestial Blue (#3E92CC), Secondary buttons use
          Cerise (#D8315B)
        </Typography>
      </Paper>

      {/* Color Palette Display */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: theme.palette.primary.main }}
        >
          Color Palette
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 2,
          }}
        >
          {/* Primary Colors */}
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                height: 60,
                backgroundColor: colors.primaryDark,
                borderRadius: 1,
                mb: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: colors.textOnPrimary, fontWeight: "bold" }}
              >
                Royal Blue
              </Typography>
            </Box>
            <Typography variant="caption">{colors.primaryDark}</Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                height: 60,
                backgroundColor: colors.primary,
                borderRadius: 1,
                mb: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: colors.textOnPrimary, fontWeight: "bold" }}
              >
                Celestial Blue
              </Typography>
            </Box>
            <Typography variant="caption">{colors.primary}</Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                height: 60,
                backgroundColor: colors.accent,
                borderRadius: 1,
                mb: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: colors.textOnPrimary, fontWeight: "bold" }}
              >
                Cerise
              </Typography>
            </Box>
            <Typography variant="caption">{colors.accent}</Typography>
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                height: 60,
                backgroundColor: colors.background,
                borderRadius: 1,
                mb: 1,
                border: `2px solid ${colors.cardShadow}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: colors.textPrimary, fontWeight: "bold" }}
              >
                Ghost White
              </Typography>
            </Box>
            <Typography variant="caption">{colors.background}</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Form Elements */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: theme.palette.primary.main }}
        >
          Form Elements
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Primary Input"
            placeholder="Enter text here..."
            variant="outlined"
            fullWidth
          />

          <TextField
            label="Focused Input"
            placeholder="This shows focused state"
            variant="outlined"
            fullWidth
            focused
          />

          <TextField
            label="Error Input"
            placeholder="This shows error state"
            variant="outlined"
            fullWidth
            error
            helperText="This field has an error"
          />
        </Box>
      </Paper>

      {/* Status Indicators */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: theme.palette.primary.main }}
        >
          Status Indicators
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Alert severity="success">
            Success message - Deal completed successfully!
          </Alert>

          <Alert severity="warning">
            Warning message - Please review the terms before proceeding.
          </Alert>

          <Alert severity="error">
            Error message - Failed to process the transaction.
          </Alert>

          <Alert severity="info">
            Info message - New features have been added to your dashboard.
          </Alert>
        </Box>
      </Paper>

      {/* Progress Indicators */}
      <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{ color: theme.palette.primary.main }}
        >
          Progress Indicators
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Deal Progress: 75%
            </Typography>
            <LinearProgress variant="determinate" value={75} />
          </Box>

          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Loading...
            </Typography>
            <LinearProgress />
          </Box>
        </Box>
      </Paper>

      {/* Card Example */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ color: theme.palette.primary.dark }}
              >
                Sample Deal Card
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary, mb: 2 }}
              >
                This card demonstrates how content appears within the theme
                system. Text colors automatically adjust for optimal
                readability.
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                <Chip label="Active" color="success" size="small" />
                <Chip label="High Value" color="primary" size="small" />
                <Chip label="Urgent" color="secondary" size="small" />
              </Box>
            </Box>

            <Box>
              <IconButton aria-label="add to favorites">
                <Favorite />
              </IconButton>
              <IconButton aria-label="share">
                <Share />
              </IconButton>
              <IconButton aria-label="more options">
                <MoreVert />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Accessibility Notes */}
      <Paper
        elevation={1}
        sx={{
          p: 3,
          backgroundColor: theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Accessibility Notes
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          This theme is designed with accessibility in mind:
        </Typography>

        <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
          <li>All color combinations meet WCAG AA contrast requirements</li>
          <li>
            Royal Blue (#0A2463) and Cerise (#D8315B) always use white text
          </li>
          <li>Main backgrounds use Eerie Black (#1E1B18) for primary text</li>
          <li>Secondary text uses appropriate contrast ratios</li>
          <li>
            Focus states are clearly visible with color and border changes
          </li>
        </ul>
      </Paper>
    </Box>
  );
};

export default ThemeExample;
