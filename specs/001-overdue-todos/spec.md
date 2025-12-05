# Feature Specification: Support for Overdue Todo Items

**Feature Branch**: `001-overdue-todos`  
**Created**: December 5, 2025  
**Status**: Draft  
**Input**: User description: "As a todo application user I want to easily identify and distinguish overdue tasks in my todo list so that I can prioritize my work and quickly see which tasks are past their due date"

## Clarifications

### Session December 5, 2025

- Q: Should overdue items require two visual properties or can a single strong visual property suffice? → A: Single strong visual property aligned with design system (e.g., danger color from theme)
- Q: Where should the aggregate overdue count badge be positioned? → A: Inline with list title (integrated into "My Todos" section header)
- Q: How should the system determine "today" for overdue calculations across timezones? → A: Use browser/system local date for "today"
- Q: What accessibility standard should this feature meet? → A: Follow project's existing accessibility approach
- Q: When a user marks an overdue todo as complete, how should the UI display it? → A: Keep overdue indicator but add "completed" badge to show historical context

## User Scenarios & Testing

### User Story 1 - Quick Visual Identification of Overdue Tasks (Priority: P1)

User needs a clear, immediate visual indicator that distinguishes overdue todos from on-time todos at a glance. This includes visual cues like color changes, icons, badges, or styling that make it obvious which items are past their due date without requiring the user to mentally compare dates.

**Why this priority**: This is the core value of the feature. Users need quick visual scanning to identify overdue items. Without this, the feature doesn't solve the primary problem. This is the MVP requirement.

**Independent Test**: Can be fully tested by viewing a todo list containing both on-time and overdue items and verifying that overdue items are visually distinct. Delivers immediate value by showing users which tasks need urgent attention.

**Acceptance Scenarios**:

1. **Given** a todo list with items having due dates, **When** today's date passes an item's due date, **Then** that item displays a distinct visual indicator (color, badge, or styling)
2. **Given** a list of todos where some are overdue and some are not, **When** user views the list, **Then** overdue items are visually distinct from on-time items without requiring interaction
3. **Given** an overdue todo item, **When** user views the todo card, **Then** a visual indicator (e.g., red highlight, warning badge, or status text) clearly shows the item is overdue

---

### User Story 2 - Overdue Status Clarity (Priority: P2)

User needs to understand exactly how overdue an item is—how many days past the due date. This provides context for prioritization (1 day overdue is less urgent than 10 days overdue).

**Why this priority**: Supporting information that enhances decision-making. Users can see which of their overdue items are most urgent. This adds practical value but isn't required for basic overdue identification.

**Independent Test**: Can be tested by viewing overdue items and verifying that the number of days overdue is displayed or can be determined. Users can prioritize which overdue items to tackle first based on how long they've been overdue.

**Acceptance Scenarios**:

1. **Given** a todo that is 5 days overdue, **When** user views the todo item, **Then** the overdue duration is displayed (e.g., "5 days overdue" or "Due Dec 1st - 4 days ago")
2. **Given** a todo with a due date and today's date, **When** the due date is in the past, **Then** the system calculates and displays the number of days overdue
3. **Given** an overdue item, **When** user views the item, **Then** the display distinguishes between "1 day overdue" and "10 days overdue" to indicate relative urgency

---

### User Story 3 - Bulk Awareness of Overdue Workload (Priority: P3)

User wants to see at a glance how many tasks are overdue, helping them understand their overall backlog situation without counting manually. The aggregate count is displayed inline with the "My Todos" section header for easy discoverability without page scrolling.

**Why this priority**: Nice-to-have enhancement. Provides aggregate information for motivation and planning. Not essential for identifying individual overdue items, but helps with overall task management and user awareness.

**Independent Test**: Can be tested by viewing the todo list and verifying a summary count or indicator of overdue items inline with the list title. Users can quickly assess "I have 3 overdue tasks" without manual counting.

**Acceptance Scenarios**:

