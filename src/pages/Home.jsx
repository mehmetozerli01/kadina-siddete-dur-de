import React from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import '../styles/home.css';
import '../styles/global.css';

const Home = () => {
  const stats = [
    { number: '183', label: 'ALO Şiddet Hattı', icon: '📞' },
    { number: '7/24', label: 'Kesintisiz Hizmet', icon: '🕐' },
    { number: '81', label: 'İlde ŞÖNİM Merkezi', icon: '🏢' },
    { number: '%100', label: 'Gizlilik Garantisi', icon: '🔒' },
  ];

  const features = [
    {
      icon: '💜',
      title: 'Farkındalık',
      description: 'Kadına yönelik şiddetin her türlüsü hakkında bilgilendirme ve farkındalık oluşturuyoruz.',
    },
    {
      icon: '🤝',
      title: 'Destek',
      description: 'Şiddet mağduru kadınlara psikolojik, hukuki ve sosyal destek sağlıyoruz.',
    },
    {
      icon: '📚',
      title: 'Eğitim',
      description: 'Toplumsal cinsiyet eşitliği ve şiddet önleme konularında eğitim programları düzenliyoruz.',
    },
    {
      icon: '⚖️',
      title: 'Hukuki Yardım',
      description: 'Mağdur kadınların yasal haklarını korumak için danışmanlık hizmeti sunuyoruz.',
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">Kadına Şiddete Dur De</h1>
            <p className="hero-subtitle">
              Sen yalnız değilsin. Şiddete karşı birlikte duruyoruz.
            </p>
            <div className="hero-buttons">
              <Link to="/help" className="hero-button hero-button-emergency">
                🆘 Acil Yardım Al
              </Link>
              <Link to="/about" className="hero-button hero-button-primary">
                Hakkımızda Bilgi Al
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section section">
        <div className="container">
          <h2 className="section-title">Misyonumuz</h2>
          <div className="mission-content">
            <p className="mission-text">
              Kadına yönelik şiddet, toplumun tüm kesimlerinde karşılaşılan ve 
              kadınların temel insan haklarını ihlal eden ciddi bir sorundur. 
              Biz, bu sorunla mücadelede farkındalık oluşturmak, mağdur kadınlara 
              destek olmak ve toplumsal değişimi hızlandırmak için çalışıyoruz.
            </p>
            <p className="mission-text">
              Hedefimiz, kadınların şiddetsiz bir yaşam sürmelerini sağlamak ve 
              toplumsal cinsiyet eşitliğinin gerçekleşmesine katkıda bulunmaktır. 
              Her kadın, güvenli ve saygın bir yaşam hakkına sahiptir.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section section">
        <div className="container">
          <h2 className="section-title">Nasıl Yardımcı Oluyoruz?</h2>
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
          <h2>Acil Durumda Arayın</h2>
          <p>7 gün 24 saat ücretsiz ve gizli destek hattı</p>
          <div className="quick-help-number">183</div>
          <p className="quick-help-note">
            ALO Şiddet Hattı - ŞÖNİM (Şiddet Önleme ve İzleme Merkezi)
          </p>
          <Link to="/help" className="btn btn-primary mt-md">
            Tüm Yardım Hatlarını Gör
          </Link>
        </div>
      </section>

      {/* Stats Preview Section */}
      <section className="stats-preview-section section">
        <div className="container">
          <h2 className="section-title">Hizmetlerimiz</h2>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>
          <div className="text-center mt-lg">
            <Link to="/stats" className="btn btn-secondary">
              Detaylı İstatistikleri Gör
            </Link>
            <Link to="/live-stats" className="btn btn-primary" style={{ marginLeft: '1rem' }}>
              📊 Canlı Verileri İncele
            </Link>
            <Link to="/scenarios" className="btn btn-secondary" style={{ marginLeft: '1rem' }}>
              🎭 Senaryo Oyunu Oyna
            </Link>
            <Link to="/violence-map" className="btn btn-primary" style={{ marginLeft: '1rem' }}>
              🗺️ Şiddet Haritasını İncele
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;




