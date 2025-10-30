import * as React from "react";
import { Group, Line, Text } from "./primitives";
import { linearScale, niceTicks } from "./scales";

type AxisProps = {
  x?: boolean;
  y?: boolean;
  length: number;
  domain: [number, number];
  ticks?: number;
  translate?: { x: number; y: number };
  className?: string; // Tailwind classes
  tickClassName?: string;
  labelFormatter?: (v: number) => string;
};

export const Axis: React.FC<AxisProps> = ({
  x,
  y,
  length,
  domain,
  ticks = 5,
  translate,
  className,
  tickClassName,
  labelFormatter = (v) => `${v}`,
}) => {
  const scale = linearScale(domain, [0, length]);
  const values = niceTicks(domain[0], domain[1], ticks);
  return (
    <Group translate={translate} className={className}>
      <Line
        x1={0}
        y1={0}
        x2={x ? length : 0}
        y2={y ? length : 0}
        className="stroke-current"
      />
      {values.map((v) => {
        const pos = scale(v);
        return x ? (
          <Group key={v} translate={{ x: pos, y: 0 }}>
            <Line x1={0} y1={0} x2={0} y2={6} className="stroke-current" />
            <Text x={0} y={16} textAnchor="middle" className={tickClassName}>
              {labelFormatter(v)}
            </Text>
          </Group>
        ) : (
          <Group key={v} translate={{ x: 0, y: pos }}>
            <Line x1={-6} y1={0} x2={0} y2={0} className="stroke-current" />
            <Text x={-8} y={4} textAnchor="end" className={tickClassName}>
              {labelFormatter(v)}
            </Text>
          </Group>
        );
      })}
    </Group>
  );
};
