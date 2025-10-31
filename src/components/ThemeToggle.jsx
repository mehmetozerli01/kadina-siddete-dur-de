import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/theme-toggle.css';

const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? t('theme.lightMode') : t('theme.darkMode')}
      title={isDark ? t('theme.switchToLight') : t('theme.switchToDark')}
    >
      <div className="theme-toggle-track">
        <div className="theme-toggle-thumb" data-theme={theme}>
          <span className="theme-icon">
            {isDark ? '🌙' : '☀️'}
          </span>
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;
