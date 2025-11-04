import React from 'react';
import ColorBook from '../components/children/ColorBook';
import '../styles/children.css';
import '../styles/global.css';

const ChildrenColoring = () => {
  return (
    <div className="children-coloring-page">
      <section className="children-hero" style={{ 
        background: 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)',
        padding: '3rem 0'
      }}>
        <div className="container">
          <h1 className="hero-title" style={{ color: 'white' }}>
            🎨 Boyama Kitabı
          </h1>
          <p className="hero-subtitle" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Renkleri seç ve güzel resimler boya!
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ColorBook />
        </div>
      </section>
    </div>
  );
};

export default ChildrenColoring;

