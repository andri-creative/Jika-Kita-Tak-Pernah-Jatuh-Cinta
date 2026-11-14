# Desain Master & Panduan Animasi Web Responsif
# Jika Kita Tak Pernah Jatuh Cinta – Alvi Syahrin

Dokumen ini merancang proyek web interaktif berbasis sastra visual dari buku _best-seller_ **"Jika Kita Tak Pernah Jatuh Cinta"** karya Alvi Syahrin. Proyek ini memuat **35 adegan kutipan lengkap (Bab 1 s.d. Bab 7)** dengan pendekatan **Fully Responsive Experience** (Desktop Widescreen, Tablet, dan Mobile Smartphone) tanpa membatasi tampilan pada model bingkai ponsel statis (`max-width: 414px`).

Setiap elemen kutipan dilengkapi dengan spesifikasi visual presisi: **Color Palette**, **Typography (Font)**, **Background (BG)**, **Image & Visual Asset (IMG)**, **Responsive Layout Behavior**, dan **Implementasi Teknis HTML/CSS/JS**.

---

## 📐 1. Arsitektur Tampilan: Multi-Device Responsive System

Berbeda dengan proyek animasi sebelumnya yang terkunci dalam rasio ponsel sempit, web ini dibangun adaptif penuh untuk berbagai ukuran layar pengguna:

| Breakpoint Layar | Resolusi Target | Konsep Layout & Pengalaman Pengguna |
| :--- | :--- | :--- |
| **Desktop / Widescreen** | `≥ 1024px` (Full HD, 2K, 4K) | **Cinematic Split-Stage / Immersive Duo-Panel**: Panggung animasi visual 16:10 di sisi kiri/tengah, panel tipografi kutipan puitis dengan efek kaca kristal (_glassmorphism_) di sisi kanan. Kontrol navigasi keyboard (panah kiri/kanan/spasi), tombol pagination terapung, dan interaksi mouse parallax. |
| **Tablet / iPad** | `768px – 1023px` | **Adaptive Balanced Stage**: Tata letak fleksibel dengan visual di atas dan kartu kutipan di bawah yang proporsional, mendukung navigasi sentuh (_touch swipe_) maupun tombol sentuh ergonomis. |
| **Mobile Smartphone** | `≤ 767px` | **Fluid Full-Viewport Vertical Stream**: Menyesuaikan tinggi viewport dinamis (`100dvh`), kartu kutipan terintegrasi mulus dengan kanvas animasi tanpa terpotong, gestur usap layar (_swipe up/down_ atau _left/right_) yang ringan dan bebas lag. |

### Formula CSS Layout Dasar (Fluid & Scalable)
```css
:root {
  --app-max-width: 1440px;
  --font-quote: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
  --font-body: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Space Grotesk', monospace;
  
  /* Fluid Typography Scale */
  --quote-size: clamp(1.25rem, 1.2rem + 1.2vw, 2.35rem);
  --title-size: clamp(1.5rem, 1.2rem + 2vw, 3.2rem);
  --meta-size: clamp(0.85rem, 0.8rem + 0.3vw, 1.05rem);
  
  /* Safe fluid spacings */
  --stage-padding: clamp(1.25rem, 3.5vw, 4rem);
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.12);
}
```

---

## 🎨 2. Master Design System & Mood Board

Proyek ini menggunakan kurva emosi warna yang bertransisi secara bertahap seiring berjalannya cerita dari Bab 1 hingga Bab 7:

```
[Bab 1 & 2: Kesedihan & Realita]  -->  [Bab 3, 4 & 5: Kontemplasi & Penyembuhan]  -->  [Bab 6 & 7: Kedamaian & Fajar Baru]
Dark Midnight & Deep Indigo           Slate Blue & Warm Terracotta Forest            Warm Amber, Sunset Gold & Dawn Cream
(#0B132B / #1C2541)                   (#202938 / #3E4C5E / #8C5345)                   (#FDFBF7 / #F6BD60 / #E76F51)
```

- **Tipografi Utama:**
  - **Serif Puitis (Kutipan):** `Cormorant Garamond` (Google Fonts, weights: 400 italic, 600) untuk memberikan nuansa novel sastra berkelas.
  - **Sans-Serif Modern (UI & Navigasi):** `Plus Jakarta Sans` (weights: 400, 500, 700) untuk nomor adegan, tombol, dan navigasi yang bersih.
- **Efek Partikel & Suasana:**
  - Prosedural HTML5 Canvas untuk partikel debu halus, bintang jatuh malam, pendaran lentera, dan riak air tanpa membebani memori.
- **Format Aset Gambar (IMG):**
  - Mengutamakan **Inline Scalable Vector Graphics (SVG)** dan **CSS Geometric Art** agar tajam di layar Retina/4K, dengan cadangan ilustrasi siluet transparan WebP.

---

## 📖 3. Rincian 35 Kutipan & Spesifikasi Desain Tiap Elemen

---

### Bab 1: Menjaga Hati & Realita Perasaan

#### 1. Tentang Menjaga Hati Sebelum Bertemu
- **Quotes:** _"Jangan biarkan hatimu lelah karena terlalu sering singgah di hati yang salah. Simpan sisa rasa terbaikmu untuk seseorang yang datang membawa kepastian, bukan sekadar teka-teki."_
- **Konsep Animasi & Interaksi:** Karakter siluet berjalan melintasi deretan pintu kusam yang redup. Ketika kursor mendekat atau layar digeser, satu pintu kayu berukir di ujung panggung terbuka perlahan, memancarkan seberkas cahaya keemasan hangat yang menyinari jalan setapak.
- **Color Palette:**
  - Background: `#0B132B` (Deep Midnight Blue)
  - Accent / Glow: `#F6BD60` (Warm Lantern Gold)
  - Door Silhouette: `#1C2541` & `#3A506B`
  - Text: `#F7F7F9` (Soft Alabaster)
- **Typography:**
  - Quote Font: `'Cormorant Garamond', serif`, font-size: `var(--quote-size)`, font-style: `italic`, line-height: `1.6`
  - Chapter & Meta: `'Plus Jakarta Sans', sans-serif`, font-size: `var(--meta-size)`, weight: `600`, letter-spacing: `2px`
- **Background (BG):** Gradien linier radial `radial-gradient(circle at 75% 50%, #1c2541 0%, #0b132b 100%)` berpadu dengan partikel debu melayang tipis (Canvas 2D).
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Vektor SVG Multi-Layer (Pintu Kayu Klasik + Siluet Karakter Berjalan).
  - Dimensi: Vektor responsif `viewBox="0 0 600 500"`, auto-scale menjaga rasio aspek.
- **Responsive Layout Behavior:**
  - Desktop (≥1024px): 2 Kolom (Kiri: Panggung pintu bercahaya interaktif, Kanan: Kutipan elegan dalam kartu kaca _glassmorphism_).
  - Tablet (768px - 1023px): Tata letak seimbang vertikal dengan rasio visual 16:9 di bagian atas dan kutipan di bawah.
  - Mobile (≤767px): Layar penuh vertikal, pintu berada di latar belakang semi-transparan dengan teks kutipan terbaca jelas di depan.
- **Elemen HTML/CSS & Interaktivitas:** `@keyframes doorGlow`, transform 3D CSS `perspective: 1000px; transform: rotateY(-65deg);` untuk daun pintu.

---

#### 2. Tentang Perasaan yang Bertepuk Sebelah Tangan
- **Quotes:** _"Kadang, kita begitu gigih memperjuangkan seseorang yang bahkan tidak pernah melirik ke arah kita. Padahal, lelah itu nyata, dan air mata itu berharga."_
- **Konsep Animasi & Interaksi:** Jarum jam melingkar berputar kencang menandakan waktu terbuang. Di tengah panggung, gelembung pesan _chat_ berwarna biru redup melayang ke atas, lalu retak dan pecah menjadi partikel kaca kecil sebelum mencapai tujuan.
- **Color Palette:**
  - Background: `#0D1B2A` (Abyssal Navy)
  - Accent / Crack: `#E63946` (Crimson Heartbreak) & `#48CAE4` (Tear Cyan)
  - Clock Hands: `#E0E1DD`
  - Text: `#E0E1DD`
- **Typography:**
  - Quote Font: `'Cormorant Garamond', serif`, weight: `400`, italic.
  - Time Label: `'Space Grotesk', monospace`, font-size: `0.9rem`, uppercase.
