import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Home = lazy(() => import('./pages/Home'))
const Profil = lazy(() => import('./pages/Profil'))
const ProfilDosen = lazy(() => import('./pages/ProfilDosen'))
const ProjectPenelitian = lazy(() => import('./pages/ProjectPenelitian'))
const ProjectPengabdian = lazy(() => import('./pages/ProjectPengabdian'))
const Layanan = lazy(() => import('./pages/Layanan'))
const Kontak = lazy(() => import('./pages/Kontak'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const PeminjamanAlat = lazy(() => import('./pages/PeminjamanAlat'))
const DetailPeminjamanAlat = lazy(() => import('./pages/DetailPeminjamanAlat'))
const AjukanPeminjamanAlat = lazy(() => import('./pages/AjukanPeminjamanAlat'))
const PeminjamanRuangan = lazy(() => import('./pages/PeminjamanRuangan'))
const NotFound = lazy(() => import('./pages/NotFound'))

function PageLoader() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-6xl items-center justify-center px-6 py-16 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
          Memuat Halaman
        </p>
        <p className="mt-3 text-slate-600">Mohon tunggu sebentar.</p>
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/profil/dosen" element={<ProfilDosen />} />
            <Route path="/project/penelitian" element={<ProjectPenelitian />} />
            <Route path="/project/pengabdian" element={<ProjectPengabdian />} />
            <Route path="/project/:jenis/:id" element={<ProjectDetail />} />
            <Route path="/layanan" element={<Layanan />} />
            <Route path="/kontak" element={<Kontak />} />
            <Route path="/layanan/peminjaman-alat" element={<PeminjamanAlat />} />
            <Route
              path="/layanan/peminjaman-alat/:slug"
              element={<DetailPeminjamanAlat />}
            />
            <Route
              path="/layanan/peminjaman-alat/:slug/ajukan"
              element={<AjukanPeminjamanAlat />}
            />
            <Route
              path="/layanan/peminjaman-ruangan"
              element={<PeminjamanRuangan />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}

export default App
