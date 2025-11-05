import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import '../styles/pdf-viewer.css';

// PDF.js worker'ı ayarla - HTTPS kullan
if (typeof window !== 'undefined' && window.pdfjsWorker) {
  pdfjs.GlobalWorkerOptions.workerSrc = window.pdfjsWorker;
} else {
  // Alternatif worker URL'leri
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

const PDFViewer = ({ pdfUrl, title }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useIframe, setUseIframe] = useState(false);
  const [loadTimeout, setLoadTimeout] = useState(false);

  // PDF URL değiştiğinde state'i sıfırla
  useEffect(() => {
    setLoading(true);
    setError(null);
    setNumPages(null);
    setPageNumber(1);
    setUseIframe(false);
    setLoadTimeout(false);

    // 10 saniye sonra timeout olursa iframe'e geç
    const timeout = setTimeout(() => {
      setLoadTimeout(true);
      setUseIframe(true);
      setLoading(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [pdfUrl]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (error) => {
    console.error('PDF yükleme hatası:', error);
    setError('PDF yüklenirken bir hata oluştu. CORS veya network hatası olabilir.');
    setLoading(false);
  };

  const goToPrevPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const goToNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handleScaleChange = (newScale) => {
    setScale(newScale);
  };

  const downloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = title || 'document.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="pdf-viewer-container">
      <div className="pdf-viewer-header">
        <div className="pdf-viewer-title">
          <h3>{title || 'PDF Görüntüleyici'}</h3>
        </div>
        <div className="pdf-viewer-controls">
          <button
            onClick={() => handleScaleChange(scale - 0.25)}
            disabled={scale <= 0.5}
            className="control-btn"
            title="Küçült"
          >
            ➖
          </button>
          <span className="scale-indicator">{Math.round(scale * 100)}%</span>
          <button
            onClick={() => handleScaleChange(scale + 0.25)}
            disabled={scale >= 2}
            className="control-btn"
            title="Büyüt"
          >
            ➕
          </button>
          <button
            onClick={downloadPDF}
            className="control-btn download-btn"
            title="PDF İndir"
          >
            ⬇️ İndir
          </button>
        </div>
      </div>

      <div className="pdf-viewer-content">
        {useIframe ? (
          <div className="pdf-iframe-container">
            <div className="iframe-warning">
              <p>⚠️ PDF iframe ile görüntüleniyor (CORS sorunu nedeniyle)</p>
              <button 
                onClick={() => window.open(pdfUrl, '_blank')}
                className="open-new-tab-btn"
              >
                📄 Yeni Sekmede Aç
              </button>
            </div>
            <iframe
              src={pdfUrl}
              title={title}
              className="pdf-iframe"
              style={{
                width: '100%',
                minHeight: '600px',
                border: 'none',
                borderRadius: '8px'
              }}
            />
          </div>
        ) : loading && !error ? (
          <div className="pdf-loading">
            <div className="loading-spinner"></div>
            <p>PDF yükleniyor...</p>
            <p style={{ fontSize: '0.9rem', color: '#6B7280', marginTop: '1rem' }}>
              Eğer yükleme uzun sürüyorsa, CORS sorunu olabilir.
            </p>
            <button
              onClick={() => setUseIframe(true)}
              className="switch-iframe-btn"
              style={{
                marginTop: '1rem',
                padding: '0.5rem 1rem',
                background: '#8B5CF6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
            >
              Iframe ile Aç
            </button>
          </div>
        ) : error ? (
          <div className="pdf-error">
            <p>❌ {error}</p>
            <p className="error-hint">
              PDF yüklenemedi. Bu genellikle CORS (Cross-Origin Resource Sharing) hatasından kaynaklanır.
            </p>
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={() => setUseIframe(true)}
                className="switch-iframe-btn"
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#8B5CF6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Iframe ile Aç
              </button>
              <a 
                href={pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  padding: '0.75rem 1.5rem',
                  background: '#F59E0B',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  display: 'inline-block'
                }}
              >
                📄 Yeni Sekmede Aç
              </a>
            </div>
          </div>
        ) : numPages ? (
          <>
            <div className="pdf-navigation">
              <button
                onClick={goToPrevPage}
                disabled={pageNumber <= 1}
                className="nav-btn"
              >
                ← Önceki
              </button>
              <span className="page-info">
                Sayfa {pageNumber} / {numPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                className="nav-btn"
              >
                Sonraki →
              </button>
            </div>

            <div className="pdf-page-container">
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                loading={
                  <div className="pdf-loading">
                    <div className="loading-spinner"></div>
                    <p>PDF yükleniyor...</p>
                  </div>
                }
                error={
                  <div className="pdf-error">
                    <p>PDF yüklenemedi</p>
                    <p className="error-hint">
                      CORS hatası olabilir. Lütfen{' '}
                      <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
                        yeni sekmede açmayı
                      </a>{' '}
                      deneyin.
                    </p>
                  </div>
                }
                options={{
                  cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/cmaps/`,
                  cMapPacked: true,
                  standardFontDataUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/standard_fonts/`,
                }}
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  loading={
                    <div className="pdf-loading">
                      <div className="loading-spinner"></div>
                      <p>Sayfa yükleniyor...</p>
                    </div>
                  }
                />
              </Document>
            </div>
          </>
        ) : !error && (
          <div className="pdf-loading">
            <div className="loading-spinner"></div>
            <p>PDF hazırlanıyor...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;

