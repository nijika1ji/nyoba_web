import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import { apiRequest } from '../services/api'
import { getStatusLabel, getStatusTextClass } from '../utils/alatHelpers'

function PeminjamanAlat() {
  const [search, setSearch] = useState('')
  const [alatList, setAlatList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchAlat() {
      try {
        setLoading(true)
        setError('')

        const data = await apiRequest('/alat')
        setAlatList(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAlat()
  }, [])

  const filteredAlat = useMemo(() => {
    return alatList.filter((item) =>
      item.nama.toLowerCase().includes(search.toLowerCase())
    )
  }, [search, alatList])

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef5ff_45%,#ffffff_100%)]">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
            Katalog Alat
          </p>

          <h1 className="mb-4 text-4xl font-bold text-slate-950 md:text-5xl">
            Peminjaman Alat Laboratorium
          </h1>

          <p className="mx-auto max-w-3xl text-slate-700 leading-8">
            Pilih alat dari katalog untuk melihat detail, spesifikasi, dan
            mengajukan peminjaman.
          </p>

          <div className="mx-auto mt-8 max-w-3xl text-left">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Cari nama alat
            </label>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama alat..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        {loading && (
          <div className="rounded-3xl bg-white p-10 text-center text-slate-500 shadow-sm">
            Memuat data alat...
          </div>
        )}

        {!loading && error && (
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-10 text-center text-rose-700">
            {error}
          </div>
        )}

        {!loading && !error && filteredAlat.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 shadow-sm">
            Alat tidak ditemukan.
          </div>
        )}

        {!loading && !error && filteredAlat.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {filteredAlat.map((item) => {
              const status = getStatusLabel(item)

              return (
                <Link
                  key={item.id}
                  to={`/layanan/peminjaman-alat/${item.slug}`}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative flex aspect-[4/3] items-center justify-center bg-slate-50 p-5">
                    <img
                      src={item.gambar}
                      alt={item.nama}
                      loading="lazy"
                      className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                    />

                  </div>

                  <div className="border-t border-slate-100 px-4 py-5 text-center">
                    <h2 className="line-clamp-2 min-h-[48px] text-base font-bold leading-6 text-slate-900">
                      {item.nama}
                    </h2>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span
                        className={`text-sm font-semibold ${getStatusTextClass(
                          status
                        )}`}
                      >
                        {status}
                      </span>

                      <span className="text-sm text-slate-500">
                        Stok:{' '}
                        <span className="font-bold text-slate-900">
                          {item.tersedia}
                        </span>
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default PeminjamanAlat