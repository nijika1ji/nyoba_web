import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { apiRequest } from '../services/api'
import { getStatusLabel, getStatusTextClass } from '../utils/alatHelpers'

function DetailPeminjamanAlat() {
  const { slug } = useParams()

  const [alat, setAlat] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    async function fetchDetailAlat() {
      try {
        setLoading(true)
        setError('')
        setImgError(false)

        const data = await apiRequest(`/alat/${slug}`)
        setAlat(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDetailAlat()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef5ff_45%,#ffffff_100%)]">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <div className="rounded-3xl bg-white p-10 text-center text-slate-500 shadow-sm">
            Memuat detail alat...
          </div>
        </div>
      </div>
    )
  }

  if (error || !alat) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef5ff_45%,#ffffff_100%)]">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 shadow-sm">
            <h1 className="mb-4 text-3xl font-bold text-rose-800">
              {error || 'Alat tidak ditemukan'}
            </h1>

            <Link
              to="/layanan/peminjaman-alat"
              className="inline-block rounded-xl bg-white px-5 py-3 font-medium text-gray-800 transition hover:bg-gray-100"
            >
              Kembali
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const status = getStatusLabel(alat)

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef5ff_45%,#ffffff_100%)]">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <Link
          to="/layanan/peminjaman-alat"
          className="mb-8 inline-block rounded-xl bg-white px-5 py-3 font-medium text-gray-800 shadow-sm transition hover:bg-gray-100"
        >
          Kembali
        </Link>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1fr_1.05fr]">
            <div className="flex min-h-[420px] items-center justify-center border-b border-slate-200 bg-slate-50 p-8 lg:border-b-0 lg:border-r">
              {!imgError && alat.gambar ? (
                <img
                  src={alat.gambar}
                  alt={alat.nama}
                  className="max-h-[340px] w-full object-contain"
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex h-full min-h-[260px] w-full items-center justify-center rounded-2xl bg-slate-100">
                  <p className="font-semibold text-slate-500">Preview Alat</p>
                </div>
              )}
            </div>

            <div className="p-6 md:p-8">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
                Detail Alat Laboratorium
              </p>

              <h1 className="text-3xl font-black uppercase leading-tight text-slate-950 md:text-4xl">
                {alat.nama}
              </h1>

              <div className="mt-5 flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-500">
                  Status:
                </span>
                <span
                  className={`text-sm font-bold ${getStatusTextClass(status)}`}
                >
                  {status}
                </span>
              </div>

              <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                <InfoRow label="Tersedia" value={`${alat.tersedia} unit`} />
                <InfoRow
                  label="Sedang dipinjam"
                  value={`${alat.dipinjam} unit`}
                />
                <InfoRow
                  label="Maintenance"
                  value={`${alat.maintenance} unit`}
                />
                <InfoRow label="Total unit" value={`${alat.totalUnit} unit`} />
              </div>

              <div className="mt-7">
                <Link
                  to={`/layanan/peminjaman-alat/${alat.slug}/ajukan`}
                  className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-6 py-3 text-sm font-black uppercase text-black shadow-[0_4px_0_0_#92400e] transition hover:translate-y-[1px] hover:shadow-[0_3px_0_0_#92400e]"
                >
                  Ajukan Peminjaman
                </Link>
              </div>

              <div className="mt-8">
                <h2 className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-slate-500">
                  Spesifikasi
                </h2>

                {alat.spesifikasi?.length ? (
                  <ul className="space-y-2">
                    {alat.spesifikasi.map((item, index) => (
                      <li
                        key={`${alat.id}-${index}`}
                        className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-700"
                      >
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                    Belum ada spesifikasi.
                  </div>
                )}
              </div>

              <div className="mt-8 border-t border-slate-200 pt-5">
                <h2 className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-slate-500">
                  More Info
                </h2>

                <div className="space-y-2 text-sm leading-6 text-slate-600">
                  <p>
                    Pengajuan peminjaman dilakukan melalui form khusus setelah
                    memilih alat ini.
                  </p>
                  <p>
                    Data stok mengikuti jumlah unit tersedia, unit yang sedang
                    dipinjam, dan unit yang sedang maintenance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-16 bg-gradient-to-b from-transparent to-white" />
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-4 py-3 last:border-b-0">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-sm font-bold text-slate-900">{value}</span>
    </div>
  )
}

export default DetailPeminjamanAlat