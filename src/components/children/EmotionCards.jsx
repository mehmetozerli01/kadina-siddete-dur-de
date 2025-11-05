import React, { useState } from 'react';
import '../../styles/children.css';
import '../../styles/emotion-cards.css';

const EmotionCards = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [showTips, setShowTips] = useState(false);

  const emotions = [
    {
      id: 'happy',
      name: 'Mutlu',
      emoji: '😊',
      color: '#10B981',
      description: 'Kendini iyi ve neşeli hissediyorsun',
      tips: [
        'Mutlu olduğunda bu duyguyu paylaş',
        'Mutluluklarını büyütmek için sevdiğin şeyleri yap',
        'Mutlu olduğunda başkalarına da yardım et'
      ]
    },
    {
      id: 'sad',
      name: 'Üzgün',
      emoji: '😢',
      color: '#3B82F6',
      description: 'Kendini üzgün ve yalnız hissediyorsun',
      tips: [
        'Üzgün olduğunda güvendiğin bir yetişkine söyle',
        'Üzüntünü resim çizerek veya yazarak ifade et',
        'Üzgün olduğunda sevdiğin birini düşün',
        'Üzüntün geçici, mutluluk gelecek'
      ]
    },
    {
      id: 'angry',
      name: 'Kızgın',
      emoji: '😠',
      color: '#EF4444',
      description: 'Kendini kızgın ve sinirli hissediyorsun',
      tips: [
        'Kızgın olduğunda derin nefes al',
        'Kızgınlığını zarar vermeden ifade et',
        'Güvendiğin bir yetişkine neden kızgın olduğunu anlat',
        'Kızgınlık normal ama zarar vermemek önemli'
      ]
    },
    {
      id: 'scared',
      name: 'Korkmuş',
      emoji: '😨',
      color: '#8B5CF6',
      description: 'Kendini korkmuş ve endişeli hissediyorsun',
      tips: [
        'Korktuğunda güvendiğin bir yetişkine söyle',
        'Korkularını resim çizerek ifade et',
        'Güvenli bir yerde olduğunu hatırla',
        'Korkmak normal, ama yardım isteyebilirsin'
      ]
    },
    {
      id: 'surprised',
      name: 'Şaşkın',
      emoji: '😲',
      color: '#F59E0B',
      description: 'Kendini şaşkın ve şaşırmış hissediyorsun',
      tips: [
        'Şaşırdığında ne olduğunu anlamaya çalış',
        'Anlamadığın bir şey varsa sor',
        'Güvendiğin bir yetişkine anlat'
      ]
    },
    {
      id: 'calm',
      name: 'Sakin',
      emoji: '😌',
      color: '#06B6D4',
      description: 'Kendini sakin ve huzurlu hissediyorsun',
      tips: [
        'Sakin olduğunda bu iyi bir duygu',
        'Sakinliğini korumaya çalış',
        'Bu duyguyu başkalarıyla paylaş'
      ]
    }
  ];

  const handleEmotionClick = (emotion) => {
    setSelectedEmotion(emotion);
    setShowTips(true);
  };

  const resetSelection = () => {
    setSelectedEmotion(null);
    setShowTips(false);
  };

  return (
    <div className="emotion-cards">
      <div className="emotion-cards-header">
        <h2>💭 Bugün Nasıl Hissediyorsun?</h2>
        <p>Duygularını seç ve öğren!</p>
      </div>

      <div className="emotion-cards-grid">
        {emotions.map((emotion) => (
          <button
            key={emotion.id}
            className={`emotion-card ${selectedEmotion?.id === emotion.id ? 'selected' : ''}`}
            onClick={() => handleEmotionClick(emotion)}
            style={{
              '--emotion-color': emotion.color
            }}
          >
            <div className="emotion-emoji">{emotion.emoji}</div>
            <div className="emotion-name">{emotion.name}</div>
          </button>
        ))}
      </div>

      {showTips && selectedEmotion && (
        <div className="emotion-details">
          <div className="emotion-details-card">
            <button className="close-btn" onClick={resetSelection}>
              ✕
            </button>
            <div className="emotion-details-header">
              <div className="emotion-large-emoji">{selectedEmotion.emoji}</div>
              <h3>{selectedEmotion.name}</h3>
              <p className="emotion-description">{selectedEmotion.description}</p>
            </div>

            <div className="emotion-tips">
              <h4>💡 Ne Yapabilirsin?</h4>
              <ul className="tips-list">
                {selectedEmotion.tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="emotion-reminder">
              <p>
                <strong>Hatırla:</strong> Duyguların normal ve önemlidir. 
                Kendini kötü hissettiğinde mutlaka güvendiğin bir yetişkine söyle!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmotionCards;

