---
description: "Task list for implementing Overdue Todos feature"
---

# Tasks: Overdue Todos (001-overdue-todos)

**Input**: Design documents from `/specs/001-overdue-todos/`
**Prerequisites**: plan.md, spec.md, data-model.md, research.md, contracts/

**Tests**: Test tasks included as they are essential per the TDD constitution principle and testing guidelines.

**Organization**: Tasks are grouped by user story (P1, P2, P3) to enable independent implementation and testing. All user stories are client-side feature enhancements with no backend changes required.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project and utility foundation for overdue feature

- [x] T001 Create utility function file `packages/frontend/src/utils/overdue.js` with `isOverdue()` and `daysOverdue()` functions
- [x] T002 [P] Create test file `packages/frontend/src/utils/__tests__/overdue.test.js` with test structure
- [x] T003 Update `packages/frontend/src/App.js` to ensure TodoList receives full todo list state for aggregate count computation

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core utility functions that ALL user stories depend on

**⚠️ CRITICAL**: No user story work can begin until overdue utility functions are tested and working

- [x] T004 [P] Implement `isOverdue(dueDate, nowDate)` function in `packages/frontend/src/utils/overdue.js` (returns boolean, handles null dueDate, compares YYYY-MM-DD)
- [x] T005 [P] Implement `daysOverdue(dueDate, nowDate)` function in `packages/frontend/src/utils/overdue.js` (returns integer >=1 days difference)
- [x] T006 [P] Implement test cases for `isOverdue()` covering: null dueDate, today's date, past dates, future dates in `packages/frontend/src/utils/__tests__/overdue.test.js`
- [x] T007 [P] Implement test cases for `daysOverdue()` covering: various past dates, off-by-one edge cases in `packages/frontend/src/utils/__tests__/overdue.test.js`
- [x] T008 Run and verify all foundational tests pass: `npm test --workspace=packages/frontend -- overdue.test.js`

**Checkpoint**: Overdue utility functions working and tested - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Quick Visual Identification of Overdue Tasks (Priority: P1) 🎯 MVP

**Goal**: Display a clear, single strong visual indicator (danger color) on incomplete todos whose due date is before today, making overdue tasks immediately visually distinct at a glance.

**Independent Test**: View a todo list containing both on-time and overdue items; verify that overdue items have a distinct visual indicator (danger-colored element, text badge, or styling) and on-time items do not. Can be tested independently without US2 or US3.

### Tests for User Story 1

- [x] T009 [P] [US1] Create component test file `packages/frontend/src/components/__tests__/TodoCard.test.js` for overdue rendering scenarios
- [x] T010 [P] [US1] Add test case: TodoCard with overdue incomplete todo should render danger color styling in `packages/frontend/src/components/__tests__/TodoCard.test.js`
- [x] T011 [P] [US1] Add test case: TodoCard with on-time incomplete todo should NOT render danger color styling in `packages/frontend/src/components/__tests__/TodoCard.test.js`
- [x] T012 [P] [US1] Add test case: TodoCard with completed todo (even if overdue) should display completion indicator without danger color in `packages/frontend/src/components/__tests__/TodoCard.test.js`
- [x] T013 [US1] Run and verify all US1 component tests pass: `npm test --workspace=packages/frontend -- TodoCard.test.js`

### Implementation for User Story 1

- [x] T014 [P] [US1] Update `packages/frontend/src/components/TodoCard.js` to import overdue utilities from `packages/frontend/src/utils/overdue.js`
- [x] T015 [P] [US1] Add `isOverdue` computed property in TodoCard component (call `isOverdue(todo.dueDate, today)` for incomplete todos)
- [x] T016 [US1] Add danger color CSS class to TodoCard when `isOverdue && !todo.completed` in `packages/frontend/src/components/TodoCard.js` (e.g., class `card--overdue` with danger border or background from theme)
- [x] T017 [US1] Verify TodoCard danger styling uses existing design system danger color from `packages/frontend/src/styles/theme.css`
- [x] T018 [US1] Add accessibility text indicator (via `aria-label` or visually hidden text) conveying "Overdue" status when item is overdue in `packages/frontend/src/components/TodoCard.js`

**Checkpoint**: User Story 1 complete - overdue todos now display distinct visual indicator. Can be tested independently.

---

## Phase 4: User Story 2 - Overdue Status Clarity (Priority: P2)

**Goal**: Display the number of days overdue for each overdue todo item to provide context for prioritization (e.g., "5 days overdue" text on card).

**Independent Test**: View overdue items and verify that each displays the number of days it is overdue (e.g., "5 days overdue" or similar text). Verify accuracy for various durations (1 day, 5 days, 30 days). Can be tested independently without US3, and works alongside US1.

