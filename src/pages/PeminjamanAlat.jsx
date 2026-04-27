import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import alatLab from '../data/alatLab'
import {
  getStatusLabel,
  getStatusTextClass,
  slugify,
} from '../utils/alatHelpers'

function PeminjamanAlat() {
  const [search, setSearch] = useState('')

  const normalizedSearch = search.trim().toLowerCase()

  const filteredAlat = useMemo(() => {
    return alatLab.filter((item) =>
      item.nama.toLowerCase().includes(normalizedSearch)
    )
  }, [normalizedSearch])

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
            <label
              htmlFor="search-alat"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Cari nama alat
            </label>

            <input
              id="search-alat"
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama alat..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        {filteredAlat.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 shadow-sm" role="status" aria-live="polite">
            <p className="text-base font-semibold text-slate-700">Alat tidak ditemukan.</p>
            {normalizedSearch ? (
              <div className="mt-3 space-y-3">
                <p>
                  Tidak ada hasil untuk kata kunci <span className="font-semibold">"{search.trim()}"</span>.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="inline-flex rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    Hapus pencarian
                  </button>
                  <Link
                    to="/layanan"
                    className="inline-flex rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                  >
                    Kembali ke layanan
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <Link
                  to="/layanan"
                  className="inline-flex rounded-lg border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  Lihat layanan lain
                </Link>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {filteredAlat.map((item) => {
              const status = getStatusLabel(item)
              const slug = slugify(item.nama)

              return (
                <Link
                  key={item.id}
                  to={`/layanan/peminjaman-alat/${slug}`}
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