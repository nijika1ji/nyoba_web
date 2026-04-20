import { Routes, Route } from 'react-router'
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
import PeminjamanRuangan from './pages/PeminjamanRuangan'
import DetailAlat from './pages/DetailAlat'

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
          <Route path="/layanan/peminjaman-alat" element={<PeminjamanAlat />} />
          <Route path="/layanan/peminjaman-alat/:id" element={<DetailAlat />} />
          <Route path="/layanan/peminjaman-ruangan" element={<PeminjamanRuangan />} />
          
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App