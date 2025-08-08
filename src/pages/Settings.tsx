import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  TextField,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  useTheme,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Notifications,
  Security,
  Visibility,
  Email,
  Language,
  Palette,
} from "@mui/icons-material";

const Settings: React.FC = () => {
  const theme = useTheme();

  const notificationSettings = [
    {
      id: "new_matches",
      label: "New business matches",
      description: "Get notified when new businesses match your criteria",
      enabled: true,
    },
    {
      id: "messages",
      label: "New messages",
      description: "Receive notifications for new messages",
      enabled: true,
    },
    {
      id: "deal_updates",
      label: "Deal status updates",
      description: "Updates on your tracked acquisition deals",
      enabled: true,
    },
    {
      id: "market_insights",
      label: "Market insights",
      description: "Weekly market reports and trends",
      enabled: false,
    },
    {
      id: "newsletter",
      label: "Newsletter",
      description: "Monthly DealEase newsletter",
      enabled: true,
    },
  ];

  const privacySettings = [
    {
      id: "profile_visibility",
      label: "Public profile",
      description: "Allow other users to view your profile",
      enabled: true,
    },
    {
      id: "contact_info",
      label: "Contact information visibility",
      description: "Show your contact details to matched businesses",
      enabled: true,
    },
    {
      id: "deal_history",
      label: "Deal history visibility",
      description: "Display your past acquisitions publicly",
      enabled: false,
    },
    {
      id: "activity_status",
      label: "Activity status",
      description: "Show when you're online or active",
      enabled: true,
    },
  ];

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}
      >
        Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Manage your account preferences and privacy settings
      </Typography>

      <Grid container spacing={3}>
        {/* Account Settings */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Security sx={{ mr: 2, color: theme.palette.primary.main }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Account & Security
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Change Password
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  label="Current Password"
                  variant="outlined"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  variant="outlined"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm New Password"
                  variant="outlined"
                  size="small"
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" sx={{ borderRadius: 2 }}>
                  Update Password
                </Button>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Two-Factor Authentication
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Box>
                    <Typography variant="body2">
                      Add an extra layer of security to your account
                    </Typography>
                    <Chip
                      label="Disabled"
                      color="error"
                      size="small"
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 2 }}
                  >
                    Enable
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Appearance */}
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Palette sx={{ mr: 2, color: theme.palette.primary.main }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Appearance & Language
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Theme</InputLabel>
                  <Select value="light" label="Theme">
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="auto">Auto</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Language</InputLabel>
                  <Select value="en" label="Language">
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <FormControl fullWidth size="small">
                  <InputLabel>Timezone</InputLabel>
                  <Select value="EST" label="Timezone">
                    <MenuItem value="EST">Eastern Time (EST)</MenuItem>
                    <MenuItem value="PST">Pacific Time (PST)</MenuItem>
                    <MenuItem value="CST">Central Time (CST)</MenuItem>
                    <MenuItem value="MST">Mountain Time (MST)</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications & Privacy */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, mb: 3 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Notifications
                  sx={{ mr: 2, color: theme.palette.primary.main }}
                />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Notifications
                </Typography>
              </Box>

              <List dense>
                {notificationSettings.map((setting, index) => (
                  <ListItem key={setting.id} sx={{ px: 0 }}>
                    <ListItemText
                      primary={setting.label}
                      secondary={setting.description}
                      primaryTypographyProps={{
                        variant: "body2",
                        fontWeight: 500,
                      }}
                      secondaryTypographyProps={{ variant: "caption" }}
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={setting.enabled}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Email Preferences
                </Typography>
                <FormControl fullWidth size="small">
                  <InputLabel>Email Frequency</InputLabel>
                  <Select value="daily" label="Email Frequency">
                    <MenuItem value="immediate">Immediate</MenuItem>
                    <MenuItem value="daily">Daily Digest</MenuItem>
                    <MenuItem value="weekly">Weekly Summary</MenuItem>
                    <MenuItem value="never">Never</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Visibility sx={{ mr: 2, color: theme.palette.primary.main }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Privacy & Visibility
                </Typography>
              </Box>

              <List dense>
                {privacySettings.map((setting, index) => (
                  <ListItem key={setting.id} sx={{ px: 0 }}>
                    <ListItemText
                      primary={setting.label}
                      secondary={setting.description}
                      primaryTypographyProps={{
                        variant: "body2",
                        fontWeight: 500,
                      }}
                      secondaryTypographyProps={{ variant: "caption" }}
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={setting.enabled}
                        color="primary"
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 3 }} />

              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 2, fontWeight: 600, color: "error.main" }}
                >
                  Danger Zone
                </Typography>
                <Box
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.error.main}20`,
                    backgroundColor: theme.palette.error.main + "08",
                  }}
                >
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Once you delete your account, there is no going back. Please
                    be certain.
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{ borderRadius: 2 }}
                  >
                    Delete Account
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Save Settings */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Button
          variant="contained"
          size="large"
          sx={{ borderRadius: 2, px: 4, mr: 2 }}
        >
          Save Changes
        </Button>
        <Button variant="outlined" size="large" sx={{ borderRadius: 2, px: 4 }}>
          Reset to Defaults
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
