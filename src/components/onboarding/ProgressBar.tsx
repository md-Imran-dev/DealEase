import React from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  useTheme,
  LinearProgress,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
  steps,
}) => {
  const theme = useTheme();
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      {/* Progress Header */}
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Step {currentStep + 1} of {totalSteps}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {steps[currentStep]}
        </Typography>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ mb: 3 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: theme.palette.grey[200],
            "& .MuiLinearProgress-bar": {
              borderRadius: 4,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            },
          }}
        />
      </Box>

      {/* Step Indicators */}
      <Stepper
        activeStep={currentStep}
        alternativeLabel
        sx={{
          "& .MuiStepLabel-root": {
            padding: 0,
          },
          "& .MuiStepIcon-root": {
            fontSize: "1.5rem",
            "&.Mui-active": {
              color: theme.palette.primary.main,
            },
            "&.Mui-completed": {
              color: theme.palette.success.main,
            },
          },
          "& .MuiStepLabel-label": {
            fontSize: "0.75rem",
            fontWeight: 500,
            mt: 1,
            "&.Mui-active": {
              color: theme.palette.primary.main,
              fontWeight: 600,
            },
            "&.Mui-completed": {
              color: theme.palette.success.main,
            },
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={index < currentStep}>
            <StepLabel
              StepIconComponent={
                index < currentStep
                  ? () => (
                      <CheckCircle
                        sx={{
                          fontSize: "1.5rem",
                          color: theme.palette.success.main,
                        }}
                      />
                    )
                  : undefined
              }
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default ProgressBar;
