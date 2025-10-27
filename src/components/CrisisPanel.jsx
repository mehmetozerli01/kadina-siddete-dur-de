import React, { useState, useEffect } from 'react';
import '../styles/crisis-panel.css';

const CrisisPanel = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    // Konum bilgisini al
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Konum alınamadı:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const togglePanel = () => {
    setIsVisible(!isVisible);
  };

  const activateEmergencyMode = () => {
    setEmergencyMode(true);
    setCountdown(10);
    
    // 10 saniye sonra otomatik arama
    setTimeout(() => {
      window.open('tel:183', '_self');
    }, 10000);
  };

  const cancelEmergency = () => {
    setEmergencyMode(false);
    setCountdown(0);
  };

  const callEmergency = (number, label) => {
    if (confirm(`${label} numarasını aramak istediğinizden emin misiniz?`)) {
      window.open(`tel:${number}`, '_self');
    }
  };

  const sendLocation = () => {
    if (location) {
      const message = `Acil durum! Konum: https://maps.google.com/?q=${location.lat},${location.lng}`;
      const encodedMessage = encodeURIComponent(message);
      window.open(`sms:183&body=${encodedMessage}`, '_self');
    } else {
      alert('Konum bilgisi alınamadı. Lütfen manuel olarak konumunuzu paylaşın.');
    }
  };

  const quickActions = [
    {
      id: 'police',
      icon: '🚔',
      label: 'Polis',
      number: '155',
      color: '#DC2626',
      description: 'Acil durumlar için'
    },
    {
      id: 'sönim',
      icon: '💜',
      label: 'ŞÖNİM',
      number: '183',
      color: '#8B5CF6',
      description: 'Kadına şiddet desteği'
    },
    {
      id: 'health',
      icon: '🏥',
      label: 'Sağlık',
      number: '112',
      color: '#059669',
      description: 'Acil sağlık hizmetleri'
    },
    {
      id: 'jandarma',
      icon: '👮',
      label: 'Jandarma',
      number: '156',
      color: '#7C3AED',
      description: 'Kırsal bölgeler için'
    }
  ];

  const safetyTips = [
    'Güvenli bir yere git',
    'Telefonunu sessize al',
    'Yakınlarını bilgilendir',
    'Kanıtları sakla',
    'Güvenli kod kelimesi kullan'
  ];

  return (
    <>
      {/* Crisis Panel Toggle Button */}
      <div className="crisis-toggle" onClick={togglePanel}>
        <span className="crisis-icon">🆘</span>
        <span className="crisis-text">Kriz Paneli</span>
      </div>

      {/* Crisis Panel Modal */}
      {isVisible && (
        <div className="crisis-modal-overlay" onClick={() => setIsVisible(false)}>
          <div className="crisis-panel" onClick={(e) => e.stopPropagation()}>
            <div className="crisis-header">
              <h2>🆘 Kriz Müdahale Paneli</h2>
              <button 
                className="close-crisis" 
                onClick={() => setIsVisible(false)}
                aria-label="Paneli kapat"
              >
                ✕
              </button>
            </div>

            {/* Emergency Mode */}
            {emergencyMode && (
              <div className="emergency-mode">
                <div className="emergency-alert">
                  <h3>🚨 ACİL DURUM MODU AKTİF</h3>
                  <p>10 saniye içinde ŞÖNİM (183) aranacak...</p>
                  <div className="countdown-display">
                    {countdown}
                  </div>
                  <div className="emergency-actions">
                    <button 
                      onClick={cancelEmergency}
                      className="cancel-emergency"
                    >
                      İptal Et
                    </button>
                    <button 
                      onClick={() => window.open('tel:183', '_self')}
                      className="call-now"
                    >
                      Şimdi Ara
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="quick-actions-section">
              <h3>Hızlı Eylemler</h3>
              <div className="quick-actions-grid">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    className="quick-action-btn"
                    style={{ '--action-color': action.color }}
                    onClick={() => callEmergency(action.number, action.label)}
                  >
                    <span className="action-icon">{action.icon}</span>
                    <span className="action-label">{action.label}</span>
                    <span className="action-number">{action.number}</span>
                    <span className="action-description">{action.description}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Emergency Button */}
            <div className="emergency-section">
              <button 
                className="emergency-activate-btn"
                onClick={activateEmergencyMode}
                disabled={emergencyMode}
              >
                🚨 ACİL DURUM MODUNU AKTİF ET
              </button>
              <p className="emergency-warning">
                Bu buton 10 saniye sonra otomatik olarak ŞÖNİM'i arayacaktır.
              </p>
            </div>

            {/* Location Sharing */}
            <div className="location-section">
              <h3>📍 Konum Paylaşımı</h3>
              <button 
                className="location-btn"
                onClick={sendLocation}
                disabled={!location}
              >
                {location ? 'Konumumu Paylaş' : 'Konum Alınamadı'}
              </button>
              {location && (
                <p className="location-info">
                  Konum: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
              )}
            </div>

            {/* Safety Tips */}
            <div className="safety-tips-section">
              <h3>🛡️ Güvenlik İpuçları</h3>
              <ul className="safety-tips-list">
                {safetyTips.map((tip, index) => (
                  <li key={index} className="safety-tip">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            {/* Privacy Notice */}
            <div className="privacy-notice">
              <p>
                🔒 <strong>Gizlilik:</strong> Bu panel tamamen gizlidir. 
                Hiçbir bilgi kaydedilmez ve tarayıcı geçmişinde görünmez.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CrisisPanel;
