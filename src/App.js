import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import AppRouter from './routes/AppRouter';
import './App.css';
import './styles/global.css';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
