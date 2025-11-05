import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/privacy-mode.css';

const PrivacyMode = () => {
  const { t } = useLanguage();
  const [isActive, setIsActive] = useState(false);
  const [autoCleanupInterval, setAutoCleanupInterval] = useState(null);

  // Geçmiş temizle
  const clearHistory = useCallback(() => {
    try {
      // Tarayıcı geçmişini temizlemek için mümkün olanları yap
      // Not: Modern tarayıcılarda tam geçmiş temizleme sınırlıdır
      
      // Session storage temizle
      sessionStorage.clear();
      
      // Belirli localStorage item'larını temizle (güvenlik için)
      const sensitiveKeys = ['violence_logs_metadata', 'recent_searches', 'visited_pages'];
      sensitiveKeys.forEach(key => {
        if (localStorage.getItem(key)) {
          localStorage.removeItem(key);
        }
      });

      // IndexedDB temizleme (opsiyonel, kullanıcıya sormalı)
      // Şimdilik sadece metadata temizliyoruz
    } catch (error) {
      console.error('Geçmiş temizleme hatası:', error);
    }
  }, []);

  // Otomatik temizleme başlat
  const startAutoCleanup = useCallback((minutes) => {
    // Önceki interval'i temizle
    setAutoCleanupInterval(prev => {
      if (prev) {
        clearInterval(prev);
      }
      return null;
    });

    const interval = setInterval(() => {
      clearHistory();
      
      // Kullanıcıya bildirim göster (opsiyonel)
      console.log('Otomatik geçmiş temizleme yapıldı');
    }, minutes * 60 * 1000); // Dakikayı milisaniyeye çevir

    setAutoCleanupInterval(interval);
  }, [clearHistory]);

  // Gizli modu aktif et
  const activatePrivacyMode = useCallback(() => {
    setIsActive(true);
    localStorage.setItem('privacyMode', 'true');
    
    // Geçmiş temizle
    clearHistory();
    
    // Otomatik temizleme başlat
    const autoCleanupEnabled = localStorage.getItem('autoCleanupEnabled') === 'true';
    const autoCleanupMinutes = parseInt(localStorage.getItem('autoCleanupMinutes') || '30', 10);
    
    if (autoCleanupEnabled) {
      startAutoCleanup(autoCleanupMinutes);
    }
  }, [clearHistory, startAutoCleanup]);

  // Gizli modu deaktif et
  const deactivatePrivacyMode = useCallback(() => {
    setIsActive(false);
    localStorage.setItem('privacyMode', 'false');
    
    // Otomatik temizlemeyi durdur
    setAutoCleanupInterval(prev => {
      if (prev) {
        clearInterval(prev);
      }
      return null;
    });
  }, []);

  // Toggle gizli mod
  const togglePrivacyMode = useCallback(() => {
    if (isActive) {
      const confirmExit = window.confirm(
        'Gizli modu kapatmak istediğinize emin misiniz? Geçmiş temizlenecek.'
      );
      if (confirmExit) {
        deactivatePrivacyMode();
      }
    } else {
      activatePrivacyMode();
    }
  }, [isActive, activatePrivacyMode, deactivatePrivacyMode]);

  // localStorage'dan gizli mod durumunu yükle
  useEffect(() => {
    const checkPrivacyMode = () => {
      const privacyMode = localStorage.getItem('privacyMode') === 'true';
      setIsActive(privacyMode);

      // URL'de #safe varsa gizli modu aktif et
      if (window.location.hash === '#safe') {
        activatePrivacyMode();
      }

      // Otomatik temizleme ayarlarını yükle
      const autoCleanupEnabled = localStorage.getItem('autoCleanupEnabled') === 'true';
      const autoCleanupMinutes = parseInt(localStorage.getItem('autoCleanupMinutes') || '30', 10);

      if (autoCleanupEnabled && privacyMode) {
        startAutoCleanup(autoCleanupMinutes);
      }
    };

    checkPrivacyMode();

    // localStorage değişikliklerini dinle (diğer sekmelerden)
    const handleStorageChange = (e) => {
      if (e.key === 'privacyMode') {
        checkPrivacyMode();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [activatePrivacyMode, startAutoCleanup]);

  // Component unmount olduğunda temizle
  useEffect(() => {
    return () => {
      setAutoCleanupInterval(prev => {
        if (prev) {
          clearInterval(prev);
        }
        return null;
      });
    };
  }, []);

  return (
    <div className="privacy-mode-container">
      <button
        className={`privacy-mode-btn ${isActive ? 'active' : ''}`}
        onClick={togglePrivacyMode}
        title={isActive ? 'Gizli Mod Aktif' : 'Gizli Modu Aktif Et'}
        aria-label={isActive ? 'Gizli Modu Kapat' : 'Gizli Modu Aç'}
      >
        <span className="privacy-mode-icon">
          {isActive ? '🔒' : '🔓'}
        </span>
      {isActive && (
        <span className="privacy-mode-indicator" aria-label="Gizli Mod Aktif"></span>
      )}
      </button>
    </div>
  );
};

export default PrivacyMode;

