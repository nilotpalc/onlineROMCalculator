import {
  saveScenario,
  getAllScenarios,
  getScenario,
  deleteScenario,
  isStorageAvailable,
} from './utils/storage';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

global.localStorage = localStorageMock;

describe('storage utility', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saves scenario to localStorage', () => {
    const scenario = {
      scenarioName: 'Test Scenario',
      baseCost: 150,
      scope: 'Small',
    };

    const result = saveScenario(scenario);

    expect(result).toBe(true);
    const saved = getAllScenarios();
    expect(saved).toHaveLength(1);
    expect(saved[0].scenarioName).toBe('Test Scenario');
  });

  test('updates existing scenario with same name', () => {
    const scenario1 = {
      scenarioName: 'Test',
      baseCost: 150,
    };

    const scenario2 = {
      scenarioName: 'Test',
      baseCost: 200,
    };

    saveScenario(scenario1);
    saveScenario(scenario2);

    const saved = getAllScenarios();
    expect(saved).toHaveLength(1);
    expect(saved[0].baseCost).toBe(200);
  });

  test('retrieves scenario by name', () => {
    const scenario = {
      scenarioName: 'Find Me',
      baseCost: 150,
    };

    saveScenario(scenario);
    const found = getScenario('Find Me');

    expect(found).not.toBeNull();
    expect(found.scenarioName).toBe('Find Me');
  });

  test('deletes scenario by name', () => {
    const scenario = {
      scenarioName: 'Delete Me',
      baseCost: 150,
    };

    saveScenario(scenario);
    const result = deleteScenario('Delete Me');

    expect(result).toBe(true);
    expect(getAllScenarios()).toHaveLength(0);
  });

  test('checks storage availability', () => {
    const available = isStorageAvailable();
    expect(available).toBe(true);
  });
});
