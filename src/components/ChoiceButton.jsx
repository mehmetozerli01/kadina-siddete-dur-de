import React from 'react';

const ChoiceButton = ({ choice, onClick, isSelected, showResult, disabled }) => {
  const getScoreColor = (score) => {
    if (score > 0) return '#10B981'; // Green
    if (score < 0) return '#DC2626'; // Red
    return '#6B7280'; // Gray
  };

  const getScoreIcon = (score) => {
    if (score > 0) return '✅';
    if (score < 0) return '❌';
    return '⚠️';
  };

  const getButtonClass = () => {
    let baseClass = 'choice-button';
    
    if (disabled) baseClass += ' disabled';
    if (isSelected) baseClass += ' selected';
    if (showResult) {
      if (choice.score > 0) baseClass += ' correct';
      if (choice.score < 0) baseClass += ' incorrect';
      if (choice.score === 0) baseClass += ' neutral';
    }
    
    return baseClass;
  };

  return (
    <button
      className={getButtonClass()}
      onClick={onClick}
      disabled={disabled}
      style={{
        '--score-color': getScoreColor(choice.score)
      }}
    >
      <div className="choice-content">
        <div className="choice-letter">{choice.id.toUpperCase()}</div>
        <div className="choice-text">{choice.text}</div>
        {showResult && (
          <div className="choice-feedback">
            <span className="feedback-icon">{getScoreIcon(choice.score)}</span>
            <span className="feedback-score">
              {choice.score > 0 ? '+' : ''}{choice.score}
            </span>
          </div>
        )}
      </div>
      
      {/* Hover effect overlay */}
      <div className="choice-overlay"></div>
      
      {/* Selection indicator */}
      {isSelected && (
        <div className="selection-indicator">
          <span className="selection-icon">✓</span>
        </div>
      )}
    </button>
  );
};

export default ChoiceButton;
