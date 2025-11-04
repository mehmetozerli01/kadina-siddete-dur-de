import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/children.css';
import '../styles/global.css';

const ChildrenHome = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: '📚',
      title: 'Hikayeler',
      description: 'Güzel ve öğretici hikayeler oku',
      link: '/çocuklar/hikayeler',
      color: '#8B5CF6'
    },
    {
      icon: '🎮',
      title: 'Oyunlar',
      description: 'Eğlenceli ve eğitici oyunlar oyna',
      link: '/çocuklar/oyunlar',
      color: '#10B981'
    },
    {
      icon: '🛡️',
      title: 'Güvenlik',
      description: 'Kendini güvende tutmayı öğren',
      link: '/çocuklar/güvenlik',
      color: '#F59E0B'
    },
    {
      icon: '🎨',
      title: 'Boyama',
      description: 'Renkli boyama sayfaları',
      link: '/çocuklar/boyama',
      color: '#EC4899'
    }
  ];

  return (
    <div className="children-home">
      {/* Hero Section */}
      <section className="children-hero">
        <div className="children-hero-content">
          <div className="hero-icon">👶✨</div>
          <h1 className="hero-title">Çocuklar İçin Güvenli Alan</h1>
          <p className="hero-subtitle">
            Burada hikayeler okuyabilir, oyunlar oynayabilir ve kendini güvende tutmayı öğrenebilirsin!
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="children-features">
        <div className="container">
          <h2 className="section-title">Neler Yapabilirsin?</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="feature-card"
                style={{ 
                  '--feature-color': feature.color,
                  textDecoration: 'none'
                }}
              >
                <div className="feature-icon" style={{ fontSize: '4rem' }}>
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <div className="feature-arrow">→</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Reminder */}
      <section className="safety-reminder">
        <div className="container">
          <div className="reminder-card">
            <div className="reminder-icon">💜</div>
            <div className="reminder-content">
              <h3>Önemli Hatırlatma</h3>
              <p>
                Kendini kötü hissettiğinde veya yardıma ihtiyacın olduğunda, 
                güvendiğin bir yetişkine (anne, baba, öğretmen) söyleyebilirsin.
              </p>
              <Link to="/çocuklar/acil-yardım" className="btn-emergency">
                🆘 Acil Yardım
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="quick-links">
        <div className="container">
          <h2 className="section-title">Hızlı Erişim</h2>
          <div className="quick-links-grid">
            <Link to="/çocuklar/hikayeler" className="quick-link">
              <span className="link-icon">📖</span>
              <span className="link-text">Hikayeleri Oku</span>
            </Link>
            <Link to="/çocuklar/oyunlar" className="quick-link">
              <span className="link-icon">🎲</span>
              <span className="link-text">Oyun Oyna</span>
            </Link>
            <Link to="/çocuklar/güvenlik" className="quick-link">
              <span className="link-icon">🛡️</span>
              <span className="link-text">Güvenlik Rehberi</span>
            </Link>
            <Link to="/çocuklar/boyama" className="quick-link">
              <span className="link-icon">🎨</span>
              <span className="link-text">Boyama Yap</span>
            </Link>
          </div>
        </div>
      </section>

      {/* For Parents */}
      <section className="parents-section">
        <div className="container">
          <div className="parents-card">
            <div className="parents-icon">👨‍👩‍👧</div>
            <div className="parents-content">
              <h3>Ebeveynler İçin</h3>
              <p>
                Çocuklarınızla birlikte bu içerikleri inceleyebilir, 
                güvenlik konularında onlarla konuşabilirsiniz.
              </p>
              <Link to="/çocuklar/ebeveyn-rehberi" className="btn-parents">
                Ebeveyn Rehberi →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChildrenHome;

