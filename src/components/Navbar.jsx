import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Ana navigasyon">
      <div className="navbar-container">
        <Link 
          to="/" 
          className="navbar-logo" 
          onClick={closeMenu}
          aria-label="Ana sayfaya git - Kadına Şiddete Dur De"
        >
          <span className="logo-icon" aria-hidden="true">💜</span>
          <span>Kadına Şiddete Dur De</span>
        </Link>

        <button 
          className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          aria-expanded={isMenuOpen}
          aria-controls="navbar-menu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>

        <ul 
          className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}
          id="navbar-menu"
          role="menubar"
        >
          <li className="navbar-item" role="none">
            <Link 
              to="/" 
              className={`navbar-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMenu}
              role="menuitem"
              aria-current={isActive('/') ? 'page' : undefined}
            >
              Ana Sayfa
            </Link>
          </li>
          <li className="navbar-item" role="none">
            <Link 
              to="/about" 
              className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
              onClick={closeMenu}
              role="menuitem"
              aria-current={isActive('/about') ? 'page' : undefined}
            >
              Hakkımızda
            </Link>
          </li>
          <li className="navbar-item" role="none">
            <Link 
              to="/news" 
              className={`navbar-link ${isActive('/news') ? 'active' : ''}`}
              onClick={closeMenu}
              role="menuitem"
              aria-current={isActive('/news') ? 'page' : undefined}
            >
              Haberler
            </Link>
          </li>
          <li className="navbar-item" role="none">
            <Link 
              to="/stories" 
              className={`navbar-link ${isActive('/stories') ? 'active' : ''}`}
              onClick={closeMenu}
              role="menuitem"
              aria-current={isActive('/stories') ? 'page' : undefined}
            >
              Hikayeler
            </Link>
          </li>
          <li className="navbar-item" role="none">
            <Link 
              to="/stats" 
              className={`navbar-link ${isActive('/stats') ? 'active' : ''}`}
              onClick={closeMenu}
              role="menuitem"
              aria-current={isActive('/stats') ? 'page' : undefined}
            >
              İstatistikler
            </Link>
          </li>
          <li className="navbar-item" role="none">
            <Link 
              to="/live-stats" 
              className={`navbar-link live-stats ${isActive('/live-stats') ? 'active' : ''}`}
              onClick={closeMenu}
              role="menuitem"
              aria-current={isActive('/live-stats') ? 'page' : undefined}
            >
              📊 Canlı Veriler
            </Link>
          </li>
          <li className="navbar-item" role="none">
            <Link 
              to="/scenarios" 
              className={`navbar-link scenarios ${isActive('/scenarios') ? 'active' : ''}`}
              onClick={closeMenu}
              role="menuitem"
              aria-current={isActive('/scenarios') ? 'page' : undefined}
            >
              🎭 Senaryo Oyunu
            </Link>
          </li>
          <li className="navbar-item" role="none">
            <Link 
              to="/violence-map" 
              className={`navbar-link violence-map ${isActive('/violence-map') ? 'active' : ''}`}
              onClick={closeMenu}
              role="menuitem"
              aria-current={isActive('/violence-map') ? 'page' : undefined}
            >
              🗺️ Şiddet Haritası
            </Link>
          </li>
          <li className="navbar-item" role="none">
            <Link 
              to="/library" 
              className={`navbar-link library ${isActive('/library') ? 'active' : ''}`}
              onClick={closeMenu}
              role="menuitem"
              aria-current={isActive('/library') ? 'page' : undefined}
            >
              📚 Kaynaklar
            </Link>
          </li>
          <li className="navbar-item" role="none">
            <Link 
              to="/help" 
              className={`navbar-link emergency ${isActive('/help') ? 'active' : ''}`}
              onClick={closeMenu}
              role="menuitem"
              aria-current={isActive('/help') ? 'page' : undefined}
              aria-label="Acil yardım hatları - 183"
            >
              🆘 Acil Yardım
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;


