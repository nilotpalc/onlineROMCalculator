import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders calculator view by default', () => {
    render(<App />);
    expect(screen.getByText(/New ROM Estimate/i)).toBeInTheDocument();
  });

  test('navigation to scenario list works', () => {
    render(<App />);
    const listButton = screen.getAllByText(/Saved Scenarios/i)[0]; // Button, not header
    fireEvent.click(listButton);
    expect(screen.getByText(/No saved scenarios yet/i)).toBeInTheDocument();
  });

  test('navigation back to calculator works', () => {
    render(<App />);
    const listButton = screen.getAllByText(/Saved Scenarios/i)[0];
    fireEvent.click(listButton);
    
    const calculatorButton = screen.getAllByText(/New Estimate/i)[0]; // Button only
    fireEvent.click(calculatorButton);
    
    expect(screen.getByText(/New ROM Estimate/i)).toBeInTheDocument();
  });
});
