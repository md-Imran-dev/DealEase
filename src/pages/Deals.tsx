import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  CircularProgress,
  Alert,
  Avatar,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  HandshakeRounded as DealsIcon,
  AttachMoney as MoneyIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
  CheckCircle as AcceptIcon,
  Cancel as RejectIcon,
  Visibility as ViewIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useUserStore } from "../store/userStore";
import { useUIStore } from "../store/uiStore";
import { dealService, businessService } from "../lib/Appwrite";
import type { Deal } from "../types/deal";
import type { Business } from "../types/business";

const Deals: React.FC = () => {
  const { user } = useUserStore();
  const { showToast } = useUIStore();

  const [deals, setDeals] = useState<Deal[]>([]);
  const [businesses, setBusinesses] = useState<Record<string, Business>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [counterOfferAmount, setCounterOfferAmount] = useState<number>(0);

  useEffect(() => {
    if (user?.id) {
      loadDeals();
    }
  }, [user]);

  const loadDeals = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      setError(null);
      console.log("🔄 Loading deals for user:", user.id, "Role:", user.role);

      let userDeals: Deal[] = [];

      if (user.role === "seller") {
        // Get only deals for this seller's businesses
        userDeals = await dealService.getSellerDeals(user.id);
        console.log("📊 Seller deals found:", userDeals.length);
      } else if (user.role === "buyer") {
        // Get only deals this buyer made
        userDeals = await dealService.getBuyerDeals(user.id);
        console.log("📊 Buyer deals found:", userDeals.length);
      }

      setDeals(userDeals);

      // Fetch business details for each deal
      const businessIds = [
        ...new Set(userDeals.map((deal) => deal.businessId)),
      ];
      const businessMap: Record<string, Business> = {};

      console.log("🏢 Fetching business details for IDs:", businessIds);

      for (const businessId of businessIds) {
        try {
          const business = await businessService.getBusiness(businessId);
          businessMap[businessId] = business;
        } catch (error) {
          console.error(`❌ Error fetching business ${businessId}:`, error);
        }
      }

      setBusinesses(businessMap);
      console.log(
        "✅ Business details loaded:",
        Object.keys(businessMap).length
      );
    } catch (err: any) {
      console.error("❌ Error loading deals:", err);
      setError("Failed to load deals");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAcceptDeal = async (deal: Deal) => {
    try {
      console.log("✅ Accepting deal:", deal.$id);
      await dealService.updateDeal(deal.$id, { status: "accepted" });

      const businessTitle =
        businesses[deal.businessId]?.title || "this business";
      showToast({
        type: "success",
        title: "Deal Accepted!",
        message: `You accepted the offer of ${formatCurrency(
          deal.offerAmount || deal.offeredPrice || 0
        )} for ${businessTitle}`,
      });

      await loadDeals(); // Refresh the list
    } catch (error: any) {
      console.error("❌ Error accepting deal:", error);
      showToast({
        type: "error",
        title: "Failed to Accept Deal",
        message: "There was an error accepting the deal. Please try again.",
      });
    }
  };

  const handleRejectDeal = async (deal: Deal) => {
    try {
      console.log("❌ Rejecting deal:", deal.$id);
      await dealService.updateDeal(deal.$id, { status: "rejected" });

      const businessTitle =
        businesses[deal.businessId]?.title || "this business";
      showToast({
        type: "info",
        title: "Deal Rejected",
        message: `You rejected the offer for ${businessTitle}`,
      });

      await loadDeals(); // Refresh the list
    } catch (error: any) {
      console.error("❌ Error rejecting deal:", error);
      showToast({
        type: "error",
        title: "Failed to Reject Deal",
        message: "There was an error rejecting the deal. Please try again.",
      });
    }
  };

  const handleViewDetails = (deal: Deal) => {
    setSelectedDeal(deal);
    setCounterOfferAmount(deal.offerAmount || 0);
    setModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "inquiry":
        return "warning";
      case "accepted":
        return "success";
      case "rejected":
        return "error";
      case "negotiation":
        return "info";
      default:
        return "default";
    }
  };

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

  if (!user) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Alert severity="warning">Please log in to view your deals.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 1,
            fontWeight: 600,
            color: "text.primary",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <DealsIcon color="primary" />
          My Deals
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {user.role === "seller"
            ? "Manage offers and requests for your business listings"
            : "Track your offers and deal progress"}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Results Summary */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="body1" color="text.secondary">
          {deals.length} deal{deals.length !== 1 ? "s" : ""} found
        </Typography>
      </Box>

      {/* Deals Grid */}
      {deals.length > 0 ? (
        <Grid container spacing={3}>
          {deals.map((deal) => (
            <Grid item xs={12} sm={6} lg={4} key={deal.$id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
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
                      {businesses[deal.businessId]?.title || "Business Deal"}
                    </Typography>
                    <Chip
                      size="small"
                      label={deal.status || "pending"}
                      color={getStatusColor(deal.status || "pending") as any}
                      variant="filled"
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <PersonIcon
                      sx={{ fontSize: 16, color: "text.secondary" }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {user.role === "seller" ? "Buyer ID:" : "Your Offer"}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {user.role === "seller" ? deal.buyerId : "Submitted"}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <MoneyIcon sx={{ fontSize: 16, color: "text.secondary" }} />
                    <Typography variant="body2" color="text.secondary">
                      Offer Amount:
                    </Typography>
                    <Typography
                      variant="body2"
                      fontWeight="bold"
                      color="primary"
                    >
                      {formatCurrency(
                        deal.offerAmount || deal.offeredPrice || 0
                      )}
                    </Typography>
                  </Box>

                  {deal.askingPrice && deal.askingPrice > 0 && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <BusinessIcon
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        Asking Price:
                      </Typography>
                      <Typography variant="body2">
                        {formatCurrency(deal.askingPrice)}
                      </Typography>
                    </Box>
                  )}

                  {deal.notes && (
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
                      {deal.notes}
                    </Typography>
                  )}

                  <Typography variant="caption" color="text.secondary">
                    Created: {new Date(deal.$createdAt).toLocaleDateString()}
                  </Typography>

                  <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ViewIcon />}
                      onClick={() => handleViewDetails(deal)}
                      sx={{ flex: 1 }}
                    >
                      View Details
                    </Button>

                    {user.role === "seller" &&
                      (deal.status === "pending" ||
                        deal.status === "inquiry") && (
                        <>
                          <Button
                            variant="contained"
                            size="small"
                            color="success"
                            startIcon={<AcceptIcon />}
                            onClick={() => handleAcceptDeal(deal)}
                            sx={{ flex: 1 }}
                          >
                            Accept
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            color="error"
                            startIcon={<RejectIcon />}
                            onClick={() => handleRejectDeal(deal)}
                            sx={{ flex: 1 }}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card sx={{ p: 4, textAlign: "center" }}>
          <DealsIcon sx={{ fontSize: 64, color: "text.secondary", mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No Deals Yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {user.role === "seller"
              ? "You haven't received any offers yet. Buyers will see your listings in the marketplace."
              : "You haven't made any offers yet. Browse the marketplace to find businesses to purchase."}
          </Typography>
          <Button
            variant="contained"
            href={user.role === "seller" ? "/businesses" : "/marketplace"}
          >
            {user.role === "seller"
              ? "Manage My Businesses"
              : "Browse Marketplace"}
          </Button>
        </Card>
      )}

      {/* Deal Details Modal */}
      <Dialog
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        {selectedDeal && (
          <>
            <DialogTitle
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Deal Details
              <Button onClick={() => setModalOpen(false)}>
                <CloseIcon />
              </Button>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  {businesses[selectedDeal.businessId]?.title ||
                    "Business Deal"}
                </Typography>
                <Chip
                  label={selectedDeal.status || "pending"}
                  color={
                    getStatusColor(selectedDeal.status || "pending") as any
                  }
                  sx={{ mb: 2 }}
                />
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Offer Amount
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {formatCurrency(
                      selectedDeal.offerAmount || selectedDeal.offeredPrice || 0
                    )}
                  </Typography>
                </Grid>

                {selectedDeal.askingPrice && (
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Asking Price
                    </Typography>
                    <Typography variant="h6">
                      {formatCurrency(selectedDeal.askingPrice)}
                    </Typography>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {user.role === "seller" ? "Buyer ID" : "Seller ID"}
                  </Typography>
                  <Typography variant="body2">
                    {user.role === "seller"
                      ? selectedDeal.buyerId
                      : selectedDeal.sellerId}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Date Created
                  </Typography>
                  <Typography variant="body2">
                    {new Date(selectedDeal.$createdAt).toLocaleDateString()}
                  </Typography>
                </Grid>

                {selectedDeal.notes && (
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle2"
                      color="text.secondary"
                      gutterBottom
                    >
                      Notes
                    </Typography>
                    <Typography variant="body2">
                      {selectedDeal.notes}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </DialogContent>

            <DialogActions sx={{ p: 3 }}>
              {user.role === "seller" &&
                (selectedDeal.status === "pending" ||
                  selectedDeal.status === "inquiry") && (
                  <>
                    <Button
                      variant="contained"
                      color="success"
                      startIcon={<AcceptIcon />}
                      onClick={() => {
                        handleAcceptDeal(selectedDeal);
                        setModalOpen(false);
                      }}
                    >
                      Accept Offer
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      startIcon={<RejectIcon />}
                      onClick={() => {
                        handleRejectDeal(selectedDeal);
                        setModalOpen(false);
                      }}
                    >
                      Reject Offer
                    </Button>
                  </>
                )}
              <Button onClick={() => setModalOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default Deals;
