import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Badge,
  Chip,
  Stack,
  FormControlLabel,
  Switch,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Search,
  FilterList,
  Clear,
  Circle,
  Schedule,
  Business,
  Person,
  AttachFile,
  Archive,
  Star,
} from "@mui/icons-material";
import type { MatchFilters } from "../../types/match";

interface ConversationFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  filters: MatchFilters;
  onFiltersChange: (filters: MatchFilters) => void;
  totalConversations: number;
  filteredConversations: number;
}

const ConversationFilters: React.FC<ConversationFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  totalConversations,
  filteredConversations,
}) => {
  const theme = useTheme();
  const [filterMenuAnchor, setFilterMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleFilterMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setFilterMenuAnchor(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterMenuAnchor(null);
  };

  const handleFilterChange = (filterType: keyof MatchFilters, value: any) => {
    const newFilters = { ...filters, [filterType]: value };
    onFiltersChange(newFilters);

    // Update active filters for display
    updateActiveFilters(newFilters);
  };

  const updateActiveFilters = (currentFilters: MatchFilters) => {
    const active: string[] = [];

    if (currentFilters.hasUnreadMessages) {
      active.push("unread");
    }

    if (currentFilters.status && currentFilters.status.length > 0) {
      active.push("status");
    }

    if (currentFilters.dealStage && currentFilters.dealStage.length > 0) {
      active.push("stage");
    }

    if (
      currentFilters.lastActivityDays &&
      currentFilters.lastActivityDays > 0
    ) {
      active.push("recent");
    }

    setActiveFilters(active);
  };

  const clearSearch = () => {
    onSearchChange("");
  };

  const clearAllFilters = () => {
    const clearedFilters: MatchFilters = {};
    onFiltersChange(clearedFilters);
    setActiveFilters([]);
  };

  const hasActiveFilters = activeFilters.length > 0;
  const hasSearchTerm = searchTerm.length > 0;

  return (
    <Box sx={{ p: 2 }}>
      {/* Search Bar */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search conversations, people, or businesses..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" />
            </InputAdornment>
          ),
          endAdornment: hasSearchTerm ? (
            <InputAdornment position="end">
              <IconButton size="small" onClick={clearSearch}>
                <Clear />
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
        sx={{
          mb: 2,
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          },
        }}
      />

      {/* Filter Controls */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 1,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton
            size="small"
            onClick={handleFilterMenuOpen}
            sx={{
              backgroundColor: hasActiveFilters
                ? theme.palette.primary.main + "20"
                : "transparent",
              color: hasActiveFilters ? theme.palette.primary.main : "inherit",
            }}
          >
            <Badge badgeContent={activeFilters.length} color="primary">
              <FilterList />
            </Badge>
          </IconButton>

          <Typography variant="caption" color="text.secondary">
            {filteredConversations} of {totalConversations} conversations
          </Typography>
        </Box>

        {hasActiveFilters && (
          <IconButton size="small" onClick={clearAllFilters}>
            <Clear />
          </IconButton>
        )}
      </Box>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mb: 1 }}>
          {activeFilters.map((filter) => (
            <Chip
              key={filter}
              label={
                filter === "unread"
                  ? "Unread"
                  : filter === "status"
                  ? "Status"
                  : filter === "stage"
                  ? "Deal Stage"
                  : filter === "recent"
                  ? "Recent Activity"
                  : filter
              }
              size="small"
              onDelete={() => {
                if (filter === "unread") {
                  handleFilterChange("hasUnreadMessages", false);
                } else if (filter === "status") {
                  handleFilterChange("status", []);
                } else if (filter === "stage") {
                  handleFilterChange("dealStage", []);
                } else if (filter === "recent") {
                  handleFilterChange("lastActivityDays", undefined);
                }
              }}
              sx={{
                backgroundColor: theme.palette.primary.main + "10",
                border: `1px solid ${theme.palette.primary.main}40`,
              }}
            />
          ))}
        </Stack>
      )}

      {/* Filter Menu */}
      <Menu
        anchorEl={filterMenuAnchor}
        open={Boolean(filterMenuAnchor)}
        onClose={handleFilterMenuClose}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 280,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
            Filter Conversations
          </Typography>

          {/* Unread Messages */}
          <FormControlLabel
            control={
              <Switch
                checked={filters.hasUnreadMessages || false}
                onChange={(e) =>
                  handleFilterChange("hasUnreadMessages", e.target.checked)
                }
                size="small"
              />
            }
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Circle
                  sx={{ fontSize: 12, color: theme.palette.error.main }}
                />
                <Typography variant="body2">Unread messages only</Typography>
              </Box>
            }
            sx={{ mb: 2, width: "100%" }}
          />

          <Divider sx={{ my: 2 }} />

          {/* Quick Filters */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 1, display: "block" }}
          >
            Quick Filters
          </Typography>

          <Stack spacing={1}>
            <MenuItem
              onClick={() => {
                handleFilterChange("lastActivityDays", 1);
                handleFilterMenuClose();
              }}
              sx={{ borderRadius: 1 }}
            >
              <ListItemIcon>
                <Schedule fontSize="small" />
              </ListItemIcon>
              <ListItemText>Active today</ListItemText>
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleFilterChange("lastActivityDays", 7);
                handleFilterMenuClose();
              }}
              sx={{ borderRadius: 1 }}
            >
              <ListItemIcon>
                <Schedule fontSize="small" />
              </ListItemIcon>
              <ListItemText>Active this week</ListItemText>
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleFilterChange("dealStage", [
                  "due-diligence",
                  "negotiation",
                ]);
                handleFilterMenuClose();
              }}
              sx={{ borderRadius: 1 }}
            >
              <ListItemIcon>
                <Business fontSize="small" />
              </ListItemIcon>
              <ListItemText>Active deals</ListItemText>
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleFilterChange("status", ["active"]);
                handleFilterMenuClose();
              }}
              sx={{ borderRadius: 1 }}
            >
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText>Active matches</ListItemText>
            </MenuItem>
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Clear Filters */}
          <MenuItem
            onClick={() => {
              clearAllFilters();
              handleFilterMenuClose();
            }}
            sx={{
              borderRadius: 1,
              color: theme.palette.text.secondary,
            }}
          >
            <ListItemIcon>
              <Clear fontSize="small" />
            </ListItemIcon>
            <ListItemText>Clear all filters</ListItemText>
          </MenuItem>
        </Box>
      </Menu>
    </Box>
  );
};

export default ConversationFilters;
