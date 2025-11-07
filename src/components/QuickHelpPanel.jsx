import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import PrivacyMode from './PrivacyMode';
import '../styles/quick-help-panel.css';

const QuickHelpPanel = () => {
  const { t } = useLanguage();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const closePanel = useCallback(() => {
    setIsOpen(false);
  }, []);

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOpenChat = () => {
    window.dispatchEvent(new CustomEvent('chatSystem:control', { detail: { action: 'open' } }));
    closePanel();
  };

  const handleOpenVoice = () => {
    window.dispatchEvent(new CustomEvent('voiceEmergency:control', { detail: { action: 'open' } }));
    closePanel();
  };

  // Close panel on route change to avoid covering new content
  useEffect(() => {
    closePanel();
  }, [location.pathname, closePanel]);

  // Close panel with Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closePanel();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closePanel]);

  return (
    <div className={`quick-help-panel ${isOpen ? 'open' : ''}`}>
      <button
        type="button"
        className="quick-help-toggle"
        onClick={togglePanel}
        aria-expanded={isOpen}
        aria-controls="quick-help-content"
        aria-label={isOpen ? t('quickHelp.close') : t('quickHelp.open')}
      >
        <span className="quick-help-icon" aria-hidden="true">SOS</span>
        <span className="quick-help-label">{t('quickHelp.title')}</span>
      </button>

      <div
        id="quick-help-content"
        className="quick-help-content"
        role="dialog"
        aria-live="polite"
      >
        <button
          type="button"
          className="quick-help-close"
          onClick={closePanel}
          aria-label={t('quickHelp.close')}
        >
          <span aria-hidden="true" />
        </button>

        <div className="quick-help-header">
          <h2>{t('quickHelp.header')}</h2>
          <p>{t('quickHelp.message')}</p>
        </div>

        <div className="quick-help-tools">
          <div className="quick-help-tool">
            <PrivacyMode />
            <span className="quick-help-tool-label">{t('quickHelp.privacyMode')}</span>
          </div>

          <Link
            to="/help"
            className="quick-help-secondary"
            onClick={closePanel}
          >
            <span aria-hidden="true">📞</span>
            <span>{t('quickHelp.openHelpCenter')}</span>
          </Link>

          <Link
            to="/violence-map"
            className="quick-help-secondary"
            onClick={closePanel}
          >
            <span aria-hidden="true">🗺️</span>
            <span>{t('quickHelp.openViolenceMap')}</span>
          </Link>
        </div>

        <div className="quick-help-support">
          <button
            type="button"
            className="quick-help-action-card"
            onClick={handleOpenChat}
            aria-label={t('quickHelp.liveSupportAria')}
          >
            <span className="quick-help-action-icon" aria-hidden="true">💬</span>
            <div className="quick-help-action-text">
              <span className="quick-help-action-title">{t('quickHelp.liveSupportTitle')}</span>
              <span className="quick-help-action-desc">{t('quickHelp.liveSupportDesc')}</span>
            </div>
          </button>

          <button
            type="button"
            className="quick-help-action-card"
            onClick={handleOpenVoice}
            aria-label={t('quickHelp.voiceSupportAria')}
          >
            <span className="quick-help-action-icon" aria-hidden="true">🎤</span>
            <div className="quick-help-action-text">
              <span className="quick-help-action-title">{t('quickHelp.voiceSupportTitle')}</span>
              <span className="quick-help-action-desc">{t('quickHelp.voiceSupportDesc')}</span>
            </div>
          </button>
        </div>

        <p className="quick-help-footnote">{t('quickHelp.disclaimer')}</p>
      </div>
    </div>
  );
};

export default QuickHelpPanel;


