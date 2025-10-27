import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Hakkımızda */}
          <div className="footer-section">
            <div className="footer-logo">💜 Kadına Şiddete Dur De</div>
            <p className="footer-description">
              Kadına yönelik şiddete karşı farkındalık oluşturmak ve 
              yardıma ihtiyacı olan kadınlara destek olmak için buradayız.
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon" aria-label="Facebook">📘</a>
              <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
              <a href="#" className="social-icon" aria-label="Instagram">📷</a>
              <a href="#" className="social-icon" aria-label="LinkedIn">💼</a>
            </div>
          </div>

          {/* Hızlı Linkler */}
          <div className="footer-section">
            <h3>Hızlı Linkler</h3>
            <Link to="/">Ana Sayfa</Link>
            <Link to="/about">Hakkımızda</Link>
            <Link to="/news">Haberler</Link>
            <Link to="/stories">Hikayeler</Link>
            <Link to="/stats">İstatistikler</Link>
            <Link to="/help">Yardım Hatları</Link>
          </div>

          {/* Kaynaklar */}
          <div className="footer-section">
            <h3>Kaynaklar</h3>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Şiddetle Mücadele Rehberi
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Yasal Haklarınız
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Destek Kuruluşları
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Sıkça Sorulan Sorular
            </a>
          </div>

          {/* Acil Durum */}
          <div className="footer-section">
            <div className="emergency-contacts">
              <h3>🆘 Acil Durum</h3>
              <p>7/24 Yardım Hattı</p>
              <a href="tel:183" className="emergency-number">183</a>
              <p style={{fontSize: '0.9rem', marginTop: '1rem'}}>
                ALO Şiddet Hattı<br/>
                (ŞÖNİM - Şiddet Önleme ve İzleme Merkezi)
              </p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; {currentYear} Kadına Şiddete Dur De. Tüm hakları saklıdır.
          </p>
          <p>
            Bu proje farkındalık oluşturmak amacıyla geliştirilmiştir. 
            Acil durumlarda lütfen <a href="tel:183">183</a> veya <a href="tel:155">155</a> numaralarını arayın.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