- **Background (BG):** Gradien radial gelap `radial-gradient(ellipse at center, #1b263b 0%, #0d1b2a 100%)`.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Jam analog SVG minimalis berdiameter dinamis + Ikon pesan obrolan transparan dengan efek pecahan SVG path.
- **Responsive Layout Behavior:**
  - Desktop: Panggung visual jam di tengah-kiri dengan bayangan lembut, teks di kanan.
  - Tablet/Mobile: Jam berposisi sebagai aksen latar di belakang teks kutipan dengan tingkat `opacity: 0.25`, teks kutipan tampil tegas di tengah.
- **Elemen HTML/CSS & Interaktivitas:** Animasi rotasi `@keyframes rotateClock { to { transform: rotate(360deg); } }`, animasi partikel partikel retakan pesan menggunakan CSS filter `drop-shadow`.

---

#### 3. Tentang Realitas Cinta di Dunia Maya vs Dunia Nyata
- **Quotes:** _"Jangan terbuai dengan manisnya kata-kata di layar ponsel. Sebab terkadang, seseorang bisa menjadi sangat romantis di chat, tapi begitu dingin dan asing di dunia nyata."_
- **Konsep Animasi & Interaksi:** Sebuah mockup smartphone transparan menampilkan obrolan penuh emotikon hati berpendar hangat. Namun saat kursor digeser atau layar disentuh, kamera visual bergerak menjauh (_zoom out_) memperlihatkan dua siluet orang yang duduk bersebelahan di stasiun dingin saling membelakangi.
- **Color Palette:**
  - Chat Warmth: `#FFB703` (Warm Chat Glow)
  - Cold Reality: `#1B263B` & `#415A77` (Steel Cold Blue)
  - Background: `#0B121E`
  - Text: `#F1FAEE`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, italic, `clamp(1.2rem, 1.8vw, 2.2rem)`.
  - Chat Bubble Text: `'Plus Jakarta Sans'`, weight: `500`, `0.85rem`.
- **Background (BG):** Kontras gradien ganda: sisi layar hangat `#221808`, sisi luar dingin kelabu `#0b121e`.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Desain SVG Smartphone Frameless dengan layar kaca reflektif + Siluet bangku taman/halte malam hari.
- **Responsive Layout Behavior:**
  - Desktop: Tampilan sinematik horizontal lebar memperlihatkan kontras jarak antar dua karakter secara dramatis.
  - Mobile: Fokus pada layar smartphone di bagian atas yang saat digeser memunculkan adegan siluet di bagian bawah.
- **Elemen HTML/CSS:** `backdrop-filter: blur(12px)`, CSS `clip-path` untuk transisi antara mode maya (terang hangat) dan dunia nyata (gelap dingin).

---

#### 4. Tentang Rasa Insecure dan Standar Kecantikan
- **Quotes:** _"Kamu tidak perlu mengubah dirimu hanya agar disukai orang lain. Seseorang yang tepat akan mencintai kekuranganmu, bukan menuntutmu menjadi orang lain."_
- **Konsep Animasi & Interaksi:** Karakter berdiri di hadapan cermin besar berkabut. Pengguna dapat mengusap cermin (_touch/mouse scrub_); kabut dan filter digital retak dan terhapus, menampakkan pantulan wajah asli yang tersenyum damai dengan kilau lembut.
- **Color Palette:**
  - Background: `#161A1D` (Obsidian Charcoal)
  - Mirror Border: `#DDA15E` (Warm Bronze)
  - Pure Reflection: `#FFF1E6` & `#F4A261`
  - Text: `#EDEDE9`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, serif, weight: `500`.
  - Action Hint: `'Plus Jakarta Sans'`, `0.8rem`, letter-spacing: `1.5px`, uppercase.
- **Background (BG):** Gradien lembut bernuansa kamar pribadi remang dengan pantulan cahaya lilin lembut di sudut kanvas.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Frame cermin klasik SVG bergaya ornamen arsitektur + Kanvas HTML5 interaktif untuk efek menghapus embun kaca (`globalCompositeOperation = 'destination-out'`).
- **Responsive Layout Behavior:**
  - Desktop: Cermin di tengah panggung dengan dimensi proporsional tinggi `70vh`, teks kutipan mengalir di panel pendamping.
  - Mobile: Cermin memenuhi layar dengan instruksi sentuh *"Usap cermin untuk melihat dirimu yang sesungguhnya"*.
- **Elemen HTML/CSS:** Canvas interaktif pembersih embun, CSS `transition: filter 0.8s ease-out`.

---

#### 5. Tentang Mencintai dalam Diam (Secret Admirer)
- **Quotes:** _"Mencintai dalam diam itu melelahkan. Kamu ingin menyapa, tapi takut lancang. Kamu ingin melupakan, tapi bayangnya selalu datang."_
- **Konsep Animasi & Interaksi:** Meja belajar perpustakaan malam hari. Di atas kertas putih, sebuah pena bulu menari sendiri menuliskan kata-kata puitis secara otomatis (efek _typewriter_ tinta mengalir). Tinta yang merembes di ujung membentuk bayangan siluet hati kecil yang pudar.
- **Color Palette:**
  - Background: `#1F1E24` (Vintage Ink Dark)
  - Parchment Paper: `#2B2A33` (Muted Slate)
  - Glowing Ink: `#E76F51` (Coral Amber)
  - Text: `#F8F9FA`
- **Typography:**
  - Handwritten/Quote Font: `'Cormorant Garamond'`, italic, style puitis.
  - UI Details: `'Plus Jakarta Sans'`, `0.85rem`.
- **Background (BG):** Warna kayu mahoni tua `#17151C` dengan pencahayaan lampu meja temaram di sisi atas.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Lembaran buku terbuka SVG + partikel tinta meresap ke serat kertas secara dinamis.
- **Responsive Layout Behavior:**
  - Desktop: Buku terbuka di meja kerja luas dengan efek bayangan realistis.
  - Mobile: Fokus pada satu halaman buku yang mengisi 90% lebar layar, teks mengetik secara proporsional.
- **Elemen HTML/CSS:** Animasi SVG `stroke-dashoffset` untuk goresan tinta pena kaligrafi.

---

### Bab 2: Dinamika Hubungan & Patah Hati

#### 6. Tentang Terjebak dalam Friendzone
- **Quotes:** _"Paling menyedihkan adalah ketika kamu berada di posisi paling dekat dengannya, tapi sadar bahwa kamu tidak akan pernah menjadi pilihan hatinya."_
- **Konsep Animasi & Interaksi:** Dua cangkir kopi di atas meja kafe. Uap kopi dari kedua cangkir membubung ke atas. Uap cangkir pertama dan kedua sempat mendekat di udara, namun terhalang oleh garis kaca transparan tak kasat mata sehingga uapnya buyar ke arah berlawanan.
- **Color Palette:**
  - Background: `#1A181B` (Espresso Dark)
  - Steam / Mist: `rgba(245, 235, 224, 0.45)`
  - Table Tone: `#342A21` (Warm Walnut)
  - Accent Line: `#E63946`
  - Text: `#F5EBE0`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, `clamp(1.2rem, 1.7vw, 2.1rem)`.
  - Badge Font: `'Plus Jakarta Sans'`, weight: `700`, `0.75rem`.
- **Background (BG):** Gradien interior kafe temaram `radial-gradient(circle, #2a221b 0%, #141113 100%)`.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Cangkir keramik kerajinan SVG dengan tekstur matte dan animasi uap partikel air bertingkat.
- **Responsive Layout Behavior:**
  - Desktop: Tampilan meja kafe horizontal luas, cangkir di sebelah kiri dengan jarak renggang terukur, kutipan di kanan.
  - Mobile: Tampilan vertikal dari atas (_top-down angle_), kedua cangkir berdampingan dekat namun terpisah garis pemisah tipis.
- **Elemen HTML/CSS:** `@keyframes steamFloat { 0% { transform: translateY(0) scaleX(1); opacity: 0.6; } 100% { transform: translateY(-70px) scaleX(1.8); opacity: 0; } }`.

---

