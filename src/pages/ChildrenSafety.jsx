import React from 'react';
import SafetyGuide from '../components/children/SafetyGuide';
import EmergencyHelper from '../components/children/EmergencyHelper';
import '../styles/children.css';
import '../styles/global.css';

const ChildrenSafety = () => {
  return (
    <div className="children-safety-page">
      <section className="children-hero" style={{ 
        background: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
        padding: '3rem 0'
      }}>
        <div className="container">
          <h1 className="hero-title" style={{ color: 'white' }}>
            🛡️ Güvenlik Rehberi
          </h1>
          <p className="hero-subtitle" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Kendini güvende tutmayı öğren!
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SafetyGuide />
        </div>
      </section>

      <section className="section" style={{ background: '#F9FAFB' }}>
        <div className="container">
          <EmergencyHelper />
        </div>
      </section>
    </div>
  );
};

export default ChildrenSafety;

