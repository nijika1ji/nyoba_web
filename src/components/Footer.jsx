import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="mb-3 text-2xl font-bold">ELINS</h2>
            <p className="leading-7 text-white/75">
              Laboratorium Riset Elektronika dan Instrumentasi merupakan
              laboratorium penelitian yang mendukung kegiatan pendidikan,
              penelitian, dan pengabdian kepada masyarakat.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">Navigasi</h3>
            <ul className="space-y-2 text-white/75">
              <li>
                <Link to="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/profil" className="transition hover:text-white">
                  Tentang Laboratorium
                </Link>
              </li>
              <li>
                <Link to="/profil/dosen" className="transition hover:text-white">
                  Profil Dosen
                </Link>
              </li>
              <li>
                <Link to="/project/penelitian" className="transition hover:text-white">
                  Project Penelitian
                </Link>
              </li>
              <li>
                <Link to="/project/pengabdian" className="transition hover:text-white">
                  Project Pengabdian
                </Link>
              </li>
              <li>
                <Link to="/layanan" className="transition hover:text-white">
                  Layanan
                </Link>
              </li>
              <li>
                <Link to="/layanan/peminjaman-alat" className="transition hover:text-white">
                  Peminjaman Alat
                </Link>
              </li>
              <li>
                <Link to="/layanan/peminjaman-ruangan" className="transition hover:text-white">
                  Peminjaman Ruangan
                </Link>
              </li>
              <li>
                <Link to="/kontak" className="transition hover:text-white">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-semibold">Kontak Singkat</h3>
            <div className="space-y-2 leading-7 text-white/75">
              <p>Departemen Ilmu Komputer dan Elektronika</p>
              <p>FMIPA Universitas Gadjah Mada</p>
              <p>lab-elins@ugm.ac.id</p>
              <p>(0274) xxxxxxx</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/60">
          © 2026 Laboratorium Riset Elektronika dan Instrumentasi. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