### Tests for User Story 2

- [x] T019 [P] [US2] Add test case: TodoCard with 5-days-overdue todo should display "5 days overdue" text in `packages/frontend/src/components/__tests__/TodoCard.test.js`
- [x] T020 [P] [US2] Add test case: TodoCard with 1-day-overdue todo should display "1 day overdue" text (singular) in `packages/frontend/src/components/__tests__/TodoCard.test.js`
- [x] T021 [P] [US2] Add test case: TodoCard with on-time or future todo should NOT display overdue duration text in `packages/frontend/src/components/__tests__/TodoCard.test.js`
- [x] T022 [US2] Run and verify all US2 component tests pass: `npm test --workspace=packages/frontend -- TodoCard.test.js`

### Implementation for User Story 2

- [x] T023 [P] [US2] Add `daysOverdue` computed property in TodoCard component (call `daysOverdue(todo.dueDate, today)` for overdue incomplete todos)
- [x] T024 [P] [US2] Add text display in TodoCard showing "X day(s) overdue" in secondary/caption typography below or near the due date in `packages/frontend/src/components/TodoCard.js` (e.g., in TodoCard subtitle area)
- [x] T025 [US2] Verify days overdue text uses correct singular/plural form ("1 day overdue" vs "2 days overdue") in `packages/frontend/src/components/TodoCard.js`
- [x] T026 [US2] Ensure days overdue text is only shown for incomplete overdue todos; not for completed todos even if they are overdue in `packages/frontend/src/components/TodoCard.js`

**Checkpoint**: User Story 2 complete - overdue todos now display days overdue context. US1 and US2 work together; both independently testable.

---

## Phase 5: User Story 3 - Bulk Awareness of Overdue Workload (Priority: P3)

**Goal**: Display an aggregate count of overdue items inline with the "My Todos" section header (e.g., "My Todos (3 overdue)"), hidden when count is zero, to show users their total overdue workload at a glance.

**Independent Test**: View the todo list and verify the header shows the aggregate overdue count inline (e.g., "My Todos (3 overdue)" when 3 incomplete todos are overdue). Verify count is hidden when zero. Verify count updates when todos change. Can be tested independently after US1 is complete.

### Tests for User Story 3

- [x] T027 [P] [US3] Create test file `packages/frontend/src/components/__tests__/TodoList.test.js` for header overdue count scenarios
- [x] T028 [P] [US3] Add test case: TodoList with 3 overdue items should display "My Todos (3 overdue)" in header in `packages/frontend/src/components/__tests__/TodoList.test.js`
- [x] T029 [P] [US3] Add test case: TodoList with 0 overdue items should display just "My Todos" without count in header in `packages/frontend/src/components/__tests__/TodoList.test.js`
- [x] T030 [P] [US3] Add test case: TodoList with 1 overdue item should display "My Todos (1 overdue)" with singular text in header in `packages/frontend/src/components/__tests__/TodoList.test.js`
- [x] T031 [US3] Run and verify all US3 component tests pass: `npm test --workspace=packages/frontend -- TodoList.test.js`

### Implementation for User Story 3

- [x] T032 [P] [US3] Add `overdueTodosCount` computed property in TodoList component that counts incomplete todos with `isOverdue(todo.dueDate, today) === true` in `packages/frontend/src/components/TodoList.js`
- [x] T033 [P] [US3] Update TodoList header title to conditionally render "My Todos (N overdue)" when overdueTodosCount > 0, or just "My Todos" when count is 0, in `packages/frontend/src/components/TodoList.js`
- [x] T034 [US3] Ensure aggregate count updates reactively when todos are added/removed/completed in `packages/frontend/src/components/TodoList.js`
- [x] T035 [US3] Verify singular/plural form in aggregate count display ("1 overdue" vs "2 overdue") in `packages/frontend/src/components/TodoList.js`

**Checkpoint**: User Story 3 complete - aggregate overdue count displayed in header. All three user stories are now independently testable and working.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Testing, documentation, and quality improvements across all user stories

