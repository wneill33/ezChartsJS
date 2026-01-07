import * as React from "react";
import { Group, Line } from "./primitives";
import { niceTicks } from "./scales";
import { useTheme } from "./theme";
import { createGridLineStyle } from "./utils/styles";

type GridProps = {
  width: number;
  height: number;
  xDomain?: [number, number];
  yDomain?: [number, number];
  xTicks?: number;
  yTicks?: number;
  translate?: { x: number; y: number };
  vertical?: boolean;
  horizontal?: boolean;
};

export const Grid = React.memo<GridProps>(function Grid({
  width,
  height,
  xDomain,
  yDomain,
  xTicks = 5,
  yTicks = 5,
  translate,
  vertical = true,
  horizontal = true,
}) {
  const theme = useTheme();

  const xTickValues = React.useMemo(
    () => (xDomain ? niceTicks(xDomain[0], xDomain[1], xTicks) : []),
    [xDomain, xTicks]
  );

  const yTickValues = React.useMemo(
    () => (yDomain ? niceTicks(yDomain[0], yDomain[1], yTicks) : []),
    [yDomain, yTicks]
  );

  const lineStyle = React.useMemo(
    () => createGridLineStyle(theme),
    [theme]
  );

  return (
    <Group translate={translate}>
      {vertical &&
        xDomain &&
        xTickValues.map((tick) => {
          const x = ((tick - xDomain[0]) / (xDomain[1] - xDomain[0])) * width;
          return (
            <Line
              key={tick}
              x1={x}
              y1={0}
              x2={x}
              y2={height}
              style={lineStyle}
            />
          );
        })}
      {horizontal &&
        yDomain &&
        yTickValues.map((tick) => {
          const y =
            height - ((tick - yDomain[0]) / (yDomain[1] - yDomain[0])) * height;
          return (
            <Line
              key={tick}
              x1={0}
              y1={y}
              x2={width}
              y2={y}
              style={lineStyle}
            />
          );
        })}
    </Group>
  );
});