#### 7. Tentang Orang yang Datang Hanya Saat Kesepian
- **Quotes:** _"Jangan mau dijadikan tempat pelampiasan saat dia kesepian, lalu ditinggal begitu saja saat dunianya sudah kembali ramai."_
- **Konsep Animasi & Interaksi:** Lampu meja kecil berpendar redup di ruangan gelap saat karakter menemani seseorang. Tiba-tiba lampu sorot festival kota yang gemerlap menyala di kejauhan, orang tersebut berbalik dan melangkah cepat ke pesta, meninggalkan lampu meja yang padam tertiup angin.
- **Color Palette:**
  - Solitude: `#121214` (Empty Shadow)
  - Lantern Glow: `#FFB703` (Fleeting Warmth)
  - Party Flash: `#7209B7` & `#4CC9F0` (Crowded Neon)
  - Text: `#EAEAEA`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, italic, line-height: `1.65`.
  - Narrative Badge: `'Plus Jakarta Sans'`, weight: `600`.
- **Background (BG):** Transisi CSS dinamis dari `#121214` ke kilatan warna latar neon yang memudar kembali menjadi keheningan kelabu.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Siluet lentera meja gantung SVG + siluet keramaian kota di latar belakang dengan efek blur.
- **Responsive Layout Behavior:**
  - Desktop: Panorama horizontal lebar menampilkan kontras kamar sunyi di sebelah kiri dan jendela kota ramai di kanan.
  - Mobile: Alur vertikal, lentera di atas dan siluet jalanan kota memudar di bagian bawah.
- **Elemen HTML/CSS:** Transisi CSS variabel `transition: background 1.2s ease-in-out`, animasi padam lentera via `opacity`.

---

#### 8. Tentang Mengikhlaskan Seseorang yang Pergi Tanpa Kejelasan (Ghosting)
- **Quotes:** _"Tidak mendapat jawaban adalah sebuah jawaban. Jika dia pergi tanpa alasan, itu tanda kamu tidak perlu mencarinya lagi."_
- **Konsep Animasi & Interaksi:** Layar ponsel menampilkan balon chat dengan tanda centang abu-abu yang membeku. Pengguna menekan tombol "Ikhlaskan"; balon chat tersebut perlahan larut menjadi kepulan abu halus yang tertiup angin ke langit senja luas.
- **Color Palette:**
  - Background: `#181A24` (Twilight Grey)
  - Dispersal Ash: `rgba(224, 225, 221, 0.6)`
  - Sunset Sky: `#E07A5F` & `#3D405B`
  - Text: `#F4F1DE`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, weight: `500`.
  - Button Text: `'Plus Jakarta Sans'`, weight: `700`, `0.9rem`.
- **Background (BG):** Gradien langit senja berawan tipis `linear-gradient(180deg, #181a24 0%, #2f334a 60%, #5c4d58 100%)`.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Komponen balon chat SVG modern dengan efek partikel pembubaran titik-titik pasir (_dust dissolve animation_).
- **Responsive Layout Behavior:**
  - Desktop: Tampilan split-screen, kartu chat interaktif di kiri dan jendela langit senja lapang di kanan.
  - Mobile: Kotak chat elegan di tengah layar, tombol interaktif lebar dan nyaman dijangkau ibu jari (`min-height: 52px`).
- **Elemen HTML/CSS:** Partikel canvas `particle.dissolve()`, tombol kaca dengan efek hover pendar keemasan.

---

#### 9. Tentang Patah Hati yang Menjadikan Diri Lebih Dewasa
- **Quotes:** _"Patah hati memang mengajarkan air mata, tapi dari sana kamu belajar tentang arti ketulusan dan bagaimana cara memilih yang benar."_
- **Konsep Animasi & Interaksi:** Tetesan air biru jernih jatuh perlahan ke atas permukaan air yang tenang. Tetesan itu memicu riak lingkaran konsentris keemasan yang saat melebar memancarkan pendaran cahaya terang, menumbuhkan bunga teratai air yang mekar anggun.
- **Color Palette:**
  - Background: `#0A1128` (Deep Waters)
  - Water Ripple: `#006494` & `#247BA0`
  - Lotus Flower: `#FFB5A7` & `#FCD5CE`
  - Golden Dawn: `#FFD166`
  - Text: `#F8F9FA`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, italic.
  - Accent: `'Plus Jakarta Sans'`, uppercase, spacing: `2px`.
- **Background (BG):** Gradien air kedalaman laut malam berpadu dengan bias cahaya fajar di horizon.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Geometri kelopak teratai mekar SVG beranimasi + riak gelombang air berputar halus.
- **Responsive Layout Behavior:**
  - Desktop: Kanvas lingkaran air di tengah dengan radius proporsional, teks melengkung atau mendampingi di sisi kanan.
  - Mobile: Pemandangan air di tengah atas, riak gelombang menyentuh batas tepi ponsel dengan halus.
- **Elemen HTML/CSS:** `@keyframes rippleWave { 0% { transform: scale(0.2); opacity: 1; } 100% { transform: scale(2.5); opacity: 0; } }`.

---

#### 10. Tentang Menghargai Diri Sendiri (Self-Worth)
- **Quotes:** _"Harga dirimu jauh lebih mahal daripada air mata yang kamu keluarkan untuk seseorang yang bahkan tidak peduli."_
- **Konsep Animasi & Interaksi:** Butir air mata jatuh menyentuh telapak tangan terbuka. Begitu bersentuhan, butiran air mata mengkristal dan memadat menjadi batu permata berlian berkilau yang membiaskan prisma pelangi ke seluruh layar.
- **Color Palette:**
  - Background: `#141419` (Dark Velvet)
  - Diamond Prism: `#E2EAFC` & `#B6CCFE`
  - Rainbow Shimmer: Linear gradient `(#FF9AA2, #FFB7B2, #FFDAC1, #E2F0CB, #B5EAD7, #C7CEEA)`
  - Text: `#FFFFFF`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, weight: `600`, size: `var(--quote-size)`.
  - Body / Sub: `'Plus Jakarta Sans'`, weight: `400`.
- **Background (BG):** Latar belakang beludru gelap dengan pendaran cahaya prisma halus yang mengikuti posisi kursor (mouse pointer/gyro ponsel).
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Siluet telapak tangan minimalis SVG + berlian kristal 3D poligon bersudut rapi dengan pantulan cahaya.
- **Responsive Layout Behavior:**
  - Desktop: Karakteristik permata di sisi kiri dengan efek kilau interaktif 3D tilt, kutipan megah di sisi kanan.
  - Mobile: Permata bercahaya di pusat viewport dengan teks kutipan melingkupinya secara ergonomis.
- **Elemen HTML/CSS:** CSS `@keyframes shimmerRotate`, gradien latar berefek kilap via `background-clip: text`.

---

### Bab 3: Prinsip, Restu, dan Waktu yang Tepat

#### 11. Tentang Hubungan Beda Prinsip atau Keyakinan
- **Quotes:** _"Cinta saja tidak pernah cukup. Jika arah tujuan kita sudah berbeda sejak awal, memaksakan jalan bersama hanya akan berujung lelah."_
- **Konsep Animasi & Interaksi:** Dua garis jalan setapak bercahaya beriringan sejajar di atas bukit. Perlahan tapi pasti, jalan tersebut bercabang ke dua puncak gunung yang berbeda arah, diiringi dedaunan gugur yang tertiup angin kencang di antara kedua lembah.
- **Color Palette:**
  - Background: `#1B2028` (Mountain Dusk)
  - Path A (Golden Warmth): `#F4A261`
  - Path B (Silver Frost): `#8ECAE6`
  - Text: `#F1FAEE`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, italic.
  - Subtitle: `'Plus Jakarta Sans'`, `0.85rem`.
- **Background (BG):** Lanskap siluet pegunungan senja dengan gradasi kabut dingin di dasar jurang.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Siluet jalur setapak SVG lengkung dinamis (`stroke-dashoffset`) yang terbelah dua menuju ufuk barat dan timur.
- **Responsive Layout Behavior:**
  - Desktop: Panorama pegunungan luas beresolusi tinggi, jalur jalan membentang dari bawah ke dua sudut atas layar.
  - Mobile: Perspektif vertikal ke depan (_first-person view_) dengan percabangan yang jelas di layar tengah.
- **Elemen HTML/CSS:** SVG dash offset stroke animation, angin partikel daun gugur via Canvas.

---

#### 12. Tentang Merelakan Restu Orang Tua
- **Quotes:** _"Restu orang tua adalah kompas terbaik. Jika mereka melihat ada badai di balik senyum seseorang yang kamu pilih, percayalah, mereka benar."_
- **Konsep Animasi & Interaksi:** Sebuah kompas kuno berputar cemas di tengah badai petir berkabut. Ketika kompas disentuh, jarum kompas yang awalnya bergetar mendadak stabil dan menunjuk ke arah rumah kecil hangat di kejauhan yang memiliki jendela menyala terang bersahabat.
- **Color Palette:**
  - Storm Cloud: `#2B2D42` & `#1C1E2B`
  - Compass Brass: `#D4A373` & `#CCD5AE`
  - Safe Home Light: `#FAEDCD` & `#E76F51`
  - Text: `#FAEDCD`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, weight: `500`.
  - Direction Labels (N/S/E/W): `'Space Grotesk'`, weight: `700`.
