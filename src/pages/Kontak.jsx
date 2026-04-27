import Button from '../components/ui/Button'

const WHATSAPP_NUMBER = '6289668597807'
const EMAIL_ADDRESS = 'bagussatria79@gmail.com'
const MAPS_QUERY = 'Electronics and Instrumentation Research Laboratory, Yogyakarta'

function Kontak() {
  const whatsappMessage =
    'Halo admin, saya ingin bertanya terkait layanan laboratorium.'
  const emailSubject = 'Pertanyaan Layanan Laboratorium'
  const emailBody =
    'Halo admin,%0D%0A%0D%0ASaya ingin bertanya terkait layanan laboratorium.%0D%0A%0D%0ATerima kasih.'

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    whatsappMessage
  )}`

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL_ADDRESS}&su=${encodeURIComponent(
    emailSubject
  )}&body=${emailBody}`

  const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    MAPS_QUERY
  )}&z=15&output=embed`

  const mapsOpenUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    MAPS_QUERY
  )}`

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef5ff_45%,#ffffff_100%)]">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-blue-700">
            Kontak
          </p>

          <h1 className="mb-4 text-4xl font-bold text-slate-950 md:text-5xl">
            Hubungi Kami
          </h1>

          <p className="mx-auto max-w-3xl text-slate-700 leading-8">
            Untuk informasi layanan, peminjaman alat, atau peminjaman ruangan,
            silakan hubungi admin melalui WhatsApp, Gmail, atau kunjungi lokasi
            laboratorium.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M12.04 2C6.56 2 2.1 6.44 2.1 11.92c0 1.76.46 3.48 1.34 5L2 22l5.23-1.37a9.88 9.88 0 0 0 4.8 1.23h.01c5.48 0 9.93-4.45 9.93-9.93C21.97 6.45 17.52 2 12.04 2Zm0 18.18h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.17 8.17 0 0 1-1.27-4.42c0-4.52 3.68-8.2 8.21-8.2 2.19 0 4.24.85 5.79 2.4a8.13 8.13 0 0 1 2.41 5.8c0 4.52-3.69 8.21-8.19 8.21Zm4.5-6.12c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.12-.57.12-.17.24-.66.8-.81.96-.15.17-.3.18-.55.06-.25-.12-1.06-.39-2.02-1.25a7.58 7.58 0 0 1-1.4-1.75c-.15-.24-.02-.37.11-.49.11-.11.25-.3.37-.45.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.57-1.36-.77-1.86-.2-.49-.41-.42-.57-.43h-.49c-.17 0-.43.06-.65.31-.23.24-.86.84-.86 2.04s.88 2.36 1 2.52c.12.17 1.73 2.65 4.2 3.71.59.25 1.05.4 1.41.51.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.68-1.17.21-.57.21-1.06.15-1.17-.06-.11-.23-.17-.48-.29Z" />
                  </svg>
                </div>

                <h2 className="text-xl font-bold text-slate-950">WhatsApp</h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Kirim pertanyaan atau kebutuhan administrasi melalui WhatsApp.
                </p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block text-sm font-bold text-emerald-600 transition hover:text-emerald-700"
                >
                  Chat via WhatsApp →
                </a>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-6 w-6"
                  >
                    <path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 17.25V6.75Zm2.57-.75 7.18 5.38a1.25 1.25 0 0 0 1.5 0L19.93 6H4.07Z" />
                  </svg>
                </div>

                <h2 className="text-xl font-bold text-slate-950">Gmail</h2>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Kirim pertanyaan atau kebutuhan administrasi melalui Gmail.
                </p>

                <a
                  href={gmailUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block text-sm font-bold text-blue-600 transition hover:text-blue-700"
                >
                  Kirim via Gmail →
                </a>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <h2 className="text-xl font-bold text-slate-950">Lokasi</h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                Laboratorium Elektronika dan Instrumentasi, Departemen Ilmu
                Komputer dan Elektronika, FMIPA Universitas Gadjah Mada,
                Yogyakarta.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={mapsOpenUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                >
                  Buka Google Maps
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2"
                >
                  Hubungi Admin
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <iframe
              src={mapsEmbedUrl}
              title="Lokasi Laboratorium"
              className="h-[520px] w-full rounded-2xl"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-950">Akses cepat layanan</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Kalau kamu sudah tahu kebutuhanmu, langsung lanjut ke halaman layanan yang paling sesuai tanpa harus kembali ke menu utama.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button to="/layanan" variant="secondary">
              Info Layanan
            </Button>
            <Button to="/layanan/peminjaman-alat" variant="outline">
              Peminjaman Alat
            </Button>
            <Button to="/layanan/peminjaman-ruangan" variant="outline">
              Peminjaman Ruangan
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Kontak