# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 13+ cryptocurrency trading web application called "highbit-web" that uses the App Router pattern. The app appears to be a Korean cryptocurrency exchange interface with real-time trading features, charts, and portfolio management.

## Development Commands

```bash
# Development
npm run dev              # Start development server on localhost:3000

# Building
npm run build           # Production build
npm start              # Start production server

# Code Quality
npm run lint           # Run ESLint
npm run lint:fix       # Auto-fix ESLint issues
npm run prettier       # Format code with Prettier

# Testing
npm run test           # Run Vitest tests
npm run coverage       # Run tests with coverage report

# Storybook
npm run storybook              # Start Storybook on port 6006
npm run build-storybook        # Build Storybook
npm run deploy-storybook       # Deploy to GitHub Pages
```

## Architecture

### Tech Stack
- **Framework**: Next.js 13+ with App Router (`experimental.appDir: true`)
- **State Management**: Redux Toolkit with React Redux
- **Data Fetching**: TanStack React Query (formerly React Query)
- **Authentication**: NextAuth.js with Firebase integration
- **UI**: Chakra UI + Tailwind CSS + Styled Components
- **Charts**: react-financial-charts + D3
- **Testing**: Vitest with jsdom
- **Language**: TypeScript

### Key Architecture Patterns

**Provider Hierarchy** (in `src/app/layout.tsx`):
```
ReduxProvider
  → SessionProvider (NextAuth)
    → ReactQueryProvider
      → App Content + Modals
```

**State Management Structure**:
- Redux slices in `src/features/`: candles, markets, marketInfo, tickers, wallet, modals, notice
- React Query for API calls in `src/hooks/queries/`
- Firebase for authentication

**File Structure**:
- `src/app/`: Next.js 13 App Router pages and layouts
- `src/components/`: Reusable UI components (atoms, molecules, organisms)
- `src/features/`: Redux slices organized by domain
- `src/hooks/`: Custom React hooks including React Query hooks
- `src/constants/`: Configuration and constants

### Import Alias
Uses `~/*` alias for `./src/*` (configured in `tsconfig.json` and `vitest.config.ts`)

### Component Organization
- **Atoms**: Basic UI components (`src/components/atoms/`)
- **Domain Components**: Feature-specific UI (`src/components/ui/`)
- **Molecules/Organisms**: Composed components in root `components/`

### Key Features
- Real-time cryptocurrency trading interface
- Interactive financial charts with candlestick data
- Order book and trade execution
- Multi-language support (Korean primary)
- Responsive design with minimum width of 1400px

## Configuration Notes

- **Next.js Config**: Uses custom webpack config for SVG handling via @svgr/webpack
- **Images**: Allows domains: static.upbit.com, i.seadn.io, lh3.googleusercontent.com
- **ESLint**: Only lints `src` directory
- **Strict Mode**: Disabled (`reactStrictMode: false`)

## Development Notes

- The app uses Korean as primary language (`lang="ko-KR"`)
- Minimum screen width requirement of 1400px
- Uses Firebase for authentication backend
- API URL configured via `API_URL` environment variable