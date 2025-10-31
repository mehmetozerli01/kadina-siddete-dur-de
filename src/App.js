import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import AppRouter from './routes/AppRouter';
import './App.css';
import './styles/global.css';

function App() {
  return (
    <LanguageProvider>
      <AppRouter />
    </LanguageProvider>
  );
}

export default App;
