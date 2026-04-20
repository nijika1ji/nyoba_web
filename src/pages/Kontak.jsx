function Kontak() {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef5ff_55%,#ffffff_100%)]">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-sm uppercase tracking-[0.25em] text-blue-700 font-semibold mb-3">
            Kontak
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hubungi Kami
          </h1>

          <p className="text-gray-700 leading-8">
            Untuk informasi lebih lanjut mengenai kegiatan, layanan, maupun
            penggunaan laboratorium, silakan hubungi kami melalui informasi
            berikut.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-5">Informasi Kontak</h2>

            <div className="space-y-5 text-gray-700 leading-8">
              <div>
                <p className="font-semibold text-slate-900">Alamat</p>
                <p>
                  Departemen Ilmu Komputer dan Elektronika
                  <br />
                  FMIPA Universitas Gadjah Mada
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Email</p>
                <p>lab-elins@ugm.ac.id</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Telepon</p>
                <p>(0274) xxxxxxx</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-5">Jam Operasional</h2>

            <div className="space-y-5 text-gray-700 leading-8">
              <div>
                <p className="font-semibold text-slate-900">Hari Kerja</p>
                <p>Senin – Jumat</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Jam Layanan</p>
                <p>08.00 – 16.00 WIB</p>
              </div>

              <div>
                <p className="font-semibold text-slate-900">Keterangan</p>
                <p>Sabtu, Minggu, dan hari libur nasional tutup.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Kontak