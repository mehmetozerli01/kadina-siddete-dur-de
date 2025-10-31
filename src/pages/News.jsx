import React from 'react';
import NewsCard from '../components/NewsCard';
import newsData from '../assets/data/news.json';
import '../styles/global.css';

const News = () => {
  return (
    <div className="news-page">
      {/* Hero Section */}
      <section className="section bg-light">
        <div className="container">
          <h1 className="section-title">Haberler ve Güncel Gelişmeler</h1>
          <p className="text-center" style={{ 
            maxWidth: '700px', 
            margin: '0 auto 2rem',
            fontSize: '1.1rem',
            color: 'var(--text-secondary)'
          }}>
            Kadına yönelik şiddetle mücadele alanındaki güncel haberler, 
            gelişmeler ve önemli duyurular.
          </p>
        </div>
      </section>

      {/* News Grid */}
      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {newsData.map((news, index) => (
              <div key={news.id} className="fade-in" style={{ 
                animationDelay: `${index * 0.1}s` 
              }}>
                <NewsCard news={news} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-purple-light) 100%)',
        color: 'white'
      }}>
        <div className="container">
          <div style={{ 
            textAlign: 'center',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h2 style={{ color: 'white', marginBottom: '1rem' }}>
              Bilgi Güçtür
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: 'rgba(255,255,255,0.95)',
              lineHeight: '1.8'
            }}>
              Kadına yönelik şiddetle mücadelede farkındalık oluşturmak çok önemlidir. 
              Güncel gelişmeleri takip ederek, yasal haklarınızı öğrenerek ve 
              destek mekanizmalarını bilerek daha güçlü olabilirsiniz.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default News;











