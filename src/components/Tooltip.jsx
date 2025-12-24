import React from 'react';

/**
 * Tooltip component for displaying help information
 */
function Tooltip({ text, children }) {
  return (
    <div className="tooltip-container">
      <span className="tooltip-icon" role="img" aria-label="help">
        ℹ️
      </span>
      <div className="tooltip-content" role="tooltip">
        {text}
      </div>
    </div>
  );
}

export default Tooltip;
