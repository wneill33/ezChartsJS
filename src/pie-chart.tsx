import * as React from "react";
import { Svg, Group, Text } from "./primitives";
import { useTheme } from "./theme";
import { getSeriesColor, createTransitionStyle } from "./utils/styles";

export type PieChartData = {
  label: string;
  value: number;
  color?: string;
};

type PieChartProps = {
  data: PieChartData[];
  width?: number;
  height?: number;
  innerRadius?: number; // Set > 0 for donut chart
  showLabels?: boolean;
};

export const PieChart = React.memo<PieChartProps>(
  function PieChart({
    data,
    width = 400,
    height = 400,
    innerRadius = 0,
    showLabels = true,
  }) {
    const svgRef = React.useRef<SVGSVGElement>(null);
    const theme = useTheme(svgRef);

    const centerX = React.useMemo(() => width / 2, [width]);
    const centerY = React.useMemo(() => height / 2, [height]);
    const radius = React.useMemo(
      () => Math.min(width, height) / 2 - 40,
      [width, height]
    );

    const total = React.useMemo(
      () => data.reduce((sum, d) => sum + d.value, 0),
      [data]
    );

    const slices = React.useMemo(() => {
      let currentAngle = -Math.PI / 2; // Start at top

      return data.map((d, i) => {
        const sliceAngle = (d.value / total) * 2 * Math.PI;
        const startAngle = currentAngle;
        const endAngle = currentAngle + sliceAngle;
        currentAngle = endAngle;

        const outerStartX = centerX + radius * Math.cos(startAngle);
        const outerStartY = centerY + radius * Math.sin(startAngle);
        const outerEndX = centerX + radius * Math.cos(endAngle);
        const outerEndY = centerY + radius * Math.sin(endAngle);

        const innerStartX = centerX + innerRadius * Math.cos(startAngle);
        const innerStartY = centerY + innerRadius * Math.sin(startAngle);
        const innerEndX = centerX + innerRadius * Math.cos(endAngle);
        const innerEndY = centerY + innerRadius * Math.sin(endAngle);

        const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

        const pathData =
          innerRadius > 0
            ? `M ${outerStartX},${outerStartY}
         A ${radius},${radius} 0 ${largeArcFlag},1 ${outerEndX},${outerEndY}
         L ${innerEndX},${innerEndY}
         A ${innerRadius},${innerRadius} 0 ${largeArcFlag},0 ${innerStartX},${innerStartY}
         Z`
            : `M ${centerX},${centerY}
         L ${outerStartX},${outerStartY}
         A ${radius},${radius} 0 ${largeArcFlag},1 ${outerEndX},${outerEndY}
         Z`;

        // Calculate label position
        const labelAngle = (startAngle + endAngle) / 2;
        const labelRadius = innerRadius + (radius - innerRadius) * 0.7;
        const labelX = centerX + labelRadius * Math.cos(labelAngle);
        const labelY = centerY + labelRadius * Math.sin(labelAngle);

        const color = getSeriesColor(theme, i, d.color);

        return {
          path: pathData,
          label: d.label,
          value: d.value,
          percentage: ((d.value / total) * 100).toFixed(1),
          color,
          labelX,
          labelY,
        };
      });
    }, [data, total, centerX, centerY, radius, innerRadius, theme]);

    const sliceTransition = React.useMemo(
      () => createTransitionStyle(theme, ["opacity"]),
      [theme]
    );

    const labelStyle = React.useMemo(
      () => ({
        fontSize: theme.typography.fontSize.base,
        fontWeight: theme.typography.fontWeight.semibold,
        fill: theme.mode === "dark" ? theme.colors.text : "#ffffff",
        pointerEvents: "none" as const,
      }),
      [theme]
    );

    return (
      <Svg ref={svgRef} width={width} height={height}>
        <Group>
          {slices.map((slice, i) => (
            <g key={i}>
              <path
                d={slice.path}
                fill={slice.color}
                stroke={theme.colors.background}
                strokeWidth={2}
                style={sliceTransition}
                onMouseEnter={(e) => {
                  (e.currentTarget as SVGPathElement).style.opacity = "0.8";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as SVGPathElement).style.opacity = "1";
                }}
              />
              {showLabels && slice.percentage !== "0.0" && (
                <Text
                  x={slice.labelX}
                  y={slice.labelY}
                  textAnchor="middle"
                  style={labelStyle}
                >
                  {slice.percentage}%
                </Text>
              )}
            </g>
          ))}
        </Group>
      </Svg>
    );
  },
  (prev, next) => {
    return (
      prev.data === next.data &&
      prev.width === next.width &&
      prev.height === next.height &&
      prev.innerRadius === next.innerRadius &&
      prev.showLabels === next.showLabels
    );
  }
);
