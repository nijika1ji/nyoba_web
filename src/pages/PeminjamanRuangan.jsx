import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { submitPeminjamanRuangan } from '../utils/submissionService'

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

  // Dummy jadwal terisi
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
        return {
          nama: '',
          identitas: '',
          tanggal: todayStr,
          jamMulai: '',
          jamSelesai: '',
          keperluan: '',
        }
      }
    }
    return {
      nama: '',
      identitas: '',
      tanggal: todayStr,
      jamMulai: '',
      jamSelesai: '',
      keperluan: '',
    }
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
      setForm({
        nama: '',
        identitas: '',
        tanggal: todayStr,
        jamMulai: '',
        jamSelesai: '',
        keperluan: '',
      })
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
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-700 font-semibold mb-3">
            Layanan
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Peminjaman Ruangan
          </h1>

          <p className="text-gray-700 leading-8">
            Halaman ini menampilkan informasi ruangan, jadwal penggunaan,
            ketersediaan waktu, dan form pengajuan peminjaman ruangan laboratorium.
          </p>
        </div>

        {/* Info ruangan */}
        <div className="grid gap-8 lg:grid-cols-[360px_1fr] mb-12">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-5">Informasi Ruangan</h2>

            <div className="space-y-5 text-slate-700 leading-8">
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
                <p className="text-sm text-slate-500 mb-2">Status Saat Ini</p>
                <span className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                  Tersedia
                </span>
              </div>
            </div>
          </div>

          {/* Form reservasi */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">Form Reservasi Ruangan</h2>

            {submitted && (
              <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status" aria-live="polite">
                <strong>Pengajuan berhasil dikirim!</strong> Form akan direset otomatis. (Backend belum dihubungkan, ini hanya demo frontend.)
              </div>
            )}

            {submitError && (
              <div className="mb-6 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800" role="alert" aria-live="polite">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="field-nama" className="block text-sm font-semibold text-slate-700 mb-2">
                    Nama
                  </label>
                  <input
                    id="field-nama"
                    type="text"
                    value={form.nama}
                    onChange={(e) => handleChange('nama', e.target.value)}
                    placeholder="Masukkan nama"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label htmlFor="field-identitas" className="block text-sm font-semibold text-slate-700 mb-2">
                    NIM / Identitas
                  </label>
                  <input
                    id="field-identitas"
                    type="text"
                    value={form.identitas}
                    onChange={(e) => handleChange('identitas', e.target.value)}
                    placeholder="Masukkan NIM atau identitas"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                    aria-required="true"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="field-ruangan" className="block text-sm font-semibold text-slate-700 mb-2">
                  Ruangan
                </label>
                <input
                  id="field-ruangan"
                  type="text"
                  value={ruangan.nama}
                  disabled
                  className="w-full rounded-xl border border-slate-300 bg-slate-100 px-4 py-3 text-slate-600"
                />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="field-tanggal" className="block text-sm font-semibold text-slate-700 mb-2">
                    Tanggal
                  </label>
                  <input
                    id="field-tanggal"
                    type="date"
                    value={form.tanggal}
                    min={todayStr}
                    onChange={(e) => handleChange('tanggal', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label htmlFor="field-jam-kosong" className="block text-sm font-semibold text-slate-700 mb-2">
                    Jam Kosong Tersedia
                  </label>
                  <div id="field-jam-kosong" className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 min-h-[52px]">
                    {availableRanges.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {availableRanges.map((slot, index) => (
                          <span
                            key={index}
                            className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700"
                          >
                            {slot.start} - {slot.end}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-rose-600 font-medium">
                        Tidak ada slot kosong
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="field-jam-mulai" className="block text-sm font-semibold text-slate-700 mb-2">
                    Jam Mulai
                  </label>
                  <select
                    id="field-jam-mulai"
                    value={form.jamMulai}
                    onChange={(e) => handleChange('jamMulai', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                    aria-required="true"
                    aria-invalid={waktuTidakValid || bentrok}
                  >
                    <option value="">Pilih jam mulai</option>
                    {allTimeOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="field-jam-selesai" className="block text-sm font-semibold text-slate-700 mb-2">
                    Jam Selesai <span className="text-slate-400">(Maks. 3 jam)</span>
                  </label>
                  <select
                    id="field-jam-selesai"
                    value={form.jamSelesai}
                    onChange={(e) => handleChange('jamSelesai', e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                    aria-required="true"
                    aria-invalid={waktuTidakValid || bentrok || melebihiBatas}
                  >
                    <option value="">Pilih jam selesai</option>
                    {endOptions.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {(bentrok || melebihiBatas || waktuTidakValid) && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700 font-medium" role="alert" aria-live="polite">
                  {waktuTidakValid && 'Jam selesai harus lebih besar dari jam mulai.'}
                  {!waktuTidakValid && melebihiBatas && 'Durasi peminjaman maksimal 3 jam.'}
                  {!waktuTidakValid && !melebihiBatas && bentrok && 'Jam yang kamu pilih bentrok dengan jadwal yang sudah ada.'}
                </div>
              )}

              {!bentrok && !melebihiBatas && !waktuTidakValid && form.jamMulai && form.jamSelesai && (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-700 font-medium" role="status" aria-live="polite">
                  Slot waktu yang kamu pilih tersedia.
                </div>
              )}

              {submitError && (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-700 font-medium" role="alert" aria-live="polite">
                  {submitError}
                </div>
              )}

              <div>
                <label htmlFor="field-keperluan" className="block text-sm font-semibold text-slate-700 mb-2">
                  Keperluan
                </label>
                <textarea
                  id="field-keperluan"
                  rows="4"
                  value={form.keperluan}
                  onChange={(e) => handleChange('keperluan', e.target.value)}
                  placeholder="Tuliskan keperluan penggunaan ruangan..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                  aria-required="true"
                />
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  to="/layanan"
                  className="inline-block rounded-xl bg-slate-200 px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-300"
                >
                  Kembali
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? 'Mengirim...' : 'Ajukan'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Jadwal terisi */}
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden mb-12">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-2xl font-bold">Jadwal Terisi</h2>
            <p className="mt-2 text-slate-600">
              Jadwal ini menampilkan slot yang sudah digunakan pada tanggal yang dipilih.
            </p>
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
                    <td colSpan="4" className="px-6 py-6 text-center text-slate-500">
                      Belum ada jadwal terisi pada tanggal ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Kontak */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Kontak Peminjaman Ruangan
          </h2>

          <p className="text-slate-700 leading-8 mb-6">
            Untuk konfirmasi lebih lanjut terkait peminjaman ruangan, silakan
            hubungi admin laboratorium melalui halaman kontak atau email.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/kontak"
              className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Lihat Kontak
            </Link>

            <a
              href="mailto:lab-elins@ugm.ac.id"
              className="inline-block rounded-xl border border-blue-600 px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
            >
              Kirim Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PeminjamanRuangan