import React from 'react';
import { formatCurrency } from '../utils/models';

/**
 * ScenarioCompare component for side-by-side comparison
 */
function ScenarioCompare({ scenarios }) {
  if (scenarios.length < 2) {
    return (
      <div className="card">
        <h2>Compare Scenarios</h2>
        <p>Please select at least 2 scenarios to compare.</p>
      </div>
    );
  }

  const fields = [
    { key: 'scenarioName', label: 'Scenario Name' },
    { key: 'scope', label: 'Scope' },
    { key: 'integrations', label: 'Integrations' },
    { key: 'dataComplexity', label: 'Data Complexity' },
    { key: 'security', label: 'Security' },
    { key: 'team', label: 'Team' },
    { key: 'model', label: 'Model' },
    { key: 'baseCost', label: 'Base Cost', format: (v) => `$${v}k` },
  ];

  const estimateFields = [
    { key: 'mostLikely', label: 'Most Likely' },
    { key: 'low', label: 'Low Estimate' },
    { key: 'high', label: 'High Estimate' },
  ];

  return (
    <div className="card">
      <h2>Compare Scenarios</h2>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ textAlign: 'left', padding: '10px' }}>Field</th>
            {scenarios.map((scenario) => (
              <th
                key={scenario.scenarioName}
                style={{ textAlign: 'left', padding: '10px' }}
              >
                {scenario.scenarioName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fields.map((field) => (
            <tr key={field.key} style={{ borderBottom: '1px solid #eee' }}>
              <td
                style={{
                  padding: '10px',
                  fontWeight: 'bold',
                  backgroundColor: '#f5f5f5',
                }}
              >
                {field.label}
              </td>
              {scenarios.map((scenario) => (
                <td key={scenario.scenarioName} style={{ padding: '10px' }}>
                  {field.format
                    ? field.format(scenario[field.key])
                    : scenario[field.key]}
                </td>
              ))}
            </tr>
          ))}

          <tr style={{ borderTop: '2px solid #ddd' }}>
            <td
              colSpan={scenarios.length + 1}
              style={{
                padding: '10px',
                fontWeight: 'bold',
                backgroundColor: '#e8f5e9',
              }}
            >
              Estimates
            </td>
          </tr>

          {estimateFields.map((field) => (
            <tr key={field.key} style={{ borderBottom: '1px solid #eee' }}>
              <td
                style={{
                  padding: '10px',
                  fontWeight: 'bold',
                  backgroundColor: '#f5f5f5',
                }}
              >
                {field.label}
              </td>
              {scenarios.map((scenario) => (
                <td key={scenario.scenarioName} style={{ padding: '10px' }}>
                  {scenario.estimates
                    ? formatCurrency(scenario.estimates[field.key])
                    : 'N/A'}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScenarioCompare;