- **Background (BG):** Gradien dramatis antara badai gelap di sisi kiri atas dan pendaran rumah aman di kanan bawah.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Kompas kuno ornamen vintage SVG dengan jarum berputar kinetik + siluet rumah gubuk beratap segitiga di bawah pohon rindang.
- **Responsive Layout Behavior:**
  - Desktop: Kompas interaktif di sebelah kiri dengan kontrol putar, rumah dan lanskap di kanan.
  - Mobile: Kompas responsif di tengah layar dengan indikator arah yang mudah ditekan.
- **Elemen HTML/CSS:** `transform: rotate(...)` dengan transisi elastis `cubic-bezier(0.34, 1.56, 0.64, 1)`.

---

#### 13. Tentang Waktu Terbaik untuk Jatuh Cinta
- **Quotes:** _"Cinta yang datang di waktu yang salah hanya akan mendatangkan luka. Tunggulah hingga semesta mempertemukanmu di waktu yang tepat."_
- **Konsep Animasi & Interaksi:** Dua kuncup mawar di taman. Kuncup kiri dipaksa terbuka saat masih beku sehingga kelopaknya gugur layu. Sementara kuncup kanan menunggu terbitnya matahari musim semi, lalu merekah sempurna bermandikan embun pagi yang berkilauan.
- **Color Palette:**
  - Frost/Withered: `#4A5568` & `#A0AEC0`
  - Spring Bloom: `#E63946` & `#FF758F`
  - Morning Sunshine: `#FFE49E`
  - Background: `#171923`
  - Text: `#EDF2F7`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, italic, line-height: `1.7`.
  - Timer Label: `'Plus Jakarta Sans'`, `0.85rem`.
- **Background (BG):** Perubahan gradasi bertahap dari malam dingin ke cahaya pagi musim semi hangat.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Bunga mawar SVG multi-lapisan dengan transisi buka kelopak (`scale`, `rotate`, dan `opacity`).
- **Responsive Layout Behavior:**
  - Desktop: Perbandingan berdampingan yang simetris (kiri: musim dingin/layu, kanan: musim semi/mekar).
  - Mobile: Tampilan sebelum dan sesudah (_slider before-after_) atau transisi sekuensial yang halus saat digulir.
- **Elemen HTML/CSS:** CSS `transform-origin: bottom center`, animasi rotasi kelopak mekar bertahap.

---

#### 14. Tentang Bahagia Tanpa Harus Bergantung pada Pacar
- **Quotes:** _"Kebahagiaanmu tidak ditentukan oleh status 'taken' atau 'single'. Bahagia itu diciptakan oleh dirimu sendiri, bukan dipinjam dari orang lain."_
- **Konsep Animasi & Interaksi:** Suasana kafe kaca di tepi jalan raya yang basah sehabis hujan. Karakter duduk sendiri meminum cokelat hangat sambil tersenyum membaca buku, menikmati alunan musik dari headphone, tanpa rasa cemas melihat pasangan yang lalu-lalang di luar.
- **Color Palette:**
  - Rainy City: `#264653` & `#2A9D8F`
  - Cozy Warmth: `#F4A261` & `#E76F51`
  - Background: `#1D242B`
  - Text: `#F8F9FA`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, weight: `500`.
  - Sub Font: `'Plus Jakarta Sans'`, weight: `400`.
- **Background (BG):** Kaca jendela berembun dengan titik-titik tetesan air hujan yang mengalir vertikal perlahan.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Siluet jendela kafe berbingkai kayu SVG + animasi tetes air hujan pada kaca via Canvas procedural.
- **Responsive Layout Behavior:**
  - Desktop: Ilustrasi jendela kafe widescreen beranimasi di kiri, kartu kutipan terbungkus kaca buram di kanan.
  - Mobile: Jendela hujan menjadi latar belakang penuh, teks kutipan berada di tengah dengan latar belakang kontras tinggi.
- **Elemen HTML/CSS:** CSS filter `backdrop-filter: blur(8px)`, animasi tetes hujan meluncur ke bawah.

---

#### 15. Tentang Kenangan Masa Lalu yang Sulit Dilupakan
- **Quotes:** _"Masa lalu itu untuk dikenang sebagai pelajaran, bukan untuk dijadikan alasan menolak kebahagiaan baru yang datang."_
- **Konsep Animasi & Interaksi:** Sebuah kotak kayu kenangan berisi tumpukan foto polaroid masa lalu. Saat pengguna mengetuk tombol "Simpan & Melangkah", kotak kayu tersebut menutup dengan kunci gembok lembut, tersimpan rapi di rak, dan sebuah pintu kamar terbuka menampakkan langit pagi cerah.
- **Color Palette:**
  - Vintage Sepia: `#3D312A` & `#DDA15E`
  - New Dawn: `#64DFDF` & `#72EFDD`
  - Background: `#1B1917`
  - Text: `#FEFAE0`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, italic.
  - Action Font: `'Plus Jakarta Sans'`, weight: `600`, letter-spacing: `1px`.
- **Background (BG):** Ruang perpustakaan kayu gelap yang bertransformasi menerima cahaya fajar terang benderang.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Kotak kayu 3D CSS / SVG isometrik + foto polaroid vintage yang tersimpan ke dalam kotak.
- **Responsive Layout Behavior:**
  - Desktop: Animasi kotak 3D interaktif di sisi kiri panggung, kutipan di kanan.
  - Mobile: Kotak berpusat di layar, gerakan menutup kotak direspons dengan getaran haptik singkat dan pembukaan pintu horizon.
- **Elemen HTML/CSS:** `transform: perspective(600px) rotateX(45deg); transition: transform 0.8s ease`.

---

### Bab 4: Proses Penyembuhan & Pendewasaan

#### 16. Tentang Memaafkan Masa Lalu
- **Quotes:** _"Memaafkan bukan berarti melupakan, tapi membebaskan hatimu dari beban kebencian yang selama ini kamu pikul sendirian."_
- **Konsep Animasi & Interaksi:** Karakter memikul ransel batu hitam raksasa di pundaknya sehingga tubuhnya membungkuk lesu. Ketika tombol "Lepaskan" ditekan, tali ransel terlepas, batu menggelinding jatuh dan hancur, membuat karakter berdiri tegak, merentangkan tangan, dan tubuhnya melayang ringan.
- **Color Palette:**
  - Heavy Burden: `#212529` (Lead Dark)
  - Release Feather: `#E9D8A6` & `#94D2BD`
  - Sky Freedom: `#005F73` & `#0A9396`
  - Text: `#F8F9FA`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, weight: `600`.
  - Subtitle: `'Plus Jakarta Sans'`.
- **Background (BG):** Dari tanah tandus gelap berbatu bertransisi menjadi langit padang rumput hijau luas yang berhembus sepoi-sepoi.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Siluet karakter dinamis SVG (vektor transisi dari posisi membungkuk ke posisi melompat bebas).
- **Responsive Layout Behavior:**
  - Desktop: Tampilan lanskap vertikal-horizontal yang memperlihatkan tingginya karakter melompat ke udara bebas.
  - Mobile: Karakter berpusat di layar dengan tombol "Lepaskan Beban" berukuran lebar di bagian bawah.
- **Elemen HTML/CSS:** `@keyframes releaseBounce { 0% { transform: translateY(0); } 50% { transform: translateY(-30px); } 100% { transform: translateY(0); } }`.

---

#### 17. Tentang Fokus pada Masa Depan dan Karier
- **Quotes:** _"Bangunlah mimpimu setinggi mungkin. Sebab ketika kamu sukses dan mandiri, cinta yang tepat akan datang dengan cara yang terhormat."_
- **Konsep Animasi & Interaksi:** Meja kerja malam hari dengan laptop menyala, buku-buku catatan, dan cangkir kopi. Di atas meja, garis sketsa cetak biru gedung impian dan grafik naik ke atas secara konstan, memancarkan garis cahaya ke arah bintang-bintang di luar jendela.
- **Color Palette:**
  - Midnight Hustle: `#0F172A` (Deep Slate)
  - Blueprint Blue: `#0284C7` & `#38BDF8`
  - Gold Ambition: `#F59E0B`
  - Text: `#F1F5F9`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, italic.
  - Metric Font: `'Space Grotesk'`, monospace.
