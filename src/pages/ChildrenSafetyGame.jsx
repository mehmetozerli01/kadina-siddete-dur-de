import React from 'react';
import SafetyGame from '../components/children/SafetyGame';
import '../styles/children.css';
import '../styles/global.css';

const ChildrenSafetyGame = () => {
  return (
    <div className="children-safety-game-page">
      <section className="children-hero" style={{ 
        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        padding: '3rem 0'
      }}>
        <div className="container">
          <h1 className="hero-title" style={{ color: 'white' }}>
            🛡️ Güvenlik Oyunu
          </h1>
          <p className="hero-subtitle" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Soruları cevapla ve güvenliğini öğren!
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SafetyGame />
        </div>
      </section>
    </div>
  );
};

export default ChildrenSafetyGame;

