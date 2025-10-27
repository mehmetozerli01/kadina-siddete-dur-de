import React, { useState, useEffect } from 'react';
import '../styles/risk-analyzer.css';

const RiskAnalyzer = () => {
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [riskLevel, setRiskLevel] = useState(0);
  const [riskFactors, setRiskFactors] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // AI Risk Analizi - Çeşitli faktörlere göre risk hesaplama
  const analyzeRisk = (userInput) => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      let risk = 0;
      const factors = [];
      const suggestions = [];

      // Ses tonu analizi (simüle edilmiş)
      if (Math.random() > 0.7) {
        risk += 20;
        factors.push({
          type: 'stress',
          description: 'Yüksek stres seviyesi tespit edildi',
          severity: 'medium'
        });
      }

      // Mesaj içerik analizi
      const lowerInput = userInput.toLowerCase();
      
      // Acil durum kelimeleri
      const emergencyKeywords = {
        'vur': 30, 'dövdü': 30, 'beat': 30,
        'kork': 25, 'scared': 25, 'fear': 25,
        'kaç': 25, 'run': 25, 'escape': 25,
        'tehdit': 30, 'threat': 30, 'threatened': 30,
        'ölüyorum': 40, 'dying': 40, 'kill': 40,
        'hapis': 20, 'prison': 20, 'jail': 20,
        'yardım': 15, 'help': 15, 'save': 15,
        'kırıldı': 25, 'broken': 25, 'hurt': 20
      };

      Object.keys(emergencyKeywords).forEach(keyword => {
        if (lowerInput.includes(keyword)) {
          risk += emergencyKeywords[keyword];
          
          if (emergencyKeywords[keyword] >= 30) {
            factors.push({
              type: 'critical',
              description: `Kritik kelime tespit edildi: "${keyword}"`,
              severity: 'high',
              timestamp: new Date()
            });
          } else {
            factors.push({
              type: 'warning',
              description: `Uyarı kelimesi: "${keyword}"`,
              severity: 'medium',
              timestamp: new Date()
            });
          }
        }
      });

      // Risk seviyesine göre öneriler
      if (risk >= 80) {
        suggestions.push({
          priority: 'critical',
          action: 'Hemen 183 veya 155 numaralarını ara',
          icon: '🚨'
        });
        suggestions.push({
          priority: 'high',
          action: 'Güvenli bir yere git',
          icon: '🏃'
        });
        suggestions.push({
          priority: 'high',
          action: 'Yakınlarını bilgilendir',
          icon: '📞'
        });
      } else if (risk >= 50) {
        suggestions.push({
          priority: 'high',
          action: 'ŞÖNİM merkezine başvur',
          icon: '💜'
        });
        suggestions.push({
          priority: 'medium',
          action: 'Güvenlik planı oluştur',
          icon: '📋'
        });
      } else if (risk >= 30) {
        suggestions.push({
          priority: 'medium',
          action: 'Psikolojik destek al',
          icon: '💭'
        });
        suggestions.push({
          priority: 'low',
          action: 'Yasal danışmanlık al',
          icon: '⚖️'
        });
      } else if (risk >= 10) {
        suggestions.push({
          priority: 'low',
          action: 'Bilgilendirme materyalleri oku',
          icon: '📚'
        });
        suggestions.push({
          priority: 'low',
          action: 'Destek gruplarına katıl',
          icon: '🤝'
        });
      }

      setRiskLevel(Math.min(100, risk));
      setRiskFactors(factors);
      setSuggestions(suggestions);
      setIsAnalyzing(false);
    }, 1000);
  };

  // Otomatik risk analizi (sürekli)
  useEffect(() => {
    const interval = setInterval(() => {
      // Mesaj geçmişi analizi (simüle edilmiş)
      const recentMessages = JSON.parse(localStorage.getItem('chat_history') || '[]');
      const lastMessage = recentMessages[recentMessages.length - 1];
      
      if (lastMessage && lastMessage.sender === 'user') {
        analyzeRisk(lastMessage.text);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getRiskColor = (level) => {
    if (level >= 80) return '#DC2626';
    if (level >= 50) return '#F59E0B';
    if (level >= 30) return '#EAB308';
    if (level >= 10) return '#3B82F6';
    return '#10B981';
  };

  const getRiskLabel = (level) => {
    if (level >= 80) return '🚨 Kritik';
    if (level >= 50) return '⚠️ Yüksek';
    if (level >= 30) return '⚡ Orta';
    if (level >= 10) return '📊 Düşük';
    return '✅ Güvenli';
  };

  return (
    <>
      {!isWidgetOpen ? (
        <button
          className="risk-toggle-btn"
          onClick={() => setIsWidgetOpen(true)}
          title="AI Risk Analizi"
        >
          <span className="toggle-icon">🛡️</span>
          {riskLevel > 10 && (
            <span className="risk-notification">{riskLevel}%</span>
          )}
        </button>
      ) : (
        <div className="risk-analyzer">
          <div className="risk-header">
            <h3>🛡️ Risk Analizi</h3>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div className="risk-badge" style={{ background: getRiskColor(riskLevel) }}>
                {getRiskLabel(riskLevel)}
              </div>
              <button
                className="widget-close-btn"
                onClick={() => setIsWidgetOpen(false)}
                title="Kapat"
              >
                ✕
              </button>
            </div>
          </div>

      {isAnalyzing ? (
        <div className="risk-loading">
          <div className="spinner"></div>
          <p>Analiz ediliyor...</p>
        </div>
      ) : (
        <>
          {/* Risk Seviyesi Göstergesi */}
          <div className="risk-meter">
            <div className="risk-bar-container">
              <div
                className="risk-bar"
                style={{
                  width: `${riskLevel}%`,
                  background: getRiskColor(riskLevel)
                }}
              />
            </div>
            <div className="risk-value">{riskLevel}%</div>
          </div>

          {/* Risk Faktörleri */}
          {riskFactors.length > 0 && (
            <div className="risk-factors">
              <h4>Risk Faktörleri:</h4>
              <ul>
                {riskFactors.map((factor, index) => (
                  <li key={index} className={`factor-${factor.severity}`}>
                    {factor.type === 'critical' && '🚨'}
                    {factor.type === 'warning' && '⚠️'}
                    {factor.description}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Öneriler */}
          {suggestions.length > 0 && (
            <div className="risk-suggestions">
              <h4>Önerilen Eylemler:</h4>
              <ul>
                {suggestions.map((suggestion, index) => (
                  <li key={index} className={`suggestion-${suggestion.priority}`}>
                    <span className="suggestion-icon">{suggestion.icon}</span>
                    <span>{suggestion.action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Manuel Analiz */}
          <div className="manual-analysis">
            <input
              type="text"
              placeholder="Durumunu analiz et..."
              className="analysis-input"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  analyzeRisk(e.target.value);
                  e.target.value = '';
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector('.analysis-input');
                if (input.value) {
                  analyzeRisk(input.value);
                  input.value = '';
                }
              }}
              className="analyze-btn"
            >
              🔍 Analiz Et
            </button>
          </div>
        </>
      )}
        </div>
      )}
    </>
  );
};

export default RiskAnalyzer;

