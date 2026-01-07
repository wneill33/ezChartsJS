/**
 * Theme context and hooks for ezCharts
 * Provides auto light/dark mode detection based on parent background color
 */

import * as React from "react";
import type { Theme, ThemeMode } from "./types";
import { lightTheme, darkTheme } from "./defaults";

/**
 * Theme context for manual theme override
 * Most users won't need this - auto-detection is the default
 */
export const ThemeContext = React.createContext<Theme | null>(null);

/**
 * Detects whether the parent background is light or dark
 * by walking up the DOM tree to find the first non-transparent background
 */
function useBackgroundDetection(
  ref: React.RefObject<SVGSVGElement> | null
): ThemeMode {
  const [mode, setMode] = React.useState<ThemeMode>("light");

  React.useEffect(() => {
    if (!ref?.current) return;

    // Walk up the DOM tree to find first non-transparent background
    let element: HTMLElement | null = ref.current.parentElement;

    while (element) {
      const bg = window.getComputedStyle(element).backgroundColor;

      // Check if background is not transparent
      if (bg && bg !== "transparent" && bg !== "rgba(0, 0, 0, 0)") {
        // Parse RGB values from rgba(r, g, b, a) or rgb(r, g, b) format
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);

        if (match) {
          const [, r, g, b] = match.map(Number);

          // Calculate relative luminance using standard formula
          // https://www.w3.org/TR/WCAG20/#relativeluminancedef
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

          // Threshold of 0.5 - brighter backgrounds are "light", darker are "dark"
          setMode(luminance > 0.5 ? "light" : "dark");
          break;
        }
      }

      element = element.parentElement;
    }
  }, [ref]);

  return mode;
}

/**
 * Main hook to get the current theme
 * Automatically detects light/dark mode based on parent background
 *
 * @param svgRef - Optional ref to the chart's SVG element (for auto-detection)
 * @returns Current theme object
 *
 * @example
 * ```tsx
 * function MyChart() {
 *   const svgRef = React.useRef<SVGSVGElement>(null);
 *   const theme = useTheme(svgRef);
 *
 *   return (
 *     <svg ref={svgRef}>
 *       <rect fill={theme.colors.background} />
 *     </svg>
 *   );
 * }
 * ```
 */
export function useTheme(
  svgRef?: React.RefObject<SVGSVGElement> | null
): Theme {
  const contextTheme = React.useContext(ThemeContext);
  const detectedMode = useBackgroundDetection(svgRef || null);

  // If a theme is provided via context, use it
  // Otherwise, use auto-detected theme
  return React.useMemo(() => {
    if (contextTheme) return contextTheme;
    return detectedMode === "dark" ? darkTheme : lightTheme;
  }, [contextTheme, detectedMode]);
}

/**
 * Optional theme provider for manual theme override
 * Most users won't need this - auto-detection is the default
 *
 * @example
 * ```tsx
 * <ThemeProvider theme={customTheme}>
 *   <BarChart data={data} />
 * </ThemeProvider>
 * ```
 */
export const ThemeProvider: React.FC<{
  theme?: Partial<Theme> | Theme;
  children: React.ReactNode;
}> = ({ theme, children }) => {
  const mergedTheme = React.useMemo(() => {
    if (!theme) return lightTheme;

    // If theme is complete, use it as-is
    if ("mode" in theme && "colors" in theme) {
      return theme as Theme;
    }

    // Otherwise, merge with light theme
    return { ...lightTheme, ...theme } as Theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={mergedTheme}>
      {children}
    </ThemeContext.Provider>
  );
};
