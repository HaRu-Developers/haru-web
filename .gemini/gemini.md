# Gemini Project Guidance: haru-web

This document provides a guide for Gemini to understand the `haru-web` project.

## 1. Project Overview

This is a web application built with Next.js and TypeScript. It utilizes Tailwind CSS for styling, Zustand and TanStack Query for state management, and Vitest for testing.

## 2. Core Technologies

- **Framework**: Next.js (with Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand (for client-side state), TanStack Query (for server state)
- **Testing**: Vitest, Storybook
- **Linting & Formatting**: ESLint, Prettier
- **Package Manager**: pnpm

## 3. Key Scripts

- **Run development server**: `pnpm dev`
- **Build for production**: `pnpm build`
- **Run tests**: `pnpm test:ci`
- **Run linter**: `pnpm lint`
- **Check formatting**: `pnpm format:check`
- **Apply formatting**: `pnpm format`
- **Check types**: `pnpm type-check`
- **Run Storybook**: `pnpm storybook`

## 4. Directory Structure

- `src/app`: App Router routes.
- `src/features`: Domain-specific features. Each feature folder contains its own `components`, `hooks`, `apis`, etc.
- `src/common`: Shared components, hooks, constants, and utilities used across the project.
- `src/assets`: Global assets like fonts.
- `src/lib`: Core library code, such as API fetchers.
- `src/styles`: Global styles and CSS tokens.
- `.storybook`: Storybook configuration files.
- `scripts`: Shell scripts for automation.

## 5. Coding Conventions

### Commit Messages

- Use gitmoji and follow the format: `:emoji: Tag: Description`.
- The tag's first letter must be capitalized (e.g., `Feat`, not `feat`).
- **Example**: `✨ Feat: Add user profile page`
- Refer to the `README.md` for the full list of allowed emojis and tags.

### Naming Conventions

- **Folders**:
  - Component folders should be PascalCase (e.g., `MyComponent`).
- **Files**:
  - Components: `PascalCase.tsx`
  - Hooks: `useCamelCase.ts`
  - Storybook: `*.stories.tsx`
  - Type definitions: `*.types.ts`
  - Other files (utils, etc.): `kebab-case.ts`
- **Variables**:
  - Types/Interfaces/Enums: `PascalCase` (e.g., `UserProfileData`, `StatusEnum`).
  - Enum members: `CAPITAL_SNAKE_CASE`.
  - Global constants: `CAPITAL_SNAKE_CASE`.
  - Functions and other variables: `camelCase`.
  - No abbreviations unless universally understood (e.g., `Docs` for `Documentation`).

### Code Style

- **Follow ESLint and Prettier rules strictly.**
- **Function Components**: Must be arrow functions.
- **Props**: Use destructuring.
- **`interface` vs `type`**: Prefer `interface`.
- **Prettier Rules**:
  - Indentation: 2 spaces.
  - Semicolons: Always use.
  - Quotes: Single quotes for JS/TS, double quotes for JSX attributes.
  - Trailing Commas: Always use.
  - Print Width: 100 characters.
- **Import Order**: Imports are sorted automatically by a Prettier plugin.
- **Tailwind CSS**: Classes are sorted automatically by a Prettier plugin.

### State Management

- **Server State**: Use TanStack Query for all asynchronous data operations.
- **Client State**: Use Zustand for global client-side state.

### Architecture

- Follow the domain-driven structure outlined in `README.md`.
- Place files in the appropriate `features/*` or `common/*` directory based on their scope.
- Component-specific types and stories should be co-located within the component's folder.
