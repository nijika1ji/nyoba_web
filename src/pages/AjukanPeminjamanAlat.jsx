import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import alatLab from '../data/alatLab'
import { findAlatBySlug, slugify } from '../utils/alatHelpers'
import { submitPeminjamanAlat } from '../utils/submissionService'
import Button from '../components/ui/Button'
import FormField from '../components/ui/FormField'
import StateCard from '../components/ui/StateCard'

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
        return createInitialForm()
      }
    }
    return createInitialForm()
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
      setForm(createInitialForm())
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
      <section className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef5ff_45%,#ffffff_100%)] px-4 py-8 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <StateCard
            title="Alat tidak ditemukan"
            message="Data alat yang kamu cari tidak tersedia. Silakan kembali ke katalog untuk memilih alat lain."
            variant="empty"
            action={{
              to: '/layanan/peminjaman-alat',
              label: 'Kembali ke katalog',
              variant: 'secondary',
            }}
          />
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
    <section className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef5ff_45%,#ffffff_100%)] px-4 py-8 md:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-5">
          <Button
            to={`/layanan/peminjaman-alat/${slugify(alat.nama)}`}
            variant="ghost"
            size="sm"
            className="font-medium"
          >
            ← Kembali ke detail alat
          </Button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
            Ajukan Peminjaman
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Alat yang dipilih: <span className="font-semibold">{alat.nama}</span>
          </p>

          {submitted && (
            <div className="mt-5" role="status" aria-live="polite">
              <StateCard
                title="Pengajuan berhasil dikirim"
                message="Form akan direset otomatis. (Backend belum dihubungkan, ini masih demo frontend.)"
                variant="success"
                className="rounded-2xl p-4"
              />
            </div>
          )}

          {submitError && (
            <div className="mt-5" role="alert" aria-live="polite">
              <StateCard
                title="Pengajuan gagal"
                message={submitError}
                variant="error"
                className="rounded-2xl p-4"
              />
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <FormField
              label="Nama Peminjam"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              required
            />
            <FormField
              label="NIM / NIP"
              name="identitas"
              value={form.identitas}
              onChange={handleChange}
              placeholder="Masukkan NIM atau NIP"
              required
            />
            <FormField
              label="Kontak"
              name="kontak"
              type="tel"
              value={form.kontak}
              onChange={handleChange}
              placeholder="Nomor HP / email"
              required
            />
            <FormField
              label="Jumlah Unit"
              name="jumlah"
              type="number"
              min={1}
              max={alat.tersedia || 1}
              value={form.jumlah}
              onChange={handleChange}
              required
              error={
                isJumlahInvalid ? 'Jumlah pinjam melebihi stok tersedia.' : ''
              }
            />

            <div className="md:col-span-2">
              <FormField
                as="textarea"
                label="Keperluan"
                name="keperluan"
                value={form.keperluan}
                onChange={handleChange}
                placeholder="Tuliskan keperluan peminjaman"
                rows={3}
                required
              />
            </div>

            <FormField
              label="Tanggal Pinjam"
              name="tanggalPinjam"
              type="date"
              value={form.tanggalPinjam}
              onChange={handleChange}
              min={today}
              required
            />
            <FormField
              label="Tanggal Kembali"
              name="tanggalKembali"
              type="date"
              value={form.tanggalKembali}
              onChange={handleChange}
              min={form.tanggalPinjam || today}
              required
              error={
                isTanggalInvalid
                  ? 'Tanggal kembali tidak boleh sebelum tanggal pinjam.'
                  : ''
              }
            />

            <div className="md:col-span-2">
              <FormField
                as="textarea"
                label="Catatan Tambahan"
                name="catatan"
                value={form.catatan}
                onChange={handleChange}
                rows={3}
                placeholder="Tambahkan catatan bila perlu"
              />
            </div>

            {alat.tersedia === 0 && (
              <div className="md:col-span-2">
                <StateCard
                  title="Stok tidak tersedia"
                  message="Saat ini stok alat habis. Silakan pilih alat lain atau hubungi admin laboratorium."
                  variant="error"
                  className="rounded-2xl p-4"
                />
              </div>
            )}

            <div className="md:col-span-2 mt-1 flex flex-wrap gap-3">
              <Button type="submit" disabled={isInvalid || isSubmitting} variant="action">
                {isSubmitting ? 'Mengirim...' : 'Kirim Pengajuan'}
              </Button>

              <Button
                to={`/layanan/peminjaman-alat/${slugify(alat.nama)}`}
                variant="outline"
              >
                Batal
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function createInitialForm() {
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

export default AjukanPeminjamanAlat
