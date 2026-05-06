import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../../services/api'

const statusOptions = ['pending', 'disetujui', 'ditolak', 'dibatalkan']

function KelolaPeminjamanRuangan() {
  const [peminjamanList, setPeminjamanList] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)

  const fetchPeminjaman = async () => {
    try {
      setLoading(true)
      const data = await apiRequest('/peminjaman-ruangan')
      setPeminjamanList(data)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPeminjaman()
  }, [])

  const handleUbahStatus = async (id, status) => {
    try {
      setUpdatingId(id)

      await apiRequest(`/peminjaman-ruangan/${id}/status`, {
        method: 'PUT',
        body: JSON.stringify({ status }),
      })

      alert('Status peminjaman ruangan berhasil diperbarui.')
      fetchPeminjaman()
    } catch (error) {
      alert(error.message)
    } finally {
      setUpdatingId(null)
    }
  }

  const formatTanggal = (value) => {
    if (!value) return '-'

    return new Date(value).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  const getStatusClass = (status) => {
    switch (status) {
      case 'disetujui':
        return 'bg-emerald-100 text-emerald-700'
      case 'ditolak':
      case 'dibatalkan':
        return 'bg-rose-100 text-rose-700'
      default:
        return 'bg-amber-100 text-amber-700'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-10">
        <p>Memuat data peminjaman ruangan...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
              Admin
            </p>

            <h1 className="text-3xl font-bold text-slate-900">
              Kelola Peminjaman Ruangan
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Lihat pengajuan peminjaman ruangan dan ubah statusnya.
            </p>
          </div>

          <Link
            to="/admin"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Dashboard
          </Link>
        </div>

        {peminjamanList.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
            Belum ada data peminjaman ruangan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-sm">
              <thead>
                <tr className="border-b bg-slate-50 text-slate-700">
                  <th className="px-4 py-3 font-semibold">Peminjam</th>
                  <th className="px-4 py-3 font-semibold">Ruangan</th>
                  <th className="px-4 py-3 font-semibold">Tanggal</th>
                  <th className="px-4 py-3 font-semibold">Jam</th>
                  <th className="px-4 py-3 font-semibold">Keperluan</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Ubah Status</th>
                </tr>
              </thead>

              <tbody>
                {peminjamanList.map((item) => (
                  <tr key={item.id} className="border-b align-top">
                    <td className="px-4 py-4">
                      <p className="font-bold text-slate-900">
                        {item.namaPeminjam}
                      </p>
                      <p className="text-xs text-slate-500">
                        {item.identitas}
                      </p>
                    </td>

                    <td className="px-4 py-4 font-semibold text-slate-900">
                      {item.namaRuangan}
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {formatTanggal(item.tanggal)}
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {item.jamMulai} - {item.jamSelesai}
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                      {item.keperluan}
                    </td>

                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold uppercase ${getStatusClass(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-4 py-4">
                      <select
                        value={item.status}
                        disabled={updatingId === item.id}
                        onChange={(event) =>
                          handleUbahStatus(item.id, event.target.value)
                        }
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default KelolaPeminjamanRuangan