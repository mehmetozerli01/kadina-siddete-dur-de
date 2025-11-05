import React, { useState } from 'react';
import '../styles/video-player.css';

const VideoPlayer = ({ videoUrl, title, description }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // YouTube URL'ini embed formatına çevir
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    
    // YouTube URL formatlarını kontrol et
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
      }
    }
    
    return null;
  };

  // Vimeo URL'ini embed formatına çevir
  const getVimeoEmbedUrl = (url) => {
    if (!url) return null;
    
    const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
    if (match && match[1]) {
      return `https://player.vimeo.com/video/${match[1]}?title=0&byline=0&portrait=0`;
    }
    
    return null;
  };

  const youtubeEmbedUrl = getYouTubeEmbedUrl(videoUrl);
  const vimeoEmbedUrl = getVimeoEmbedUrl(videoUrl);
  const isYouTube = !!youtubeEmbedUrl;
  const isVimeo = !!vimeoEmbedUrl;

  const openInNewTab = () => {
    window.open(videoUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="video-player-container">
      <div className="video-player-header">
        <div className="video-player-title">
          <h3>{title || 'Video'}</h3>
          {description && <p className="video-description">{description}</p>}
        </div>
        <div className="video-player-controls">
          <button
            onClick={openInNewTab}
            className="control-btn open-tab-btn"
            title="Yeni Sekmede Aç"
          >
            🔗 Yeni Sekmede Aç
          </button>
        </div>
      </div>

      <div className="video-player-content">
        {isYouTube ? (
          <div className="video-wrapper">
            <iframe
              src={youtubeEmbedUrl}
              title={title || 'YouTube video'}
              className="video-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        ) : isVimeo ? (
          <div className="video-wrapper">
            <iframe
              src={vimeoEmbedUrl}
              title={title || 'Vimeo video'}
              className="video-iframe"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              frameBorder="0"
            />
          </div>
        ) : (
          <div className="video-error">
            <p>❌ Desteklenmeyen video formatı</p>
            <p className="error-hint">
              Bu video sadece YouTube veya Vimeo linklerini destekler.
              <br />
              <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                Videoyu yeni sekmede aç
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;