- [x] T036 [P] Add integration test for complete user flow: create overdue todo, verify it displays with danger indicator and days overdue, verify count updates in `packages/frontend/src/__tests__/App.test.js`
- [x] T037 [P] Verify all existing tests pass: `npm test --workspace=packages/frontend`
- [x] T038 [P] Verify all existing tests pass: `npm test --workspace=packages/backend` (backend unchanged)
- [x] T039 Verify feature meets accessibility guidelines: ensure color contrast meets WCAG AA, ensure aria-labels convey overdue state, ensure text alternatives to color in `packages/frontend/src/components/TodoCard.js` and `packages/frontend/src/components/TodoList.js`
- [ ] T040 Update component documentation/comments in `packages/frontend/src/components/TodoCard.js` and `packages/frontend/src/components/TodoList.js` explaining overdue logic
- [ ] T041 Update `packages/frontend/src/utils/overdue.js` with JSDoc comments for `isOverdue()` and `daysOverdue()` functions
- [ ] T042 Verify no console.log statements in production code
- [ ] T043 Manual testing: Run app with `npm run start`, create todos with past/today/future due dates, verify visual indicators and counts work correctly
- [ ] T044 Run quickstart.md validation: follow steps in `specs/001-overdue-todos/quickstart.md` to verify feature works end-to-end

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - T004-T008 MUST pass before user stories begin
- **User Story 1 (Phase 3/US1)**: Can start after Foundational phase completes - Foundation independent
- **User Story 2 (Phase 4/US2)**: Can start after Foundational phase completes - Can run in parallel with US1
- **User Story 3 (Phase 5/US3)**: Can start after US1 is complete (reads overdue computed state from TodoCard) - Can run in parallel with US2
- **Polish (Phase 6)**: Depends on all desired user stories being complete - Run last

### User Story Dependencies

- **User Story 1 (P1)**: MVP-critical. No dependency on US2/US3.
- **User Story 2 (P2)**: Depends on Foundational (Phase 2). Can run in parallel with US1 after both start on same utility foundation. Enhances US1 but independently testable.
- **User Story 3 (P3)**: Nice-to-have enhancement. Can start after US1 visual indicator is working (reads overdue state from cards). Can run in parallel with US2 if needed.

### Within Each User Story

- Tests MUST be written FIRST (T009-T013 for US1, etc.)
- Tests MUST FAIL before implementation begins
- Implementation follows (T014-T018 for US1, etc.)
- Integration happens after core implementation
- Story complete when all implementation and tests pass

### Parallel Opportunities

**Phase 1 Setup**: All tasks independent
- Can assign T002 to one person while T001/T003 proceed in parallel

**Phase 2 Foundational**: 
- T004-T007 all marked [P] can run in parallel (different files, both utilities)
- All tests (T006-T007) and function implementation (T004-T005) can start simultaneously
- T008 (checkpoint validation) depends on T004-T007

**Phase 3 User Story 1**:
- T009-T012 all marked [P] (test cases) can be written in parallel
- T014-T015 marked [P] (component setup) can happen in parallel
- T016-T018 (danger styling, accessibility) can follow after T014-T015

**Phase 4 User Story 2**:
- Can start IMMEDIATELY after Foundational phase completes (independent from US1)
- T019-T021 marked [P] (test cases) can be written in parallel
- T023-T025 (days display implementation) can follow in parallel

**Phase 5 User Story 3**:
- Can start after US1 is working (needs `isOverdue` from US1 TodoCard)
- T027-T030 marked [P] (test cases) can be written in parallel
- T032-T035 (header count implementation) can follow in parallel

**Phase 6 Polish**:
- T036-T038, T040-T041 marked [P] can run in parallel (independent file updates)
- T039 (accessibility) should follow T016-T018 to verify all components
- T042-T044 (validation) can run last

### Parallel Execution Example: All Three User Stories (Sequential Staff Model)

```
Timeline: One developer works through phases
├─ Phase 1 Setup (2 hours)
│  ├─ T001: Utility file created
│  ├─ T002 [P]: Test file created (parallel with T001)
│  └─ T003: App.js updated
├─ Phase 2 Foundational (3 hours)
│  ├─ T004-T005 [P]: Implement isOverdue() and daysOverdue() (parallel)
│  ├─ T006-T007 [P]: Write test cases for both utilities (parallel)
│  └─ T008: Verify all foundational tests pass
├─ Phase 3 User Story 1 (4 hours) - MVP
│  ├─ T009-T012 [P]: Write TodoCard test cases (parallel)
│  ├─ T013: Run tests (they should fail)
│  ├─ T014-T015 [P]: Add imports and isOverdue logic (parallel)
│  ├─ T016-T018: Add danger styling and accessibility
│  └─ CHECKPOINT: US1 complete and testable
├─ Phase 4 User Story 2 (3 hours) - Can start after Phase 2
│  ├─ T019-T021 [P]: Write TodoCard days-overdue test cases (parallel)
│  ├─ T022: Run tests (they should fail)
│  ├─ T023-T025: Implement days overdue display
│  └─ CHECKPOINT: US1 + US2 complete
├─ Phase 5 User Story 3 (3 hours) - Can start after US1 complete
│  ├─ T027-T030 [P]: Write TodoList header count test cases (parallel)
│  ├─ T031: Run tests (they should fail)
│  ├─ T032-T035: Implement aggregate count in header
│  └─ CHECKPOINT: All user stories complete
└─ Phase 6 Polish (2 hours)
   ├─ T036-T038, T040-T041 [P]: Integration tests and docs (parallel)
   ├─ T039: Accessibility verification
   ├─ T042-T044: Final validation
   └─ COMPLETE: Feature ready for review

Total: ~17 hours sequential (or ~6 hours if all three stories run in parallel after Foundational)
```

