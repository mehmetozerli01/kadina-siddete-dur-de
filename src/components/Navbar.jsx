import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';
import PrivacyMode from './PrivacyMode';
import '../styles/navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isDropdownItemActive = () => {
    const dropdownPaths = ['/live-stats', '/scenarios', '/violence-map', '/library', '/sosyal-paylaşım', '/güvenlik-planı', '/yasal-haklar'];
    return dropdownPaths.some(path => location.pathname === path);
  };

  const isChildrenActive = () => {
    return location.pathname.startsWith('/çocuklar');
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
          <span>{t('home.title')}</span>
        </Link>

        <div className="navbar-right">
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
                {t('navbar.home')}
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
                {t('navbar.about')}
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
                {t('navbar.news')}
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
                {t('navbar.stories')}
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
                {t('navbar.stats')}
              </Link>
            </li>
            <li className="navbar-item" role="none">
              <Link 
                to="/çocuklar" 
                className={`navbar-link ${isChildrenActive() ? 'active' : ''}`}
                onClick={closeMenu}
                role="menuitem"
                aria-current={isChildrenActive() ? 'page' : undefined}
              >
                👶 {t('navbar.children')}
              </Link>
            </li>
            {/* Dropdown Menu */}
            <li 
              className="navbar-item dropdown-container"
              onMouseEnter={() => !window.matchMedia('(max-width: 968px)').matches && setIsDropdownOpen(true)}
              onMouseLeave={() => !window.matchMedia('(max-width: 968px)').matches && setIsDropdownOpen(false)}
              role="none"
            >
              <button
                className={`navbar-link dropdown-trigger ${isDropdownItemActive() ? 'active' : ''}`}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
                onClick={() => {
                  if (window.matchMedia('(max-width: 968px)').matches) {
                    setIsDropdownOpen(!isDropdownOpen);
                  }
                }}
              >
                🛠️ {t('navbar.tools')}
                <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
              </button>
              <ul 
                className={`dropdown-menu ${isDropdownOpen ? 'open' : ''}`}
                role="menu"
              >
                <li role="none">
                  <Link
                    to="/live-stats"
                    className={`dropdown-item ${isActive('/live-stats') ? 'active' : ''}`}
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    <span className="dropdown-icon">📊</span>
                    <span>{t('navbar.liveStats')}</span>
                  </Link>
                </li>
                <li role="none">
                  <Link
                    to="/scenarios"
                    className={`dropdown-item ${isActive('/scenarios') ? 'active' : ''}`}
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    <span className="dropdown-icon">🎭</span>
                    <span>{t('navbar.scenarios')}</span>
                  </Link>
                </li>
                <li role="none">
                  <Link
                    to="/violence-map"
                    className={`dropdown-item ${isActive('/violence-map') ? 'active' : ''}`}
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    <span className="dropdown-icon">🗺️</span>
                    <span>{t('navbar.violenceMap')}</span>
                  </Link>
                </li>
                <li role="none">
                  <Link
                    to="/library"
                    className={`dropdown-item ${isActive('/library') ? 'active' : ''}`}
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    <span className="dropdown-icon">📚</span>
                    <span>{t('navbar.library')}</span>
                  </Link>
                </li>
                <li role="none" className="dropdown-divider"></li>
                <li role="none">
                  <Link
                    to="/sosyal-paylaşım"
                    className={`dropdown-item ${isActive('/sosyal-paylaşım') ? 'active' : ''}`}
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    <span className="dropdown-icon">📱</span>
                    <span>{t('navbar.socialShare')}</span>
                  </Link>
                </li>
                <li role="none">
                  <Link
                    to="/güvenlik-planı"
                    className={`dropdown-item ${isActive('/güvenlik-planı') ? 'active' : ''}`}
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    <span className="dropdown-icon">🛡️</span>
                    <span>{t('navbar.safetyPlan')}</span>
                  </Link>
                </li>
                <li role="none">
                  <Link
                    to="/yasal-haklar"
                    className={`dropdown-item ${isActive('/yasal-haklar') ? 'active' : ''}`}
                    onClick={closeMenu}
                    role="menuitem"
                  >
                    <span className="dropdown-icon">⚖️</span>
                    <span>Yasal Haklar</span>
                  </Link>
                </li>
              </ul>
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
                🆘 {t('navbar.help')}
              </Link>
            </li>
          </ul>
          
          {/* Dil Değiştirici - Menü Dışında */}
          <div className="navbar-language-wrapper">
            <PrivacyMode />
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
          
          {/* Mobile Menu Toggle */}
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
        </div>
        
        {/* Mobil Menüde Dil Değiştirici */}
        {isMenuOpen && (
          <div className="mobile-language-wrapper">
            <LanguageSwitcher />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


