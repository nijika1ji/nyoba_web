import { useEffect, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'

const desktopMenus = {
  project: [
    { to: '/project/penelitian', label: 'Penelitian' },
    { to: '/project/pengabdian', label: 'Pengabdian' },
  ],
  profil: [
    { to: '/profil', label: 'Tentang Laboratorium' },
    { to: '/profil/dosen', label: 'Profil Dosen' },
  ],
  layanan: [
    { to: '/layanan', label: 'Informasi Layanan' },
    { to: '/layanan/peminjaman-alat', label: 'Peminjaman Alat' },
    { to: '/layanan/peminjaman-ruangan', label: 'Peminjaman Ruangan' },
  ],
}

function Navbar() {
  const location = useLocation()

  const [isOpen, setIsOpen] = useState(false)
  const [openProject, setOpenProject] = useState(false)
  const [openProfil, setOpenProfil] = useState(false)
  const [openLayanan, setOpenLayanan] = useState(false)
  const [openDesktopMenu, setOpenDesktopMenu] = useState(null)

  const menuBase =
    'relative rounded-xl px-4 py-2.5 text-sm font-bold uppercase tracking-wide transition duration-300'

  const menuEffect =
    'text-white/80 hover:bg-slate-400/20 hover:text-white hover:shadow-sm'

  const activeStyle = 'bg-slate-400/25 text-white shadow-sm backdrop-blur-sm'

  const isProjectActive = location.pathname.startsWith('/project')
  const isProfilActive = location.pathname.startsWith('/profil')
  const isLayananActive = location.pathname.startsWith('/layanan')

  const closeMobileMenu = () => {
    setIsOpen(false)
    setOpenProject(false)
    setOpenProfil(false)
    setOpenLayanan(false)
  }

  const closeAllDesktopSubmenu = () => {
    setOpenDesktopMenu(null)
  }

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeMobileMenu()
        closeAllDesktopSubmenu()
      }
    }

    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const toggleDesktopMenu = (menuName) => {
    setOpenDesktopMenu((prev) => (prev === menuName ? null : menuName))
  }

  const handleDesktopMenuKeyDown = (event, menuName) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      toggleDesktopMenu(menuName)
    }

    if (event.key === 'Escape') {
      closeAllDesktopSubmenu()
    }
  }

  return (
    <header className="sticky top-0 z-50">
      <nav className="border-b border-white/10 bg-[linear-gradient(90deg,#24384d,#16283c,#071426)] shadow-lg backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex h-24 items-center justify-between">
            <Link to="/" className="flex shrink-0 items-center">
              <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center">
                <img
                  src="/logo-lab.png"
                  alt="Logo ELINS"
                  className="h-[80px] w-auto -translate-y-[5px] translate-x-[8px] object-contain"
                />
              </div>

              <div className="ml-[10px] flex translate-x-[0px] translate-y-[0px] flex-col justify-center leading-[0.92]">
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

            <div className="hidden items-center gap-2 md:flex">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${menuBase} ${menuEffect} ${isActive ? activeStyle : ''}`
                }
              >
                <span className="relative z-10">Home</span>
              </NavLink>

              <DesktopDropdown
                title="Project"
                menuName="project"
                items={desktopMenus.project}
                isActive={isProjectActive}
                isOpen={openDesktopMenu === 'project'}
                onToggle={toggleDesktopMenu}
                onKeyDown={handleDesktopMenuKeyDown}
                onClose={closeAllDesktopSubmenu}
                menuBase={menuBase}
                menuEffect={menuEffect}
                activeStyle={activeStyle}
              />

              <DesktopDropdown
                title="Profil"
                menuName="profil"
                items={desktopMenus.profil}
                isActive={isProfilActive}
                isOpen={openDesktopMenu === 'profil'}
                onToggle={toggleDesktopMenu}
                onKeyDown={handleDesktopMenuKeyDown}
                onClose={closeAllDesktopSubmenu}
                menuBase={menuBase}
                menuEffect={menuEffect}
                activeStyle={activeStyle}
              />

              <DesktopDropdown
                title="Layanan"
                menuName="layanan"
                items={desktopMenus.layanan}
                isActive={isLayananActive}
                isOpen={openDesktopMenu === 'layanan'}
                onToggle={toggleDesktopMenu}
                onKeyDown={handleDesktopMenuKeyDown}
                onClose={closeAllDesktopSubmenu}
                menuBase={menuBase}
                menuEffect={menuEffect}
                activeStyle={activeStyle}
              />

              <NavLink
                to="/kontak"
                className={({ isActive }) =>
                  `${menuBase} ${menuEffect} ${isActive ? activeStyle : ''}`
                }
              >
                <span className="relative z-10">Kontak</span>
              </NavLink>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {isOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-white/10 bg-slate-950/95 backdrop-blur-md md:hidden"
          >
            <div className="space-y-2 px-4 py-4">
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 font-semibold text-white ${
                    isActive ? 'bg-white/10' : 'hover:bg-white/5'
                  }`
                }
              >
                Home
              </NavLink>

              <MobileAccordion
                title="Project"
                isActive={isProjectActive}
                open={openProject}
                onToggle={() => setOpenProject((prev) => !prev)}
                items={desktopMenus.project}
                onSelect={closeMobileMenu}
              />

              <MobileAccordion
                title="Profil"
                isActive={isProfilActive}
                open={openProfil}
                onToggle={() => setOpenProfil((prev) => !prev)}
                items={desktopMenus.profil}
                onSelect={closeMobileMenu}
              />

              <MobileAccordion
                title="Layanan"
                isActive={isLayananActive}
                open={openLayanan}
                onToggle={() => setOpenLayanan((prev) => !prev)}
                items={desktopMenus.layanan}
                onSelect={closeMobileMenu}
              />

              <NavLink
                to="/kontak"
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 font-semibold text-white ${
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

function DesktopDropdown({
  title,
  menuName,
  items,
  isActive,
  isOpen,
  onToggle,
  onKeyDown,
  onClose,
  menuBase,
  menuEffect,
  activeStyle,
}) {
  return (
    <div className="relative">
      <button
        type="button"
        className={`${menuBase} ${menuEffect} ${
          isActive ? activeStyle : ''
        } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={`desktop-submenu-${menuName}`}
        aria-label={`Buka submenu ${title.toLowerCase()}`}
        onClick={() => onToggle(menuName)}
        onKeyDown={(event) => onKeyDown(event, menuName)}
      >
        <span className="relative z-10 flex items-center gap-2">
          {title}
          <span className="text-xs">{isOpen ? '▲' : '▼'}</span>
        </span>
      </button>

      {isOpen && (
        <div
          id={`desktop-submenu-${menuName}`}
          className="absolute left-0 top-full z-30 pt-3"
          role="menu"
        >
          <div className="w-72 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 shadow-2xl">
            {items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className="block px-6 py-4 text-base font-semibold text-white transition hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none"
                role="menuitem"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function MobileAccordion({ title, isActive, open, onToggle, items, onSelect }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10">
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between px-4 py-3 text-left font-semibold text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 ${
          isActive ? 'bg-white/10' : 'hover:bg-white/5'
        }`}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span>{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="bg-white/5">
          {items.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={onSelect}
              className="block px-6 py-3 text-white/90 hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Navbar
