import React from 'react';
import '../styles/global.css';

const About = () => {
  return (
    <div className="about-page">
      <section className="section bg-light">
        <div className="container">
          <h1 className="section-title">Hakkımızda</h1>
          
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div className="fade-in">
              <h2 className="text-purple mb-md">Biz Kimiz?</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                "Kadına Şiddete Dur De" platformu, kadına yönelik şiddetle mücadelede 
                farkındalık oluşturmak ve mağdur kadınlara destek olmak amacıyla 
                kurulmuş bir toplumsal sorumluluk projesidir. Amacımız, kadınların 
                şiddetsiz bir yaşam sürmelerini sağlamak ve toplumsal cinsiyet 
                eşitliğinin gerçekleşmesine katkıda bulunmaktır.
              </p>
            </div>

            <div className="fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-purple mb-md">Misyonumuz</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                Kadına yönelik şiddetin her türlüsüne karşı mücadele etmek, toplumsal 
                farkındalık oluşturmak ve mağdur kadınlara kapsamlı destek hizmetleri 
                sunmaktır. Kadınların ekonomik, sosyal ve psikolojik olarak güçlenmelerini 
                destekliyor, yasal haklarını savunuyoruz.
              </p>
            </div>

            <div className="fade-in" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-purple mb-md">Vizyonumuz</h2>
              <p style={{ fontSize: '1.1rem', lineHeight: '1.8', marginBottom: '2rem' }}>
                Kadına yönelik şiddetin olmadığı, toplumsal cinsiyet eşitliğinin tam 
                anlamıyla sağlandığı, her kadının güvenle ve onurla yaşayabildiği bir 
                toplum oluşturmak.
              </p>
            </div>

            <div className="fade-in" style={{ animationDelay: '0.6s' }}>
              <h2 className="text-purple mb-md">Değerlerimiz</h2>
              <div className="grid grid-2" style={{ gap: '1.5rem', marginTop: '1.5rem' }}>
                <div style={{ 
                  padding: '1.5rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ color: 'var(--primary-purple)', marginBottom: '1rem' }}>
                    💜 İnsan Hakları
                  </h3>
                  <p>
                    Her kadının temel insan haklarına saygı gösterir ve bu hakların 
                    korunmasını savunuruz.
                  </p>
                </div>
                
                <div style={{ 
                  padding: '1.5rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ color: 'var(--primary-purple)', marginBottom: '1rem' }}>
                    🤝 Dayanışma
                  </h3>
                  <p>
                    Kadınlar arasında dayanışmayı ve birlikte güçlenmeyi destekleriz.
                  </p>
                </div>
                
                <div style={{ 
                  padding: '1.5rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ color: 'var(--primary-purple)', marginBottom: '1rem' }}>
                    🔒 Gizlilik
                  </h3>
                  <p>
                    Mağdur kadınların mahremiyetini ve güvenliğini her şeyin üstünde 
                    tutarız.
                  </p>
                </div>
                
                <div style={{ 
                  padding: '1.5rem', 
                  backgroundColor: 'white', 
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ color: 'var(--primary-purple)', marginBottom: '1rem' }}>
                    ⚖️ Eşitlik
                  </h3>
                  <p>
                    Toplumsal cinsiyet eşitliğini savunur ve her türlü ayrımcılığa 
                    karşı mücadele ederiz.
                  </p>
                </div>
              </div>
            </div>

            <div className="fade-in" style={{ 
              animationDelay: '0.8s',
              marginTop: '3rem',
              padding: '2rem',
              backgroundColor: 'var(--primary-purple)',
              color: 'white',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <h2 style={{ color: 'white', marginBottom: '1rem' }}>
                Birlikte Daha Güçlüyüz
              </h2>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.95)' }}>
                Kadına yönelik şiddetle mücadele hepimizin sorumluluğudur. 
                Farkındalık yaratarak, destek olarak ve sesimizi yükselterek 
                değişimi birlikte başarabiliriz.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;







