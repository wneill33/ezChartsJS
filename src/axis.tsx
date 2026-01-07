import * as React from "react";
import { Group, Line, Text } from "./primitives";
import { linearScale, niceTicks } from "./scales";
import { useTheme } from "./theme";
import {
  createAxisLineStyle,
  createAxisTickStyle,
  createAxisLabelStyle,
} from "./utils/styles";

type AxisProps = {
  x?: boolean;
  y?: boolean;
  length: number;
  domain: [number, number];
  ticks?: number;
  translate?: { x: number; y: number };
  labelFormatter?: (v: number) => string;
};

export const Axis = React.memo<AxisProps>(function Axis({
  x,
  y,
  length,
  domain,
  ticks = 5,
  translate,
  labelFormatter = (v) => `${v}`,
}) {
  const theme = useTheme();

  const scale = React.useMemo(
    () => linearScale(domain, [0, length]),
    [domain, length]
  );

  const values = React.useMemo(
    () => niceTicks(domain[0], domain[1], ticks),
    [domain, ticks]
  );

  const axisLineStyle = React.useMemo(
    () => createAxisLineStyle(theme),
    [theme]
  );

  const tickLineStyle = React.useMemo(
    () => createAxisTickStyle(theme),
    [theme]
  );

  const labelStyle = React.useMemo(
    () => createAxisLabelStyle(theme),
    [theme]
  );

  return (
    <Group translate={translate}>
      <Line
        x1={0}
        y1={0}
        x2={x ? length : 0}
        y2={y ? length : 0}
        style={axisLineStyle}
      />
      {values.map((v) => {
        const pos = scale(v);
        return x ? (
          <Group key={v} translate={{ x: pos, y: 0 }}>
            <Line x1={0} y1={0} x2={0} y2={6} style={tickLineStyle} />
            <Text x={0} y={16} textAnchor="middle" style={labelStyle}>
              {labelFormatter(v)}
            </Text>
          </Group>
        ) : (
          <Group key={v} translate={{ x: 0, y: pos }}>
            <Line x1={-6} y1={0} x2={0} y2={0} style={tickLineStyle} />
            <Text x={-8} y={4} textAnchor="end" style={labelStyle}>
              {labelFormatter(v)}
            </Text>
          </Group>
        );
      })}
    </Group>
  );
});
