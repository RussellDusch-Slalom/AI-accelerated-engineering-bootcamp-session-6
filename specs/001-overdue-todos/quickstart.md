```markdown
# Quickstart: Running and Testing the Overdue Todos Feature

Prereqs: Node.js 16+, npm

From the repository root:

1. Install dependencies

```bash
npm install
```

2. Start backend (in one terminal)

```bash
# from repo root
npm --workspace=packages/backend run start
```

3. Start frontend (in another terminal)

```bash
npm --workspace=packages/frontend run start
```

4. Run tests

```bash
# run all tests
npm test

# run frontend tests only
npm test --workspace=packages/frontend

# run backend tests only
npm test --workspace=packages/backend
```

Notes:
- The overdue logic is client-side. To manually test, create todos with past `dueDate` values and verify visual indicators.
- Unit tests for `packages/frontend/src/utils/overdue.js` and component tests for `TodoCard`/`TodoList` are included in the plan and should be run with `npm test`.

```
