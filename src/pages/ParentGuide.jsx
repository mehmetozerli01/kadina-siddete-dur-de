import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/children.css';
import '../styles/global.css';

const ParentGuide = () => {
  const topics = [
    {
      title: 'Çocuklarla Şiddet Hakkında Konuşmak',
      icon: '💬',
      content: [
        'Yaşlarına uygun bir dil kullanın',
        'Korkutmak yerine güçlendirin',
        'Sorularını dürüstçe cevaplayın',
        'Güvenli bir ortam yaratın'
      ]
    },
    {
      title: 'Çocukları Güvende Tutmak',
      icon: '🛡️',
      content: [
        'Güvenli yerler ve kişiler hakkında konuşun',
        'Sınırlar koymayı öğretin',
        'Yardım istemeyi öğretin',
        'Acil durum planı yapın'
      ]
    },
    {
      title: 'Duyguları Anlamak',
      icon: '😊',
      content: [
        'Çocukların duygularını kabul edin',
        'Duygularını ifade etmelerine izin verin',
        'Empati kurun',
        'Profesyonel destek alın gerekirse'
      ]
    },
    {
      title: 'Şiddetten Etkilenen Çocuklar',
      icon: '💜',
      content: [
        'İşaretleri tanıyın (davranış değişiklikleri, korkular)',
        'Güvenli bir ortam sağlayın',
        'Psikolojik destek alın',
        'Sabırlı olun, iyileşme zaman alır'
      ]
    },
    {
      title: 'Kaynaklar ve Destek',
      icon: '📚',
      content: [
        'ŞÖNİM merkezleri (183)',
        'Çocuk psikiyatristleri',
        'Okul rehberlik servisleri',
        'Aile danışmanlık merkezleri'
      ]
    }
  ];

  return (
    <div className="parent-guide-page">
      <section className="children-hero" style={{ 
        background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
        padding: '3rem 0'
      }}>
        <div className="container">
          <h1 className="hero-title" style={{ color: 'white' }}>
            👨‍👩‍👧 Ebeveyn Rehberi
          </h1>
          <p className="hero-subtitle" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Çocuklarınızla güvenlik ve şiddet hakkında konuşmak için rehber
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="guide-intro">
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#666' }}>
              Bu rehber, çocuklarınızla güvenlik, sınırlar ve duygular hakkında 
              konuşmanıza yardımcı olmak için hazırlanmıştır. Çocukların güvenli 
              ve sağlıklı büyümesi için bu konuşmalar çok önemlidir.
            </p>
          </div>

          <div className="guide-topics">
            {topics.map((topic, index) => (
              <div key={index} className="guide-topic-card">
                <div className="topic-header">
                  <div className="topic-icon">{topic.icon}</div>
                  <h2 className="topic-title">{topic.title}</h2>
                </div>
                <ul className="topic-list">
                  {topic.content.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#F9FAFB' }}>
        <div className="container">
          <div className="guide-resources">
            <h2 className="section-title">Yardımcı Kaynaklar</h2>
            <div className="resources-grid">
              <div className="resource-card">
                <div className="resource-icon">📞</div>
                <h3>ŞÖNİM Hattı</h3>
                <p>7/24 ücretsiz destek</p>
                <a href="tel:183" className="resource-link">183</a>
              </div>
              <div className="resource-card">
                <div className="resource-icon">👶</div>
                <h3>Çocuk Modülü</h3>
                <p>Çocuklar için içerikler</p>
                <Link to="/çocuklar" className="resource-link">Ziyaret Et →</Link>
              </div>
              <div className="resource-card">
                <div className="resource-icon">📚</div>
                <h3>Kaynak Kütüphanesi</h3>
                <p>Eğitim materyalleri</p>
                <Link to="/library" className="resource-link">İncele →</Link>
              </div>
              <div className="resource-card">
                <div className="resource-icon">🆘</div>
                <h3>Acil Yardım</h3>
                <p>Tüm acil numaralar</p>
                <Link to="/help" className="resource-link">Görüntüle →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="important-notice">
            <div className="notice-icon">⚠️</div>
            <div className="notice-content">
              <h3>Önemli Not</h3>
              <p>
                Eğer çocuğunuz şiddete maruz kalıyorsa veya şiddete tanık oluyorsa, 
                derhal profesyonel yardım alın. 183 numaralı ŞÖNİM hattını arayabilir 
                veya en yakın ŞÖNİM merkezine başvurabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ParentGuide;

