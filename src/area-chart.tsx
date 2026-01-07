import * as React from "react";
import { Svg, Group } from "./primitives";
import { Axis } from "./axis";
import { Grid } from "./grid";
import { linearScale, extent } from "./scales";
import { useTheme } from "./theme";
import { getSeriesColor, createTransitionStyle } from "./utils/styles";

export type AreaChartData = {
  x: number;
  y: number;
};

export type AreaChartSeries = {
  name: string;
  data: AreaChartData[];
  color?: string;
  fillOpacity?: number;
};

type AreaChartProps = {
  series: AreaChartSeries[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  showGrid?: boolean;
  stacked?: boolean;
};

export const AreaChart = React.memo<AreaChartProps>(
  function AreaChart({
    series,
    width = 600,
    height = 400,
    margin = { top: 20, right: 20, bottom: 40, left: 50 },
    showGrid = true,
    stacked = false,
  }) {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const theme = useTheme(svgRef);

    const chartWidth = React.useMemo(
      () => width - margin.left - margin.right,
      [width, margin]
    );

    const chartHeight = React.useMemo(
      () => height - margin.top - margin.bottom,
      [height, margin]
    );

    const allXValues = React.useMemo(
      () => series.flatMap((s) => s.data.map((d) => d.x)),
      [series]
    );

    const xDomain = React.useMemo(() => extent(allXValues), [allXValues]);

    const yDomain: [number, number] = React.useMemo(() => {
      if (stacked) {
        // For stacked areas, calculate cumulative max
        const xPoints = Array.from(new Set(allXValues)).sort((a, b) => a - b);
        const cumulativeMax = xPoints.reduce((max, x) => {
          const sum = series.reduce((acc, s) => {
            const point = s.data.find((d) => d.x === x);
            return acc + (point?.y || 0);
          }, 0);
          return Math.max(max, sum);
        }, 0);
        return [0, cumulativeMax * 1.1];
      } else {
        const allYValues = series.flatMap((s) => s.data.map((d) => d.y));
        const [, maxY] = extent(allYValues);
        return [0, maxY * 1.1];
      }
    }, [series, allXValues, stacked]);

    const xScale = React.useMemo(
      () => linearScale(xDomain, [0, chartWidth]),
      [xDomain, chartWidth]
    );

    const yScale = React.useMemo(
      () => linearScale(yDomain, [chartHeight, 0]),
      [yDomain, chartHeight]
    );

    const createAreaPath = React.useCallback(
      (data: AreaChartData[], baselineData: AreaChartData[]) => {
        if (data.length === 0) return "";

        const sortedData = [...data].sort((a, b) => a.x - b.x);
        const sortedBaseline = [...baselineData].sort((a, b) => a.x - b.x);

        // Build a map for quick baseline lookup
        const baselineMap = new Map(sortedBaseline.map((d) => [d.x, d.y]));

        // Start from first baseline point
        const firstBaseline = baselineMap.get(sortedData[0].x) || 0;
        let path = `M ${xScale(sortedData[0].x)},${yScale(firstBaseline)}`;

        // Draw to top line
        sortedData.forEach((d) => {
          const baseline = baselineMap.get(d.x) || 0;
          path += ` L ${xScale(d.x)},${yScale(d.y + baseline)}`;
        });

        // Return along baseline
        for (let i = sortedData.length - 1; i >= 0; i--) {
          const d = sortedData[i];
          const baseline = baselineMap.get(d.x) || 0;
          path += ` L ${xScale(d.x)},${yScale(baseline)}`;
        }

        path += " Z";
        return path;
      },
      [xScale, yScale]
    );

    const areaTransition = React.useMemo(
      () => createTransitionStyle(theme, ["opacity"]),
      [theme]
    );

    // Calculate cumulative baselines for stacked areas
    const cumulativeBaselines = React.useMemo(() => {
      if (!stacked) return [];

      return series.map((_, idx) => {
        if (idx === 0) {
          // First series has baseline of 0 for all points
          return series[0].data.map((d) => ({ x: d.x, y: 0 }));
        }

        // For subsequent series, baseline is cumulative sum of previous series
        const uniqueX = Array.from(
          new Set(series.slice(0, idx + 1).flatMap((s) => s.data.map((d) => d.x)))
        );

        return uniqueX.map((x) => {
          const cumulativeY = series.slice(0, idx).reduce((sum, prevSeries) => {
            const point = prevSeries.data.find((d) => d.x === x);
            return sum + (point?.y || 0);
          }, 0);
          return { x, y: cumulativeY };
        });
      });
    }, [series, stacked]);

    return (
      <Svg ref={svgRef} width={width} height={height}>
        <Group translate={{ x: margin.left, y: margin.top }}>
          {showGrid && (
            <Grid
              width={chartWidth}
              height={chartHeight}
              xDomain={xDomain}
              yDomain={yDomain}
            />
          )}

          {stacked
            ? // Stacked rendering - FIXED: Now uses proper cumulative baselines
              series.map((s, idx) => {
                const color = getSeriesColor(theme, idx, s.color);
                const fillOpacity = s.fillOpacity || 0.7;
                const baseline = cumulativeBaselines[idx];

                return (
                  <path
                    key={s.name}
                    d={createAreaPath(s.data, baseline)}
                    fill={color}
                    fillOpacity={fillOpacity}
                    stroke={color}
                    strokeWidth={2}
                    style={areaTransition}
                  />
                );
              })
            : // Overlapping rendering
              series.map((s, idx) => {
                const color = getSeriesColor(theme, idx, s.color);
                const fillOpacity = s.fillOpacity || 0.3;
                const zeroBaseline = s.data.map((d) => ({ x: d.x, y: 0 }));

                return (
                  <path
                    key={s.name}
                    d={createAreaPath(s.data, zeroBaseline)}
                    fill={color}
                    fillOpacity={fillOpacity}
                    stroke={color}
                    strokeWidth={2}
                    style={areaTransition}
                  />
                );
              })}

          <Axis
            x
            length={chartWidth}
            domain={xDomain}
            translate={{ x: 0, y: chartHeight }}
          />

          <Axis y length={chartHeight} domain={yDomain} />
        </Group>
      </Svg>
    );
  },
  (prev, next) => {
    return (
      prev.series === next.series &&
      prev.width === next.width &&
      prev.height === next.height &&
      prev.showGrid === next.showGrid &&
      prev.stacked === next.stacked
    );
  }
);
