import { Link, useParams } from 'react-router-dom'
import alatLab from '../data/alatLab'
import {
  findAlatBySlug,
  getStatusBadgeClass,
  getStatusLabel,
  slugify,
} from '../utils/alatHelpers'

function DetailPeminjamanAlat() {
  const { slug } = useParams()
  const alat = findAlatBySlug(slug, alatLab)

  if (!alat) {
    return (
      <section className="min-h-screen bg-[#efefef] px-4 py-6 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-md bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <h1 className="text-2xl font-bold text-slate-900">Alat tidak ditemukan</h1>
          <Link
            to="/layanan/peminjaman-alat"
            className="mt-4 inline-flex rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Kembali ke katalog
          </Link>
        </div>
      </section>
    )
  }

  const status = getStatusLabel(alat)

  return (
    <section className="min-h-screen bg-[#efefef] px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4">
          <Link
            to="/layanan/peminjaman-alat"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Kembali ke katalog
          </Link>
        </div>

        <div className="rounded-md bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-6">
          <div className="grid gap-8 lg:grid-cols-[480px_minmax(0,1fr)]">
            <div>
              <div className="flex min-h-[360px] items-center justify-center rounded-md border border-slate-200 bg-white p-5">
                <img
                  src={alat.gambar}
                  alt={alat.nama}
                  className="max-h-[380px] w-full object-contain"
                />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold uppercase leading-tight text-slate-900">
                {alat.nama}
              </h1>

              <div className="mt-5">
                <span
                  className={`inline-flex rounded-sm px-3 py-2 text-sm font-semibold ${getStatusBadgeClass(status)}`}
                >
                  {status}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
                <DetailBox label="Tersedia" value={alat.tersedia} color="emerald" />
                <DetailBox label="Dipinjam" value={alat.dipinjam} color="amber" />
                <DetailBox label="Maintenance" value={alat.maintenance} color="rose" />
                <DetailBox label="Total" value={alat.totalUnit} color="slate" />
              </div>

              <div className="mt-8">
                <Link
                  to={`/layanan/peminjaman-alat/${slugify(alat.nama)}/ajukan`}
                  className="inline-flex items-center rounded-md bg-amber-400 px-6 py-3 text-sm font-bold uppercase text-black shadow-[0_4px_0_0_#92400e] transition hover:translate-y-[1px]"
                >
                  Ajukan Peminjaman
                </Link>
              </div>

              <div className="mt-8">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
                  Spesifikasi
                </h2>

                {alat.spesifikasi?.length ? (
                  <ul className="space-y-2">
                    {alat.spesifikasi.map((item, index) => (
                      <li
                        key={`${alat.id}-${index}`}
                        className="flex items-start gap-3 rounded-md bg-slate-50 px-4 py-3 text-sm text-slate-700"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="rounded-md bg-slate-50 px-4 py-3 text-sm text-slate-500">
                    Belum ada spesifikasi.
                  </div>
                )}
              </div>

              <div className="mt-8 border-t border-slate-200 pt-5">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-[0.12em] text-slate-500">
                  More Info
                </h2>
                <div className="space-y-2 text-sm leading-6 text-slate-600">
                  <p>Pengajuan dilakukan setelah memilih alat ini.</p>
                  <p>Stok mengikuti jumlah tersedia, dipinjam, dan maintenance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function DetailBox({ label, value, color }) {
  const classMap = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    rose: 'bg-rose-50 text-rose-700 border-rose-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  }

  return (
    <div className={`rounded-md border px-4 py-4 ${classMap[color]}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] opacity-80">
        {label}
      </p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  )
}

export default DetailPeminjamanAlat