import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  Chip,
  Avatar,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Alert,
  CircularProgress,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import {
  Add as AddIcon,
  Business as BusinessIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  MoreVert as MoreIcon,
  AttachMoney as MoneyIcon,
  LocationOn as LocationIcon,
  People as PeopleIcon,
  TrendingUp as TrendingIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { businessService, storageService } from "../lib/Appwrite";
import { useUserStore } from "../store/userStore";
import CreateBusinessForm from "../components/business/CreateBusinessForm";
import type { Business } from "../types/business";

export default function SellerBusinesses() {
  const { user } = useUserStore();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(
    null
  );
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const [menuBusinessId, setMenuBusinessId] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadBusinesses();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadBusinesses = async () => {
    if (!user?.id) {
      console.log("🚫 No user ID, cannot load businesses");
      setLoading(false);
      return;
    }

    try {
      console.log("🔄 Loading businesses for user:", user.id);
      setLoading(true);
      setError(null);
      const userBusinesses = await businessService.getBusinessesBySeller(
        user.id
      );
      console.log("✅ Businesses loaded:", userBusinesses);
      console.log("📊 Number of businesses found:", userBusinesses.length);

      // Debug image data
      userBusinesses.forEach((business, index) => {
        console.log(`🏢 Business ${index + 1}: "${business.title}"`);
        console.log(`   📸 Images array:`, business.images);
        console.log(`   📄 Documents array:`, business.documents);
      });

      setBusinesses(userBusinesses);
    } catch (err: any) {
      console.error("❌ Error loading businesses:", err);
      setError("Failed to load your business listings");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSuccess = (businessId: string) => {
    console.log("🎉 Business created successfully with ID:", businessId);
    setShowCreateDialog(false);
    console.log("🔄 Refreshing business list...");

    // Small delay to ensure user context is available
    setTimeout(() => {
      loadBusinesses();
    }, 500);
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    businessId: string
  ) => {
    setMenuAnchor(event.currentTarget);
    setMenuBusinessId(businessId);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setMenuBusinessId(null);
  };

  const handleViewBusiness = (business: Business) => {
    setSelectedBusiness(business);
    handleMenuClose();
  };

  const handleEditBusiness = (businessId: string) => {
    // TODO: Implement edit functionality
    console.log("Edit business:", businessId);
    handleMenuClose();
  };

  const handleDeleteBusiness = async (businessId: string) => {
    if (
      !window.confirm("Are you sure you want to delete this business listing?")
    ) {
      return;
    }

    try {
      await businessService.deleteBusiness(businessId);
      await loadBusinesses(); // Refresh the list
    } catch (err: any) {
      console.error("Error deleting business:", err);
      setError("Failed to delete business listing");
    }
    handleMenuClose();
  };

  const getBusinessImageUrl = (business: Business) => {
    if (business.images && business.images.length > 0) {
      try {
        const url = storageService.getBusinessImageUrl(
          business.images[0],
          300,
          200
        );
        console.log(
          "🖼️ Image URL for business:",
          business.title,
          "->",
          url.toString()
        );
        return url.toString();
      } catch (error) {
        console.error("❌ Error getting image URL:", error);
        return null;
      }
    }
    return null;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (!user || user.role !== "seller") {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Alert severity="warning">
          You need to be logged in as a seller to view this page.
        </Alert>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 400,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <BusinessIcon color="primary" />
            My Business Listings
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your business listings and track their performance
          </Typography>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {businesses.length === 0 ? (
        <Card sx={{ p: 4, textAlign: "center" }}>
          <BusinessIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No Business Listings Yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Create your first business listing to start connecting with
            potential buyers
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={() => setShowCreateDialog(true)}
          >
            Create Your First Listing
          </Button>
        </Card>
      ) : (
        <>
          <Grid container spacing={3}>
            {businesses.map((business) => (
              <Grid item xs={12} sm={6} lg={4} key={business.$id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {getBusinessImageUrl(business) ? (
                    <CardMedia
                      component="img"
                      height="200"
                      image={getBusinessImageUrl(business)!}
                      alt={business.title}
                      onError={(e) => {
                        console.error(
                          "❌ Image failed to load:",
                          getBusinessImageUrl(business)
                        );
                        e.currentTarget.style.display = "none";
                      }}
                      onLoad={() => {
                        console.log(
                          "✅ Image loaded successfully:",
                          getBusinessImageUrl(business)
                        );
                      }}
                    />
                  ) : (
                    <CardMedia
                      sx={{
                        height: 200,
                        bgcolor: "grey.200",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <BusinessIcon sx={{ fontSize: 48, color: "grey.400" }} />
                    </CardMedia>
                  )}

                  <CardContent sx={{ flex: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6" component="h2" sx={{ flex: 1 }}>
                        {business.title}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuClick(e, business.$id)}
                      >
                        <MoreIcon />
                      </IconButton>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {business.description}
                    </Typography>

                    <Box
                      sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}
                    >
                      <Chip
                        size="small"
                        label={business.industry}
                        color="primary"
                        variant="outlined"
                      />
                      {business.stage && (
                        <Chip
                          size="small"
                          label={business.stage}
                          variant="outlined"
                        />
                      )}
                      <Chip
                        size="small"
                        label={business.isActive ? "Active" : "Inactive"}
                        color={business.isActive ? "success" : "default"}
                        variant="filled"
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 1,
                        flexWrap: "wrap",
                      }}
                    >
                      {business.askingPrice > 0 && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <MoneyIcon
                            sx={{ fontSize: 16, color: "text.secondary" }}
                          />
                          <Typography variant="body2" fontWeight="bold">
                            {formatCurrency(business.askingPrice)}
                          </Typography>
                        </Box>
                      )}

                      {business.employees && (
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <PeopleIcon
                            sx={{ fontSize: 16, color: "text.secondary" }}
                          />
                          <Typography variant="body2">
                            {business.employees} employees
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {business.location && (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          mb: 1,
                        }}
                      >
                        <LocationIcon
                          sx={{ fontSize: 16, color: "text.secondary" }}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {business.location}
                        </Typography>
                      </Box>
                    )}

                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                    >
                      <ViewIcon
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {business.views || 0} views
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Fab
            color="primary"
            aria-label="add"
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            onClick={() => setShowCreateDialog(true)}
          >
            <AddIcon />
          </Fab>
        </>
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            const business = businesses.find((b) => b.$id === menuBusinessId);
            if (business) handleViewBusiness(business);
          }}
        >
          <ViewIcon sx={{ mr: 1 }} /> View Details
        </MenuItem>
        <MenuItem
          onClick={() => menuBusinessId && handleEditBusiness(menuBusinessId)}
        >
          <EditIcon sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => menuBusinessId && handleDeleteBusiness(menuBusinessId)}
          sx={{ color: "error.main" }}
        >
          <DeleteIcon sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      {/* Create Business Dialog */}
      <Dialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { height: "90vh" },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Create New Business Listing
          <IconButton onClick={() => setShowCreateDialog(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <CreateBusinessForm
            onSuccess={handleCreateSuccess}
            onCancel={() => setShowCreateDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Business Details Dialog */}
      <Dialog
        open={Boolean(selectedBusiness)}
        onClose={() => setSelectedBusiness(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedBusiness && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {selectedBusiness.title}
              <IconButton onClick={() => setSelectedBusiness(null)}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="body1" paragraph>
                    {selectedBusiness.description}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Industry
                  </Typography>
                  <Typography variant="body2">
                    {selectedBusiness.industry}
                  </Typography>
                </Grid>

                {selectedBusiness.businessModel && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Business Model
                    </Typography>
                    <Typography variant="body2">
                      {selectedBusiness.businessModel}
                    </Typography>
                  </Grid>
                )}

                {selectedBusiness.stage && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Stage
                    </Typography>
                    <Typography variant="body2">
                      {selectedBusiness.stage}
                    </Typography>
                  </Grid>
                )}

                {selectedBusiness.location && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Location
                    </Typography>
                    <Typography variant="body2">
                      {selectedBusiness.location}
                    </Typography>
                  </Grid>
                )}

                {selectedBusiness.askingPrice > 0 && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Asking Price
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {formatCurrency(selectedBusiness.askingPrice)}
                    </Typography>
                  </Grid>
                )}

                {selectedBusiness.revenue > 0 && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Annual Revenue
                    </Typography>
                    <Typography variant="body2">
                      {formatCurrency(selectedBusiness.revenue)}
                    </Typography>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Performance
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Chip label={`${selectedBusiness.views || 0} views`} />
                    <Chip
                      label={selectedBusiness.isActive ? "Active" : "Inactive"}
                      color={selectedBusiness.isActive ? "success" : "default"}
                    />
                    {selectedBusiness.isVerified && (
                      <Chip label="Verified" color="primary" />
                    )}
                    {selectedBusiness.isFeatured && (
                      <Chip label="Featured" color="secondary" />
                    )}
                  </Box>
                </Grid>

                {selectedBusiness.tags && selectedBusiness.tags.length > 0 && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                      Tags
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                      {selectedBusiness.tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Grid>
                )}
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}
