import React, { useState, useCallback, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Card,
  Avatar,
  IconButton,
  useTheme,
  Alert,
  CircularProgress,
  Slider,
} from "@mui/material";
import {
  CloudUpload,
  Close,
  ZoomIn,
  ZoomOut,
  RotateLeft,
  RotateRight,
  CheckCircle,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";

interface ProfilePictureUploadProps {
  open: boolean;
  onClose: () => void;
  onImageUploaded: (imageUrl: string) => void;
  currentImage?: string;
  userName: string;
}

const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  open,
  onClose,
  onImageUploaded,
  currentImage,
  userName,
}) => {
  const theme = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [cropMode, setCropMode] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [cropPosition, setCropPosition] = useState({ x: 0, y: 0 });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("File size must be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
        setCropMode(true);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    maxFiles: 1,
    multiple: false,
  });

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onDrop([file]);
    }
  };

  const handleCropImage = () => {
    if (!selectedImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Set canvas size for profile picture (square, 300x300)
      canvas.width = 300;
      canvas.height = 300;

      // Clear canvas
      ctx.clearRect(0, 0, 300, 300);

      // Apply transformations
      ctx.save();
      ctx.translate(150, 150); // Center
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.scale(zoom, zoom);
      ctx.translate(-150, -150);

      // Draw image
      const size = Math.min(img.width, img.height);
      const sx = (img.width - size) / 2 + cropPosition.x;
      const sy = (img.height - size) / 2 + cropPosition.y;

      ctx.drawImage(img, sx, sy, size, size, 0, 0, 300, 300);
      ctx.restore();

      // Convert to blob and create URL
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            handleUpload(url);
          }
        },
        "image/jpeg",
        0.9
      );
    };
    img.src = selectedImage;
  };

  const handleUpload = async (imageUrl: string) => {
    setUploading(true);

    try {
      // Simulate upload delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // In a real app, you'd upload to your server/cloud storage
      onImageUploaded(imageUrl);
      handleClose();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    onImageUploaded("");
    handleClose();
  };

  const handleClose = () => {
    setSelectedImage(null);
    setCropMode(false);
    setZoom(1);
    setRotation(0);
    setCropPosition({ x: 0, y: 0 });
    setUploading(false);
    onClose();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 3 },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Profile Picture
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {!cropMode ? (
          <>
            {/* Current Profile Picture */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Avatar
                src={currentImage}
                sx={{
                  width: 120,
                  height: 120,
                  mx: "auto",
                  mb: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  fontSize: "2.5rem",
                  fontWeight: 600,
                }}
              >
                {!currentImage && getInitials(userName)}
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {userName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {currentImage
                  ? "Update your profile picture"
                  : "Add a profile picture"}
              </Typography>
            </Box>

            {/* Upload Area */}
            <Card
              {...getRootProps()}
              sx={{
                p: 4,
                textAlign: "center",
                cursor: "pointer",
                border: `2px dashed ${
                  isDragActive
                    ? theme.palette.primary.main
                    : theme.palette.divider
                }`,
                backgroundColor: isDragActive
                  ? theme.palette.primary.main + "08"
                  : theme.palette.grey[50],
                transition: "all 0.3s ease",
                "&:hover": {
                  borderColor: theme.palette.primary.main,
                  backgroundColor: theme.palette.primary.main + "04",
                },
                mb: 3,
              }}
            >
              <input {...getInputProps()} />
              <CloudUpload
                sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {isDragActive
                  ? "Drop your image here"
                  : "Drop an image or click to browse"}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Supports JPG, PNG, GIF, WebP (max 5MB)
              </Typography>
              <Button
                variant="outlined"
                onClick={handleFileSelect}
                sx={{ borderRadius: 2 }}
              >
                Choose File
              </Button>
            </Card>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {/* Tips */}
            <Alert severity="info" sx={{ borderRadius: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                💡 Tips for great profile pictures:
              </Typography>
              <Typography variant="body2">
                • Use a high-quality, well-lit photo
                <br />
                • Face should be clearly visible and centered
                <br />
                • Professional appearance recommended for business networking
                <br />• Square images work best (will be cropped to circle)
              </Typography>
            </Alert>
          </>
        ) : (
          <>
            {/* Crop Interface */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                Crop & Adjust Your Photo
              </Typography>

              {/* Preview */}
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                    mx: "auto",
                    border: `2px solid ${theme.palette.divider}`,
                    borderRadius: "50%",
                    overflow: "hidden",
                    position: "relative",
                    background: theme.palette.grey[100],
                  }}
                >
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: `scale(${zoom}) rotate(${rotation}deg)`,
                        transition: "transform 0.2s ease",
                      }}
                    />
                  )}
                </Box>
              </Box>

              {/* Controls */}
              <Box
                sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}
              >
                {/* Zoom */}
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Zoom
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
                    >
                      <ZoomOut />
                    </IconButton>
                    <Slider
                      value={zoom}
                      onChange={(_, value) => setZoom(value as number)}
                      min={0.5}
                      max={3}
                      step={0.1}
                      sx={{ flexGrow: 1 }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => setZoom(Math.min(3, zoom + 0.1))}
                    >
                      <ZoomIn />
                    </IconButton>
                  </Box>
                </Box>

                {/* Rotation */}
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Rotation
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => setRotation((rotation - 90) % 360)}
                    >
                      <RotateLeft />
                    </IconButton>
                    <Slider
                      value={rotation}
                      onChange={(_, value) => setRotation(value as number)}
                      min={-180}
                      max={180}
                      step={15}
                      sx={{ flexGrow: 1 }}
                    />
                    <IconButton
                      size="small"
                      onClick={() => setRotation((rotation + 90) % 360)}
                    >
                      <RotateRight />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* Hidden canvas for processing */}
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          onClick={handleClose}
          disabled={uploading}
          sx={{ borderRadius: 2 }}
        >
          Cancel
        </Button>

        {currentImage && !cropMode && (
          <Button
            color="error"
            onClick={handleRemoveImage}
            disabled={uploading}
            sx={{ borderRadius: 2 }}
          >
            Remove Photo
          </Button>
        )}

        {cropMode && (
          <>
            <Button
              onClick={() => setCropMode(false)}
              disabled={uploading}
              sx={{ borderRadius: 2 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleCropImage}
              disabled={uploading}
              startIcon={
                uploading ? <CircularProgress size={16} /> : <CheckCircle />
              }
              sx={{ borderRadius: 2, fontWeight: 600 }}
            >
              {uploading ? "Uploading..." : "Save Photo"}
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ProfilePictureUpload;
