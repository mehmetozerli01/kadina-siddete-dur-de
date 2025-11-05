import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/privacy-settings.css';

const PrivacySettings = () => {
  const { t } = useLanguage();
  const [autoCleanupEnabled, setAutoCleanupEnabled] = useState(false);
  const [autoCleanupMinutes, setAutoCleanupMinutes] = useState(30);

  useEffect(() => {
    // Ayarları localStorage'dan yükle
    const enabled = localStorage.getItem('autoCleanupEnabled') === 'true';
    const minutes = parseInt(localStorage.getItem('autoCleanupMinutes') || '30', 10);
    
    setAutoCleanupEnabled(enabled);
    setAutoCleanupMinutes(minutes);
  }, []);

  const handleToggle = (enabled) => {
    setAutoCleanupEnabled(enabled);
    localStorage.setItem('autoCleanupEnabled', enabled.toString());
  };

  const handleMinutesChange = (minutes) => {
    setAutoCleanupMinutes(minutes);
    localStorage.setItem('autoCleanupMinutes', minutes.toString());
  };

  const handleClearHistory = () => {
    const confirm = window.confirm(
      'Tüm geçmişi temizlemek istediğinize emin misiniz? Bu işlem geri alınamaz.'
    );
    
    if (confirm) {
      try {
        sessionStorage.clear();
        const sensitiveKeys = ['violence_logs_metadata', 'recent_searches', 'visited_pages'];
        sensitiveKeys.forEach(key => {
          localStorage.removeItem(key);
        });
        alert('Geçmiş temizlendi.');
      } catch (error) {
        console.error('Geçmiş temizleme hatası:', error);
        alert('Geçmiş temizlenirken bir hata oluştu.');
      }
    }
  };

  return (
    <div className="privacy-settings">
      <h2 className="settings-title">🔒 Gizlilik Ayarları</h2>
      
      <div className="settings-section">
        <div className="setting-item">
          <div className="setting-info">
            <h3>Otomatik Geçmiş Temizleme</h3>
            <p>Belirli aralıklarla otomatik olarak geçmişi temizler</p>
          </div>
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={autoCleanupEnabled}
              onChange={(e) => handleToggle(e.target.checked)}
            />
            <span className="toggle-slider"></span>
          </label>
        </div>

        {autoCleanupEnabled && (
          <div className="setting-item">
            <div className="setting-info">
              <h3>Temizleme Aralığı</h3>
              <p>Kaç dakikada bir temizleme yapılacak?</p>
            </div>
            <div className="minutes-selector">
              <button
                className={`minute-btn ${autoCleanupMinutes === 15 ? 'active' : ''}`}
                onClick={() => handleMinutesChange(15)}
              >
                15 dk
              </button>
              <button
                className={`minute-btn ${autoCleanupMinutes === 30 ? 'active' : ''}`}
                onClick={() => handleMinutesChange(30)}
              >
                30 dk
              </button>
              <button
                className={`minute-btn ${autoCleanupMinutes === 60 ? 'active' : ''}`}
                onClick={() => handleMinutesChange(60)}
              >
                60 dk
              </button>
            </div>
          </div>
        )}

        <div className="setting-item">
          <div className="setting-info">
            <h3>Manuel Geçmiş Temizleme</h3>
            <p>Hemen tüm geçmişi temizle</p>
          </div>
          <button className="clear-btn" onClick={handleClearHistory}>
            Geçmişi Temizle
          </button>
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h3>Gizli Mod Hakkında</h3>
            <p>Gizli mod aktifken:</p>
            <ul className="info-list">
              <li>✓ Geçmiş otomatik temizlenir</li>
              <li>✓ Hassas veriler saklanmaz</li>
              <li>✓ URL'ye #safe ekleyerek gizli erişim</li>
              <li>✓ Hızlı çıkış butonu ile anında çıkış</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacySettings;

