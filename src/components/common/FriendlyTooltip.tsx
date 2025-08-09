import React from "react";
import { Tooltip } from "@mui/material";
import type { TooltipProps } from "@mui/material/Tooltip";
import { microcopy } from "../../utils/microcopy";

interface FriendlyTooltipProps extends Omit<TooltipProps, "title"> {
  titleKey?: string; // Key from microcopy.tooltips
  title?: string; // Custom title
  children: React.ReactElement;
}

export const FriendlyTooltip: React.FC<FriendlyTooltipProps> = ({
  titleKey,
  title,
  children,
  ...props
}) => {
  const tooltipTitle = titleKey
    ? microcopy.tooltips[titleKey as keyof typeof microcopy.tooltips]
    : title;

  if (!tooltipTitle) {
    return children;
  }

  return (
    <Tooltip
      title={tooltipTitle}
      arrow
      placement="top"
      enterDelay={500}
      leaveDelay={200}
      {...props}
    >
      {children}
    </Tooltip>
  );
};
