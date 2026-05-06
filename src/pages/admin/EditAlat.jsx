import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { apiFormRequest, apiRequest } from '../../services/api'

function EditAlat() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nama: '',
    totalUnit: '',
    tersedia: '',
    dipinjam: '0',
    maintenance: '0',
    spesifikasi: '',
  })

  const [gambar, setGambar] = useState(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await apiRequest('/alat')
        const alat = data.find((item) => String(item.id) === String(id))

        if (!alat) {
          alert('Alat tidak ditemukan.')
          navigate('/admin/alat')
          return
        }

        setForm({
          nama: alat.nama || '',
          totalUnit: alat.totalUnit || '',
          tersedia: alat.tersedia || '',
          dipinjam: alat.dipinjam || '0',
          maintenance: alat.maintenance || '0',
          spesifikasi: Array.isArray(alat.spesifikasi)
            ? alat.spesifikasi.join('\n')
            : '',
        })

        setPreview(alat.gambar || '')
      } catch (error) {
        alert(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, navigate])

  const handleChange = (event) => {
    const { name, value } = event.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleGambarChange = (event) => {
    const file = event.target.files?.[0]
    setGambar(file || null)

    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!form.nama || !form.totalUnit || !form.tersedia) {
      alert('Nama, total unit, dan stok tersedia wajib diisi.')
      return
    }

    const formData = new FormData()
    formData.append('nama', form.nama)
    formData.append('totalUnit', form.totalUnit)
    formData.append('tersedia', form.tersedia)
    formData.append('dipinjam', form.dipinjam)
    formData.append('maintenance', form.maintenance)
    formData.append('spesifikasi', form.spesifikasi)

    if (gambar) {
      formData.append('gambar', gambar)
    }

    try {
      setSaving(true)

      await apiFormRequest(`/alat/${id}`, formData, {
        method: 'PUT',
      })

      alert('Alat berhasil diperbarui.')
      navigate('/admin/alat')
    } catch (error) {
      alert(error.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="p-8">Memuat data alat...</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">
          Edit Alat
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
          <Field
            label="Nama Alat"
            name="nama"
            value={form.nama}
            onChange={handleChange}
          />

          <Field
            label="Total Unit"
            name="totalUnit"
            type="number"
            value={form.totalUnit}
            onChange={handleChange}
          />

          <Field
            label="Tersedia"
            name="tersedia"
            type="number"
            value={form.tersedia}
            onChange={handleChange}
          />

          <Field
            label="Dipinjam"
            name="dipinjam"
            type="number"
            value={form.dipinjam}
            onChange={handleChange}
          />

          <Field
            label="Maintenance"
            name="maintenance"
            type="number"
            value={form.maintenance}
            onChange={handleChange}
          />

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Ganti Gambar
            </label>

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg,image/webp"
              onChange={handleGambarChange}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Spesifikasi
            </label>

            <textarea
              name="spesifikasi"
              value={form.spesifikasi}
              onChange={handleChange}
              rows={5}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
            />
          </div>

          {preview && (
            <div className="md:col-span-2">
              <p className="mb-2 text-sm font-semibold text-slate-700">
                Preview Gambar
              </p>

              <img
                src={preview}
                alt="Preview"
                className="h-56 w-full rounded-xl bg-slate-100 object-contain p-4"
              />
            </div>
          )}

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/alat')}
              className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, name, value, onChange, type = 'text' }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        min={type === 'number' ? 0 : undefined}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
      />
    </div>
  )
}

export default EditAlat