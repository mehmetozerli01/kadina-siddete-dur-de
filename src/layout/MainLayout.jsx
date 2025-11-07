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
import QuickHelpPanel from '../components/QuickHelpPanel';
import BackToTop from '../components/BackToTop';

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

  // Gizli navigasyon: URL'de #safe varsa gizli modu aktif et
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#safe') {
        // PrivacyMode komponenti bunu handle edecek
        localStorage.setItem('privacyMode', 'true');
      }
    };

    // İlk yükleme
    handleHashChange();

    // Hash değişikliklerini dinle
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
      
      {/* Emergency Support Components */}
      <LocationFinder />
      <ChatSystem showFloatingButton={false} />
      <CrisisPanel />
      
      {/* New AI-Powered Features */}
      <VoiceEmergency showFloatingButton={false} />
      <RiskAnalyzer />
      
      {/* Security Features */}
      <QuickExit />
      <QuickHelpPanel />
      
      {/* UI Enhancements */}
      <BackToTop />
    </div>
  );
};

export default MainLayout;


