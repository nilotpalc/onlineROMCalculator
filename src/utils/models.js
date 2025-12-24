/**
 * Data model definitions for Scenario and Estimate
 */

/**
 * Create a new Scenario object
 * @param {Object} params - Scenario parameters
 * @returns {Object} - Scenario object
 */
export function createScenario({
  scenarioName,
  scope,
  integrations,
  dataComplexity,
  security,
  team,
  model,
  baseCost,
  estimates = null,
  dateSaved = null,
}) {
  return {
    scenarioName,
    scope,
    integrations,
    dataComplexity,
    security,
    team,
    model,
    baseCost,
    estimates,
    dateSaved: dateSaved || new Date().toISOString(),
  };
}

/**
 * Create an Estimate object
 * @param {Object} params - Estimate parameters
 * @returns {Object} - Estimate object
 */
export function createEstimate({ mostLikely, low, high, multipliers }) {
  return {
    mostLikely,
    low,
    high,
    multipliers,
  };
}

/**
 * Format currency value
 * @param {number} value - Value in thousands
 * @returns {string} - Formatted currency string
 */
export function formatCurrency(value) {
  return `$${value.toLocaleString()}k`;
}
