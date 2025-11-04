import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { TuikDataProvider } from './contexts/TuikDataContext';
import AppRouter from './routes/AppRouter';
import './App.css';
import './styles/global.css';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <TuikDataProvider>
          <AppRouter />
        </TuikDataProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
