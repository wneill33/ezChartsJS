# Contributing to ezCharts

Thank you for your interest in contributing to ezCharts! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/ezCharts.git`
3. Install dependencies: `pnpm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Workflow

### Running the Development Server

```bash
pnpm dev
```

This will start the Vite dev server with the examples application where you can see your changes in real-time.

### Building the Library

```bash
pnpm build
```

This compiles the TypeScript and creates distributable files in the `dist` directory.

### Running Tests

```bash
# Run tests once
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### Type Checking

```bash
pnpm typecheck
```

## Code Style

- Use TypeScript for all new code
- Follow existing code formatting conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

## Adding New Features

### Adding a New Chart Type

1. Create a new file in `src/` (e.g., `src/pie-chart.tsx`)
2. Export the component and types
3. Add the export to `src/index.ts`
4. Create tests in `src/[component-name].test.tsx`
5. Add examples in `examples/App.tsx`
6. Update the README with usage documentation

### Adding New Utilities

1. Add functions to appropriate files in `src/`
2. Export from `src/index.ts`
3. Write tests
4. Document in README

## Testing Guidelines

- Write unit tests for utility functions
- Write component tests for React components
- Ensure all tests pass before submitting PR
- Aim for high code coverage

## Pull Request Process

1. Update the README.md with details of changes if applicable
2. Update the documentation for any new features
3. Ensure all tests pass and there are no TypeScript errors
4. Follow the existing code style
5. Write clear, descriptive commit messages
6. Submit the PR with a clear description of changes

## Commit Message Guidelines

Use clear and descriptive commit messages:

- `feat: add pie chart component`
- `fix: resolve axis tick formatting issue`
- `docs: update README with new examples`
- `test: add tests for scatter plot`
- `refactor: simplify scale calculations`

## Questions?

Feel free to open an issue for any questions or discussions about contributing!
