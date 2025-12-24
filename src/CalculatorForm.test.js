import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CalculatorForm from './components/CalculatorForm';

describe('CalculatorForm', () => {
  test('renders all input fields', () => {
    render(<CalculatorForm />);

    expect(screen.getByLabelText(/Scenario Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Scope/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Integrations/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Data Complexity/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Security & Compliance/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Team Approach/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Model Approach/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Base Cost/i)).toBeInTheDocument();
  });

  test('calculates estimates in real-time', async () => {
    render(<CalculatorForm />);

    const baseCostInput = screen.getByLabelText(/Base Cost/i);
    fireEvent.change(baseCostInput, { target: { value: '150' } });

    // Wait for calculation
    await screen.findByText(/Most Likely:/i);

    expect(screen.getByText(/Most Likely:/i)).toBeInTheDocument();
  });

  test('displays validation errors for missing fields', () => {
    render(<CalculatorForm />);

    // Fill in base cost to enable the save button
    const baseCostInput = screen.getByLabelText(/Base Cost/i);
    fireEvent.change(baseCostInput, { target: { value: '150' } });

    // Wait a moment for state update, then click save
    const saveButton = screen.getByText(/Save Scenario/i);
    fireEvent.click(saveButton);

    expect(screen.getByText(/Scenario name is required/i)).toBeInTheDocument();
  });
});
