import { Link } from 'react-router-dom'
import projects from '../data/projects'

function Home() {
  const previewProjects = projects.slice(0, 4)
  const fallbackImage = '/bg-gedung.jpg'

  const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
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
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: 'easeOut' },
    },
  }

  return (
    <div className="overflow-x-hidden bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative min-h-[88vh] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/bg-gedung.jpg')" }}
          initial={{ scale: 1 }}
          animate={{ scale: 1.08, y: -8 }}
          transition={{
            duration: 14,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-900/35" />

        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_left_top,rgba(59,130,246,0.16),transparent_30%)]"
          animate={{ x: [0, 20, 0], y: [0, -12, 0], opacity: [0.6, 0.9, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-slate-50 to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-6xl items-center px-6 pt-28 pb-20">
          <motion.div
            className="max-w-3xl text-left text-white"
            variants={staggerWrap}
            initial="hidden"
            animate="show"
          >
            <motion.p
              variants={fadeUp}
              className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-blue-200"
            >
              ELINS FMIPA UGM
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-white"
            >
              Laboratorium Riset Elektronika dan Instrumentasi
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-base leading-8 text-slate-200 md:text-lg"
            >
              Laboratorium Riset Elektronika dan Instrumentasi merupakan
              laboratorium penelitian di bawah Departemen Ilmu Komputer dan
              Elektronika, FMIPA UGM. Laboratorium ini berfokus pada bidang
              elektronika, instrumentasi, jaringan sensor, serta sistem kendali
              dan teknologinya untuk mendukung pendidikan, penelitian, dan
              pengabdian kepada masyarakat.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 h-1 w-24 rounded-full bg-white/70"
            />
          </motion.div>
        </div>
      </section>

      {/* PROJECT SECTION */}
      <section className="relative -mt-8 z-20 overflow-hidden rounded-t-[2.5rem] bg-gradient-to-b from-slate-100 via-blue-50 to-white">
        <motion.div
          className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-blue-200/25 blur-3xl"
          animate={{ x: [0, 18, 0], y: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-sky-200/20 blur-3xl"
          animate={{ x: [0, -18, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-white/80" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-24">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-700">
              Project
            </p>

            <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
              Preview Kegiatan Penelitian dan Pengabdian
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              Berikut beberapa project yang menjadi bagian dari kegiatan
              penelitian dan pengabdian di Laboratorium Riset Elektronika dan
              Instrumentasi.
            </p>
          </motion.div>

          <motion.div
            className="space-y-5"
            variants={staggerWrap}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            {previewProjects.map((item) => {
              const isPenelitian = item.jenis === 'penelitian'

              const badgeClass = isPenelitian
                ? 'bg-blue-100 text-blue-700'
                : 'bg-emerald-100 text-emerald-700'

              return (
                <motion.div
                  key={item.id}
                  variants={cardReveal}
                  className="group mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="grid md:grid-cols-[220px_1fr]">
                    <Link
                      to={`/project/${item.jenis}/${item.id}`}
                      className="block overflow-hidden"
                    >
                      <img
                        src={item.gambar}
                        alt={item.judul}
                        className="h-44 w-full object-cover transition duration-700 group-hover:scale-105 md:h-full"
                        onError={(e) => {
                          e.currentTarget.onerror = null
                          e.currentTarget.src = fallbackImage
                        }}
                      />
                    </Link>

                    <div className="flex flex-col justify-center p-5 md:p-6">
                      <div className="mb-3">
                        <span
                          className={`inline-block rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide ${badgeClass}`}
                        >
                          {item.jenis}
                        </span>
                      </div>

                      <Link
                        to={`/project/${item.jenis}/${item.id}`}
                        className="mb-3 text-xl font-bold text-slate-900 transition hover:text-blue-700 md:text-2xl"
                      >
                        {item.judul}
                      </Link>

                      <p className="text-sm leading-7 text-slate-600 md:text-base">
                        {item.deskripsiSingkat}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home