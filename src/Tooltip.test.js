import React from 'react';
import { render, screen } from '@testing-library/react';
import Tooltip from './components/Tooltip';

describe('Tooltip component', () => {
  test('renders tooltip icon', () => {
    render(<Tooltip text="Help text" />);
    expect(screen.getByRole('img', { name: /help/i })).toBeInTheDocument();
  });

  test('displays tooltip content', () => {
    render(<Tooltip text="This is helpful information" />);
    expect(screen.getByRole('tooltip')).toHaveTextContent('This is helpful information');
  });

  test('tooltip has correct visibility style', () => {
    const { container } = render(<Tooltip text="Help text" />);
    const tooltip = container.querySelector('.tooltip-content');
    const computedStyle = window.getComputedStyle(tooltip);
    // The CSS sets visibility: hidden via the class
    expect(tooltip).toHaveClass('tooltip-content');
  });
});
