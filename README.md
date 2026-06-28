# COGNITIVA

Frontend demo berbasis **React + Vite** untuk simulasi platform pembelajaran reflektif yang menekan *cognitive offloading* lewat alur **Reflect Before Reveal**, mode **multi-role** (student/teacher), dan dashboard analitik.

## Fitur Utama

- **Public auth flow**: Welcome, login, dan register sebelum masuk dashboard.
- **Akun demo siap pakai**:
  - Teacher: `admin@cognitiva.ai` / `cognitiva-demo`
  - Student: `student@cognitiva.ai` / `cognitiva-demo`
- **Role-based dashboard**: tampilan otomatis mengikuti role akun (student/teacher).
- **Student workspace**:
  - Chat workspace dengan langkah refleksi wajib sebelum jawaban AI penuh.
  - Skill workspace untuk AI Agent Layer (Socratic, Reasoning, Evidence Checker, Counter-Argument, Reflection Coach, Argument Evaluator, Summary).
  - Analytics dashboard (AI Dependency Index, Critical Thinking Score, sesi refleksi).
- **Teacher workspace**:
  - Lecturer Control Panel (overview kelas).
  - Thinking process log untuk evaluasi interaksi siswa.
- **Persistensi lokal**: state auth dan daftar user disimpan di `localStorage`.

## Teknologi

- React 19
- Vite 8
- Tailwind CSS 4 (`@tailwindcss/vite`)
- lucide-react (ikon)
- ESLint

## Menjalankan Proyek

```bash
npm install
npm run dev
```

Lalu buka URL yang ditampilkan Vite (default: `http://localhost:5173`).

## Skrip NPM

- `npm run dev` — menjalankan development server.
- `npm run build` — build production.
- `npm run preview` — preview hasil build.
- `npm run lint` — linting kode.

## Struktur Singkat

```text
src/
  App.jsx                   # state utama auth, role, routing halaman
  components/
    AuthPages.jsx           # welcome/login/register
    Sidebar.jsx             # navigasi role-based + riwayat chat
    MainContent.jsx         # chat + reflect flow
    SkillPage.jsx           # katalog AI agent
    AnalyticsPage.jsx       # metrik kognitif
    TeacherDashboard.jsx    # panel dosen + logs
```

## Catatan Implementasi

- Proyek ini saat ini bersifat **frontend demo/prototype** (belum ada backend/API nyata).
- Data user dan sesi login disimpan lokal di browser menggunakan `localStorage`.
