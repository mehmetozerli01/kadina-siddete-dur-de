/**
 * Şiddet Kayıt Servisi
 * IndexedDB kullanarak güvenli kayıt saklama
 */

// Veritabanı adı ve sürümü
const DB_NAME = 'ViolenceLogDB';
const DB_VERSION = 1;
const STORE_NAME = 'violence_logs';

/**
 * Veritabanını başlat
 */
const initDB = () => {
  return new Promise((resolve, reject) => {
    if (!('indexedDB' in window)) {
      reject(new Error('IndexedDB desteklenmiyor'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error('Veritabanı açılamadı'));
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      
      // Object store oluştur
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const objectStore = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: false });
        
        // İndeksler oluştur (hızlı arama için)
        objectStore.createIndex('date', 'date', { unique: false });
        objectStore.createIndex('violenceType', 'violenceType', { unique: false });
        objectStore.createIndex('perpetrator', 'perpetrator', { unique: false });
      }
    };
  });
};

/**
 * Basit encoding (güvenlik için basit obfuscation)
 */
const simpleEncode = (text) => {
  if (!text) return '';
  return btoa(unescape(encodeURIComponent(text)));
};

const simpleDecode = (encoded) => {
  if (!encoded) return '';
  try {
    return decodeURIComponent(escape(atob(encoded)));
  } catch {
    return encoded; // Eğer encode edilmemişse olduğu gibi döndür
  }
};

/**
 * Yeni kayıt ekle
 */
export const addViolenceLog = async (logData) => {
  try {
    const db = await initDB();
    
    const log = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      violenceType: logData.violenceType || 'diğer',
      details: simpleEncode(logData.details || ''),
      perpetrator: logData.perpetrator || 'Belirtilmedi',
      location: logData.location || null,
      mood: logData.mood || 5,
      helpReceived: logData.helpReceived || false,
      helpSource: simpleEncode(logData.helpSource || ''),
      photos: logData.photos || [],
      notes: simpleEncode(logData.notes || ''),
      createdAt: new Date().toISOString()
    };

    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.add(log);
      
      request.onsuccess = () => {
        // Metadata'yı localStorage'a da kaydet (hızlı liste için)
        updateLocalStorageMetadata(log);
        resolve(log.id);
      };
      
      request.onerror = () => {
        reject(new Error('Kayıt eklenemedi'));
      };
    });
  } catch (error) {
    console.error('Kayıt ekleme hatası:', error);
    throw error;
  }
};

/**
 * Tüm kayıtları getir
 */
export const getAllLogs = async () => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index('date');
    
    return new Promise((resolve, reject) => {
      const request = index.getAll();
      
      request.onsuccess = () => {
        const logs = request.result.map(log => ({
          ...log,
          details: simpleDecode(log.details),
          helpSource: simpleDecode(log.helpSource),
          notes: simpleDecode(log.notes)
        }));
        
        // Tarihe göre sırala (yeni -> eski)
        logs.sort((a, b) => new Date(b.date) - new Date(a.date));
        resolve(logs);
      };
      
      request.onerror = () => {
        reject(new Error('Kayıtlar getirilemedi'));
      };
    });
  } catch (error) {
    console.error('Kayıt getirme hatası:', error);
    return [];
  }
};

/**
 * Belirli bir kaydı getir
 */
export const getLogById = async (id) => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.get(id);
      
      request.onsuccess = () => {
        if (request.result) {
          const log = {
            ...request.result,
            details: simpleDecode(request.result.details),
            helpSource: simpleDecode(request.result.helpSource),
            notes: simpleDecode(request.result.notes)
          };
          resolve(log);
        } else {
          resolve(null);
        }
      };
      
      request.onerror = () => {
        reject(new Error('Kayıt getirilemedi'));
      };
    });
  } catch (error) {
    console.error('Kayıt getirme hatası:', error);
    return null;
  }
};

/**
 * Kayıt güncelle
 */
export const updateLog = async (id, updateData) => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    // Önce mevcut kaydı getir
    const existingLog = await getLogById(id);
    if (!existingLog) {
      throw new Error('Kayıt bulunamadı');
    }
    
    const updatedLog = {
      ...existingLog,
      ...updateData,
      // Encode edilmesi gereken alanları encode et
      details: simpleEncode(updateData.details || existingLog.details),
      helpSource: simpleEncode(updateData.helpSource || existingLog.helpSource),
      notes: simpleEncode(updateData.notes || existingLog.notes),
      updatedAt: new Date().toISOString()
    };
    
    return new Promise((resolve, reject) => {
      const request = store.put(updatedLog);
      
      request.onsuccess = () => {
        updateLocalStorageMetadata(updatedLog);
        resolve(updatedLog.id);
      };
      
      request.onerror = () => {
        reject(new Error('Kayıt güncellenemedi'));
      };
    });
  } catch (error) {
    console.error('Kayıt güncelleme hatası:', error);
    throw error;
  }
};

