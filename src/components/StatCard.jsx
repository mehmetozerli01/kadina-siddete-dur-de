import React from 'react';
import '../styles/cards.css';

const StatCard = ({ stat }) => {
  const { number, label, icon } = stat;

  return (
    <div className="card stat-card">
      {icon && <div className="stat-card-icon">{icon}</div>}
      <div className="stat-card-number">{number}</div>
      <div className="stat-card-label">{label}</div>
    </div>
  );
};

export default StatCard;


