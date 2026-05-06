import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFormRequest, apiRequest } from '../../services/api'

function KelolaProject() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [gambarFile, setGambarFile] = useState(null)

  const [form, setForm] = useState({
    jenis: 'penelitian',
    judul: '',
    deskripsiSingkat: '',
    deskripsiLengkap: '',
  })

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const data = await apiRequest('/project')
      setProjects(data)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const resetForm = () => {
    setEditingId(null)
    setGambarFile(null)
    setForm({
      jenis: 'penelitian',
      judul: '',
      deskripsiSingkat: '',
      deskripsiLengkap: '',
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

    if (!form.jenis || !form.judul) {
      alert('Jenis dan judul project wajib diisi.')
      return
    }

    try {
      const formData = new FormData()
      formData.append('jenis', form.jenis)
      formData.append('judul', form.judul)
      formData.append('deskripsiSingkat', form.deskripsiSingkat)
      formData.append('deskripsiLengkap', form.deskripsiLengkap)

      if (gambarFile) {
        formData.append('gambar', gambarFile)
      }

      if (editingId) {
        await apiFormRequest(`/project/${editingId}`, formData, {
          method: 'PUT',
        })

        alert('Project berhasil diperbarui.')
      } else {
        await apiFormRequest('/project', formData)

        alert('Project berhasil ditambahkan.')
      }

      resetForm()
      fetchProjects()
    } catch (error) {
      alert(error.message)
    }
  }

  const handleEdit = (project) => {
    setEditingId(project.id)
    setGambarFile(null)

    setForm({
      jenis: project.jenis || 'penelitian',
      judul: project.judul || '',
      deskripsiSingkat: project.deskripsiSingkat || '',
      deskripsiLengkap: project.deskripsiLengkap || '',
    })
  }

  const handleHapus = async (id, judul) => {
    const yakin = confirm(`Yakin ingin menghapus project "${judul}"?`)
    if (!yakin) return

    try {
      await apiRequest(`/project/${id}`, {
        method: 'DELETE',
      })

      alert('Project berhasil dihapus.')
      fetchProjects()
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
              Admin
            </p>
            <h1 className="text-3xl font-bold text-slate-900">
              Kelola Project
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Tambah, edit, dan hapus project penelitian atau pengabdian.
            </p>
          </div>

          <Link
            to="/admin"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-white"
          >
            Dashboard
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-bold text-slate-900">
              {editingId ? 'Edit Project' : 'Tambah Project'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Jenis Project
                </label>
                <select
                  name="jenis"
                  value={form.jenis}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white"
                >
                  <option value="penelitian">Penelitian</option>
                  <option value="pengabdian">Pengabdian</option>
                </select>
              </div>

              <Field
                label="Judul Project"
                name="judul"
                value={form.judul}
                onChange={handleChange}
                placeholder="Contoh: Sistem Monitoring Kualitas Udara"
              />

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Gambar
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => setGambarFile(event.target.files[0])}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm"
                />
                {editingId && (
                  <p className="mt-2 text-xs text-slate-500">
                    Kosongkan gambar kalau tidak ingin mengganti gambar lama.
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Deskripsi Singkat
                </label>
                <textarea
                  name="deskripsiSingkat"
                  value={form.deskripsiSingkat}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Ringkasan singkat untuk card project"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Deskripsi Lengkap
                </label>
                <textarea
                  name="deskripsiLengkap"
                  value={form.deskripsiLengkap}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Penjelasan lengkap yang muncul di halaman detail"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white"
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  {editingId ? 'Simpan Perubahan' : 'Tambah Project'}
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
              Daftar Project
            </h2>

            {loading ? (
              <p className="text-slate-500">Memuat data project...</p>
            ) : projects.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                Belum ada data project.
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="rounded-xl border border-slate-200 p-4"
                  >
                    <div className="flex flex-wrap gap-4">
                      <div className="h-24 w-32 overflow-hidden rounded-xl bg-slate-100">
                        {project.gambar ? (
                          <img
                            src={project.gambar}
                            alt={project.judul}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-slate-400">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase text-blue-700">
                          {project.jenis}
                        </span>

                        <h3 className="mt-2 font-bold text-slate-900">
                          {project.judul}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                          {project.deskripsiSingkat || '-'}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="h-fit rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-500"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleHapus(project.id, project.judul)
                          }
                          className="h-fit rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
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

export default KelolaProject