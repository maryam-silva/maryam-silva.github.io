# IKAPMI Regional Bandung — Website Resmi

Website resmi **Ikatan Keluarga & Alumni Pesantren Modern Ummul Quro Al-Islami (IKAPMI) Regional Bandung**.

Platform digital pusat informasi, jejaring alumni, database anggota, dan panduan santri baru yang melanjutkan studi di perguruan tinggi wilayah Bandung Raya.

🌐 **Live:** [maryam-silva.github.io](https://maryam-silva.github.io)

---

## Bagian & Fitur

| Section | Deskripsi |
|---|---|
| **Beranda (Hero)** | Pengenalan organisasi, logo interaktif, tagline, dan statistik singkat |
| **Tentang Kami** | Visi, misi, sejarah, dan nilai-nilai perjuangan santri di perantauan |
| **Pelindung Organisasi** | Profil pelindung & pembina organisasi dalam tampilan zigzag 3D card |
| **Struktur Kepengurusan** | Kartu ID pengurus aktif per bidang dengan layout rail horizontal |
| **Panduan Santri Baru** | Multi-tab: Jalur Masuk Kampus (SNBP, SNBT, SPAN-PTKIN, Mandiri, dll), Kost Santri, Beasiswa |
| **Direktori Kampus** | Pemetaan 8+ kampus di Bandung Raya; filter PTN/PTS, pencarian jurusan, kontak koordinator |
| **Dokumentasi** | Galeri foto kegiatan Rakerda, Mureg, dan temu akbar alumni |
| **Galeri** | Grid foto kegiatan interaktif dengan lightbox |
| **Warta & Artikel** | Berita terkini dengan modal reader bergaya editorial (cover hero, overlay gelap, teks penuh) |
| **Kiprah Alumni** | Profil dan kontribusi alumni aktif; data dari Sanity CMS |
| **Jejak Prestasi** | Kartu prestasi anggota & alumni — medal rank otomatis, animasi hover spring; data dari Sanity CMS |
| **Linimasa Kepengurusan** | Peta estafet kepengurusan lintas tahun; klik titik untuk membuka struktur pengurus lengkap dengan badge card 3D flip; data dari Sanity CMS |
| **Ulasan** | Testimoni anggota dan alumni |
| **Database Alumni** | Formulir pendaftaran alumni ke Google Sheets (via Google Apps Script) |
| **Kontak** | Info kontak, alamat, Instagram, dan tombol WhatsApp pengurus |

---

## Stack Teknis

| Komponen | Teknologi |
|---|---|
| Halaman utama | HTML + Tailwind CSS (via CDN) + vanilla JS |
| Komponen React | TypeScript + React 18 (di-bundle via esbuild) |
| CMS | [Sanity.io](https://sanity.io) v3 — projectId `86ednba2`, dataset `production` |
| Backend alumni | Google Apps Script + Google Sheets |
| Hosting | GitHub Pages (static) |
| CI/CD | GitHub Actions → lftp mirror ke server FTP (jika dikonfigurasi) |

---

## Konten Dinamis (Sanity CMS)

Konten berikut diambil live dari Sanity API:

- **`kepengurusan`** — data pengurus per periode (nama, jabatan, divisi, foto individu, foto bersama)
- **`prestasi`** — prestasi anggota/alumni (nama, judul, tanggal, foto)
- **`warta`** — artikel & berita (judul, isi portable text, foto cover, kategori, tanggal)
- **`beasiswa`** — info beasiswa yang tersedia (nama, deskripsi, syarat, link)
- **`kiprahAlumni`** — profil alumni (nama, kampus, angkatan, foto, cerita)

Sanity Studio tersedia di folder `ikapmibandung-website/` (tidak di-track git; deploy terpisah via `npx sanity deploy` dari dalam folder tersebut).

---

## Build Komponen React

Komponen UI (`prestasi-section.tsx`, `kepengurusan-section.tsx`, `kiprah-alumni.tsx`) di-bundle menggunakan **esbuild** — React sudah di-bundle langsung (tidak butuh CDN):

```bash
# Prestasi section
npx esbuild src/mount_prestasi.tsx --bundle --outfile=js/prestasi.bundle.js --loader:.tsx=tsx

# Kepengurusan section
npx esbuild src/mount_kepengurusan.tsx --bundle --outfile=js/kepengurusan.bundle.js --loader:.tsx=tsx

# Kiprah alumni section (jika ada perubahan)
npx esbuild src/mount_kiprah_alumni.tsx --bundle --outfile=js/kiprah-alumni.bundle.js --loader:.tsx=tsx
```

Setelah build, naikkan versi cache-bust di `index.html` pada tag `<script src="js/X.bundle.js?v=...">`.

---

## Menjalankan Secara Lokal

```bash
# Menggunakan Python HTTP Server
python -m http.server 5173

# Atau menggunakan Node.js / npx serve
npx serve .
```

Buka `http://localhost:5173` pada browser.

> **Catatan:** Konten dari Sanity CMS tidak muncul di localhost karena CORS hanya mengizinkan domain produksi. Gunakan fallback data statis (sudah tersedia di setiap komponen) untuk pengembangan lokal, atau tambahkan `http://localhost:5173` ke daftar CORS di [sanity.io/manage](https://sanity.io/manage).

---

## Struktur Folder

```
ikapmi-bandung-web-main/
├── index.html                  # Halaman utama
├── css/
│   └── style.css               # Styling kustom
├── js/
│   ├── app.js                  # Logika utama (warta, beasiswa, kampus, dll)
│   ├── sanity.js               # Sanity client & fetch helpers
│   ├── prestasi.bundle.js      # Bundle React — section Prestasi
│   ├── kepengurusan.bundle.js  # Bundle React — section Kepengurusan
│   └── kiprah-alumni.bundle.js # Bundle React — section Kiprah Alumni
├── src/
│   ├── mount_*.tsx             # Entry point esbuild per komponen
│   └── components/ui/          # Komponen React (TSX)
├── assets/                     # Logo, foto, dan aset statis
├── ikapmibandung-website/      # Sanity Studio (tidak di-track git)
└── GoogleAppsScript_*.js       # Backend Google Apps Script (referensi)
```

---

## Kontributor

- **Maryam Silva** ([@maryam-silva](https://github.com/maryam-silva)) — *Web Development*
- **Azis Panji** ([@Azispanji24](https://github.com/Azispanji24)) — *Bidang Komunikasi & Informasi (Kominfo) IKAPMI Bandung*
  - Email: `azispanji92@gmail.com`

---

&copy; 2026 IKAPMI Regional Bandung. All rights reserved.
