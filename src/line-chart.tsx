import * as React from "react";
import { Svg, Group } from "./primitives";
import { Axis } from "./axis";
import { Grid } from "./grid";
import { linearScale, extent } from "./scales";
import { useTheme } from "./theme";
import { getSeriesColor, createTransitionStyle } from "./utils/styles";

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
  curve?: boolean;
};

export const LineChart = React.memo<LineChartProps>(
  function LineChart({
    series,
    width = 600,
    height = 400,
    margin = { top: 20, right: 20, bottom: 40, left: 50 },
    showGrid = true,
    showPoints = false,
    curve = false,
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

    const { allXValues, allYValues } = React.useMemo(() => {
      const allXValues = series.flatMap((s) => s.data.map((d) => d.x));
      const allYValues = series.flatMap((s) => s.data.map((d) => d.y));
      return { allXValues, allYValues };
    }, [series]);

    const xDomain = React.useMemo(() => extent(allXValues), [allXValues]);

    const yDomain: [number, number] = React.useMemo(() => {
      const [minY, maxY] = extent(allYValues);
      return [minY * 0.9, maxY * 1.1];
    }, [allYValues]);

    const xScale = React.useMemo(
      () => linearScale(xDomain, [0, chartWidth]),
      [xDomain, chartWidth]
    );

    const yScale = React.useMemo(
      () => linearScale(yDomain, [chartHeight, 0]),
      [yDomain, chartHeight]
    );

    const createPath = React.useCallback(
      (data: LineChartData[]) => {
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
      },
      [xScale, yScale, curve]
    );

    const lineTransition = React.useMemo(
      () => createTransitionStyle(theme, ["stroke-dashoffset", "opacity"]),
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

          {series.map((s, idx) => {
            const color = getSeriesColor(theme, idx, s.color);
            const strokeWidth = s.strokeWidth || 2;

            return (
              <g key={s.name}>
                <path
                  d={createPath(s.data)}
                  fill="none"
                  stroke={color}
                  strokeWidth={strokeWidth}
                  style={lineTransition}
                />
                {showPoints &&
                  s.data.map((d, i) => (
                    <circle
                      key={i}
                      cx={xScale(d.x)}
                      cy={yScale(d.y)}
                      r={4}
                      fill={color}
                      stroke={theme.colors.background}
                      strokeWidth={2}
                      style={lineTransition}
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
  },
  (prev, next) => {
    return (
      prev.series === next.series &&
      prev.width === next.width &&
      prev.height === next.height &&
      prev.showGrid === next.showGrid &&
      prev.showPoints === next.showPoints &&
      prev.curve === next.curve
    );
  }
);
