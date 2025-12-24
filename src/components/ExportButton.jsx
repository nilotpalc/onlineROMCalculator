import React from 'react';
import { saveAs } from 'file-saver';
import { formatCurrency } from '../utils/models';

/**
 * ExportButton component for exporting scenarios as PDF or CSV
 */
function ExportButton({ scenario }) {
  const exportAsCSV = () => {
    const csvContent = [
      ['Field', 'Value'],
      ['Scenario Name', scenario.scenarioName],
      ['Scope', scenario.scope],
      ['Integrations', scenario.integrations],
      ['Data Complexity', scenario.dataComplexity],
      ['Security', scenario.security],
      ['Team', scenario.team],
      ['Model', scenario.model],
      ['Base Cost', `$${scenario.baseCost}k`],
      ['Most Likely Estimate', formatCurrency(scenario.estimates.mostLikely)],
      ['Low Estimate', formatCurrency(scenario.estimates.low)],
      ['High Estimate', formatCurrency(scenario.estimates.high)],
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${scenario.scenarioName.replace(/\s+/g, '_')}_estimate.csv`);
  };

  const exportAsPDF = () => {
    // Simple text-based PDF export (using HTML to text conversion)
    const content = `
ROM Calculator - Cost Estimate
==============================

Scenario: ${scenario.scenarioName}
Date: ${new Date().toLocaleDateString()}

Input Parameters:
-----------------
Scope: ${scenario.scope}
Integrations: ${scenario.integrations}
Data Complexity: ${scenario.dataComplexity}
Security & Compliance: ${scenario.security}
Team Approach: ${scenario.team}
Model Approach: ${scenario.model}
Base Cost: $${scenario.baseCost}k

Estimates:
----------
Most Likely: ${formatCurrency(scenario.estimates.mostLikely)}
Low Estimate: ${formatCurrency(scenario.estimates.low)}
High Estimate: ${formatCurrency(scenario.estimates.high)}

Multipliers Applied:
--------------------
Scope: ${scenario.estimates.multipliers.scope}
Integrations: ${scenario.estimates.multipliers.integrations}
Data Complexity: ${scenario.estimates.multipliers.dataComplexity}
Security: ${scenario.estimates.multipliers.security}
Team: ${scenario.estimates.multipliers.team}
Model: ${scenario.estimates.multipliers.model}
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
    saveAs(blob, `${scenario.scenarioName.replace(/\s+/g, '_')}_estimate.txt`);
  };

  return (
    <>
      <button onClick={exportAsCSV}>Export as CSV</button>
      <button onClick={exportAsPDF}>Export as Text</button>
    </>
  );
}

export default ExportButton;