- **Background (BG):** Gradien ruang belajar malam berlatar siluet pencakar langit kota metropolitan yang bercahaya.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Garis blueprint arsitektur SVG dinamis + animasi grafik pertumbuhan naik bercahaya.
- **Responsive Layout Behavior:**
  - Desktop: Panggung meja kerja dan jendela gedung tinggi di kiri, kutipan motivasi berbaris rapi di kanan.
  - Mobile: Tampilan fokus pada layar kerja laptop bercahaya yang memancarkan grafik naik hingga menyentuh teks kutipan.
- **Elemen HTML/CSS:** Animasi SVG path `stroke-dasharray` berkecepatan dinamis.

---

#### 18. Tentang Doa yang Diam-Diam Dipanjatkan
- **Quotes:** _"Ada rindu yang tidak sempat tersampaikan lewat kata-kata, tapi selalu dijaga rapi dalam setiap doa di sepertiga malam."_
- **Konsep Animasi & Interaksi:** Pemandangan jendela kamar pada sepertiga malam terakhir. Bulan sabit tersenyum teduh. Tiap kali nafas animasi berhembus, butir-butir cahaya doa (partikel bintang emas) naik meluncur pelan dari lantai menuju langit kosmos yang tenang.
- **Color Palette:**
  - Midnight Calm: `#050814` & `#0A1128`
  - Crescent Moon: `#FEF9EF` & `#FFD166`
  - Starlight Glow: `rgba(255, 209, 102, 0.7)`
  - Text: `#EDF2F4`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, weight: `400`, italic.
  - Subtitle: `'Plus Jakarta Sans'`, letter-spacing: `3px`.
- **Background (BG):** Langit malam sepertiga akhir yang sunyi dan damai dengan hamparan bintang berkelip lembut (Canvas Starfield).
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Bulan sabit SVG bercahaya pendar + partikel debu doa berterbangan ke atas.
- **Responsive Layout Behavior:**
  - Desktop: Jendela lengkung bergaya Timur Tengah/Klasik di sisi kiri yang membuka ke langit malam bertabur bintang.
  - Mobile: Bulan sabit di pojok kanan atas layar dengan partikel doa menyelimuti teks kutipan di tengah.
- **Elemen HTML/CSS:** Partikel canvas bergerak berlawanan gravitasi (`vy < 0`), box-shadow pendar bulan lembut.

---

#### 19. Tentang Seseorang yang Layak Diperjuangkan
- **Quotes:** _"Jangan berikan seluruh cintamu pada orang yang setengah-setengah menghargaimu. Simpan untuk seseorang yang memperjuangkanmu tanpa ragu."_
- **Konsep Animasi & Interaksi:** Dua teko kaca menuangkan air teh hangat secara bersamaan ke dua cangkir. Ketika aliran air seimbang dari kedua sisi, cangkir tersebut penuh secara sempurna dan memancarkan kilau hangat harmonis. Jika salah satu sisi berhenti, poci satunya ikut berhenti sebagai tanda kesetaraan.
- **Color Palette:**
  - Balance Amber: `#D97706` & `#B45309`
  - Warm Porcelain: `#FEF3C7` & `#FDE68A`
  - Background: `#1C1917`
  - Text: `#FAFAF9`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, italic.
  - Balance Indicator: `'Plus Jakarta Sans'`, weight: `700`.
- **Background (BG):** Gradien ruang perjamuan intim temaram `#1c1917` ke `#292524`.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Teko kaca transparan dan cangkir SVG dengan animasi level cairan naik (`clip-path: inset(...)`).
- **Responsive Layout Behavior:**
  - Desktop: Kedua teko berposisi di kanan dan kiri panggung visual secara simetris, kutipan berada di tengah bawah.
  - Mobile: Teko berhadapan atas-bawah dengan aliran saling melengkapi di tengah layar.
- **Elemen HTML/CSS:** Transisi CSS fluida air, sinkronisasi animasi ganda.

---

#### 20. Tentang Kesabaran dalam Menunggu Takdir
- **Quotes:** _"Sabar itu memang berat, tapi hasil dari kesabaran menanti takdir terbaik jauh lebih indah dari apa yang pernah kamu bayangkan."_
- **Konsep Animasi & Interaksi:** Sebutir benih kecil tertimbun di dalam tanah gelap. Pengguna menyentuh kanvas untuk menurunkan rintik hujan sejuk; tanah mulai basah, benih bertunas, batang kayu menjulang tinggi, dan bunga-bunga teratai pohon mekar serempak mengeluarkan aroma harum visual.
- **Color Palette:**
  - Rich Soil: `#271C19` & `#3E2723`
  - Sprout Green: `#52B788` & `#74C69D`
  - Miracle Blossom: `#FFB703` & `#FB8500`
  - Text: `#F1FAEE`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, weight: `500`.
  - Progress Label: `'Space Grotesk'`.
- **Background (BG):** Gradien potongan melintang tanah (bawah: cokelat gelap bumi, atas: langit biru keemasan).
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Pohon bertumbuh SVG prosedural dengan dahan yang bercabang lentur dan dedaunan mekar berurutan.
- **Responsive Layout Behavior:**
  - Desktop: Pohon tumbuh megah mengisi sisi kiri panggung, kartu refleksi kesabaran mengambang di kanan.
  - Mobile: Pohon bertunas dari bawah layar ke atas mengelilingi teks kutipan dengan aman tanpa menutupi kata.
- **Elemen HTML/CSS:** SVG `stroke-dashoffset` untuk akar/batang, `@keyframes leafBloom` dengan transisi `scale`.

---

### Bab 5: Batasan & Pengendalian Diri

#### 21. Tentang Mencintai Terlalu Berlebihan
- **Quotes:** _"Jangan mencintai seseorang melebihi cintamu pada dirimu sendiri. Sebab saat dia pergi, kamu tidak akan kehilangan segalanya, termasuk dirimu."_
- **Konsep Animasi & Interaksi:** Siluet tubuh karakter memiliki lubang puzzle berbentuk hati di dadanya. Sepotong puzzle hati melayang pergi ke arah luar layar. Karakter menarik napas, lalu dari dalam dirinya sendiri terpancar cahaya baru yang melengkapi kembali potongan hati tersebut secara utuh dan mandiri.
- **Color Palette:**
  - Background: `#131515` (Deep Abyss)
  - Missing Void: `#2B2D42`
  - Inner Glow Self-Love: `#E07A5F` & `#F2CC8F`
  - Text: `#F5F5F5`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, italic, `var(--quote-size)`.
  - Body: `'Plus Jakarta Sans'`.
- **Background (BG):** Latar belakang hening dengan lingkaran pendar cahaya internal di dada karakter.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Vektor siluet manusia dengan puzzle SVG berpotongan presisi di area jantung.
- **Responsive Layout Behavior:**
  - Desktop: Karakter di sisi kiri dengan ukuran besar, puzzle bergerak secara horizontal ke sisi kanan sebelum kembali menyatu.
  - Mobile: Karakter di posisi sentral vertikal, animasi puzzle membesar dan terisi kembali di tengah layar.
- **Elemen HTML/CSS:** CSS `transform: translate(...)` dan pendaran `filter: drop-shadow(0 0 15px #f2cc8f)`.

---

#### 22. Tentang Seseorang yang Hanya Singgah
- **Quotes:** _"Tidak semua orang yang datang ke hidupmu ditakdirkan untuk menetap. Beberapa hanya datang sebagai pelajaran, lalu pergi meninggalkan kenangan."_
- **Konsep Animasi & Interaksi:** Peron stasiun kereta api tua saat senja. Kereta listrik meluncur berhenti, seorang penumpang turun menyapa sebentar, melambaikan tangan, lalu kembali naik dan kereta melaju kencang meninggalkan stasiun yang kembali sepi namun damai diiringi hembusan daun kering.
- **Color Palette:**
  - Platform Twilight: `#1D1E2C` & `#2D3047`
  - Train Headlight: `#FFD166` (Amber Beam)
  - Sunset Horizon: `#E07A5F` & `#F4A261`
  - Text: `#EAEBED`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, weight: `500`.
  - Station Sign: `'Plus Jakarta Sans'`, weight: `700`, uppercase.
