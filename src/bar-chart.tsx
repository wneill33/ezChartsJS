import * as React from "react";
import { Svg, Group, Rect } from "./primitives";
import { Axis } from "./axis";
import { Grid } from "./grid";
import { bandScale, linearScale, extent } from "./scales";

export type BarChartData = {
  label: string;
  value: number;
};

type BarChartProps = {
  data: BarChartData[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  color?: string;
  showGrid?: boolean;
  className?: string;
  barClassName?: string;
};

export const BarChart: React.FC<BarChartProps> = ({
  data,
  width = 600,
  height = 400,
  margin = { top: 20, right: 20, bottom: 40, left: 50 },
  color = "#3b82f6",
  showGrid = true,
  className,
  barClassName,
}) => {
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const labels = data.map((d) => d.label);
  const values = data.map((d) => d.value);
  const [minY, maxY] = extent(values);
  const yDomain: [number, number] = [0, maxY * 1.1];

  const xScale = bandScale(labels, [0, chartWidth], 0.2);
  const yScale = linearScale(yDomain, [chartHeight, 0]);

  return (
    <Svg width={width} height={height} className={className}>
      <Group translate={{ x: margin.left, y: margin.top }}>
        {showGrid && (
          <Grid
            width={chartWidth}
            height={chartHeight}
            yDomain={yDomain}
            horizontal={true}
            vertical={false}
          />
        )}

        {data.map((d) => {
          const x = xScale.scale(d.label);
          const barHeight = chartHeight - yScale(d.value);
          const y = yScale(d.value);

          return (
            <Rect
              key={d.label}
              x={x}
              y={y}
              width={xScale.bandwidth}
              height={barHeight}
              fill={color}
              className={barClassName}
            />
          );
        })}

        <Axis
          x
          length={chartWidth}
          domain={[0, labels.length]}
          translate={{ x: 0, y: chartHeight }}
          labelFormatter={(i) => labels[Math.round(i)] || ""}
          ticks={labels.length}
        />

        <Axis y length={chartHeight} domain={yDomain} />
      </Group>
    </Svg>
  );
};
