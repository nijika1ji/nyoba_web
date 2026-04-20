import { useMemo, useState } from 'react'
import { Link } from 'react-router'
import alatLab from '../data/alatLab'

function PeminjamanAlat() {
  const [search, setSearch] = useState('')
  const [kategori, setKategori] = useState('Semua')
  const [selectedImage, setSelectedImage] = useState(null)

  const kategoriList = ['Semua', ...new Set(alatLab.map((item) => item.kategori))]

  const filteredAlat = useMemo(() => {
    return alatLab.filter((item) => {
      const cocokNama = item.nama.toLowerCase().includes(search.toLowerCase())
      const cocokKategori = kategori === 'Semua' || item.kategori === kategori
      return cocokNama && cocokKategori
    })
  }, [search, kategori])

  const statistik = useMemo(() => {
    return alatLab.reduce(
      (acc, item) => {
        acc.totalJenisAlat += 1
        acc.totalUnitAlat += item.totalUnit
        acc.tersedia += item.tersedia
        acc.dipinjam += item.dipinjam
        acc.maintenance += item.maintenance
        return acc
      },
      {
        totalJenisAlat: 0,
        totalUnitAlat: 0,
        tersedia: 0,
        dipinjam: 0,
        maintenance: 0,
      }
    )
  }, [])

  const statistikBulanan = [
    { bulan: 'Jan', jumlah: 8 },
    { bulan: 'Feb', jumlah: 12 },
    { bulan: 'Mar', jumlah: 10 },
    { bulan: 'Apr', jumlah: 15 },
    { bulan: 'Mei', jumlah: 9 },
  ]

  const maxJumlah = Math.max(...statistikBulanan.map((item) => item.jumlah))
  const fallbackImage = '/alat/default-alat.jpg'

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef5ff_55%,#ffffff_100%)]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-700 font-semibold mb-3">
            Layanan
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Peminjaman Alat
          </h1>

          <p className="text-gray-700 leading-8">
            Halaman ini menampilkan utilitas alat laboratorium, kondisi
            ketersediaan, ringkasan peminjaman, serta informasi singkat
            mengenai penggunaan alat.
          </p>
        </div>

        {/* Statistik */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 mb-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500 mb-2">Total Jenis Alat</p>
            <h2 className="text-3xl font-bold">{statistik.totalJenisAlat}</h2>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500 mb-2">Total Unit Alat</p>
            <h2 className="text-3xl font-bold">{statistik.totalUnitAlat}</h2>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500 mb-2">Tersedia</p>
            <h2 className="text-3xl font-bold text-emerald-600">
              {statistik.tersedia}
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500 mb-2">Sedang Dipinjam</p>
            <h2 className="text-3xl font-bold text-amber-600">
              {statistik.dipinjam}
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500 mb-2">Maintenance</p>
            <h2 className="text-3xl font-bold text-rose-600">
              {statistik.maintenance}
            </h2>
          </div>
        </div>

        {/* Filter */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm mb-10">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Cari nama alat..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
            />

            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
            >
              {kategoriList.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tabel utilitas alat */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden mb-12">
          <div className="px-6 py-5 border-b border-slate-200">
            <h2 className="text-2xl font-bold">Utilitas Alat</h2>
            <p className="text-slate-600 mt-2">
              Daftar alat laboratorium beserta gambar, jumlah unit, status
              ketersediaan, dan informasi peminjaman.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1300px] text-left">
              <thead className="bg-slate-50">
                <tr className="text-slate-700">
                  <th className="px-6 py-4 font-semibold">Gambar</th>
                  <th className="px-6 py-4 font-semibold">Nama Alat</th>
                  <th className="px-6 py-4 font-semibold">Kategori</th>
                  <th className="px-6 py-4 font-semibold">Kode</th>
                  <th className="px-6 py-4 font-semibold">Lokasi</th>
                  <th className="px-6 py-4 font-semibold">Total Unit</th>
                  <th className="px-6 py-4 font-semibold">Tersedia</th>
                  <th className="px-6 py-4 font-semibold">Dipinjam</th>
                  <th className="px-6 py-4 font-semibold">Maintenance</th>
                  <th className="px-6 py-4 font-semibold">Dipinjam Oleh</th>
                  <th className="px-6 py-4 font-semibold">Tanggal Pinjam</th>
                  <th className="px-6 py-4 font-semibold">Tanggal Kembali</th>
                </tr>
              </thead>

              <tbody>
                {filteredAlat.map((item, index) => (
                  <tr
                    key={item.id}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                  >
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedImage(item)}
                        className="w-20 h-16 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 block"
                      >
                        <img
                          src={item.gambar}
                          alt={item.nama}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.onerror = null
                            e.currentTarget.src = fallbackImage
                          }}
                        />
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <Link
                        to={`/layanan/peminjaman-alat/${item.id}`}
                        className="font-semibold text-slate-900 hover:text-blue-700 transition"
                      >
                        {item.nama}
                      </Link>
                    </td>

                    <td className="px-6 py-4 text-slate-700">{item.kategori}</td>
                    <td className="px-6 py-4 text-slate-700">{item.kode}</td>
                    <td className="px-6 py-4 text-slate-700">{item.lokasi}</td>
                    <td className="px-6 py-4 text-slate-700">{item.totalUnit}</td>
                    <td className="px-6 py-4 text-emerald-600 font-semibold">
                      {item.tersedia}
                    </td>
                    <td className="px-6 py-4 text-amber-600 font-semibold">
                      {item.dipinjam}
                    </td>
                    <td className="px-6 py-4 text-rose-600 font-semibold">
                      {item.maintenance}
                    </td>
                    <td className="px-6 py-4 text-slate-700">{item.peminjam}</td>
                    <td className="px-6 py-4 text-slate-700">{item.tanggalPinjam}</td>
                    <td className="px-6 py-4 text-slate-700">{item.tanggalKembali}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Grafik dummy */}
        <div className="grid gap-8 lg:grid-cols-2 mb-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Grafik Peminjaman Bulanan</h2>
            <p className="text-slate-600 mb-6">
              Ringkasan jumlah peminjaman alat per bulan.
            </p>

            <div className="space-y-4">
              {statistikBulanan.map((item) => (
                <div key={item.bulan}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-700">{item.bulan}</span>
                    <span className="text-slate-500">{item.jumlah}</span>
                  </div>
                  <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: `${(item.jumlah / maxJumlah) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Distribusi Status Alat</h2>
            <p className="text-slate-600 mb-6">
              Gambaran kondisi umum alat laboratorium.
            </p>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-700 font-medium">Tersedia</span>
                  <span className="text-slate-500">{statistik.tersedia}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-emerald-500"
                    style={{
                      width: `${(statistik.tersedia / statistik.totalUnitAlat) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-700 font-medium">Dipinjam</span>
                  <span className="text-slate-500">{statistik.dipinjam}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-500"
                    style={{
                      width: `${(statistik.dipinjam / statistik.totalUnitAlat) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-700 font-medium">Maintenance</span>
                  <span className="text-slate-500">{statistik.maintenance}</span>
                </div>
                <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-rose-500"
                    style={{
                      width: `${(statistik.maintenance / statistik.totalUnitAlat) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ingin mengajukan peminjaman alat?
          </h2>
          <p className="text-slate-700 leading-8 mb-6">
            Untuk pengajuan peminjaman alat, silakan hubungi pihak laboratorium
            melalui halaman kontak. Integrasi backend dan form pengajuan akan
            ditambahkan pada tahap berikutnya.
          </p>

          <Link
            to="/kontak"
            className="inline-block bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl font-semibold"
          >
            Hubungi Admin
          </Link>
        </div>
      </div>

      {/* Modal gambar */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/70 flex items-center justify-center px-4">
          <div className="relative w-full max-w-3xl rounded-3xl bg-white p-4 md:p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
            >
              ✕
            </button>

            <div className="mb-4 pr-12">
              <h2 className="text-2xl font-bold">{selectedImage.nama}</h2>
              <p className="text-slate-500 mt-1">{selectedImage.kategori}</p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
              <img
                src={selectedImage.gambar}
                alt={selectedImage.nama}
                className="w-full max-h-[70vh] object-contain bg-white"
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = fallbackImage
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PeminjamanAlat