import React, { useState } from 'react';
import ChoiceButton from './ChoiceButton';

const ScenarioCard = ({ scenario, onChoiceSelect, timeLeft }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleChoiceClick = (choice) => {
    if (selectedChoice) return; // Prevent multiple selections
    
    setSelectedChoice(choice);
    setShowResult(true);
    
    // Show result for 2 seconds then proceed
    setTimeout(() => {
      onChoiceSelect(choice);
    }, 2000);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'psikolojik-şiddet':
        return '#8B5CF6';
      case 'ekonomik-şiddet':
        return '#F59E0B';
      case 'fiziksel-şiddet':
        return '#DC2626';
      case 'dijital-şiddet':
        return '#059669';
      default:
        return '#6B7280';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'psikolojik-şiddet':
        return 'Psikolojik Şiddet';
      case 'ekonomik-şiddet':
        return 'Ekonomik Şiddet';
      case 'fiziksel-şiddet':
        return 'Fiziksel Şiddet';
      case 'dijital-şiddet':
        return 'Dijital Şiddet';
      default:
        return 'Şiddet';
    }
  };

  return (
    <div className="scenario-card">
      {/* Scenario Header */}
      <div className="scenario-header">
        <div className="scenario-icon">{scenario.icon}</div>
        <div className="scenario-info">
          <h3 className="scenario-title">{scenario.title}</h3>
          <div 
            className="scenario-type"
            style={{ backgroundColor: getTypeColor(scenario.type) }}
          >
            {getTypeLabel(scenario.type)}
          </div>
        </div>
        <div className={`time-indicator ${timeLeft < 10 ? 'urgent' : ''}`}>
          <span className="time-icon">⏰</span>
          <span className="time-value">{timeLeft}s</span>
        </div>
      </div>

      {/* Scenario Description */}
      <div className="scenario-description">
        <p>{scenario.description}</p>
      </div>

      {/* Statistics */}
      <div className="scenario-statistics">
        <div className="stat-icon">📊</div>
        <p className="stat-text">{scenario.statistics}</p>
      </div>

      {/* Choices */}
      <div className="choices-container">
        <h4 className="choices-title">Ne yaparsınız?</h4>
        <div className="choices-grid">
          {scenario.choices.map((choice, index) => (
            <ChoiceButton
              key={choice.id}
              choice={choice}
              onClick={() => handleChoiceClick(choice)}
              isSelected={selectedChoice?.id === choice.id}
              showResult={showResult}
              disabled={selectedChoice !== null}
            />
          ))}
        </div>
      </div>

      {/* Choice Result */}
      {showResult && selectedChoice && (
        <div className="choice-result">
          <div className="result-header">
            <span className="result-icon">
              {selectedChoice.score > 0 ? '✅' : selectedChoice.score < 0 ? '❌' : '⚠️'}
            </span>
            <span className="result-score">
              {selectedChoice.score > 0 ? '+' : ''}{selectedChoice.score} puan
            </span>
          </div>
          <p className="result-text">{selectedChoice.result}</p>
          <p className="result-explanation">{selectedChoice.explanation}</p>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="scenario-progress">
        <div className="progress-dots">
          {scenario.choices.map((_, index) => (
            <div 
              key={index}
              className={`progress-dot ${index < scenario.choices.length ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScenarioCard;
