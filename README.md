# Portfolio Website - Wahyu Yoga Pratama

Website portofolio profesional yang modern dan responsif dengan fitur mode terang/gelap.

## 🎨 Fitur Utama

- **Desain Modern & Responsif**: Layout yang clean dan modern dengan dukungan penuh untuk semua ukuran layar
- **Mode Terang/Gelap**: Toggle tema yang smooth dengan preferensi tersimpan di localStorage
- **Animasi Interaktif**: Micro-animations dan scroll-triggered animations untuk pengalaman yang engaging
- **Portfolio Filter**: Filter dinamis untuk menampilkan proyek berdasarkan kategori
- **Form Kontak Fungsional**: Formulir kontak dengan validasi real-time
- **SEO Optimized**: Meta tags dan struktur HTML yang SEO-friendly
- **Performance Optimized**: Loading cepat dengan optimasi gambar dan CSS/JS

## 🛠️ Teknologi

- **HTML5**: Struktur semantik dan accessibility-friendly
- **CSS3**: Flexbox, Grid, Custom Properties, dan animasi modern
- **JavaScript (Vanilla)**: Fungsionalitas interaktif tanpa dependency
- **Font Awesome**: Icon library untuk konsistensi visual
- **Google Fonts**: Typography modern (Poppins & Inter)

## 📁 Struktur File

```
wahyu-portfolio-complete/
├── index.html              # File HTML utama
├── css/
│   ├── style.css           # Styling utama
│   ├── themes.css          # Sistem tema (light/dark mode)
│   ├── responsive.css      # Media queries untuk responsivitas
│   └── animations.css      # Animasi dan efek visual
├── js/
│   ├── main.js            # JavaScript utama
│   ├── themes.js          # Logika tema switching
│   ├── portfolio.js       # Fungsionalitas portfolio filter
│   └── animations.js      # Animasi dan scroll effects
├── images/
│   ├── hero/              # Gambar untuk hero section
│   ├── portfolio/         # Gambar proyek portfolio
│   ├── about/             # Gambar untuk about section
│   ├── blog/              # Gambar untuk blog posts
│   └── icons/             # Icon dan favicon
└── README.md              # Dokumentasi ini
```

## 🚀 Cara Menggunakan

### 1. Setup Lokal
```bash
# Clone atau download folder website
cd wahyu-portfolio-complete

# Jalankan server lokal (pilih salah satu)
python3 -m http.server 8000
# atau
npx serve .
# atau buka langsung index.html di browser
```

### 2. Kustomisasi Konten

#### Mengganti Informasi Personal
Edit file `index.html` dan cari bagian-bagian berikut:

**Hero Section:**
```html
<h1 class="hero-title">
    <span class="name-text">Wahyu Yoga Pratama</span>
    <span class="title-subtitle">UI/UX Designer & Web Developer</span>
</h1>
```

**About Section:**
```html
<div class="about-intro">
    <h3>Halo, Saya Wahyu Yoga Pratama</h3>
    <p>Deskripsi tentang diri Anda...</p>
</div>
```

**Contact Information:**
```html
<div class="method-info">
    <h4>Email</h4>
    <p>wahyu.yoga@email.com</p>
</div>
```

#### Mengganti Gambar
1. **Foto Profil**: Ganti URL di hero section
2. **Portfolio Images**: Update src pada portfolio items
3. **Blog Images**: Update src pada blog cards

#### Menambah/Edit Proyek Portfolio
```html
<div class="portfolio-item" data-category="web uiux">
    <div class="portfolio-image">
        <img src="URL_GAMBAR_ANDA" alt="Nama Proyek" class="project-image">
        <div class="portfolio-overlay">
            <div class="project-info">
                <span class="project-category">Kategori Proyek</span>
                <h4>Nama Proyek</h4>
                <p>Deskripsi proyek...</p>
                <div class="project-tech">
                    <span class="tech-tag">Teknologi 1</span>
                    <span class="tech-tag">Teknologi 2</span>
                </div>
            </div>
        </div>
    </div>
</div>
```

### 3. Kustomisasi Tema

#### Mengubah Warna
Edit file `css/themes.css` untuk mengubah color palette:

```css
:root {
    --primary-color: #6366f1;      /* Warna utama */
    --secondary-color: #8b5cf6;    /* Warna sekunder */
    --accent-color: #06b6d4;       /* Warna aksen */
    /* ... warna lainnya */
}
```

#### Mengubah Font
Edit bagian Google Fonts di `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

Kemudian update CSS variables di `css/style.css`:
```css
:root {
    --font-primary: 'YourFont', sans-serif;
}
```

## 🎯 Fitur Khusus

### Mode Terang/Gelap
- Toggle otomatis menyimpan preferensi di localStorage
- Smooth transition antar tema
- Icon yang berubah sesuai tema aktif

### Portfolio Filter
- Filter berdasarkan kategori proyek
- Animasi smooth saat filtering
- Support multiple kategori per item

### Animasi
- Scroll-triggered animations
- Hover effects pada interactive elements
- Loading animations untuk form submission

### Responsivitas
- Mobile-first approach
- Breakpoints: 480px, 768px, 1024px, 1200px
- Touch-friendly navigation untuk mobile

## 📱 Browser Support

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 🔧 Customization Tips

1. **Menambah Section Baru**: Copy struktur section yang ada dan sesuaikan konten
2. **Mengubah Layout**: Edit CSS Grid/Flexbox properties di file CSS
3. **Menambah Animasi**: Gunakan CSS animations atau JavaScript untuk efek custom
4. **SEO Optimization**: Update meta tags di `<head>` section
5. **Performance**: Compress gambar dan minify CSS/JS untuk production

## 📞 Support

Jika Anda membutuhkan bantuan kustomisasi atau pengembangan lebih lanjut:
- Email: wahyu.yoga@email.com
- LinkedIn: linkedin.com/in/wahyuyoga

## 📄 License

© 2024 Wahyu Yoga Pratama. All rights reserved.

---

**Catatan**: Website ini sudah dilengkapi dengan konten contoh yang realistis. Anda hanya perlu mengganti foto, teks, dan informasi kontak sesuai dengan data pribadi Anda.

#   p o r t o f o l i o - W e b s i t e  
 #   p o r t o f o l i o - W e b s i t e  
 