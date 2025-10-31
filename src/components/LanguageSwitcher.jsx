import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/language-switcher.css';

const LanguageSwitcher = () => {
  const { language, changeLanguage, languages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Dış tıklamada kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="language-switcher" ref={dropdownRef}>
      <button
        className="language-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Dil değiştir"
        aria-expanded={isOpen}
      >
        <span className="language-flag">{currentLanguage.flag}</span>
        <span className="language-name">{currentLanguage.name}</span>
        <span className="language-arrow">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="language-dropdown">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`language-option ${language === lang.code ? 'active' : ''}`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <span className="language-flag">{lang.flag}</span>
              <span className="language-name">{lang.name}</span>
              {language === lang.code && (
                <span className="language-check">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;

