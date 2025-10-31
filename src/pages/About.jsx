import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/global.css';

const About = () => {
  const { t } = useLanguage();
  
  return (
    <div className="about-page">
      <section className="section bg-light">
        <div className="container">
          <h1 className="section-title">{t('about.title')}</h1>
          
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="fade-in">
              <h2 className="text-purple mb-md">{t('about.whoWeAre')}</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                {t('about.whoWeAreText')}
              </p>
            </div>

            <div className="fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-purple mb-md">{t('about.mission')}</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                {t('about.missionText')}
              </p>
            </div>

            <div className="fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-purple mb-md">{t('about.vision')}</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                {t('about.visionText')}
              </p>
            </div>

            <div className="fade-in" style={{ animationDelay: '0.6s' }}>
              <h2 className="text-purple mb-md">{t('about.values')}</h2>
              <div className="grid grid-2" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
                <div style={{ 
                  padding: '1.5rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ color: 'var(--primary-purple)', marginBottom: '1rem' }}>
                    💜 {t('about.humanRights')}
                  </h3>
                  <p>
                    {t('about.humanRightsDesc')}
                  </p>
                </div>
                
                <div style={{ 
                  padding: '1.5rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ color: 'var(--primary-purple)', marginBottom: '1rem' }}>
                    🤝 {t('about.solidarity')}
                  </h3>
                  <p>
                    {t('about.solidarityDesc')}
                  </p>
                </div>
                
                <div style={{ 
                  padding: '1.5rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ color: 'var(--primary-purple)', marginBottom: '1rem' }}>
                    🔒 {t('about.privacy')}
                  </h3>
                  <p>
                    {t('about.privacyDesc')}
                  </p>
                </div>
                
                <div style={{ 
                  padding: '1.5rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ color: 'var(--primary-purple)', marginBottom: '1rem' }}>
                    ⚖️ {t('about.equality')}
                  </h3>
                  <p>
                    {t('about.equalityDesc')}
                  </p>
                </div>
              </div>
            </div>

            <div className="fade-in" style={{ 
              animationDelay: '0.8s',
              marginTop: '3rem',
              padding: '2rem',
              backgroundColor: 'var(--primary-purple)',
              color: 'white',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <h2 style={{ color: 'white', marginBottom: '1rem' }}>
                {t('about.togetherStronger')}
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.95)' }}>
                {t('about.togetherStrongerText')}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;








