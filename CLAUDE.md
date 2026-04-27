# CLAUDE.md - Web Lab ELINS

## Ringkasan Project
Frontend website Laboratorium Riset Elektronika dan Instrumentasi (Lab ELINS) FMIPA UGM.
Stack: React 19 + Vite 8 + React Router 7 + Tailwind CSS 4 + Framer Motion.

## Command Penting
```bash
npm install          # Install dependencies
npm run dev          # Dev server (localhost:5173)
npm run build        # Production build
npm run lint         # ESLint check
npm run preview      # Preview production build
```

## Struktur Utama
```
src/
├── components/      # Navbar, Footer, ProjectCard, ProjectPageTemplate
├── pages/           # Home, Profil, Project*, Layanan, Kontak, Peminjaman*
├── data/            # projects.js, alatLab.js (data statis)
├── utils/           # alatHelpers.js
├── App.jsx          # Router utama
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
- `/kontak` - Kontak (redirect WhatsApp/Gmail)

## Aturan Kerja
1. **Branch**: Semua kerja di branch `grey`, push ke `origin/grey`. JANGAN kerja di `main`.
2. **Import Router**: Gunakan `'react-router-dom'` konsisten untuk semua import routing (Routes, Route, Link, NavLink, useParams, useLocation, BrowserRouter).
3. **Lint**: Jalankan `npm run lint` sebelum commit. Fix semua error.
4. **Build**: Pastikan `npm run build` sukses sebelum push.
5. **Commit**: Commit bertahap setiap beberapa pekerjaan selesai, jangan tunggu semua selesai.
6. **Form**: Form peminjaman masih dummy (alert), belum ada backend.
7. **Data**: Data project/alat di `src/data/`, belum ada API.

## Known Issues (Fixed)
- ✅ Import router inconsistency (react-router vs react-router-dom) - FIXED
- ✅ Unused motion import di 4 file - FIXED
- ✅ Missing 404 fallback route - FIXED
- ✅ HTML lang="en" padahal konten Indonesia - FIXED
- ✅ React Hooks dependency warnings di PeminjamanRuangan.jsx - FIXED

## TODO Next
- [ ] Form state persistence dengan localStorage
- [ ] Improve form submission feedback (ganti alert)
- [ ] Navbar keyboard accessibility (aria-expanded, focus-visible)
- [ ] Form label accessibility (htmlFor, aria-invalid, aria-describedby)
- [ ] Empty state improvement di PeminjamanAlat
- [ ] Dead files cleanup (Project.jsx, DetailAlat.jsx, Fasilitaslab.jsx, ProfilVisiMisi.jsx)
- [ ] Unused assets cleanup
- [ ] Package motion redundancy check

## Catatan
- Repo ini untuk demo/prototype, belum production-ready.
- Backend belum ada, semua data statis.
- Form submission hanya alert, belum ada validasi server-side.
