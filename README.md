# ezCharts

A minimalist, React-based visualization library built with TypeScript and SVG. Create beautiful, performant charts with simple, composable components.

## Features

- 🎨 **Beautiful charts** - Bar, Line, Scatter, and Area charts out of the box
- 🧱 **Composable** - Build custom visualizations with primitive components
- 🎯 **TypeScript** - Fully typed for great developer experience
- 🎨 **Tailwind-friendly** - Style with Tailwind classes
- 📦 **Tiny** - Minimal dependencies, tree-shakeable
- ⚡ **Fast** - Pure SVG rendering with React

## Installation

```bash
npm install ezcharts
# or
pnpm add ezcharts
# or
yarn add ezcharts
```

## Quick Start

```tsx
import { BarChart } from "ezcharts";

const data = [
  { label: "Jan", value: 30 },
  { label: "Feb", value: 45 },
  { label: "Mar", value: 60 },
];

function App() {
  return <BarChart data={data} width={600} height={400} />;
}
```

## Chart Types

### Bar Chart

```tsx
import { BarChart } from "ezcharts";

const data = [
  { label: "A", value: 30 },
  { label: "B", value: 45 },
  { label: "C", value: 60 },
];

<BarChart
  data={data}
  width={600}
  height={400}
  color="#3b82f6"
  showGrid={true}
/>;
```

### Line Chart

```tsx
import { LineChart } from "ezcharts";

const series = [
  {
    name: "Series A",
    data: [
      { x: 1, y: 30 },
      { x: 2, y: 45 },
      { x: 3, y: 60 },
    ],
    color: "#3b82f6",
  },
];

<LineChart
  series={series}
  width={600}
  height={400}
  showGrid={true}
  showPoints={true}
/>;
```

### Scatter Plot

```tsx
import { ScatterPlot } from "ezcharts";

const data = [
  { x: 10, y: 20, size: 5 },
  { x: 20, y: 30, size: 8 },
  { x: 30, y: 25, size: 6 },
];

<ScatterPlot data={data} width={600} height={400} />;
```

### Area Chart

```tsx
import { AreaChart } from "ezcharts";

const series = [
  {
    name: "Revenue",
    data: [
      { x: 1, y: 30 },
      { x: 2, y: 45 },
      { x: 3, y: 60 },
    ],
    color: "#10b981",
  },
];

<AreaChart series={series} width={600} height={400} />;
```

## Building Custom Charts

Use the primitive components to build your own visualizations:

```tsx
import { Svg, Group, Rect, Line, Text } from "ezcharts";
import { linearScale } from "ezcharts";

function CustomChart() {
  const scale = linearScale([0, 100], [0, 400]);

  return (
    <Svg width={500} height={300}>
      <Group translate={{ x: 50, y: 50 }}>
        <Rect x={0} y={0} width={400} height={200} fill="#f0f0f0" />
        <Line x1={0} y1={100} x2={400} y2={100} stroke="#333" />
        <Text x={200} y={100} textAnchor="middle">
          Custom Chart
        </Text>
      </Group>
    </Svg>
  );
}
```

## API Reference

### Scales

- `linearScale(domain, range)` - Linear scale function
- `logScale(domain, range, base?)` - Logarithmic scale
- `bandScale(domain, range, padding?)` - Band scale for categorical data
- `niceTicks(min, max, count?)` - Generate nice tick values
- `extent(data)` - Find min and max values

### Components

- `Svg` - Root SVG container
- `Group` - SVG group with optional translation
- `Rect`, `Line`, `Text` - Basic SVG primitives
- `Axis` - Configurable axis component
- `Grid` - Grid lines for charts
- `Legend` - Chart legend

## Development

```bash
# Install dependencies
pnpm install

# Run dev server with examples
pnpm dev

# Build library
pnpm build

# Run tests
pnpm test

# Type check
pnpm typecheck
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
