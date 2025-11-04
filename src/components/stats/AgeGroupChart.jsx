import React from 'react';
import { useTuikData } from '../../contexts/TuikDataContext';
import '../../styles/stats-detail.css';

const AgeGroupChart = () => {
  const { byAge } = useTuikData();

  const ageGroups = ['15-24', '25-34', '35-44', '45-59'];
  
  const physicalData = ageGroups.map(age => ({
    age,
    lifetime: byAge.lifetime?.[age]?.physical,
    last12: byAge.last12months?.[age]?.physical
  })).filter(item => item.lifetime !== null && item.lifetime !== undefined);

  const psychologicalData = ageGroups.map(age => ({
    age,
    last12: byAge.last12months?.[age]?.psychological
  })).filter(item => item.last12 !== null && item.last12 !== undefined);

  const digitalData = ageGroups.map(age => ({
    age,
    last12: byAge.last12months?.[age]?.digital
  })).filter(item => item.last12 !== null && item.last12 !== undefined);

  const maxPhysical = Math.max(...physicalData.map(d => d.lifetime || 0));
  const maxPsychological = Math.max(...psychologicalData.map(d => d.last12 || 0));
  const maxDigital = Math.max(...digitalData.map(d => d.last12 || 0));

  return (
    <div className="chart-container">
      <h3 className="chart-title">Yaş Gruplarına Göre Şiddet</h3>

      {physicalData.length > 0 && (
        <div className="chart-section">
          <h4 className="chart-subtitle">Fiziksel Şiddet (Yaşam Boyu)</h4>
          <div className="bar-chart">
            {physicalData.map((item, index) => (
              <div key={index} className="bar-chart-item">
                <div className="bar-label">{item.age} yaş</div>
                <div className="bar-wrapper">
                  <div 
                    className="bar" 
                    style={{ 
                      width: `${((item.lifetime || 0) / maxPhysical) * 100}%`,
                      backgroundColor: '#EF4444'
                    }}
                  >
                    <span className="bar-value">{item.lifetime}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {psychologicalData.length > 0 && (
        <div className="chart-section" style={{ marginTop: '2rem' }}>
          <h4 className="chart-subtitle">Psikolojik Şiddet (Son 12 Ay)</h4>
          <div className="bar-chart">
            {psychologicalData.map((item, index) => (
              <div key={index} className="bar-chart-item">
                <div className="bar-label">{item.age} yaş</div>
                <div className="bar-wrapper">
                  <div 
                    className="bar" 
                    style={{ 
                      width: `${((item.last12 || 0) / maxPsychological) * 100}%`,
                      backgroundColor: '#8B5CF6'
                    }}
                  >
                    <span className="bar-value">{item.last12}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {digitalData.length > 0 && (
        <div className="chart-section" style={{ marginTop: '2rem' }}>
          <h4 className="chart-subtitle">Dijital Şiddet (Son 12 Ay)</h4>
          <div className="bar-chart">
            {digitalData.map((item, index) => (
              <div key={index} className="bar-chart-item">
                <div className="bar-label">{item.age} yaş</div>
                <div className="bar-wrapper">
                  <div 
                    className="bar" 
                    style={{ 
                      width: `${((item.last12 || 0) / maxDigital) * 100}%`,
                      backgroundColor: '#10B981'
                    }}
                  >
                    <span className="bar-value">{item.last12}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeGroupChart;

