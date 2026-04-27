import { useState, useEffect } from 'react'
import { submitPeminjamanRuangan } from '../utils/submissionService'
import Button from '../components/ui/Button'
import FormField from '../components/ui/FormField'
import StateCard from '../components/ui/StateCard'

function PeminjamanRuangan() {
  const ruangan = {
    nama: 'Laboratorium Riset Elektronika dan Instrumentasi (SIC 3.01)',
    fungsi: 'Diskusi dan kegiatan riset',
    jamOperasional: 'Senin – Jumat, 08.00 – 16.00 WIB',
  }

  const today = new Date()
  const oneDay = 24 * 60 * 60 * 1000

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const addDays = (date, days) => new Date(date.getTime() + days * oneDay)

  const todayStr = formatDate(today)
  const tomorrowStr = formatDate(addDays(today, 1))
  const dayAfterStr = formatDate(addDays(today, 2))

  const bookedSchedules = {
    [todayStr]: [
      { start: '08:00', end: '10:00', kegiatan: 'Diskusi Kelompok' },
      { start: '13:00', end: '15:00', kegiatan: 'Diskusi Riset' },
    ],
    [tomorrowStr]: [
      { start: '09:00', end: '11:00', kegiatan: 'Rapat Tim Penelitian' },
      { start: '14:00', end: '15:30', kegiatan: 'Pembahasan Proposal' },
    ],
    [dayAfterStr]: [
      { start: '10:00', end: '12:00', kegiatan: 'Koordinasi Kegiatan' },
    ],
  }

  const storageKey = 'form-peminjaman-ruangan'

  const [form, setForm] = useState(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch {
        return createInitialForm(todayStr)
      }
    }
    return createInitialForm(todayStr)
  })

  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(form))
  }, [form])

  useEffect(() => {
    if (!submitted) return undefined

    const timeoutId = window.setTimeout(() => {
      setForm(createInitialForm(todayStr))
      setSubmitted(false)
    }, 4000)

    return () => window.clearTimeout(timeoutId)
  }, [submitted, todayStr])

  useEffect(() => {
    if (!submitError) return undefined

    const timeoutId = window.setTimeout(() => {
      setSubmitError('')
    }, 4000)

    return () => window.clearTimeout(timeoutId)
  }, [submitError])

  const timeToMinutes = (time) => {
    const [hour, minute] = time.split(':').map(Number)
    return hour * 60 + minute
  }

  const minutesToTime = (minutes) => {
    const hour = String(Math.floor(minutes / 60)).padStart(2, '0')
    const minute = String(minutes % 60).padStart(2, '0')
    return `${hour}:${minute}`
  }

  const generateTimeOptions = (start = '08:00', end = '16:00', step = 30) => {
    const options = []
    let current = timeToMinutes(start)
    const endMinutes = timeToMinutes(end)

    while (current <= endMinutes) {
      options.push(minutesToTime(current))
      current += step
    }

    return options
  }

  const allTimeOptions = generateTimeOptions()
  const occupiedSlots = bookedSchedules[form.tanggal] || []

  const openStart = timeToMinutes('08:00')
  const openEnd = timeToMinutes('16:00')

  const availableRanges = (() => {
    if (occupiedSlots.length === 0) {
      return [{ start: '08:00', end: '16:00' }]
    }

    const sorted = [...occupiedSlots].sort(
      (a, b) => timeToMinutes(a.start) - timeToMinutes(b.start)
    )

    const ranges = []
    let current = openStart

    sorted.forEach((slot) => {
      const slotStart = timeToMinutes(slot.start)
      const slotEnd = timeToMinutes(slot.end)

      if (current < slotStart) {
        ranges.push({
          start: minutesToTime(current),
          end: minutesToTime(slotStart),
        })
      }

      if (slotEnd > current) {
        current = slotEnd
      }
    })

    if (current < openEnd) {
      ranges.push({
        start: minutesToTime(current),
        end: minutesToTime(openEnd),
      })
    }

    return ranges
  })()

  const bentrok = (() => {
    if (!form.jamMulai || !form.jamSelesai) return false

    const mulai = timeToMinutes(form.jamMulai)
    const selesai = timeToMinutes(form.jamSelesai)

    if (selesai <= mulai) return true

    return occupiedSlots.some((slot) => {
      const slotMulai = timeToMinutes(slot.start)
      const slotSelesai = timeToMinutes(slot.end)
      return mulai < slotSelesai && selesai > slotMulai
    })
  })()

  const durasiMenit = (() => {
    if (!form.jamMulai || !form.jamSelesai) return 0
    return timeToMinutes(form.jamSelesai) - timeToMinutes(form.jamMulai)
  })()

  const melebihiBatas = durasiMenit > 180
  const waktuTidakValid = form.jamMulai && form.jamSelesai && durasiMenit <= 0

  const endOptions = !form.jamMulai
    ? allTimeOptions
    : allTimeOptions.filter((time) => {
        const mulai = timeToMinutes(form.jamMulai)
        const current = timeToMinutes(time)
        return current > mulai && current <= mulai + 180
      })

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'tanggal' ? { jamMulai: '', jamSelesai: '' } : {}),
      ...(field === 'jamMulai' ? { jamSelesai: '' } : {}),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      !form.nama ||
      !form.identitas ||
      !form.tanggal ||
      !form.jamMulai ||
      !form.jamSelesai ||
      !form.keperluan ||
      isSubmitting
    ) {
      return
    }

    if (waktuTidakValid || melebihiBatas || bentrok) {
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      await submitPeminjamanRuangan({
        ruangan: ruangan.nama,
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
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef5ff_55%,#ffffff_100%)]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
            Layanan
          </p>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">Peminjaman Ruangan</h1>

          <p className="leading-8 text-gray-700">
            Halaman ini menampilkan informasi ruangan, jadwal penggunaan, ketersediaan waktu, dan form pengajuan peminjaman ruangan laboratorium.
          </p>
        </div>

        <div className="mb-12 grid gap-8 lg:grid-cols-[360px_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold">Informasi Ruangan</h2>

            <div className="space-y-5 leading-8 text-slate-700">
              <div>
                <p className="font-semibold text-slate-900">Nama Ruangan</p>
                <p>{ruangan.nama}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Fungsi</p>
                <p>{ruangan.fungsi}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Jam Operasional</p>
                <p>{ruangan.jamOperasional}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="mb-2 text-sm text-slate-500">Status Saat Ini</p>
                <span className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                  Tersedia
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-3 text-2xl font-bold">Form Reservasi Ruangan</h2>
            <p className="mb-6 text-sm leading-7 text-slate-600">
              Isi form di bawah untuk mengajukan peminjaman ruangan. Pastikan slot waktu yang kamu pilih tidak bentrok dengan jadwal yang sudah ada.
            </p>

            {submitted && (
              <div className="mb-6" role="status" aria-live="polite">
                <StateCard
                  title="Pengajuan berhasil dikirim"
                  message="Form akan direset otomatis. (Backend belum dihubungkan, ini masih demo frontend.)"
                  variant="success"
                />
              </div>
            )}

            {submitError && (
              <div className="mb-6" role="alert" aria-live="polite">
                <StateCard
                  title="Pengajuan gagal"
                  message={submitError}
                  variant="error"
                />
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  label="Nama"
                  name="nama"
                  value={form.nama}
                  onChange={(e) => handleChange('nama', e.target.value)}
                  placeholder="Masukkan nama"
                  required
                />

                <FormField
                  label="NIM / Identitas"
                  name="identitas"
                  value={form.identitas}
                  onChange={(e) => handleChange('identitas', e.target.value)}
                  placeholder="Masukkan NIM atau identitas"
                  required
                />
              </div>

              <FormField
                label="Ruangan"
                name="ruangan"
                value={ruangan.nama}
                disabled
                helper="Ruangan ini dipilih otomatis sesuai layanan yang sedang kamu buka."
              />

              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  label="Tanggal"
                  name="tanggal"
                  type="date"
                  value={form.tanggal}
                  min={todayStr}
                  onChange={(e) => handleChange('tanggal', e.target.value)}
                  helper="Pilih tanggal penggunaan ruangan terlebih dahulu."
                  required
                />

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Jam Kosong Tersedia
                  </label>
                  <div className="min-h-[92px] rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-700">
                    {availableRanges.length > 0 ? (
                      <>
                        <p className="mb-3 text-sm text-slate-500">
                          Slot berikut masih bisa dipilih untuk tanggal {form.tanggal}.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {availableRanges.map((slot, index) => (
                            <span
                              key={`${slot.start}-${slot.end}-${index}`}
                              className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700"
                            >
                              {slot.start} - {slot.end}
                            </span>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                        Tidak ada slot kosong pada tanggal ini. Silakan pilih tanggal lain.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <FormField
                  as="select"
                  label="Jam Mulai"
                  name="jamMulai"
                  value={form.jamMulai}
                  onChange={(e) => handleChange('jamMulai', e.target.value)}
                  required
                  error={waktuTidakValid || bentrok ? 'Periksa lagi slot waktu yang dipilih.' : ''}
                  options={[
                    { value: '', label: 'Pilih jam mulai' },
                    ...allTimeOptions.map((time) => ({ value: time, label: time })),
                  ]}
                />

                <FormField
                  as="select"
                  label="Jam Selesai"
                  name="jamSelesai"
                  value={form.jamSelesai}
                  onChange={(e) => handleChange('jamSelesai', e.target.value)}
                  required
                  error={
                    waktuTidakValid || bentrok || melebihiBatas
                      ? 'Pilih jam selesai yang valid (maksimal 3 jam).'
                      : ''
                  }
                  helper="Durasi peminjaman maksimal 3 jam."
                  options={[
                    { value: '', label: 'Pilih jam selesai' },
                    ...endOptions.map((time) => ({ value: time, label: time })),
                  ]}
                />
              </div>

              {(bentrok || melebihiBatas || waktuTidakValid) && (
                <div role="alert" aria-live="polite">
                  <StateCard
                    title="Jadwal belum valid"
                    message={
                      waktuTidakValid
                        ? 'Jam selesai harus lebih besar dari jam mulai.'
                        : melebihiBatas
                          ? 'Durasi peminjaman maksimal 3 jam.'
                          : 'Jam yang kamu pilih bentrok dengan jadwal yang sudah ada.'
                    }
                    variant="error"
                  />
                </div>
              )}

              {!bentrok && !melebihiBatas && !waktuTidakValid && form.jamMulai && form.jamSelesai && (
                <div role="status" aria-live="polite" className="space-y-3">
                  <StateCard
                    title="Slot waktu tersedia"
                    message="Waktu yang kamu pilih bisa diajukan untuk peminjaman ruangan."
                    variant="success"
                  />
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                    Ringkasan: <span className="font-semibold">{form.tanggal}</span>, pukul{' '}
                    <span className="font-semibold">
                      {form.jamMulai} - {form.jamSelesai}
                    </span>{' '}
                    ({durasiMenit} menit).
                  </div>
                </div>
              )}

              <FormField
                as="textarea"
                label="Keperluan"
                name="keperluan"
                rows={4}
                value={form.keperluan}
                onChange={(e) => handleChange('keperluan', e.target.value)}
                placeholder="Tuliskan keperluan penggunaan ruangan..."
                required
              />

              <div className="flex flex-wrap gap-4 pt-2">
                <Button to="/layanan" variant="secondary">
                  Kembali
                </Button>

                <Button type="submit" disabled={isSubmitting} variant="primary">
                  {isSubmitting ? 'Mengirim...' : 'Ajukan'}
                </Button>
              </div>
            </form>
          </div>
        </div>

        <div className="mb-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-2xl font-bold">Jadwal Terisi</h2>
            <p className="mt-2 text-slate-600">
              Jadwal ini menampilkan slot yang sudah digunakan pada tanggal yang dipilih.
            </p>
            <div className="mt-4 inline-flex rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
              Tanggal aktif: {form.tanggal}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-slate-50">
                <tr className="text-slate-700">
                  <th className="px-6 py-4 font-semibold">Tanggal</th>
                  <th className="px-6 py-4 font-semibold">Jam</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Kegiatan</th>
                </tr>
              </thead>

              <tbody>
                {occupiedSlots.length > 0 ? (
                  occupiedSlots.map((item, index) => (
                    <tr
                      key={`${item.start}-${item.end}`}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                    >
                      <td className="px-6 py-4 text-slate-700">{form.tanggal}</td>
                      <td className="px-6 py-4 text-slate-700">
                        {item.start} - {item.end}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                          Dipakai
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-700">{item.kegiatan}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-6">
                      <StateCard
                        title="Belum ada jadwal terisi"
                        message="Tidak ada penggunaan ruangan pada tanggal ini, jadi kamu bisa memilih slot yang tersedia di atas."
                        variant="info"
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Butuh bantuan lebih lanjut?</h2>

          <p className="mb-6 leading-8 text-slate-700">
            Untuk konfirmasi lebih lanjut terkait peminjaman ruangan, silakan hubungi admin laboratorium melalui halaman kontak atau email langsung.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button to="/kontak" variant="primary">
              Hubungi Admin
            </Button>

            <Button to="/layanan" variant="outline">
              Lihat Layanan Lain
            </Button>

            <a
              href="mailto:lab-elins@ugm.ac.id"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
            >
              Kirim Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function createInitialForm(todayStr) {
  return {
    nama: '',
    identitas: '',
    tanggal: todayStr,
    jamMulai: '',
    jamSelesai: '',
    keperluan: '',
  }
}

export default PeminjamanRuangan
