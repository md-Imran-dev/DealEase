import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Divider,
  Alert,
  LinearProgress,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  PlayArrow,
  Stop,
  Refresh,
  Download,
  Upload,
  Settings,
  Analytics,
  Close,
} from "@mui/icons-material";
import { useDemoMode, demoModeManager } from "../../utils/demoMode";

interface DemoModePanelProps {
  open: boolean;
  onClose: () => void;
}

export const DemoModePanel: React.FC<DemoModePanelProps> = ({
  open,
  onClose,
}) => {
  const { isActive, data, stats, init, exit, reset } = useDemoMode();
  const [settings, setSettings] = useState({
    dataDensity: "medium" as "light" | "medium" | "heavy",
    autoActivity: true,
    realTimeSimulation: true,
    notifications: true,
  });

  useEffect(() => {
    if (data?.demoSettings) {
      setSettings({
        dataDensity: data.demoSettings.dataDensity,
        autoActivity: data.demoSettings.autoGenerateActivity,
        realTimeSimulation: data.demoSettings.simulateRealTime,
        notifications: data.demoSettings.enableNotifications,
      });
    }
  }, [data]);

  const handleStartDemo = () => {
    init(settings.dataDensity);
    onClose();
  };

  const handleStopDemo = () => {
    exit();
    onClose();
    // Reload page to clear demo state
    window.location.reload();
  };

  const handleResetDemo = () => {
    reset();
  };

  const handleExportData = () => {
    const exportData = demoModeManager.exportDemoData();
    const blob = new Blob([exportData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dealease-demo-data-${
      new Date().toISOString().split("T")[0]
    }.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getDensityDescription = (density: string) => {
    switch (density) {
      case "light":
        return "Basic demo data - 3 buyers, 3 sellers, 2 matches, 1 deal";
      case "medium":
        return "Standard demo data - Full buyer/seller profiles, multiple matches and deals";
      case "heavy":
        return "Comprehensive demo data - All sample data, extensive conversation history";
      default:
        return "";
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Demo Mode Control Panel</Typography>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box mb={3}>
          {isActive ? (
            <Alert severity="success" icon={<PlayArrow />}>
              Demo mode is currently active. You're viewing sample data for
              demonstration purposes.
            </Alert>
          ) : (
            <Alert severity="info" icon={<Settings />}>
              Demo mode is not active. Configure settings below to start the
              demo experience.
            </Alert>
          )}
        </Box>

        {isActive && stats && (
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Analytics sx={{ mr: 1, verticalAlign: "middle" }} />
                Demo Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      {stats.totalBuyers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Buyers
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="primary">
                      {stats.totalSellers}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Sellers
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="secondary">
                      {stats.totalMatches}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Matches
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="h4" color="secondary">
                      {stats.activeDeals}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Active Deals
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="body1" fontWeight="bold">
                      {stats.totalMessages}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Messages
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="body1" fontWeight="bold">
                      {stats.totalDocuments}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Documents
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="body1" fontWeight="bold">
                      {stats.aiAnalysisCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      AI Analysis
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Box textAlign="center">
                    <Typography variant="body1" fontWeight="bold">
                      {stats.completedDeals}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Completed
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Demo Configuration
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Data Density</InputLabel>
                  <Select
                    value={settings.dataDensity}
                    label="Data Density"
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        dataDensity: e.target.value as
                          | "light"
                          | "medium"
                          | "heavy",
                      })
                    }
                    disabled={isActive}
                  >
                    <MenuItem value="light">
                      <Box>
                        <Typography>Light</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {getDensityDescription("light")}
                        </Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="medium">
                      <Box>
                        <Typography>Medium</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {getDensityDescription("medium")}
                        </Typography>
                      </Box>
                    </MenuItem>
                    <MenuItem value="heavy">
                      <Box>
                        <Typography>Heavy</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {getDensityDescription("heavy")}
                        </Typography>
                      </Box>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.autoActivity}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          autoActivity: e.target.checked,
                        })
                      }
                      disabled={isActive}
                    />
                  }
                  label={
                    <Box>
                      <Typography>Auto-Generate Activity</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Simulate new messages, notifications, and deal progress
                      </Typography>
                    </Box>
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.realTimeSimulation}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          realTimeSimulation: e.target.checked,
                        })
                      }
                      disabled={isActive}
                    />
                  }
                  label={
                    <Box>
                      <Typography>Real-Time Simulation</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Simulate real-time updates and timestamps
                      </Typography>
                    </Box>
                  }
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.notifications}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifications: e.target.checked,
                        })
                      }
                      disabled={isActive}
                    />
                  }
                  label={
                    <Box>
                      <Typography>Demo Notifications</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Show demo-specific notifications and alerts
                      </Typography>
                    </Box>
                  }
                />
              </Grid>
            </Grid>

            {isActive && (
              <>
                <Divider sx={{ my: 3 }} />
                <Typography variant="h6" gutterBottom>
                  Demo Features
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={1} mb={2}>
                  <Chip
                    icon={<PlayArrow />}
                    label="Live Activity Simulation"
                    color="success"
                  />
                  <Chip
                    icon={<Analytics />}
                    label="Sample AI Analysis"
                    color="primary"
                  />
                  <Chip
                    icon={<Settings />}
                    label="Mock Integrations"
                    color="secondary"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary">
                  Demo mode includes realistic conversation flows, deal
                  progression simulation, AI document analysis samples, and
                  automated activity generation to showcase the full DealEase
                  platform experience.
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </DialogContent>

      <DialogActions>
        <Box display="flex" gap={1} width="100%" justifyContent="space-between">
          <Box display="flex" gap={1}>
            {isActive && (
              <>
                <Tooltip title="Export demo data">
                  <Button
                    startIcon={<Download />}
                    onClick={handleExportData}
                    variant="outlined"
                    size="small"
                  >
                    Export
                  </Button>
                </Tooltip>
                <Tooltip title="Reset demo data to initial state">
                  <Button
                    startIcon={<Refresh />}
                    onClick={handleResetDemo}
                    variant="outlined"
                    size="small"
                  >
                    Reset
                  </Button>
                </Tooltip>
              </>
            )}
          </Box>

          <Box display="flex" gap={1}>
            <Button onClick={onClose}>Cancel</Button>
            {isActive ? (
              <Button
                startIcon={<Stop />}
                onClick={handleStopDemo}
                variant="contained"
                color="error"
              >
                Stop Demo
              </Button>
            ) : (
              <Button
                startIcon={<PlayArrow />}
                onClick={handleStartDemo}
                variant="contained"
                color="primary"
              >
                Start Demo
              </Button>
            )}
          </Box>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
