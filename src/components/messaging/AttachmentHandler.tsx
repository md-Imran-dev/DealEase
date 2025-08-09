import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Alert,
  Chip,
  useTheme,
  Stack,
  IconButton,
  Grid,
  Tooltip,
} from "@mui/material";
import {
  CloudUpload,
  Close,
  Description,
  Image as ImageIcon,
  VideoFile,
  AudioFile,
  InsertDriveFile,
  Security,
  CheckCircle,
  Warning,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import type { MessageAttachment } from "../../types/match";

interface AttachmentHandlerProps {
  open: boolean;
  onClose: () => void;
  onAttachmentsReady: (attachments: MessageAttachment[]) => void;
  maxFiles?: number;
  maxFileSize?: number; // in bytes
}

const AttachmentHandler: React.FC<AttachmentHandlerProps> = ({
  open,
  onClose,
  onAttachmentsReady,
  maxFiles = 5,
  maxFileSize = 25 * 1024 * 1024, // 25MB
}) => {
  const theme = useTheme();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>(
    {}
  );
  const [processingFiles, setProcessingFiles] = useState<
    Record<string, boolean>
  >({});
  const [completedAttachments, setCompletedAttachments] = useState<
    MessageAttachment[]
  >([]);

  const allowedTypes = {
    "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
    "application/vnd.ms-excel": [".xls"],
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
      ".xlsx",
    ],
    "application/vnd.ms-powerpoint": [".ppt"],
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      [".pptx"],
    "text/plain": [".txt"],
    "video/*": [".mp4", ".mov", ".avi", ".wmv"],
    "audio/*": [".mp3", ".wav", ".m4a"],
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      // Handle rejected files
      if (rejectedFiles.length > 0) {
        console.warn("Some files were rejected:", rejectedFiles);
      }

      // Filter and validate accepted files
      const validFiles = acceptedFiles.filter((file) => {
        if (file.size > maxFileSize) {
          console.warn(`File ${file.name} is too large`);
          return false;
        }
        return true;
      });

      if (uploadedFiles.length + validFiles.length > maxFiles) {
        console.warn(`Too many files. Maximum ${maxFiles} files allowed`);
        return;
      }

      if (validFiles.length > 0) {
        setUploadedFiles((prev) => [...prev, ...validFiles]);

        // Start upload simulation for each file
        validFiles.forEach((file) => {
          startFileUpload(file);
        });
      }
    },
    [uploadedFiles.length, maxFiles, maxFileSize]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedTypes,
    maxSize: maxFileSize,
    maxFiles: maxFiles - uploadedFiles.length,
  });

  const startFileUpload = (file: File) => {
    const fileId = `${file.name}-${Date.now()}`;
    setProcessingFiles((prev) => ({ ...prev, [fileId]: true }));

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5; // 5-20% increments

      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        completeFileUpload(file, fileId);
      }

      setUploadProgress((prev) => ({ ...prev, [fileId]: progress }));
    }, 300);
  };

  const completeFileUpload = (file: File, fileId: string) => {
    // Create mock attachment
    const attachment: MessageAttachment = {
      id: fileId,
      name: file.name,
      type: getFileType(file),
      url: URL.createObjectURL(file), // In real app, this would be the uploaded file URL
      size: file.size,
      uploadedAt: new Date(),
    };

    setCompletedAttachments((prev) => [...prev, attachment]);
    setProcessingFiles((prev) => {
      const newState = { ...prev };
      delete newState[fileId];
      return newState;
    });
    setUploadProgress((prev) => {
      const newState = { ...prev };
      delete newState[fileId];
      return newState;
    });
  };

  const getFileType = (file: File): MessageAttachment["type"] => {
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    if (file.type.startsWith("audio/")) return "audio";
    return "document";
  };

  const getFileIcon = (file: File) => {
    const type = getFileType(file);
    const iconProps = { sx: { fontSize: 24 } };

    switch (type) {
      case "image":
        return <ImageIcon {...iconProps} color="primary" />;
      case "video":
        return <VideoFile {...iconProps} color="secondary" />;
      case "audio":
        return <AudioFile {...iconProps} color="info" />;
      default:
        return <Description {...iconProps} color="action" />;
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeAttachment = (attachmentId: string) => {
    setCompletedAttachments((prev) =>
      prev.filter((att) => att.id !== attachmentId)
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleSendWithAttachments = () => {
    if (completedAttachments.length > 0) {
      onAttachmentsReady(completedAttachments);
      handleClose();
    }
  };

  const handleClose = () => {
    setUploadedFiles([]);
    setUploadProgress({});
    setProcessingFiles({});
    setCompletedAttachments([]);
    onClose();
  };

  const isProcessing = Object.keys(processingFiles).length > 0;
  const canSend = completedAttachments.length > 0 && !isProcessing;

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
            Attach Files
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent>
        {/* Security Notice */}
        <Alert
          severity="info"
          icon={<Security />}
          sx={{ mb: 3, borderRadius: 2 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            🔒 Secure File Sharing
          </Typography>
          <Typography variant="body2">
            Files are encrypted and only accessible to matched parties. Maximum{" "}
            {maxFiles} files, {formatFileSize(maxFileSize)} per file.
          </Typography>
        </Alert>

        {/* Drop Zone */}
        <Card
          {...getRootProps()}
          sx={{
            mb: 3,
            p: 4,
            textAlign: "center",
            cursor: "pointer",
            border: `2px dashed ${
              isDragActive ? theme.palette.primary.main : theme.palette.divider
            }`,
            backgroundColor: isDragActive
              ? theme.palette.primary.main + "08"
              : theme.palette.grey[50],
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.primary.main + "04",
            },
          }}
        >
          <input {...getInputProps()} />
          <CloudUpload
            sx={{ fontSize: 48, color: theme.palette.primary.main, mb: 2 }}
          />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            {isDragActive ? "Drop files here" : "Drop files or click to browse"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Supports images, documents, videos, and audio files
          </Typography>
        </Card>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Uploading Files ({uploadedFiles.length})
            </Typography>
            <Stack spacing={2}>
              {uploadedFiles.map((file, index) => {
                const fileId = `${file.name}-${Date.now()}`;
                const progress = uploadProgress[fileId] || 0;

                return (
                  <Card key={index} sx={{ borderRadius: 2 }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        {getFileIcon(file)}

                        <Box sx={{ flexGrow: 1 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                          >
                            {file.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatFileSize(file.size)}
                          </Typography>

                          <LinearProgress
                            variant="determinate"
                            value={progress}
                            sx={{ mt: 1, height: 6, borderRadius: 3 }}
                          />
                        </Box>

                        <IconButton
                          size="small"
                          onClick={() => removeFile(index)}
                          disabled={processingFiles[fileId]}
                        >
                          <Close />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                );
              })}
            </Stack>
          </Box>
        )}

        {/* Completed Attachments */}
        {completedAttachments.length > 0 && (
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
              Ready to Send ({completedAttachments.length})
            </Typography>
            <Grid container spacing={2}>
              {completedAttachments.map((attachment) => (
                <Grid item xs={12} sm={6} key={attachment.id}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.success.main}40`,
                    }}
                  >
                    <CardContent sx={{ p: 2 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        {attachment.type === "image" ? (
                          <ImageIcon color="primary" />
                        ) : attachment.type === "video" ? (
                          <VideoFile color="secondary" />
                        ) : attachment.type === "audio" ? (
                          <AudioFile color="info" />
                        ) : (
                          <Description color="action" />
                        )}

                        <Box sx={{ flexGrow: 1 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 600 }}
                          >
                            {attachment.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatFileSize(attachment.size)}
                          </Typography>
                        </Box>

                        <Tooltip title="Upload complete">
                          <CheckCircle color="success" sx={{ fontSize: 20 }} />
                        </Tooltip>

                        <IconButton
                          size="small"
                          onClick={() => removeAttachment(attachment.id)}
                        >
                          <Close />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* File Type Info */}
        {uploadedFiles.length === 0 && completedAttachments.length === 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Supported File Types:
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {[
                "Images",
                "PDFs",
                "Word",
                "Excel",
                "PowerPoint",
                "Videos",
                "Audio",
              ].map((type) => (
                <Chip key={type} label={type} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button onClick={handleClose} sx={{ borderRadius: 2 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSendWithAttachments}
          disabled={!canSend}
          sx={{ borderRadius: 2, fontWeight: 600 }}
        >
          Send{" "}
          {completedAttachments.length > 0 &&
            `(${completedAttachments.length})`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttachmentHandler;
