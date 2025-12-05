ios/ or android/
# Implementation Plan: Overdue Todos (001-overdue-todos)

**Branch**: `001-overdue-todos` | **Date**: 2025-12-05 | **Spec**: `./spec.md`
**Input**: Feature specification from `/workspaces/AI-accelerated-engineering-bootcamp-session-6/specs/001-overdue-todos/spec.md`

## Summary

Add client-side support for marking and surfacing overdue todo items. The UI will compute overdue status using the user's local date, display a single strong visual indicator (design system danger color) on incomplete todos whose `dueDate` is before today, show days-overdue text on the todo card, and surface an aggregate overdue count inline with the "My Todos" header.

## Technical Context

**Language/Version**: JavaScript/Node.js for backend, React (frontend). Node 16+ / modern browsers.  
**Primary Dependencies**: `packages/frontend`: React, React DOM; `packages/backend`: Express. Project-wide dev tools: Jest, ESLint.  
**Storage**: Existing backend persistence used for todos (Express API); no schema changes required for derived overdue data (calculated client-side).  
**Testing**: Jest + React Testing Library (frontend), Jest for backend unit/integration tests.  
**Target Platform**: Web browsers (desktop-first) — client-side calculation of overdue dates using browser local date.  
**Project Type**: Web application (monorepo with `packages/frontend` and `packages/backend`).  
**Performance Goals**: No specific perf targets; feature operates on client-side list rendering and must not degrade UI responsiveness for typical lists (20–200 items).  
**Constraints**: Must respect constitution (TDD first), accessibility requirements, and use existing CSS theme tokens (danger color).  
**Scale/Scope**: Single-user todo app; expected lists of tens to low hundreds of items per user.

## Constitution Check

GATE: This plan must confirm there are no constitution violations preventing Phase 0 research.

- **TDD (Core Principle I)**: PASS — tests will be added/updated for all behaviors (overdue calculation, rendering, accessibility). Frontend unit tests and integration tests will accompany implementation.
- **Single Responsibility & Organization (II)**: PASS — overdue logic implemented in a small utility and consumed by `TodoCard`/`TodoList`; UI changes limited to components under `packages/frontend/src/components`.
- **Code Quality Standards (III)**: PASS — follow lint rules; new utilities will be extracted and reused.
- **Error Handling & User Feedback (IV)**: PASS — no new external network dependencies; any persistence failures already covered by existing backend error handling.
- **Component Reusability & Material Patterns (V)**: PASS — styling will use existing theme variables and follow accessibility and design guidelines.

No fatal gates detected; Phase 0 research may proceed.

## Project Structure

### Documentation (this feature)

```text
specs/001-overdue-todos/
├── spec.md              # Feature spec (source of truth)
├── plan.md              # This implementation plan (this file)
├── research.md          # Phase 0 research output
├── data-model.md        # Phase 1 data model
├── quickstart.md        # Phase 1 quickstart / how-to-run notes
├── contracts/           # OpenAPI contract(s) for API changes (if any)
└── tasks.md             # Phase 2 tasks output (created by /speckit.tasks)
```

### Source Code (repository)

The repository already follows a monorepo layout with packages:

```text
packages/backend/       # Express API server (already persists todos)
packages/frontend/      # React app (UI components, services)
```

**Structure Decision**: Implement all UI and client-side logic inside `packages/frontend/src/`:
- `packages/frontend/src/utils/overdue.js` (new utility: isOverdue, daysOverdue)
- `packages/frontend/src/components/TodoCard.js` (update rendering to show overdue styling and days)
- `packages/frontend/src/components/TodoList.js` (display aggregate overdue count inline with header)

Backend changes: none required for overdue calculation; ensure API returns `dueDate` and `completed` as ISO strings/booleans (existing contract). If backend lacks `dueDate` for existing items, frontend will tolerate nulls.

## Complexity Tracking

No constitution violations require justification. Implementation is limited-scope, low-complexity client-side feature.

