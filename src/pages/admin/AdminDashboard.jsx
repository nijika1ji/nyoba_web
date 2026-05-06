import { Link, useNavigate } from 'react-router-dom'

function AdminDashboard() {
    const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    navigate('/admin/login')
  }
  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
          Admin
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-bold text-slate-950">
            Dashboard Admin
        </h1>

        <button
            onClick={handleLogout}
            className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
        >
            Logout
        </button>
        </div>

        <p className="mt-4 max-w-3xl text-slate-600 leading-8">
            {/* Halaman pusat untuk mengelola data website. Untuk tahap ini fitur
            yang tersedia adalah kelola data alat. */}
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <AdminCard
            title="Kelola Alat"
            description="Tambah, edit, hapus, dan lihat data alat laboratorium."
            to="/admin/alat"
            action="Buka Kelola Alat"
          />

          <AdminCard
            title="Peminjaman Alat"
            description="Lihat pengajuan peminjaman alat dan ubah statusnya."
            to="/admin/peminjaman-alat"
            action="Kelola Peminjaman"
        />

          <AdminCard
            title="Tambah Alat"
            description="Input data alat baru beserta stok, spesifikasi, dan gambar."
            to="/admin/alat/tambah"
            action="Tambah Alat"
          />

          <AdminCard
            title="Katalog Alat"
            description="Lihat tampilan katalog alat yang dibuka pengguna."
            to="/layanan/peminjaman-alat"
            action="Lihat Katalog"
          />

          <AdminCard
            title="Kelola Ruangan"
            description="Tambah, edit, hapus, dan lihat data ruangan laboratorium."
            to="/admin/ruangan"
            action="Kelola Ruangan"
            />
          <AdminCard
            title="Peminjaman Ruangan"
            description="Lihat pengajuan peminjaman ruangan dan ubah statusnya."
            to="/admin/peminjaman-ruangan"
            action="Kelola Peminjaman"
            />
         <AdminCard
            title="Kelola Project"
            description="Tambah, edit, hapus, dan lihat data project penelitian maupun pengabdian."
            to="/admin/project"
            action="Kelola Project"
            />
            
        </div>
      </div>
    </div>
  )
}

function AdminCard({ title, description, to, action }) {
  return (
    
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>

      <p className="mt-3 min-h-[72px] text-sm leading-7 text-slate-600">
        {description}
      </p>

      <Link
        to={to}
        className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
      >
        {action}
      </Link>
    </div>
  )
}

export default AdminDashboard