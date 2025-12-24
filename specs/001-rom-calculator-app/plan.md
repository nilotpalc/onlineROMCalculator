# Implementation Plan: Online ROM Calculator Web App

**Branch**: `001-rom-calculator-app` | **Date**: 2025-12-24 | **Spec**: [specs/001-rom-calculator-app/spec.md](specs/001-rom-calculator-app/spec.md)
**Input**: Feature specification from `/specs/001-rom-calculator-app/spec.md`

## Summary

A simple, client-side web application for rough order of magnitude (ROM) cost estimation for GenAI projects. The app provides a form for users to enter scenario details, applies multipliers to a base cost, and displays most-likely, low, and high estimates in real time. Users can save, compare, and export scenarios. The stack is minimal: React, React hooks, and a basic styling library (Tailwind CSS or Material-UI). No backend or complex build tools required.

## Technical Context

**Language/Version**: JavaScript (ES2020+) with React 18  
**Primary Dependencies**: React, Tailwind CSS (or Material-UI), FileSaver.js (for export)  
**Storage**: LocalStorage (browser)  
**Testing**: Jest, React Testing Library  
**Target Platform**: Modern browsers (desktop/mobile)  
**Project Type**: Single-page web app  
**Performance Goals**: UI updates within 100ms of input change  
**Constraints**: No new/complex libraries, minimal dependencies, no backend required  
**Scale/Scope**: 1-2 forms, 1-2 list views, <10 screens

## Constitution Check

- Code quality: Linting, code review, and clear structure enforced
- Testing: Automated tests for all logic and UI, 90%+ coverage
- UX: Consistent, accessible, and responsive design
- Performance: UI updates <100ms, lightweight bundle
- No unnecessary dependencies or complex build steps

## Project Structure

### Documentation (this feature)

```
specs/001-rom-calculator-app/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```
src/
  components/
    CalculatorForm.jsx
    ScenarioList.jsx
    ScenarioCompare.jsx
    ExportButton.jsx
    Tooltip.jsx
  utils/
    calculation.js
    storage.js
  App.jsx
  index.jsx
  styles/
    tailwind.css (or mui theme)
```

## Next Steps

- Phase 0: Research minimal React+Tailwind/MUI setup, best practices for local storage, and PDF/CSV export in browser
- Phase 1: Data model, API contracts (if any), and quickstart guide
- Phase 2: Task breakdown and implementation
