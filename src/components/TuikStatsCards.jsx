import React from 'react';
import { useTuikData } from '../contexts/TuikDataContext';
import TuikStatsCard from './TuikStatsCard';
import '../styles/tuik-stats.css';

const TuikStatsCards = () => {
  const { last12months, sharing, byRegion, metadata } = useTuikData();

  const stats = [
    {
      icon: '💔',
      title: 'Son 12 Ayda Psikolojik Şiddet',
      value: `${last12months.psychological}%`,
      subtitle: 'En yaygın şiddet türü',
      color: '#8B5CF6',
      link: '/stats'
    },
    {
      icon: '🔇',
      title: 'Kimseye Anlatmıyor',
      value: `${sharing.notShared}%`,
      subtitle: 'Yardım iste, yalnız değilsin',
      color: '#EF4444',
      link: '/help'
    },
    {
      icon: '📱',
      title: 'Dijital Şiddet',
      value: `${last12months.digital}%`,
      subtitle: 'Yeni bir tehdit',
      color: '#F59E0B',
      link: '/stats'
    },
    {
      icon: '📍',
      title: 'En Yüksek Bölge',
      value: `${byRegion['Kuzeydoğu Anadolu']?.physical || 'N/A'}%`,
      subtitle: 'Kuzeydoğu Anadolu - Fiziksel şiddet',
      color: '#10B981',
      link: '/violence-map'
    }
  ];

  return (
    <section className="tuik-stats-section">
      <div className="container">
        <div className="tuik-stats-header">
          <h2 className="section-title">📊 Gerçekler</h2>
          <p className="section-subtitle">
            TÜİK {metadata.year} Kadına Yönelik Şiddet Araştırması verileri
          </p>
          <p className="section-source">
            Kaynak: <a href={metadata.sourceUrl || '#'} target="_blank" rel="noopener noreferrer">
              {metadata.source} - {metadata.year}
            </a>
          </p>
        </div>
        
        <div className="tuik-stats-grid">
          {stats.map((stat, index) => (
            <TuikStatsCard key={index} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TuikStatsCards;

