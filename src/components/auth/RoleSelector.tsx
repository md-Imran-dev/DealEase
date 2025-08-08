import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  useTheme,
  alpha,
} from "@mui/material";
import { BusinessCenter, Storefront, CheckCircle } from "@mui/icons-material";
import type { RoleInfo } from "../../types/auth";

interface RoleSelectorProps {
  selectedRole?: "buyer" | "seller";
  onRoleSelect: (role: "buyer" | "seller") => void;
  showSelection?: boolean;
}

const RoleSelector: React.FC<RoleSelectorProps> = ({
  selectedRole,
  onRoleSelect,
  showSelection = true,
}) => {
  const theme = useTheme();

  const roles: RoleInfo[] = [
    {
      id: "buyer",
      title: "Buyer / Investor",
      description: "I want to acquire businesses and make investments",
      features: [
        "Browse business listings",
        "AI-powered matching",
        "Deal tracking & management",
        "Due diligence tools",
        "Messaging with sellers",
      ],
      icon: <BusinessCenter sx={{ fontSize: 48 }} />,
    },
    {
      id: "seller",
      title: "Seller / Business Owner",
      description: "I want to sell my business or seek investment",
      features: [
        "Create business listings",
        "Showcase your company",
        "Connect with qualified buyers",
        "Manage inquiries",
        "Valuation tools",
      ],
      icon: <Storefront sx={{ fontSize: 48 }} />,
    },
  ];

  return (
    <Box>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
          Choose Your Role
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select how you plan to use DealEase. You can change this later in your
          settings.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {roles.map((role) => {
          const isSelected = selectedRole === role.id;

          return (
            <Card
              key={role.id}
              sx={{
                flex: 1,
                cursor: "pointer",
                borderRadius: 3,
                transition: "all 0.3s ease",
                border: `2px solid ${
                  isSelected ? theme.palette.primary.main : "transparent"
                }`,
                background: isSelected
                  ? alpha(theme.palette.primary.main, 0.05)
                  : "background.paper",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
                  borderColor: isSelected
                    ? theme.palette.primary.main
                    : theme.palette.primary.light,
                },
              }}
              onClick={() => onRoleSelect(role.id)}
            >
              <CardContent sx={{ p: 4, textAlign: "center" }}>
                {/* Selection Indicator */}
                {showSelection && isSelected && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      color: theme.palette.primary.main,
                    }}
                  >
                    <CheckCircle />
                  </Box>
                )}

                {/* Icon */}
                <Box
                  sx={{
                    mb: 3,
                    color: isSelected
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                  }}
                >
                  {role.icon}
                </Box>

                {/* Title */}
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: isSelected
                      ? theme.palette.primary.main
                      : "text.primary",
                  }}
                >
                  {role.title}
                </Typography>

                {/* Description */}
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 3, lineHeight: 1.6 }}
                >
                  {role.description}
                </Typography>

                {/* Features */}
                <Box sx={{ textAlign: "left", mb: 3 }}>
                  {role.features.map((feature, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          backgroundColor: isSelected
                            ? theme.palette.primary.main
                            : theme.palette.text.secondary,
                          mr: 2,
                          flexShrink: 0,
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* Action Button */}
                <Button
                  variant={isSelected ? "contained" : "outlined"}
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    py: 1.5,
                    fontWeight: 600,
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRoleSelect(role.id);
                  }}
                >
                  {isSelected ? "Selected" : `Choose ${role.title}`}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Box>
  );
};

export default RoleSelector;
