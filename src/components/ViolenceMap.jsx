import React, { useState, useEffect } from 'react';
import violenceData from '../assets/data/violence-map-data.json';
import '../styles/violence-map.css';

const ViolenceMap = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [filterLevel, setFilterLevel] = useState('all');
  const [sortBy, setSortBy] = useState('violenceRate');
  const [showStatistics, setShowStatistics] = useState(true);

  // Filter cities based on risk level
  const filteredCities = violenceData.filter(city => {
    if (filterLevel === 'all') return true;
    return city.riskLevel === filterLevel;
  });

  // Sort cities
  const sortedCities = [...filteredCities].sort((a, b) => {
    if (sortBy === 'violenceRate') return b.violenceRate - a.violenceRate;
    if (sortBy === 'cases') return b.cases - a.cases;
    if (sortBy === 'population') return b.population - a.population;
    return 0;
  });

  // Calculate statistics
  const stats = {
    totalCities: violenceData.length,
    totalCases: violenceData.reduce((sum, city) => sum + city.cases, 0),
    averageRate: Math.round(violenceData.reduce((sum, city) => sum + city.violenceRate, 0) / violenceData.length),
    highRiskCities: violenceData.filter(city => city.riskLevel === 'high' || city.riskLevel === 'very-high').length,
    increasingTrend: violenceData.filter(city => city.trend === 'increasing').length
  };

  const getRiskLevelStats = () => {
    const levels = {
      'very-high': violenceData.filter(city => city.riskLevel === 'very-high').length,
      'high': violenceData.filter(city => city.riskLevel === 'high').length,
      'medium': violenceData.filter(city => city.riskLevel === 'medium').length,
      'low': violenceData.filter(city => city.riskLevel === 'low').length
    };
    return levels;
  };

  const riskLevelStats = getRiskLevelStats();

  const handleCityClick = (city) => {
    setSelectedCity(city);
  };

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'very-high': return '#991B1B';
      case 'high': return '#DC2626';
      case 'medium': return '#F59E0B';
      case 'low': return '#10B981';
      default: return '#6B7280';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      case 'stable': return '➡️';
      default: return '❓';
    }
  };

  return (
    <div className="violence-map-container">
      {/* Header */}
      <div className="map-header">
        <h2 className="map-title">🗺️ Türkiye Şiddet Haritası</h2>
        <p className="map-subtitle">
          İl il şiddet oranları ve risk seviyeleri. Her nokta bir ili temsil eder.
        </p>
      </div>

      {/* Statistics Panel */}
      {showStatistics && (
        <div className="statistics-panel">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🏙️</div>
              <div className="stat-value">{stats.totalCities}</div>
              <div className="stat-label">Toplam İl</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-value">{stats.totalCases}</div>
              <div className="stat-label">Toplam Vaka</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-value">%{stats.averageRate}</div>
              <div className="stat-label">Ortalama Oran</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🚨</div>
              <div className="stat-value">{stats.highRiskCities}</div>
              <div className="stat-label">Yüksek Risk</div>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="map-controls">
        <div className="control-group">
          <label htmlFor="filter-level">Risk Seviyesi:</label>
          <select 
            id="filter-level"
            value={filterLevel} 
            onChange={(e) => setFilterLevel(e.target.value)}
            className="control-select"
          >
            <option value="all">Tümü</option>
            <option value="very-high">Çok Yüksek Risk</option>
            <option value="high">Yüksek Risk</option>
            <option value="medium">Orta Risk</option>
            <option value="low">Düşük Risk</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="sort-by">Sıralama:</label>
          <select 
            id="sort-by"
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="control-select"
          >
            <option value="violenceRate">Şiddet Oranı</option>
            <option value="cases">Vaka Sayısı</option>
            <option value="population">Nüfus</option>
          </select>
        </div>

        <button 
          className="toggle-stats-btn"
          onClick={() => setShowStatistics(!showStatistics)}
        >
          {showStatistics ? '📊 İstatistikleri Gizle' : '📊 İstatistikleri Göster'}
        </button>
      </div>

      {/* Risk Level Legend */}
      <div className="risk-legend">
        <h4>Risk Seviyeleri:</h4>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#991B1B' }}></div>
            <span>Çok Yüksek Risk ({riskLevelStats['very-high']} il)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#DC2626' }}></div>
            <span>Yüksek Risk ({riskLevelStats['high']} il)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#F59E0B' }}></div>
            <span>Orta Risk ({riskLevelStats['medium']} il)</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: '#10B981' }}></div>
            <span>Düşük Risk ({riskLevelStats['low']} il)</span>
          </div>
        </div>
      </div>

      {/* Map Visualization */}
      <div className="map-visualization">
        <div className="map-grid">
          {sortedCities.map((city, index) => (
            <div
              key={city.id}
              className={`city-marker ${selectedCity?.id === city.id ? 'selected' : ''}`}
              style={{
                backgroundColor: getRiskLevelColor(city.riskLevel),
                animationDelay: `${index * 0.05}s`
              }}
              onClick={() => handleCityClick(city)}
              title={`${city.name}: %${city.violenceRate} şiddet oranı`}
            >
              <div className="city-name">{city.name}</div>
              <div className="city-rate">%{city.violenceRate}</div>
              <div className="city-trend">{getTrendIcon(city.trend)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* City Details */}
      {selectedCity && (
        <div className="city-details">
          <div className="details-header">
            <h3>{selectedCity.name}</h3>
            <button 
              className="close-details"
              onClick={() => setSelectedCity(null)}
            >
              ✕
            </button>
          </div>
          
          <div className="details-content">
            <div className="detail-row">
              <span className="detail-label">Şiddet Oranı:</span>
              <span className="detail-value" style={{ color: getRiskLevelColor(selectedCity.riskLevel) }}>
                %{selectedCity.violenceRate}
              </span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Risk Seviyesi:</span>
              <span className="detail-value" style={{ color: getRiskLevelColor(selectedCity.riskLevel) }}>
                {selectedCity.riskLevel === 'very-high' ? 'Çok Yüksek Risk' :
                 selectedCity.riskLevel === 'high' ? 'Yüksek Risk' :
                 selectedCity.riskLevel === 'medium' ? 'Orta Risk' : 'Düşük Risk'}
              </span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Vaka Sayısı:</span>
              <span className="detail-value">{selectedCity.cases}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Nüfus:</span>
              <span className="detail-value">{selectedCity.population.toLocaleString()}</span>
            </div>
            
            <div className="detail-row">
              <span className="detail-label">Trend:</span>
              <span className="detail-value">
                {getTrendIcon(selectedCity.trend)} {
                  selectedCity.trend === 'increasing' ? 'Artıyor' :
                  selectedCity.trend === 'decreasing' ? 'Azalıyor' : 'Sabit'
                }
              </span>
            </div>
            
            <div className="detail-description">
              <p>{selectedCity.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Top 10 Most Dangerous Cities */}
      <div className="top-cities-section">
        <h3>🚨 En Riskli 10 İl</h3>
        <div className="top-cities-list">
          {violenceData
            .sort((a, b) => b.violenceRate - a.violenceRate)
            .slice(0, 10)
            .map((city, index) => (
              <div key={city.id} className="top-city-item">
                <div className="city-rank">#{index + 1}</div>
                <div className="city-info">
                  <div className="city-name">{city.name}</div>
                  <div className="city-stats">
                    %{city.violenceRate} • {city.cases} vaka • {city.population.toLocaleString()} nüfus
                  </div>
                </div>
                <div 
                  className="city-risk-badge"
                  style={{ backgroundColor: getRiskLevelColor(city.riskLevel) }}
                >
                  {city.riskLevel === 'very-high' ? 'Çok Yüksek' :
                   city.riskLevel === 'high' ? 'Yüksek' :
                   city.riskLevel === 'medium' ? 'Orta' : 'Düşük'}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Emergency Help */}
      <div className="emergency-help">
        <h3>🚨 Acil Yardım</h3>
        <p>
          Bu harita sadece bilgilendirme amaçlıdır. Şiddete maruz kalıyorsanız hemen yardım alın!
        </p>
        <div className="emergency-buttons">
          <a href="tel:183" className="emergency-btn primary">
            📞 183 - ŞÖNİM
          </a>
          <a href="tel:155" className="emergency-btn secondary">
            🚔 155 - Polis
          </a>
          <a href="tel:112" className="emergency-btn secondary">
            🏥 112 - Sağlık
          </a>
        </div>
      </div>
    </div>
  );
};

export default ViolenceMap;
