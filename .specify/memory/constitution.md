# Todo App Development Constitution

<!-- 
  Sync Impact Report: Initial Constitution (v1.0.0)
  - NEW Constitution created from scratch
  - 5 Core Principles extracted from docs/: Test-Driven Development, Single Responsibility, 
    Code Quality Standards, Error Handling, Component Reusability
  - Added Development Workflow & Review Process section
  - Added Technology & Architecture Constraints section
  - Added comprehensive Governance section
  - Version: 1.0.0 (initial ratification)
  - All templates (plan-template, spec-template, tasks-template) reference this constitution
    for compliance checking - no template updates needed beyond reference validation.
-->

## Core Principles

### I. Test-Driven Development (NON-NEGOTIABLE)
All new features and bug fixes MUST be accompanied by tests before or alongside implementation. Maintain 80%+ code coverage across frontend and backend packages. Test organization: unit tests for individual components/functions, integration tests for component interactions and API communication. Test files colocate with source code in `__tests__/` directories using `{filename}.test.js` naming. Follow Red-Green-Refactor cycle: write failing test → implement minimal code → refactor while tests pass.

**Rationale**: Ensures reliability, enables safe refactoring, and documents expected behavior through executable specifications.

### II. Single Responsibility & Code Organization
Every module, component, and function MUST have a single, well-defined responsibility. Components should not mix concerns (e.g., TodoCard displays todos; it does not fetch or delete). Organize code consistently: imports (external → internal → styles), constants, utilities, main component/class, helpers, exports. Frontend structure: `components/`, `services/`, `utils/` directories with colocated tests. Backend structure: `routes/`, `controllers/`, `services/`, `middleware/` with tests in `__tests__/`.

**Rationale**: Improves maintainability, enables independent testing, facilitates code reuse, and simplifies debugging.

### III. Code Quality Standards (DRY, KISS, SOLID)
DO NOT repeat code; extract common logic into reusable functions and shared utilities. Prefer simple, straightforward implementations over complex solutions. Apply SOLID principles: use composition over inheritance, depend on abstractions, keep interfaces focused. Naming MUST be descriptive: `camelCase` for variables/functions, `PascalCase` for React components and classes, `UPPER_SNAKE_CASE` for constants. All code MUST pass linting with no errors or warnings before pull request submission.

**Rationale**: Reduces defects, improves readability, minimizes technical debt, and enables faster feature development.

### IV. Error Handling & User Feedback
All error-prone operations MUST include try-catch blocks and graceful error handling. Errors MUST provide meaningful, actionable messages to users. Display clear feedback when operations fail (e.g., "Failed to update todo. Please try again."). Errors are logged to console for debugging; production code MUST NOT include console.log statements except in development-only contexts.

**Rationale**: Prevents silent failures, improves user trust, and enables faster issue resolution.

### V. Component Reusability & Material Design Patterns
React components MUST be composable and reusable. Use props to configure behavior; avoid hardcoded logic. Follow Material Design principles: consistent spacing (8px grid), defined color palette with light/dark mode support, clear typography hierarchy. UI components use border-radius (4-8px) for modern feel, subtle shadows for elevation, and keyboard accessibility for all interactive elements.

**Rationale**: Reduces duplication, improves consistency, ensures accessibility, and speeds up UI implementation.

## Development Workflow & Review Process

All code contributions MUST follow this workflow:

1. **Feature Planning**: Refer to functional requirements; break work into independent, testable user stories.
2. **Test-First Development**: Write tests describing expected behavior before or alongside implementation.
3. **Code Quality**: Ensure DRY principles, naming conventions, and SOLID design; run linting locally.
4. **Testing**: Achieve 80%+ coverage; verify unit and integration tests pass locally.
5. **Code Review**: Pull requests must verify compliance with all principles above; code review checklist includes naming, imports, error handling, tests, and commit quality.
6. **Atomic Commits**: Each commit represents one logical change with clear, descriptive messages explaining the "why".

Developers MUST run `npm run lint` and `npm test` locally before submitting pull requests. All linting errors and warnings MUST be resolved before merge.

## Technology & Architecture Constraints

- **Frontend**: React with CSS for styling; Jest with React Testing Library for tests
- **Backend**: Node.js/Express.js; Jest for tests
- **Monorepo Structure**: npm workspaces; separate frontend and backend packages
- **Database/Persistence**: Single-user todos persisted through Express.js REST API
- **No Out-of-Scope Features**: No user authentication, multi-user support, complex filtering, or undo/redo

## Governance

This constitution is the authoritative guide for project development. All code, tests, and architectural decisions MUST comply with these principles. The constitution supersedes all other guidance except where conflicting with functional requirements in `docs/functional-requirements.md`.

**Amendment Process**: Constitution changes MUST be documented with:
- Clear rationale for each principle added, removed, or modified
- Version bump following semantic versioning (MAJOR for principle removals/redefinitions, MINOR for additions, PATCH for clarifications)
- Propagation to dependent templates: `plan-template.md`, `spec-template.md`, `tasks-template.md`
- PR review approval before merge

**Compliance Verification**: Code reviews MUST check constitutional compliance. Use this constitution alongside `docs/coding-guidelines.md`, `docs/testing-guidelines.md`, `docs/functional-requirements.md`, and `docs/ui-guidelines.md` as runtime development guidance.

**Version**: 1.0.0 | **Ratified**: 2025-12-05 | **Last Amended**: 2025-12-05
