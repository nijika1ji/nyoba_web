import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiRequest } from '../services/api'
import RoomScheduleCalendar from '../components/RoomScheduleCalendar'

function PeminjamanRuangan() {
  const today = new Date()
  const oneDay = 24 * 60 * 60 * 1000

  const formatDate = (date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  const todayStr = formatDate(today)

  const [ruanganList, setRuanganList] = useState([])
  const [jadwalList, setJadwalList] = useState([])
  const [loading, setLoading] = useState(true)

  const [form, setForm] = useState({
    ruanganId: '',
    nama: '',
    identitas: '',
    tanggal: todayStr,
    jamMulai: '',
    jamSelesai: '',
    keperluan: '',
  })

  const selectedRuangan = ruanganList.find(
    (item) => String(item.id) === String(form.ruanganId)
  )

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

  const fetchRuangan = async () => {
    try {
      const data = await apiRequest('/ruangan')
      setRuanganList(data)

      if (data.length > 0) {
        setForm((prev) => ({
          ...prev,
          ruanganId: prev.ruanganId || data[0].id,
        }))
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchJadwal = async () => {
    if (!form.tanggal) return

    try {
      const data = await apiRequest(`/peminjaman-ruangan?tanggal=${form.tanggal}`)
      setJadwalList(data)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    fetchRuangan()
  }, [])

  useEffect(() => {
    fetchJadwal()
  }, [form.tanggal])

  const occupiedSlots = useMemo(() => {
    return jadwalList
      .filter((item) => String(item.ruanganId) === String(form.ruanganId))
      .filter((item) => ['pending', 'disetujui'].includes(item.status))
      .map((item) => ({
        start: item.jamMulai,
        end: item.jamSelesai,
        status: item.status,
      }))
  }, [jadwalList, form.ruanganId])

  const availableRanges = useMemo(() => {
    const openStart = timeToMinutes('08:00')
    const openEnd = timeToMinutes('16:00')

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
  }, [occupiedSlots])

  const bentrok = useMemo(() => {
    if (!form.jamMulai || !form.jamSelesai) return false

    const mulai = timeToMinutes(form.jamMulai)
    const selesai = timeToMinutes(form.jamSelesai)

    if (selesai <= mulai) return true

    return occupiedSlots.some((slot) => {
      const slotMulai = timeToMinutes(slot.start)
      const slotSelesai = timeToMinutes(slot.end)

      return mulai < slotSelesai && selesai > slotMulai
    })
  }, [form.jamMulai, form.jamSelesai, occupiedSlots])

  const durasiMenit = useMemo(() => {
    if (!form.jamMulai || !form.jamSelesai) return 0
    return timeToMinutes(form.jamSelesai) - timeToMinutes(form.jamMulai)
  }, [form.jamMulai, form.jamSelesai])

  const melebihiBatas = durasiMenit > 180
  const waktuTidakValid = form.jamMulai && form.jamSelesai && durasiMenit <= 0

  const endOptions = useMemo(() => {
    if (!form.jamMulai) return allTimeOptions

    const mulai = timeToMinutes(form.jamMulai)

    return allTimeOptions.filter((time) => {
      const current = timeToMinutes(time)
      return current > mulai && current <= mulai + 180
    })
  }, [form.jamMulai])

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'tanggal' ? { jamMulai: '', jamSelesai: '' } : {}),
      ...(field === 'ruanganId' ? { jamMulai: '', jamSelesai: '' } : {}),
      ...(field === 'jamMulai' ? { jamSelesai: '' } : {}),
    }))
  }

  const handleCalendarSelect = (jamMulaiBaru, jamSelesaiBaru) => {
    setForm((prev) => ({
      ...prev,
      jamMulai: jamMulaiBaru,
      jamSelesai: jamSelesaiBaru,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (
      !form.ruanganId ||
      !form.nama ||
      !form.identitas ||
      !form.tanggal ||
      !form.jamMulai ||
      !form.jamSelesai ||
      !form.keperluan
    ) {
      alert('Mohon lengkapi semua data terlebih dahulu.')
      return
    }

    if (waktuTidakValid) {
      alert('Jam selesai harus lebih besar dari jam mulai.')
      return
    }

    if (melebihiBatas) {
      alert('Durasi peminjaman maksimal 3 jam.')
      return
    }

    if (bentrok) {
      alert('Jam yang dipilih bentrok dengan jadwal yang sudah ada.')
      return
    }

    try {
      await apiRequest('/peminjaman-ruangan', {
        method: 'POST',
        body: JSON.stringify({
          ruangan_id: form.ruanganId,
          nama_peminjam: form.nama,
          identitas: form.identitas,
          tanggal: form.tanggal,
          jam_mulai: form.jamMulai,
          jam_selesai: form.jamSelesai,
          keperluan: form.keperluan,
        }),
      })

      alert('Pengajuan peminjaman ruangan berhasil dikirim.')

      setForm((prev) => ({
        ...prev,
        nama: '',
        identitas: '',
        jamMulai: '',
        jamSelesai: '',
        keperluan: '',
      }))

      fetchJadwal()
    } catch (error) {
      alert(error.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-14">
        Memuat data ruangan...
      </div>
    )
  }

  if (ruanganList.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 px-6 py-14">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            Belum ada data ruangan
          </h1>
          <p className="mt-3 text-slate-600">
            Tambahkan ruangan dulu lewat halaman admin.
          </p>
          <Link
            to="/admin/ruangan"
            className="mt-5 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white"
          >
            Kelola Ruangan
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef5ff_55%,#ffffff_100%)]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
            Layanan
          </p>

          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            Peminjaman Ruangan
          </h1>

          <p className="leading-8 text-gray-700">
            Halaman ini menampilkan informasi ruangan, jadwal penggunaan,
            ketersediaan waktu, dan form pengajuan peminjaman ruangan
            laboratorium.
          </p>
        </div>

        <div className="mb-12 grid gap-8 lg:grid-cols-[360px_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-5 text-2xl font-bold">Informasi Ruangan</h2>

            <div className="space-y-5 leading-8 text-slate-700">
              <div>
                <p className="font-semibold text-slate-900">Nama Ruangan</p>
                <p>{selectedRuangan?.nama}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Fungsi</p>
                <p>{selectedRuangan?.fungsi || '-'}</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">
                  Jam Operasional
                </p>
                <p>{selectedRuangan?.jamOperasional || '-'}</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="mb-2 text-sm text-slate-500">Status Saat Ini</p>
                <span className="inline-block rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold uppercase text-emerald-700">
                  {selectedRuangan?.status || 'tersedia'}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-bold">
              Form Reservasi Ruangan
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Nama"
                  value={form.nama}
                  onChange={(value) => handleChange('nama', value)}
                  placeholder="Masukkan nama"
                />

                <Field
                  label="NIM / Identitas"
                  value={form.identitas}
                  onChange={(value) => handleChange('identitas', value)}
                  placeholder="Masukkan NIM atau identitas"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Ruangan
                </label>
                <select
                  value={form.ruanganId}
                  onChange={(event) =>
                    handleChange('ruanganId', event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                >
                  {ruanganList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Tanggal
                  </label>
                  <input
                    type="date"
                    value={form.tanggal}
                    min={todayStr}
                    onChange={(event) =>
                      handleChange('tanggal', event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Jam Kosong Tersedia
                  </label>
                  <div className="min-h-[52px] rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700">
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
                      <span className="font-medium text-rose-600">
                        Tidak ada slot kosong
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <RoomScheduleCalendar
                tanggal={form.tanggal}
                occupiedSlots={occupiedSlots}
                jamMulai={form.jamMulai}
                jamSelesai={form.jamSelesai}
                onSelectRange={handleCalendarSelect}
              />

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Jam Mulai
                  </label>
                  <select
                    value={form.jamMulai}
                    onChange={(event) =>
                      handleChange('jamMulai', event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
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
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Jam Selesai{' '}
                    <span className="text-slate-400">(Maks. 3 jam)</span>
                  </label>
                  <select
                    value={form.jamSelesai}
                    onChange={(event) =>
                      handleChange('jamSelesai', event.target.value)
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
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
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 font-medium text-rose-700">
                  {waktuTidakValid &&
                    'Jam selesai harus lebih besar dari jam mulai.'}
                  {!waktuTidakValid &&
                    melebihiBatas &&
                    'Durasi peminjaman maksimal 3 jam.'}
                  {!waktuTidakValid &&
                    !melebihiBatas &&
                    bentrok &&
                    'Jam yang kamu pilih bentrok dengan jadwal yang sudah ada.'}
                </div>
              )}

              {!bentrok &&
                !melebihiBatas &&
                !waktuTidakValid &&
                form.jamMulai &&
                form.jamSelesai && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 font-medium text-emerald-700">
                    Slot waktu yang kamu pilih tersedia.
                  </div>
                )}

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Keperluan
                </label>
                <textarea
                  rows="4"
                  value={form.keperluan}
                  onChange={(event) =>
                    handleChange('keperluan', event.target.value)
                  }
                  placeholder="Tuliskan keperluan penggunaan ruangan..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
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
                  className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                  Ajukan
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mb-12 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-2xl font-bold">Jadwal Terisi</h2>
            <p className="mt-2 text-slate-600">
              Jadwal ini menampilkan slot yang sudah digunakan pada tanggal
              yang dipilih.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left">
              <thead className="bg-slate-50">
                <tr className="text-slate-700">
                  <th className="px-6 py-4 font-semibold">Tanggal</th>
                  <th className="px-6 py-4 font-semibold">Jam</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>

              <tbody>
                {occupiedSlots.length > 0 ? (
                  occupiedSlots.map((item, index) => (
                    <tr
                      key={`${item.start}-${item.end}-${index}`}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                    >
                      <td className="px-6 py-4 text-slate-700">
                        {form.tanggal}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {item.start} - {item.end}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold uppercase text-blue-700">
                          Digunakan
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="px-6 py-6 text-center text-slate-500"
                    >
                      Belum ada jadwal terisi pada tanggal ini.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">
            Kontak Peminjaman Ruangan
          </h2>

          <p className="mb-6 leading-8 text-slate-700">
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

function Field({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  )
}

export default PeminjamanRuangan
