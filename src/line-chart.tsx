import * as React from "react";
import { Svg, Group } from "./primitives";
import { Axis } from "./axis";
import { Grid } from "./grid";
import { linearScale, extent } from "./scales";

export type LineChartData = {
  x: number;
  y: number;
};

export type LineChartSeries = {
  name: string;
  data: LineChartData[];
  color?: string;
  strokeWidth?: number;
};

type LineChartProps = {
  series: LineChartSeries[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  showGrid?: boolean;
  showPoints?: boolean;
  className?: string;
  curve?: boolean;
};

export const LineChart: React.FC<LineChartProps> = ({
  series,
  width = 600,
  height = 400,
  margin = { top: 20, right: 20, bottom: 40, left: 50 },
  showGrid = true,
  showPoints = false,
  className,
  curve = false,
}) => {
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const allXValues = series.flatMap((s) => s.data.map((d) => d.x));
  const allYValues = series.flatMap((s) => s.data.map((d) => d.y));

  const xDomain = extent(allXValues);
  const [minY, maxY] = extent(allYValues);
  const yDomain: [number, number] = [minY * 0.9, maxY * 1.1];

  const xScale = linearScale(xDomain, [0, chartWidth]);
  const yScale = linearScale(yDomain, [chartHeight, 0]);

  const createPath = (data: LineChartData[]) => {
    if (data.length === 0) return "";

    const points = data.map((d) => ({
      x: xScale(d.x),
      y: yScale(d.y),
    }));

    if (!curve) {
      return points
        .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`)
        .join(" ");
    }

    // Simple curve using quadratic bezier
    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const xc = (points[i].x + points[i + 1].x) / 2;
      const yc = (points[i].y + points[i + 1].y) / 2;
      path += ` Q ${points[i].x},${points[i].y} ${xc},${yc}`;
    }
    const last = points[points.length - 1];
    path += ` T ${last.x},${last.y}`;
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

        {series.map((s, idx) => {
          const color =
            s.color || `hsl(${(idx * 360) / series.length}, 70%, 50%)`;
          const strokeWidth = s.strokeWidth || 2;

          return (
            <g key={s.name}>
              <path
                d={createPath(s.data)}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                className="stroke-current"
              />
              {showPoints &&
                s.data.map((d, i) => (
                  <circle
                    key={i}
                    cx={xScale(d.x)}
                    cy={yScale(d.y)}
                    r={4}
                    fill={color}
                    className="stroke-white stroke-2"
                  />
                ))}
            </g>
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
