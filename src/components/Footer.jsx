import { Link } from 'react-router'

function Footer() {
  return (
    <footer className="bg-slate-900 text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="text-2xl font-bold mb-3">ELINS</h2>
            <p className="text-white/75 leading-7">
              Laboratorium Riset Elektronika dan Instrumentasi merupakan
              laboratorium penelitian yang mendukung kegiatan pendidikan,
              penelitian, dan pengabdian kepada masyarakat.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Navigasi</h3>
            <ul className="space-y-2 text-white/75">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/project/penelitian" className="hover:text-white transition">Project</Link></li>
              <li><Link to="/profil" className="hover:text-white transition">Profil</Link></li>
              <li><Link to="/layanan" className="hover:text-white transition">Layanan</Link></li>
              <li><Link to="/kontak" className="hover:text-white transition">Kontak</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Kontak Singkat</h3>
            <div className="space-y-2 text-white/75 leading-7">
              <p>Departemen Ilmu Komputer dan Elektronika</p>
              <p>FMIPA Universitas Gadjah Mada</p>
              <p>lab-elins@ugm.ac.id</p>
              <p>(0274) xxxxxxx</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 text-sm text-white/60">
          © 2026 Laboratorium Riset Elektronika dan Instrumentasi. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer