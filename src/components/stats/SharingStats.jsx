import React from 'react';
import { useTuikData } from '../../contexts/TuikDataContext';
import { Link } from 'react-router-dom';
import '../../styles/stats-detail.css';

const SharingStats = () => {
  const { sharing } = useTuikData();

  const sharingData = [
    { 
      label: 'Kimseye Anlatmıyor', 
      value: sharing.notShared, 
      color: '#EF4444',
      icon: '🔇',
      message: 'Yardım iste, yalnız değilsin!'
    },
    { 
      label: 'Aile ile Paylaşıyor', 
      value: sharing.sharedWithFamily, 
      color: '#8B5CF6',
      icon: '👨‍👩‍👧',
      message: 'Aile desteği önemli'
    },
    { 
      label: 'Arkadaş ile Paylaşıyor', 
      value: sharing.sharedWithFriend, 
      color: '#10B981',
      icon: '👥',
      message: 'Arkadaş desteği değerli'
    },
    { 
      label: 'Eş Ailesi ile Paylaşıyor', 
      value: sharing.sharedWithPartnerFamily, 
      color: '#F59E0B',
      icon: '🏠',
      message: 'Destek her yerden gelebilir'
    }
  ].filter(item => item.value !== null && item.value !== undefined);

  const total = sharingData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="chart-container sharing-stats">
      <h3 className="chart-title">Şiddeti Paylaşma Durumu</h3>
      <p className="chart-description">
        Eşi veya birlikte olduğu kişinin şiddetine maruz kalan kadınların 
        bu durumu paylaşma tercihleri.
      </p>

      <div className="sharing-grid">
        {sharingData.map((item, index) => (
          <div key={index} className="sharing-card" style={{ borderLeftColor: item.color }}>
            <div className="sharing-icon">{item.icon}</div>
            <div className="sharing-content">
              <div className="sharing-value">{item.value}%</div>
              <div className="sharing-label">{item.label}</div>
              <div className="sharing-message">{item.message}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="sharing-cta">
        <div className="cta-icon">💜</div>
        <div className="cta-content">
          <h4>Yardım İste!</h4>
          <p>
            {sharing.notShared}% kadın şiddeti kimseye anlatmıyor. 
            Ama sen yalnız değilsin! 183 numaralı ŞÖNİM hattını arayabilirsin.
          </p>
          <Link to="/help" className="cta-button">
            🆘 Yardım Hatları →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SharingStats;

