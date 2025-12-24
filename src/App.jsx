import React, { useState } from 'react';
import CalculatorForm from './components/CalculatorForm';
import ScenarioList from './components/ScenarioList';
import ScenarioCompare from './components/ScenarioCompare';

function App() {
  const [currentView, setCurrentView] = useState('calculator');
  const [selectedScenarios, setSelectedScenarios] = useState([]);
  const [scenarioToLoad, setScenarioToLoad] = useState(null);

  const handleLoadScenario = (scenario) => {
    setScenarioToLoad(scenario);
    setCurrentView('calculator');
    // Scroll to top after view changes
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  };

  return (
    <div className="container">
      <header>
        <h1>ROM Calculator</h1>
        <p>Rough Order of Magnitude Cost Estimator for GenAI Projects</p>
      </header>

      <nav style={{ marginBottom: '20px' }}>
        <button onClick={() => {
          setScenarioToLoad(null);
          setCurrentView('calculator');
        }}>
          New Estimate
        </button>
        <button onClick={() => setCurrentView('list')}>
          Saved Scenarios
        </button>
        {selectedScenarios.length >= 2 && (
          <button onClick={() => setCurrentView('compare')}>
            Compare ({selectedScenarios.length})
          </button>
        )}
      </nav>

      {currentView === 'calculator' && <CalculatorForm scenarioToLoad={scenarioToLoad} />}
      
      {currentView === 'list' && (
        <ScenarioList
          selectedScenarios={selectedScenarios}
          onSelectionChange={setSelectedScenarios}
          onLoadScenario={handleLoadScenario}
        />
      )}
      
      {currentView === 'compare' && (
        <ScenarioCompare scenarios={selectedScenarios} />
      )}
    </div>
  );
}

export default App;
