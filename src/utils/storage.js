/**
 * Local storage utility for persisting scenarios
 */

const STORAGE_KEY = 'rom_calculator_scenarios';

/**
 * Save a scenario to local storage
 * @param {Object} scenario - Scenario object
 * @returns {boolean} - Success status
 */
export function saveScenario(scenario) {
  try {
    const scenarios = getAllScenarios();

    // Check for duplicate names
    const existingIndex = scenarios.findIndex(
      (s) => s.scenarioName === scenario.scenarioName
    );

    if (existingIndex !== -1) {
      // Update existing scenario
      scenarios[existingIndex] = {
        ...scenario,
        dateSaved: new Date().toISOString(),
      };
    } else {
      // Add new scenario
      scenarios.push({
        ...scenario,
        dateSaved: new Date().toISOString(),
      });
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(scenarios));
    return true;
  } catch (error) {
    console.error('Failed to save scenario:', error);
    if (error.name === 'QuotaExceededError') {
      throw new Error('Storage quota exceeded. Please delete old scenarios.');
    }
    throw new Error('Failed to save scenario. Local storage may be unavailable.');
  }
}

/**
 * Get all saved scenarios from local storage
 * @returns {Array} - Array of scenario objects
 */
export function getAllScenarios() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load scenarios:', error);
    return [];
  }
}

/**
 * Get a single scenario by name
 * @param {string} scenarioName - Name of the scenario
 * @returns {Object|null} - Scenario object or null
 */
export function getScenario(scenarioName) {
  const scenarios = getAllScenarios();
  return scenarios.find((s) => s.scenarioName === scenarioName) || null;
}

/**
 * Delete a scenario by name
 * @param {string} scenarioName - Name of the scenario to delete
 * @returns {boolean} - Success status
 */
export function deleteScenario(scenarioName) {
  try {
    const scenarios = getAllScenarios();
    const filtered = scenarios.filter((s) => s.scenarioName !== scenarioName);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Failed to delete scenario:', error);
    return false;
  }
}

/**
 * Check if local storage is available
 * @returns {boolean} - Availability status
 */
export function isStorageAvailable() {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
}
