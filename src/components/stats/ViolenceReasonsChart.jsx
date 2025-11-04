import React from 'react';
import { useTuikData } from '../../contexts/TuikDataContext';
import '../../styles/stats-detail.css';

const ViolenceReasonsChart = () => {
  const { reasons } = useTuikData();

  const reasonsData = [
    { name: 'Öfke Kontrolü', value: reasons.angerControl, color: '#EF4444', icon: '😠' },
    { name: 'Yetiştirilme Tarzı', value: reasons.upbringing, color: '#F59E0B', icon: '👨‍👩‍👧' },
    { name: 'Maddi Sıkıntı', value: reasons.financial, color: '#8B5CF6', icon: '💰' }
  ].filter(item => item.value !== null && item.value !== undefined);

  const maxValue = Math.max(...reasonsData.map(d => d.value));

  return (
    <div className="chart-container">
      <h3 className="chart-title">Şiddet Nedenleri</h3>
      <p className="chart-description">
        Eşi veya birlikte olduğu kişinin fiziksel ve/veya cinsel şiddetine 
        maruz kalan kadınların belirttiği şiddet nedenleri.
      </p>

      <div className="bar-chart">
        {reasonsData.map((item, index) => (
          <div key={index} className="bar-chart-item">
            <div className="bar-label">
              <span className="bar-icon">{item.icon}</span>
              {item.name}
            </div>
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
  );
};

export default ViolenceReasonsChart;

