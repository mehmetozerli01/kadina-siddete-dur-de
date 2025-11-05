import React, { useState } from 'react';
import PDFViewer from '../components/PDFViewer';
import VideoPlayer from '../components/VideoPlayer';
import '../styles/global.css';
import '../styles/library.css';

const Library = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const resources = [
    {
      id: 1,
      title: 'İstanbul Sözleşmesi Tam Metin',
      category: 'legal',
      type: 'pdf',
      description: 'Kadınlara karşı şiddet ve aile içi şiddetin önlenmesi ve bunlarla mücadele edilmesine dair sözleşme.',
      link: 'https://www.evrensel.net/uploads/dokuman/istanbul-sozlesmesi.pdf',
      icon: '📄',
      date: '2024',
      action: 'openPDF'
    },
    {
      id: 2,
      title: '6284 Sayılı Kanun',
      category: 'legal',
      type: 'pdf',
      description: 'Kadına yönelik şiddet ve aile içi şiddetin önlenmesine dair düzenlemeler.',
      link: 'https://www.mevzuat.gov.tr/MevzuatMetin/1.5.6284.pdf',
      icon: '⚖️',
      date: '2024',
      action: 'openPDF'
    },
    {
      id: 3,
      title: 'Şiddet Türleri Rehberi',
      category: 'education',
      type: 'pdf',
      description: 'Fiziksel, psikolojik, ekonomik ve dijital şiddet türleri hakkında kapsamlı bilgi.',
      link: 'https://www.aile.gov.tr/tr/kamu/kamu-hizmetleri/siddet-onleme-ve-izleme-merkezleri/',
      icon: '📚',
      date: '2024',
      action: 'openLink'
    },
    {
      id: 4,
      title: 'Haklarım Neler?',
      category: 'education',
      type: 'video',
      description: 'Kadınların yasal hakları hakkında eğitim videosu.',
      link: "https://www.youtube.com/watch?v=kWdtv_JxqqY",
      icon: '🎥',
      date: '2024',
      action: 'openVideo'
    },
    {
      id: 5,
      title: 'Güvenlik Planı Rehberi',
      category: 'safety',
      type: 'article',
      description: 'Kendiniz ve çocuklarınız için güvenlik planı nasıl yapılır?',
      link: '/help',
      icon: '🛡️',
      date: '2024',
      action: 'openLink'
    },
    {
      id: 6,
      title: 'ALO 183 Hattı',
      category: 'support',
      type: 'phone',
      description: '7/24 ücretsiz destek hattı. Gizlilik garantisi vardır.',
      link: 'tel:183',
      icon: '💜',
      date: '2024',
      action: 'call'
    },
    {
      id: 7,
      title: 'Ekonomik Bağımsızlık',
      category: 'support',
      type: 'article',
      description: 'Ekonomik özgürlük için adımlar ve destek programları.',
      link: 'https://www.aile.gov.tr/',
      icon: '💼',
      date: '2024',
      action: 'openLink'
    },
    {
      id: 8,
      title: 'Çocuk Destek Hizmetleri',
      category: 'children',
      type: 'article',
      description: 'Çocuklar için destek hizmetleri ve psikolojik yardım.',
      link: 'https://www.aile.gov.tr/tr/kamu/kamu-hizmetleri/siddet-onleme-ve-izleme-merkezleri/',
      icon: '👶',
      date: '2024',
      action: 'openLink'
    }
  ];

  const categories = [
    { id: 'all', name: 'Tümü', icon: '📚' },
    { id: 'legal', name: 'Yasal Haklar', icon: '⚖️' },
    { id: 'education', name: 'Eğitim', icon: '🎓' },
    { id: 'safety', name: 'Güvenlik', icon: '🛡️' },
    { id: 'support', name: 'Destek', icon: '💜' },
    { id: 'children', name: 'Çocuk', icon: '👶' }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleResourceClick = (resource) => {
    if (resource.action === 'call') {
      // Arama için
      window.location.href = resource.link;
    } else if (resource.action === 'openPDF') {
      // PDF'i görüntüleyicide aç
      setSelectedPDF({
        url: resource.link,
        title: resource.title
      });
    } else if (resource.action === 'openVideo') {
      // Video'yu görüntüleyicide aç
      setSelectedVideo({
        url: resource.link,
        title: resource.title,
        description: resource.description
      });
    } else if (resource.action === 'openLink') {
      // Link'i yeni sekmede aç (external) veya içeride (internal)
      if (resource.link.startsWith('http')) {
        window.open(resource.link, '_blank');
      } else {
        window.location.href = resource.link;
      }
    }
  };

  const closePDFViewer = () => {
    setSelectedPDF(null);
  };

  const closeVideoPlayer = () => {
    setSelectedVideo(null);
  };

  const getActionText = (resource) => {
    if (resource.action === 'call') return '📞 Ara';
    if (resource.type === 'pdf') return '📄 Görüntüle';
    if (resource.type === 'video') return '▶️ İzle';
    return '📖 Oku';
  };

  return (
    <div className="library-page">
      {/* Hero Section */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-purple-dark) 100%)',
        color: 'white',
        padding: '3rem 0'
      }}>
        <div className="container">
          <h1 style={{ 
            color: 'white', 
            fontSize: '2.5rem', 
            textAlign: 'center',
            marginBottom: '1rem' 
          }}>
            📚 Kaynak Kütüphanesi
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            color: 'rgba(255,255,255,0.95)',
            maxWidth: '700px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            Haklarınız, güvenliğiniz ve kendinizi güçlendirmeniz için kaynaklar.
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="section">
        <div className="container">
          <div className="library-controls">
            <input
              type="text"
              placeholder="🔍 Kaynak ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="library-search"
            />
            
            <div className="category-filter">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span>{category.icon}</span> {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="section">
        <div className="container">
          <div className="resources-grid">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="resource-card">
                <div className="resource-icon">{resource.icon}</div>
                <div className="resource-badge">{resource.type.toUpperCase()}</div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <div className="resource-footer">
                  <span className="resource-date">📅 {resource.date}</span>
                  <button 
                    onClick={() => handleResourceClick(resource)}
                    className="resource-link"
                  >
                    {getActionText(resource)}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PDF Viewer Modal */}
      {selectedPDF && (
        <div className="pdf-modal-overlay" onClick={closePDFViewer}>
          <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="pdf-modal-close" onClick={closePDFViewer}>
              ✕
            </button>
            <PDFViewer pdfUrl={selectedPDF.url} title={selectedPDF.title} />
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="pdf-modal-overlay" onClick={closeVideoPlayer}>
          <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="pdf-modal-close" onClick={closeVideoPlayer}>
              ✕
            </button>
            <VideoPlayer 
              videoUrl={selectedVideo.url} 
              title={selectedVideo.title}
              description={selectedVideo.description}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Library;

