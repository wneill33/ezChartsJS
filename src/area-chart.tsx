import * as React from "react";
import { Svg, Group } from "./primitives";
import { Axis } from "./axis";
import { Grid } from "./grid";
import { linearScale, extent } from "./scales";

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
  className?: string;
  stacked?: boolean;
};

export const AreaChart: React.FC<AreaChartProps> = ({
  series,
  width = 600,
  height = 400,
  margin = { top: 20, right: 20, bottom: 40, left: 50 },
  showGrid = true,
  className,
  stacked = false,
}) => {
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const allXValues = series.flatMap((s) => s.data.map((d) => d.x));
  const xDomain = extent(allXValues);

  let yDomain: [number, number];
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
    yDomain = [0, cumulativeMax * 1.1];
  } else {
    const allYValues = series.flatMap((s) => s.data.map((d) => d.y));
    const [minY, maxY] = extent(allYValues);
    yDomain = [0, maxY * 1.1];
  }

  const xScale = linearScale(xDomain, [0, chartWidth]);
  const yScale = linearScale(yDomain, [chartHeight, 0]);

  const createAreaPath = (data: AreaChartData[], baseline = 0) => {
    if (data.length === 0) return "";

    const sortedData = [...data].sort((a, b) => a.x - b.x);

    let path = `M ${xScale(sortedData[0].x)},${yScale(baseline)}`;
    sortedData.forEach((d) => {
      path += ` L ${xScale(d.x)},${yScale(d.y + baseline)}`;
    });
    path += ` L ${xScale(sortedData[sortedData.length - 1].x)},${yScale(
      baseline
    )}`;
    path += " Z";

    return path;
  };

  return (
    <Svg width={width} height={height} className={className}>
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
          ? // Stacked rendering
            series.map((s, idx) => {
              const color =
                s.color || `hsl(${(idx * 360) / series.length}, 70%, 50%)`;
              const fillOpacity = s.fillOpacity || 0.7;

              // Calculate baseline from previous series
              const baseline = 0; // Simplified - would need proper stacking logic

              return (
                <path
                  key={s.name}
                  d={createAreaPath(s.data, baseline)}
                  fill={color}
                  fillOpacity={fillOpacity}
                  stroke={color}
                  strokeWidth={2}
                />
              );
            })
          : // Overlapping rendering
            series.map((s, idx) => {
              const color =
                s.color || `hsl(${(idx * 360) / series.length}, 70%, 50%)`;
              const fillOpacity = s.fillOpacity || 0.3;

              return (
                <path
                  key={s.name}
                  d={createAreaPath(s.data)}
                  fill={color}
                  fillOpacity={fillOpacity}
                  stroke={color}
                  strokeWidth={2}
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
};
