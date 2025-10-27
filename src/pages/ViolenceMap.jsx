import React from 'react';
import ViolenceMap from '../components/ViolenceMap';
import '../styles/global.css';

const ViolenceMapPage = () => {
  return (
    <div className="violence-map-page">
      {/* Hero Section */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)',
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
            🗺️ Türkiye Şiddet Haritası
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255,255,255,0.95)',
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            lineHeight: '1.8'
          }}>
            İl il şiddet oranları ve risk seviyeleri. 
            Bu harita, kadına yönelik şiddetin coğrafi dağılımını gösteriyor.
          </p>
        </div>
      </section>

      {/* Violence Map Component */}
      <section className="section">
        <div className="container">
          <ViolenceMap />
        </div>
      </section>

      {/* Analysis Section */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Harita Analizi</h2>
          <div className="analysis-grid">
            <div className="analysis-card">
              <div className="analysis-icon">🔴</div>
              <h3>En Riskli Bölgeler</h3>
              <p>
                Güneydoğu ve Doğu Anadolu bölgeleri en yüksek şiddet oranlarına sahip. 
                Sosyo-ekonomik faktörler ve geleneksel yapı etkili oluyor.
              </p>
            </div>
            <div className="analysis-card">
              <div className="analysis-icon">🟢</div>
              <h3>En Güvenli Bölgeler</h3>
              <p>
                Karadeniz ve Ege bölgeleri daha düşük şiddet oranlarına sahip. 
                Kadın eğitimi ve istihdamı bu bölgelerde daha yaygın.
              </p>
            </div>
            <div className="analysis-card">
              <div className="analysis-icon">📈</div>
              <h3>Trend Analizi</h3>
              <p>
                Büyük şehirlerde şiddet oranları artıyor. 
                Kırsal bölgelerde ise geleneksel değerler koruyucu etki yapıyor.
              </p>
            </div>
            <div className="analysis-card">
              <div className="analysis-icon">🏙️</div>
              <h3>Şehir Faktörleri</h3>
              <p>
                Nüfus yoğunluğu, ekonomik durum ve eğitim seviyesi 
                şiddet oranlarını doğrudan etkiliyor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Comparison */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Bölgesel Karşılaştırma</h2>
          <div className="regional-comparison">
            <div className="region-card">
              <h3>🏔️ Doğu Anadolu</h3>
              <div className="region-stats">
                <div className="stat-item">
                  <span className="stat-label">Ortalama Oran:</span>
                  <span className="stat-value high">%62.3</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Risk Seviyesi:</span>
                  <span className="stat-value high">Yüksek</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Trend:</span>
                  <span className="stat-value increasing">📈 Artıyor</span>
                </div>
              </div>
            </div>
            
            <div className="region-card">
              <h3>🌊 Karadeniz</h3>
              <div className="region-stats">
                <div className="stat-item">
                  <span className="stat-label">Ortalama Oran:</span>
                  <span className="stat-value low">%42.1</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Risk Seviyesi:</span>
                  <span className="stat-value low">Düşük</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Trend:</span>
                  <span className="stat-value decreasing">📉 Azalıyor</span>
                </div>
              </div>
            </div>
            
            <div className="region-card">
              <h3>🌅 Ege</h3>
              <div className="region-stats">
                <div className="stat-item">
                  <span className="stat-label">Ortalama Oran:</span>
                  <span className="stat-value medium">%45.8</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Risk Seviyesi:</span>
                  <span className="stat-value medium">Orta</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Trend:</span>
                  <span className="stat-value stable">➡️ Sabit</span>
                </div>
              </div>
            </div>
            
            <div className="region-card">
              <h3>🏔️ Güneydoğu</h3>
              <div className="region-stats">
                <div className="stat-item">
                  <span className="stat-label">Ortalama Oran:</span>
                  <span className="stat-value very-high">%68.7</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Risk Seviyesi:</span>
                  <span className="stat-value very-high">Çok Yüksek</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Trend:</span>
                  <span className="stat-value increasing">📈 Artıyor</span>
                </div>
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
            Bu Harita Gerçek Hayatı Yansıtıyor
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255,255,255,0.95)',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Her nokta gerçek bir ili, her oran gerçek bir kadının yaşadığı acıyı temsil ediyor. 
            Şiddete karşı birlikte durmalıyız.
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
              href="/scenarios" 
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
              🎭 Senaryo Oyunu Oyna
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ViolenceMapPage;
