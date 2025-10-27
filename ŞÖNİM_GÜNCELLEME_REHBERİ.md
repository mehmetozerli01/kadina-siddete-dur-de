# ŞÖNİM Verileri Güncelleme Rehberi

## 🎯 Neden Bu Önemli?

Bu bir toplumsal sorumluluk projesi ve **yanlış bilgi vermek ciddi sonuçlara yol açabilir**.

## 📋 Yapmanız Gerekenler

### Adım 1: Resmi Kaynaklardan Veri Toplama

1. **Aile ve Sosyal Hizmetler Bakanlığı**
   - 🌐 https://www.aile.gov.tr
   - 📞 183 (7/24 Ücretsiz)

2. **Her ilin Valiliği - Kadın ve Çocuk Hizmetleri**
   - İl İl ŞÖNİM Listesi
   - Güncel adresler ve telefonlar

3. **Koordinatları Alma (Harita için)**
   - Google Maps'te adresi arayın
   - Koordinatları alın (lat, lng)

### Adım 2: Veri Formatı

```json
{
  "id": "istanbul-uskudar",
  "name": "İstanbul ŞÖNİM",
  "city": "İstanbul",
  "district": "Üsküdar",
  "address": "GERÇEK ADRES BURAYA",
  "phone": "0212 XXX XX XX",
  "lat": 41.0216,
  "lng": 29.0115,
  "hours": "7/24",
  "services": ["Psikolojik Destek", "Hukuki Danışmanlık"],
  "description": "İstanbul Şiddet Önleme ve İzleme Merkezi",
  "isOfficial": true
}
```

### Adım 3: Hangi Şehirler İçin?

**Öncelikli 15 Şehir:**
1. İstanbul
2. Ankara  
3. İzmir
4. Bursa
5. Antalya
6. Adana
7. Gaziantep
8. Konya
9. Eskişehir
10. Mersin
11. Trabzon
12. Samsun
13. Diyarbakır
14. Sakarya
15. Malatya

### Adım 4: Kontrol Listesi

Her veri için kontrol edin:
- [ ] Adres resmi kaynaktan
- [ ] Telefon numarası doğru
- [ ] Koordinatlar Google Maps'ten
- [ ] Çalışma saatleri doğru
- [ ] Hizmetler güncel

### Adım 5: Güncellenmiş Dosya

Verileri topladıktan sonra:
- `src/assets/data/sönim-centers.json` dosyasını güncelleyin
- Gerçek adresleri ekleyin
- "isOfficial": true yapın

---

## ⚠️ ÖNEMLİ UYARI

**Yanlış adres vermek hayatı tehdit edebilir!**
- Acil durumda yanlış yere gitmek
- Vakit kaybettirmek
- Güven kaybı

**EN GÜVENLİSİ:** 
Sadece **183 numaralı hattı** gösterip, kullanıcıları resmi kaynaklara yönlendirmek.

---

## 💡 Alternatif Çözüm: API Entegrasyonu

Eğer resmi bir API varsa:

```javascript
// src/api/sonim.js
export const getSönimCenters = async () => {
  const response = await fetch('RESMI_API_URL');
  const data = await response.json();
  return data;
};
```

---

## 📞 EMİN OLMAK İÇİN

1. Her adresi Google Maps'te kontrol edin
2. Her telefonu araşın (test edin)
3. Her şehirdeki yerel STK'lardan doğrulayın
4. Aile ve Sosyal Hizmetler Bakanlığı'ndan güncel liste alın

**Bu bir test projesi değil - gerçek hayatı etkileyen bir sistem!** 💜

