import * as React from "react";
import { Svg, Group, Rect } from "./primitives";
import { Axis } from "./axis";
import { Grid } from "./grid";
import { bandScale, linearScale, extent } from "./scales";
import { useTheme } from "./theme";
import { getSeriesColor, createTransitionStyle } from "./utils/styles";

export type BarChartData = {
  label: string;
  value: number;
};

type BarChartProps = {
  data: BarChartData[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  showGrid?: boolean;
  seriesIndex?: number;
};

export const BarChart = React.memo<BarChartProps>(
  function BarChart({
    data,
    width = 600,
    height = 400,
    margin = { top: 20, right: 20, bottom: 40, left: 50 },
    showGrid = true,
    seriesIndex = 0,
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

    const { labels, yDomain } = React.useMemo(() => {
      const labels = data.map((d) => d.label);
      const values = data.map((d) => d.value);
      const [, maxY] = extent(values);
      return {
        labels,
        yDomain: [0, maxY * 1.1] as [number, number],
      };
    }, [data]);

    const xScale = React.useMemo(
      () => bandScale(labels, [0, chartWidth], 0.2),
      [labels, chartWidth]
    );

    const yScale = React.useMemo(
      () => linearScale(yDomain, [chartHeight, 0]),
      [yDomain, chartHeight]
    );

    const barColor = React.useMemo(
      () => getSeriesColor(theme, seriesIndex),
      [theme, seriesIndex]
    );

    const barTransition = React.useMemo(
      () => createTransitionStyle(theme, ["opacity"]),
      [theme]
    );

    return (
      <Svg ref={svgRef} width={width} height={height}>
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
                fill={barColor}
                style={barTransition}
                onMouseEnter={(e) => {
                  (e.currentTarget as SVGRectElement).style.opacity = "0.8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as SVGRectElement).style.opacity = "1";
                }}
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
  },
  (prev, next) => {
    return (
      prev.data === next.data &&
      prev.width === next.width &&
      prev.height === next.height &&
      prev.showGrid === next.showGrid &&
      prev.seriesIndex === next.seriesIndex
    );
  }
);
