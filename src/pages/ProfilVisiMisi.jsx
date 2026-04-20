function ProfilVisiMisi() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Visi dan Misi</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="border rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Visi</h2>
          <p className="text-gray-600 leading-7">
            Menjadi laboratorium yang unggul dalam pembelajaran, praktikum,
            dan pengembangan inovasi di bidang elektronika dan instrumentasi.
          </p>
        </div>

        <div className="border rounded-xl p-5 shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Misi</h2>
          <p className="text-gray-600 leading-7">
            Menyediakan fasilitas, layanan, serta dukungan akademik yang
            mendukung kegiatan praktikum, penelitian, dan project mahasiswa.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfilVisiMisi