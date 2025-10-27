import React from 'react';
import '../styles/cards.css';

const NewsCard = ({ news }) => {
  const { id, title, excerpt, date, image, link } = news;

  return (
    <div className="card news-card">
      {image && (
        <img 
          src={image} 
          alt={title} 
          className="news-card-image"
        />
      )}
      <div className="news-card-content">
        <span className="news-card-date">{date}</span>
        <h3 className="news-card-title">{title}</h3>
        <p className="news-card-excerpt">{excerpt}</p>
        <a 
          href={link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="news-card-link"
        >
          Devamını Oku →
        </a>
      </div>
    </div>
  );
};

export default NewsCard;


