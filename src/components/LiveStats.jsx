import React, { useState, useEffect } from 'react';
import '../styles/live-stats.css';

const LiveStats = () => {
  const [stats, setStats] = useState({
    violenceToday: 0,
    helpCallsToday: 0,
    shelterApplications: 0,
    onlineUsers: 0,
    lastUpdate: new Date()
  });

  const [isUpdating, setIsUpdating] = useState(false);

  // Gerçek zamanlı veri simülasyonu
  useEffect(() => {
    const updateStats = () => {
      setIsUpdating(true);
      
      // Şok edici gerçekçi veriler
      const newStats = {
        violenceToday: Math.floor(Math.random() * 50) + 20, // 20-70 arası
        helpCallsToday: Math.floor(Math.random() * 30) + 15, // 15-45 arası
        shelterApplications: Math.floor(Math.random() * 10) + 3, // 3-13 arası
        onlineUsers: Math.floor(Math.random() * 20) + 5, // 5-25 arası
        lastUpdate: new Date()
      };
      
      setStats(newStats);
      
      setTimeout(() => setIsUpdating(false), 1000);
    };

    // İlk yükleme
    updateStats();
    
    // Her 30 saniyede güncelle
    const interval = setInterval(updateStats, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const statsData = [
    {
      id: 'violence',
      icon: '🚨',
      title: 'Bugün Şiddete Maruz Kalan Kadın',
      value: stats.violenceToday,
      color: '#DC2626',
      bgColor: '#FEF2F2',
      description: 'Son 24 saatte kaydedilen vaka sayısı',
      trend: '+12%',
      trendColor: '#DC2626'
    },
    {
      id: 'help',
      icon: '📞',
      title: 'Yardım Hattını Arayan Kadın',
      value: stats.helpCallsToday,
      color: '#059669',
      bgColor: '#F0FDF4',
      description: '183 hattını arayan kadın sayısı',
      trend: '+8%',
      trendColor: '#059669'
    },
    {
      id: 'shelter',
      icon: '🏠',
      title: 'Sığınma Evi Başvurusu',
      value: stats.shelterApplications,
      color: '#7C3AED',
      bgColor: '#FAF5FF',
      description: 'Güvenli barınma talebi',
      trend: '+5%',
      trendColor: '#7C3AED'
    },
    {
      id: 'online',
      icon: '👥',
      title: 'Şu Anda Online Kadın',
      value: stats.onlineUsers,
      color: '#8B5CF6',
      bgColor: '#F3F4F6',
      description: 'Siteyi ziyaret eden kadın sayısı',
      trend: 'Canlı',
      trendColor: '#10B981'
    }
  ];

  return (
    <div className="live-stats-container">
      {/* Header */}
      <div className="live-stats-header">
        <h2 className="live-stats-title">
          📊 Gerçek Zamanlı İstatistikler
        </h2>
        <div className="live-stats-subtitle">
          <span className="live-indicator">
            <span className="live-dot"></span>
            CANLI VERİ
          </span>
          <span className="last-update">
            Son güncelleme: {formatTime(stats.lastUpdate)}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {statsData.map((stat, index) => (
          <div 
            key={stat.id} 
            className={`stat-card ${isUpdating ? 'updating' : ''}`}
            style={{ 
              '--stat-color': stat.color,
              '--stat-bg': stat.bgColor,
              '--trend-color': stat.trendColor,
              animationDelay: `${index * 0.1}s`
            }}
          >
            <div className="stat-header">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-trend" style={{ color: stat.trendColor }}>
                {stat.trend}
              </div>
            </div>
            
            <div className="stat-content">
              <div className="stat-value">
                <span className="stat-number">{stat.value}</span>
                <span className="stat-unit">kişi</span>
              </div>
              
              <h3 className="stat-title">{stat.title}</h3>
              <p className="stat-description">{stat.description}</p>
            </div>

            {/* Animated Progress Bar */}
            <div className="stat-progress">
              <div 
                className="progress-bar"
                style={{ 
                  width: `${(stat.value / 100) * 100}%`,
                  backgroundColor: stat.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Alert */}
      <div className="emergency-alert">
        <div className="alert-content">
          <h3>🚨 ACİL DURUM UYARISI</h3>
          <p>
            Bu rakamlar gerçek zamanlı olarak güncellenmektedir. 
            Eğer şiddete maruz kalıyorsanız, hemen yardım alın!
          </p>
          <div className="alert-actions">
            <a href="tel:183" className="emergency-btn">
              📞 183 - Hemen Ara
            </a>
            <a href="tel:155" className="police-btn">
              🚔 155 - Polis
            </a>
          </div>
        </div>
      </div>

      {/* Data Source */}
      <div className="data-source">
        <p>
          <strong>Veri Kaynağı:</strong> ŞÖNİM, Emniyet Genel Müdürlüğü, 
          Kadın Sığınma Evleri ve gerçek zamanlı web analitikleri
        </p>
        <p className="disclaimer">
          ⚠️ Bu veriler simüle edilmiştir ve gerçek zamanlı güncellemeler 
          için gerçek API entegrasyonu gereklidir.
        </p>
      </div>
    </div>
  );
};

export default LiveStats;
