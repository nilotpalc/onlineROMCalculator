import React, { useState, useEffect } from 'react';
import { getAllScenarios, deleteScenario } from '../utils/storage';
import { formatCurrency } from '../utils/models';

/**
 * ScenarioList component for viewing and managing saved scenarios
 */
function ScenarioList({ selectedScenarios, onSelectionChange, onLoadScenario }) {
  const [scenarios, setScenarios] = useState([]);
  const [scenariosToDelete, setScenariosToDelete] = useState([]);

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = () => {
    const saved = getAllScenarios();
    setScenarios(saved);
    setScenariosToDelete([]);
  };

  const handleDeleteMultiple = () => {
    if (scenariosToDelete.length === 0) return;
    
    const count = scenariosToDelete.length;
    if (window.confirm(`Delete ${count} selected scenario${count > 1 ? 's' : ''}?`)) {
      scenariosToDelete.forEach((scenarioName) => {
        deleteScenario(scenarioName);
      });
      loadScenarios();
      // Remove deleted scenarios from comparison selection
      onSelectionChange(
        selectedScenarios.filter(
          (s) => !scenariosToDelete.includes(s.scenarioName)
        )
      );
    }
  };

  const handleSelect = (scenario) => {
    const isSelected = selectedScenarios.some(
      (s) => s.scenarioName === scenario.scenarioName
    );

    if (isSelected) {
      onSelectionChange(
        selectedScenarios.filter((s) => s.scenarioName !== scenario.scenarioName)
      );
    } else {
      onSelectionChange([...selectedScenarios, scenario]);
    }
  };

  const handleDeleteCheckbox = (scenarioName) => {
    setScenariosToDelete((prev) =>
      prev.includes(scenarioName)
        ? prev.filter((name) => name !== scenarioName)
        : [...prev, scenarioName]
    );
  };

  const handleSelectAllForDelete = () => {
    if (scenariosToDelete.length === scenarios.length) {
      setScenariosToDelete([]);
    } else {
      setScenariosToDelete(scenarios.map((s) => s.scenarioName));
    }
  };

  const isAllSelectedForDelete = scenarios.length > 0 && scenariosToDelete.length === scenarios.length;

  if (scenarios.length === 0) {
    return (
      <div className="card">
        <h2>Saved Scenarios</h2>
        <p>No saved scenarios yet. Create a new estimate to get started.</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Saved Scenarios</h2>
      <p style={{ marginBottom: '10px' }}>
        Select two or more scenarios to compare
      </p>
      
      {scenariosToDelete.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <button
            onClick={handleDeleteMultiple}
            style={{
              backgroundColor: '#f44336',
              padding: '8px 15px',
              fontSize: '14px',
              fontWeight: 'bold',
            }}
          >
            Delete Selected ({scenariosToDelete.length})
          </button>
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ textAlign: 'center', padding: '10px', verticalAlign: 'middle' }}>
              <input
                type="checkbox"
                checked={isAllSelectedForDelete}
                onChange={handleSelectAllForDelete}
                title="Select all for deletion"
                style={{ cursor: 'pointer', display: 'block', margin: '0 auto' }}
              />
            </th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Compare</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Most Likely</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>Date Saved</th>
            <th style={{ textAlign: 'left', padding: '10px' }}>View</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((scenario) => (
            <tr
              key={scenario.scenarioName}
              style={{ borderBottom: '1px solid #eee' }}
            >
              <td style={{ padding: '10px', textAlign: 'center', verticalAlign: 'middle' }}>
                <input
                  type="checkbox"
                  checked={scenariosToDelete.includes(scenario.scenarioName)}
                  onChange={() => handleDeleteCheckbox(scenario.scenarioName)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
              <td style={{ padding: '10px', verticalAlign: 'middle' }}>
                <input
                  type="checkbox"
                  checked={selectedScenarios.some(
                    (s) => s.scenarioName === scenario.scenarioName
                  )}
                  onChange={() => handleSelect(scenario)}
                  style={{ cursor: 'pointer' }}
                />
              </td>
              <td style={{ padding: '10px' }}>{scenario.scenarioName}</td>
              <td style={{ padding: '10px' }}>
                {scenario.estimates
                  ? formatCurrency(scenario.estimates.mostLikely)
                  : 'N/A'}
              </td>
              <td style={{ padding: '10px' }}>
                {new Date(scenario.dateSaved).toLocaleDateString()}
              </td>
              <td style={{ padding: '10px' }}>
                <button
                  onClick={() => onLoadScenario(scenario)}
                  style={{
                    backgroundColor: '#4CAF50',
                    padding: '5px 10px',
                    fontSize: '12px',
                  }}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScenarioList;
