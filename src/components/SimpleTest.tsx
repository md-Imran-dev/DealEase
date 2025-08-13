import React from "react";
import { Typography, Card, CardContent, Box } from "@mui/material";

const SimpleTest: React.FC = () => {
  console.log("SimpleTest component loaded");

  return (
    <Box sx={{ p: 4 }}>
      <Card sx={{ maxWidth: 600, margin: "auto" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            🎉 React App is Working!
          </Typography>
          <Typography variant="body1">
            If you can see this message, your React app is running correctly.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Environment variables:
          </Typography>
          <Typography
            variant="body2"
            component="pre"
            sx={{ mt: 1, bgcolor: "#f5f5f5", p: 1 }}
          >
            {`VITE_APPWRITE_URL: ${import.meta.env.VITE_APPWRITE_URL}
VITE_APPWRITE_PROJECT_ID: ${import.meta.env.VITE_APPWRITE_PROJECT_ID}`}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default SimpleTest;
