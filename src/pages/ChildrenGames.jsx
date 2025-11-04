import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/children.css';
import '../styles/global.css';
import childrenGames from '../assets/data/children-games.json';

const ChildrenGames = () => {
  const { t } = useLanguage();
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    setGames(childrenGames);
  }, []);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (isCorrect) => {
    setSelectedAnswer(isCorrect);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < selectedGame.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Game finished
      setSelectedGame(null);
      setCurrentQuestion(0);
    }
  };

  if (selectedGame && selectedGame.type === 'interactive') {
    const question = selectedGame.questions[currentQuestion];
    const isFinished = currentQuestion === selectedGame.questions.length - 1 && selectedAnswer !== null;

    return (
      <div className="children-games-page">
        <div className="container">
          <button 
            className="btn-back"
            onClick={() => setSelectedGame(null)}
          >
            ← Geri Dön
          </button>

          <div className="game-container">
            <div className="game-header">
              <h2>{selectedGame.title}</h2>
              <div className="game-progress">
                Soru {currentQuestion + 1} / {selectedGame.questions.length}
                <span className="game-score">Puan: {score}</span>
              </div>
            </div>

            <div className="game-question">
              <h3>{question.question}</h3>
              <div className="game-options">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    className={`game-option ${
                      selectedAnswer !== null
                        ? option.correct
                          ? 'correct'
                          : selectedAnswer === false && !option.correct
                          ? 'wrong'
                          : ''
                        : ''
                    } ${selectedAnswer !== null ? 'disabled' : ''}`}
                    onClick={() => !selectedAnswer && handleAnswerSelect(option.correct)}
                    disabled={selectedAnswer !== null}
                  >
                    {option.text}
                    {selectedAnswer !== null && option.correct && ' ✓'}
                  </button>
                ))}
              </div>

              {selectedAnswer !== null && (
                <div className="game-feedback">
                  {selectedAnswer ? (
                    <div className="feedback correct">
                      <span className="feedback-icon">🎉</span>
                      <p>Harika! Doğru cevap!</p>
                    </div>
                  ) : (
                    <div className="feedback wrong">
                      <span className="feedback-icon">💡</span>
                      <p>Tekrar düşün. Doğru cevabı bulabilirsin!</p>
                    </div>
                  )}
                </div>
              )}

              {selectedAnswer !== null && (
                <button 
                  className="btn-next"
                  onClick={handleNextQuestion}
                >
                  {isFinished ? 'Oyunu Bitir' : 'Sonraki Soru →'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="children-games-page">
      <section className="children-hero" style={{ 
        background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        padding: '3rem 0'
      }}>
        <div className="container">
          <h1 className="hero-title" style={{ color: 'white' }}>
            🎮 Eğlenceli Oyunlar
          </h1>
          <p className="hero-subtitle" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Oyun oynarken güvenlik ve duygular hakkında öğren!
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="games-grid">
            {games.map(game => (
              <div
                key={game.id}
                className="game-card"
                onClick={() => handleGameSelect(game)}
              >
                <div className="game-card-icon">{game.icon}</div>
                <div className="game-card-content">
                  <h3 className="game-card-title">{game.title}</h3>
                  <p className="game-card-description">{game.description}</p>
                  <div className="game-card-meta">
                    <span className="game-card-age">Yaş: {game.ageGroup}</span>
                    <span className="game-card-type">{game.type}</span>
                  </div>
                </div>
                <div className="game-card-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChildrenGames;

