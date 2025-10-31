import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/back-to-top.css';

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label={t('backToTop.ariaLabel')}
          title={t('backToTop.title')}
        >
          <span className="back-to-top-icon">↑</span>
        </button>
      )}
    </>
  );
};

export default BackToTop;
