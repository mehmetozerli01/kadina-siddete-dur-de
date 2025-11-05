import React from 'react';
import EmotionCards from '../components/children/EmotionCards';
import '../styles/children.css';
import '../styles/global.css';

const ChildrenEmotions = () => {
  return (
    <div className="children-emotions-page">
      <section className="children-hero" style={{ 
        background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
        padding: '3rem 0'
      }}>
        <div className="container">
          <h1 className="hero-title" style={{ color: 'white' }}>
            💭 Duygularım
          </h1>
          <p className="hero-subtitle" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Duygularını tanı ve ifade et!
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <EmotionCards />
        </div>
      </section>
    </div>
  );
};

export default ChildrenEmotions;

