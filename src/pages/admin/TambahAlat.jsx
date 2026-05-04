import { useState } from 'react'
import { apiFormRequest } from '../../services/api'

function TambahAlat() {
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
  const [loading, setLoading] = useState(false)

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
    } else {
      setPreview('')
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
      setLoading(true)

      await apiFormRequest('/alat', formData)

      alert('Alat berhasil ditambahkan.')

      setForm({
        nama: '',
        totalUnit: '',
        tersedia: '',
        dipinjam: '0',
        maintenance: '0',
        spesifikasi: '',
      })
      setGambar(null)
      setPreview('')
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef5ff_45%,#ffffff_100%)]">
      <div className="mx-auto max-w-4xl px-6 py-14">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
            Admin
          </p>

          <h1 className="text-4xl font-bold text-slate-950">
            Tambah Alat Laboratorium
          </h1>

          <p className="mt-3 text-slate-600">
            Isi data alat dan upload gambar untuk ditampilkan pada katalog.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Nama Alat"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Contoh: Function Generator"
            />

            <Field
              label="Total Unit"
              name="totalUnit"
              type="number"
              value={form.totalUnit}
              onChange={handleChange}
              placeholder="Contoh: 4"
            />

            <Field
              label="Tersedia"
              name="tersedia"
              type="number"
              value={form.tersedia}
              onChange={handleChange}
              placeholder="Contoh: 2"
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
                Gambar Alat
              </label>

              <input
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/webp"
                onChange={handleGambarChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
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
                placeholder={`Tulis satu spesifikasi per baris.\nContoh:\nBandwidth: 100 MHz\nChannel: 2 Channel`}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
              />
            </div>

            {preview && (
              <div className="md:col-span-2">
                <p className="mb-2 text-sm font-semibold text-slate-700">
                  Preview Gambar
                </p>

                <div className="flex h-56 items-center justify-center rounded-2xl bg-slate-50 p-4">
                  <img
                    src={preview}
                    alt="Preview alat"
                    className="max-h-full w-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Menyimpan...' : 'Simpan Alat'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  type = 'text',
}) {
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
        placeholder={placeholder}
        min={type === 'number' ? 0 : undefined}
        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
      />
    </div>
  )
}

export default TambahAlat