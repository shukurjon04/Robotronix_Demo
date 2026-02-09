# 🤖 Robotronix - Robototexnika Ta'lim Platformasi

![Robotronix Logo](assets/images/logo.png)

**Robotronix** - O'zbekistonda robototexnika ta'limini yangi bosqichga olib chiquvchi zamonaviy veb-platforma. Farg'ona va Namangan viloyatlarida faoliyat yurituvchi yetakchi robototexnika markazi uchun ishlab chiqilgan.

## 🚀 Loyiha Haqida

Robotronix veb-sayti ustoz.ai dizayn uslubida, lekin robototexnika mavzusiga moslashtirilgan holda yaratilgan. Sayt bolalar va o'qituvchilar uchun robototexnika, elektronika va dasturlash kurslarini taklif etadi.

### ✨ Asosiy Xususiyatlar

- 🎨 **Zamonaviy Dizayn**: Hi-tech uslubda, ko'k va oq ranglar gammasida
- 📱 **To'liq Responsiv**: Barcha qurilmalarda mukammal ishlaydi
- 🎯 **Interaktiv Elementlar**: Animatsiyalar va o'zaro ta'sir
- 🔧 **Robototexnika Mavzusi**: Maxsus robot animatsiyalari va kod namunalari
- 🎓 **Ta'lim Yo'naltirilgan**: Kurslar va mahsulotlar bo'yicha to'liq ma'lumot
- 📞 **Oson Bog'lanish**: Telegram va WhatsApp integratsiyasi

## 🏗️ Texnik Tuzilma

### Fayl Tuzilmasi
```
Robotronix-website/
├── index.html              # Asosiy sahifa
├── assets/
│   ├── css/
│   │   └── style.css       # Asosiy CSS stillar
│   ├── js/
│   │   └── script.js       # JavaScript funksiyalar
│   └── images/             # Rasmlar va ikonkalar
├── pages/
│   ├── courses.html        # Kurslar sahifasi
│   └── products.html       # Mahsulotlar sahifasi
└── README.md               # Loyiha dokumentatsiyasi
```

### 🛠️ Texnologiyalar

- **HTML5**: Semantik markup
- **CSS3**: Modern styling (CSS Grid, Flexbox, Custom Properties)
- **JavaScript (ES6+)**: Interaktiv funksiyalar
- **Font Awesome 6**: Ikonkalar
- **Google Fonts**: Inter font oilasi
- **AOS Library**: Scroll animatsiyalari

## 🎨 Dizayn Tizimi

