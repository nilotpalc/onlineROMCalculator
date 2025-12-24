/**
 * Calculation utility for ROM estimates
 * Applies multipliers based on project characteristics
 */

// Multiplier definitions from appSpecifications.txt
const MULTIPLIERS = {
  scope: {
    Small: 1.0,
    Medium: 1.1,
    Large: 1.25,
  },
  integrations: {
    Few: 1.0,
    Some: 1.1,
    Many: 1.25,
  },
  dataComplexity: {
    Low: 1.0,
    Medium: 1.2,
    High: 1.5,
  },
  security: {
    Basic: 1.0,
    Standard: 1.1,
    Strict: 1.3,
  },
  team: {
    'In-house': 1.0,
    Mixed: 1.1,
    'Partner-led': 1.2,
  },
  model: {
    'API-only': 1.0,
    'Light tuning': 1.15,
    'Fine-tuning': 1.35,
  },
};

/**
 * Calculate ROM estimates based on input parameters
 * @param {Object} inputs - Scenario inputs
 * @returns {Object} - Most-likely, low, and high estimates
 */
export function calculateROM(inputs) {
  const {
    baseCost,
    scope,
    integrations,
    dataComplexity,
    security,
    team,
    model,
  } = inputs;

  // Validate base cost
  if (!baseCost || baseCost <= 0) {
    throw new Error('Base cost must be a positive number');
  }

  // Apply all multipliers
  const scopeMultiplier = MULTIPLIERS.scope[scope] || 1.0;
  const integrationsMultiplier = MULTIPLIERS.integrations[integrations] || 1.0;
  const dataMultiplier = MULTIPLIERS.dataComplexity[dataComplexity] || 1.0;
  const securityMultiplier = MULTIPLIERS.security[security] || 1.0;
  const teamMultiplier = MULTIPLIERS.team[team] || 1.0;
  const modelMultiplier = MULTIPLIERS.model[model] || 1.0;

  // Calculate most-likely estimate
  const mostLikely =
    baseCost *
    scopeMultiplier *
    integrationsMultiplier *
    dataMultiplier *
    securityMultiplier *
    teamMultiplier *
    modelMultiplier;

  // Calculate low and high estimates
  const low = mostLikely * 0.8;
  const high = mostLikely * 1.3;

  return {
    mostLikely: Math.round(mostLikely),
    low: Math.round(low),
    high: Math.round(high),
    multipliers: {
      scope: scopeMultiplier,
      integrations: integrationsMultiplier,
      dataComplexity: dataMultiplier,
      security: securityMultiplier,
      team: teamMultiplier,
      model: modelMultiplier,
    },
  };
}

/**
 * Validate scenario inputs
 * @param {Object} inputs - Scenario inputs
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
export function validateInputs(inputs) {
  const errors = [];

  if (!inputs.scenarioName || inputs.scenarioName.trim() === '') {
    errors.push('Scenario name is required');
  }

  if (!inputs.baseCost || inputs.baseCost <= 0) {
    errors.push('Base cost must be a positive number');
  }

  // Clamp base cost to reasonable range (1-10,000 thousands = $1k - $10M)
  if (inputs.baseCost > 10000) {
    errors.push('Base cost exceeds maximum allowed ($10M)');
  }

  const requiredFields = [
    'scope',
    'integrations',
    'dataComplexity',
    'security',
    'team',
    'model',
  ];

  requiredFields.forEach((field) => {
    if (!inputs[field]) {
      errors.push(`${field} is required`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
  };
}
