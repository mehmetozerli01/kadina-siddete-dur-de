import React from 'react';

const ResultModal = ({ 
  score, 
  maxScore, 
  message, 
  selectedChoices, 
  onRestart, 
  onShare, 
  onClose 
}) => {
  const percentage = Math.round((score / maxScore) * 100);
  
  const getRecommendations = () => {
    if (score >= 80) {
      return [
        "Sen gerçekten güçlü bir kadınsın! 💪",
        "Bu gücünü diğer kadınlarla paylaş",
        "Şiddete maruz kalan kadınlara destek ol",
        "Toplumsal farkındalık yaratmaya devam et"
      ];
    } else if (score >= 60) {
      return [
        "Güçlü yanlarını korumaya devam et",
        "Sınırlarını belirleme konusunda çalış",
        "Kendine değer verdiğini unutma",
        "Gerektiğinde yardım almaktan çekinme"
      ];
    } else if (score >= 40) {
      return [
        "Kendini koruma konusunda bilgi edin",
        "Şiddetin hiçbir türünü kabul etme",
        "Güvenli ilişkiler kurmayı öğren",
        "Profesyonel destek almayı düşün"
      ];
    } else {
      return [
        "Hemen 183 numaralı hattı ara",
        "Güvenli bir yere git",
        "Yakınlarını bilgilendir",
        "Profesyonel yardım al"
      ];
    }
  };

  const getEmergencyActions = () => {
    if (score < 40) {
      return (
        <div className="emergency-actions">
          <h3>🚨 Acil Yardım</h3>
          <div className="emergency-buttons">
            <a href="tel:183" className="emergency-btn primary">
              📞 183 - ŞÖNİM
            </a>
            <a href="tel:155" className="emergency-btn secondary">
              🚔 155 - Polis
            </a>
            <a href="tel:112" className="emergency-btn secondary">
              🏥 112 - Sağlık
            </a>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="result-modal-overlay" onClick={onClose}>
      <div className="result-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">🎉 Oyun Tamamlandı!</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Score Display */}
        <div className="score-display">
          <div className="score-circle" style={{ '--score-color': message.color }}>
            <div className="score-icon">{message.icon}</div>
            <div className="score-value">{score}</div>
            <div className="score-max">/{maxScore}</div>
          </div>
          <div className="score-percentage">{percentage}%</div>
        </div>

        {/* Result Message */}
        <div className="result-message">
          <h3 className="result-title" style={{ color: message.color }}>
            {message.title}
          </h3>
          <p className="result-text">{message.message}</p>
        </div>

        {/* Recommendations */}
        <div className="recommendations">
          <h4>💡 Önerilerim:</h4>
          <ul className="recommendations-list">
            {getRecommendations().map((rec, index) => (
              <li key={index} className="recommendation-item">
                {rec}
              </li>
            ))}
          </ul>
        </div>

        {/* Emergency Actions */}
        {getEmergencyActions()}

        {/* Choice Summary */}
        <div className="choice-summary">
          <h4>📋 Seçimlerin Özeti:</h4>
          <div className="choices-list">
            {selectedChoices.map((item, index) => (
              <div key={index} className="choice-item">
                <div className="choice-scenario">
                  Senaryo {item.scenarioId}: {item.choice.text}
                </div>
                <div 
                  className={`choice-score ${item.score > 0 ? 'positive' : item.score < 0 ? 'negative' : 'neutral'}`}
                >
                  {item.score > 0 ? '+' : ''}{item.score}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-actions">
          <button className="action-btn primary" onClick={onShare}>
            📱 Sonucu Paylaş
          </button>
          <button className="action-btn secondary" onClick={onRestart}>
            🔄 Tekrar Oyna
          </button>
          <button className="action-btn tertiary" onClick={onClose}>
            🏠 Ana Sayfaya Dön
          </button>
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <p>
            <strong>Hatırlatma:</strong> Bu oyun eğitici amaçlıdır. 
            Gerçek şiddet durumlarında <strong>183</strong> numaralı hattı arayın.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
