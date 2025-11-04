import React from 'react';
import { useTuikData } from '../../contexts/TuikDataContext';
import '../../styles/stats-detail.css';

const ViolenceTypeChart = () => {
  const { lifetime, last12months } = useTuikData();

  const lifetimeData = [
    { name: 'Psikolojik', value: lifetime.psychological, color: '#8B5CF6' },
    { name: 'Ekonomik', value: lifetime.economic, color: '#F59E0B' },
    { name: 'Fiziksel', value: lifetime.physical, color: '#EF4444' }
  ].filter(item => item.value !== null && item.value !== undefined);

  const last12Data = [
    { name: 'Psikolojik', value: last12months.psychological, color: '#8B5CF6' },
    { name: 'Dijital', value: last12months.digital, color: '#10B981' },
    { name: 'Ekonomik', value: last12months.economic, color: '#F59E0B' },
    { name: 'Israrlı Takip', value: last12months.stalking, color: '#3B82F6' },
    { name: 'Fiziksel', value: last12months.physical, color: '#EF4444' },
    { name: 'Cinsel', value: last12months.sexual, color: '#EC4899' }
  ].filter(item => item.value !== null && item.value !== undefined);

  const maxValue = Math.max(
    ...lifetimeData.map(d => d.value),
    ...last12Data.map(d => d.value)
  );

  return (
    <div className="chart-container">
      <h3 className="chart-title">Şiddet Türlerine Göre Dağılım</h3>
      
      <div className="chart-section">
        <h4 className="chart-subtitle">Yaşam Boyu</h4>
        <div className="bar-chart">
          {lifetimeData.map((item, index) => (
            <div key={index} className="bar-chart-item">
              <div className="bar-label">{item.name}</div>
              <div className="bar-wrapper">
                <div 
                  className="bar" 
                  style={{ 
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color
                  }}
                >
                  <span className="bar-value">{item.value}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chart-section" style={{ marginTop: '2rem' }}>
        <h4 className="chart-subtitle">Son 12 Ay</h4>
        <div className="bar-chart">
          {last12Data.map((item, index) => (
            <div key={index} className="bar-chart-item">
              <div className="bar-label">{item.name}</div>
              <div className="bar-wrapper">
                <div 
                  className="bar" 
                  style={{ 
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color
                  }}
                >
                  <span className="bar-value">{item.value}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViolenceTypeChart;

