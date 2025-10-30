import * as React from "react";
import { Svg, Group } from "./primitives";
import { Axis } from "./axis";
import { Grid } from "./grid";
import { linearScale, extent } from "./scales";

export type ScatterPlotData = {
  x: number;
  y: number;
  size?: number;
  color?: string;
};

type ScatterPlotProps = {
  data: ScatterPlotData[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  defaultColor?: string;
  defaultSize?: number;
  showGrid?: boolean;
  className?: string;
  xLabel?: string;
  yLabel?: string;
};

export const ScatterPlot: React.FC<ScatterPlotProps> = ({
  data,
  width = 600,
  height = 400,
  margin = { top: 20, right: 20, bottom: 40, left: 50 },
  defaultColor = "#3b82f6",
  defaultSize = 4,
  showGrid = true,
  className,
}) => {
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const xValues = data.map((d) => d.x);
  const yValues = data.map((d) => d.y);

  const xDomain = extent(xValues);
  const yDomain = extent(yValues);

  const xScale = linearScale(xDomain, [0, chartWidth]);
  const yScale = linearScale(yDomain, [chartHeight, 0]);

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

        {data.map((d, i) => (
          <circle
            key={i}
            cx={xScale(d.x)}
            cy={yScale(d.y)}
            r={d.size || defaultSize}
            fill={d.color || defaultColor}
            opacity={0.7}
            className="stroke-white stroke-1"
          />
        ))}

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
