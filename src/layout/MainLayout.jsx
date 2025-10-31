import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatSystem from '../components/ChatSystem';
import CrisisPanel from '../components/CrisisPanel';
import LocationFinder from '../components/LocationFinder';
import VoiceEmergency from '../components/VoiceEmergency';
import RiskAnalyzer from '../components/RiskAnalyzer';
import QuickExit from '../components/QuickExit';

const MainLayout = () => {
  const navigate = useNavigate();

  // Gizli erişim: Ctrl+Shift+K ile güvenli kayıt sayfasına git
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ctrl+Shift+K (veya Cmd+Shift+K Mac'te)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        navigate('/güvenli-kayıt');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate]);

  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      
      {/* Emergency Support Components */}
      <LocationFinder />
      <ChatSystem />
      <CrisisPanel />
      
      {/* New AI-Powered Features */}
      <VoiceEmergency />
      <RiskAnalyzer />
      
      {/* Security Features */}
      <QuickExit />
    </div>
  );
};

export default MainLayout;


