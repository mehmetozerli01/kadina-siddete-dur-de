import React, { useState, useEffect } from 'react';
import sönimCenters from '../assets/data/sönim-centers.json';
import '../styles/location-finder.css';

const LocationFinder = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyCenters, setNearbyCenters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isVisible) {
      getCurrentLocation();
    }
  }, [isVisible]);

  useEffect(() => {
    if (userLocation) {
      calculateDistances(userLocation);
    }
  }, [userLocation]);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Tarayıcınız konum servisini desteklemiyor.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(location);
        calculateDistances(location);
        setLoading(false);
      },
      (error) => {
        console.error('Konum hatası:', error);
        setError('Konum bilgisi alınamadı. Lütfen tarayıcı ayarlarından izin verin.');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000
      }
    );
  };

  const calculateDistances = (userLoc) => {
    const centersWithDistance = sönimCenters.map(center => {
      const distance = calculateDistance(
        userLoc.lat,
        userLoc.lng,
        center.lat,
        center.lng
      );
      return { ...center, distance };
    });

    centersWithDistance.sort((a, b) => a.distance - b.distance);
    setNearbyCenters(centersWithDistance);
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const openInMaps = (center) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
    window.open(url, '_blank');
  };

  const callCenter = (phone) => {
    if (window.confirm(`${phone} numarasını şimdi aramak istediğinizden emin misiniz?`)) {
      window.open(`tel:${phone}`, '_self');
    }
  };

  const togglePanel = () => {
    setIsVisible(!isVisible);
  };

  const filteredCenters = nearbyCenters.filter(center => {
    return !searchQuery || 
      center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      center.address.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <div className="location-toggle" onClick={togglePanel}>
        <span className="location-icon">📍</span>
        <span className="location-text">Yakın ŞÖNİM</span>
      </div>

      {isVisible && (
        <div className="location-modal-overlay" onClick={() => setIsVisible(false)}>
          <div className="location-panel" onClick={(e) => e.stopPropagation()}>
            <div className="location-header">
              <h2>📍 Yakın ŞÖNİM Merkezleri</h2>
              <button 
                className="close-location" 
                onClick={() => setIsVisible(false)}
              >
                ✕
              </button>
            </div>

            <div className="location-content">
              <input
                type="text"
                placeholder="🔍 Şehir veya merkez ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />

              <div className="location-status">
                {loading && (
                  <div className="loading-indicator">
                    <div className="spinner"></div>
                    <p>Konumunuz alınıyor...</p>
                  </div>
                )}
                
                {error && (
                  <div className="error-message">
                    <p>⚠️ {error}</p>
                    <button onClick={getCurrentLocation} className="retry-btn">
                      🔄 Tekrar Dene
                    </button>
                  </div>
                )}
                
                {userLocation && (
                  <div className="location-info success">
                    <p>✅ Konumunuz alındı</p>
                    <p className="coordinates">
                      📍 {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
                    </p>
                  </div>
                )}
              </div>

              <div className="centers-section">
                <h3>🏢 ŞÖNİM Merkezleri ({filteredCenters.length})</h3>
                
                {filteredCenters.length > 0 ? (
                  <div className="centers-list">
                    {filteredCenters.map((center, index) => (
                      <div key={center.id} className="center-card">
                        <div className="center-header">
                          <h4>{center.name}</h4>
                          <div className="distance-badge">
                            <span>{center.distance ? `${center.distance.toFixed(1)} km` : 'Belirleniyor'}</span>
                          </div>
                        </div>
                        
                        <div className="center-details">
                          <p>📍 {center.address}</p>
                          <p>📞 {center.phone}</p>
                        </div>
                        
                        <div className="center-services">
                          <div className="services-tags">
                            {center.services.map((service, idx) => (
                              <span key={idx} className="service-tag">{service}</span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="center-actions">
                          <button 
                            onClick={() => callCenter(center.phone)}
                            className="action-btn call-btn"
                          >
                            📞 Ara
                          </button>
                          <button 
                            onClick={() => openInMaps(center)}
                            className="action-btn map-btn"
                          >
                            🗺️ Yol Tarifi
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-centers">
                    <p>Merkez bulunamadı.</p>
                    <button 
                      onClick={() => window.open('tel:183', '_self')}
                      className="emergency-call-btn"
                    >
                      📞 183 - ŞÖNİM Hattı
                    </button>
                  </div>
                )}
              </div>

              <div className="emergency-info-section">
                <h3>🆘 Acil Durum: 183</h3>
                <p className="emergency-note">
                  <strong>7/24 ücretsiz destek</strong>. Gizlilik garantisi vardır.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationFinder;

