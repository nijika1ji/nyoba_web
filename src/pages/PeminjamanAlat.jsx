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

  const filteredAlat = useMemo(() => {
    return alatLab.filter((item) =>
      item.nama.toLowerCase().includes(search.toLowerCase())
    )
  }, [search])

  const statistik = useMemo(() => {
    return alatLab.reduce(
      (acc, item) => {
        acc.totalAlat += 1
        acc.totalUnit += item.totalUnit
        acc.tersedia += item.tersedia
        acc.dipinjam += item.dipinjam
        acc.maintenance += item.maintenance
        return acc
      },
      {
        totalAlat: 0,
        totalUnit: 0,
        tersedia: 0,
        dipinjam: 0,
        maintenance: 0,
      }
    )
  }, [])

  return (
    <section className="min-h-screen bg-[#efefef] px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1700px]">
        <div className="mb-5 rounded-md bg-white p-4 shadow-sm ring-1 ring-slate-200 md:p-5">
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Peminjaman Alat Laboratorium
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Klik alat untuk melihat detail, spesifikasi, dan ajukan peminjaman.
          </p>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Cari nama alat
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama alat..."
              className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
            />
          </div>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          <SummaryCard label="Total Alat" value={statistik.totalAlat} />
          <SummaryCard label="Total Unit" value={statistik.totalUnit} />
          <SummaryCard label="Tersedia" value={statistik.tersedia} tone="success" />
          <SummaryCard label="Dipinjam" value={statistik.dipinjam} tone="warning" />
          <SummaryCard
            label="Maintenance"
            value={statistik.maintenance}
            tone="danger"
          />
        </div>

        {filteredAlat.length === 0 ? (
          <div className="rounded-md border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            Alat tidak ditemukan.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">
            {filteredAlat.map((item) => {
              const status = getStatusLabel(item)
              const slug = slugify(item.nama)

              return (
                <Link
                  key={item.id}
                  to={`/layanan/peminjaman-alat/${slug}`}
                  className="overflow-hidden rounded-md border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-slate-300"
                >
                  <div className="border-b border-slate-100 px-4 pb-3 pt-4">
                    <h3 className="min-h-[3.5rem] text-base font-bold uppercase leading-5 text-slate-900">
                      {item.nama}
                    </h3>
                  </div>

                  <div className="flex aspect-[4/3] items-center justify-center bg-white p-3">
                    <img
                      src={item.gambar}
                      alt={item.nama}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="border-t border-slate-100 bg-[#fafafa] px-4 py-3">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`text-sm font-medium ${getStatusTextClass(
                          status
                        )}`}
                      >
                        {status}
                      </span>

                      <span className="text-sm text-slate-500">
                        Stok:{' '}
                        <span className="font-semibold text-slate-700">
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
    </section>
  )
}

function SummaryCard({ label, value, tone = 'default' }) {
  const toneClass =
    tone === 'success'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
      : tone === 'warning'
      ? 'border-amber-200 bg-amber-50 text-amber-700'
      : tone === 'danger'
      ? 'border-rose-200 bg-rose-50 text-rose-700'
      : 'border-slate-200 bg-white text-slate-800'

  return (
    <div className={`rounded-md border px-4 py-4 shadow-sm ${toneClass}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] opacity-80">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold">{value}</p>
    </div>
  )
}

export default PeminjamanAlat