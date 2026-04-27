import { Link, useParams } from 'react-router-dom'
import alatLab from '../data/alatLab'

function DetailAlat() {
  const { id } = useParams()
  const alat = alatLab.find((item) => item.id === Number(id))
  const fallbackImage = '/alat/default-alat.jpg'

  if (!alat) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Alat tidak ditemukan</h1>
          <Link
            to="/layanan/peminjaman-alat"
            className="inline-block bg-slate-200 hover:bg-slate-300 transition px-5 py-3 rounded-xl font-semibold"
          >
            Kembali
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef5ff_55%,#ffffff_100%)]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <Link
          to="/layanan/peminjaman-alat"
          className="inline-block mb-8 bg-slate-200 hover:bg-slate-300 transition px-5 py-3 rounded-xl font-semibold text-slate-800"
        >
          Kembali
        </Link>

        <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
              <img
                src={alat.gambar}
                alt={alat.nama}
                className="w-full h-[320px] object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = fallbackImage
                }}
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm uppercase tracking-[0.25em] text-blue-700 font-semibold mb-3">
              Detail Alat
            </p>

            <h1 className="text-4xl font-bold mb-6">{alat.nama}</h1>

            <div className="grid gap-5 md:grid-cols-2 mb-8">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500 mb-2">Kategori</p>
                <p className="font-semibold text-slate-900">{alat.kategori}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500 mb-2">Kode Alat</p>
                <p className="font-semibold text-slate-900">{alat.kode}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500 mb-2">Lokasi</p>
                <p className="font-semibold text-slate-900">{alat.lokasi}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500 mb-2">Total Unit</p>
                <p className="font-semibold text-slate-900">{alat.totalUnit}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500 mb-2">Tersedia</p>
                <p className="font-semibold text-emerald-600">{alat.tersedia}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500 mb-2">Sedang Dipinjam</p>
                <p className="font-semibold text-amber-600">{alat.dipinjam}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500 mb-2">Maintenance</p>
                <p className="font-semibold text-rose-600">{alat.maintenance}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500 mb-2">Dipinjam Oleh</p>
                <p className="font-semibold text-slate-900">{alat.peminjam}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500 mb-2">Tanggal Pinjam</p>
                <p className="font-semibold text-slate-900">{alat.tanggalPinjam}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500 mb-2">Tanggal Kembali</p>
                <p className="font-semibold text-slate-900">{alat.tanggalKembali}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h2 className="text-2xl font-bold mb-5">Spesifikasi Alat</h2>

              <ul className="list-disc pl-6 space-y-3 text-slate-700 leading-8">
                {alat.spesifikasi.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailAlat