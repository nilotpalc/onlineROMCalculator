# Online ROM Calculator

A rough order of magnitude (ROM) cost estimator for GenAI project setup and implementation expenses.

## Features

- **Real-time Calculation**: Instantly see cost estimates as you adjust project parameters
- **Save & Compare**: Save multiple scenarios and compare them side-by-side
- **View Saved Scenarios**: Load any saved scenario back into the calculator to review details or make modifications
- **Bulk Delete**: Select multiple scenarios at once using checkboxes and delete them in bulk with a single action
- **Export**: Download estimates as CSV or text files for sharing
- **Tooltips**: Helpful explanations for every input field
- **Responsive Design**: Works on desktop and mobile devices
- **Accessibility**: WCAG 2.1 AA compliant

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
```

Opens the app at http://localhost:3000

### Running Tests

```bash
npm test
```

### Building for Production

```bash
npm build
```

## Usage

1. **Create an Estimate**: Enter your project details including scope, integrations, data complexity, security requirements, team approach, and model approach
2. **View Results**: See most-likely, low, and high ROM estimates calculated in real-time
3. **Save Scenarios**: Save your estimate for future reference
4. **View Saved Scenarios**: Click the "View" button on any saved scenario to load all its details back into the calculator for review or modification
5. **Bulk Delete**: Select multiple scenarios using checkboxes and click "Delete Selected" to remove them all at once
6. **Compare**: Select multiple saved scenarios to compare them side-by-side
7. **Export**: Download results as CSV or text files

## Input Parameters

- **Scope**: Project size (Small: 1-2 workflows, Medium: 3-4, Large: 5+)
- **Integrations**: Number of system integrations (Few: 0-1, Some: 2-3, Many: 4+)
- **Data Complexity**: Data handling requirements (Low, Medium, High)
- **Security & Compliance**: Security requirements (Basic, Standard, Strict)
- **Team Approach**: Development team structure (In-house, Mixed, Partner-led)
- **Model Approach**: AI model strategy (API-only, Light tuning, Fine-tuning)
- **Base Cost**: Starting cost estimate in thousands of USD

## Calculation Logic

The calculator applies multipliers based on your selections:

- Scope: 1.0 (Small), 1.1 (Medium), 1.25 (Large)
- Integrations: 1.0 (Few), 1.1 (Some), 1.25 (Many)
- Data Complexity: 1.0 (Low), 1.2 (Medium), 1.5 (High)
- Security: 1.0 (Basic), 1.1 (Standard), 1.3 (Strict)
- Team: 1.0 (In-house), 1.1 (Mixed), 1.2 (Partner-led)
- Model: 1.0 (API-only), 1.15 (Light tuning), 1.35 (Fine-tuning)

**Most-likely estimate** = Base Cost × all multipliers  
**Low estimate** = Most-likely × 0.8  
**High estimate** = Most-likely × 1.3

## Tech Stack

- React 18
- JavaScript (ES2020+)
- CSS (responsive, mobile-first)
- LocalStorage for data persistence
- FileSaver.js for exports
- Jest + React Testing Library for testing

## Project Structure

```
src/
  components/
    CalculatorForm.jsx    # Main input form and calculation display
    ScenarioList.jsx      # List of saved scenarios
    ScenarioCompare.jsx   # Side-by-side comparison view
    ExportButton.jsx      # CSV/text export functionality
    Tooltip.jsx           # Help tooltips for inputs
  utils/
    calculation.js        # ROM calculation and validation logic
    storage.js            # LocalStorage persistence utilities
    models.js             # Data model definitions
  styles/
    index.css             # Global styles
  App.jsx                 # Main app component
  index.jsx               # React entry point
tests/                    # Unit and integration tests
```

## Contributing

1. Follow the code style (ESLint + Prettier configured)
2. Write tests for new features
3. Ensure 90%+ test coverage
4. Follow accessibility guidelines (WCAG 2.1 AA)

## License

MIT
