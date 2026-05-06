import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import Home from './pages/Home'
import Profil from './pages/Profil'
import ProfilDosen from './pages/ProfilDosen'
import ProjectPenelitian from './pages/ProjectPenelitian'
import ProjectPengabdian from './pages/ProjectPengabdian'
import Layanan from './pages/Layanan'
import Kontak from './pages/Kontak'
import ProjectDetail from './pages/ProjectDetail'
import PeminjamanAlat from './pages/PeminjamanAlat'
import DetailPeminjamanAlat from './pages/DetailPeminjamanAlat'
import AjukanPeminjamanAlat from './pages/AjukanPeminjamanAlat'
import PeminjamanRuangan from './pages/PeminjamanRuangan'
import AdminDashboard from './pages/admin/AdminDashboard'
import TambahAlat from './pages/admin/TambahAlat'
import KelolaAlat from './pages/admin/KelolaAlat'
import EditAlat from './pages/admin/EditAlat'
import AdminLogin from './pages/admin/AdminLogin'
import ProtectedAdminRoute from './pages/admin/ProtectedAdminRoute'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/profil/dosen" element={<ProfilDosen />} />
          <Route path="/project/penelitian" element={<ProjectPenelitian />} />
          <Route path="/project/pengabdian" element={<ProjectPengabdian />} />
          <Route path="/project/:jenis/:id" element={<ProjectDetail />} />
          <Route path="/layanan" element={<Layanan />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/alat" element={<KelolaAlat />} />
          <Route path="/admin/alat/tambah" element={<TambahAlat />} />
          <Route path="/admin/alat/edit/:id" element={<EditAlat />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/alat"
            element={
              <ProtectedAdminRoute>
                <KelolaAlat />
              </ProtectedAdminRoute>
            }
          />

          <Route
            path="/admin/alat/tambah"
            element={
              <ProtectedAdminRoute>
                <TambahAlat />
              </ProtectedAdminRoute>
            }
          />

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
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App