- **Background (BG):** Lanskap stasiun kereta api senja dengan rel kereta memanjang ke cakrawala.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Kereta api vintage berlampu terang SVG + lampu peron yang menyala temaram.
- **Responsive Layout Behavior:**
  - Desktop: Widescreen sinematik peron kereta membentang penuh dari ujung kiri ke kanan layar.
  - Mobile: Sudut pandang bangku tunggu stasiun dari samping dengan kereta melintas di latar belakang.
- **Elemen HTML/CSS:** `@keyframes trainMove { 0% { transform: translateX(-100%); } 50% { transform: translateX(0); } 100% { transform: translateX(100%); } }`.

---

#### 23. Tentang Ekspektasi yang Menyakitkan
- **Quotes:** _"Bukan dia yang terlalu jahat padamu, tapi ekspektasimu sendiri yang terlalu tinggi menaruh harap pada manusia."_
- **Konsep Animasi & Interaksi:** Menara istana kaca pencakar langit yang dibangun terlalu tinggi dan ramping di atas pasir. Begitu angin kecil berhembus, menara kaca tersebut retak dan runtuh berkeping-keping, meninggalkan fondasi batu karang alami yang kokoh dan sederhana.
- **Color Palette:**
  - Fragile Glass: `rgba(224, 251, 252, 0.5)` & `#98C1D9`
  - Solid Ground: `#3D5A80` & `#293241`
  - Text: `#E0FBFC`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, italic.
  - Subtitle: `'Plus Jakarta Sans'`, weight: `600`.
- **Background (BG):** Gradien langit senja berangin dingin di pantai berbatu karang.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Poligon menara kristal kaca SVG yang terpecah menjadi puluhan pecahan segitiga melayang ke bawah.
- **Responsive Layout Behavior:**
  - Desktop: Runtuhan pecahan kaca tersebar artistik di separuh panggung kiri tanpa mengganggu blok teks di kanan.
  - Mobile: Menara berada di tengah, pecahan kaca jatuh ke dasar layar dengan mulus menggunakan akselerasi GPU.
- **Elemen HTML/CSS:** Transformasi 3D CSS `translate3d`, `rotateZ`, dan pengurangan `opacity`.

---

#### 24. Tentang Berpura-pura Kuat di Depan Orang Lain
- **Quotes:** _"Menangis bukan tanda kamu lemah. Terkadang, air mata adalah cara paling jujur saat kata-kata tak lagi mampu menjelaskan rasa sakit."_
- **Konsep Animasi & Interaksi:** Karakter memegang topeng dengan senyuman lebar penuh warna di depan wajahnya. Saat pengguna menyentuh layar, tangan karakter menurunkan topeng tersebut perlahan, menampakkan wajah tenang yang meneteskan sebutir air mata jernih, lalu tersenyum lega karena tidak perlu lagi berpura-pura.
- **Color Palette:**
  - Fake Mask: `#E63946` & `#FFB703` (Vibrant Contrast)
  - True Vulnerability: `#2B2D42` & `#8D99AE`
  - Background: `#111217`
  - Text: `#EDF2F4`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, weight: `500`, line-height: `1.65`.
  - Prompt Text: `'Plus Jakarta Sans'`, `0.8rem`.
- **Background (BG):** Kamar tidur temaram dengan tirai tertutup rapat dan pantulan cahaya lampu tidur redup.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Ilustrasi siluet topeng teater SVG berhias ornamen senyum + siluet wajah asli di belakangnya.
- **Responsive Layout Behavior:**
  - Desktop: Topeng dan karakter di panggung kiri, panel teks dalam kartu kaca melengkung di kanan.
  - Mobile: Gerakan topeng turun ke bawah diatur oleh gestur usap ke bawah (_swipe down_) oleh pengguna.
- **Elemen HTML/CSS:** `transition: transform 0.9s cubic-bezier(0.25, 1, 0.5, 1)`.

---

#### 25. Tentang Keberanian untuk Berkata "Cukup"
- **Quotes:** _"Berani melepaskan sesuatu yang menyakitkan adalah bentuk kasih sayang tertinggi yang bisa kamu berikan untuk hatimu sendiri."_
- **Konsep Animasi & Interaksi:** Tangan menggenggam erat ranting mawar penuh duri tajam hingga memerah. Tombol "Buka Genggaman" ditekan; jari-jemari terbuka perlahan, ranting berduri jatuh, dan bekas luka di telapak tangan segera diselimuti dedaunan mint hijau yang menyembuhkan dan kupu-kupu biru yang hinggap.
- **Color Palette:**
  - Thorn Hurt: `#6B2D5C` & `#8B0000`
  - Healing Mint: `#52B788` & `#74C69D`
  - Blue Butterfly: `#48CAE4`
  - Text: `#F8F9FA`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, italic.
  - Button Action: `'Plus Jakarta Sans'`, weight: `700`.
- **Background (BG):** Gradasi warna dari merah marun keunguan gelap bertransisi ke hijau zaitun menenangkan.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Siluet tangan SVG anatomis minimalis + ranting berduri dan kupu-kupu bersayap kelap-kelip.
- **Responsive Layout Behavior:**
  - Desktop: Tangan membuka di panggung tengah, kupu-kupu terbang melintasi layar ke arah kutipan di sisi kanan.
  - Mobile: Tombol interaktif lebar di bawah layar memicu terbukanya tangan di bagian tengah atas.
- **Elemen HTML/CSS:** Animasi rotasi sayap kupu-kupu via CSS `transform: rotateY(...)`.

---

### Bab 6: Pertumbuhan & Ketenangan Batin

#### 26. Tentang Cinta yang Sehat (Bukan Saling Menuntut)
- **Quotes:** _"Cinta yang dewasa tidak akan membuatmu merasa tertekan, apalagi kehilangan jati diri. Ia justru membuatmu bertumbuh menjadi versi terbaikmu."_
- **Konsep Animasi & Interaksi:** Dua pohon rindang tumbuh berdampingan di sebuah bukit hijau. Akarnya sama-sama kokoh menghujam tanah, batangnya tegak tanpa saling melilit, dan tajuk daunnya saling menyapa di puncak tanpa menghalangi sinar matahari satu sama lain.
- **Color Palette:**
  - Tree Greens: `#2D6A4F` & `#40916C`
  - Warm Sunlight: `#F6BD60` & `#FFEAA7`
  - Hill Sky: `#D8F3DC` & `#B7E4C7`
  - Text: `#1B4332`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, weight: `600`, size: `var(--quote-size)`.
  - Body / Sub: `'Plus Jakarta Sans'`, weight: `500`.
- **Background (BG):** Langit cerah fajar menuju siang yang lapang, sejuk, dan bebas dari awan mendung.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Dua pohon beringin kembar SVG dengan dahan proporsional dan daun lebat yang berdesir tertiup angin.
- **Responsive Layout Behavior:**
  - Desktop: Lanskap bukit luas dengan kedua pohon di tengah layar, teks tersusun di kartu terapung di bawahnya.
  - Mobile: Kedua pohon tampil seimbang vertikal dengan cahaya matahari memancar dari sela dedaunan ke teks kutipan.
- **Elemen HTML/CSS:** Animasi daun bergoyang lembut `@keyframes swayTree { 0%, 100% { transform: rotate(0deg); } 50% { transform: rotate(1.5deg); } }`.

---

#### 27. Tentang Membandingkan Kisah Cinta dengan Orang Lain
- **Quotes:** _"Setiap orang punya zona waktunya masing-masing. Tidak perlu terburu-buru hanya karena melihat teman-temanmu sudah lebih dulu menemukan pasangannya."_
- **Konsep Animasi & Interaksi:** Sebuah taman raya penuh berbagai spesies tanaman. Bunga melati mekar di pagi hari, bunga matahari bersinar di siang terik, dan bunga sedap malam merekah harum di tengah malam. Jam dinding besar berputar menunjukkan bahwa tiap bunga memiliki waktu mekar sempurna tersendiri.
- **Color Palette:**
  - Jasmine White: `#FFFFFF`
  - Sunflower Gold: `#FFB703` & `#FB8500`
  - Night Queen Violet: `#7209B7`
  - Background: `#1A1B2F`
  - Text: `#F7F7FF`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, italic.
  - Time Zone Badge: `'Space Grotesk'`, weight: `500`.
- **Background (BG):** Gradasi siklus hari 24 jam (pagi, siang, senja, dan malam bersatu dalam kuadran kanvas).
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Ragam bunga SVG dengan animasi mekar bergiliran mengikuti slider waktu interaktif.
- **Responsive Layout Behavior:**
  - Desktop: Carousel taman bunga 3-kolom horizontal yang interaktif.
  - Mobile: Slider horizontal kartu bunga dengan indikator waktu yang mudah digeser jari.
