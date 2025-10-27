import React, { useState, useEffect } from 'react';
import scenariosData from '../assets/data/scenarios.json';
import ScenarioCard from './ScenarioCard';
import ResultModal from './ResultModal';
import '../styles/scenario-game.css';

const ScenarioGame = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedChoices, setSelectedChoices] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60); // 60 saniye per scenario

  const currentScenario = scenariosData[currentScenarioIndex];
  const totalScenarios = scenariosData.length;

  // Timer effect
  useEffect(() => {
    if (gameStarted && !gameCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameStarted) {
      // Time's up - auto select first choice
      handleChoiceSelect(currentScenario.choices[0]);
    }
  }, [timeLeft, gameStarted, gameCompleted, currentScenario]);

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setCurrentScenarioIndex(0);
    setSelectedChoices([]);
    setGameCompleted(false);
    setShowResult(false);
    setTimeLeft(60);
  };

  const handleChoiceSelect = (choice) => {
    const newScore = score + choice.score;
    const newSelectedChoices = [...selectedChoices, {
      scenarioId: currentScenario.id,
      choice: choice,
      score: choice.score
    }];

    setScore(newScore);
    setSelectedChoices(newSelectedChoices);

    // Show choice result briefly
    setTimeout(() => {
      if (currentScenarioIndex < totalScenarios - 1) {
        setCurrentScenarioIndex(currentScenarioIndex + 1);
        setTimeLeft(60); // Reset timer for next scenario
      } else {
        setGameCompleted(true);
        setShowResult(true);
      }
    }, 2000);
  };

  const getScoreMessage = () => {
    if (score >= 80) {
      return {
        title: "Sen Çok Güçlüsün! 💪",
        message: "Mükemmel seçimler! Şiddete karşı duruşun çok güçlü. Sen gerçekten güçlü bir kadınsın.",
        color: "#10B981",
        icon: "💪"
      };
    } else if (score >= 60) {
      return {
        title: "İyi Seçimler! 💜",
        message: "Çoğu seçimin güçlü. Biraz daha güçlenebilirsin ama genel olarak doğru yoldasın.",
        color: "#8B5CF6",
        icon: "💜"
      };
    } else if (score >= 40) {
      return {
        title: "Bazı Seçimlerin Güçlendirilebilir 🤔",
        message: "Bazı seçimlerin güçlü ama bazıları şiddeti kabul ediyor. Kendini korumayı öğren.",
        color: "#F59E0B",
        icon: "🤔"
      };
    } else {
      return {
        title: "Yardım Almayı Düşün 💔",
        message: "Seçimlerin şiddeti kabul ediyor. Sen güçlüsün ve yardım almayı hak ediyorsun.",
        color: "#DC2626",
        icon: "💔"
      };
    }
  };

  const shareResult = () => {
    const scoreMessage = getScoreMessage();
    const text = `"Sen Olsaydın Ne Yapardın?" oyununu oynadım! Skorum: ${score}/100 - ${scoreMessage.title} 
    
Kadına şiddete karşı farkındalık için bu oyunu oyna: kadina-siddete-dur-de.com/scenarios 💜`;
    
    if (navigator.share) {
      navigator.share({
        title: 'Kadına Şiddete Dur De - Senaryo Oyunu',
        text: text,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Sonuç panoya kopyalandı! Sosyal medyada paylaşabilirsin.');
    }
  };

  if (!gameStarted) {
    return (
      <div className="scenario-game-intro">
        <div className="intro-content">
          <h2 className="intro-title">
            🎭 "Sen Olsaydın Ne Yapardın?" Oyunu
          </h2>
          <p className="intro-description">
            Gerçek hayattan alınmış senaryolarla karşılaşacaksın. 
            Her durumda ne yapacağını seç ve şiddete karşı duruşunu test et.
          </p>
          
          <div className="game-info">
            <div className="info-item">
              <span className="info-icon">📊</span>
              <span>6 Senaryo</span>
            </div>
            <div className="info-item">
              <span className="info-icon">⏰</span>
              <span>60 Saniye/ Senaryo</span>
            </div>
            <div className="info-item">
              <span className="info-icon">🏆</span>
              <span>Skor Sistemi</span>
            </div>
          </div>

          <div className="warning-box">
            <h3>⚠️ Önemli Uyarı</h3>
            <p>
              Bu oyun eğitici amaçlıdır. Gerçek şiddet durumlarında 
              <strong> 183 numaralı hattı arayın</strong>.
            </p>
          </div>

          <button 
            className="start-game-btn"
            onClick={startGame}
          >
            🎮 Oyunu Başlat
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    const scoreMessage = getScoreMessage();
    return (
      <ResultModal
        score={score}
        maxScore={totalScenarios * 15}
        message={scoreMessage}
        selectedChoices={selectedChoices}
        onRestart={startGame}
        onShare={shareResult}
        onClose={() => setShowResult(false)}
      />
    );
  }

  return (
    <div className="scenario-game">
      {/* Game Header */}
      <div className="game-header">
        <div className="game-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${((currentScenarioIndex + 1) / totalScenarios) * 100}%` 
              }}
            ></div>
          </div>
          <span className="progress-text">
            {currentScenarioIndex + 1} / {totalScenarios}
          </span>
        </div>
        
        <div className="game-stats">
          <div className="stat-item">
            <span className="stat-icon">🏆</span>
            <span className="stat-value">{score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⏰</span>
            <span className={`stat-value ${timeLeft < 10 ? 'urgent' : ''}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
      </div>

      {/* Current Scenario */}
      <ScenarioCard
        scenario={currentScenario}
        onChoiceSelect={handleChoiceSelect}
        timeLeft={timeLeft}
      />

      {/* Emergency Help */}
      <div className="emergency-help">
        <p>
          <strong>Gerçek bir durumda mısın?</strong> 
          <a href="tel:183" className="emergency-link">
            📞 183 - Hemen Ara
          </a>
        </p>
      </div>
    </div>
  );
};

export default ScenarioGame;
