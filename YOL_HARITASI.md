# 🗺️ Kadına Şiddete Dur De - Yol Haritası

> **Hedef:** Daha fazla kadına ulaşmak, daha etkili destek vermek, toplumsal farkındalık oluşturmak

---

## 📅 GENEL ZAMAN ÇİZELGESİ

```
┌─────────────────────────────────────────────────────────────┐
│ HAFTA 1-2    → Güvenlik Özellikleri (Hızlı Çıkış, Temizlik) │
│ HAFTA 3-4    → PWA & Offline Destek                          │
│ HAFTA 5-6    → Yakındaki ŞÖNİM Bulucu                       │
│ HAFTA 7-8    → Kaynak Kütüphanesi                            │
│ HAFTA 9-10   → Çocuk Destek Modülü                           │
│ HAFTA 11-12  → Çok Dilli Destek                              │
│ HAFTA 13-14  → Topluluk & Sosyal Özellikler                 │
│ HAFTA 15-16  → Test, Optimizasyon, Yayın                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 FASE 1: GÜVENLİK VE HIZLI ERİŞİM (İlk 2 Hafta)

### Öncelik: ⚡ ÇOK YÜKSEK
**Amaç:** Kullanıcı güvenliğini sağlamak, acil durumlarda hızlı erişim

### 1.1 Hızlı Çıkış Butonu (QUICK EXIT)
```javascript
// Özellikler:
- Her sayfada sol altta gizli buton (ESC veya özel hareket)
- 3 saniyede tüm siteyi kapat
- Tarayıcı geçmişini temizle
- Ana ekrana geri dön (mobile)
- Panic mode aktivasyonu

// Implementation:
src/components/
└── QuickExit.jsx
    ├── TripleClick.jsx      // 3 tıklama ile çıkış
    ├── ESCKeyHandler.jsx    // ESC tuşu ile çıkış
    ├── SwipeHandler.jsx     // Mobil kaydırma ile çıkış
    └── PanicMode.jsx        // Acil mod
```

**Kod Örneği:**
```jsx
// src/components/QuickExit.jsx
import { useEffect } from 'react';

