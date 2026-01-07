/**
 * Style utility functions for applying theme to SVG elements
 */

import type { Theme } from "../theme/types";
import type { CSSProperties } from "react";

/**
 * Creates style object for grid lines
 */
export function createGridLineStyle(
  theme: Theme,
  secondary = false
): CSSProperties {
  return {
    stroke: secondary
      ? theme.colors.gridLineSecondary
      : theme.colors.gridLine,
    strokeWidth: secondary
      ? theme.grid.lineWidthSecondary
      : theme.grid.lineWidth,
    strokeDasharray: theme.grid.lineDash.join(",") || undefined,
  };
}

/**
 * Creates style object for axis lines
 */
export function createAxisLineStyle(theme: Theme): CSSProperties {
  return {
    stroke: theme.colors.axisLine,
    strokeWidth: 1,
  };
}

/**
 * Creates style object for axis ticks
 */
export function createAxisTickStyle(theme: Theme): CSSProperties {
  return {
    stroke: theme.colors.axisTick,
    strokeWidth: 1,
  };
}

/**
 * Creates style object for axis labels
 */
export function createAxisLabelStyle(theme: Theme): CSSProperties {
  return {
    fill: theme.colors.axisLabel,
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeight.normal,
  };
}

/**
 * Creates style object for general text
 */
export function createTextStyle(
  theme: Theme,
  variant: "primary" | "secondary" | "disabled" = "primary"
): CSSProperties {
  const colorMap = {
    primary: theme.colors.text,
    secondary: theme.colors.textSecondary,
    disabled: theme.colors.textDisabled,
  };

  return {
    fill: colorMap[variant],
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeight.normal,
  };
}

/**
 * Creates style object for legend text
 */
export function createLegendTextStyle(theme: Theme): CSSProperties {
  return {
    fill: theme.colors.text,
    fontSize: theme.typography.fontSize.small,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeight.normal,
  };
}

/**
 * Creates style object for legend markers (rectangles)
 */
export function createLegendMarkerStyle(
  theme: Theme,
  color: string
): CSSProperties {
  return {
    fill: color,
    stroke: theme.colors.border,
    strokeWidth: 1,
  };
}

/**
 * Gets a series color from the theme palette
 * Falls back to theme colors if no custom color is provided
 *
 * @param theme - Current theme
 * @param index - Series index
 * @param customColor - Optional custom color to override theme
 */
export function getSeriesColor(
  theme: Theme,
  index: number,
  customColor?: string
): string {
  if (customColor) return customColor;
  return theme.colors.series[index % theme.colors.series.length];
}

/**
 * Creates transition style for animations
 */
export function createTransitionStyle(
  theme: Theme,
  properties: string[] = ["opacity"]
): CSSProperties {
  return {
    transition: properties
      .map((prop) => `${prop} ${theme.animation.duration}ms ${theme.animation.easing}`)
      .join(", "),
  };
}

/**
 * Creates hover style for interactive elements
 */
export function createHoverStyle(theme: Theme): CSSProperties {
  return {
    cursor: "pointer",
    transition: `opacity ${theme.animation.duration}ms ${theme.animation.easing}`,
  };
}
