import { motion as Motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import projects from '../data/projects'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
}

const staggerWrap = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
}

const cardReveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

function ProjectPageTemplate({
  jenis,
  kicker,
  title,
  description,
}) {
  const filteredProjects = projects.filter((item) => item.jenis === jenis)
  const fallbackImage = '/bg-gedung.jpg'

  const tone =
    jenis === 'penelitian'
      ? {
          accentText: 'text-blue-300',
          blobOne: 'bg-blue-400/15',
          blobTwo: 'bg-cyan-300/10',
          sectionBlobOne: 'bg-blue-200/25',
          sectionBlobTwo: 'bg-sky-200/20',
          button: 'border-blue-200 text-blue-700 hover:bg-blue-50',
        }
      : {
          accentText: 'text-emerald-300',
          blobOne: 'bg-emerald-400/15',
          blobTwo: 'bg-teal-300/10',
          sectionBlobOne: 'bg-emerald-200/25',
          sectionBlobTwo: 'bg-cyan-200/20',
          button: 'border-emerald-200 text-emerald-700 hover:bg-emerald-50',
        }

  return (
    <main className="overflow-x-hidden bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />

        <Motion.div
          className={`absolute -left-16 top-8 h-72 w-72 rounded-full blur-3xl ${tone.blobOne}`}
          animate={{ x: [0, 18, 0], y: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <Motion.div
          className={`absolute right-0 top-20 h-72 w-72 rounded-full blur-3xl ${tone.blobTwo}`}
          animate={{ x: [0, -18, 0], y: [0, -12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:52px_52px] opacity-[0.06]" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-28">
          <Motion.div
            variants={staggerWrap}
            initial="hidden"
            animate="show"
            className="max-w-4xl"
          >
            <Motion.p
              variants={fadeUp}
              className={`mb-5 text-sm font-semibold uppercase tracking-[0.35em] ${tone.accentText}`}
            >
              {kicker}
            </Motion.p>

            <Motion.h1
              variants={fadeUp}
              className="text-4xl font-extrabold leading-tight text-white md:text-6xl"
            >
              {title}
            </Motion.h1>

            <Motion.p
              variants={fadeUp}
              className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg"
            >
              {description}
            </Motion.p>
          </Motion.div>
        </div>
      </section>

      {/* LIST SECTION */}
      <section className="relative z-20 -mt-6 overflow-hidden rounded-t-[3.5rem] bg-gradient-to-b from-slate-100 via-blue-50 to-white">
        <Motion.div
          className={`absolute -left-24 top-8 h-72 w-72 rounded-full blur-3xl ${tone.sectionBlobOne}`}
          animate={{ x: [0, 16, 0], y: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <Motion.div
          className={`absolute -right-24 top-20 h-80 w-80 rounded-full blur-3xl ${tone.sectionBlobTwo}`}
          animate={{ x: [0, -16, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-24">
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-slate-500">
                Daftar Project
              </p>

              <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
                Koleksi Kegiatan {jenis === 'penelitian' ? 'Penelitian' : 'Pengabdian'}
              </h2>

              <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
                Berikut daftar project yang sudah ditampilkan di website
                Laboratorium Riset Elektronika dan Instrumentasi.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 shadow-sm backdrop-blur-sm">
              <div className="text-sm text-slate-500">Total Project</div>
              <div className="mt-1 text-2xl font-bold text-slate-900">
                {filteredProjects.length}
              </div>
            </div>
          </Motion.div>

          {filteredProjects.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white/80 px-6 py-14 text-center shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900">
                Belum ada project
              </h3>
              <p className="mx-auto mt-3 max-w-2xl text-slate-600">
                Data project untuk kategori ini belum tersedia di file
                `projects`.
              </p>
            </div>
          ) : (
            <Motion.div
              variants={staggerWrap}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="grid gap-6 md:grid-cols-2"
            >
              {filteredProjects.map((item) => (
                <Motion.article
                  key={item.id}
                  variants={cardReveal}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                >
                  <Link
                    to={`/project/${item.jenis}/${item.id}`}
                    className="block overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={item.gambar}
                        alt={item.judul}
                        className="h-56 w-full object-cover transition duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = fallbackImage
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-transparent" />
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-end">
                      <span className="text-xs uppercase tracking-[0.25em] text-slate-400">
                        ELINS
                      </span>
                    </div>

                    <Link
                      to={`/project/${item.jenis}/${item.id}`}
                      className="block text-2xl font-bold leading-snug text-slate-900 transition hover:text-blue-700"
                    >
                      {item.judul}
                    </Link>

                    <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                      {item.deskripsiSingkat}
                    </p>

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <span className="text-sm text-slate-500">
                        Laboratorium ELINS
                      </span>

                      <Link
                        to={`/project/${item.jenis}/${item.id}`}
                        className={`inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm font-semibold transition ${tone.button}`}
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                </Motion.article>
              ))}
            </Motion.div>
          )}
        </div>
      </section>
    </main>
  )
}

export default ProjectPageTemplate