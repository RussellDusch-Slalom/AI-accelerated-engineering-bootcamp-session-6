# Feature Specification: Support for Overdue Todo Items

**Feature Branch**: `001-overdue-todos`  
**Created**: December 5, 2025  
**Status**: Draft  
**Input**: User description: "As a todo application user I want to easily identify and distinguish overdue tasks in my todo list so that I can prioritize my work and quickly see which tasks are past their due date"

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

User wants to see at a glance how many tasks are overdue, helping them understand their overall backlog situation without counting manually.

**Why this priority**: Nice-to-have enhancement. Provides aggregate information for motivation and planning. Not essential for identifying individual overdue items, but helps with overall task management and user awareness.

**Independent Test**: Can be tested by viewing the todo list and verifying a summary count or indicator of overdue items. Users can quickly assess "I have 3 overdue tasks" without manual counting.

**Acceptance Scenarios**:

1. **Given** a todo list with multiple overdue items, **When** user views the main todo interface, **Then** a summary indicator shows the count of overdue items (e.g., "3 overdue tasks")
2. **Given** zero overdue tasks, **When** user views the interface, **Then** no overdue warning or indicator is displayed
3. **Given** new todos that become overdue, **When** user views the list, **Then** the overdue count updates to reflect the new count

---

### Edge Cases

- What happens when a user creates a todo with a past due date (should it be immediately overdue)?
- How does the system handle the timezone context for determining what "today" is?
- What should display for a todo that is due "today" but technically overdue at certain times of day?
- How does the UI handle tasks where the due date is set to None/empty while other tasks are overdue?
- Should completed overdue tasks show as overdue, or should completion status override the overdue indicator?

## Requirements

### Functional Requirements

- **FR-001**: System MUST calculate whether a todo item is overdue by comparing its due date to the current date
- **FR-002**: System MUST display a visual overdue indicator on todo items where the due date is before today's date
- **FR-003**: System MUST only show overdue status for incomplete todos (completed todos should not be marked as overdue)
- **FR-004**: System MUST display the number of days overdue for each overdue item
- **FR-005**: System MUST update overdue status in real-time as the current date changes (across page refreshes or at midnight)
- **FR-006**: System MUST apply overdue styling consistently across all todo displays (list view, individual cards, etc.)
- **FR-007**: System SHOULD display an aggregate count or badge indicating total number of overdue items on the main interface
- **FR-008**: System MUST handle edge case where a user creates a todo with a past due date by immediately marking it as overdue
- **FR-009**: System MUST persist overdue information correctly when syncing with the backend

### Key Entities

- **Todo Item**: Represents a task with properties including `dueDate`, `completed`, and overdue status (derived from comparing dueDate to current date)
- **Overdue Status**: Derived data indicating whether a todo is past its due date and not yet completed; includes days overdue calculation

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users can identify all overdue tasks in a list of 20+ items in under 5 seconds
- **SC-002**: 100% of incomplete todos with past due dates display an overdue indicator
- **SC-003**: Overdue items are visually distinct from on-time items with at least two visual properties (e.g., color + icon, or background + text styling)
- **SC-004**: Zero false positives: no incomplete todos with future or today's due dates are marked as overdue
- **SC-005**: Days overdue calculation is accurate to within the current day (no off-by-one errors)
- **SC-006**: Overdue status updates correctly when the calendar advances to a new day
- **SC-007**: 95% of users successfully locate overdue items without instructions or help

## Assumptions

- Todo items have a `dueDate` property that can be null/undefined (for todos without due dates)
- Todo items have a `completed` status property
- "Today" is determined by the client-side system date (no server time skew concerns at this scope)
- The application uses a consistent date format for due dates (ISO 8601 or similar)
- The application already persists todo items to a backend; overdue calculation is client-side display logic
- No timezone handling is required beyond the user's local date
- Completed todos should not display overdue indicators even if their due date is in the past
