/**
 * Theme system types for ezCharts
 * Inspired by ECharts' professional design system
 */

export type ThemeMode = "light" | "dark";

export interface ThemeColors {
  /** Data visualization color palette - 10 distinct colors for series */
  series: string[];

  /** Background colors */
  background: string;
  canvasBackground: string;

  /** Grid styling */
  gridLine: string;
  gridLineSecondary: string;

  /** Axis styling */
  axisLine: string;
  axisTick: string;
  axisLabel: string;

  /** Text colors */
  text: string;
  textSecondary: string;
  textDisabled: string;

  /** UI elements */
  border: string;
  shadow: string;
}

export interface ThemeTypography {
  fontFamily: string;
  fontSize: {
    small: number;
    base: number;
    medium: number;
    large: number;
  };
  fontWeight: {
    normal: number;
    medium: number;
    semibold: number;
  };
  lineHeight: number;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface ThemeEffects {
  shadow: {
    small: string;
    medium: string;
    large: string;
  };
  borderRadius: {
    small: number;
    medium: number;
  };
}

export interface ThemeGrid {
  lineWidth: number;
  lineWidthSecondary: number;
  lineDash: number[];
}

export interface ThemeAnimation {
  duration: number;
  easing: string;
}

/**
 * Complete theme definition
 */
export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  effects: ThemeEffects;
  grid: ThemeGrid;
  animation: ThemeAnimation;
}
