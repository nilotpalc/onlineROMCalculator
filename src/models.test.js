import { createScenario, createEstimate, formatCurrency } from './utils/models';

describe('models utility functions', () => {
  describe('createScenario', () => {
    test('creates a scenario with all required fields', () => {
      const input = {
        scenarioName: 'Test Scenario',
        baseCost: 150,
        scope: 'Small',
        integrations: 'Few',
        dataComplexity: 'Low',
        security: 'Basic',
        team: 'In-house',
        model: 'API-only',
        estimates: { mostLikely: 180, low: 150, high: 220 },
      };

      const scenario = createScenario(input);

      expect(scenario.scenarioName).toBe('Test Scenario');
      expect(scenario.baseCost).toBe(150);
      expect(scenario.estimates).toEqual({ mostLikely: 180, low: 150, high: 220 });
      expect(scenario.dateSaved).toBeDefined();
    });

    test('generates timestamps for different scenarios', () => {
      const input = {
        scenarioName: 'Test',
        baseCost: 100,
        scope: 'Small',
        integrations: 'Few',
        dataComplexity: 'Low',
        security: 'Basic',
        team: 'In-house',
        model: 'API-only',
        estimates: { mostLikely: 120, low: 100, high: 150 },
      };

      const scenario1 = createScenario(input);
      // Wait a moment
      const scenario2 = createScenario(input);

      expect(scenario1.dateSaved).toBeDefined();
      expect(scenario2.dateSaved).toBeDefined();
    });
  });

  describe('createEstimate', () => {
    test('creates estimate object with low, most likely, and high values', () => {
      const estimate = createEstimate({
        low: 100,
        mostLikely: 120,
        high: 150,
        multipliers: {},
      });

      expect(estimate.low).toBe(100);
      expect(estimate.mostLikely).toBe(120);
      expect(estimate.high).toBe(150);
    });
  });

  describe('formatCurrency', () => {
    test('formats number as currency with k suffix', () => {
      expect(formatCurrency(150000)).toBe('$150,000k');
    });

    test('formats large numbers correctly', () => {
      expect(formatCurrency(1500000)).toBe('$1,500,000k');
    });

    test('handles zero', () => {
      expect(formatCurrency(0)).toBe('$0k');
    });

    test('formats decimals', () => {
      expect(formatCurrency(150000.75)).toContain('$150');
    });
  });
});
