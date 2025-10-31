import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/social-share-cards.css';

const SocialShareCards = () => {
  const { t } = useLanguage();
  const [selectedCard, setSelectedCard] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // QR kod çizimi (basitleştirilmiş)
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Basit bir QR pattern çiz
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, 200, 200);
    
    ctx.fillStyle = '#000';
    // Köşeler için büyük kareler
    ctx.fillRect(10, 10, 50, 50);
    ctx.fillRect(140, 10, 50, 50);
    ctx.fillRect(10, 140, 50, 50);
    
    // İç kareler
    ctx.fillStyle = '#FFF';
    ctx.fillRect(25, 25, 20, 20);
    ctx.fillRect(155, 25, 20, 20);
    ctx.fillRect(25, 155, 20, 20);
    
    // Merkez pattern
    ctx.fillStyle = '#000';
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
        if ((i + j) % 2 === 0) {
          ctx.fillRect(70 + i * 10, 70 + j * 10, 8, 8);
        }
      }
    }
  }, []);

  // Instagram Story formatında kartlar (1080x1920 boyutunda)
  const shareCards = [
    {
      id: 1,
      title: t('socialShare.card1.title'),
      message: t('socialShare.card1.message'),
      hashtag: '#KadınaŞiddeteDurDe',
      bgGradient: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 50%, #4C1D95 100%)',
      textColor: '#FFFFFF',
      icon: '💜'
    },
    {
      id: 2,
      title: t('socialShare.card2.title'),
      message: t('socialShare.card2.message'),
      hashtag: '#KadınaŞiddeteDurDe',
      bgGradient: 'linear-gradient(135deg, #EC4899 0%, #DB2777 50%, #BE185D 100%)',
      textColor: '#FFFFFF',
      icon: '🤝'
    },
    {
      id: 3,
      title: t('socialShare.card3.title'),
      message: t('socialShare.card3.message'),
      hashtag: '#KadınaŞiddeteDurDe',
      bgGradient: 'linear-gradient(135deg, #10B981 0%, #059669 50%, #047857 100%)',
      textColor: '#FFFFFF',
      icon: '🛡️'
    },
    {
      id: 4,
      title: t('socialShare.card4.title'),
      message: t('socialShare.card4.message'),
      hashtag: '#KadınaŞiddeteDurDe',
      bgGradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 50%, #B45309 100%)',
      textColor: '#FFFFFF',
      icon: '📢'
    },
    {
      id: 5,
      title: t('socialShare.card5.title'),
      message: t('socialShare.card5.message'),
      hashtag: '#KadınaŞiddeteDurDe',
      bgGradient: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 50%, #1D4ED8 100%)',
      textColor: '#FFFFFF',
      icon: '🌍'
    },
    {
      id: 6,
      title: t('socialShare.card6.title'),
      message: t('socialShare.card6.message'),
      hashtag: '#KadınaŞiddeteDurDe',
      bgGradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 50%, #4338CA 100%)',
      textColor: '#FFFFFF',
      icon: '💪'
    }
  ];

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleDownload = (card) => {
    const cardElement = document.getElementById(`card-${card.id}`);
    if (!cardElement) return;

    // Canvas oluştur ve kartı çiz
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');

    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
    const colors = card.bgGradient.match(/rgb?\([^)]+\)|#[0-9A-F]{6}/gi);
    if (colors) {
      gradient.addColorStop(0, colors[0] || '#8B5CF6');
      gradient.addColorStop(0.5, colors[1] || colors[0] || '#6D28D9');
      gradient.addColorStop(1, colors[2] || colors[1] || colors[0] || '#4C1D95');
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);

    // Text
    ctx.fillStyle = card.textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Icon
    ctx.font = 'bold 120px Arial';
    ctx.fillText(card.icon, 540, 400);

    // Title
    ctx.font = 'bold 64px Arial';
    const titleLines = wrapText(ctx, card.title, 900);
    titleLines.forEach((line, i) => {
      ctx.fillText(line, 540, 650 + (i * 80));
    });

    // Message
    ctx.font = '36px Arial';
    const messageLines = wrapText(ctx, card.message, 900);
    messageLines.forEach((line, i) => {
      ctx.fillText(line, 540, 950 + (i * 50));
    });

    // Hashtag
    ctx.font = 'bold 48px Arial';
    ctx.fillText(card.hashtag, 540, 1700);

    // Website URL
    ctx.font = '32px Arial';
    ctx.fillText('kadinasiddetedur.de', 540, 1800);

    // Download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `kadina-siddete-dur-de-${card.id}.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  const wrapText = (ctx, text, maxWidth) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + ' ' + word).width;
      if (width < maxWidth) {
        currentLine += ' ' + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    lines.push(currentLine);
    return lines;
  };

  const handleShare = (card) => {
    const shareText = `${card.title}\n\n${card.message}\n\n${card.hashtag}\n\nkadinasiddetedur.de`;
    
    if (navigator.share) {
      navigator.share({
        title: card.title,
        text: shareText,
        url: window.location.href
      }).catch(() => {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(shareText);
        alert(t('socialShare.copiedToClipboard'));
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert(t('socialShare.copiedToClipboard'));
    }
  };

  return (
    <div className="social-share-cards-container">
      <div className="social-share-header">
        <h2>{t('socialShare.title')}</h2>
        <p>{t('socialShare.subtitle')}</p>
      </div>

      <div className="cards-grid">
        {shareCards.map((card) => (
          <div key={card.id} className="share-card-wrapper">
            <div
              id={`card-${card.id}`}
              className="share-card"
              style={{
                background: card.bgGradient,
                color: card.textColor
              }}
              onClick={() => handleCardClick(card)}
            >
              <div className="card-icon">{card.icon}</div>
              <div className="card-title">{card.title}</div>
              <div className="card-message">{card.message}</div>
              <div className="card-hashtag">{card.hashtag}</div>
              <div className="card-url">kadinasiddetedur.de</div>
            </div>
            
            <div className="card-actions">
              <button
                className="action-btn download-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownload(card);
                }}
                title={t('socialShare.download')}
              >
                📥 {t('socialShare.download')}
              </button>
              <button
                className="action-btn share-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleShare(card);
                }}
                title={t('socialShare.share')}
              >
                📤 {t('socialShare.share')}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* QR Code Section */}
      <div className="qr-section">
        <h3>{t('socialShare.qrTitle')}</h3>
        <p>{t('socialShare.qrDescription')}</p>
        <div className="qr-code-container">
          <canvas ref={canvasRef} className="qr-canvas" width="200" height="200"></canvas>
        </div>
        <button
          className="qr-download-btn"
          onClick={() => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            
            canvas.toBlob((blob) => {
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'qr-kadina-siddete-dur-de.png';
              a.click();
              URL.revokeObjectURL(url);
            });
          }}
        >
          📱 {t('socialShare.downloadQR')}
        </button>
      </div>
    </div>
  );
};

export default SocialShareCards;
