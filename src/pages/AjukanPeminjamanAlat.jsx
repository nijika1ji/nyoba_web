import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import alatLab from '../data/alatLab'
import { findAlatBySlug, slugify } from '../utils/alatHelpers'
import { submitPeminjamanAlat } from '../utils/submissionService'

function AjukanPeminjamanAlat() {
  const { slug } = useParams()
  const alat = findAlatBySlug(slug, alatLab)

  const storageKey = `form-peminjaman-alat-${slug}`

  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return {
          nama: '',
          identitas: '',
          kontak: '',
          keperluan: '',
          jumlah: 1,
          tanggalPinjam: '',
          tanggalKembali: '',
          catatan: '',
        }
      }
    }
    return {
      nama: '',
      identitas: '',
      kontak: '',
      keperluan: '',
      jumlah: 1,
      tanggalPinjam: '',
      tanggalKembali: '',
      catatan: '',
    }
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(form))
  }, [form, storageKey])

  useEffect(() => {
    if (!submitted) return undefined

    const timeoutId = window.setTimeout(() => {
      setForm({
        nama: '',
        identitas: '',
        kontak: '',
        keperluan: '',
        jumlah: 1,
        tanggalPinjam: '',
        tanggalKembali: '',
        catatan: '',
      })
      setSubmitted(false)
    }, 4000)

    return () => window.clearTimeout(timeoutId)
  }, [submitted])

  useEffect(() => {
    if (!submitError) return undefined

    const timeoutId = window.setTimeout(() => {
      setSubmitError('')
    }, 4000)

    return () => window.clearTimeout(timeoutId)
  }, [submitError])

  const today = new Date().toISOString().split('T')[0]

  if (!alat) {
    return (
      <section className="min-h-screen bg-[#efefef] px-4 py-6 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-md bg-white p-8 shadow-sm ring-1 ring-slate-200">
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

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({
      ...prev,
      [name]: name === 'jumlah' ? Number(value) : value,
    }))
  }

  const isTanggalInvalid =
    form.tanggalPinjam &&
    form.tanggalKembali &&
    new Date(form.tanggalKembali) < new Date(form.tanggalPinjam)

  const isJumlahInvalid = form.jumlah > alat.tersedia || form.jumlah < 1

  const isInvalid =
    !form.nama ||
    !form.identitas ||
    !form.kontak ||
    !form.keperluan ||
    !form.tanggalPinjam ||
    !form.tanggalKembali ||
    isTanggalInvalid ||
    isJumlahInvalid ||
    alat.tersedia === 0

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isInvalid || isSubmitting) return

    setIsSubmitting(true)
    setSubmitError('')

    try {
      await submitPeminjamanAlat({
        alatId: alat.id,
        alatNama: alat.nama,
        ...form,
      })
      localStorage.removeItem(storageKey)
      setSubmitted(true)
    } catch {
      setSubmitError('Pengajuan belum berhasil dikirim. Silakan coba lagi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="min-h-screen bg-[#efefef] px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-4 flex flex-wrap gap-4">
          <Link
            to={`/layanan/peminjaman-alat/${slugify(alat.nama)}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← Kembali ke detail alat
          </Link>
        </div>

        <div className="rounded-md bg-white p-5 shadow-sm ring-1 ring-slate-200 md:p-6">
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Ajukan Peminjaman
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Alat yang dipilih: <span className="font-semibold">{alat.nama}</span>
          </p>

          {submitted && (
            <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status" aria-live="polite">
              <strong>Pengajuan berhasil dikirim!</strong> Form akan direset otomatis. (Backend belum dihubungkan, ini hanya demo frontend.)
            </div>
          )}

          {submitError && (
            <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert" aria-live="polite">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <Field
              label="Nama Peminjam"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              required
            />
            <Field
              label="NIM / NIP"
              name="identitas"
              value={form.identitas}
              onChange={handleChange}
              placeholder="Masukkan NIM atau NIP"
              required
            />
            <Field
              label="Kontak"
              name="kontak"
              type="tel"
              value={form.kontak}
              onChange={handleChange}
              placeholder="Nomor HP / email"
              required
            />
            <Field
              label="Jumlah Unit"
              name="jumlah"
              type="number"
              min={1}
              max={alat.tersedia || 1}
              value={form.jumlah}
              onChange={handleChange}
              required
              isInvalid={isJumlahInvalid}
            />

            <div className="md:col-span-2">
              <label htmlFor="field-keperluan" className="mb-2 block text-sm font-semibold text-slate-700">
                Keperluan
              </label>
              <textarea
                id="field-keperluan"
                name="keperluan"
                value={form.keperluan}
                onChange={handleChange}
                rows={3}
                placeholder="Tuliskan keperluan peminjaman"
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
                required
              />
            </div>

            <Field
              label="Tanggal Pinjam"
              name="tanggalPinjam"
              type="date"
              value={form.tanggalPinjam}
              onChange={handleChange}
              min={today}
              required
            />
            <Field
              label="Tanggal Kembali"
              name="tanggalKembali"
              type="date"
              value={form.tanggalKembali}
              onChange={handleChange}
              min={form.tanggalPinjam || today}
              required
              isInvalid={isTanggalInvalid}
            />

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Catatan Tambahan
              </label>
              <textarea
                name="catatan"
                value={form.catatan}
                onChange={handleChange}
                rows={3}
                placeholder="Tambahkan catatan bila perlu"
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
              />
            </div>

            {(alat.tersedia === 0 || isJumlahInvalid || isTanggalInvalid) && (
              <div className="md:col-span-2 rounded-md bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {alat.tersedia === 0 && 'Stok alat tidak tersedia. '}
                {isJumlahInvalid && 'Jumlah pinjam melebihi stok tersedia. '}
                {isTanggalInvalid && 'Tanggal kembali tidak boleh sebelum tanggal pinjam.'}
              </div>
            )}

            <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                disabled={isInvalid || isSubmitting}
                className="inline-flex items-center rounded-md bg-amber-400 px-6 py-3 text-sm font-bold uppercase text-black shadow-[0_4px_0_0_#92400e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Mengirim...' : 'Kirim Pengajuan'}
              </button>

              <Link
                to={`/layanan/peminjaman-alat/${slugify(alat.nama)}`}
                className="inline-flex items-center rounded-md border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700"
              >
                Batal
              </Link>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  min,
  max,
  required = false,
  isInvalid = false,
}) {
  const inputId = `field-${name}`

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        required={required}
        aria-invalid={isInvalid}
        className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
      />
    </div>
  )
}

export default AjukanPeminjamanAlat