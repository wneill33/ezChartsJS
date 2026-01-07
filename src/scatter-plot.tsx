import * as React from "react";
import { Svg, Group } from "./primitives";
import { Axis } from "./axis";
import { Grid } from "./grid";
import { linearScale, extent } from "./scales";
import { useTheme } from "./theme";
import { getSeriesColor, createTransitionStyle } from "./utils/styles";

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
  defaultSize?: number;
  showGrid?: boolean;
  seriesIndex?: number;
};

export const ScatterPlot = React.memo<ScatterPlotProps>(
  function ScatterPlot({
    data,
    width = 600,
    height = 400,
    margin = { top: 20, right: 20, bottom: 40, left: 50 },
    defaultSize = 4,
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

    const { xValues, yValues } = React.useMemo(() => {
      const xValues = data.map((d) => d.x);
      const yValues = data.map((d) => d.y);
      return { xValues, yValues };
    }, [data]);

    const xDomain = React.useMemo(() => extent(xValues), [xValues]);
    const yDomain = React.useMemo(() => extent(yValues), [yValues]);

    const xScale = React.useMemo(
      () => linearScale(xDomain, [0, chartWidth]),
      [xDomain, chartWidth]
    );

    const yScale = React.useMemo(
      () => linearScale(yDomain, [chartHeight, 0]),
      [yDomain, chartHeight]
    );

    const defaultColor = React.useMemo(
      () => getSeriesColor(theme, seriesIndex),
      [theme, seriesIndex]
    );

    const pointTransition = React.useMemo(
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
              xDomain={xDomain}
              yDomain={yDomain}
            />
          )}

          {data.map((d, i) => {
            const pointColor = d.color || defaultColor;

            return (
              <circle
                key={i}
                cx={xScale(d.x)}
                cy={yScale(d.y)}
                r={d.size || defaultSize}
                fill={pointColor}
                opacity={0.7}
                stroke={theme.colors.background}
                strokeWidth={1}
                style={pointTransition}
                onMouseEnter={(e) => {
                  (e.currentTarget as SVGCircleElement).style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as SVGCircleElement).style.opacity = "0.7";
                }}
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
      prev.data === next.data &&
      prev.width === next.width &&
      prev.height === next.height &&
      prev.showGrid === next.showGrid &&
      prev.seriesIndex === next.seriesIndex
    );
  }
);
