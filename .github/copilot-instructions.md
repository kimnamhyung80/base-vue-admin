# Vue Enterprise Base Project - Copilot Instructions

## Project Overview
This is an enterprise-grade Vue 3 application with TypeScript, designed for large-scale business applications.

## Tech Stack
- **Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **HTTP Client**: Axios
- **Internationalization**: Vue I18n
- **Testing**: Vitest + Vue Test Utils
- **Linting**: ESLint + Prettier

## Project Structure
```
src/
├── api/           # API service layer
├── assets/        # Static assets (images, fonts, etc.)
├── components/    # Reusable UI components
│   ├── common/    # Common/shared components
│   └── ui/        # UI primitives (buttons, inputs, etc.)
├── composables/   # Vue composables (hooks)
├── config/        # App configuration
├── constants/     # Constants and enums
├── directives/    # Custom Vue directives
├── layouts/       # Page layouts
├── locales/       # i18n translation files
├── plugins/       # Vue plugins
├── router/        # Vue Router configuration
├── stores/        # Pinia stores
├── styles/        # Global styles
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── views/         # Page components
```

## Coding Conventions
- Use Composition API with `<script setup>` syntax
- Use TypeScript strict mode
- Follow Vue 3 style guide recommendations
- Use PascalCase for component names
- Use camelCase for variables and functions
- Use SCREAMING_SNAKE_CASE for constants
- Prefix composables with `use` (e.g., `useAuth`)
- Prefix stores with descriptive names (e.g., `authStore`, `userStore`)

## Best Practices
- Keep components small and focused
- Extract reusable logic into composables
- Use Pinia for global state management
- Handle errors gracefully with proper error boundaries
- Use environment variables for configuration
- Write unit tests for critical business logic