1. **Given** a todo list with multiple overdue items, **When** user views the main todo interface, **Then** a summary indicator shows the count of overdue items inline with the "My Todos" title (e.g., "My Todos (3 overdue)")
2. **Given** zero overdue tasks, **When** user views the interface, **Then** no overdue count indicator is displayed (e.g., just "My Todos")
3. **Given** new todos that become overdue, **When** user views the list, **Then** the overdue count updates in real-time to reflect the new count

---

### Edge Cases

- **Past Due Date at Creation**: When a user creates a todo with a past due date, it is immediately marked as overdue (FR-008). ✓ Resolved
- **Timezone Handling**: The system uses the browser/system local date to determine "today." No server-side timezone conversion is required. ✓ Resolved
- **Due Today Edge Case**: A todo due "today" is NOT marked as overdue. Only dates before today trigger overdue status. ✓ Resolved in requirements
- **Completed Overdue Todos**: When a user marks an overdue todo as complete, the overdue indicator is retained but supplemented with a "completed" badge to show historical context (was overdue but now done). ✓ Resolved
- **Todos Without Due Dates**: Todos with null/undefined due dates are excluded from overdue calculations and display no overdue indicator.

## Requirements

### Functional Requirements

- **FR-001**: System MUST calculate whether a todo item is overdue by comparing its due date to the current date
- **FR-002**: System MUST display a visual overdue indicator on todo items where the due date is before today's date
- **FR-003**: System MUST only show overdue status for incomplete todos (completed todos should not be marked as overdue, but may display completed badge alongside overdue indicator for historical context)
- **FR-004**: System MUST display the number of days overdue for each overdue item
- **FR-005**: System MUST update overdue status in real-time as the current date changes (across page refreshes or at midnight)
- **FR-006**: System MUST apply overdue styling consistently across all todo displays (list view, individual cards, etc.) using a single strong visual property from the design system's danger color palette
- **FR-007**: System SHOULD display an aggregate count of overdue items inline with the "My Todos" section header (e.g., "My Todos (3 overdue)"), hidden when count is zero
- **FR-008**: System MUST handle edge case where a user creates a todo with a past due date by immediately marking it as overdue
- **FR-009**: System MUST persist overdue information correctly when syncing with the backend

### Key Entities

- **Todo Item**: Represents a task with properties including `dueDate`, `completed`, and overdue status (derived from comparing dueDate to current date)
- **Overdue Status**: Derived data indicating whether a todo is past its due date and not yet completed; includes days overdue calculation and completed state for historical context

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users can identify all overdue tasks in a list of 20+ items in under 5 seconds
- **SC-002**: 100% of incomplete todos with past due dates display an overdue indicator
- **SC-003**: Overdue items are visually distinct from on-time items using a single strong visual property aligned with the design system's danger color palette (e.g., red border, red background, or danger-colored badge)
- **SC-004**: Zero false positives: no incomplete todos with future or today's due dates are marked as overdue
- **SC-005**: Days overdue calculation is accurate to within the current day (no off-by-one errors)
- **SC-006**: Overdue status updates correctly when the calendar advances to a new day
- **SC-007**: 95% of users successfully locate overdue items without instructions or help

## Assumptions

- Todo items have a `dueDate` property that can be null/undefined (for todos without due dates)
- Todo items have a `completed` status property
- "Today" is determined by the client-side system date (using browser/system local date; no server-side timezone conversion)
- The application uses a consistent date format for due dates (ISO 8601 or similar)
- The application already persists todo items to a backend; overdue calculation is client-side display logic
- No timezone handling is required beyond the user's local date
- Completed todos may display the overdue indicator supplemented with a "completed" badge to show historical context (was overdue but now done)
- Overdue visual indicators use a single strong visual property (danger color from the design system's theme palette) to remain consistent with UI guidelines
- The aggregate overdue count (P3) is displayed inline with the "My Todos" section header (e.g., "My Todos (3 overdue)") and hidden when zero
- Accessibility follows the project's existing accessibility approach and standards
