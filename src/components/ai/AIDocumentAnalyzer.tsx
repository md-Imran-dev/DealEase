import React, { useState, useCallback } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Alert,
  Chip,
  useTheme,
  Stack,
  CircularProgress,
  Paper,
  IconButton,
  Tooltip,
  Collapse,
} from "@mui/material";
import {
  CloudUpload,
  Description,
  Psychology,
  TrendingUp,
  Warning,
  CheckCircle,
  Refresh,
  Visibility,
  ExpandMore,
  ExpandLess,
  SmartToy,
} from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import type {
  AIDocumentAnalysis,
  AIAnalysisProgress,
} from "../../types/aiAnalysis";
import { generateMockAIAnalysis } from "../../data/mockAIAnalysis";
import AIAnalysisResults from "./AIAnalysisResults";

interface AIDocumentAnalyzerProps {
  onAnalysisComplete: (analysis: AIDocumentAnalysis) => void;
  allowedFileTypes?: string[];
  maxFileSize?: number; // in bytes
  disabled?: boolean;
}

const AIDocumentAnalyzer: React.FC<AIDocumentAnalyzerProps> = ({
  onAnalysisComplete,
  allowedFileTypes = [".pdf", ".xlsx", ".xls", ".csv"],
  maxFileSize = 10 * 1024 * 1024, // 10MB
  disabled = false,
}) => {
  const theme = useTheme();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState<
    Record<string, AIAnalysisProgress>
  >({});
  const [completedAnalyses, setCompletedAnalyses] = useState<
    AIDocumentAnalysis[]
  >([]);
  const [selectedAnalysis, setSelectedAnalysis] =
    useState<AIDocumentAnalysis | null>(null);
  const [showResults, setShowResults] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (disabled) return;

      const validFiles = acceptedFiles.filter((file) => {
        const isValidType = allowedFileTypes.some((type) =>
          file.name.toLowerCase().endsWith(type.toLowerCase())
        );
        const isValidSize = file.size <= maxFileSize;
        return isValidType && isValidSize;
      });

      if (validFiles.length > 0) {
        setUploadedFiles((prev) => [...prev, ...validFiles]);

        // Start AI analysis simulation for each file
        validFiles.forEach((file) => {
          startAIAnalysis(file);
        });
      }
    },
    [disabled, allowedFileTypes, maxFileSize]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedFileTypes.reduce((acc, type) => {
      acc[`application/*`] = [type];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize: maxFileSize,
    disabled,
  });

  const startAIAnalysis = (file: File) => {
    const fileId = `${file.name}-${Date.now()}`;

    // Initialize progress
    setAnalysisProgress((prev) => ({
      ...prev,
      [fileId]: {
        stage: "upload",
        progress: 0,
        message: "Uploading document...",
        estimatedTimeRemaining: 45,
      },
    }));

    // Simulate AI analysis stages
    const stages = [
      { stage: "upload", message: "Uploading document...", duration: 1000 },
      {
        stage: "parsing",
        message: "Extracting text and data...",
        duration: 2000,
      },
      {
        stage: "analysis",
        message: "Analyzing financial metrics...",
        duration: 3000,
      },
      {
        stage: "validation",
        message: "Validating insights...",
        duration: 1500,
      },
      { stage: "complete", message: "Analysis complete!", duration: 500 },
    ] as const;

    let currentStageIndex = 0;
    let currentProgress = 0;

    const updateProgress = () => {
      const stage = stages[currentStageIndex];
      const stageProgress = Math.min(100, currentProgress + Math.random() * 15);

      setAnalysisProgress((prev) => ({
        ...prev,
        [fileId]: {
          stage: stage.stage,
          progress: Math.round(stageProgress),
          message: stage.message,
          estimatedTimeRemaining: Math.max(0, 45 - stageProgress * 0.45),
        },
      }));

      if (stageProgress >= 100) {
        currentStageIndex++;
        currentProgress = 0;

        if (currentStageIndex < stages.length) {
          setTimeout(updateProgress, stages[currentStageIndex - 1].duration);
        } else {
          // Analysis complete - generate mock results
          completeAnalysis(file, fileId);
        }
      } else {
        currentProgress = stageProgress;
        setTimeout(updateProgress, 200 + Math.random() * 300);
      }
    };

    // Start the progress simulation
    setTimeout(updateProgress, 500);
  };

  const completeAnalysis = (file: File, fileId: string) => {
    // Determine document type based on filename
    const fileName = file.name.toLowerCase();
    let documentType = "other-financial";

    if (
      fileName.includes("income") ||
      fileName.includes("p&l") ||
      fileName.includes("profit")
    ) {
      documentType = "income-statement";
    } else if (fileName.includes("balance")) {
      documentType = "balance-sheet";
    } else if (fileName.includes("cash") || fileName.includes("flow")) {
      documentType = "cash-flow-statement";
    } else if (
      fileName.includes("financial") ||
      fileName.includes("statements")
    ) {
      documentType = "financial-statements";
    }

    // Generate mock AI analysis
    const analysis = generateMockAIAnalysis(file.name, documentType);

    setCompletedAnalyses((prev) => [...prev, analysis]);
    onAnalysisComplete(analysis);

    // Remove from progress tracking
    setAnalysisProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.toLowerCase().endsWith(".pdf")) {
      return (
        <Description sx={{ fontSize: 24, color: theme.palette.error.main }} />
      );
    } else if (fileName.toLowerCase().match(/\.(xlsx?|csv)$/)) {
      return (
        <Description sx={{ fontSize: 24, color: theme.palette.success.main }} />
      );
    }
    return (
      <Description sx={{ fontSize: 24, color: theme.palette.grey[600] }} />
    );
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getProgressColor = (stage: AIAnalysisProgress["stage"]) => {
    switch (stage) {
      case "upload":
        return "info";
      case "parsing":
        return "warning";
      case "analysis":
        return "primary";
      case "validation":
        return "secondary";
      case "complete":
        return "success";
      default:
        return "primary";
    }
  };

  return (
    <Box>
      {/* AI Analyzer Header */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: `linear-gradient(135deg, ${theme.palette.primary.main}08, ${theme.palette.secondary.main}08)`,
          border: `1px solid ${theme.palette.primary.main}20`,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <SmartToy sx={{ fontSize: 32, color: theme.palette.primary.main }} />
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              AI Financial Document Analyzer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Upload financial documents for instant AI-powered analysis and
              insights
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Chip
            icon={<TrendingUp />}
            label="Key Metrics Extraction"
            size="small"
            color="primary"
            variant="outlined"
          />
          <Chip
            icon={<Warning />}
            label="Risk Identification"
            size="small"
            color="warning"
            variant="outlined"
          />
          <Chip
            icon={<Psychology />}
            label="AI Insights"
            size="small"
            color="secondary"
            variant="outlined"
          />
          <Chip
            icon={<CheckCircle />}
            label="Professional Summary"
            size="small"
            color="success"
            variant="outlined"
          />
        </Stack>
      </Paper>

      {/* File Upload Area */}
      <Card sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Box
            {...getRootProps()}
            sx={{
              border: `2px dashed ${
                isDragActive
                  ? theme.palette.primary.main
                  : theme.palette.grey[300]
              }`,
              borderRadius: 2,
              p: 4,
              textAlign: "center",
              cursor: disabled ? "not-allowed" : "pointer",
              backgroundColor: isDragActive
                ? theme.palette.primary.main + "08"
                : "transparent",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: disabled
                  ? theme.palette.grey[300]
                  : theme.palette.primary.main,
                backgroundColor: disabled
                  ? "transparent"
                  : theme.palette.primary.main + "04",
              },
            }}
          >
            <input {...getInputProps()} />
            <CloudUpload
              sx={{
                fontSize: 48,
                color: isDragActive
                  ? theme.palette.primary.main
                  : theme.palette.grey[400],
                mb: 2,
              }}
            />
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              {isDragActive
                ? "Drop your financial documents here"
                : "Upload Financial Documents"}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Drag and drop files here, or click to browse
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Supported formats: {allowedFileTypes.join(", ")} • Max size:{" "}
              {formatFileSize(maxFileSize)}
            </Typography>
          </Box>

          {/* File List */}
          {uploadedFiles.length > 0 && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
                Uploaded Files ({uploadedFiles.length})
              </Typography>

              <Stack spacing={2}>
                {uploadedFiles.map((file, index) => {
                  const fileId = `${file.name}-${Date.now()}`;
                  const progress =
                    analysisProgress[
                      Object.keys(analysisProgress).find((key) =>
                        key.startsWith(file.name)
                      ) || ""
                    ];

                  return (
                    <Paper
                      key={index}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        border: `1px solid ${theme.palette.divider}`,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        {getFileIcon(file.name)}

                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {file.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatFileSize(file.size)} •{" "}
                            {file.type || "Unknown type"}
                          </Typography>
                        </Box>

                        {progress && (
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <CircularProgress size={20} />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {progress.message}
                            </Typography>
                          </Box>
                        )}

                        <Button
                          size="small"
                          onClick={() => removeFile(index)}
                          disabled={!!progress}
                        >
                          Remove
                        </Button>
                      </Box>

                      {/* Progress Bar */}
                      {progress && (
                        <Box sx={{ mt: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mb: 1,
                            }}
                          >
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {progress.stage.replace("-", " ").toUpperCase()} •{" "}
                              {progress.progress}%
                            </Typography>
                            {progress.estimatedTimeRemaining && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                ~{Math.round(progress.estimatedTimeRemaining)}s
                                remaining
                              </Typography>
                            )}
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={progress.progress}
                            color={getProgressColor(progress.stage)}
                            sx={{ height: 6, borderRadius: 3 }}
                          />
                        </Box>
                      )}
                    </Paper>
                  );
                })}
              </Stack>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Completed Analyses */}
      {completedAnalyses.length > 0 && (
        <Card sx={{ borderRadius: 3 }}>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                AI Analysis Results ({completedAnalyses.length})
              </Typography>

              <Button
                startIcon={showResults ? <ExpandLess /> : <ExpandMore />}
                onClick={() => setShowResults(!showResults)}
                size="small"
              >
                {showResults ? "Hide" : "Show"} Results
              </Button>
            </Box>

            <Collapse in={showResults}>
              <Stack spacing={2}>
                {completedAnalyses.map((analysis) => (
                  <Paper
                    key={analysis.id}
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      border: `1px solid ${theme.palette.success.main}40`,
                      backgroundColor: theme.palette.success.main + "08",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <CheckCircle
                          sx={{ color: theme.palette.success.main }}
                        />
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600 }}
                          >
                            {analysis.documentName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Analyzed{" "}
                            {analysis.analysisDate.toLocaleDateString()} •
                            Confidence: {analysis.confidence}% • Processing
                            time: {analysis.processingTime}s
                          </Typography>
                        </Box>
                      </Box>

                      <Button
                        startIcon={<Visibility />}
                        onClick={() => setSelectedAnalysis(analysis)}
                        size="small"
                        variant="outlined"
                      >
                        View Details
                      </Button>
                    </Box>

                    {/* Quick Summary */}
                    <Box sx={{ ml: 4 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {analysis.summary.overview.substring(0, 150)}...
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        flexWrap="wrap"
                        useFlexGap
                      >
                        <Chip
                          label={`${analysis.highlights.length} Highlights`}
                          size="small"
                          color="success"
                        />
                        <Chip
                          label={`${analysis.risks.length} Risks`}
                          size="small"
                          color="warning"
                        />
                        <Chip
                          label={`${analysis.recommendations.length} Recommendations`}
                          size="small"
                          color="info"
                        />
                      </Stack>
                    </Box>
                  </Paper>
                ))}
              </Stack>
            </Collapse>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results Modal/Dialog */}
      {selectedAnalysis && (
        <AIAnalysisResults
          analysis={selectedAnalysis}
          open={!!selectedAnalysis}
          onClose={() => setSelectedAnalysis(null)}
        />
      )}

      {/* Usage Tips */}
      {completedAnalyses.length === 0 && uploadedFiles.length === 0 && (
        <Alert severity="info" sx={{ mt: 3, borderRadius: 2 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
            💡 Tips for best results:
          </Typography>
          <Typography variant="body2" component="div">
            • Upload clear, text-based financial documents (PDFs work best)
            <br />
            • Include income statements, balance sheets, or cash flow statements
            <br />
            • Ensure documents contain numerical financial data
            <br />• Multiple years of data provide better trend analysis
          </Typography>
        </Alert>
      )}
    </Box>
  );
};

export default AIDocumentAnalyzer;
