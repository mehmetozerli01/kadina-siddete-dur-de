# 💜 Kadına Şiddete Dur De

Kadına yönelik şiddete karşı toplumsal farkındalık oluşturmak ve mağdur kadınlara destek olmak amacıyla geliştirilmiş bir React web uygulaması.

## 📖 Proje Hakkında

**Kadına Şiddete Dur De**, kadına yönelik şiddetle mücadelede farkındalık oluşturmak ve mağdur kadınlara destek olmak amacıyla kurulmuş bir toplumsal sorumluluk projesidir. Amacımız, kadınların şiddetsiz bir yaşam sürmelerini sağlamak ve toplumsal cinsiyet eşitliğinin gerçekleşmesine katkıda bulunmaktır.

## ✨ Özellikler

- 🏠 **Ana Sayfa**: Misyon, vizyon ve hızlı erişim bilgileri
- 📰 **Haberler**: Kadına yönelik şiddetle ilgili güncel haberler ve gelişmeler
- 💬 **Hikayeler**: Umut dolu başarı hikayeleri
- 📊 **İstatistikler**: Şiddet türleri ve destek hizmetleri hakkında bilgiler
- 🆘 **Acil Yardım**: Yardım hatları ve acil durum bilgileri
- ℹ️ **Hakkımızda**: Proje hakkında detaylı bilgiler
- 🎭 **Senaryo Oyunu**: Gerçek hayattan alınmış senaryolarla interaktif eğitim
- 🗺️ **Şiddet Haritası**: Türkiye'de şiddet verilerinin görselleştirilmesi
- 📚 **Kaynak Kütüphanesi**: PDF, video ve eğitim materyalleri
- 📈 **Canlı İstatistikler**: Gerçek zamanlı veri görüntüleme

### 🚀 **YENİ: AI Destekli Özellikler**

- 🎤 **Sesli Komutlu Acil Yardım**: Sesli komutlarla acil yardım çağırma
  - "Acil Yardım", "Emergency", "Panic" gibi komutlarla otomatik arama
  - Panic butonu ile 3 saniyede otomatik yardım
  - ESC veya Space tuşu ile hızlı çıkış
  - Otomatik konum paylaşımı

- 🤖 **AI Risk Değerlendirme Sistemi**: 
  - Otomatik risk analizi ve durum değerlendirmesi
  - Akıllı öneriler ve acil eylem planları
  - Mesaj içeriği ve ses tonu analizi
  - Kişiselleştirilmiş destek yönlendirmesi

- 🛡️ **Gelişmiş Güvenlik**: 
  - Gizli çıkış butonu
  - Tarayıcı geçmişi temizleme
  - Otomatik ses kaydı (acil durumlar için)
  - Güvenli log sistemi

## 🚀 Kullanılan Teknolojiler

- **React** 19.2.0 - Modern UI geliştirme
- **React Router DOM** - Sayfa yönlendirmeleri
- **CSS3** - Modern ve responsive tasarım
- **Create React App** - Proje altyapısı

## 🎨 Tasarım

- **Renk Paleti**: 
  - Mor tonları (Ana renk - Farkındalık simgesi)
  - Beyaz ve açık gri (Temizlik ve umut)
  - Turuncu (Acil durum vurgusu)
- **Responsive**: Mobil, tablet ve desktop uyumlu
- **Modern**: Minimalist ve kullanıcı dostu arayüz
- **Erişilebilir**: WCAG standartlarına uygun

## 📁 Proje Yapısı

```
src/
├── components/         # Tekrar kullanılabilir bileşenler
│   ├── Navbar.jsx     # Navigasyon menüsü
│   ├── Footer.jsx     # Alt bilgi
│   ├── NewsCard.jsx   # Haber kartı
│   ├── StoryCard.jsx  # Hikaye kartı
│   └── StatCard.jsx   # İstatistik kartı
├── pages/             # Sayfa bileşenleri
│   ├── Home.jsx       # Ana sayfa
│   ├── About.jsx      # Hakkımızda
│   ├── News.jsx       # Haberler
│   ├── Stories.jsx    # Hikayeler
│   ├── Stats.jsx      # İstatistikler
│   └── Help.jsx       # Yardım hatları
├── layout/            # Layout bileşenleri
│   └── MainLayout.jsx # Ana layout
├── routes/            # Routing yapılandırması
│   └── AppRouter.jsx  # Ana router
├── styles/            # CSS dosyaları
│   ├── global.css     # Global stiller
│   ├── navbar.css     # Navbar stilleri
│   ├── footer.css     # Footer stilleri
│   ├── cards.css      # Card stilleri
│   └── home.css       # Ana sayfa stilleri
└── assets/            # Statik dosyalar
    └── data/          # JSON veri dosyaları
        ├── news.json  # Haber verileri
        └── stories.json # Hikaye verileri
```

## 🛠️ Kurulum

### Gereksinimler

- Node.js (v14 veya üzeri)
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın:**
```bash
git clone [repository-url]
cd kadina-siddete-dur-de
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm start
```

4. **Tarayıcınızda açın:**
```
http://localhost:3000
```

## 📜 Kullanılabilir Komutlar

- `npm start` - Geliştirme sunucusunu başlatır
- `npm test` - Test paketini çalıştırır
- `npm run build` - Production için build oluşturur
- `npm run eject` - CRA yapılandırmasını dışarı çıkarır (geri alınamaz)

## 🆘 Acil Yardım Hatları

- **183** - ALO Şiddet Hattı (ŞÖNİM) - 7/24 Ücretsiz
- **155** - Polis İmdat
- **112** - Sağlık Acil
- **156** - Jandarma İmdat

## 🎯 Önemli Sayfalar

- `/` - Ana Sayfa
- `/about` - Hakkımızda
- `/news` - Haberler
- `/stories` - Hikayeler
- `/stats` - İstatistikler
- `/help` - Acil Yardım Hatları

## 🌈 Renk Paleti

```css
--primary-purple: #8B5CF6
--primary-purple-light: #A78BFA
--primary-purple-dark: #6D28D9
--accent-orange: #F59E0B
--accent-pink: #EC4899
```

## 🤝 Katkıda Bulunma

Bu proje toplumsal farkındalık amacıyla geliştirilmiştir. Katkılarınızı bekliyoruz!

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'feat: Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Lisans

Bu proje toplumsal farkındalık amacıyla geliştirilmiştir.

## 💜 Destek ve İletişim

Bu proje, kadına yönelik şiddetle mücadele eden tüm kadınlara ve kuruluşlara adanmıştır.

**Hatırlatma**: Bu bir bilgilendirme ve farkındalık projesidir. Acil durumlarda lütfen 183 veya 155 numaralarını arayın.

---

**"Sen yalnız değilsin. Birlikte daha güçlüyüz."** 💜
