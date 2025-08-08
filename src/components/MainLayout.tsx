import React, { useState } from "react";
import { Box, Toolbar, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar, { drawerWidth } from "./Sidebar";
import TopBar from "./TopBar";

const MainLayout: React.FC = () => {
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Top Bar */}
      <TopBar onMobileMenuToggle={handleDrawerToggle} />

      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Toolbar spacer to account for fixed AppBar */}
        <Toolbar />

        {/* Page Content */}
        <Box
          sx={{
            p: { xs: 2, sm: 3 },
            maxWidth: "100%",
            overflow: "hidden",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
