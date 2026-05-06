import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../../services/api'

function KelolaAlat() {
  const [alatList, setAlatList] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchAlat = async () => {
    try {
      setLoading(true)
      const data = await apiRequest('/alat')
      setAlatList(data)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAlat()
  }, [])

  const handleHapus = async (id, nama) => {
    const yakin = confirm(`Yakin ingin menghapus alat "${nama}"?`)
    if (!yakin) return

    try {
      await apiRequest(`/alat/${id}`, {
        method: 'DELETE',
      })

      alert('Alat berhasil dihapus.')
      fetchAlat()
    } catch (error) {
      alert(error.message)
    }
  }

  if (loading) {
    return <div className="p-8">Memuat data alat...</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">
            Kelola Alat
          </h1>

          <Link
            to="/admin/alat/tambah"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Tambah Alat
          </Link>
        </div>

        <div className="space-y-4">
          {alatList.map((alat) => (
            <div
              key={alat.id}
              className="flex items-center justify-between rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-center gap-4">
                {alat.gambar && (
                  <img
                    src={alat.gambar}
                    alt={alat.nama}
                    className="h-16 w-16 rounded-lg object-contain bg-slate-100"
                  />
                )}

                <div>
                  <h2 className="font-bold text-slate-900">{alat.nama}</h2>
                  <p className="text-sm text-slate-500">
                    Stok: {alat.tersedia} / Total: {alat.totalUnit}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/admin/alat/edit/${alat.id}`}
                  className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-500"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleHapus(alat.id, alat.nama)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}

          {alatList.length === 0 && (
            <p className="text-slate-500">Belum ada data alat.</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default KelolaAlat