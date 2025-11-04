import React, { useState } from 'react';
import '../../styles/children.css';

const EmergencyHelper = () => {
  const [showHelp, setShowHelp] = useState(false);

  const emergencyNumbers = [
    { name: 'ŞÖNİM (Şiddet Hattı)', number: '183', icon: '📞', color: '#8B5CF6' },
    { name: 'Polis', number: '155', icon: '🚔', color: '#2563EB' },
    { name: 'Ambulans', number: '112', icon: '🏥', color: '#EF4444' },
    { name: 'Jandarma', number: '156', icon: '🛡️', color: '#10B981' }
  ];

  const safePeople = [
    { name: 'Anne/Baba', icon: '👨‍👩‍👧', action: 'Onlara söyle' },
    { name: 'Öğretmen', icon: '👩‍🏫', action: 'Okulda yardım iste' },
    { name: 'Doktor', icon: '👩‍⚕️', action: 'Sağlık için yardım' },
    { name: 'Polis', icon: '👮', action: 'Güvenlik için yardım' }
  ];

  return (
    <div className="emergency-helper">
      <div className="emergency-header">
        <h2>🆘 Acil Yardım</h2>
        <p>Kendini kötü hissettiğinde yardım iste!</p>
      </div>

      <div className="emergency-content">
        <div className="help-section">
          <h3>📞 Yardım Hatları (Büyükler İçin)</h3>
          <div className="emergency-numbers">
            {emergencyNumbers.map((item, index) => (
              <div key={index} className="emergency-card" style={{ borderLeftColor: item.color }}>
                <div className="emergency-icon">{item.icon}</div>
                <div className="emergency-info">
                  <div className="emergency-name">{item.name}</div>
                  <a href={`tel:${item.number}`} className="emergency-number">
                    {item.number}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <p className="emergency-note">
            ⚠️ Bu numaralar büyükler için. Acil durumlarda bir yetişkine söyle!
          </p>
        </div>

        <div className="safe-people-section">
          <h3>👥 Güvenebileceğin Kişiler</h3>
          <div className="safe-people-grid">
            {safePeople.map((person, index) => (
              <div key={index} className="safe-person-card">
                <div className="person-icon">{person.icon}</div>
                <div className="person-name">{person.name}</div>
                <div className="person-action">{person.action}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="help-actions">
          <h3>💬 Ne Yapmalısın?</h3>
          <div className="action-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <strong>Kendini kötü hissediyorsan</strong>
                <p>Güvendiğin bir yetişkine söyle</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <strong>Yardıma ihtiyacın varsa</strong>
                <p>Bir yetişkine git ve yardım iste</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <strong>Kendini güvende değilsen</strong>
                <p>Güvenli bir yere git (ev, okul, polis merkezi)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="important-message">
          <div className="message-icon">💜</div>
          <div className="message-text">
            <strong>Sen değerlisin!</strong>
            <p>Kendini kötü hissettiğinde yardım isteyebilirsin. Sen yalnız değilsin.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyHelper;

