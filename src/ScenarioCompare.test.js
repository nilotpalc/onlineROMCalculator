import React from 'react';
import { render, screen } from '@testing-library/react';
import ScenarioCompare from './components/ScenarioCompare';

describe('ScenarioCompare component', () => {
  test('renders empty state when no scenarios selected', () => {
    render(<ScenarioCompare scenarios={[]} />);
    expect(screen.getByText(/select at least 2/i)).toBeInTheDocument();
  });

  test('renders single scenario message', () => {
    const scenarios = [
      {
        id: '1',
        scenarioName: 'Test Scenario',
        baseCost: 150,
        scope: 'Small',
        integrations: 'Few',
        dataComplexity: 'Low',
        security: 'Basic',
        team: 'In-house',
        model: 'API-only',
        estimates: { mostLikely: 180000, low: 150000, high: 220000 },
      },
    ];
    
    render(<ScenarioCompare scenarios={scenarios} />);
    expect(screen.getByText(/select at least 2/i)).toBeInTheDocument();
  });

  test('renders comparison table for multiple scenarios', () => {
    const scenarios = [
      {
        id: '1',
        scenarioName: 'Test Scenario 1',
        baseCost: 150,
        scope: 'Small',
        integrations: 'Few',
        dataComplexity: 'Low',
        security: 'Basic',
        team: 'In-house',
        model: 'API-only',
        estimates: { mostLikely: 180000, low: 150000, high: 220000 },
      },
      {
        id: '2',
        scenarioName: 'Test Scenario 2',
        baseCost: 200,
        scope: 'Medium',
        integrations: 'Some',
        dataComplexity: 'Medium',
        security: 'Standard',
        team: 'Mixed',
        model: 'Light tuning',
        estimates: { mostLikely: 260000, low: 200000, high: 320000 },
      },
    ];
    
    render(<ScenarioCompare scenarios={scenarios} />);
    
    // Check for unique field labels instead
    expect(screen.getByText(/Compare Scenarios/i)).toBeInTheDocument();
    expect(screen.getByText(/Base Cost/i)).toBeInTheDocument();
    expect(screen.getByText(/Scope/i)).toBeInTheDocument();
  });

  test('displays all comparison fields', () => {
    const scenarios = [
      {
        id: '1',
        scenarioName: 'Test 1',
        baseCost: 150,
        scope: 'Small',
        integrations: 'Few',
        dataComplexity: 'Low',
        security: 'Basic',
        team: 'In-house',
        model: 'API-only',
        estimates: { mostLikely: 180000, low: 150000, high: 220000 },
      },
      {
        id: '2',
        scenarioName: 'Test 2',
        baseCost: 200,
        scope: 'Large',
        integrations: 'Many',
        dataComplexity: 'High',
        security: 'Strict',
        team: 'Partner-led',
        model: 'Fine-tuning',
        estimates: { mostLikely: 400000, low: 300000, high: 500000 },
      },
    ];
    
    render(<ScenarioCompare scenarios={scenarios} />);
    
    expect(screen.getByText(/Integrations/i)).toBeInTheDocument();
    expect(screen.getByText(/Data Complexity/i)).toBeInTheDocument();
    expect(screen.getByText(/Security/i)).toBeInTheDocument();
    expect(screen.getByText(/Team/i)).toBeInTheDocument();
    expect(screen.getByText(/Model/i)).toBeInTheDocument();
    expect(screen.getByText(/Most Likely/i)).toBeInTheDocument();
  });
});
