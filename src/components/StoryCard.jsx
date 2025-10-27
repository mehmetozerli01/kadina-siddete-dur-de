import React from 'react';
import '../styles/cards.css';

const StoryCard = ({ story }) => {
  const { id, quote, author, age, location } = story;

  return (
    <div className="card story-card">
      <div className="story-card-content">
        <p className="story-card-quote">{quote}</p>
        <div className="story-card-author">{author}</div>
        <div className="story-card-meta">
          {age && `${age} yaşında`}
          {age && location && ' • '}
          {location}
        </div>
      </div>
    </div>
  );
};

export default StoryCard;


