import { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router'

function Navbar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [openProject, setOpenProject] = useState(false)
  const [openProfil, setOpenProfil] = useState(false)
  const [openLayanan, setOpenLayanan] = useState(false)

  const menuBase =
    'relative px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide transition duration-300'

  const menuEffect =
    'text-white/80 hover:text-white hover:bg-slate-400/20 hover:shadow-sm'

  const activeStyle =
    'bg-slate-400/25 text-white shadow-sm backdrop-blur-sm'

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
      <nav className="bg-[linear-gradient(90deg,#24384d,#16283c,#071426)] backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="h-24 flex items-center justify-between">
            <Link to="/" className="flex items-center shrink-0">
              <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center">
                <img
                  src="/logo-lab.png"
                  alt="Logo ELINS"
                  className="h-[80px] w-auto object-contain translate-x-[8px] translate-y-[-5px]"
                />
              </div>

              <div className="ml-[10px] flex flex-col justify-center leading-[0.92] translate-x-[0px] translate-y-[0px]">
                <p className="text-[18px] font-extrabold text-white md:text-[20px]">
                  Laboratorium
                </p>
                <p className="text-[18px] font-extrabold text-white md:text-[20px]">
                  Elektronika
                </p>
                <p className="text-[18px] font-extrabold text-white md:text-[20px]">
                  dan Instrumentasi
                </p>
              </div>
            </Link>

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
                      to="/layanan"
                      className="block px-6 py-4 text-white text-base font-semibold hover:bg-white/10 transition"
                    >
                      Informasi Layanan
                    </Link>

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