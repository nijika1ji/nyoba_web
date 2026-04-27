import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6">
      <div className="max-w-2xl text-center">
        <div className="mb-6 text-8xl font-extrabold text-slate-300">404</div>

        <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
          Halaman Tidak Ditemukan
        </h1>

        <p className="mb-8 text-lg leading-8 text-slate-600">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Kembali ke Home
          </Link>

          <Link
            to="/layanan"
            className="inline-block rounded-xl border border-blue-600 px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Lihat Layanan
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
