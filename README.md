# Web Lab ELINS

Frontend website Laboratorium Riset Elektronika dan Instrumentasi (ELINS) FMIPA UGM.

## Stack
- React 19
- Vite 8
- React Router DOM 7
- Tailwind CSS 4
- Framer Motion

## Menjalankan Project
1. Clone repository
2. Masuk ke folder project
3. Install dependency
4. Jalankan dev server

```bash
git clone https://github.com/nijika1ji/nyoba_web.git
cd nyoba_web
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

## Command Penting
```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

## Workflow Git
- Kerja hanya di branch `grey`
- Push hanya ke `origin/grey`
- Jangan commit atau push ke `main`

```bash
git status
git branch --show-current
git add <file>
git commit -m "pesan perubahan"
git push origin grey
```

## Struktur Singkat
```text
src/
├── components/
├── data/
├── pages/
├── utils/
├── App.jsx
└── main.jsx
```

## Status Frontend Saat Ini
- Data masih statis dari folder `src/data`
- Form peminjaman masih mode demo frontend
- State form tersimpan sementara di `localStorage`
- Submit form sudah memakai service layer frontend (`src/utils/submissionService.js`) agar lebih siap untuk integrasi backend nanti
- Routing sudah punya fallback 404
- Route pages sudah memakai lazy loading dengan `Suspense`

## Verifikasi Sebelum Push
```bash
npm run lint
npm run build
```
