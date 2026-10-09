# Kevin Mahardhika Mulya — Portfolio

Website portfolio pribadi yang dibangun dengan **React + Vite**, dengan desain mengikuti template
Figma "Arik" (tema gelap, aksen krem `#DAC5A7`, font Satoshi / Chillax / Gambetta).

- Smooth scrolling dengan [Lenis](https://github.com/darkroomengineering/lenis)
- Animasi dengan [Motion](https://motion.dev) (reveal saat scroll, parallax, transisi pop-up)
- Klik project → pop-up detail (overview, kontribusi, tech stack, galeri + lightbox, prev/next)
- Responsif (desktop, tablet, mobile) dan menghormati setting _reduce motion_ di perangkat

## Menjalankan di komputer

```bash
npm install
npm run dev      # buka http://localhost:5173
npm run build    # build produksi ke folder dist/
npm run lint
```

## Mengganti foto

Foto tampil di bagian Hero, di dalam lingkaran (kepala sedikit keluar dari lingkaran).

1. Simpan foto di `public/images/`, misalnya `public/images/kevin.png`.
2. Buka `src/data/profile.js` dan ubah `photo` menjadi `'/images/kevin.png'`.

Hasil terbaik: PNG/WebP transparan (tanpa background), kepala sampai dada, wajah di tengah,
dengan proporsi sekitar 2 : 3 (lebar : tinggi). Isi `photo: null` untuk menampilkan placeholder.

## Mengedit konten

Semua isi website ada di `src/data/`, jadi tidak perlu menyentuh komponen:

| File | Isi |
| --- | --- |
| `profile.js` | nama, kontak, link sosial, teks & statistik hero, path CV, link navbar |
| `projects.js` | daftar project + isi pop-up detail |
| `experience.js` | timeline pengalaman & pendidikan |
| `skills.js` | kartu-kartu di section Skills |
| `services.js` | tiga kartu di section Services |

### Screenshot project

Screenshot disimpan di `public/images/projects/<slug>/` dan didaftarkan di array `gallery`
pada `src/data/projects.js`. Screenshot PNG/JPG ukuran penuh (misal 1920×1080) tidak masalah:

- `npm run dev` dan `npm run build` otomatis menjalankan `scripts/optimize-images.mjs`, yang
  membuat salinan WebP kecil (640px) dan sedang (1600px) di folder `_opt/`. Website memakai
  salinan ini, jadi tetap ringan. Folder `_opt/` tidak perlu di-commit (sudah di `.gitignore`),
  Vercel membuatnya sendiri saat build.
- Thumbnail kartu project adalah mosaic miring dari gambar-gambar `gallery`, di atas latar
  gelap-krem yang sama dengan tema website.
- Untuk membuat ulang salinan secara manual: `npm run images`.

### Kartu "Coming soon"

Kartu "Next project / Coming soon" di akhir grid diatur lewat `upcoming` di bawah
`src/data/projects.js`. Ubah teksnya, atau isi `upcoming = null` untuk menyembunyikannya
(misalnya setelah project baru ditambahkan ke `projects`).

### CV

File CV untuk tombol "Download CV" ada di `public/KevinMahardhikaMulya_CV_2026.pdf`.
Ganti file tersebut (atau ubah `cv` di `profile.js`) saat CV diperbarui.

## Deploy ke Vercel

1. Push repository ini ke GitHub.
2. Di [vercel.com/new](https://vercel.com/new), import repository-nya.
3. Vercel otomatis mendeteksi **Vite**: build command `npm run build`, output `dist`.
   Tidak ada environment variable yang dibutuhkan.
4. Klik **Deploy**. Setiap push ke branch utama akan otomatis di-deploy ulang.

## Struktur

```
src/
  components/   komponen per section (+ CSS masing-masing)
  data/         semua konten website
  lib/          smooth scroll (Lenis), easing, link sosial, path gambar teroptimasi
  styles/       design tokens & style global
scripts/
  optimize-images.mjs   membuat salinan WebP dari screenshot project
public/
  images/       foto profil, screenshot project, og-image
```
