import React, { createContext, useContext, useState, useEffect } from 'react';

// Çeviri dosyalarını import et
import tr from '../locales/tr.json';
import en from '../locales/en.json';
import de from '../locales/de.json';
import fr from '../locales/fr.json';

const LanguageContext = createContext();

// Desteklenen diller
export const languages = {
  tr: {
    code: 'tr',
    name: 'Türkçe',
    flag: '🇹🇷',
    translations: tr
  },
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
    translations: en
  },
  de: {
    code: 'de',
    name: 'Deutsch',
    flag: '🇩🇪',
    translations: de
  },
  fr: {
    code: 'fr',
    name: 'Français',
    flag: '🇫🇷',
    translations: fr
  }
};

export const LanguageProvider = ({ children }) => {
  // Tarayıcı dilini tespit et veya localStorage'dan oku
  const getInitialLanguage = () => {
    const saved = localStorage.getItem('preferred-language');
    if (saved && languages[saved]) {
      return saved;
    }
    
    // Tarayıcı dilini kontrol et
    const browserLang = navigator.language || navigator.userLanguage;
    const langCode = browserLang.split('-')[0].toLowerCase();
    
    if (languages[langCode]) {
      return langCode;
    }
    
    // Varsayılan olarak Türkçe
    return 'tr';
  };

  const [language, setLanguage] = useState(getInitialLanguage());
  const [translations, setTranslations] = useState(languages[language].translations);

  // Dil değiştiğinde çevirileri güncelle ve localStorage'a kaydet
  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setLanguage(langCode);
      setTranslations(languages[langCode].translations);
      localStorage.setItem('preferred-language', langCode);
      
      // HTML lang attribute'unu güncelle
      document.documentElement.lang = langCode;
    }
  };

  // Çeviri fonksiyonu (nested keys destekler: "home.title" gibi)
  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Çeviri bulunamazsa anahtarı döndür
        console.warn(`Translation missing for key: ${key}`);
        return key;
      }
    }
    
    // Parametreleri değiştir (örn: "Hello {name}" -> "Hello John")
    if (typeof value === 'string' && params) {
      return value.replace(/\{(\w+)\}/g, (match, key) => {
        return params[key] !== undefined ? params[key] : match;
      });
    }
    
    return value || key;
  };

  // Component yüklendiğinde HTML lang attribute'unu ayarla
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = {
    language,
    translations,
    changeLanguage,
    t,
    languages: Object.values(languages)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