const QuickExit = () => {
  useEffect(() => {
    let clicks = 0;
    let timer = null;

    const handleQuickExit = () => {
      clicks++;
      
      if (clicks === 3) {
        // Panic mode
        window.location.href = 'https://www.google.com';
        setTimeout(() => {
          window.location.href = 'about:blank';
        }, 100);
      }
      
      timer = setTimeout(() => {
        clicks = 0;
      }, 2000);
    };

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        handleQuickExit();
      }
    });

    return () => {
      document.removeEventListener('keydown', handleQuickExit);
    };
  }, []);

  return null; // Invisible component
};
```

### 1.2 Güvenlik Ayarları
```javascript
features/
├── SecuritySettings.jsx
├── BrowserHistoryCleaner.jsx
├── AutoLogout.jsx
└── PrivacyMode.jsx
```

### 1.3 Gizli Navigasyon
```javascript
// URL-based güvenlik
/help → Normal görünüm
/help#safe → Gizli mod (geçmiş yok)
/emergency → Doğrudan acil numaralar
```

**Tahmini Süre:** 3-4 gün
**Zorluk:** Orta
**Etki:** ÇOK YÜKSEK ⭐⭐⭐⭐⭐

---

## 📱 FASE 2: PWA VE OFFLINE DESTEK (Hafta 3-4)

### Öncelik: ⚡ ÇOK YÜKSEK
**Amaç:** İnternet olmadan da çalışabilmek

### 2.1 Manifest.json Geliştirme
```json
{
  "name": "Kadına Şiddete Dur De",
  "short_name": "KSDD",
  "description": "Kadına yönelik şiddetle mücadele platformu",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#8B5CF6",
  "background_color": "#FFFFFF",
  "orientation": "portrait",
  "icons": [
    {
      "src": "/logo192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/logo512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 2.2 Service Worker
```javascript
// public/service-worker.js
const CACHE_NAME = 'kadina-siddete-dur-de-v1';
const urlsToCache = [
  '/',
  '/help',
  '/emergency',
  '/offline.html',
  '/styles/global.css',
  'logo192.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

### 2.3 Offline Sayfa
```jsx
// src/pages/Offline.jsx
const Offline = () => (
  <div className="offline-page">
    <h1>📴 Offline Moddayız</h1>
    <p>Ama endişelenme, ihtiyacın olan her şey burada!</p>
    
    <div className="emergency-numbers">
      <a href="tel:183">📞 183 - ŞÖNİM</a>
      <a href="tel:155">🚔 155 - POLİS</a>
      <a href="tel:112">🏥 112 - SAĞLIK</a>
    </div>
  </div>
);
```

### 2.4 Push Notifications
```javascript
// Acil durumlar, önemli haberler için
navigator.serviceWorker.ready.then((registration) => {
  registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'YOUR_VAPID_KEY'
  });
});
```

**Tahmini Süre:** 5-7 gün
**Zorluk:** Orta-Yüksek
**Etki:** ÇOK YÜKSEK ⭐⭐⭐⭐⭐

---

## 📍 FASE 3: YAKINDAKİ ŞÖNİM BULUCU (Hafta 5-6)

### Öncelik: ⚡ YÜKSEK
**Amaç:** Yakındaki destek merkezlerini bul

### 3.1 Google Maps Integration
```javascript
// src/components/LocationFinder.jsx (zaten var, geliştir)
import { Map, Marker, GoogleMap } from '@react-google-maps/api';

const LocationFinder = () => {
  const [nearbyCenters, setNearbyCenters] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setUserLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
      
      // Fetch nearby ŞÖNİM centers
      findNearbyCenters(position.coords);
    });
  }, []);

  return (
    <GoogleMap
      center={userLocation}
      zoom={15}
    >
      <Marker position={userLocation} label="Sen" />
      {nearbyCenters.map((center) => (
        <Marker 
          key={center.id}
          position={center.coordinates}
          label={center.name}
        />
      ))}
    </GoogleMap>
  );
};
```

### 3.2 ŞÖNİM Merkezleri Verisi
```javascript
// src/assets/data/sönim-centers.json
[
  {
    "id": "istanbul-1",
    "name": "İstanbul ŞÖNİM Merkezi",
    "address": "Kadıköy",
    "coordinates": [41.0082, 28.9784],
    "phone": "+90 212 XXX XX XX",
    "hours": "7/24",
    "services": ["Psikolojik Destek", "Hukuki Danışmanlık", "Acil Barınma"]
  }
]
```

### 3.3 Yol Tarifi
```javascript
<DirectionsService
  options={{
    origin: userLocation,
    destination: selectedCenter,
    travelMode: 'DRIVING'
  }}
  callback={handleDirections}
