import { Link } from 'react-router-dom'

function Layanan() {
  const layananList = [
    {
      id: 1,
      judul: 'Layanan Praktikum',
      deskripsi:
        'Mendukung pelaksanaan praktikum yang berkaitan dengan elektronika, instrumentasi, jaringan sensor, dan sistem kendali.',
    },
    {
      id: 2,
      judul: 'Pendampingan Project',
      deskripsi:
        'Memberikan pendampingan dalam pengembangan project mahasiswa, tugas akhir, maupun kegiatan riset.',
    },
    {
      id: 3,
      judul: 'Konsultasi Akademik dan Teknis',
      deskripsi:
        'Memberikan arahan awal terkait penggunaan alat, pengembangan sistem, maupun eksperimen di bidang elektronika dan instrumentasi.',
    },
    {
      id: 4,
      judul: 'Penggunaan Fasilitas Laboratorium',
      deskripsi:
        'Menyediakan akses penggunaan peralatan dan fasilitas laboratorium untuk kegiatan akademik dan riset.',
    },
    {
      id: 5,
      judul: 'Pengujian dan Eksperimen',
      deskripsi:
        'Mendukung kegiatan pengujian perangkat, pengambilan data, dan eksperimen laboratorium sesuai kebutuhan.',
    },
  ]

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef5ff_55%,#ffffff_100%)]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-700 font-semibold mb-3">
            Layanan
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Layanan Laboratorium
          </h1>

          <p className="text-gray-700 leading-8">
            Laboratorium Riset Elektronika dan Instrumentasi menyediakan
            berbagai layanan untuk mendukung kegiatan akademik, penelitian,
            dan pengembangan project.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {layananList.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-2xl font-bold mb-4">{item.judul}</h2>
              <p className="text-gray-700 leading-8">{item.deskripsi}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Butuh informasi lebih lanjut?
            </h2>

            <p className="text-gray-700 leading-8 mb-6">
              Untuk informasi lebih lanjut terkait layanan, penggunaan fasilitas,
              maupun konsultasi kegiatan akademik dan riset, silakan menghubungi
              Laboratorium Riset Elektronika dan Instrumentasi melalui halaman
              kontak.
            </p>

            <Link
              to="/kontak"
              className="inline-block bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
            >
              Hubungi Kami
            </Link>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-blue-200">
              Shortcut Cepat
            </p>
            <h2 className="mt-3 text-2xl font-bold">Akses layanan paling sering dipakai</h2>
            <div className="mt-6 space-y-3">
              <Link
                to="/layanan/peminjaman-alat"
                className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-4 text-sm font-semibold transition hover:bg-white/15"
              >
                <span>Peminjaman Alat</span>
                <span>→</span>
              </Link>
              <Link
                to="/layanan/peminjaman-ruangan"
                className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-4 text-sm font-semibold transition hover:bg-white/15"
              >
                <span>Peminjaman Ruangan</span>
                <span>→</span>
              </Link>
              <Link
                to="/kontak"
                className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-4 text-sm font-semibold transition hover:bg-white/15"
              >
                <span>Konsultasi & Kontak</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layanan