- **Elemen HTML/CSS:** Slider interaktif `<input type="range">` dengan styling kustom kaca.

---

#### 28. Tentang Perhatian Kecil yang Menjebak
- **Quotes:** _"Jangan salah artikan perhatian kecil sebagai tanda cinta. Bagi sebagian orang, bersikap ramah memang sudah menjadi kebiasaan tanpa maksud apa-apa."_
- **Konsep Animasi & Interaksi:** Di bawah rintik hujan lebat, seseorang memayungi orang asing yang basah kuyup di halte. Orang asing itu tersipu, namun si pembawa payung hanya tersenyum sopan, melipat payung begitu bus datang, dan naik bus menuju jalannya sendiri tanpa pamrih atau janji.
- **Color Palette:**
  - Rain Grey: `#334155` & `#475569`
  - Yellow Umbrella: `#FCD34D` & `#F59E0B`
  - Bus Headlight: `#60A5FA`
  - Text: `#F8FAFC`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, weight: `500`.
  - Observation Tag: `'Plus Jakarta Sans'`, `0.85rem`.
- **Background (BG):** Kaca halte basah terkena hujan malam kota dengan bias lampu jalanan kuning buram.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Siluet payung kuning cerah SVG berkontras tinggi terhadap kota kelabu + partikel hujan deras Canvas.
- **Responsive Layout Behavior:**
  - Desktop: Adegan halte sinematik di sebelah kiri, penjelasan dan kutipan bijak di sebelah kanan.
  - Mobile: Payung kuning menonjol di bagian tengah panggung, rintik hujan mengalir di seluruh layar.
- **Elemen HTML/CSS:** Canvas rintik hujan miring (`angle: 15deg`), efek pantulan cahaya di aspal basah.

---

#### 29. Tentang Ketakutan untuk Memulai Lagi
- **Quotes:** _"Trauma masa lalu memang membuatmu lebih berhati-hati, tapi jangan biarkan ia menutup pintu bagi seseorang yang benar-benar tulus datang."_
- **Konsep Animasi & Interaksi:** Pintu gerbang besi berkarat dengan rantai dan gembok tebal. Seseorang membawa kunci perak kecil bercahaya. Begitu kunci dimasukkan ke lubang gembok, karat besi rontok, rantai terlepas, gerbang terbuka lebar menampakkan lorong taman bunga mawar putih beraroma ketulusan.
- **Color Palette:**
  - Rust & Chains: `#5C4033` & `#7F4F24`
  - Silver Key: `#E0E1DD` & `#FFFFFF`
  - Secret Garden: `#99D98C` & `#D8F3DC`
  - Text: `#F8F9FA`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, italic.
  - Action Hint: `'Plus Jakarta Sans'`, uppercase, weight: `600`.
- **Background (BG):** Transisi dari dinding benteng batu dingin ke taman fajar terbuka penuh harapan.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Gembok besi kuno SVG berdetail ukiran + kunci perak bercahaya partikel halo.
- **Responsive Layout Behavior:**
  - Desktop: Gerbang ganda membuka ke samping kiri dan kanan (efek 3D _perspective_), memperlihatkan panorama taman di belakangnya.
  - Mobile: Animasi gembok terlepas di tengah layar dan pintu meluncur ke atas.
- **Elemen HTML/CSS:** `transform: rotateY(-80deg)` dengan `transform-origin: left center` pada daun gerbang.

---

#### 30. Tentang Kesetiaan pada Diri Sendiri
- **Quotes:** _"Pada akhirnya, orang yang paling setia menemanimu dari awal hingga akhir hidup adalah dirimu sendiri. Jadi, perlakukan dirimu dengan baik."_
- **Konsep Animasi & Interaksi:** Garis pantai pasir putih di waktu sore menjelang senja tenang. Karakter berjalan santai tanpa terburu-buru, meninggalkan jejak kaki yang rapi di pasir. Deburan ombak lembut datang menyapa kaki, dan karakter memeluk dirinya sendiri sambil tersenyum menatap langit jingga.
- **Color Palette:**
  - Sand Cream: `#F4F1DE` & `#E9D8A6`
  - Sunset Pink-Orange: `#F28482` & `#F5CAC3`
  - Ocean Calm: `#84A59D`
  - Text: `#3D405B`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, weight: `600`.
  - Body Text: `'Plus Jakarta Sans'`, weight: `500`.
- **Background (BG):** Gradien langit senja laut tropis yang damai `linear-gradient(135deg, #f5cac3 0%, #f28482 45%, #84a59d 100%)`.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Ombak pantai SVG berlapis dinamis + jejak kaki di pasir yang terhapus perlahan oleh air pasang.
- **Responsive Layout Behavior:**
  - Desktop: Tampilan pantai panorama ultra-lebar, ombak beriak di bagian bawah layar secara kontinu.
  - Mobile: Pantai memanjang vertikal, karakter berjalan dari bawah ke atas layar diiringi suara desir ombak.
- **Elemen HTML/CSS:** Animasi SVG ombak bertingkat `transform: translateX(...)` berseling arah.

---

### Bab 7: Penyerahan Diri & Puncak Kebijaksanaan

#### 31. Tentang Alasan Tuhan Menjauhkan Seseorang
- **Quotes:** _"Jika Tuhan menjauhkan dia darimu, itu bukan karena Tuhan tidak sayang. Justru karena Tuhan mendengar percakapan di belakangmu yang tidak pernah kamu dengar."_
- **Konsep Animasi & Interaksi:** Karakter melangkah maju mengejar bayangan seseorang yang dicintai. Tiba-tiba di depan langkah kakinya muncul dinding pelindung transparan emas dari langit yang menahannya. Saat kabut tersibak, tampak di depan bayangan itu terdapat jurang curam berbahaya yang tak terlihat sebelumnya.
- **Color Palette:**
  - Divine Shield: `#FFD166` & `#FFEAA7` (Golden Grace)
  - Abyss Danger: `#0F0E17` & `#2E1437`
  - Safety Dawn: `#F7ECE1`
  - Text: `#FFFFFE`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, italic, `var(--quote-size)`.
  - Subtitle: `'Plus Jakarta Sans'`, weight: `600`.
- **Background (BG):** Latar belakang mistis berkabut gelap yang disinari seberkas cahaya vertikal dari surga (_God rays_).
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Dinding pelindung perisai heksagonal bercahaya SVG + jurang tebing siluet batu gelap.
- **Responsive Layout Behavior:**
  - Desktop: Komposisi visual dramatis memperlihatkan jurang di kanan dan perisai cahaya penolong di tengah kiri.
  - Mobile: Karakter di bawah, dinding pelindung menahan di tengah, jurang terlihat jelas di latar belakang atas.
- **Elemen HTML/CSS:** Partikel sinar surga Canvas 2D, filter pendar `filter: drop-shadow(0 0 20px #ffd166)`.

---

#### 32. Tentang Menjadi Dewasa dalam Menyikapi Rindu
- **Quotes:** _"Rindu yang paling dewasa adalah ketika kamu tidak lagi memaksanya untuk kembali, melainkan cukup mendoakan kebahagiaannya dari kejauhan."_
- **Konsep Animasi & Interaksi:** Karakter melepaskan sebuah lampion kertas bercahaya hangat ke langit malam. Lampion tersebut membubung tinggi melewati awan tipis, menyatu dengan gugusan galaksi bintang, memancarkan kedamaian tanpa dendam atau kepedihan.
- **Color Palette:**
  - Deep Space: `#03071E` & `#0B090A`
  - Lantern Amber: `#FAA307` & `#F48C06`
  - Starlight Veil: `rgba(255, 255, 255, 0.8)`
  - Text: `#F8F9FA`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, weight: `500`.
  - Meta/Date: `'Space Grotesk'`.
- **Background (BG):** Kanvas kosmos galaksi bima sakti malam hari berpartikel bintang kelap-kelip halus.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Lampion lentera terbang kertas tradisional SVG dengan nyala api lembut yang mengecil ke angkasa.
- **Responsive Layout Behavior:**
  - Desktop: Lampion terbang melintas secara diagonal dari kiri bawah ke kanan atas melewati teks kutipan.
  - Mobile: Lampion meluncur vertikal lurus ke atas dengan ekor partikel pendar yang memudar lembut.
