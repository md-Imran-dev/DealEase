import React, { useState, useEffect } from "react";
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  IconButton,
  Snackbar,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import {
  Notifications,
  Security,
  Visibility,
  Email,
  Language,
  Palette,
  Close,
  CheckCircle,
  Warning,
  DeleteForever,
  Download,
  Upload,
  VpnKey,
  Shield,
  Backup,
} from "@mui/icons-material";
import { useUserStore } from "../store/userStore";

interface SettingItem {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

const Settings: React.FC = () => {
  const theme = useTheme();
  const { user, updateUser } = useUserStore();

  const [notificationSettings, setNotificationSettings] = useState<
    SettingItem[]
  >([
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
  ]);

  const [privacySettings, setPrivacySettings] = useState<SettingItem[]>([
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
  ]);

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "en",
    timezone: "EST",
    emailFrequency: "daily",
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "warning" | "info",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load user settings from context or API
    if (user?.settings) {
      // Update settings from user data
    }
  }, [user]);

  const handleNotificationToggle = (settingId: string) => {
    setNotificationSettings((prev) =>
      prev.map((setting) =>
        setting.id === settingId
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const handlePrivacyToggle = (settingId: string) => {
    setPrivacySettings((prev) =>
      prev.map((setting) =>
        setting.id === settingId
          ? { ...setting, enabled: !setting.enabled }
          : setting
      )
    );
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreferenceChange = (field: string, value: string) => {
    setPreferences((prev) => ({ ...prev, [field]: value }));
  };

  const validatePasswords = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      return "All password fields are required";
    }
    if (passwords.new.length < 8) {
      return "New password must be at least 8 characters";
    }
    if (passwords.new !== passwords.confirm) {
      return "New passwords do not match";
    }
    return null;
  };

  const handleUpdatePassword = async () => {
    const error = validatePasswords();
    if (error) {
      setSnackbar({
        open: true,
        message: error,
        severity: "error",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setPasswords({ current: "", new: "", confirm: "" });
      setSnackbar({
        open: true,
        message: "Password updated successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to update password",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Update user settings
      if (user) {
        await updateUser({
          ...user,
          settings: {
            notifications: notificationSettings,
            privacy: privacySettings,
            preferences,
            twoFactorEnabled,
          },
        });
      }

      setSnackbar({
        open: true,
        message: "Settings saved successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to save settings",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = async () => {
    setLoading(true);
    try {
      // Simulate data export
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const data = {
        profile: user,
        settings: {
          notifications: notificationSettings,
          privacy: privacySettings,
        },
        exportDate: new Date().toISOString(),
      };

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `dealease-data-export-${
        new Date().toISOString().split("T")[0]
      }.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSnackbar({
        open: true,
        message: "Data exported successfully",
        severity: "success",
      });
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to export data",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      // Simulate account deletion
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSnackbar({
        open: true,
        message:
          "Account deletion initiated. You will receive a confirmation email.",
        severity: "warning",
      });
      setDeleteDialogOpen(false);
    } catch (error) {
      setSnackbar({
        open: true,
        message: "Failed to delete account",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (!user) {
    return (
      <Box sx={{ textAlign: "center", py: 8 }}>
        <Typography variant="h6">Please log in to access settings.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Loading Bar */}
      {loading && (
        <LinearProgress
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.appBar + 1,
          }}
        />
      )}

      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ mb: 1, fontWeight: 600, color: "text.primary" }}
        >
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your account preferences, security, and privacy settings
        </Typography>
      </Box>

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
                  value={passwords.current}
                  onChange={(e) =>
                    handlePasswordChange("current", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  variant="outlined"
                  size="small"
                  value={passwords.new}
                  onChange={(e) => handlePasswordChange("new", e.target.value)}
                  helperText="Minimum 8 characters"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm New Password"
                  variant="outlined"
                  size="small"
                  value={passwords.confirm}
                  onChange={(e) =>
                    handlePasswordChange("confirm", e.target.value)
                  }
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  onClick={handleUpdatePassword}
                  disabled={loading}
                  sx={{ borderRadius: 2 }}
                >
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
                      label={twoFactorEnabled ? "Enabled" : "Disabled"}
                      color={twoFactorEnabled ? "success" : "error"}
                      size="small"
                      icon={twoFactorEnabled ? <Shield /> : <Warning />}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                    disabled={loading}
                    sx={{ borderRadius: 2 }}
                  >
                    {twoFactorEnabled ? "Disable" : "Enable"}
                  </Button>
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Data Management */}
              <Box>
                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                  Data Management
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Download />}
                    onClick={handleExportData}
                    disabled={loading}
                    sx={{ borderRadius: 2 }}
                  >
                    Export Data
                  </Button>
                  <Tooltip title="Backup your profile and settings">
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<Backup />}
                      disabled={loading}
                      sx={{ borderRadius: 2 }}
                    >
                      Backup
                    </Button>
                  </Tooltip>
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
                  <Select
                    value={preferences.theme}
                    label="Theme"
                    onChange={(e) =>
                      handlePreferenceChange("theme", e.target.value)
                    }
                  >
                    <MenuItem value="light">🌞 Light</MenuItem>
                    <MenuItem value="dark">🌙 Dark</MenuItem>
                    <MenuItem value="auto">⚡ Auto (System)</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ mb: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={preferences.language}
                    label="Language"
                    onChange={(e) =>
                      handlePreferenceChange("language", e.target.value)
                    }
                  >
                    <MenuItem value="en">🇺🇸 English</MenuItem>
                    <MenuItem value="es">🇪🇸 Spanish</MenuItem>
                    <MenuItem value="fr">🇫🇷 French</MenuItem>
                    <MenuItem value="de">🇩🇪 German</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <FormControl fullWidth size="small">
                  <InputLabel>Timezone</InputLabel>
                  <Select
                    value={preferences.timezone}
                    label="Timezone"
                    onChange={(e) =>
                      handlePreferenceChange("timezone", e.target.value)
                    }
                  >
                    <MenuItem value="EST">Eastern Time (EST)</MenuItem>
                    <MenuItem value="PST">Pacific Time (PST)</MenuItem>
                    <MenuItem value="CST">Central Time (CST)</MenuItem>
                    <MenuItem value="MST">Mountain Time (MST)</MenuItem>
                    <MenuItem value="UTC">UTC</MenuItem>
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
                {notificationSettings.map((setting) => (
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
                        onChange={() => handleNotificationToggle(setting.id)}
                        color="primary"
                        disabled={loading}
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
                  <Select
                    value={preferences.emailFrequency}
                    label="Email Frequency"
                    onChange={(e) =>
                      handlePreferenceChange("emailFrequency", e.target.value)
                    }
                  >
                    <MenuItem value="immediate">📧 Immediate</MenuItem>
                    <MenuItem value="daily">📅 Daily Digest</MenuItem>
                    <MenuItem value="weekly">📊 Weekly Summary</MenuItem>
                    <MenuItem value="never">🚫 Never</MenuItem>
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
                {privacySettings.map((setting) => (
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
                        onChange={() => handlePrivacyToggle(setting.id)}
                        color="primary"
                        disabled={loading}
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
                    startIcon={<DeleteForever />}
                    onClick={() => setDeleteDialogOpen(true)}
                    disabled={loading}
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
      <Box sx={{ mt: 4, textAlign: "center", position: "relative" }}>
        <Button
          variant="contained"
          size="large"
          startIcon={<CheckCircle />}
          onClick={handleSaveSettings}
          disabled={loading}
          sx={{ borderRadius: 2, px: 4, mr: 2, fontWeight: 600 }}
        >
          Save All Changes
        </Button>
        <Button
          variant="outlined"
          size="large"
          disabled={loading}
          sx={{ borderRadius: 2, px: 4 }}
        >
          Reset to Defaults
        </Button>
      </Box>

      {/* Delete Account Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "error.main" }}
            >
              Delete Account
            </Typography>
            <IconButton onClick={() => setDeleteDialogOpen(false)} size="small">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent>
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
              ⚠️ This action is irreversible!
            </Typography>
            <Typography variant="body2">
              All your data, including profile, matches, messages, and deal
              history will be permanently deleted.
            </Typography>
          </Alert>

          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you absolutely sure you want to delete your account? This action
            cannot be undone.
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Before deleting your account, consider:
          </Typography>
          <Box component="ul" sx={{ mt: 1, pl: 2 }}>
            <li>
              <Typography variant="body2" color="text.secondary">
                Exporting your data for your records
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary">
                Completing any active deals or conversations
              </Typography>
            </li>
            <li>
              <Typography variant="body2" color="text.secondary">
                Informing your matches about your departure
              </Typography>
            </li>
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={loading}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDeleteAccount}
            disabled={loading}
            startIcon={<DeleteForever />}
            sx={{ borderRadius: 2, fontWeight: 600 }}
          >
            Delete Account
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
