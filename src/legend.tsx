import * as React from "react";
import { Group, Rect, Text } from "./primitives";
import { useTheme } from "./theme";
import { createLegendMarkerStyle, createLegendTextStyle } from "./utils/styles";

export type LegendItem = {
  label: string;
  color: string;
};

type LegendProps = {
  items: LegendItem[];
  translate?: { x: number; y: number };
  orientation?: "horizontal" | "vertical";
  itemSpacing?: number;
};

export const Legend = React.memo<LegendProps>(function Legend({
  items,
  translate,
  orientation = "horizontal",
  itemSpacing = 20,
}) {
  const theme = useTheme();

  const textStyle = React.useMemo(
    () => createLegendTextStyle(theme),
    [theme]
  );

  return (
    <Group translate={translate}>
      {items.map((item, i) => {
        const offset =
          orientation === "horizontal"
            ? { x: i * (100 + itemSpacing), y: 0 }
            : { x: 0, y: i * (20 + itemSpacing) };

        const markerStyle = createLegendMarkerStyle(theme, item.color);

        return (
          <Group key={item.label} translate={offset}>
            <Rect
              x={0}
              y={-8}
              width={12}
              height={12}
              style={markerStyle}
            />
            <Text x={16} y={2} style={textStyle}>
              {item.label}
            </Text>
          </Group>
        );
      })}
    </Group>
  );
});
