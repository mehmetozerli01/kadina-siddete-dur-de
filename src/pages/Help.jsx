import React from 'react';
import '../styles/global.css';
import '../styles/cards.css';

const Help = () => {
  const helplines = [
    {
      icon: '📞',
      title: 'ALO 183 - ŞÖNİM',
      description: 'Şiddet Önleme ve İzleme Merkezi. Kadına yönelik şiddet vakalarında 7/24 destek hattı.',
      phone: '183',
      hours: '7 Gün 24 Saat',
    },
    {
      icon: '🚔',
      title: 'Polis İmdat',
      description: 'Acil durumlarda kolluk kuvvetlerine ulaşmak için arayınız.',
      phone: '155',
      hours: '7 Gün 24 Saat',
    },
    {
      icon: '🏥',
      title: 'Sağlık Acil',
      description: 'Acil sağlık durumlarında ambulans ve sağlık hizmetleri.',
      phone: '112',
      hours: '7 Gün 24 Saat',
    },
    {
      icon: '👮',
      title: 'Jandarma İmdat',
      description: 'Kırsal bölgelerde acil durumlarda jandarma yardımı.',
      phone: '156',
      hours: '7 Gün 24 Saat',
    },
    {
      icon: '⚖️',
      title: 'Adli Yardım',
      description: 'Hukuki danışmanlık ve adli yardım hizmetleri.',
      phone: '155',
      hours: 'Mesai Saatleri',
    },
    {
      icon: '💬',
      title: 'ALO 183 Psikolojik Destek',
      description: 'Profesyonel psikologlar eşliğinde psikolojik destek ve danışmanlık.',
      phone: '183',
      hours: '7 Gün 24 Saat',
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
            🆘 Acil Yardım Hatları
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            color: 'rgba(255,255,255,0.95)',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Sen yalnız değilsin. Yardım almak için aşağıdaki numaraları arayabilirsin.
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
          <h2 className="section-title">Önemli Bilgiler</h2>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div style={{
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              marginBottom: '1.5rem'
            }}>
              <h3 style={{ color: 'var(--primary-purple)', marginBottom: '1rem' }}>
                🔒 Gizlilik Garantisi
              </h3>
              <p style={{ lineHeight: '1.8' }}>
                Tüm yardım hatları tamamen gizlidir. Kimlik bilgileriniz ve 
                paylaştığınız bilgiler kesinlikle gizli tutulur. İzniniz olmadan 
                hiçbir bilgi üçüncü şahıslarla paylaşılmaz.
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
                💰 Ücretsiz Hizmet
              </h3>
              <p style={{ lineHeight: '1.8' }}>
                Tüm yardım hatları tamamen ücretsizdir. Cep telefonundan veya 
                ankesörlü telefondan aradığınızda herhangi bir ücret ödemeniz 
                gerekmez.
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
                🏢 ŞÖNİM Merkezleri
              </h3>
              <p style={{ lineHeight: '1.8' }}>
                Şiddet Önleme ve İzleme Merkezleri (ŞÖNİM), Türkiye'nin 81 ilinde 
                hizmet vermektedir. Bu merkezlerde psikolojik destek, sosyal hizmet 
                desteği ve hukuki danışmanlık hizmetleri ücretsiz olarak sunulmaktadır.
              </p>
            </div>

            <div style={{
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ color: 'var(--primary-purple)', marginBottom: '1rem' }}>
                🏠 Kadın Sığınma Evleri
              </h3>
              <p style={{ lineHeight: '1.8' }}>
                Şiddet mağduru kadınlar ve çocukları için güvenli barınma imkanı 
                sunan sığınma evleri mevcuttur. Bu evlerde kalma süresi boyunca 
                barınma, beslenme, psikolojik destek ve çocuklar için eğitim 
                hizmetleri sağlanır. Başvuru için 183'ü arayabilirsiniz.
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
            Acil Durumda Hemen Ara
          </h2>
          <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.95)', marginBottom: '2rem' }}>
            Hayatın tehlikede ise 155'i, destek almak istiyorsan 183'ü ara.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="tel:155" 
              className="btn btn-emergency"
              style={{ fontSize: '1.3rem', padding: '1rem 2rem' }}
            >
              📞 155 - POLİS
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







