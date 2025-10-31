import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/global.css';
import '../styles/safe-journal.css';
import * as violenceLogService from '../services/violenceLogService';

const SafeJournal = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [filters, setFilters] = useState({
    violenceType: '',
    searchText: '',
    startDate: '',
    endDate: ''
  });
  const [stats, setStats] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    violenceType: 'psikolojik',
    details: '',
    perpetrator: '',
    location: null,
    mood: 5,
    helpReceived: false,
    helpSource: '',
    photos: [],
    notes: ''
  });

  useEffect(() => {
    loadLogs();
    loadStatistics();
    
    // Gizli erişim kontrolü (güvenlik için)
    document.title = 'Kişisel Notlar'; // Normal görünür başlık
    
    // Hızlı çıkış tuşu (ESC)
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showForm) {
        setShowForm(false);
        setEditingLog(null);
        resetForm();
      }
    };
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const loadLogs = async () => {
    try {
      setLoading(true);
      const allLogs = await violenceLogService.getAllLogs();
      setLogs(allLogs);
    } catch (error) {
      console.error('Kayıtlar yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStatistics = async () => {
    try {
      const statistics = await violenceLogService.getStatistics();
      setStats(statistics);
    } catch (error) {
      console.error('İstatistikler yüklenemedi:', error);
    }
  };

  const handleFilter = async () => {
    try {
      setLoading(true);
      const filtered = await violenceLogService.filterLogs(filters);
      setLogs(filtered);
    } catch (error) {
      console.error('Filtreleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = async () => {
    setFilters({
      violenceType: '',
      searchText: '',
      startDate: '',
      endDate: ''
    });
    await loadLogs();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingLog) {
        await violenceLogService.updateLog(editingLog.id, formData);
      } else {
        // Konum bilgisi al (opsiyonel)
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              formData.location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };
              saveLog(formData);
            },
            () => {
              // Konum izni verilmediyse konum olmadan kaydet
              saveLog(formData);
            }
          );
        } else {
          saveLog(formData);
        }
      }
    } catch (error) {
      alert('Kayıt eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Kayıt hatası:', error);
    }
  };

  const saveLog = async (data) => {
    try {
      if (editingLog) {
        await violenceLogService.updateLog(editingLog.id, data);
      } else {
        await violenceLogService.addViolenceLog(data);
      }
      
      await loadLogs();
      await loadStatistics();
      setShowForm(false);
      setEditingLog(null);
      resetForm();
    } catch (error) {
      alert('Kayıt eklenirken bir hata oluştu.');
      console.error('Kayıt hatası:', error);
    }
  };

  const handleEdit = (log) => {
    setEditingLog(log);
    setFormData({
      violenceType: log.violenceType,
      details: log.details,
      perpetrator: log.perpetrator,
      location: log.location,
      mood: log.mood,
      helpReceived: log.helpReceived,
      helpSource: log.helpSource || '',
      photos: log.photos || [],
      notes: log.notes || ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(t('safeJournal.deleteConfirm'))) {
      try {
        await violenceLogService.deleteLog(id);
        await loadLogs();
        await loadStatistics();
      } catch (error) {
        alert(t('safeJournal.deleteError'));
        console.error('Silme hatası:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      violenceType: 'psikolojik',
      details: '',
      perpetrator: '',
      location: null,
      mood: 5,
      helpReceived: false,
      helpSource: '',
      photos: [],
      notes: ''
    });
  };

  const handleExportPDF = async () => {
    try {
      const exportData = await violenceLogService.exportAllData();
      
      // Basit PDF oluşturma (gelişmiş için jsPDF kütüphanesi kullanılabilir)
      let pdfContent = `
ŞİDDET KAYIT RAPORU
Oluşturulma Tarihi: ${new Date(exportData.exportDate).toLocaleDateString('tr-TR')}

TOPLAM KAYIT SAYISI: ${exportData.logs.length}

`;
      
      exportData.logs.forEach((log, index) => {
        pdfContent += `
KAYIT ${index + 1}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Tarih: ${new Date(log.date).toLocaleString('tr-TR')}
Şiddet Türü: ${getViolenceTypeLabel(log.violenceType)}
Duygu Durumu: ${log.mood}/10
Yardım Alındı: ${log.helpReceived ? 'Evet' : 'Hayır'}
${log.helpSource ? `Yardım Kaynağı: ${log.helpSource}` : ''}
${log.perpetrator ? `İlişki: ${log.perpetrator}` : ''}
${log.location ? `Konum: ${log.location.lat}, ${log.location.lng}` : ''}

Detaylar:
${log.details || 'Belirtilmemiş'}

${log.notes ? `Notlar:\n${log.notes}` : ''}

`;
      });
      
      // Blob oluştur ve indir
      const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `siddet-kayit-raporu-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      alert('Rapor oluşturulurken bir hata oluştu.');
      console.error('Export hatası:', error);
    }
  };

  const getViolenceTypeLabel = (type) => {
    const labels = {
      fiziksel: 'Fiziksel Şiddet',
      psikolojik: 'Psikolojik Şiddet',
      ekonomik: 'Ekonomik Şiddet',
      dijital: 'Dijital Şiddet',
      cinsel: 'Cinsel Şiddet',
      diğer: 'Diğer'
    };
    return labels[type] || type;
  };

  const getViolenceTypeColor = (type) => {
    const colors = {
      fiziksel: '#EF4444',
      psikolojik: '#F59E0B',
      ekonomik: '#8B5CF6',
      dijital: '#10B981',
      cinsel: '#EC4899',
      diğer: '#6B7280'
    };
    return colors[type] || '#6B7280';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('tr-TR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading && logs.length === 0) {
    return (
      <div className="safe-journal-page">
        <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>
          <div className="loading-spinner">💜</div>
          <p>Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="safe-journal-page">
      {/* Header */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-purple-dark) 100%)',
        color: 'white',
        padding: '2rem 0'
      }}>
        <div className="container">
          <h1 style={{ color: 'white', fontSize: '2rem', marginBottom: '0.5rem' }}>
            📝 {t('safeJournal.title')}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem' }}>
            {t('safeJournal.subtitle')}
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2rem 0' }}>
        {/* İstatistikler */}
        {stats && (
          <div className="journal-stats">
            <div className="stat-item">
              <span className="stat-value">{stats.total}</span>
              <span className="stat-label">{t('safeJournal.totalRecords')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.averageMood}</span>
              <span className="stat-label">{t('safeJournal.averageMood')}</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{stats.helpReceivedCount}</span>
              <span className="stat-label">{t('safeJournal.helpReceived')}</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="journal-actions">
          <button 
            className="btn btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              setEditingLog(null);
              resetForm();
            }}
          >
            {showForm ? `✕ ${t('common.cancel')}` : `+ ${t('safeJournal.addNew')}`}
          </button>
          <button 
            className="btn btn-secondary"
            onClick={handleExportPDF}
            disabled={logs.length === 0}
          >
            📄 {t('safeJournal.downloadReport')}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="journal-form-container">
            <form onSubmit={handleSubmit} className="journal-form">
              <h3>{editingLog ? t('safeJournal.editLog') : t('safeJournal.addNew')}</h3>
              
              <div className="form-group">
                <label>Şiddet Türü *</label>
                <select
                  value={formData.violenceType}
                  onChange={(e) => setFormData({ ...formData, violenceType: e.target.value })}
                  required
                >
                  <option value="fiziksel">Fiziksel Şiddet</option>
                  <option value="psikolojik">Psikolojik Şiddet</option>
                  <option value="ekonomik">Ekonomik Şiddet</option>
                  <option value="dijital">Dijital Şiddet</option>
                  <option value="cinsel">Cinsel Şiddet</option>
                  <option value="diğer">Diğer</option>
                </select>
              </div>

              <div className="form-group">
                <label>Detaylar *</label>
                <textarea
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Ne oldu? (Detayları yazabilirsiniz, isim yazmayın)"
                  rows="4"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Kim? (Kod Adı)</label>
                  <input
                    type="text"
                    value={formData.perpetrator}
                    onChange={(e) => setFormData({ ...formData, perpetrator: e.target.value })}
                    placeholder="Örn: Kişi A, Eş, Aile üyesi"
                  />
                </div>

                <div className="form-group">
                  <label>Duygu Durumu: {formData.mood}/10</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.mood}
                    onChange={(e) => setFormData({ ...formData, mood: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.helpReceived}
                    onChange={(e) => setFormData({ ...formData, helpReceived: e.target.checked })}
                  />
                  Yardım aldım
                </label>
              </div>

              {formData.helpReceived && (
                <div className="form-group">
                  <label>Yardım Kaynağı</label>
                  <input
                    type="text"
                    value={formData.helpSource}
                    onChange={(e) => setFormData({ ...formData, helpSource: e.target.value })}
                    placeholder="Örn: ŞÖNİM, Polis, Doktor"
                  />
                </div>
              )}

              <div className="form-group">
                <label>Ek Notlar</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ekstra notlar..."
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingLog ? 'Güncelle' : 'Kaydet'}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowForm(false);
                    setEditingLog(null);
                    resetForm();
                  }}
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filtreler */}
        {!showForm && (
          <div className="journal-filters">
            <input
              type="text"
              placeholder="🔍 Ara..."
              value={filters.searchText}
              onChange={(e) => setFilters({ ...filters, searchText: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
              className="filter-input"
            />
            <select
              value={filters.violenceType}
              onChange={(e) => setFilters({ ...filters, violenceType: e.target.value })}
              className="filter-select"
            >
              <option value="">Tüm Şiddet Türleri</option>
              <option value="fiziksel">Fiziksel</option>
              <option value="psikolojik">Psikolojik</option>
              <option value="ekonomik">Ekonomik</option>
              <option value="dijital">Dijital</option>
              <option value="cinsel">Cinsel</option>
            </select>
            <button onClick={handleFilter} className="btn btn-primary">Filtrele</button>
            <button onClick={resetFilters} className="btn btn-secondary">Sıfırla</button>
          </div>
        )}

        {/* Kayıt Listesi */}
        {!showForm && (
          <div className="journal-logs">
            {logs.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <h3>Henüz kayıt yok</h3>
                <p>İlk kaydınızı eklemek için "Yeni Kayıt" butonuna tıklayın.</p>
              </div>
            ) : (
              logs.map((log) => (
                <div key={log.id} className="log-card">
                  <div className="log-header">
                    <div className="log-type" style={{ 
                      backgroundColor: getViolenceTypeColor(log.violenceType) + '20',
                      color: getViolenceTypeColor(log.violenceType)
                    }}>
                      {getViolenceTypeLabel(log.violenceType)}
                    </div>
                    <div className="log-date">{formatDate(log.date)}</div>
                  </div>
                  
                  <div className="log-content">
                    <p className="log-details">{log.details}</p>
                    
                    <div className="log-meta">
                      <span className="log-mood">
                        Duygu: {log.mood}/10 {log.mood <= 3 ? '😢' : log.mood <= 5 ? '😐' : '🙂'}
                      </span>
                      {log.perpetrator && (
                        <span className="log-perpetrator">👤 {log.perpetrator}</span>
                      )}
                      {log.helpReceived && (
                        <span className="log-help">✅ Yardım Alındı</span>
                      )}
                    </div>
                    
                    {log.notes && (
                      <div className="log-notes">
                        <strong>Notlar:</strong> {log.notes}
                      </div>
                    )}
                  </div>
                  
                  <div className="log-actions">
                    <button onClick={() => handleEdit(log)} className="btn-sm btn-edit">
                      ✏️ Düzenle
                    </button>
                    <button onClick={() => handleDelete(log.id)} className="btn-sm btn-delete">
                      🗑️ Sil
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Güvenlik Uyarısı */}
        <div className="security-warning">
          <strong>🔒 Güvenlik:</strong> Bu kayıtlar sadece bu cihazda saklanır. 
          Önemli bilgileri yedeklemeyi unutmayın.
        </div>
      </div>
    </div>
  );
};

export default SafeJournal;

