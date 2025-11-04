import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import StoryReader from '../components/children/StoryReader';
import '../styles/children.css';
import '../styles/global.css';
import childrenStories from '../assets/data/children-stories.json';

const ChildrenStories = () => {
  const { t } = useLanguage();
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setStories(childrenStories);
  }, []);

  const filteredStories = filter === 'all' 
    ? stories 
    : stories.filter(story => story.category === filter);

  const categories = [
    { id: 'all', name: 'Tümü', icon: '📚' },
    { id: 'güvenlik', name: 'Güvenlik', icon: '🛡️' },
    { id: 'duygular', name: 'Duygular', icon: '😊' },
    { id: 'sınırlar', name: 'Sınırlar', icon: '🚫' },
    { id: 'aile', name: 'Aile', icon: '👨‍👩‍👧' },
    { id: 'yardım', name: 'Yardım', icon: '🆘' }
  ];

  if (selectedStory) {
    return (
      <div className="children-stories-page">
        <div className="container">
          <button 
            className="btn-back"
            onClick={() => setSelectedStory(null)}
          >
            ← Geri Dön
          </button>
          <StoryReader story={selectedStory} />
        </div>
      </div>
    );
  }

  return (
    <div className="children-stories-page">
      <section className="children-hero" style={{ 
        background: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)',
        padding: '3rem 0'
      }}>
        <div className="container">
          <h1 className="hero-title" style={{ color: 'white' }}>
            📚 Çocuk Hikayeleri
          </h1>
          <p className="hero-subtitle" style={{ color: 'rgba(255,255,255,0.9)' }}>
            Güzel ve öğretici hikayeler okuyarak güvenlik, duygular ve daha fazlasını öğren!
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="filter-bar">
            {categories.map(cat => (
              <button
                key={cat.id}
                className={`filter-btn ${filter === cat.id ? 'active' : ''}`}
                onClick={() => setFilter(cat.id)}
              >
                <span className="filter-icon">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <div className="stories-grid">
            {filteredStories.map(story => (
              <div
                key={story.id}
                className="story-card"
                onClick={() => setSelectedStory(story)}
              >
                <div className="story-card-icon">{story.icon}</div>
                <div className="story-card-content">
                  <h3 className="story-card-title">{story.title}</h3>
                  <p className="story-card-summary">{story.summary}</p>
                  <div className="story-card-meta">
                    <span className="story-card-age">Yaş: {story.ageGroup}</span>
                    <span className="story-card-category">{story.category}</span>
                  </div>
                </div>
                <div className="story-card-arrow">→</div>
              </div>
            ))}
          </div>

          {filteredStories.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">📭</div>
              <p>Bu kategoride henüz hikaye yok.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ChildrenStories;