/>
```

**Tahmini Süre:** 4-5 gün
**Zorluk:** Orta
**Etki:** YÜKSEK ⭐⭐⭐⭐

---

## 📚 FASE 4: KAYNAK KÜTÜPHANESİ (Hafta 7-8)

### Öncelik: ⚡ YÜKSEK
**Amaç:** Sistematik bilgi paylaşımı

### 4.1 Sayfa Oluştur
```javascript
src/pages/Library.jsx
```

### 4.2 Bileşenler
```javascript
src/components/library/
├── DocumentViewer.jsx    // PDF viewer
├── VideoPlayer.jsx        // Video player
├── ResourceCard.jsx       // Kaynak kartı
├── FilterBar.jsx          // Filtreleme
└── DownloadButton.jsx    // İndirme
```

### 4.3 Kategoriler
```
📖 Yasal Haklar
📄 Yasal Belgeler (İstanbul Sözleşmesi, kanunlar)
📹 Eğitim Videoları
🎧 Podcast'ler
📋 Formlar
📊 Raporlar
🎯 Eğitim Materyalleri
```

### 4.4 Veri Yapısı
```javascript
src/assets/data/resources.json
[
  {
    "id": "law-001",
    "title": "İstanbul Sözleşmesi",
    "category": "yasal-haklar",
    "type": "pdf",
    "file": "/resources/istanbul-sozlesmesi.pdf",
    "description": "...",
    "downloadable": true,
    "date": "2024-01-01"
  }
]
```

**Tahmini Süre:** 5-6 gün
**Zorluk:** Düşük-Orta
**Etki:** YÜKSEK ⭐⭐⭐⭐

---

## 👶 FASE 5: ÇOCUK DESTEK MODÜLÜ (Hafta 9-10)

### Öncelik: ⚡ YÜKSEK
**Amaç:** Çocukları da desteklemek

### 5.1 Çocuklar İçin Sayfalar
```javascript
src/pages/
├── ChildrenHome.jsx       // Çocuk ana sayfası
├── ChildrenStories.jsx    // Çocuk hikayeleri
├── ChildrenGames.jsx     // Oyunlar
└── ChildrenSafety.jsx    // Güvenlik eğitimi
```

### 5.2 Çocuk Dostu Bileşenler
```javascript
src/components/children/
├── ColorBook.jsx          // Boyama kitabı
├── StoryReader.jsx       // Hikaye okuyucu
├── SafetyGuide.jsx       // Güvenlik rehberi
├── SupportFinder.jsx    // Destek bulucu (küçükler için)
└── EmergencyHelper.jsx   // Acil yardım (basitleştirilmiş)
```

### 5.3 Ebeveyn Rehberi
```javascript
src/pages/ParentGuide.jsx
├── Çocuklar ile nasıl konuşmalı
├── Şiddetten etkilenen çocuklar
├── Profesyonel destek
└── Kaynaklar
```

**Tahmini Süre:** 6-7 gün
**Zorluk:** Orta
**Etki:** YÜKSEK ⭐⭐⭐⭐

---

## 🌍 FASE 6: ÇOK DİLLİ DESTEK (Hafta 11-12)

### Öncelik: ⚡ YÜKSEK
**Amaç:** Daha fazla kadına ulaşmak

### 6.1 i18n Kurulumu
```bash
npm install i18next react-i18next
```

### 6.2 Dil Dosyaları
```javascript
src/locales/
├── tr.json    // Türkçe
├── en.json    // English
├── ku.json    // Kurdî
└── ar.json    // العربية
```

### 6.3 Kullanım
```javascript
// src/components/LanguageSwitcher.jsx
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  
  return (
    <div className="language-switcher">
      <button onClick={() => changeLanguage('tr')}>🇹🇷 TR</button>
      <button onClick={() => changeLanguage('en')}>🇬🇧 EN</button>
      <button onClick={() => changeLanguage('ku')}>🇹🇯 KU</button>
      <button onClick={() => changeLanguage('ar')}>🇸🇦 AR</button>
    </div>
  );
};
```

### 6.4 Çeviriler
```json
// src/locales/en.json
{
  "nav": {
    "home": "Home",
    "about": "About Us",
    "news": "News",
    "help": "Emergency Help"
  }
}
```

**Tahmini Süre:** 5-6 gün
**Zorluk:** Orta
**Etki:** YÜKSEK ⭐⭐⭐⭐

---

## 💬 FASE 7: TOPLULUK VE SOSYAL (Hafta 13-14)

### Öncelik: ⚡ ORTA
**Amaç:** Topluluk oluşturmak, umut vermek

### 7.1 Başarı Hikayeleri Sayfası Geliştir
```javascript
src/pages/
└── SuccessStories.jsx (yeniden tasarla)
    ├── Anonim hikayeler
    ├── İsimsiz puanlamalar
    ├── Yorumlar (modere edilmiş)
    └── İlham verici içerik
```

### 7.2 Sosyal Paylaşım
```javascript
src/components/
├── ShareButtons.jsx       // Sosyal medya
├── QuoteGenerator.jsx     // Alıntı üretici
└── CampaignSection.jsx   // Kampanya paylaşımı
```

### 7.3 Güvenli İletişim
```javascript
// Zamanlayıcılı ve modere edilmiş
features/
└── community/
    ├── StorySubmission.jsx  // Hikaye gönderimi
    ├── CommentSection.jsx   // Yorum alanı
    └── SupportChat.jsx      // Peer support
