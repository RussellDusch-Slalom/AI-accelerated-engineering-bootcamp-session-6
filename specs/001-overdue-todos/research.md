```markdown
# Research: Overdue Todos (Phase 0)

## Decisions

- Decision: Calculate overdue status on the client using the browser/system local date.
  - Rationale: The spec clarifies "use browser/system local date"; client-side calculation avoids timezone mismatch and keeps display responsive without backend changes.

- Decision: Use a single strong visual property (design system `danger` color) for the overdue indicator (border or badge), plus an accessible icon and days-overdue text.
  - Rationale: Matches UI guidelines and the feature acceptance criteria which require a single strong visual property for high-contrast identification.

- Decision: Display "X days overdue" (integer days) on the todo card for context.
  - Rationale: Provides easy prioritization; simpler to implement and test than precise humanized formats.

- Decision: Show aggregate overdue count inline with the "My Todos" header (hidden if zero).
  - Rationale: Lightweight, discoverable, and matches the spec acceptance scenario.

## Alternatives Considered

- Server-side overdue calculation:
  - Pros: Single source of truth, consistent across clients.
  - Cons: Requires timezone coordination, backend changes, and additional network calls. Rejected because spec mandates browser local date and the app is single-user.

- Showing detailed humanized durations ("5 days, 3 hours overdue"):
  - Pros: More precise.
  - Cons: More UI complexity and limited value for prioritization. Rejected in favor of whole days.

## Implementation Notes

- Utility: Implement `isOverdue(dueDate, nowDate)` and `daysOverdue(dueDate, nowDate)` in `packages/frontend/src/utils/overdue.js`.
- UI: Update `TodoCard` to apply `danger` color styling when `isOverdue` and `!completed`.
- Aggregate: Compute overdue count in `TodoList` and render as `My Todos (N overdue)` when N > 0.
- Accessibility: Ensure overdue indicator is conveyed via text (e.g., `aria-label` / visually hidden text) in addition to color.
- Testing: Add unit tests for utility functions and component tests for `TodoCard`/`TodoList` covering rendering, days calculation, and header count.

## Risk & Mitigation

- Off-by-one day errors across midnight: Use local date (compare YYYY-MM-DD) rather than strict timestamp differences to avoid time-of-day issues.
- Todos without `dueDate`: Treat as not overdue; ensure null-safe handling.

```
