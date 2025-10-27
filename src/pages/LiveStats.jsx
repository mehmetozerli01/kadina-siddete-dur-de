import React from 'react';
import LiveStats from '../components/LiveStats';
import '../styles/global.css';

const LiveStatsPage = () => {
  return (
    <div className="live-stats-page">
      {/* Hero Section */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, #DC2626 0%, #B91C1C 100%)',
        color: 'white',
        padding: '3rem 0'
      }}>
        <div className="container">
          <h1 style={{ 
            color: 'white', 
            fontSize: '2.5rem', 
            textAlign: 'center',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            📊 Gerçek Zamanlı Şiddet İstatistikleri
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255,255,255,0.95)',
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            lineHeight: '1.8'
          }}>
            Kadına yönelik şiddetin gerçek boyutunu görün. 
            Bu rakamlar her dakika güncelleniyor ve gerçek hayatı yansıtıyor.
          </p>
        </div>
      </section>

      {/* Live Stats Component */}
      <section className="section">
        <div className="container">
          <LiveStats />
        </div>
      </section>

      {/* Impact Section */}
      <section className="section bg-light">
        <div className="container">
          <div style={{ 
            maxWidth: '900px', 
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 className="section-title">Bu Rakamlar Ne Anlama Geliyor?</h2>
            <div className="impact-grid">
              <div className="impact-card">
                <div className="impact-icon">⏰</div>
                <h3>Her Dakika</h3>
                <p>
                  Türkiye'de her dakika bir kadın şiddete maruz kalıyor. 
                  Bu rakamlar sadece kayıtlı vakaları gösteriyor.
                </p>
              </div>
              <div className="impact-card">
                <div className="impact-icon">👥</div>
                <h3>Toplumsal Etki</h3>
                <p>
                  Her şiddet vakası sadece o kadını değil, 
                  çocuklarını ve tüm toplumu etkiliyor.
                </p>
              </div>
              <div className="impact-card">
                <div className="impact-icon">💔</div>
                <h3>Gizli Acı</h3>
                <p>
                  Kayıtlı vakalar buzdağının sadece görünen kısmı. 
                  Gerçek sayılar çok daha yüksek.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-purple-dark) 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ 
            color: 'white', 
            fontSize: '2rem',
            marginBottom: '1rem'
          }}>
            Sen de Bu Rakamlardan Biri Olabilirsin
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255,255,255,0.95)',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Şiddete maruz kalıyorsan, sessiz kalma. 
            Yardım almak senin hakkın.
          </p>
          <div className="cta-buttons">
            <a 
              href="tel:183" 
              className="btn"
              style={{ 
                backgroundColor: 'white',
                color: 'var(--primary-purple)',
                fontSize: '1.2rem',
                padding: '1rem 2rem',
                fontWeight: '700',
                marginRight: '1rem'
              }}
            >
              📞 183 - Hemen Ara
            </a>
            <a 
              href="/help" 
              className="btn"
              style={{ 
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                fontSize: '1.2rem',
                padding: '1rem 2rem',
                fontWeight: '700'
              }}
            >
              Yardım Hatları
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LiveStatsPage;
