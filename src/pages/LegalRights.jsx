import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/global.css';
import '../styles/legal-rights.css';

const LegalRights = () => {
  const { t } = useLanguage();
  const [selectedSection, setSelectedSection] = useState(null);

  const rightsSections = [
    {
      id: 'istanbul',
      title: 'İstanbul Sözleşmesi',
      icon: '📜',
      color: '#8B5CF6',
      content: {
        description: 'Kadınlara Yönelik Şiddet ve Aile İçi Şiddetin Önlenmesi ve Bunlarla Mücadeleye Dair Avrupa Konseyi Sözleşmesi',
        keyPoints: [
          'Şiddetin her türlüsü kadınlara yönelik ayrımcılıktır',
          'Devletler şiddeti önlemekle yükümlüdür',
          'Mağdurlar korunmalı ve desteklenmelidir',
          'Şiddet failleri cezalandırılmalıdır',
          'Eğitim ve farkındalık çalışmaları yapılmalıdır'
        ],
        articles: [
          'Madde 1: Şiddetin tanımı ve kapsamı',
          'Madde 3: Şiddetin önlenmesi yükümlülüğü',
          'Madde 4: Mağdurların korunması',
          'Madde 5: Şiddet faillerinin cezalandırılması'
        ]
      }
    },
    {
      id: '6284',
      title: '6284 Sayılı Kanun',
      icon: '⚖️',
      color: '#10B981',
      content: {
        description: 'Ailenin Korunması ve Kadına Karşı Şiddetin Önlenmesine Dair Kanun',
        keyPoints: [
          'Koruma kararı alınabilir',
          'Geçici maddi yardım sağlanabilir',
          'Barınma desteği verilebilir',
          'Psikolojik ve hukuki destek sağlanır',
          'Şiddet uygulayan kişi uzaklaştırılabilir'
        ],
        articles: [
          'Madde 3: Koruma tedbirleri',
          'Madde 4: Önleme tedbirleri',
          'Madde 5: Acil koruma kararı',
          'Madde 8: Destek hizmetleri'
        ]
      }
    },
    {
      id: 'tck',
      title: 'Türk Ceza Kanunu',
      icon: '📋',
      color: '#EF4444',
      content: {
        description: 'Kadına yönelik şiddetle ilgili TCK maddeleri',
        keyPoints: [
          'Fiziksel şiddet cezalandırılır (TCK 86)',
          'Cinsel şiddet cezalandırılır (TCK 102)',
          'Tehdit suçtur (TCK 106)',
          'Hakaret suçtur (TCK 125)',
          'Zorla evlendirme suçtur (TCK 234)'
        ],
        articles: [
          'TCK 86: Kasten yaralama',
          'TCK 102: Cinsel saldırı',
          'TCK 106: Tehdit',
          'TCK 125: Hakaret',
          'TCK 234: Zorla evlendirme'
        ]
      }
    },
    {
      id: 'application',
      title: 'Başvuru Rehberi',
      icon: '📝',
      color: '#F59E0B',
      content: {
        description: 'Koruma kararı ve şikayet nasıl yapılır?',
        steps: [
          {
            step: 1,
            title: 'Şikayet Dilekçesi',
            description: 'En yakın Cumhuriyet Savcılığına veya Aile Mahkemesine başvuru yapabilirsiniz'
          },
          {
            step: 2,
            title: 'Koruma Kararı',
            description: 'Acil durumlarda 24 saat içinde geçici koruma kararı alınabilir'
          },
          {
            step: 3,
            title: 'Destek Hizmetleri',
            description: 'ŞÖNİM (183) üzerinden psikolojik, hukuki ve maddi destek alabilirsiniz'
          },
          {
            step: 4,
            title: 'Yasal Süreç',
            description: 'Dava sürecinde avukat desteği ve maddi yardım alabilirsiniz'
          }
        ]
      }
    }
  ];

  const handleSectionClick = (section) => {
    if (selectedSection?.id === section.id) {
      setSelectedSection(null);
    } else {
      setSelectedSection(section);
    }
  };

  return (
    <div className="legal-rights-page">
      {/* Hero Section */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, var(--primary-purple, #8B5CF6) 0%, var(--primary-purple-dark, #6D28D9) 100%)',
        color: 'white',
        padding: '3rem 0'
      }}>
        <div className="container">
          <h1 style={{ 
            color: 'white', 
            fontSize: '2.5rem', 
            textAlign: 'center',
            marginBottom: '1rem' 
          }}>
            ⚖️ Yasal Haklarım
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255,255,255,0.95)',
            maxWidth: '700px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            Haklarınızı öğrenin, koruma kararı alın, destek hizmetlerinden yararlanın.
          </p>
        </div>
      </section>

      {/* Rights Sections */}
      <section className="section">
        <div className="container">
          <div className="rights-grid">
            {rightsSections.map((section) => (
              <div
                key={section.id}
                className={`rights-card ${selectedSection?.id === section.id ? 'expanded' : ''}`}
                onClick={() => handleSectionClick(section)}
                style={{
                  '--section-color': section.color
                }}
              >
                <div className="rights-card-header">
                  <div className="rights-icon">{section.icon}</div>
                  <h3>{section.title}</h3>
                  <span className="expand-icon">
                    {selectedSection?.id === section.id ? '▼' : '▶'}
                  </span>
                </div>

                {selectedSection?.id === section.id && (
                  <div className="rights-card-content">
                    <p className="rights-description">{section.content.description}</p>

                    {section.content.keyPoints && (
                      <div className="key-points">
                        <h4>🔑 Önemli Noktalar:</h4>
                        <ul>
                          {section.content.keyPoints.map((point, index) => (
                            <li key={index}>{point}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section.content.articles && (
                      <div className="articles">
                        <h4>📚 İlgili Maddeler:</h4>
                        <ul>
                          {section.content.articles.map((article, index) => (
                            <li key={index}>{article}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section.content.steps && (
                      <div className="application-steps">
                        <h4>📋 Adım Adım:</h4>
                        {section.content.steps.map((step) => (
                          <div key={step.step} className="step-card">
                            <div className="step-number">{step.step}</div>
                            <div className="step-content">
                              <h5>{step.title}</h5>
                              <p>{step.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Help Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="emergency-help-card">
            <h2>🆘 Acil Yardım</h2>
            <p>Yasal haklarınızı kullanmak için yardım alın:</p>
            <div className="help-numbers">
              <a href="tel:183" className="help-number">
                📞 183 - ŞÖNİM (7/24 Ücretsiz)
              </a>
              <a href="tel:155" className="help-number">
                🚔 155 - Polis İmdat
              </a>
              <a href="tel:112" className="help-number">
                🏥 112 - Acil Sağlık
              </a>
            </div>
            <p className="help-note">
              <strong>Önemli:</strong> Şiddet mağduruysanız, hemen 183 numaralı hattı arayın veya en yakın 
              ŞÖNİM merkezine başvurun. Koruma kararı alabilir ve destek hizmetlerinden yararlanabilirsiniz.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalRights;

