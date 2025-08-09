import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box,
  useTheme,
  useMediaQuery,
  Divider,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle,
  Logout,
  Settings,
  Person,
  Science,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useMatch } from "../contexts/MatchContext";
import { drawerWidth } from "./Sidebar";
import { DemoModePanel } from "./demo/DemoModePanel";
import { isDemo } from "../utils/demoMode";
import { FriendlyTooltip } from "./common/FriendlyTooltip";

interface TopBarProps {
  onMobileMenuToggle: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMobileMenuToggle }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { getUnreadCount } = useMatch();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] =
    useState<null | HTMLElement>(null);
  const [demoModeOpen, setDemoModeOpen] = useState(false);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const isProfileMenuOpen = Boolean(anchorEl);
  const isNotificationMenuOpen = Boolean(notificationAnchorEl);

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "New match found!",
      message: "A potential acquisition target matches your criteria",
      time: "2m ago",
    },
    {
      id: 2,
      title: "Message received",
      message: "John Doe sent you a message about the tech startup",
      time: "1h ago",
    },
    {
      id: 3,
      title: "Deal update",
      message: 'Status changed for "E-commerce Platform"',
      time: "3h ago",
    },
  ];

  const profileMenuId = "primary-search-account-menu";
  const renderProfileMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={profileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isProfileMenuOpen}
      onClose={handleProfileMenuClose}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 200,
          borderRadius: 2,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Box sx={{ px: 2, py: 1.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
          {user?.firstName} {user?.lastName}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {user?.email}
        </Typography>
        {user?.role && (
          <Typography
            variant="caption"
            color="primary.main"
            sx={{ display: "block", textTransform: "capitalize" }}
          >
            {user.role}
          </Typography>
        )}
      </Box>
      <Divider />
      <MenuItem
        onClick={() => {
          handleProfileMenuClose();
          navigate("/profile");
        }}
      >
        <ListItemIcon>
          <Person fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleProfileMenuClose();
          navigate("/settings");
        }}
      >
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleProfileMenuClose();
          setDemoModeOpen(true);
        }}
      >
        <ListItemIcon>
          <Science fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Demo Mode" />
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          handleProfileMenuClose();
          logout();
        }}
      >
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </MenuItem>
    </Menu>
  );

  const notificationMenuId = "notification-menu";
  const renderNotificationMenu = (
    <Menu
      anchorEl={notificationAnchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={notificationMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isNotificationMenuOpen}
      onClose={handleNotificationMenuClose}
      PaperProps={{
        sx: {
          mt: 1,
          minWidth: 320,
          maxWidth: 400,
          borderRadius: 2,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
        },
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Notifications
        </Typography>
      </Box>
      {notifications.map((notification) => (
        <MenuItem
          key={notification.id}
          onClick={handleNotificationMenuClose}
          sx={{
            py: 1.5,
            borderBottom: `1px solid ${theme.palette.divider}`,
            "&:last-child": {
              borderBottom: "none",
            },
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
              {notification.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {notification.message}
            </Typography>
            <Typography variant="caption" color="primary.main">
              {notification.time}
            </Typography>
          </Box>
        </MenuItem>
      ))}
      <Box sx={{ p: 1 }}>
        <Typography
          variant="caption"
          color="primary.main"
          sx={{
            display: "block",
            textAlign: "center",
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          View all notifications
        </Typography>
      </Box>
    </Menu>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          backgroundColor: "background.paper",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left side - Mobile menu button and title */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={onMobileMenuToggle}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {!isMobile && (
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  Dashboard
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Welcome back, John! Here's what's happening with your deals.
                </Typography>
              </Box>
            )}
          </Box>

          {/* Right side - Notifications and Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Notifications */}
            <FriendlyTooltip titleKey="notifications">
              <IconButton
                size="large"
                aria-label="show notifications"
                aria-controls={notificationMenuId}
                aria-haspopup="true"
                onClick={handleNotificationMenuOpen}
                color="inherit"
                sx={{
                  color: "text.secondary",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.main + "08",
                    color: "primary.main",
                  },
                }}
              >
                <Badge
                  badgeContent={user ? getUnreadCount(user.id) : 0}
                  color="error"
                >
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </FriendlyTooltip>

            {/* Profile Menu */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={profileMenuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ ml: 1 }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                {user?.avatar || user?.firstName?.charAt(0) || "U"}
              </Avatar>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderProfileMenu}
      {renderNotificationMenu}
      <DemoModePanel
        open={demoModeOpen}
        onClose={() => setDemoModeOpen(false)}
      />
    </>
  );
};

export default TopBar;
