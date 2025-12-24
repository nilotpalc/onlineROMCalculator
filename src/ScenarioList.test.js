import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ScenarioList from './components/ScenarioList';
import * as storage from './utils/storage';

// Mock storage module
jest.mock('./utils/storage');

// Mock window.confirm
global.confirm = jest.fn(() => true);

describe('ScenarioList component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty state when no scenarios exist', () => {
    storage.getAllScenarios.mockReturnValue([]);
    render(<ScenarioList selectedScenarios={[]} onSelectionChange={() => {}} />);
    
    expect(screen.getByText(/No saved scenarios yet/i)).toBeInTheDocument();
  });

  test('renders list of scenarios', () => {
    const mockScenarios = [
      {
        id: '1',
        scenarioName: 'Test Scenario 1',
        baseCost: 150,
        scope: 'Small',
        estimates: { mostLikely: 180000, low: 150000, high: 220000 },
        createdAt: new Date('2024-01-15').toISOString(),
      },
      {
        id: '2',
        scenarioName: 'Test Scenario 2',
        baseCost: 200,
        scope: 'Medium',
        estimates: { mostLikely: 260000, low: 200000, high: 320000 },
        createdAt: new Date('2024-01-16').toISOString(),
      },
    ];
    
    storage.getAllScenarios.mockReturnValue(mockScenarios);
    render(<ScenarioList selectedScenarios={[]} onSelectionChange={() => {}} />);
    
    expect(screen.getByText('Test Scenario 1')).toBeInTheDocument();
    expect(screen.getByText('Test Scenario 2')).toBeInTheDocument();
  });

  test('handles scenario selection', () => {
    const mockScenario = {
      id: '1',
      scenarioName: 'Test Scenario',
      baseCost: 150,
      scope: 'Small',
      estimates: { mostLikely: 180000, low: 150000, high: 220000 },
      createdAt: new Date().toISOString(),
    };
    
    storage.getAllScenarios.mockReturnValue([mockScenario]);
    const onSelectionChange = jest.fn();
    render(<ScenarioList selectedScenarios={[]} onSelectionChange={onSelectionChange} />);
    
    const checkbox = screen.getAllByRole('checkbox')[0];
    fireEvent.click(checkbox);
    
    expect(onSelectionChange).toHaveBeenCalledWith([mockScenario]);
  });

  test('renders delete button for scenarios', () => {
    const mockScenario = {
      id: '1',
      scenarioName: 'Test Scenario',
      baseCost: 150,
      scope: 'Small',
      estimates: { mostLikely: 180000, low: 150000, high: 220000 },
      createdAt: new Date().toISOString(),
    };
    
    storage.getAllScenarios.mockReturnValue([mockScenario]);
    
    render(<ScenarioList selectedScenarios={[]} onSelectionChange={() => {}} />);
    
    const deleteButton = screen.getByText(/Delete/i);
    expect(deleteButton).toBeInTheDocument();
  });
});
