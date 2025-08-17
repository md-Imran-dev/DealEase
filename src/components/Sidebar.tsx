import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Storefront as MarketplaceIcon,
  Favorite as MatchesIcon,
  Chat as MessagesIcon,
  HandshakeRounded as DealsIcon,
  Analytics as TrackerIcon,
  Person as ProfileIcon,
  Settings as SettingsIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

const drawerWidth = 260;

interface NavigationItem {
  text: string;
  icon: React.ReactElement;
  path: string;
  roles?: string[]; // Optional roles filter
}

const baseNavigationItems: NavigationItem[] = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { text: "Marketplace", icon: <MarketplaceIcon />, path: "/marketplace" },
  { text: "Matches", icon: <MatchesIcon />, path: "/matches" },
  { text: "Messages", icon: <MessagesIcon />, path: "/messages" },
  { text: "Deals", icon: <DealsIcon />, path: "/deals" },
  { text: "Acquisition Tracker", icon: <TrackerIcon />, path: "/tracker" },
];

const sellerOnlyItems: NavigationItem[] = [
  {
    text: "My Businesses",
    icon: <BusinessIcon />,
    path: "/businesses",
    roles: ["seller"],
  },
];

const commonItems: NavigationItem[] = [
  { text: "Profile", icon: <ProfileIcon />, path: "/profile" },
  { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
];

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onMobileClose }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUserStore();

  // Build navigation items based on user role
  const navigationItems = React.useMemo(() => {
    const items = [...baseNavigationItems];

    // Add seller-specific items
    if (user?.role === "seller") {
      items.splice(-1, 0, ...sellerOnlyItems); // Insert before the last item (tracker)
    }

    // Add common items at the end
    items.push(...commonItems);

    return items;
  }, [user?.role]);

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      onMobileClose();
    }
  };

  const drawer = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Logo Section */}
      <Box
        sx={{
          p: 3,
          textAlign: "center",
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px",
          }}
        >
          DealEase
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
          }}
        >
          Business Marketplace
        </Typography>
      </Box>

      {/* Navigation Items */}
      <Box sx={{ flex: 1, py: 2 }}>
        <List sx={{ px: 1 }}>
          {navigationItems.map((item) => (
            <ListItemButton
              key={item.text}
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                mb: 0.5,
                borderRadius: 2,
                "&.Mui-selected": {
                  backgroundColor: theme.palette.primary.main + "15",
                  "& .MuiListItemIcon-root": {
                    color: theme.palette.primary.main,
                  },
                  "& .MuiListItemText-primary": {
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                  },
                },
                "&:hover": {
                  backgroundColor: theme.palette.primary.main + "08",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color:
                    location.pathname === item.path
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{
                  fontSize: "0.95rem",
                  fontWeight: location.pathname === item.path ? 600 : 500,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            textAlign: "center",
            display: "block",
          }}
        >
          © 2024 DealEase
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
export { drawerWidth };
