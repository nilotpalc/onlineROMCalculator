---
description: "Task list for Online ROM Calculator Web App"
---

# Tasks: Online ROM Calculator Web App

**Input**: Design documents from `/specs/001-rom-calculator-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories)

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [X] T001 Create project structure per implementation plan (src/, components/, utils/, styles/)
- [X] T002 Initialize React project with minimal dependencies (React, Tailwind CSS or Material-UI, FileSaver.js)
- [X] T003 [P] Configure linting and formatting tools (ESLint, Prettier)
- [X] T004 [P] Add Jest and React Testing Library for unit tests

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

- [X] T005 Create calculation utility in src/utils/calculation.js
- [X] T006 Create local storage utility in src/utils/storage.js
- [X] T007 [P] Create base Scenario and Estimate data models in src/utils/
- [X] T008 [P] Set up global styles (tailwind.css or mui theme) in src/styles/
- [X] T009 Configure App.jsx and index.jsx entry points

---

## Phase 3: User Story 1 - Create and View ROM Estimate (Priority: P1) 🎯 MVP

**Goal**: User can enter scenario details and see real-time ROM estimates
**Independent Test**: Entering valid inputs updates estimates instantly

- [X] T010 [P] [US1] Create CalculatorForm component in src/components/CalculatorForm.jsx
- [X] T011 [P] [US1] Implement real-time calculation logic in CalculatorForm.jsx
- [X] T012 [P] [US1] Add input validation and error handling in CalculatorForm.jsx
- [X] T013 [US1] Display most-likely, low, and high estimates in CalculatorForm.jsx
- [X] T014 [US1] Add unit tests for calculation and validation logic in tests/

---

## Phase 4: User Story 2 - Save and Compare Scenarios (Priority: P2)

**Goal**: User can save, view, and compare multiple scenarios
**Independent Test**: Saved scenarios persist and can be compared

- [X] T015 [P] [US2] Create ScenarioList component in src/components/ScenarioList.jsx
- [X] T016 [P] [US2] Implement save, load, and delete logic in storage.js and ScenarioList.jsx
- [X] T017 [US2] Add compare feature in ScenarioCompare.jsx
- [X] T018 [US2] Add integration tests for scenario save/compare in tests/

---

## Phase 5: User Story 3 - Export Results (Priority: P3)

**Goal**: User can export scenario results as PDF or CSV
**Independent Test**: Exported files match displayed data

- [X] T019 [P] [US3] Create ExportButton component in src/components/ExportButton.jsx
- [X] T020 [US3] Implement PDF/CSV export logic using FileSaver.js in ExportButton.jsx
- [X] T021 [US3] Add tests for export functionality in tests/

---

## Phase 6: User Story 4 - Tooltips for Inputs (Priority: P4)

**Goal**: User can view tooltips for all input fields
**Independent Test**: All tooltips are present and accurate

- [X] T022 [P] [US4] Create Tooltip component in src/components/Tooltip.jsx
- [X] T023 [US4] Integrate Tooltip with CalculatorForm.jsx inputs
- [X] T024 [US4] Add tests for tooltip display and content in tests/

---

## Final Phase: Polish & Cross-Cutting Concerns

- [X] T025 [P] Add accessibility checks and responsive design improvements
- [X] T026 [P] Add README and usage documentation
- [X] T027 [P] Final code review and refactor for code quality
- [X] T028 [P] Manual QA: Validate all user stories independently

---

## Additional Constitution & Test Coverage Tasks

- [X] T029 [P] Add accessibility checks and ensure all UI meets WCAG 2.1 AA (src/components/, manual QA)
- [X] T030 [P] Add integration and unit tests for all tooltips (src/components/Tooltip.jsx, tests/)
- [X] T031 [P] Add tests for edge/error cases: blank required fields, large/small base cost, duplicate scenario names, localStorage errors (tests/)
- [X] T032 [P] Review terminology in code/docs to ensure consistent use of "Scenario" and "Estimate"
- [X] T033 [Enhancement] Add "View" button functionality to load saved scenarios back into calculator form for review/modification (src/components/ScenarioList.jsx, src/components/CalculatorForm.jsx, src/App.jsx)
- [X] T034 [Enhancement] Add bulk delete functionality with "Select All" checkbox to delete multiple scenarios at once (src/components/ScenarioList.jsx)

## Dependencies

- User Story 1 (P1) must be completed before User Story 2 (P2), User Story 3 (P3), and User Story 4 (P4)
- User Story 2, 3, and 4 can be developed in parallel after P1

## Parallel Execution Examples

- T003, T004, T007, T008 can be done in parallel after project init
- T010, T011, T012 can be done in parallel for US1
- T015, T016, T017 for US2 can be done in parallel
- T019, T020 for US3 can be done in parallel
- T022, T023 for US4 can be done in parallel
- T029, T030, T031, T032 can be done in parallel after main features

## Implementation Strategy

- MVP: Complete all tasks for User Story 1 (P1)
- Incremental delivery: Each user story is independently testable and can be released as a separate increment
