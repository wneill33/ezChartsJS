/**
 * Default theme definitions for ezCharts
 * Inspired by Apache ECharts' professional design system
 */

import type { Theme } from "./types";

/**
 * Light theme - optimized for light backgrounds
 * Color palette inspired by ECharts v6
 */
export const lightTheme: Theme = {
  mode: "light",

  colors: {
    // ECharts v6 inspired data visualization palette
    // These colors are optimized for data visualization with good contrast
    series: [
      "#5470c6", // Blue
      "#91cc75", // Green
      "#fac858", // Yellow
      "#ee6666", // Red
      "#73c0de", // Cyan
      "#3ba272", // Teal
      "#fc8452", // Orange
      "#9a60b4", // Purple
      "#ea7ccc", // Pink
      "#d87a80", // Rose
    ],

    // Transparent background by default
    background: "transparent",
    canvasBackground: "#ffffff",

    // Subtle grid lines for professional look
    gridLine: "rgba(0, 0, 0, 0.06)",
    gridLineSecondary: "rgba(0, 0, 0, 0.03)",

    // Axis styling - medium contrast
    axisLine: "rgba(0, 0, 0, 0.45)",
    axisTick: "rgba(0, 0, 0, 0.35)",
    axisLabel: "rgba(0, 0, 0, 0.65)",

    // Text colors - high contrast for readability
    text: "rgba(0, 0, 0, 0.85)",
    textSecondary: "rgba(0, 0, 0, 0.65)",
    textDisabled: "rgba(0, 0, 0, 0.35)",

    // UI elements
    border: "rgba(0, 0, 0, 0.12)",
    shadow: "rgba(0, 0, 0, 0.08)",
  },

  typography: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: {
      small: 11,
      base: 12,
      medium: 14,
      large: 16,
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
    },
    lineHeight: 1.5,
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
  },

  effects: {
    shadow: {
      small: "0 1px 2px rgba(0, 0, 0, 0.05)",
      medium: "0 2px 4px rgba(0, 0, 0, 0.08)",
      large: "0 4px 8px rgba(0, 0, 0, 0.12)",
    },
    borderRadius: {
      small: 2,
      medium: 4,
    },
  },

  grid: {
    lineWidth: 1,
    lineWidthSecondary: 0.5,
    lineDash: [],
  },

  animation: {
    duration: 300,
    easing: "ease-in-out",
  },
};

/**
 * Dark theme - optimized for dark backgrounds
 * Uses same color palette but adjusted contrast for dark mode
 */
export const darkTheme: Theme = {
  mode: "dark",

  colors: {
    // Same vibrant colors work well on dark backgrounds
    series: [
      "#5470c6", // Blue
      "#91cc75", // Green
      "#fac858", // Yellow
      "#ee6666", // Red
      "#73c0de", // Cyan
      "#3ba272", // Teal
      "#fc8452", // Orange
      "#9a60b4", // Purple
      "#ea7ccc", // Pink
      "#d87a80", // Rose
    ],

    background: "transparent",
    canvasBackground: "#1a1a1a",

    // Subtle grid lines for dark mode
    gridLine: "rgba(255, 255, 255, 0.08)",
    gridLineSecondary: "rgba(255, 255, 255, 0.04)",

    // Axis styling - lighter for dark backgrounds
    axisLine: "rgba(255, 255, 255, 0.5)",
    axisTick: "rgba(255, 255, 255, 0.4)",
    axisLabel: "rgba(255, 255, 255, 0.7)",

    // Text colors - high contrast on dark
    text: "rgba(255, 255, 255, 0.9)",
    textSecondary: "rgba(255, 255, 255, 0.7)",
    textDisabled: "rgba(255, 255, 255, 0.35)",

    // UI elements
    border: "rgba(255, 255, 255, 0.15)",
    shadow: "rgba(0, 0, 0, 0.3)",
  },

  typography: lightTheme.typography,
  spacing: lightTheme.spacing,

  effects: {
    shadow: {
      small: "0 1px 2px rgba(0, 0, 0, 0.3)",
      medium: "0 2px 4px rgba(0, 0, 0, 0.4)",
      large: "0 4px 8px rgba(0, 0, 0, 0.5)",
    },
    borderRadius: lightTheme.effects.borderRadius,
  },

  grid: lightTheme.grid,
  animation: lightTheme.animation,
};
