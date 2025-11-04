import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/tuik-stats.css';

const TuikStatsCard = ({ icon, title, value, subtitle, color, link }) => {
  return (
    <div className="tuik-stat-card" style={{ '--card-color': color }}>
      <div className="stat-card-content">
        <div className="stat-card-icon">{icon}</div>
        <div className="stat-card-info">
          <div className="stat-card-value">{value}</div>
          <div className="stat-card-title">{title}</div>
          {subtitle && (
            <div className="stat-card-subtitle">{subtitle}</div>
          )}
        </div>
      </div>
      {link && (
        <Link to={link} className="stat-card-link">
          Daha fazla bilgi →
        </Link>
      )}
    </div>
  );
};

export default TuikStatsCard;

