function RoomScheduleCalendar({
  tanggal,
  occupiedSlots,
  jamMulai,
  jamSelesai,
  onSelectRange,
}) {
  const timeToMinutes = (time) => {
    const [hour, minute] = time.split(':').map(Number)
    return hour * 60 + minute
  }

  const minutesToTime = (minutes) => {
    const hour = String(Math.floor(minutes / 60)).padStart(2, '0')
    const minute = String(minutes % 60).padStart(2, '0')
    return `${hour}:${minute}`
  }

  const generateSlots = () => {
    const slots = []
    let current = timeToMinutes('08:00')
    const end = timeToMinutes('16:00')

    while (current < end) {
      slots.push({
        start: minutesToTime(current),
        end: minutesToTime(current + 30),
      })

      current += 30
    }

    return slots
  }

  const slots = generateSlots()

  const isOverlap = (startA, endA, startB, endB) => {
    return timeToMinutes(startA) < timeToMinutes(endB) &&
      timeToMinutes(endA) > timeToMinutes(startB)
  }

  const getOccupiedSlot = (slot) => {
    return occupiedSlots.find((item) =>
      isOverlap(slot.start, slot.end, item.start, item.end)
    )
  }

  const isSelectedSlot = (slot) => {
    if (!jamMulai || !jamSelesai) return false

    return isOverlap(slot.start, slot.end, jamMulai, jamSelesai)
  }

  const getSlotStatus = (slot) => {
    const occupied = getOccupiedSlot(slot)
    const selected = isSelectedSlot(slot)

    if (occupied && selected) return 'bentrok'
    if (occupied) return occupied.status
    if (selected) return 'dipilih'

    return 'kosong'
  }

  const statusStyle = {
    kosong: 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
    pending: 'border-amber-200 bg-amber-50 text-amber-700',
    disetujui: 'border-blue-200 bg-blue-50 text-blue-700',
    bentrok: 'border-red-200 bg-red-50 text-red-700',
    dipilih: 'border-indigo-200 bg-indigo-50 text-indigo-700',
  }

  const statusLabel = {
    kosong: 'Kosong',
    pending: 'Pending',
    disetujui: 'Disetujui',
    bentrok: 'Bentrok',
    dipilih: 'Dipilih',
  }

  const handleClickSlot = (slot) => {
    const status = getSlotStatus(slot)

    if (status === 'pending' || status === 'disetujui' || status === 'bentrok') {
      return
    }

    if (!jamMulai || jamSelesai) {
      onSelectRange(slot.start, slot.end)
      return
    }

    const startMinutes = timeToMinutes(jamMulai)
    const clickedEndMinutes = timeToMinutes(slot.end)
    const duration = clickedEndMinutes - startMinutes

    if (clickedEndMinutes <= startMinutes) {
      onSelectRange(slot.start, slot.end)
      return
    }

    if (duration > 180) {
      onSelectRange(jamMulai, '')
      return
    }

    onSelectRange(jamMulai, slot.end)
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Kalender Jadwal Ruangan
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Tanggal dipilih: {tanggal || '-'}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
            Kosong
          </span>
          <span className="rounded-full bg-amber-50 px-3 py-1 text-amber-700">
            Pending
          </span>
          <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-700">
            Disetujui
          </span>
          <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
            Dipilih
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {slots.map((slot) => {
          const status = getSlotStatus(slot)
          const occupied = getOccupiedSlot(slot)

          return (
            <button
              key={`${slot.start}-${slot.end}`}
              type="button"
              onClick={() => handleClickSlot(slot)}
              disabled={status === 'pending' || status === 'disetujui' || status === 'bentrok'}
              className={`rounded-2xl border px-4 py-3 text-left transition ${
                statusStyle[status] || statusStyle.kosong
              } ${
                status === 'pending' || status === 'disetujui' || status === 'bentrok'
                  ? 'cursor-not-allowed opacity-80'
                  : 'cursor-pointer'
              }`}
            >
              <p className="font-bold">
                {slot.start} - {slot.end}
              </p>

              <p className="mt-1 text-xs font-semibold uppercase tracking-wide">
                {statusLabel[status]}
              </p>

              {occupied?.kegiatan && (
                <p className="mt-2 line-clamp-2 text-xs leading-5 opacity-80">
                  {occupied.kegiatan}
                </p>
              )}
            </button>
          )
        })}
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">
        Klik slot kosong untuk memilih jam. Klik slot kosong berikutnya untuk
        memperpanjang jam selesai. Durasi tetap dibatasi maksimal 3 jam.
      </p>
    </div>
  )
}

export default RoomScheduleCalendar