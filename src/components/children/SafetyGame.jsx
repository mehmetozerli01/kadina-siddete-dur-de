import React, { useState } from 'react';
import '../../styles/children.css';
import '../../styles/safety-game.css';

const SafetyGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      id: 1,
      question: 'Yabancı biri sana hediye verirse ne yaparsın?',
      icon: '🎁',
      options: [
        {
          text: 'Kabul ederim, teşekkür ederim',
          correct: false,
          explanation: '❌ Yabancılardan hediye kabul etmemelisin. Güvendiğin bir yetişkine söylemelisin.'
        },
        {
          text: 'Reddederim ve anne/babaya söylerim',
          correct: true,
          explanation: '✅ Doğru! Yabancılardan hediye kabul etmemelisin ve güvendiğin bir yetişkine mutlaka söylemelisin.'
        },
        {
          text: 'Sessizce alırım, kimseye söylemem',
          correct: false,
          explanation: '❌ Bu çok tehlikeli! Mutlaka güvendiğin bir yetişkine söylemelisin.'
        }
      ]
    },
    {
      id: 2,
      question: 'Birisi sana "Sır olarak sakla" derse ne yaparsın?',
      icon: '🤫',
      options: [
        {
          text: 'Sır olarak saklarım, kimseye söylemem',
          correct: false,
          explanation: '❌ Eğer birisi seni rahatsız ediyorsa veya korkutuyorsa, bu bir sır değildir! Mutlaka güvendiğin bir yetişkine söyle.'
        },
        {
          text: 'Güvendiğim bir yetişkine söylerim',
          correct: true,
          explanation: '✅ Mükemmel! Eğer birisi seni rahatsız ediyorsa, bu bir sır değildir. Güvendiğin bir yetişkine mutlaka söyle.'
        },
        {
          text: 'Sadece arkadaşlarıma söylerim',
          correct: false,
          explanation: '❌ Arkadaşların yardım edemez. Güvendiğin bir yetişkine (anne, baba, öğretmen) söylemelisin.'
        }
      ]
    },
    {
      id: 3,
      question: 'Yalnızken biri kapını çalarsa ne yaparsın?',
      icon: '🚪',
      options: [
        {
          text: 'Kapıyı açıp bakarım',
          correct: false,
          explanation: '❌ Yalnızken kapıyı açmamalısın! Önce kim olduğunu sor, tanımıyorsan kapıyı açma.'
        },
        {
          text: 'Kim olduğunu sorarım ama kapıyı açmam',
          correct: true,
          explanation: '✅ Harika! Yalnızken kapıyı açmamalısın. Tanımadığın kişilere kapıyı açma ve güvendiğin bir yetişkine haber ver.'
        },
        {
          text: 'Sessizce beklerim, hiçbir şey yapmam',
          correct: false,
          explanation: '❌ Eğer biri kapıyı çalıyorsa, güvendiğin bir yetişkine haber vermelisin.'
        }
      ]
    },
    {
      id: 4,
      question: 'Kendini kötü hissettiğinde ne yaparsın?',
      icon: '😟',
      options: [
        {
          text: 'Hiç kimseye söylemem, kendim hallederim',
          correct: false,
          explanation: '❌ Kendini kötü hissettiğinde mutlaka güvendiğin bir yetişkine söylemelisin. Yardım istemek normaldir!'
        },
        {
          text: 'Güvendiğim bir yetişkine söylerim',
          correct: true,
          explanation: '✅ Çok doğru! Kendini kötü hissettiğinde, güvendiğin bir yetişkine (anne, baba, öğretmen) söylemelisin. Onlar sana yardım edecektir.'
        },
        {
          text: 'Sadece arkadaşlarıma anlatırım',
          correct: false,
          explanation: '❌ Arkadaşların yardım edemez. Güvendiğin bir yetişkine söylemelisin.'
        }
      ]
    },
    {
      id: 5,
      question: 'Birisi sana dokunmaktan rahatsız olursan ne yaparsın?',
      icon: '✋',
      options: [
        {
          text: 'Sessizce katlanırım',
          correct: false,
          explanation: '❌ Hayır! Eğer biri sana dokunmaktan rahatsız oluyorsan, "HAYIR" demelisin ve güvendiğin bir yetişkine söylemelisin.'
        },
        {
          text: '"HAYIR" derim ve güvendiğim bir yetişkine söylerim',
          correct: true,
          explanation: '✅ Mükemmel! Vücudun sana aittir. Eğer biri sana dokunmaktan rahatsız oluyorsan, "HAYIR" demek ve güvendiğin bir yetişkine söylemek çok önemlidir.'
        },
        {
          text: 'Sadece kaçarım',
          correct: false,
          explanation: '❌ Kaçmak yeterli değil. "HAYIR" demeli ve güvendiğin bir yetişkine mutlaka söylemelisin.'
        }
      ]
    }
  ];

  const handleAnswer = (option) => {
    setSelectedAnswer(option);
    
    if (option.correct) {
      setScore(score + 1);
    }

    // 2 saniye sonra bir sonraki soruya geç
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 2000);
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    let badge = '';
    let message = '';
    
    if (percentage === 100) {
      badge = '🏆';
      message = 'Mükemmel! Sen gerçekten güvenliğini biliyorsun!';
    } else if (percentage >= 80) {
      badge = '⭐';
      message = 'Harika! Güvenlik konusunda çok iyisin!';
    } else if (percentage >= 60) {
      badge = '👍';
      message = 'İyi! Biraz daha pratik yaparsan daha da iyi olacaksın!';
    } else {
      badge = '💪';
      message = 'Öğrenmeye devam! Tekrar oynayarak daha iyi olabilirsin!';
    }

    return (
      <div className="safety-game">
        <div className="game-result">
          <div className="result-badge">{badge}</div>
          <h2>Oyun Bitti!</h2>
          <p className="result-message">{message}</p>
          <div className="score-display">
            <p>Puanın: {score} / {questions.length}</p>
            <div className="score-bar">
              <div 
                className="score-fill" 
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <p className="score-percentage">{percentage}%</p>
          </div>
          <button onClick={restartGame} className="btn-restart">
            🔄 Tekrar Oyna
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="safety-game">
      <div className="game-header">
        <h2>🛡️ Güvenlik Oyunu</h2>
        <p>Doğru cevapları seç ve güvenliğini öğren!</p>
      </div>

      <div className="game-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <p className="progress-text">
          Soru {currentQuestion + 1} / {questions.length}
        </p>
      </div>

      <div className="game-question">
        <div className="question-icon">{currentQ.icon}</div>
        <h3>{currentQ.question}</h3>
      </div>

      <div className="game-options">
        {currentQ.options.map((option, index) => (
          <button
            key={index}
            className={`game-option ${
              selectedAnswer === option 
                ? (option.correct ? 'correct' : 'incorrect')
                : ''
            } ${selectedAnswer ? 'disabled' : ''}`}
            onClick={() => !selectedAnswer && handleAnswer(option)}
            disabled={!!selectedAnswer}
          >
            <span className="option-letter">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="option-text">{option.text}</span>
            {selectedAnswer === option && (
              <span className="option-feedback">
                {option.correct ? '✅' : '❌'}
              </span>
            )}
          </button>
        ))}
      </div>

      {selectedAnswer && (
        <div className={`game-explanation ${selectedAnswer.correct ? 'explanation-correct' : 'explanation-incorrect'}`}>
          <p>{selectedAnswer.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default SafetyGame;

