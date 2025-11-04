import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import StatCard from '../components/StatCard';
import TuikStatsCards from '../components/TuikStatsCards';
import '../styles/home.css';
import '../styles/global.css';

const Home = () => {
  const { t } = useLanguage();
  
  const stats = [
    { number: '183', label: t('home.violenceHotline'), icon: '📞' },
    { number: '7/24', label: t('home.continuousService'), icon: '🕐' },
    { number: '81', label: t('home.sonimCenters'), icon: '🏢' },
    { number: '%100', label: t('home.privacyGuarantee'), icon: '🔒' },
  ];

  const features = [
    {
      icon: '💜',
      title: t('home.awareness'),
      description: t('home.awarenessDesc'),
    },
    {
      icon: '🤝',
      title: t('home.support'),
      description: t('home.supportDesc'),
    },
    {
      icon: '📚',
      title: t('home.education'),
      description: t('home.educationDesc'),
    },
    {
      icon: '⚖️',
      title: t('home.legalHelp'),
      description: t('home.legalHelpDesc'),
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">{t('home.title')}</h1>
            <p className="hero-subtitle">
              {t('home.subtitle')}
            </p>
            <div className="hero-buttons">
              <Link to="/help" className="hero-button hero-button-emergency">
                🆘 {t('home.emergencyHelp')}
              </Link>
              <Link to="/about" className="hero-button hero-button-primary">
                {t('home.learnMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section section">
        <div className="container">
          <h2 className="section-title">{t('home.mission')}</h2>
          <div className="mission-content">
            <p className="mission-text">
              {t('home.missionText1')}
            </p>
            <p className="mission-text">
              {t('home.missionText2')}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <h2 className="section-title">{t('home.howWeHelp')}</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card fade-in">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="quick-help-section section">
        <div className="container">
          <h2>{t('home.callEmergency')}</h2>
          <p>{t('home.callEmergencyDesc')}</p>
          <div className="quick-help-number">183</div>
          <p className="quick-help-note">
            {t('home.sonimLine')}
          </p>
          <Link to="/help" className="btn btn-primary mt-md">
            {t('home.viewAllHelp')}
          </Link>
        </div>
      </section>

      {/* Stats Preview Section */}
      <section className="stats-preview-section section">
        <div className="container">
          <h2 className="section-title">{t('home.ourServices')}</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
          <div className="text-center mt-lg">
            <Link to="/stats" className="btn btn-secondary">
              {t('home.viewDetailedStats')}
            </Link>
            <Link to="/live-stats" className="btn btn-primary" style={{ marginLeft: '1rem' }}>
              📊 {t('home.viewLiveData')}
            </Link>
            <Link to="/scenarios" className="btn btn-secondary" style={{ marginLeft: '1rem' }}>
              🎭 {t('home.playScenario')}
            </Link>
            <Link to="/violence-map" className="btn btn-primary" style={{ marginLeft: '1rem' }}>
              🗺️ {t('home.viewViolenceMap')}
            </Link>
          </div>
        </div>
      </section>

      {/* TÜİK Stats Section */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)', padding: '4rem 0' }}>
        <TuikStatsCards />
      </section>

      {/* New Features Section */}
      <section className="new-features-section section" style={{ background: 'linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%)', padding: '3rem 0' }}>
        <div className="container">
          <h2 className="section-title" style={{ marginBottom: '2rem' }}>Yeni Özellikler</h2>
          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <Link 
              to="/sosyal-paylaşım" 
              className="feature-card fade-in"
              style={{ 
                textDecoration: 'none',
                display: 'block',
                background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
                color: 'white',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div className="feature-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>📱</div>
              <h3 className="feature-title" style={{ color: 'white', marginBottom: '0.5rem' }}>Sosyal Paylaşım Kartları</h3>
              <p className="feature-description" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Instagram Story formatında hazır kartlar. Farkındalık yarat, sesini yükselt!
              </p>
            </Link>
            <Link 
              to="/güvenlik-planı" 
              className="feature-card fade-in"
              style={{ 
                textDecoration: 'none',
                display: 'block',
                background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                color: 'white',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div className="feature-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛡️</div>
              <h3 className="feature-title" style={{ color: 'white', marginBottom: '0.5rem' }}>Güvenlik Planı Oluşturucu</h3>
              <p className="feature-description" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Kişisel güvenlik planınızı oluşturun. Güvenli kişiler, çıkış planı ve daha fazlası.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;