### Rang Palitra
- **Asosiy**: `#0066ff` (Ko'k)
- **Ikkinchi**: `#00ccff` (Och ko'k)
- **Urg'u**: `#ff6b35` (Qizil-to'q sariq)
- **Qora fon**: `#0a0e1a`
- **Karta fonlari**: `#1a1f2e`
- **Matn**: `#ffffff` (Oq)

### Animatsiyalar
- Robot ko'z qirpishi
- LED indikatorlar miltillashi
- Suzuvchi elementlar
- Kod yozish animatsiyasi
- Robot qo'llarining harakati

## 📋 Sahifalar va Bo'limlar

### 🏠 Asosiy Sahifa (index.html)
- **Hero Bo'lim**: Animatsiyali robot va asosiy xabar
- **Xususiyatlar**: 4 ta asosiy afzallik
- **Kurslar**: Bolalar va o'qituvchilar uchun
- **Mahsulotlar**: Arduino va LEGO to'plamlari
- **Hamkorlar**: IT Park, Cyberpark va boshqalar
- **Biz Haqimizda**: Kompaniya tarixi va yutuqlari
- **FAQ**: Tez-tez beriladigan savollar
- **Bog'lanish**: Kontakt ma'lumotlari va forma

### 📚 Kurslar Sahifasi (pages/courses.html)
- **Filtrlash**: Yosh, format, auditoriya bo'yicha
- **Batafsil Ma'lumot**: Har bir kurs uchun to'liq tavsif
- **Narxlar**: Oylik to'lov miqdorlari
- **Yozilish**: Telegram/WhatsApp orqali

### 🛒 Mahsulotlar Sahifasi (pages/products.html)
- **Katalog**: Barcha mahsulotlar ro'yxati
- **Toifalar**: Arduino, LEGO, 3D modellar
- **Xususiyatlar**: Har bir mahsulot tavsifi
- **Narxlar**: Chegirmalar va aksiyalar

## 🎯 Maqsadli Auditoriya

1. **Bolalar va O'smirlar** (4-18 yosh)
   - Robototexnika va dasturlashga qiziquvchilar
   - Texnik yo'nalishda rivojlanmoqchi bolalar

2. **Ota-onalar**
   - Farzandlarining ta'limiga g'amxo'r qiluvchilar
   - Zamonaviy ta'lim qidiruvchilar

3. **O'qituvchilar**
   - Texnologiya fani o'qituvchilari
   - Malaka oshirish istovchilar

4. **Ta'lim Muasasalari**
   - Maktablar va o'quv markazlari
   - Jihozlar sotib oluvchilar

## 🚀 Ishga Tushirish

### Mahalliy Muhitda Ishlatish

1. **Repozitoriyani Klonlash**:
```bash
git clone https://github.com/username/robotronix-website.git
cd robotronix-website
```

2. **Brauzerda Ochish**:
```bash
# Live Server bilan (VS Code extension)
# yoki oddiy fayl sifatida ochish
open index.html
```

3. **Lokal Server (ixtiyoriy)**:
```bash
# Python bilan
python -m http.server 8000

# Node.js bilan
npx serve .
```

### Joylashtirishga Tayyor

Sayt static fayllarda yozilgan va istalgan hosting provayderiga joylashtirilishi mumkin:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- Traditional shared hosting

## ⚙️ Sozlashlar

### Ma'lumotlarni O'zgartirish

1. **Kontakt Ma'lumotlari**: 
   - `index.html` va `pages/` fayllaridagi telefon raqami va manzilni o'zgartiring
   - Social media havolalarini yangilang

2. **Kurs Narxlari**:
   - CSS faylidagi `course-price` klasslarini yangilang
   - JavaScript faylidagi narx ma'lumotlarini o'zgartiring

3. **Rasmlar**:
   - `assets/images/` papkasiga yangi rasmlarni joylashtiring
   - HTML fayllaridagi `src` yo'llarini yangilang

### Telegram/WhatsApp Integratsiyasi

`assets/js/script.js` faylida:

```javascript
const phoneNumber = '+998338033353'; // Telefon raqamini o'zgartiring
const telegramUrl = `https://t.me/robotronixuz`; // Telegram kanal
```

## 🔧 Kengaytirish Imkoniyatlari

### Yangi Funksiyalar Qo'shish

1. **Blog Bo'limi**: Yangiliklar va maqolalar
2. **Online To'lov**: Click/Payme integratsiyasi
3. **Video Darslar**: YouTube integratsiyasi
4. **Til Tanlash**: Ko'p tilli qo'llab-quvvatlash
5. **Admin Panel**: Kontent boshqaruvi
6. **LMS Tizimi**: To'liq ta'lim platformasi

### Performance Optimizatsiya

- Rasmlarni WebP formatiga o'tkazish
- CSS va JS fayllarni minify qilish
- CDN dan foydalanish
- Lazy loading qo'shish

## 🐛 Muammolarni Hal Qilish

### Keng Tarqalgan Muammolar

1. **Animatsiyalar Ishlamayapti**:
   - AOS library yuklanganligi tekshiring
   - JavaScript xatolarini console'da ko'ring

2. **Mobil Versiyada Muammolar**:
   - Viewport meta tag borligini tekshiring
   - CSS media queries to'g'ri yozilganini tasdiqlang

3. **Forma Yuborilamayapti**:
   - JavaScript event listener'lar ishlayotganini tekshiring
   - Telegram URL formatini tasdiqlang

## 📞 Qo'llab-quvvatlash

### Bog'lanish

- **Telegram**: [@robotronixuz](https://t.me/robotronixuz)
- **Telefon**: +998 33 803 33 53
- **Email**: info@robotronix.uz
- **Manzil**: Farg'ona sh., Murabbiylar ko'chasi

### Hissa Qo'shish

1. Fork qiling
2. Feature branch yarating (`git checkout -b feature/AmazingFeature`)
3. Commit qiling (`git commit -m 'Add some AmazingFeature'`)
4. Push qiling (`git push origin feature/AmazingFeature`)
5. Pull Request oching

## 📄 Litsenziya

Bu loyiha MIT litsenziyasi ostida tarqatiladi. Batafsil ma'lumot uchun `LICENSE` faylini ko'ring.

## 🙏 Minnatdorchilik

- **Ustoz.ai** - Dizayn ilhomi uchun
- **Font Awesome** - Chiroyli ikonkalar uchun
- **AOS Library** - Smooth animatsiyalar uchun
- **Robotronix Jamoasi** - Kontent va ma'lumotlar uchun

---

**Robotronix** - Yoshlarni texnologiya iste'molchisidan texnologiya ixtirochisiga aylantirish! 🤖✨

*Ushbu README fayl loyiha rivojlanishi bilan doimiy ravishda yangilanib turadi.*