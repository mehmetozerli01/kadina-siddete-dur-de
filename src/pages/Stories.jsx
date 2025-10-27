import React from 'react';
import StoryCard from '../components/StoryCard';
import storiesData from '../assets/data/stories.json';
import '../styles/global.css';

const Stories = () => {
  return (
    <div className="stories-page">
      {/* Hero Section */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, var(--primary-purple-dark) 0%, var(--primary-purple) 100%)',
        color: 'white',
        padding: '4rem 0'
      }}>
        <div className="container">
          <h1 style={{ 
            color: 'white', 
            fontSize: '2.5rem', 
            textAlign: 'center',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}>
            💜 Umut Hikayeleri
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255,255,255,0.95)',
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center',
            lineHeight: '1.8'
          }}>
            Şiddetten kurtulmuş kadınların cesaret, dayanışma ve umut dolu hikayeleri. 
            Bu hikayeler, yalnız olmadığınızı ve değişimin mümkün olduğunu gösteriyor.
          </p>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: '2rem' }}>
            {storiesData.map((story, index) => (
              <div key={story.id} className="fade-in" style={{ 
                animationDelay: `${index * 0.1}s` 
              }}>
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="section bg-light">
        <div className="container">
          <div style={{ 
            maxWidth: '900px', 
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 className="section-title">Sen de Yalnız Değilsin</h2>
            <p style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.8',
              color: 'var(--text-secondary)',
              marginBottom: '2rem'
            }}>
              Her kadın güçlüdür ve şiddetsiz bir yaşamı hak eder. 
              Yardıma ihtiyacın varsa, destek almak için cesaret göstermekten çekinme. 
              Birçok kadın bu yolu geçti ve yeni bir hayata başladı. Sen de yapabilirsin.
            </p>
            
            <div style={{
              padding: '2rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ 
                color: 'var(--accent-orange)',
                marginBottom: '1rem',
                fontSize: '1.5rem'
              }}>
                🆘 Acil Durumda
              </h3>
              <p style={{ 
                fontSize: '2.5rem', 
                fontWeight: '700',
                color: 'var(--primary-purple)',
                marginBottom: '0.5rem'
              }}>
                183
              </p>
              <p style={{ color: 'var(--text-secondary)' }}>
                7/24 Ücretsiz ve Gizli Destek Hattı
              </p>
              <a 
                href="tel:183" 
                className="btn btn-primary mt-md"
                style={{ display: 'inline-block' }}
              >
                Hemen Ara
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Notice */}
      <section className="section">
        <div className="container">
          <div style={{
            padding: '2rem',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            borderRadius: '12px',
            border: '2px solid var(--primary-purple-light)',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            <h3 style={{ 
              color: 'var(--primary-purple-dark)',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              🔒 Gizlilik ve Güvenlik
            </h3>
            <p style={{ 
              textAlign: 'center',
              color: 'var(--text-secondary)',
              lineHeight: '1.8'
            }}>
              Burada paylaşılan tüm hikayeler, kişilerin mahremiyetini korumak 
              amacıyla anonim hale getirilmiştir. İsimler değiştirilmiş ve 
              tanınmayı engelleyecek düzenlemeler yapılmıştır. Sizin de hikayeleri 
              paylaşmak isterseniz, gizliliğiniz kesinlikle korunacaktır.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Stories;