```

**Tahmini Süre:** 6-8 gün
**Zorluk:** Orta-Yüksek
**Etki:** ORTA-YÜKSEK ⭐⭐⭐

---

## ⚖️ FASE 8: YASAL HAKLAR MODÜLÜ (Bonus)

### Öncelik: ⚡ YÜKSEK
**Amaç:** Yasal hakları bilgilendirme

### 8.1 İnteraktif Rehber
```javascript
src/pages/LegalRights.jsx
├── Haklarım neler?
├── Nasıl başvuru yapılır?
├── Yasal süreç nedir?
└── Avukat bulma
```

### 8.2 Belge Oluşturucu
```javascript
src/components/legal/
├── DocumentGenerator.jsx    // Otomatik belge
├── ApplicationForm.jsx      // Başvuru formu
└── LawyerFinder.jsx         // Avukat bulucu
```

**Tahmini Süre:** 4-5 gün
**Zorluk:** Orta
**Etki:** YÜKSEK ⭐⭐⭐⭐

---

## 💼 FASE 9: İSTİHDAM VE EĞİTİM (Bonus)

### Öncelik: ⚡ ORTA-YÜKSEK
**Amaç:** Ekonomik bağımsızlık

### 9.1 İş Portalı
```javascript
src/pages/Employment.jsx
├── İş ilanları
├── Eğitim kursları
├── CV Oluşturucu
└── Mentor Programı
```

**Tahmini Süre:** 5-6 gün
**Zorluk:** Orta
**Etki:** YÜKSEK ⭐⭐⭐⭐

---

## 📊 İLERLEME TAKİBİ

### Checklist
- [ ] **Hafta 1-2:** Güvenlik özellikleri ✅
- [ ] **Hafta 3-4:** PWA geliştirme
- [ ] **Hafta 5-6:** ŞÖNİM bulucu
- [ ] **Hafta 7-8:** Kaynak kütüphanesi
- [ ] **Hafta 9-10:** Çocuk modülü
- [ ] **Hafta 11-12:** Çok dilli destek
- [ ] **Hafta 13-14:** Topluluk özellikleri
- [ ] **Hafta 15-16:** Test & Yayın

---

## 🎯 BAŞARI KRİTERLERİ

### Teknik Başarı
✅ PWA yüklemeleri
✅ Offline erişim istatistikleri
✅ Sayfa yükleme süreleri (<2 saniye)
✅ Mobil uyumluluk
✅ Hata oranları (<1%)

### Kullanıcı Deneyimi
✅ Ziyaretçi sayısı
✅ Ortalama oturum süresi
✅ Geri dönüş oranları
✅ Acil buton kullanımı

### Sosyal Etki
✅ Haber paylaşımları
✅ Sosyal medya etkileşimi
✅ Destek talepleri
✅ Yasal başvuru artışı

---

## 💡 ÖNERİLER

### Kısa Vadede (1-2 Hafta)
1. **Hızlı Çıkış butonu** - En kritik özellik
2. **Offline desteği** - Hızlı kazanım
3. **GPS entegrasyonu** - Hemen kullanışlı

### Orta Vadede (1-2 Ay)
4. **Kaynak kütüphanesi** - Değer yaratır
5. **Çocuk modülü** - Farklılaştırır
6. **Çok dilli** - Erişimi artırır

### Uzun Vadede (3+ Ay)
7. **Topluluk forumu** - Sürdürülebilirlik
8. **AI entegrasyonu** - Gelecek
9. **Uluslararası genişleme** - Global impact

---

## 🚀 ŞİMDİ NE YAPMALIYIZ?

### Hemen Başlayalım:
1. ✅ **Hızlı Çıkış butonu** ekleyelim
2. ✅ **Service Worker** ekleyelim
3. ✅ **ŞÖNİM verileri** toplayalım

### Sonra:
4. ✅ Kaynak dosyalarını hazırlayalım
5. ✅ Çocuk içeriklerini oluşturalım
6. ✅ Çevirileri tamamlayalım

---

**"Her adım, daha fazla kadının hayatına dokunmak demek."** 💜

**Hangi fazdan başlayalım?**

