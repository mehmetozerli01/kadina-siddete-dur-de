import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/quick-exit.css';

const QuickExit = () => {
  const { t } = useLanguage();

  const handleQuickExit = () => {
    // Gizli görünüm için Google'a yönlendir (normal bir sayfa gibi görünsün)
    window.location.href = 'https://www.google.com';
    
    // Tarayıcı geçmişini temizleme (güvenlik için)
    // Not: Bu modern tarayıcılarda kısıtlıdır, ancak deneme yapılabilir
    try {
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', 'https://www.google.com');
      }
    } catch (e) {
      // Sessizce hata yok say
    }
  };

  return (
    <button
      className="quick-exit-btn"
      onClick={handleQuickExit}
      onDoubleClick={handleQuickExit}
      aria-label={t('quickExit.buttonLabel')}
      title={t('quickExit.tooltip')}
    >
      <span className="quick-exit-icon">🚪</span>
    </button>
  );
};

export default QuickExit;
