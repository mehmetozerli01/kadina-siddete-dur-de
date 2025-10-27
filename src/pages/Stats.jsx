import React from 'react';
import StatCard from '../components/StatCard';
import '../styles/global.css';

const Stats = () => {
  const mainStats = [
    { number: '183', label: 'ALO Şiddet Hattı', icon: '📞' },
    { number: '81', label: 'İlde ŞÖNİM Merkezi', icon: '🏢' },
    { number: '7/24', label: 'Kesintisiz Hizmet', icon: '🕐' },
    { number: '%100', label: 'Gizlilik Garantisi', icon: '🔒' },
  ];

  const violenceTypes = [
    {
      title: 'Fiziksel Şiddet',
      icon: '🤕',
      description: 'Tokat, tekme, itme, çekiştirme, saç çekme gibi fiziksel saldırılar.',
      examples: ['Dövme', 'Tokat atma', 'İtme-kakma', 'Yaralama'],
    },
    {
      title: 'Psikolojik Şiddet',
      icon: '😔',
      description: 'Aşağılama, tehdit, küfür, baskı ve kontrol davranışları.',
      examples: ['Hakaret', 'Tehdit', 'Aşağılama', 'İzolasyon'],
    },
    {
      title: 'Ekonomik Şiddet',
      icon: '💰',
      description: 'Ekonomik kaynaklara erişimi engelleme veya kontrol etme.',
      examples: ['Para vermeme', 'Çalışmayı engelleme', 'Maaşına el koyma', 'Bağımlı hale getirme'],
    },
    {
      title: 'Cinsel Şiddet',
      icon: '🚫',
      description: 'İstenmeyen cinsel davranışlar ve zorlamalar.',
      examples: ['Rızasız ilişki', 'Taciz', 'İstismar', 'Zorla evlilik'],
    },
  ];

  const supportServices = [
    {
      title: 'Psikolojik Destek',
      icon: '🧠',
      description: 'Profesyonel psikologlar tarafından bireysel ve grup terapisi.',
    },
    {
      title: 'Hukuki Danışmanlık',
      icon: '⚖️',
      description: 'Avukatlar tarafından ücretsiz hukuki danışmanlık ve dava süreci desteği.',
    },
    {
      title: 'Güvenli Barınma',
      icon: '🏠',
      description: 'Kadın sığınma evlerinde güvenli barınma ve rehabilitasyon.',
    },
    {
      title: 'Ekonomik Destek',
      icon: '💼',
      description: 'Meslek edindirme kursları ve iş bulma desteği.',
    },
    {
      title: 'Sağlık Hizmetleri',
      icon: '🏥',
      description: 'Fiziksel ve ruhsal sağlık hizmetlerine erişim desteği.',
    },
    {
      title: 'Çocuk Desteği',
      icon: '👶',
      description: 'Çocuklar için psikolojik destek ve eğitim hizmetleri.',
    },
  ];

  return (
    <div className="stats-page">
      {/* Hero Section */}
      <section className="section bg-light">
        <div className="container">
          <h1 className="section-title">İstatistikler ve Bilgiler</h1>
          <p className="text-center" style={{ 
            maxWidth: '800px', 
            margin: '0 auto 2rem',
            fontSize: '1.1rem',
            color: 'var(--text-secondary)'
          }}>
            Kadına yönelik şiddetle mücadelede destek hizmetleri ve önemli bilgiler.
          </p>
        </div>
      </section>

      {/* Main Stats */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Acil Yardım İstatistikleri</h2>
          <div className="grid grid-4">
            {mainStats.map((stat, index) => (
              <div key={index} className="fade-in" style={{ 
                animationDelay: `${index * 0.1}s` 
              }}>
                <StatCard stat={stat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Violence Types */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Şiddet Türleri</h2>
          <p className="text-center" style={{ 
            maxWidth: '700px', 
            margin: '0 auto 3rem',
            fontSize: '1.05rem',
            color: 'var(--text-secondary)'
          }}>
            Kadına yönelik şiddet farklı biçimlerde ortaya çıkabilir. 
            Tüm şiddet türlerini tanımak, onlarla mücadelede ilk adımdır.
          </p>
          
          <div className="grid grid-2" style={{ gap: '2rem' }}>
            {violenceTypes.map((type, index) => (
              <div key={index} className="fade-in" style={{ 
                animationDelay: `${index * 0.1}s`,
                padding: '2rem',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                border: '2px solid var(--primary-purple-light)'
              }}>
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1rem',
                  textAlign: 'center'
                }}>
                  {type.icon}
                </div>
                <h3 style={{ 
                  color: 'var(--primary-purple-dark)',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  fontSize: '1.5rem'
                }}>
                  {type.title}
                </h3>
                <p style={{ 
                  color: 'var(--text-secondary)',
                  marginBottom: '1.5rem',
                  lineHeight: '1.6',
                  textAlign: 'center'
                }}>
                  {type.description}
                </p>
                <div style={{
                  backgroundColor: 'rgba(139, 92, 246, 0.1)',
                  padding: '1rem',
                  borderRadius: '8px'
                }}>
                  <strong style={{ color: 'var(--primary-purple)' }}>Örnekler:</strong>
                  <ul style={{ 
                    marginTop: '0.5rem',
                    marginLeft: '1.5rem',
                    color: 'var(--text-secondary)'
                  }}>
                    {type.examples.map((example, idx) => (
                      <li key={idx} style={{ marginBottom: '0.25rem' }}>{example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Services */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Destek Hizmetleri</h2>
          <p className="text-center" style={{ 
            maxWidth: '700px', 
            margin: '0 auto 3rem',
            fontSize: '1.05rem',
            color: 'var(--text-secondary)'
          }}>
            Şiddet mağduru kadınlara sunulan kapsamlı destek hizmetleri.
          </p>
          
          <div className="grid grid-3">
            {supportServices.map((service, index) => (
              <div key={index} className="fade-in" style={{ 
                animationDelay: `${index * 0.1}s`,
                padding: '1.5rem',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                textAlign: 'center',
                border: '1px solid var(--light-gray)'
              }}>
                <div style={{ 
                  fontSize: '2.5rem', 
                  marginBottom: '1rem'
                }}>
                  {service.icon}
                </div>
                <h3 style={{ 
                  color: 'var(--primary-purple)',
                  marginBottom: '0.75rem',
                  fontSize: '1.25rem'
                }}>
                  {service.title}
                </h3>
                <p style={{ 
                  color: 'var(--text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: '1.6'
                }}>
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency CTA */}
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
            Yardıma İhtiyacın Var mı?
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255,255,255,0.95)',
            marginBottom: '2rem',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            ŞÖNİM merkezleri tüm bu hizmetleri ücretsiz olarak sunmaktadır. 
            Yardım almak için hemen ara.
          </p>
          <a 
            href="tel:183" 
            className="btn"
            style={{ 
              backgroundColor: 'white',
              color: 'var(--accent-orange)',
              fontSize: '1.5rem',
              padding: '1.25rem 2.5rem',
              fontWeight: '700'
            }}
          >
            📞 183 - Hemen Ara
          </a>
        </div>
      </section>
    </div>
  );
};

export default Stats;







