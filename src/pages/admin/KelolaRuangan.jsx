import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../../services/api'

function KelolaRuangan() {
  const [ruanganList, setRuanganList] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)

  const [form, setForm] = useState({
    nama: '',
    fungsi: '',
    jamOperasional: '',
    status: 'tersedia',
  })

  const fetchRuangan = async () => {
    try {
      setLoading(true)
      const data = await apiRequest('/ruangan')
      setRuanganList(data)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRuangan()
  }, [])

  const resetForm = () => {
    setEditingId(null)
    setForm({
      nama: '',
      fungsi: '',
      jamOperasional: '',
      status: 'tersedia',
    })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.nama) {
      alert('Nama ruangan wajib diisi.')
      return
    }

    try {
      if (editingId) {
        await apiRequest(`/ruangan/${editingId}`, {
          method: 'PUT',
          body: JSON.stringify(form),
        })

        alert('Ruangan berhasil diperbarui.')
      } else {
        await apiRequest('/ruangan', {
          method: 'POST',
          body: JSON.stringify(form),
        })

        alert('Ruangan berhasil ditambahkan.')
      }

      resetForm()
      fetchRuangan()
    } catch (error) {
      alert(error.message)
    }
  }

  const handleEdit = (ruangan) => {
    setEditingId(ruangan.id)
    setForm({
      nama: ruangan.nama || '',
      fungsi: ruangan.fungsi || '',
      jamOperasional: ruangan.jamOperasional || '',
      status: ruangan.status || 'tersedia',
    })
  }

  const handleHapus = async (id, nama) => {
    const yakin = confirm(`Yakin ingin menghapus ruangan "${nama}"?`)
    if (!yakin) return

    try {
      await apiRequest(`/ruangan/${id}`, {
        method: 'DELETE',
      })

      alert('Ruangan berhasil dihapus.')
      fetchRuangan()
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
              Admin
            </p>
            <h1 className="text-3xl font-bold text-slate-900">
              Kelola Ruangan
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Tambah, edit, dan hapus data ruangan laboratorium.
            </p>
          </div>

          <Link
            to="/admin"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
          >
            Dashboard
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-slate-900">
              {editingId ? 'Edit Ruangan' : 'Tambah Ruangan'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field
                label="Nama Ruangan"
                name="nama"
                value={form.nama}
                onChange={handleChange}
                placeholder="Contoh: Ruang Diskusi ELINS"
              />

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Fungsi
                </label>
                <textarea
                  name="fungsi"
                  value={form.fungsi}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Contoh: Diskusi riset, rapat, presentasi"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white"
                />
              </div>

              <Field
                label="Jam Operasional"
                name="jamOperasional"
                value={form.jamOperasional}
                onChange={handleChange}
                placeholder="Contoh: Senin - Jumat, 08.00 - 16.00 WIB"
              />

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white"
                >
                  <option value="tersedia">tersedia</option>
                  <option value="maintenance">maintenance</option>
                  <option value="tidak tersedia">tidak tersedia</option>
                </select>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  {editingId ? 'Simpan Perubahan' : 'Tambah Ruangan'}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700"
                  >
                    Batal
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-slate-900">
              Daftar Ruangan
            </h2>

            {loading ? (
              <p className="text-slate-500">Memuat data ruangan...</p>
            ) : ruanganList.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                Belum ada data ruangan.
              </div>
            ) : (
              <div className="space-y-4">
                {ruanganList.map((ruangan) => (
                  <div
                    key={ruangan.id}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-slate-900">
                          {ruangan.nama}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          {ruangan.fungsi || '-'}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Jam: {ruangan.jamOperasional || '-'}
                        </p>
                        <span className="mt-3 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase text-emerald-700">
                          {ruangan.status}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(ruangan)}
                          className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-500"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleHapus(ruangan.id, ruangan.nama)
                          }
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, name, value, onChange, placeholder = '' }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white"
      />
    </div>
  )
}

export default KelolaRuangan