import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/crisis-panel.css';

const CrisisPanel = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
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
    if (window.confirm(t('crisisPanel.confirmCall', { label }))) {
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

  // Quick actions - translations will be applied in render
  const quickActionsConfig = [
    {
      id: 'police',
      icon: '🚔',
      labelKey: 'crisisPanel.police',
      number: '155',
      color: '#DC2626',
      descriptionKey: 'crisisPanel.policeDescription'
    },
    {
      id: 'sönim',
      icon: '💜',
      labelKey: 'crisisPanel.sonim',
      number: '183',
      color: '#8B5CF6',
      descriptionKey: 'crisisPanel.sonimDescription'
    },
    {
      id: 'health',
      icon: '🏥',
      labelKey: 'crisisPanel.health',
      number: '112',
      color: '#059669',
      descriptionKey: 'crisisPanel.healthDescription'
    },
    {
      id: 'jandarma',
      icon: '👮',
      labelKey: 'crisisPanel.gendarmerie',
      number: '156',
      color: '#7C3AED',
      descriptionKey: 'crisisPanel.gendarmerieDescription'
    }
  ];

  const quickActions = quickActionsConfig.map(action => ({
    ...action,
    label: t(action.labelKey),
    description: t(action.descriptionKey)
  }));

  // Safety tips removed - can be added to translation files if needed

  return (
    <>
      {/* Crisis Panel Toggle Button */}
      <div className="crisis-toggle" onClick={togglePanel}>
        <span className="crisis-icon">🆘</span>
        <span className="crisis-text">{t('crisisPanel.title')}</span>
      </div>

      {/* Crisis Panel Modal */}
      {isVisible && (
        <div className="crisis-modal-overlay" onClick={() => setIsVisible(false)}>
          <div className="crisis-panel" onClick={(e) => e.stopPropagation()}>
            <div className="crisis-header">
              <h2>🆘 {t('crisisPanel.title')}</h2>
              <button 
                className="close-crisis" 
                onClick={() => setIsVisible(false)}
                aria-label={t('common.close')}
              >
                ✕
              </button>
            </div>

            {/* Emergency Mode */}
            {emergencyMode && (
              <div className="emergency-mode">
                <div className="emergency-alert">
                  <h3>🚨 {t('crisisPanel.emergencyActive')}</h3>
                  <p>{t('crisisPanel.emergencyCountdown')}</p>
                  <div className="countdown-display">
                    {countdown}
                  </div>
                  <div className="emergency-actions">
                    <button 
                      onClick={cancelEmergency}
                      className="cancel-emergency"
                    >
                      {t('crisisPanel.cancelEmergency')}
                    </button>
                    <button 
                      onClick={() => window.open('tel:183', '_self')}
                      className="call-now"
                    >
                      {t('crisisPanel.callNow')}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="quick-actions-section">
              <h3>{t('crisisPanel.quickActions')}</h3>
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
                🚨 {t('crisisPanel.emergencyMode')}
              </button>
              <p className="emergency-warning">
                {t('crisisPanel.emergencyWarning')}
              </p>
            </div>

            {/* Location Sharing */}
            <div className="location-section">
              <h3>📍 {t('crisisPanel.locationSharing')}</h3>
              <button 
                className="location-btn"
                onClick={sendLocation}
                disabled={!location}
              >
                {location ? t('crisisPanel.shareLocation') : t('crisisPanel.locationNotAvailable')}
              </button>
              {location && (
                <p className="location-info">
                  {t('crisisPanel.locationSharing')}: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </p>
              )}
            </div>

            {/* Quick Log Button */}
            <div className="quick-log-section">
              <h3>📝 {t('crisisPanel.quickLog')}</h3>
              <button 
                className="quick-log-btn"
                onClick={() => {
                  setIsVisible(false);
                  navigate('/güvenli-kayıt');
                }}
              >
                {t('crisisPanel.addViolenceLog')}
              </button>
              <p className="quick-log-info">
                {t('crisisPanel.quickLogInfo')}
              </p>
            </div>

            {/* Safety Tips */}
            <div className="safety-tips-section">
              <h3>🛡️ {t('crisisPanel.safetyTips')}</h3>
              <ul className="safety-tips-list">
                <li className="safety-tip">{t('crisisPanel.safetyTips')}</li>
              </ul>
            </div>

            {/* Privacy Notice */}
            <div className="privacy-notice">
              <p>
                🔒 <strong>{t('crisisPanel.privacy')}:</strong> {t('crisisPanel.privacyText')}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CrisisPanel;
