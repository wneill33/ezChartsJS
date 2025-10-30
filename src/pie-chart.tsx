import * as React from "react";
import { Svg, Group, Text } from "./primitives";

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
  className?: string;
};

export const PieChart: React.FC<PieChartProps> = ({
  data,
  width = 400,
  height = 400,
  innerRadius = 0,
  showLabels = true,
  className,
}) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 40;

  const total = data.reduce((sum, d) => sum + d.value, 0);

  let currentAngle = -Math.PI / 2; // Start at top

  const slices = data.map((d, i) => {
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

    const color = d.color || `hsl(${(i * 360) / data.length}, 70%, 60%)`;

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

  return (
    <Svg width={width} height={height} className={className}>
      <Group>
        {slices.map((slice, i) => (
          <g key={i}>
            <path
              d={slice.path}
              fill={slice.color}
              stroke="white"
              strokeWidth={2}
              className="transition-opacity hover:opacity-80"
            />
            {showLabels && slice.percentage !== "0.0" && (
              <Text
                x={slice.labelX}
                y={slice.labelY}
                textAnchor="middle"
                className="text-xs font-semibold fill-white"
                style={{ fontSize: "12px", pointerEvents: "none" }}
              >
                {slice.percentage}%
              </Text>
            )}
          </g>
        ))}
      </Group>
    </Svg>
  );
};
