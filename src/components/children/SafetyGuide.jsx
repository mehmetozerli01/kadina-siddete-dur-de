import React, { useState } from 'react';
import '../../styles/children.css';

const SafetyGuide = () => {
  const [currentSection, setCurrentSection] = useState(0);

  const safetyTopics = [
    {
      title: 'Güvenli Yerler',
      icon: '🏠',
      content: [
        'Evde ailenle birlikteyken güvendesin',
        'Okulda öğretmenlerin ve arkadaşların yanında güvendesin',
        'Güvenli kişilerin yanında güvendesin (anne, baba, öğretmen, polis)'
      ],
      tips: [
        'Yalnızken yabancılara kapı açma',
        'Yabancılardan hediye kabul etme',
        'Güvendiğin kişilerin yanında ol'
      ]
    },
    {
      title: 'Güvenli Kişiler',
      icon: '👥',
      content: [
        'Anne ve baban',
        'Öğretmenlerin',
        'Doktorlar',
        'Polisler',
        'Güvendiğin aile büyüklerin'
      ],
      tips: [
        'Kendini kötü hissettiğinde güvendiğin bir yetişkine söyle',
        'Yardıma ihtiyacın olduğunda bu kişilere git',
        'Sırlarını güvendiğin yetişkinlerle paylaş'
      ]
    },
    {
      title: 'Duygularım',
      icon: '😊',
      content: [
        'Mutlu, üzgün, korkmuş, kızgın hissetmek normaldir',
        'Duygularını paylaşmak önemlidir',
        'Kendini kötü hissettiğinde bir yetişkine söyle'
      ],
      tips: [
        'Duygularını resimle, yazıyla veya konuşarak ifade et',
        'Güvendiğin birine duygularını anlat',
        'Duyguların değerli ve önemlidir'
      ]
    },
    {
      title: 'Sınırlar',
      icon: '🚫',
      content: [
        'Hayır demek senin hakkın',
        'İstemediğin bir şey olduğunda dur diyebilirsin',
        'Vücudun sana özeldir'
      ],
      tips: [
        'İstemediğin bir dokunuşta hayır de',
        'Kendini rahatsız eden bir şey olduğunda bir yetişkine söyle',
        'Sınırlarını korumak önemlidir'
      ]
    },
    {
      title: 'Yardım İstemek',
      icon: '🆘',
      content: [
        'Yardım istemek cesaret gerektirir',
        'Kendini kötü hissettiğinde yardım isteyebilirsin',
        'Her zaman yardım edebilecek biri vardır'
      ],
      tips: [
        '183 numarasını hatırla (büyükler için)',
        'Güvendiğin bir yetişkine git',
        'Yardım istemek güçlü olmaktır'
      ]
    }
  ];

  return (
    <div className="safety-guide">
      <div className="safety-guide-header">
        <h2>🛡️ Güvenlik Rehberi</h2>
        <p>Kendini güvende tutmayı öğren!</p>
      </div>

      <div className="safety-navigation">
        {safetyTopics.map((topic, index) => (
          <button
            key={index}
            className={`safety-nav-btn ${currentSection === index ? 'active' : ''}`}
            onClick={() => setCurrentSection(index)}
          >
            <span className="nav-icon">{topic.icon}</span>
            <span className="nav-title">{topic.title}</span>
          </button>
        ))}
      </div>

      <div className="safety-content">
        <div className="safety-section">
          <div className="section-header">
            <div className="section-icon">{safetyTopics[currentSection].icon}</div>
            <h3>{safetyTopics[currentSection].title}</h3>
          </div>

          <div className="section-content">
            <div className="content-list">
              <h4>📚 Öğren:</h4>
              <ul>
                {safetyTopics[currentSection].content.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="tips-list">
              <h4>💡 Hatırla:</h4>
              <ul>
                {safetyTopics[currentSection].tips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="safety-navigation-arrows">
        <button
          className="btn-arrow"
          onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
          disabled={currentSection === 0}
        >
          ← Önceki
        </button>
        <span className="section-counter">
          {currentSection + 1} / {safetyTopics.length}
        </span>
        <button
          className="btn-arrow"
          onClick={() => setCurrentSection(Math.min(safetyTopics.length - 1, currentSection + 1))}
          disabled={currentSection === safetyTopics.length - 1}
        >
          Sonraki →
        </button>
      </div>
    </div>
  );
};

export default SafetyGuide;

