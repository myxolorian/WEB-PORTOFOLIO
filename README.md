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

## Mengganti foto (placeholder)

1. Simpan foto di `public/images/`, misalnya `public/images/kevin.png`.
2. Buka `src/data/profile.js` dan ubah `photo: null` menjadi `photo: '/images/kevin.png'`.

Foto otomatis dipakai di bagian Hero dan About. Hasil terbaik: foto portrait dengan
latar gelap atau PNG transparan (bagian bawah foto akan memudar ke background).

## Mengedit konten

Semua isi website ada di `src/data/`, jadi tidak perlu menyentuh komponen:

| File | Isi |
| --- | --- |
| `profile.js` | nama, kontak, link sosial, teks hero & about, path CV |
| `projects.js` | daftar project + isi pop-up detail |
| `experience.js` | timeline pengalaman & pendidikan |
| `skills.js` | kartu skill dan teks berjalan (marquee) teknologi |
| `services.js` | tiga kartu "What I do" |

### Screenshot project

Screenshot diambil dari PDF portfolio dan disimpan di `public/images/projects/<slug>/`.
Resolusinya kecil (±600px) karena mengikuti gambar di PDF, jadi disarankan menggantinya
dengan screenshot resolusi tinggi (misal 1600px lebar, format `.webp`/`.png`) dengan nama
file yang sama, atau tambahkan file baru di array `gallery` project terkait.

Project **DIVA** belum punya screenshot, sehingga memakai cover tipografi. Tambahkan gambar
di `public/images/projects/diva/` lalu isi `gallery` di `projects.js` untuk memunculkannya.

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
  lib/          smooth scroll (Lenis), easing, link sosial
  styles/       design tokens & style global
public/
  images/       screenshot project, og-image
```