- **Elemen HTML/CSS:** `@keyframes floatLantern { 0% { transform: translateY(0) scale(1); opacity: 1; } 100% { transform: translateY(-300px) scale(0.3); opacity: 0; } }`.

---

#### 33. Tentang Lelahnya Mengejar Orang yang Berlari Menjauh
- **Quotes:** _"Kamu tidak perlu berlari mengejar seseorang yang sengaja mempercepat langkahnya agar tidak terkejar olehmu."_
- **Konsep Animasi & Interaksi:** Lintasan lari di tepi danau. Karakter yang tadinya berlari kencang tiba-tiba melambatkan langkah, berhenti, membungkuk mengambil napas, lalu tertawa lepas. Karakter berjalan santai ke bangku kayu di bawah pohon rindang dan duduk berselonjor menikmati indahnya senja.
- **Color Palette:**
  - Lake Dusk: `#2B2D42` & `#8D99AE`
  - Sunset Serenity: `#E07A5F` & `#F4A261`
  - Bench Wood: `#4A3B32`
  - Text: `#EDF2F4`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, italic.
  - Sub Font: `'Plus Jakarta Sans'`, weight: `500`.
- **Background (BG):** Gradasi danau tenang saat matahari terbenam dengan pantulan jingga kemerahan di air.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Bangku taman kayu SVG di bawah pohon rindang + siluet danau dengan perahu kecil mengapung.
- **Responsive Layout Behavior:**
  - Desktop: Panorama horizontal danau senja luas dengan bangku taman nyaman di sisi kiri dan kutipan di kanan.
  - Mobile: Sudut pandang bangku taman di bagian bawah layar, pemandangan danau tenang di bagian atas.
- **Elemen HTML/CSS:** Transisi animasi lari ke posisi duduk bersantai, efek deburan angin lembut pada ranting pohon.

---

#### 34. Tentang Kebahagiaan yang Sederhana
- **Quotes:** _"Terkadang, yang kamu butuhkan bukanlah pasangan baru, melainkan istirahat sejenak dari riuhnya perasaan dan berdamai dengan kesendirian."_
- **Konsep Animasi & Interaksi:** Sudut kamar yang nyaman (*hygge cozy corner*). Cangkir teh hijau mengepul di atas tatakan kayu, tirai putih tertiup angin sore sepoi-sepoi dari jendela yang terbuka separuh, dan kucing peliharaan tidur mendengkur pulas di atas karpet berbulu tebal.
- **Color Palette:**
  - Cozy Linen: `#FAF0CA` & `#F4D35E`
  - Sage Peace: `#6B9080` & `#A4C3B2`
  - Warm Wood: `#7F5539`
  - Text: `#283618`
- **Typography:**
  - Quote Font: `'Cormorant Garamond'`, weight: `600`, size: `var(--quote-size)`.
  - Body / Sub: `'Plus Jakarta Sans'`, weight: `400`.
- **Background (BG):** Dinding kamar bernuansa pastel hangat sage-cream dengan pencahayaan sinar matahari sore (*golden hour*).
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Cangkir keramik mengepul SVG + tirai kain bergelombang CSS + siluet kucing tidur melingkar.
- **Responsive Layout Behavior:**
  - Desktop: Ilustrasi ruangan kamar yang estetik dan menenangkan di kiri, teks renungan jiwa di kanan.
  - Mobile: Jendela kamar mengisi bagian atas dengan tirai melambai, kartu kutipan berbaring nyaman di bawah.
- **Elemen HTML/CSS:** `@keyframes curtainFlutter { 0%, 100% { transform: skewY(0deg) scaleX(1); } 50% { transform: skewY(2deg) scaleX(1.05); } }`.

---

#### 35. Pesan Penutup & Etalase Promosi Novel Fisik (Finale & Call to Action)
- **Quotes:** _"Jika kita tak pernah jatuh cinta dan patah hati, mungkin kita tak akan pernah tahu seberapa kuat diri kita mampu bangkit, dan seberapa besar cinta Tuhan menjaga hati kita."_
- **Konsep Animasi & Interaksi:** *Grand Finale Montage*: Seluruh siluet perjalanan (dari malam kesedihan, badai keraguan, proses memaafkan, hingga fajar kebangkitan) melintas cepat seperti film pendek. Di panggung akhir, muncul buku fisik 3D _Jika Kita Tak Pernah Jatuh Cinta_ karya Alvi Syahrin berputar interaktif dengan kilau emas, diikuti tombol aksi interaktif pembelian novel di toko resmi.
- **Color Palette:**
  - Royal Dawn: `#0B132B` bertransisi ke `#F6BD60` & `#FFFFFF`
  - Book Cover Accent: `#E76F51` & `#264653`
  - Button Glow: `#FFB703` & `#FB8500`
  - Text: `#FFFFFF`
- **Typography:**
  - Finale Quote: `'Cormorant Garamond'`, weight: `700`, italic, `clamp(1.4rem, 2.2vw, 2.6rem)`.
  - Author Signature: `'Plus Jakarta Sans'`, weight: `600`, letter-spacing: `3px`.
  - CTA Button: `'Plus Jakarta Sans'`, weight: `800`, `1.05rem`.
- **Background (BG):** Panggung fajar emas penuh kemegahan dengan partikel confetti emas lembut mengapung di udara.
- **Image / Visual Asset (IMG):**
  - Tipe Aset: Model 3D CSS / SVG interaktif Sampul Buku Novel Fisik _Jika Kita Tak Pernah Jatuh Cinta_ lengkap dengan ketebalan halaman kertas, pita pembatas buku merah, dan stiker *National Best Seller*.
  - Dimensi Book Cover: Rasio aspek buku standar 13.5 × 20 cm responsif.
- **Responsive Layout Behavior:**
  - Desktop: Tata letak sinematik 2 kolom: Buku 3D dapat diputar dengan kursor mouse di sebelah kiri, panel kutipan penutup, ulasan pembaca, dan tombol "Beli Novel Sekarang" (Gramedia / Shopee) di sebelah kanan.
  - Tablet: Tampilan panggung terintegrasi dengan tombol aksi mengambang di bawah kartu buku.
  - Mobile: Buku 3D interaktif di tengah atas dengan tombol "Beli Novel Sekarang" berukuran penuh yang menempel tetap (*sticky bottom bar*) agar mudah dibeli kapan saja.
- **Elemen HTML/CSS & Interaktivitas:**
  - CSS 3D Book: `transform-style: preserve-3d; perspective: 1200px;` dengan efek rotasi saat disentuh atau diarahkan kursor.
  - Tombol CTA bercahaya: `box-shadow: 0 10px 25px rgba(251, 133, 0, 0.45); transition: transform 0.3s ease;`.

---

## 🛠️ 4. Panduan Struktur Proyek & Implementasi File

Saat fase eksekusi kode dilakukan, struktur direktori proyek akan diorganisir sebagai berikut:

```
Jika Kita Tak Pernah Jatuh Cinta/
├── PLAN.MD                   # Dokumen master rencana & spesifikasi (file ini)
├── index.html                # Markup semantik untuk 35 adegan & canvas controller
├── style.css                 # Master fluid responsive styles, token warna, typography
├── script.js                 # Engine navigasi (keyboard, touch, scroll), interaktivitas & sound
└── assets/                   # Folder aset lokal pendukung
    ├── audio/                # Musik latar piano/lofi lembut & sfx Web Audio
    ├── images/               # Sampul novel fisik WebP & ikon SVG pendukung
    └── fonts/                # Cadangan font lokal woff2 (opsional selain Google Fonts)
```

### Navigasi Multi-Input Responsif
Web dilengkapi kontrol navigasi yang adaptif terhadap perangkat apa pun yang digunakan pengunjung:
1. **Desktop Keyboard:** Panah Kiri/Atas (Sebelumnya), Panah Kanan/Bawah/Spasi (Berikutnya), Esc (Daftar Isi).
2. **Mouse & Trackpad:** Roda mouse (_wheel scroll-snap_) halus dan tombol panah mengambang di pojok layar.
3. **Mobile & Tablet Touch Gestures:** Deteksi sentuhan usap layar (`touchstart`, `touchend`) dengan ambang batas pergeseran yang presisi agar tidak terjadi perpindahan halaman yang tidak disengaja.
4. **Quick Navigation Drawer / HUD:** Indikator nomor halaman `(1 / 35)` yang dapat diklik untuk membuka modal daftar isi berisi ke-7 bab utama.
