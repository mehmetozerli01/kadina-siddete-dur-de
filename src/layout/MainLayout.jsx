import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatSystem from '../components/ChatSystem';
import CrisisPanel from '../components/CrisisPanel';
import LocationFinder from '../components/LocationFinder';
import VoiceEmergency from '../components/VoiceEmergency';
import RiskAnalyzer from '../components/RiskAnalyzer';

const MainLayout = () => {
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
    </div>
  );
};

export default MainLayout;


