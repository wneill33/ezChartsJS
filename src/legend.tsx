import * as React from "react";
import { Group, Rect, Text } from "./primitives";

export type LegendItem = {
  label: string;
  color: string;
};

type LegendProps = {
  items: LegendItem[];
  translate?: { x: number; y: number };
  orientation?: "horizontal" | "vertical";
  className?: string;
  itemSpacing?: number;
};

export const Legend: React.FC<LegendProps> = ({
  items,
  translate,
  orientation = "horizontal",
  className,
  itemSpacing = 20,
}) => {
  return (
    <Group translate={translate} className={className}>
      {items.map((item, i) => {
        const offset =
          orientation === "horizontal"
            ? { x: i * (100 + itemSpacing), y: 0 }
            : { x: 0, y: i * (20 + itemSpacing) };

        return (
          <Group key={item.label} translate={offset}>
            <Rect
              x={0}
              y={-8}
              width={12}
              height={12}
              fill={item.color}
              className="stroke-gray-300"
            />
            <Text
              x={16}
              y={2}
              className="text-sm fill-gray-700"
              style={{ fontSize: "12px" }}
            >
              {item.label}
            </Text>
          </Group>
        );
      })}
    </Group>
  );
};
