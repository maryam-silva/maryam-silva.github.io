# IKAPMI Regional Bandung Web

Website resmi **Ikatan Keluarga & Alumni Pesantren Modern Ummul Quro Al-Islami (IKAPMI) Regional Bandung**.

Platform digital pusat informasi, jejaring alumni, database anggota, dan panduan santri baru yang melanjutkan studi di perguruan tinggi wilayah Bandung Raya.

---

## 🌟 Fitur Utama

- **Hero & Identity:** Pengenalan organisasi dan profil pengurus dengan interactive ID Card rail 3D.
- **Tentang Kami:** Visi, misi, sejarah, dan nilai-nilai perjuangan santri di perantauan.
- **Linimasa Kepengurusan:** Peta estafet kepengurusan lintas tahun. Tiap titik dapat diklik untuk membuka modal berisi struktur pengurus lengkap dengan badge card 3D flip per anggota. Periode aktif ditandai kabinet, periode berakhir ditandai cap DEMISIONER. Data diambil dari Sanity CMS.
- **Jejak Prestasi:** Kartu prestasi anggota & alumni dengan desain biru bertingkat, medal rank otomatis (Juara 1–5), animasi hover spring, dan data dari Sanity CMS.
- **Warta & Artikel:** Kabar terkini dengan modal reader bergaya editorial — cover photo hero, overlay gelap, metadata penulis, dan teks artikel penuh.
- **Direktori Kampus & Jejaring Alumni:**
  - Pemetaan kampus (UIN Sunan Gunung Djati, UNPAD, UPI, ITB, Telkom University, UNISBA, POLBAN, UNPAS).
  - Filter kategori PTN & PTS, pencarian jurusan, serta tombol langsung hubungi koordinator kampus.
- **Pusat Panduan Santri Baru ke Bandung:**
  - **Jalur Masuk Kampus:** Panduan interaktif pemilihan kampus dengan logo resmi dan daftar jalur masuk terperinci (SNBP, SNBT, SPAN-PTKIN, UM-PTKIN, Mandiri, dan beasiswa Tahfidz Al-Qur'an).
  - **Panduan Wilayah Kost Santri:** Pemetaan area hunian dan rekomendasi kost strategis dekat masjid dan kampus.
  - **Informasi Beasiswa:** Ragam beasiswa S1 (KIP-K, JFLS, BSI Scholarship, Beasiswa Hafiz).
  - **Pendampingan Kakak Tingkat:** Konsultasi adaptasi kuliah dan kehidupan di Bandung.
- **Dokumentasi & Galeri Kegiatan:** Dokumentasi Rakerda, Mureg, dan temu akbar alumni.

---

## 🗄️ CMS (Sanity)

Konten dinamis dikelola lewat **Sanity CMS** (projectId: `86ednba2`, dataset: `production`).

Tipe konten yang terhubung:
- `kepengurusan` — data pengurus per periode (nama, jabatan, divisi, foto)
- `prestasi` — data prestasi anggota (nama, judul, tanggal, foto)
- `warta` — artikel & berita (judul, isi portable text, foto cover, kategori)
- `beasiswa` — info beasiswa yang tersedia

Sanity Studio tersedia di folder `ikapmibandung-website/` (tidak di-track git; deploy terpisah via `npx sanity deploy`).

---

## 🔨 Build Komponen React

Komponen UI (`prestasi-section.tsx`, `kepengurusan-section.tsx`) di-bundle dengan **esbuild** (React sudah di-bundle, tidak perlu CDN):

```bash
# Prestasi section
npx esbuild src/mount_prestasi.tsx --bundle --outfile=js/prestasi.bundle.js --loader:.tsx=tsx

# Kepengurusan section
npx esbuild src/mount_kepengurusan.tsx --bundle --outfile=js/kepengurusan.bundle.js --loader:.tsx=tsx
```

Setelah build, naikkan versi cache-bust di `index.html` pada tag `<script src="js/X.bundle.js?v=...">`.

---

## 🚀 Menjalankan Secara Lokal

Untuk menjalankan website secara lokal:

```bash
# Menggunakan Python HTTP Server
python -m http.server 5173

# Atau menggunakan Node.js / npx serve
npx serve .
```

Buka `http://localhost:5173` pada browser Anda.

---

## 👨‍💻 Kontributor

- **Azis Panji** ([@Azispanji24](https://github.com/Azispanji24)) - *Bidang Komunikasi & Informasi (Kominfo) IKAPMI Bandung*
- Email: `azispanji92@gmail.com`

---

&copy; 2026 IKAPMI Regional Bandung. All rights reserved.
