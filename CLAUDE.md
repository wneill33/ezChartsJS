# ezCharts - Claude Development Guide

## Project Overview

ezCharts is a minimalist, React-based visualization library built with TypeScript and SVG. It provides beautiful, performant charts through simple, composable components.

**Key Features:**
- Multiple chart types: Bar, Line, Scatter, Area, and Pie charts
- Composable architecture with primitive SVG components
- Full TypeScript support with type safety
- Tailwind-friendly styling
- Minimal dependencies and tree-shakeable
- Pure SVG rendering with React

## Technology Stack

- **Language:** TypeScript
- **Framework:** React 18
- **Build Tool:** tsup (for library bundling)
- **Dev Server:** Vite
- **Testing:** Vitest with jsdom
- **Package Manager:** pnpm

## Project Structure

```
src/
├── primitives.tsx          # Base SVG components (Svg, Group, Rect, Line, Text, etc.)
├── scales.ts              # Scale functions (linear, log, band, etc.)
├── scales.test.ts         # Scale function tests
├── theme/                 # Theme system
│   ├── types.ts          # Theme type definitions
│   ├── defaults.ts       # Default theme values
│   ├── ThemeContext.tsx  # React context for theming
│   └── index.ts          # Theme exports
├── utils/                # Utility functions
│   ├── styles.ts         # Style utilities
│   └── comparison.ts     # Comparison utilities
├── axis.tsx              # Axis component
├── grid.tsx              # Grid component
├── legend.tsx            # Legend component
├── bar-chart.tsx         # Bar chart component
├── line-chart.tsx        # Line chart component
├── scatter-plot.tsx      # Scatter plot component
├── area-chart.tsx        # Area chart component
├── pie-chart.tsx         # Pie chart component
└── index.ts              # Main exports
```

## Core Architecture

### 1. Primitives
Base SVG components that wrap native SVG elements with React-friendly props:
- `Svg` - Root container
- `Group` - SVG group with optional translation
- `Rect`, `Line`, `Text`, `Circle`, `Path` - Basic shapes

### 2. Scales
Mathematical functions for mapping data to visual dimensions:
- `linearScale` - Linear mapping
- `logScale` - Logarithmic mapping
- `bandScale` - Categorical data mapping
- `niceTicks` - Generate readable tick values
- `extent` - Find min/max in datasets

### 3. Layout Components
Reusable components for chart structure:
- `Axis` - Configurable X/Y axes
- `Grid` - Background grid lines
- `Legend` - Chart legend

### 4. Chart Components
High-level chart implementations:
- `BarChart` - Vertical bar charts
- `LineChart` - Line graphs with multiple series
- `ScatterPlot` - Scatter plots
- `AreaChart` - Filled area charts
- `PieChart` - Pie/donut charts

### 5. Theme System
Centralized theming using React Context for consistent styling across all charts.

## Development Workflow

### Available Scripts

```bash
pnpm dev           # Start Vite dev server with examples
pnpm build         # Build library with tsup
pnpm test          # Run Vitest tests
pnpm test:watch    # Run tests in watch mode
pnpm typecheck     # Type check without emitting files
```

### Building the Library

The library is built using tsup, which generates:
- `dist/index.cjs` - CommonJS bundle
- `dist/index.mjs` - ES Module bundle
- `dist/index.d.ts` - TypeScript definitions

### Testing

Tests use Vitest with jsdom for React component testing. Test files use `.test.ts` extension.

## Development Guidelines

### When Making Changes

1. **Primitives Changes**: If modifying base SVG components, ensure all chart components still work correctly
2. **Scale Changes**: Run tests to verify scale calculations are accurate
3. **Chart Components**: Consider if changes should be applied to all chart types for consistency
4. **Theme Changes**: Ensure all components respect theme values

### Code Style

- Use TypeScript for all new files
- Export components and utilities from appropriate index files
- Keep components focused and composable
- Prefer functional components with hooks
- Use descriptive prop names and provide TypeScript types

### Adding New Chart Types

1. Create new component file in `src/`
2. Use existing primitives and utilities
3. Follow the pattern of existing chart components
4. Add tests for the new chart type
5. Export from `src/index.ts`
6. Update README.md with examples

### Adding New Features

1. Consider if it should be a primitive, utility, or chart component
2. Ensure TypeScript types are properly defined
3. Write tests for new functionality
4. Update relevant documentation

## API Design Principles

- **Composability**: Components should work together seamlessly
- **Simplicity**: Minimize required props, provide sensible defaults
- **Type Safety**: Leverage TypeScript for better DX
- **Flexibility**: Allow customization without being prescriptive
- **Performance**: Use React best practices, avoid unnecessary re-renders

## Common Tasks

### Adding a New Primitive Component

1. Add to [primitives.tsx](src/primitives.tsx)
2. Define TypeScript interface for props
3. Ensure it follows SVG spec
4. Export from the file

### Modifying Scale Functions

1. Edit [scales.ts](src/scales.ts)
2. Update tests in [scales.test.ts](src/scales.test.ts)
3. Run tests to verify calculations
4. Consider impact on all chart types

### Updating Theme System

1. Modify types in [theme/types.ts](src/theme/types.ts)
2. Update defaults in [theme/defaults.ts](src/theme/defaults.ts)
3. Ensure all components use theme context properly
4. Test with custom themes

## Dependencies

### Peer Dependencies
- `react` ^18.0.0
- `react-dom` ^18.0.0

### Dev Dependencies
- Build: tsup, vite, typescript
- Testing: vitest, jsdom
- Types: @types/react, @types/react-dom
- Vite: @vitejs/plugin-react

## Publishing

Before publishing:
1. Run `pnpm typecheck` to ensure no type errors
2. Run `pnpm test` to ensure all tests pass
3. Run `pnpm build` to create distribution files
4. Update version in package.json
5. The `prepublishOnly` script runs build and typecheck automatically

## Notes for Claude

- This is a library project, not an application
- Focus on composability and reusability
- Keep the API simple and intuitive
- All components are functional React components
- SVG is the rendering primitive (no canvas)
- The library should remain minimal and focused
- Performance matters - this may be used in dashboards with many charts
- TypeScript types are crucial for good developer experience
