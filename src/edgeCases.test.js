import { validateInputs } from './utils/calculation';

describe('Edge case tests', () => {
  test('handles blank required fields', () => {
    const inputs = {
      scenarioName: '',
      baseCost: null,
      scope: '',
      integrations: '',
      dataComplexity: '',
      security: '',
      team: '',
      model: '',
    };

    const result = validateInputs(inputs);

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  test('handles extremely large base cost', () => {
    const inputs = {
      scenarioName: 'Test',
      baseCost: 99999,
      scope: 'Small',
      integrations: 'Few',
      dataComplexity: 'Low',
      security: 'Basic',
      team: 'In-house',
      model: 'API-only',
    };

    const result = validateInputs(inputs);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Base cost exceeds maximum allowed ($10M)');
  });

  test('handles extremely small base cost', () => {
    const inputs = {
      scenarioName: 'Test',
      baseCost: 0.01,
      scope: 'Small',
      integrations: 'Few',
      dataComplexity: 'Low',
      security: 'Basic',
      team: 'In-house',
      model: 'API-only',
    };

    const result = validateInputs(inputs);

    expect(result.valid).toBe(true);
  });

  test('handles negative base cost', () => {
    const inputs = {
      scenarioName: 'Test',
      baseCost: -100,
      scope: 'Small',
      integrations: 'Few',
      dataComplexity: 'Low',
      security: 'Basic',
      team: 'In-house',
      model: 'API-only',
    };

    const result = validateInputs(inputs);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Base cost must be a positive number');
  });
});
