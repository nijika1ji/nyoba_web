import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router'

function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [openProject, setOpenProject] = useState(false)
  const [openProfil, setOpenProfil] = useState(false)
  const [openLayanan, setOpenLayanan] = useState(false)

  const menuBase =
    'relative px-4 py-3 rounded-xl text-white text-sm font-semibold uppercase tracking-wide transition duration-300'

  const menuEffect =
    "before:content-[''] before:absolute before:inset-0 before:rounded-xl before:bg-white/10 before:opacity-0 before:scale-95 before:transition-all before:duration-300 hover:before:opacity-100 hover:before:scale-100 hover:-translate-y-[1px]"

  const activeStyle = 'before:opacity-100 before:scale-100 bg-white/5'

  const isProjectActive = location.pathname.startsWith('/project')
  const isProfilActive = location.pathname.startsWith('/profil')
  const isLayananActive = location.pathname.startsWith('/layanan')

  const closeMobileMenu = () => {
    setIsOpen(false)
    setOpenProject(false)
    setOpenProfil(false)
    setOpenLayanan(false)
  }

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-[linear-gradient(90deg,#334155,#1e293b,#0f172a)] backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="h-24 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-14 h-14 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden shrink-0">
                <img
                  src="/logo-lab.jpg"
                  alt="Logo ELINS"
                  className="w-10 h-10 object-contain"
                />
              </div>

              <div className="leading-tight text-white min-w-0">
                <p className="text-2xl md:text-3xl font-extrabold tracking-wide truncate">
                  ELINS
                </p>
                <p className="text-sm text-white/80 truncate">
                  research laboratory
                </p>
              </div>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex items-center gap-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${menuBase} ${menuEffect} ${isActive ? activeStyle : ''}`
                }
              >
                <span className="relative z-10">Home</span>
              </NavLink>

              <div className="relative group">
                <button
                  className={`${menuBase} ${menuEffect} ${
                    isProjectActive ? activeStyle : ''
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Project
                    <span className="text-xs">▼</span>
                  </span>
                </button>

                <div className="absolute left-0 top-full pt-3 hidden group-hover:block">
                  <div className="w-64 rounded-2xl bg-zinc-900/95 shadow-2xl border border-white/10 overflow-hidden">
                    <Link
                      to="/project/penelitian"
                      className="block px-6 py-4 text-white text-base font-semibold hover:bg-white/10 transition"
                    >
                      Penelitian
                    </Link>
                    <Link
                      to="/project/pengabdian"
                      className="block px-6 py-4 text-white text-base font-semibold hover:bg-white/10 transition"
                    >
                      Pengabdian
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <button
                  className={`${menuBase} ${menuEffect} ${
                    isProfilActive ? activeStyle : ''
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Profil
                    <span className="text-xs">▼</span>
                  </span>
                </button>

                <div className="absolute left-0 top-full pt-3 hidden group-hover:block">
                  <div className="w-72 rounded-2xl bg-zinc-900/95 shadow-2xl border border-white/10 overflow-hidden">
                    <Link
                      to="/profil"
                      className="block px-6 py-4 text-white text-base font-semibold hover:bg-white/10 transition"
                    >
                      Tentang Laboratorium
                    </Link>
                    <Link
                      to="/profil/dosen"
                      className="block px-6 py-4 text-white text-base font-semibold hover:bg-white/10 transition"
                    >
                      Profil Dosen
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <button
                  className={`${menuBase} ${menuEffect} ${
                    isLayananActive ? activeStyle : ''
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Layanan
                    <span className="text-xs">▼</span>
                  </span>
                </button>

                <div className="absolute left-0 top-full pt-3 hidden group-hover:block">
                  <div className="w-72 rounded-2xl bg-zinc-900/95 shadow-2xl border border-white/10 overflow-hidden">
                    <Link
                      to="/layanan/peminjaman-alat"
                      className="block px-6 py-4 text-white text-base font-semibold hover:bg-white/10 transition"
                    >
                      Peminjaman Alat
                    </Link>
                    <Link
                      to="/layanan/peminjaman-ruangan"
                      className="block px-6 py-4 text-white text-base font-semibold hover:bg-white/10 transition"
                    >
                      Peminjaman Ruangan
                    </Link>
                  </div>
                </div>
              </div>

              <NavLink
                to="/kontak"
                className={({ isActive }) =>
                  `${menuBase} ${menuEffect} ${isActive ? activeStyle : ''}`
                }
              >
                <span className="relative z-10">Kontak</span>
              </NavLink>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl bg-white/10 text-white border border-white/10"
              aria-label="Toggle menu"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden border-t border-white/10 bg-slate-950/95 backdrop-blur-md">
            <div className="px-4 py-4 space-y-2">
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-white font-semibold ${
                    isActive ? 'bg-white/10' : 'hover:bg-white/5'
                  }`
                }
              >
                Home
              </NavLink>

              <div className="rounded-xl overflow-hidden border border-white/10">
                <button
                  onClick={() => setOpenProject(!openProject)}
                  className={`w-full px-4 py-3 text-left text-white font-semibold flex items-center justify-between ${
                    isProjectActive ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <span>Project</span>
                  <span>{openProject ? '▲' : '▼'}</span>
                </button>

                {openProject && (
                  <div className="bg-white/5">
                    <Link
                      to="/project/penelitian"
                      onClick={closeMobileMenu}
                      className="block px-6 py-3 text-white/90 hover:bg-white/10"
                    >
                      Penelitian
                    </Link>
                    <Link
                      to="/project/pengabdian"
                      onClick={closeMobileMenu}
                      className="block px-6 py-3 text-white/90 hover:bg-white/10"
                    >
                      Pengabdian
                    </Link>
                  </div>
                )}
              </div>

              <div className="rounded-xl overflow-hidden border border-white/10">
                <button
                  onClick={() => setOpenProfil(!openProfil)}
                  className={`w-full px-4 py-3 text-left text-white font-semibold flex items-center justify-between ${
                    isProfilActive ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <span>Profil</span>
                  <span>{openProfil ? '▲' : '▼'}</span>
                </button>

                {openProfil && (
                  <div className="bg-white/5">
                    <Link
                      to="/profil"
                      onClick={closeMobileMenu}
                      className="block px-6 py-3 text-white/90 hover:bg-white/10"
                    >
                      Tentang Laboratorium
                    </Link>
                    <Link
                      to="/profil/dosen"
                      onClick={closeMobileMenu}
                      className="block px-6 py-3 text-white/90 hover:bg-white/10"
                    >
                      Profil Dosen
                    </Link>
                  </div>
                )}
              </div>

              <div className="rounded-xl overflow-hidden border border-white/10">
                <button
                  onClick={() => setOpenLayanan(!openLayanan)}
                  className={`w-full px-4 py-3 text-left text-white font-semibold flex items-center justify-between ${
                    isLayananActive ? 'bg-white/10' : 'hover:bg-white/5'
                  }`}
                >
                  <span>Layanan</span>
                  <span>{openLayanan ? '▲' : '▼'}</span>
                </button>

                {openLayanan && (
                  <div className="bg-white/5">
                    <Link
                      to="/layanan/peminjaman-alat"
                      onClick={closeMobileMenu}
                      className="block px-6 py-3 text-white/90 hover:bg-white/10"
                    >
                      Peminjaman Alat
                    </Link>
                    <Link
                      to="/layanan/peminjaman-ruangan"
                      onClick={closeMobileMenu}
                      className="block px-6 py-3 text-white/90 hover:bg-white/10"
                    >
                      Peminjaman Ruangan
                    </Link>
                  </div>
                )}
              </div>

              <NavLink
                to="/kontak"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-white font-semibold ${
                    isActive ? 'bg-white/10' : 'hover:bg-white/5'
                  }`
                }
              >
                Kontak
              </NavLink>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Navbar