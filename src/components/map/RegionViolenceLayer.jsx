import React from 'react';
import { useTuikData } from '../../contexts/TuikDataContext';
import '../../styles/map-regions.css';

const RegionViolenceLayer = () => {
  const { byRegion, metadata } = useTuikData();

  const regions = Object.entries(byRegion).filter(([_, data]) => 
    data.physical !== null && data.physical !== undefined
  );

  const getRegionColor = (value) => {
    if (value >= 20) return '#991B1B'; // Çok yüksek
    if (value >= 15) return '#DC2626'; // Yüksek
    if (value >= 10) return '#F59E0B'; // Orta
    return '#10B981'; // Düşük
  };

  const getRegionLevel = (value) => {
    if (value >= 20) return 'Çok Yüksek';
    if (value >= 15) return 'Yüksek';
    if (value >= 10) return 'Orta';
    return 'Düşük';
  };

  // En yüksek ve en düşük bölgeleri bul
  const sortedRegions = [...regions].sort((a, b) => b[1].physical - a[1].physical);
  const highestRegion = sortedRegions[0];
  const lowestRegion = sortedRegions[sortedRegions.length - 1];

  return (
    <div className="region-violence-layer">
      <div className="region-header">
        <h3>📊 TÜİK {metadata.year} Bölgesel Veriler</h3>
        <p className="region-subtitle">
          İBBS-1 Düzeyinde Fiziksel Şiddet Oranları (Yaşam Boyu)
        </p>
      </div>

      <div className="region-stats-summary">
        <div className="summary-card highest">
          <div className="summary-label">En Yüksek</div>
          <div className="summary-value">{highestRegion?.[1]?.physical}%</div>
          <div className="summary-region">{highestRegion?.[0]}</div>
        </div>
        <div className="summary-card lowest">
          <div className="summary-label">En Düşük</div>
          <div className="summary-value">{lowestRegion?.[1]?.physical}%</div>
          <div className="summary-region">{lowestRegion?.[0]}</div>
        </div>
      </div>

      <div className="region-list">
        {sortedRegions.map(([regionName, regionData]) => (
          <div 
            key={regionName} 
            className="region-item"
            style={{ borderLeftColor: getRegionColor(regionData.physical) }}
          >
            <div className="region-name-section">
              <div className="region-name">{regionName}</div>
              <div className="region-level" style={{ color: getRegionColor(regionData.physical) }}>
                {getRegionLevel(regionData.physical)}
              </div>
            </div>
            <div className="region-value-section">
              <div className="region-value" style={{ color: getRegionColor(regionData.physical) }}>
                {regionData.physical}%
              </div>
              <div 
                className="region-bar"
                style={{ 
                  width: `${(regionData.physical / 30) * 100}%`,
                  backgroundColor: getRegionColor(regionData.physical)
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="region-note">
        <p>
          <strong>Not:</strong> Veriler TÜİK {metadata.year} Kadına Yönelik Şiddet Araştırması'ndan alınmıştır. 
          Fiziksel şiddet oranları yaşamın herhangi bir döneminde maruz kalınan şiddeti göstermektedir.
        </p>
      </div>
    </div>
  );
};

export default RegionViolenceLayer;