/**
 * Kayıt sil
 */
export const deleteLog = async (id) => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.delete(id);
      
      request.onsuccess = () => {
        removeFromLocalStorageMetadata(id);
        resolve(true);
      };
      
      request.onerror = () => {
        reject(new Error('Kayıt silinemedi'));
      };
    });
  } catch (error) {
    console.error('Kayıt silme hatası:', error);
    throw error;
  }
};

/**
 * Filtrele ve ara
 */
export const filterLogs = async (filters) => {
  try {
    const allLogs = await getAllLogs();
    
    let filtered = [...allLogs];
    
    // Şiddet türüne göre filtrele
    if (filters.violenceType) {
      filtered = filtered.filter(log => log.violenceType === filters.violenceType);
    }
    
    // Tarih aralığına göre filtrele
    if (filters.startDate) {
      filtered = filtered.filter(log => new Date(log.date) >= new Date(filters.startDate));
    }
    if (filters.endDate) {
      filtered = filtered.filter(log => new Date(log.date) <= new Date(filters.endDate));
    }
    
    // Arama metni
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      filtered = filtered.filter(log => 
        log.details?.toLowerCase().includes(searchLower) ||
        log.notes?.toLowerCase().includes(searchLower) ||
        log.perpetrator?.toLowerCase().includes(searchLower)
      );
    }
    
    return filtered;
  } catch (error) {
    console.error('Filtreleme hatası:', error);
    return [];
  }
};

/**
 * İstatistikler
 */
export const getStatistics = async () => {
  try {
    const logs = await getAllLogs();
    
    const stats = {
      total: logs.length,
      byType: {},
      byMonth: {},
      averageMood: 0,
      helpReceivedCount: 0
    };
    
    let totalMood = 0;
    
    logs.forEach(log => {
      // Şiddet türüne göre
      stats.byType[log.violenceType] = (stats.byType[log.violenceType] || 0) + 1;
      
      // Aya göre
      const month = new Date(log.date).toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' });
      stats.byMonth[month] = (stats.byMonth[month] || 0) + 1;
      
      // Mood ortalaması
      totalMood += log.mood || 5;
      
      // Yardım alınan
      if (log.helpReceived) {
        stats.helpReceivedCount++;
      }
    });
    
    stats.averageMood = logs.length > 0 ? (totalMood / logs.length).toFixed(1) : 0;
    
    return stats;
  } catch (error) {
    console.error('İstatistik hatası:', error);
    return null;
  }
};

/**
 * LocalStorage metadata güncelleme (hızlı liste için)
 */
const updateLocalStorageMetadata = (log) => {
  try {
    const metadata = JSON.parse(localStorage.getItem('violence_logs_metadata') || '[]');
    const existingIndex = metadata.findIndex(m => m.id === log.id);
    
    const meta = {
      id: log.id,
      date: log.date,
      violenceType: log.violenceType,
      mood: log.mood,
      helpReceived: log.helpReceived
    };
    
    if (existingIndex >= 0) {
      metadata[existingIndex] = meta;
    } else {
      metadata.push(meta);
    }
    
    localStorage.setItem('violence_logs_metadata', JSON.stringify(metadata));
  } catch (error) {
    console.error('Metadata güncelleme hatası:', error);
  }
};

/**
 * LocalStorage metadata'dan sil
 */
const removeFromLocalStorageMetadata = (id) => {
  try {
    const metadata = JSON.parse(localStorage.getItem('violence_logs_metadata') || '[]');
    const filtered = metadata.filter(m => m.id !== id);
    localStorage.setItem('violence_logs_metadata', JSON.stringify(filtered));
  } catch (error) {
    console.error('Metadata silme hatası:', error);
  }
};

/**
 * Tüm verileri export et (JSON)
 */
export const exportAllData = async () => {
  try {
    const logs = await getAllLogs();
    const stats = await getStatistics();
    
    const exportData = {
      exportDate: new Date().toISOString(),
      logs: logs,
      statistics: stats
    };
    
    return exportData;
  } catch (error) {
    console.error('Export hatası:', error);
    throw error;
  }
};

/**
 * Tüm verileri sil (dikkatli kullan!)
 */
export const clearAllData = async () => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.clear();
      
      request.onsuccess = () => {
        localStorage.removeItem('violence_logs_metadata');
        resolve(true);
      };
      
      request.onerror = () => {
        reject(new Error('Veriler silinemedi'));
      };
    });
  } catch (error) {
    console.error('Silme hatası:', error);
    throw error;
  }
};