### Parallel Execution Example: Multiple Developers (Parallel Staff Model)

```
Timeline: Three developers (one per user story after Foundational phase)

Dev A (Foundational + US1):
├─ Phase 1-2: Setup + Foundational (5 hours) → US1 READY
├─ Phase 3: Implement US1 (4 hours)
└─ Finish with US1 done (9 hours total)

Dev B (User Story 2) [starts after Phase 2]:
├─ Waits for Phase 2 complete (5 hours)
├─ Phase 4: Implement US2 (3 hours)
└─ Finish with US2 done (8 hours total from start)

Dev C (User Story 3) [starts after US1 complete]:
├─ Waits for Phase 2 complete (5 hours)
├─ Waits for US1 complete (~1 hour into US1 after Phase 2)
├─ Phase 5: Implement US3 (3 hours)
└─ Finish with US3 done (~9 hours total from start)

All converge on Polish (Phase 6): 2 hours with all hands (or sequential)

TOTAL TIME (all developers working in parallel): ~11 hours from project start
```

---

## Implementation Strategy: MVP First, Incremental Delivery

### MVP Scope (User Story 1)

**Why US1 is the MVP**: Delivers the core value proposition — users can immediately see which todos are overdue without manual date comparison. This solves the primary problem stated in the spec.

**How to deliver MVP**:
1. Complete all of Phase 1: Setup and Phase 2: Foundational
2. Complete Phase 3: User Story 1 - Visual Identification
3. Deploy and validate with users
4. US1 alone is immediately valuable and independently testable

**MVP Time**: ~10 hours for a single developer (Setup + Foundational + US1)

### Phase 2 Enhancement (User Story 2)

Add days-overdue context to help users prioritize which overdue items are most urgent. This enhances the MVP but is not required for core functionality.

**When to add**: After MVP validates with users (Sprint 2 or next iteration)

### Phase 3 Enhancement (User Story 3)

Add aggregate overdue count to the header for quick awareness of total workload. Nice-to-have feature that improves user experience but doesn't block MVP.

**When to add**: After US1 and US2 are stable (Sprint 3 or final polish)

### Total Implementation Time (All Stories)

- **MVP (US1 only)**: ~10 hours
- **MVP + US2**: ~13 hours
- **Full Feature (US1 + US2 + US3)**: ~17 hours
- **Including Polish**: ~19 hours (single developer, sequential)
- **With parallel developers**: ~11 hours from project start

---

## Checkpoint Summary

| Checkpoint | Trigger | Validation |
|-----------|---------|-----------|
| **Setup Complete** | T003 done | App.js can import from overdue utils |
| **Foundational Ready** | T008 passes | `npm test -- overdue.test.js` all green |
| **US1 MVP Complete** | T018 done + T013 passes | Visual indicator appears on overdue todos, colors applied correctly |
| **US2 Enhancement Complete** | T026 done + T022 passes | Days overdue text displays on cards |
| **US3 Enhancement Complete** | T035 done + T031 passes | Header shows aggregate count, hidden when zero |
| **All Stories Working** | Phase 5 complete | All tests pass, all features working together |
| **Polish Complete** | T044 done | Feature validated end-to-end, ready for production |

---

## File Paths Summary

### New Files

- `packages/frontend/src/utils/overdue.js` — Overdue calculation utilities
- `packages/frontend/src/utils/__tests__/overdue.test.js` — Overdue utility tests
- `packages/frontend/src/components/__tests__/TodoList.test.js` — TodoList header count tests (new file)

### Modified Files

- `packages/frontend/src/components/TodoCard.js` — Add overdue styling and days display
- `packages/frontend/src/components/TodoList.js` — Add aggregate overdue count to header
- `packages/frontend/src/components/__tests__/TodoCard.test.js` — Add overdue test cases (existing file)
- `packages/frontend/src/App.js` — Ensure TodoList receives full todo list (minimal change)
- `packages/frontend/src/styles/theme.css` — Verify danger color tokens exist
- `packages/frontend/src/index.css` — May need card--overdue class (optional)

### Unchanged

- `packages/backend/` — No backend changes required (overdue is client-side derived)
- All existing API contracts remain valid

