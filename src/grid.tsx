import * as React from "react";
import { Group, Line } from "./primitives";
import { niceTicks } from "./scales";

type GridProps = {
  width: number;
  height: number;
  xDomain?: [number, number];
  yDomain?: [number, number];
  xTicks?: number;
  yTicks?: number;
  translate?: { x: number; y: number };
  className?: string;
  vertical?: boolean;
  horizontal?: boolean;
};

export const Grid: React.FC<GridProps> = ({
  width,
  height,
  xDomain,
  yDomain,
  xTicks = 5,
  yTicks = 5,
  translate,
  className = "stroke-gray-200 stroke-1",
  vertical = true,
  horizontal = true,
}) => {
  const xTickValues = xDomain ? niceTicks(xDomain[0], xDomain[1], xTicks) : [];
  const yTickValues = yDomain ? niceTicks(yDomain[0], yDomain[1], yTicks) : [];

  return (
    <Group translate={translate} className={className}>
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
              className={className}
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
              className={className}
            />
          );
        })}
    </Group>
  );
};
