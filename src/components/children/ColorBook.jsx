import React, { useState } from 'react';
import '../../styles/children.css';

const ColorBook = () => {
  const [selectedColor, setSelectedColor] = useState('#FF0000');
  const [currentPage, setCurrentPage] = useState(0);

  const colors = [
    '#FF0000', '#FFA500', '#FFFF00', '#00FF00', 
    '#0000FF', '#800080', '#FF69B4', '#000000', 
    '#FFFFFF', '#A52A2A', '#FFC0CB', '#00CED1'
  ];

  const pages = [
    { id: 1, title: 'Güvenli Ev', emoji: '🏠' },
    { id: 2, title: 'Mutlu Aile', emoji: '👨‍👩‍👧' },
    { id: 3, title: 'Cesur Çocuk', emoji: '🦸' },
    { id: 4, title: 'Güvenli Okul', emoji: '🏫' },
    { id: 5, title: 'Yardımsever Melek', emoji: '😇' },
    { id: 6, title: 'Güçlü Prenses', emoji: '👸' }
  ];

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="color-book">
      <div className="color-book-header">
        <h2>🎨 Boyama Kitabı</h2>
        <p>Renkleri seç ve boyama yap!</p>
      </div>

      <div className="color-book-controls">
        <div className="color-palette">
          {colors.map((color, index) => (
            <button
              key={index}
              className={`color-btn ${selectedColor === color ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => handleColorClick(color)}
              aria-label={`${color} rengini seç`}
            />
          ))}
        </div>
        
        <div className="page-navigation">
          <button 
            className="btn-nav"
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
          >
            ← Önceki
          </button>
          <span className="page-info">
            Sayfa {currentPage + 1} / {pages.length}
          </span>
          <button 
            className="btn-nav"
            onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
            disabled={currentPage === pages.length - 1}
          >
            Sonraki →
          </button>
        </div>
      </div>

      <div className="coloring-page">
        <div className="coloring-area">
          <div className="coloring-image">
            <div className="coloring-placeholder">
              <div style={{ fontSize: '8rem', marginBottom: '1rem' }}>
                {pages[currentPage].emoji}
              </div>
              <h3>{pages[currentPage].title}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem' }}>
                Boyama alanı - İnteraktif boyama özelliği yakında!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="color-book-actions">
        <button className="btn-print">🖨️ Yazdır</button>
        <button className="btn-save">💾 Kaydet</button>
        <button className="btn-clear">🗑️ Temizle</button>
      </div>
    </div>
  );
};

export default ColorBook;

