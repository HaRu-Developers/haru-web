# GitHub Copilot Instructions for the haru-web Project

As a reviewer for the `haru-web` project, your feedback and suggestions must strictly adhere to the following conventions.

## 1. Core Principle

Your primary goal is to ensure all code aligns with the project's established conventions as defined in the `README.md` and this document. Be strict about enforcing these rules.

## 2. Commit Messages and PR Titles

- **Format**: Must follow the pattern `:gitmoji: Tag: Description`.
- **Tag Capitalization**: The tag must be capitalized (e.g., `Feat`, `Fix`, `Refactor`, `UI`, `Docs`).
- **Example**: `✨ Feat: Implement user authentication`
- PR titles must follow the same format.

## 3. Naming Conventions

- **File Naming**:
  - React Components (Server Components): `PascalCase.server.tsx`
  - React Components (Client Components): `PascalCase.client.tsx`
  - React Hooks: `useCamelCase.ts`
  - Utility/Service/API files: `kebab-case.ts`
  - Storybook files: `Component.stories.tsx`
  - Type definition files: `component.types.ts` or `hook.types.ts`
- **Folder Naming**:
  - Component folders must be `PascalCase` and match the component name.
- **Variable and Type Naming**:
  - Types, Interfaces, Enums: `PascalCase` (e.g., `UserProfile`, `StatusEnum`). Add suffixes like `Props`, `Data`, `Params` for clarity.
  - Enum Members: `CAPITAL_SNAKE_CASE`.
  - Global Constants: `CAPITAL_SNAKE_CASE`.
  - Functions & Variables: `camelCase`.
  - **No abbreviations** unless they are universally understood (e.g., `props`, `docs`).

## 4. Code Style and Formatting (Strict Enforcement)

- **ESLint & Prettier**: All code must pass linter and formatter checks. The configuration is in the repository.
- **React Components**: **Must** be defined as arrow functions (`const MyComponent = (): JSX.Element => { ... };`).
- **Props**: Always destructure props in the function signature.
- **`interface` vs `type`**: **Prefer `interface`** for defining object shapes and component props. Use `type` for unions, intersections, or primitives.
- **Navigation**: Use the `<Link>` component for navigation instead of `useRouter().push()`.
- **Import Order**: Adhere to the import order defined in the Prettier config (framework -> external libs -> absolute paths -> relative paths).

## 5. Architecture and File Structure

- **Domain-Driven Structure**:
  - Place domain-specific logic inside `src/features/{domain-name}/`. This includes components, hooks, APIs, and types specific to that feature.
  - Place truly global, reusable logic inside `src/common/`.
- **Co-location**:
  - A component's specific types (`*.types.ts`) and stories (`*.stories.tsx`) must be located within its own folder (`src/features/domain/components/MyComponent/`).
- **API Calls**:
  - API fetching logic should be defined in `src/features/{domain-name}/apis/`.

## 6. State Management

- **Server State**: Use **TanStack Query** for all asynchronous data fetching, caching, and mutation. Do not use `useEffect` for data fetching.
- **Client State**: Use **Zustand** for global client-side state. Avoid creating one-off `useState` for state that needs to be shared.

By following these instructions, you will help maintain the consistency and quality of the `haru-web` codebase.

Lastly, translate your review comments in Korean before submitting.
