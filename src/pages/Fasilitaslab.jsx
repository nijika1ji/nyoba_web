function FasilitasLab() {
  const fasilitas = [
    'Ruang praktikum elektronika',
    'Osiloskop digital',
    'Function generator',
    'Power supply DC',
    'Komputer untuk simulasi',
    'Peralatan pengukuran dan pengujian',
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-4">Fasilitas Lab</h1>
      <p className="text-gray-600 mb-8">
        Fasilitas laboratorium yang mendukung kegiatan praktikum dan riset.
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {fasilitas.map((item, index) => (
          <div key={index} className="border rounded-xl p-4 shadow-sm">
            <p className="text-gray-700">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FasilitasLab