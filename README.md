# Cognitiva

Cognitiva adalah aplikasi web interaktif berbasis **React + Vite** yang dirancang untuk mendukung pembelajaran reflektif dan interaksi multi-role antara **student** dan **teacher**.

## Fitur utama

- **Autentikasi sederhana**: welcome, login, register, dan demo login.
- **Multi-role experience**: tampilan berbeda untuk student dan teacher.
- **Student dashboard**:
  - Chat / refleksi dengan agent.
  - Skill page untuk memilih atau mengganti agent.
  - Analytics page untuk melihat progres refleksi.
- **Teacher dashboard**:
  - Dashboard khusus untuk guru/dosen.
  - Navigasi tab yang disesuaikan untuk role teacher.
- **Penyimpanan lokal**: data login demo dan status auth disimpan di `localStorage`.
- **UI modern**: menggunakan **Tailwind CSS**, animasi ringan, dan desain responsif.

## Teknologi yang digunakan

- React 19
- Vite 8
- Tailwind CSS 4
- Lucide React
- ESLint

## Struktur project

- `src/App.jsx` — logika utama aplikasi, autentikasi, dan routing UI berbasis role.
- `src/components/` — kumpulan komponen halaman seperti sidebar, auth pages, dashboard, dan agent pages.
- `src/index.css` — styling global dan animasi.
- `src/App.css` — style tambahan dari template awal.

## Menjalankan project

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
```

## Preview hasil build

```bash
npm run preview
```

## Catatan

Project ini saat ini masih berfokus pada pengalaman demo/interaktif lokal. Data autentikasi dan user disimpan di browser, bukan di backend.
