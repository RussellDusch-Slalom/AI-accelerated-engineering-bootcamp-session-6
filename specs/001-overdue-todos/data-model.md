```markdown
# Data Model: Overdue Todos (Phase 1)

## Entities

- **Todo Item**
  - `id` (string, required) — unique identifier
  - `title` (string, required, max 255)
  - `dueDate` (string, nullable) — ISO 8601 date (YYYY-MM-DD or full ISO); null means no due date
  - `completed` (boolean, required)
  - `createdAt` (string, ISO timestamp)
  - `updatedAt` (string, ISO timestamp)

## Derived/Computed Fields (client-side)

- **Overdue Status** (derived):
  - `isOverdue` (boolean) — `true` when `dueDate` is not null AND `dueDate` < local today AND `completed` is false
  - `daysOverdue` (integer, >=1) — computed as `localToday - dueDate` in days when `isOverdue` is true

## Validation Rules

- `title` must be present and <= 255 characters.
- `dueDate` if present must parse as an ISO date (YYYY-MM-DD or full ISO). When parsing, strip time-of-day and use local date for comparisons.
- `completed` must be boolean.

## State Transitions

- Creation: `completed=false` by default. If `dueDate` < local today at creation time, `isOverdue` will be `true` immediately (FR-008).
- Mark Complete: When a user marks a todo completed, `completed` becomes `true`. UI may still show the historical overdue indicator plus a "Completed" badge as per spec.
- Date Advance: As `localToday` advances (e.g., midnight), `isOverdue` may transition from `false` to `true` without a persistent change to the todo; it's a derived client-side state and recalculated on render/page load (FR-005).

## Notes on Persistence

- Overdue status is derived and therefore not persisted as a separate field. Backend must continue to persist `dueDate` and `completed` reliably (FR-009). If future offline or server-driven features require persisted overdue metadata, add explicit fields at that time.

```
