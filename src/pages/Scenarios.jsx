import React from 'react';
import ScenarioGame from '../components/ScenarioGame';
import '../styles/global.css';

const Scenarios = () => {
  return (
    <div className="scenarios-page">
      {/* Hero Section */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
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
            🎭 "Sen Olsaydın Ne Yapardın?" Oyunu
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255,255,255,0.95)',
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            lineHeight: '1.8'
          }}>
            Gerçek hayattan alınmış senaryolarla karşılaşacaksın. 
            Her durumda ne yapacağını seç ve şiddete karşı duruşunu test et.
          </p>
        </div>
      </section>

      {/* Game Component */}
      <section className="section">
        <div className="container">
          <ScenarioGame />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Oyun Nasıl Çalışır?</h2>
          <div className="how-it-works-grid">
            <div className="how-it-works-item">
              <div className="step-icon">1️⃣</div>
              <h3>Senaryo Oku</h3>
              <p>
                Gerçek hayattan alınmış şiddet senaryolarını oku. 
                Her senaryo farklı bir şiddet türünü temsil eder.
              </p>
            </div>
            <div className="how-it-works-item">
              <div className="step-icon">2️⃣</div>
              <h3>Seçim Yap</h3>
              <p>
                4 farklı seçenekten birini seç. Her seçimin 
                farklı bir puanı ve sonucu var.
              </p>
            </div>
            <div className="how-it-works-item">
              <div className="step-icon">3️⃣</div>
              <h3>Sonucu Gör</h3>
              <p>
                Seçiminin sonucunu ve açıklamasını gör. 
                Neden doğru veya yanlış olduğunu öğren.
              </p>
            </div>
            <div className="how-it-works-item">
              <div className="step-icon">4️⃣</div>
              <h3>Skorunu Al</h3>
              <p>
                Tüm senaryoları tamamladıktan sonra 
                kişiselleştirilmiş skorunu ve önerilerini al.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Violence Types Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Şiddet Türleri</h2>
          <div className="violence-types-grid">
            <div className="violence-type-card">
              <div className="violence-icon">😡</div>
              <h3>Psikolojik Şiddet</h3>
              <p>
                Aşağılama, tehdit, küfür, baskı ve kontrol davranışları. 
                En yaygın şiddet türüdür.
              </p>
              <div className="violence-stats">%67 kadın etkileniyor</div>
            </div>
            <div className="violence-type-card">
              <div className="violence-icon">💰</div>
              <h3>Ekonomik Şiddet</h3>
              <p>
                Ekonomik kaynaklara erişimi engelleme veya kontrol etme. 
                Bağımlılık yaratır.
              </p>
              <div className="violence-stats">%45 kadın etkileniyor</div>
            </div>
            <div className="violence-type-card">
              <div className="violence-icon">👊</div>
              <h3>Fiziksel Şiddet</h3>
              <p>
                Tokat, tekme, itme, çekiştirme gibi fiziksel saldırılar. 
                En görünür şiddet türüdür.
              </p>
              <div className="violence-stats">%38 kadın etkileniyor</div>
            </div>
            <div className="violence-type-card">
              <div className="violence-icon">📱</div>
              <h3>Dijital Şiddet</h3>
              <p>
                Sosyal medya takibi, telefon kontrolü, dijital taciz. 
                Yeni nesil şiddet türüdür.
              </p>
              <div className="violence-stats">%41 kadın etkileniyor</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, var(--accent-orange) 0%, #F59E0B 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ 
            color: 'white', 
            fontSize: '2rem',
            marginBottom: '1rem'
          }}>
            Gerçek Bir Durumda mısın?
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255,255,255,0.95)',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Bu oyun eğitici amaçlıdır. Gerçek şiddet durumlarında 
            hemen yardım al. Sen yalnız değilsin.
          </p>
          <div className="cta-buttons">
            <a 
              href="tel:183" 
              className="btn"
              style={{ 
                backgroundColor: 'white',
                color: 'var(--accent-orange)',
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

export default Scenarios;
