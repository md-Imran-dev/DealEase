import React, { useState } from "react";
import {
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  useMediaQuery,
  useTheme,
  Chip,
  Stack,
} from "@mui/material";
import { Smartphone, Tablet, Computer, Close } from "@mui/icons-material";

export const ResponsiveTestHelper: React.FC = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  // Media queries
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));
  const isSm = useMediaQuery(theme.breakpoints.only("sm"));
  const isMd = useMediaQuery(theme.breakpoints.only("md"));
  const isLg = useMediaQuery(theme.breakpoints.only("lg"));
  const isXl = useMediaQuery(theme.breakpoints.only("xl"));

  const currentBreakpoint = isXs
    ? "xs"
    : isSm
    ? "sm"
    : isMd
    ? "md"
    : isLg
    ? "lg"
    : "xl";
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Test data for various components
  const testCards = [
    { title: "Buyer Profile", description: "John Smith, Tech Industry" },
    { title: "Active Deal", description: "Manufacturing Co. - $2M" },
    { title: "New Message", description: "From: Sarah Johnson" },
  ];

  return (
    <>
      {/* Floating Action Button */}
      <Fab
        color="secondary"
        aria-label="responsive test"
        onClick={() => setOpen(true)}
        sx={{
          position: "fixed",
          bottom: 80,
          right: 16,
          zIndex: 1000,
          opacity: 0.8,
          "&:hover": { opacity: 1 },
        }}
      >
        <Computer />
      </Fab>

      {/* Responsive Test Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              📱 Responsive Design Test
            </Typography>
            <Button
              onClick={() => setOpen(false)}
              startIcon={<Close />}
              size="small"
            >
              Close
            </Button>
          </Box>
        </DialogTitle>

        <DialogContent>
          {/* Current Breakpoint Info */}
          <Card sx={{ mb: 3, bgcolor: "primary.main", color: "white" }}>
            <CardContent>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                flexWrap="wrap"
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Current Breakpoint: {currentBreakpoint.toUpperCase()}
                </Typography>
                <Typography variant="body2">
                  {screenWidth} × {screenHeight}px
                </Typography>
                {isXs && (
                  <Chip icon={<Smartphone />} label="Mobile" size="small" />
                )}
                {(isSm || isMd) && (
                  <Chip icon={<Tablet />} label="Tablet" size="small" />
                )}
                {(isLg || isXl) && (
                  <Chip icon={<Computer />} label="Desktop" size="small" />
                )}
              </Stack>
            </CardContent>
          </Card>

          {/* Breakpoint Guide */}
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            📏 MUI Breakpoints
          </Typography>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[
              {
                name: "xs",
                range: "0-600px",
                icon: <Smartphone />,
                desc: "Mobile phones",
              },
              {
                name: "sm",
                range: "600-900px",
                icon: <Tablet />,
                desc: "Small tablets",
              },
              {
                name: "md",
                range: "900-1200px",
                icon: <Tablet />,
                desc: "Large tablets",
              },
              {
                name: "lg",
                range: "1200-1536px",
                icon: <Computer />,
                desc: "Small laptops",
              },
              {
                name: "xl",
                range: "1536px+",
                icon: <Computer />,
                desc: "Large screens",
              },
            ].map((bp) => (
              <Grid item xs={12} sm={6} md={4} key={bp.name}>
                <Card
                  sx={{
                    bgcolor:
                      currentBreakpoint === bp.name
                        ? "success.light"
                        : "grey.100",
                    color:
                      currentBreakpoint === bp.name ? "white" : "text.primary",
                  }}
                >
                  <CardContent sx={{ py: 2 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {bp.icon}
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {bp.name.toUpperCase()}
                        </Typography>
                        <Typography variant="caption" display="block">
                          {bp.range}
                        </Typography>
                        <Typography variant="caption" display="block">
                          {bp.desc}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Test Components Layout */}
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            🧪 Component Layout Test
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            These components should adapt nicely to your current screen size:
          </Typography>

          <Grid container spacing={2}>
            {testCards.map((card, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card sx={{ height: "100%" }}>
                  <CardContent>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ fontWeight: 600 }}
                    >
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                    <Button size="small" sx={{ mt: 2 }} fullWidth={isXs}>
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Responsive Tips */}
          <Box sx={{ mt: 3, p: 2, bgcolor: "info.light", borderRadius: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
              💡 Responsive Design Tips:
            </Typography>
            <Typography variant="body2" component="div">
              <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
                <li>
                  Test all major features on mobile (xs) and tablet (sm/md)
                  sizes
                </li>
                <li>
                  Ensure buttons and interactive elements are easily tappable
                  (44px+)
                </li>
                <li>
                  Text should be readable without zooming (16px+ on mobile)
                </li>
                <li>
                  Navigation should be accessible and not overwhelm small
                  screens
                </li>
                <li>
                  Forms should stack vertically on mobile for better usability
                </li>
              </ul>
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
