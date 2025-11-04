import React, { useState } from 'react';
import '../../styles/children.css';

const StoryReader = ({ story }) => {
  const [isReading, setIsReading] = useState(false);

  if (!story) return null;

  return (
    <div className="story-reader">
      <div className="story-header">
        <div className="story-icon">{story.icon}</div>
        <div>
          <h2 className="story-title">{story.title}</h2>
          <div className="story-meta">
            <span className="story-age">Yaş: {story.ageGroup}</span>
            <span className="story-category">{story.category}</span>
          </div>
        </div>
      </div>

      <div className="story-content">
        <div className="story-illustration">
          <div className="illustration-placeholder">
            {story.icon}
          </div>
        </div>
        
        <div className="story-text">
          <p className="story-paragraph">{story.content}</p>
        </div>
      </div>

      <div className="story-moral">
        <div className="moral-icon">💡</div>
        <p className="moral-text">
          <strong>Bu hikayeden öğrendiklerimiz:</strong> {story.moral}
        </p>
      </div>

      <div className="story-actions">
        <button 
          className="btn-story btn-primary"
          onClick={() => setIsReading(!isReading)}
        >
          {isReading ? '📖 Hikayeyi Oku' : '🔊 Sesli Dinle'}
        </button>
        <button className="btn-story btn-secondary">
          🎨 Boyama Sayfası
        </button>
      </div>
    </div>
  );
};

export default StoryReader;

