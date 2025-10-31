import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/global.css';
import '../styles/cards.css';

const Help = () => {
  const { t } = useLanguage();
  
  const helplines = [
    {
      icon: '📞',
      title: t('help.sonim'),
      description: t('help.sonimDesc'),
      phone: '183',
      hours: t('help.hours24'),
    },
    {
      icon: '🚔',
      title: t('help.police'),
      description: t('help.policeDesc'),
      phone: '155',
      hours: t('help.hours24'),
    },
    {
      icon: '🏥',
      title: t('help.health'),
      description: t('help.healthDesc'),
      phone: '112',
      hours: t('help.hours24'),
    },
    {
      icon: '👮',
      title: t('help.gendarmerie'),
      description: t('help.gendarmerieDesc'),
      phone: '156',
      hours: t('help.hours24'),
    },
    {
      icon: '⚖️',
      title: t('help.legalAid'),
      description: t('help.legalAidDesc'),
      phone: '155',
      hours: t('help.businessHours'),
    },
    {
      icon: '💬',
      title: t('help.psychologicalSupport'),
      description: t('help.psychologicalSupportDesc'),
      phone: '183',
      hours: t('help.hours24'),
    },
  ];

  return (
    <div className="help-page">
      {/* Hero Section */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, var(--accent-orange) 0%, #F59E0B 100%)',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ 
            color: 'white', 
            fontSize: '2.5rem', 
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}>
            🆘 {t('help.title')}
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            color: 'rgba(255,255,255,0.95)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            {t('help.subtitle')}
          </p>
        </div>
      </section>

      {/* Helplines Section */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: '2rem' }}>
            {helplines.map((helpline, index) => (
              <div key={index} className="card help-card fade-in" style={{ 
                animationDelay: `${index * 0.1}s` 
              }}>
                <div className="help-card-content">
                  <div className="help-card-icon">{helpline.icon}</div>
                  <h3 className="help-card-title">{helpline.title}</h3>
                  <p className="help-card-description">{helpline.description}</p>
                  <a href={`tel:${helpline.phone}`} className="help-card-phone">
                    {helpline.phone}
                  </a>
                  <p className="help-card-hours">{helpline.hours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Info Section */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">{t('help.importantInfo')}</h2>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ color: 'var(--primary-purple)', marginBottom: '1rem' }}>
                🔒 {t('help.privacyGuaranteeTitle')}
              </h3>
              <p style={{ lineHeight: '1.8' }}>
                {t('help.privacyGuaranteeText')}
              </p>
            </div>

            <div style={{
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ color: 'var(--primary-purple)', marginBottom: '1rem' }}>
                💰 {t('help.freeService')}
              </h3>
              <p style={{ lineHeight: '1.8' }}>
                {t('help.freeServiceText')}
              </p>
            </div>

            <div style={{
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ color: 'var(--primary-purple)', marginBottom: '1rem' }}>
                🏢 {t('help.sonimCentersTitle')}
              </h3>
              <p style={{ lineHeight: '1.8' }}>
                {t('help.sonimCentersText')}
              </p>
            </div>

            <div style={{
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: 'var(--primary-purple)', marginBottom: '1rem' }}>
                🏠 {t('help.shelters')}
              </h3>
              <p style={{ lineHeight: '1.8' }}>
                {t('help.sheltersText')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, var(--primary-purple-dark) 0%, var(--primary-purple) 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ color: 'white', marginBottom: '1rem' }}>
            {t('help.callEmergency')}
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.95)', marginBottom: '2rem' }}>
            {t('help.callEmergencyText')}
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="tel:155" 
              className="btn btn-emergency"
              style={{ fontSize: '1.3rem', padding: '1rem 2rem' }}
            >
              📞 155 - {t('help.police').toUpperCase()}
            </a>
            <a 
              href="tel:183" 
              className="btn"
              style={{ 
                backgroundColor: 'white', 
                color: 'var(--primary-purple)',
                fontSize: '1.3rem', 
                padding: '1rem 2rem' 
              }}
            >
              📞 183 - ŞÖNİM
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;








