import React, { useState, useEffect } from 'react';
import { calculateROM, validateInputs } from '../utils/calculation';
import { saveScenario } from '../utils/storage';
import { createScenario } from '../utils/models';
import { formatCurrency } from '../utils/models';
import Tooltip from './Tooltip';
import ExportButton from './ExportButton';

/**
 * CalculatorForm component for ROM estimation
 */
function CalculatorForm({ scenarioToLoad }) {
  const [formData, setFormData] = useState({
    scenarioName: '',
    scope: 'Small',
    integrations: 'Few',
    dataComplexity: 'Low',
    security: 'Basic',
    team: 'In-house',
    model: 'API-only',
    baseCost: '',
  });

  const [estimates, setEstimates] = useState(null);
  const [errors, setErrors] = useState([]);
  const [saveMessage, setSaveMessage] = useState('');

  // Load scenario data when scenarioToLoad prop changes
  useEffect(() => {
    if (scenarioToLoad) {
      setFormData({
        scenarioName: scenarioToLoad.scenarioName,
        scope: scenarioToLoad.scope,
        integrations: scenarioToLoad.integrations,
        dataComplexity: scenarioToLoad.dataComplexity,
        security: scenarioToLoad.security,
        team: scenarioToLoad.team,
        model: scenarioToLoad.model,
        baseCost: scenarioToLoad.baseCost.toString(),
      });
      setSaveMessage('');
    } else {
      // Reset to default values when scenarioToLoad is null
      setFormData({
        scenarioName: '',
        scope: 'Small',
        integrations: 'Few',
        dataComplexity: 'Low',
        security: 'Basic',
        team: 'In-house',
        model: 'API-only',
        baseCost: '',
      });
      setSaveMessage('');
    }
  }, [scenarioToLoad]);

  // Real-time calculation whenever inputs change
  useEffect(() => {
    if (formData.baseCost && parseFloat(formData.baseCost) > 0) {
      try {
        const result = calculateROM({
          ...formData,
          baseCost: parseFloat(formData.baseCost),
        });
        setEstimates(result);
      } catch (error) {
        setEstimates(null);
      }
    } else {
      setEstimates(null);
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors([]);
    setSaveMessage('');
  };

  const handleSave = () => {
    const validation = validateInputs({
      ...formData,
      baseCost: parseFloat(formData.baseCost),
    });

    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    try {
      const scenario = createScenario({
        ...formData,
        baseCost: parseFloat(formData.baseCost),
        estimates,
      });

      saveScenario(scenario);
      setSaveMessage('Scenario saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setErrors([error.message]);
    }
  };

  const tooltips = {
    scope: 'Small: 1-2 workflows, Medium: 3-4 workflows, Large: 5+ workflows',
    integrations: 'Few: 0-1 systems, Some: 2-3 systems, Many: 4+ systems',
    dataComplexity:
      'Low: clean docs, minimal PII; Medium: multiple sources, some PII; High: many sources, sensitive data',
    security:
      'Basic: internal pilot; Standard: SSO, logging, filtering; Strict: regulated, red-team, audits',
    team:
      'In-house: internal team; Mixed: hybrid approach; Partner-led: external consultants',
    model:
      'API-only: use existing APIs; Light tuning: minor adjustments; Fine-tuning: custom model training',
    baseCost: 'Enter base cost in thousands of USD (e.g., 150 = $150,000)',
  };

  return (
    <div className="card">
      <h2>New ROM Estimate</h2>

      <div className="form-group">
        <label htmlFor="scenarioName">
          Scenario Name *
          <Tooltip text="A descriptive name for this estimate" />
        </label>
        <input
          type="text"
          id="scenarioName"
          name="scenarioName"
          value={formData.scenarioName}
          onChange={handleChange}
          placeholder="e.g., Customer Support Chatbot"
        />
      </div>

      <div className="form-group">
        <label htmlFor="scope">
          Scope *
          <Tooltip text={tooltips.scope} />
        </label>
        <select
          id="scope"
          name="scope"
          value={formData.scope}
          onChange={handleChange}
        >
          <option value="Small">Small (1-2 workflows)</option>
          <option value="Medium">Medium (3-4 workflows)</option>
          <option value="Large">Large (5+ workflows)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="integrations">
          Integrations *
          <Tooltip text={tooltips.integrations} />
        </label>
        <select
          id="integrations"
          name="integrations"
          value={formData.integrations}
          onChange={handleChange}
        >
          <option value="Few">Few (0-1 systems)</option>
          <option value="Some">Some (2-3 systems)</option>
          <option value="Many">Many (4+ systems)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="dataComplexity">
          Data Complexity *
          <Tooltip text={tooltips.dataComplexity} />
        </label>
        <select
          id="dataComplexity"
          name="dataComplexity"
          value={formData.dataComplexity}
          onChange={handleChange}
        >
          <option value="Low">Low (clean docs, minimal PII)</option>
          <option value="Medium">Medium (multiple sources, some PII)</option>
          <option value="High">High (many sources, sensitive data)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="security">
          Security & Compliance *
          <Tooltip text={tooltips.security} />
        </label>
        <select
          id="security"
          name="security"
          value={formData.security}
          onChange={handleChange}
        >
          <option value="Basic">Basic (internal pilot)</option>
          <option value="Standard">Standard (SSO, logging, filtering)</option>
          <option value="Strict">Strict (regulated, red-team, audits)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="team">
          Team Approach *
          <Tooltip text={tooltips.team} />
        </label>
        <select
          id="team"
          name="team"
          value={formData.team}
          onChange={handleChange}
        >
          <option value="In-house">In-house</option>
          <option value="Mixed">Mixed</option>
          <option value="Partner-led">Partner-led</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="model">
          Model Approach *
          <Tooltip text={tooltips.model} />
        </label>
        <select
          id="model"
          name="model"
          value={formData.model}
          onChange={handleChange}
        >
          <option value="API-only">API-only</option>
          <option value="Light tuning">Light tuning</option>
          <option value="Fine-tuning">Fine-tuning</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="baseCost">
          Base Cost (in $1000s) *
          <Tooltip text={tooltips.baseCost} />
        </label>
        <input
          type="number"
          id="baseCost"
          name="baseCost"
          value={formData.baseCost}
          onChange={handleChange}
          placeholder="150"
          min="1"
          max="10000"
        />
      </div>

      {errors.length > 0 && (
        <div className="error">
          {errors.map((error, index) => (
            <div key={index}>{error}</div>
          ))}
        </div>
      )}

      {estimates && (
        <div className="estimate-result">
          <h3>ROM Estimates</h3>
          <div className="estimate-value">
            Most Likely: {formatCurrency(estimates.mostLikely)}
          </div>
          <div>Low: {formatCurrency(estimates.low)}</div>
          <div>High: {formatCurrency(estimates.high)}</div>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <button onClick={handleSave} disabled={!estimates}>
          Save Scenario
        </button>
        {estimates && (
          <ExportButton
            scenario={{
              ...formData,
              baseCost: parseFloat(formData.baseCost),
              estimates,
            }}
          />
        )}
      </div>

      {saveMessage && (
        <div style={{ marginTop: '10px', color: '#4CAF50' }}>{saveMessage}</div>
      )}
    </div>
  );
}

export default CalculatorForm;
