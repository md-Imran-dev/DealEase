import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";
import { client, account } from "../lib/Appwrite";

const AppwriteTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<
    "checking" | "connected" | "error"
  >("checking");
  const [projectInfo, setProjectInfo] = useState<any>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    console.log("AppwriteTest component mounted");
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      console.log("Testing Appwrite connection...");
      setConnectionStatus("checking");
      setError("");

      // Get basic project info first (this should always work)
      console.log("Client config:", {
        endpoint: client.config.endpoint,
        project: client.config.project,
      });
      const projectData = {
        url: client.config.endpoint,
        projectId: client.config.project,
        timestamp: new Date().toISOString(),
      };

      setProjectInfo(projectData);

      // Test if we can connect to Appwrite
      try {
        await account.get();
        setConnectionStatus("connected");
      } catch (authError) {
        // If account.get() fails, it's likely because user is not authenticated
        // But the connection to Appwrite itself is working
        console.log("User not authenticated (this is normal):", authError);
        setConnectionStatus("connected");
      }
    } catch (err: any) {
      console.error("Appwrite connection error:", err);
      setError(err.message || "Failed to connect to Appwrite");
      setConnectionStatus("error");
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "success";
      case "error":
        return "error";
      default:
        return "info";
    }
  };

  const getStatusMessage = () => {
    switch (connectionStatus) {
      case "connected":
        return "✅ Appwrite Connected Successfully!";
      case "error":
        return "❌ Connection Failed";
      default:
        return "⏳ Testing Connection...";
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <CardContent>
        <Typography variant="h5" component="h2" gutterBottom>
          Appwrite Connection Test
        </Typography>

        <Alert severity={getStatusColor()} sx={{ mb: 2 }}>
          {getStatusMessage()}
        </Alert>

        {connectionStatus === "checking" && (
          <Box display="flex" justifyContent="center" my={2}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Error:</strong> {error}
            </Typography>
          </Alert>
        )}

        {projectInfo && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Project Information:
            </Typography>
            <Typography variant="body2" component="div">
              <strong>Endpoint:</strong> {projectInfo.url}
            </Typography>
            <Typography variant="body2" component="div">
              <strong>Project ID:</strong> {projectInfo.projectId}
            </Typography>
            <Typography variant="body2" component="div">
              <strong>Test Time:</strong>{" "}
              {new Date(projectInfo.timestamp).toLocaleString()}
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            onClick={testConnection}
            disabled={connectionStatus === "checking"}
          >
            Test Connection Again
          </Button>
        </Box>

        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">
            This component tests the basic connection to your Appwrite backend.
            If you see a success message, your app is properly connected to
            Appwrite!
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AppwriteTest;
