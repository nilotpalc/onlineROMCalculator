import { calculateROM, validateInputs } from './utils/calculation';

describe('calculateROM', () => {
  test('calculates ROM estimates correctly', () => {
    const inputs = {
      baseCost: 150,
      scope: 'Small',
      integrations: 'Few',
      dataComplexity: 'Low',
      security: 'Basic',
      team: 'In-house',
      model: 'API-only',
    };

    const result = calculateROM(inputs);

    expect(result.mostLikely).toBe(150); // 150 * 1.0 * 1.0 * 1.0 * 1.0 * 1.0 * 1.0
    expect(result.low).toBe(120); // 150 * 0.8
    expect(result.high).toBe(195); // 150 * 1.3
  });

  test('applies all multipliers correctly', () => {
    const inputs = {
      baseCost: 100,
      scope: 'Large',
      integrations: 'Many',
      dataComplexity: 'High',
      security: 'Strict',
      team: 'Partner-led',
      model: 'Fine-tuning',
    };

    const result = calculateROM(inputs);

    // 100 * 1.25 * 1.25 * 1.5 * 1.3 * 1.2 * 1.35 ≈ 517
    expect(result.mostLikely).toBeGreaterThan(480);
    expect(result.mostLikely).toBeLessThan(560);
  });

  test('throws error for invalid base cost', () => {
    const inputs = {
      baseCost: 0,
      scope: 'Small',
      integrations: 'Few',
      dataComplexity: 'Low',
      security: 'Basic',
      team: 'In-house',
      model: 'API-only',
    };

    expect(() => calculateROM(inputs)).toThrow('Base cost must be a positive number');
  });
});

describe('validateInputs', () => {
  test('validates all required fields', () => {
    const inputs = {
      scenarioName: 'Test',
      baseCost: 150,
      scope: 'Small',
      integrations: 'Few',
      dataComplexity: 'Low',
      security: 'Basic',
      team: 'In-house',
      model: 'API-only',
    };

    const result = validateInputs(inputs);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  test('detects missing scenario name', () => {
    const inputs = {
      scenarioName: '',
      baseCost: 150,
      scope: 'Small',
      integrations: 'Few',
      dataComplexity: 'Low',
      security: 'Basic',
      team: 'In-house',
      model: 'API-only',
    };

    const result = validateInputs(inputs);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Scenario name is required');
  });

  test('detects invalid base cost', () => {
    const inputs = {
      scenarioName: 'Test',
      baseCost: -10,
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

  test('detects base cost exceeding maximum', () => {
    const inputs = {
      scenarioName: 'Test',
      baseCost: 15000,
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
});
