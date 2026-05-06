import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import alatLab from '../data/alatLab'
import { findAlatBySlug, slugify } from '../utils/alatHelpers'
import { apiRequest } from '../services/api'

function AjukanPeminjamanAlat() {
  const { slug } = useParams()
  const alat = findAlatBySlug(slug, alatLab)

  const [form, setForm] = useState({
    nama: '',
    identitas: '',
    kontak: '',
    keperluan: '',
    jumlah: 1,
    tanggalPinjam: '',
    tanggalKembali: '',
    catatan: '',
  })

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
    if (isInvalid) return

    try {
      await apiRequest('/peminjaman-alat', {
        method: 'POST',
        body: JSON.stringify({
          alat_id: alat.id,
          nama_peminjam: form.nama,
          identitas: form.identitas,
          kontak: form.kontak,
          jumlah: form.jumlah,
          tanggal_pinjam: form.tanggalPinjam,
          tanggal_kembali: form.tanggalKembali,
          keperluan: form.keperluan,
          catatan: form.catatan,
        }),
      })

      alert('Pengajuan peminjaman berhasil dikirim. Menunggu persetujuan admin.')
    } catch (error) {
      alert(error.message)
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

          <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
            <Field
              label="Nama Peminjam"
              name="nama"
              value={form.nama}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
            />
            <Field
              label="NIM / NIP"
              name="identitas"
              value={form.identitas}
              onChange={handleChange}
              placeholder="Masukkan NIM atau NIP"
            />
            <Field
              label="Kontak"
              name="kontak"
              value={form.kontak}
              onChange={handleChange}
              placeholder="Nomor HP / email"
            />
            <Field
              label="Jumlah Unit"
              name="jumlah"
              type="number"
              min={1}
              max={alat.tersedia || 1}
              value={form.jumlah}
              onChange={handleChange}
            />

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Keperluan
              </label>
              <textarea
                name="keperluan"
                value={form.keperluan}
                onChange={handleChange}
                rows={3}
                placeholder="Tuliskan keperluan peminjaman"
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
              />
            </div>

            <Field
              label="Tanggal Pinjam"
              name="tanggalPinjam"
              type="date"
              value={form.tanggalPinjam}
              onChange={handleChange}
            />
            <Field
              label="Tanggal Kembali"
              name="tanggalKembali"
              type="date"
              value={form.tanggalKembali}
              onChange={handleChange}
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
                disabled={isInvalid}
                className="inline-flex items-center rounded-md bg-amber-400 px-6 py-3 text-sm font-bold uppercase text-black shadow-[0_4px_0_0_#92400e] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Kirim Pengajuan
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
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:bg-white"
      />
    </div>
  )
}

export default AjukanPeminjamanAlat