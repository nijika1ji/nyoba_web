# CLAUDE.md - Web Lab ELINS

## Ringkasan Project
Frontend website Laboratorium Riset Elektronika dan Instrumentasi (Lab ELINS) FMIPA UGM.
Stack: React 19 + Vite 8 + React Router DOM 7 + Tailwind CSS 4 + Framer Motion.

## Command Penting
```bash
npm install          # Install dependencies
npm run dev          # Dev server (localhost:5173)
npm run build        # Production build
npm run lint         # ESLint check
npm run preview      # Preview production build
```

## Struktur Utama
```text
src/
├── components/      # Navbar, Footer, ProjectCard, ProjectPageTemplate
├── pages/           # Home, Profil, Project*, Layanan, Kontak, Peminjaman*
├── data/            # projects.js, alatLab.js (data statis)
├── utils/           # alatHelpers.js, submissionService.js
├── App.jsx          # Router utama + lazy-loaded pages
└── main.jsx         # Entry point
```

## Routing
- `/` - Home
- `/profil` - Tentang Lab
- `/profil/dosen` - Profil Dosen
- `/project/penelitian` - List Penelitian
- `/project/pengabdian` - List Pengabdian
- `/project/:jenis/:id` - Detail Project
- `/layanan` - Info Layanan
- `/layanan/peminjaman-alat` - Katalog Alat
- `/layanan/peminjaman-alat/:slug` - Detail Alat
- `/layanan/peminjaman-alat/:slug/ajukan` - Form Peminjaman Alat
- `/layanan/peminjaman-ruangan` - Form Peminjaman Ruangan
- `/kontak` - Kontak
- `*` - Not Found fallback

## Aturan Kerja
1. **Branch**: Semua kerja di branch `grey`, push ke `origin/grey`. JANGAN kerja di `main`.
2. **Import Router**: Gunakan `'react-router-dom'` konsisten untuk semua import routing.
3. **Lint**: Jalankan `npm run lint` sebelum commit. Fix semua error.
4. **Build**: Pastikan `npm run build` sukses sebelum push.
5. **Commit**: Commit bertahap per area kerja, jangan tunggu semua selesai.
6. **Form**: Form peminjaman masih dummy frontend, belum ada backend real.
7. **Data**: Data project/alat masih di `src/data/`, belum ada API real.

## Kondisi Saat Ini
- ✅ Import router konsisten ke `react-router-dom`
- ✅ 404 fallback route tersedia
- ✅ Form peminjaman punya state persistence via `localStorage`
- ✅ Form submit feedback inline, tanpa `alert()`
- ✅ Accessibility navbar/form meningkat
- ✅ Dead files cleanup selesai
- ✅ Unused assets cleanup selesai
- ✅ Package redundancy cleanup selesai (`motion`, `react-router` dihapus)
- ✅ Pages route sudah lazy-loaded via `Suspense`
- ✅ Service layer frontend tersedia di `src/utils/submissionService.js`

## TODO Next
- [ ] Tambah HTTP client wrapper (`fetch`) untuk API real nanti
- [ ] Tambah `VITE_API_BASE_URL` config saat backend siap
- [ ] Ekstrak custom hooks untuk form besar bila kompleksitas naik
- [ ] Tambah global error boundary untuk fallback runtime
- [ ] Pertimbangkan image optimization/compression untuk asset besar

## Catatan
- Repo ini untuk demo/prototype, belum production-ready.
- Semua submit form masih simulasi async frontend.
- Service layer sekarang disiapkan agar migrasi ke backend nanti minim perubahan UI.
