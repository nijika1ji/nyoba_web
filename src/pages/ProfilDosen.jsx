function ProfilDosen() {
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

  const dosenList = [
    {
      nama: 'Nama Dosen 1',
      jabatan: 'Dosen / Peneliti',
      bidang: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      email: 'dosen1@ugm.ac.id',
    },
    {
      nama: 'Nama Dosen 2',
      jabatan: 'Dosen / Peneliti',
      bidang: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      email: 'dosen2@ugm.ac.id',
    },
    {
      nama: 'Nama Dosen 3',
      jabatan: 'Dosen / Peneliti',
      bidang: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      email: 'dosen3@ugm.ac.id',
    },
    {
      nama: 'Nama Dosen 4',
      jabatan: 'Dosen / Peneliti',
      bidang: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      email: 'dosen4@ugm.ac.id',
    },
  ]

  const getInitials = (name) =>
    name
      .split(' ')
      .slice(0, 2)
      .map((word) => word[0])
      .join('')
      .toUpperCase()

  return (
    <main className="overflow-x-hidden bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />

        <motion.div
          className="absolute -left-16 top-8 h-72 w-72 rounded-full bg-blue-400/15 blur-3xl"
          animate={{ x: [0, 18, 0], y: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute right-0 top-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl"
          animate={{ x: [0, -18, 0], y: [0, -12, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:52px_52px] opacity-[0.06]" />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-32 pb-28">
          <motion.div
            variants={staggerWrap}
            initial="hidden"
            animate="show"
            className="max-w-4xl"
          >
            <motion.p
              variants={fadeUp}
              className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-blue-300"
            >
              Profil Dosen
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-4xl font-extrabold leading-tight text-white md:text-6xl"
            >
              Dosen dan Pengampu Laboratorium ELINS
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante venenatis dapibus posuere velit aliquet. Donec
              ullamcorper nulla non metus auctor fringilla.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CARD DOSEN */}
      <section className="relative z-20 overflow-hidden rounded-t-[2.5rem] bg-gradient-to-b from-slate-100 via-blue-50 to-white">
        <motion.div
          className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-blue-200/25 blur-3xl"
          animate={{ x: [0, 16, 0], y: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <motion.div
          className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-sky-200/20 blur-3xl"
          animate={{ x: [0, -16, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-12 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-700">
              Daftar Dosen
            </p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
              Profil Pengampu Laboratorium
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante venenatis dapibus posuere velit aliquet.
            </p>
          </motion.div>

          <motion.div
            variants={staggerWrap}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            {dosenList.map((dosen) => (
              <motion.div
                key={dosen.nama}
                variants={cardReveal}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-700">
                  {getInitials(dosen.nama)}
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {dosen.nama}
                </h3>

                <p className="mt-2 text-sm font-medium text-blue-700">
                  {dosen.jabatan}
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {dosen.bidang}
                </p>

                <div className="mt-5 border-t border-slate-200 pt-4">
                  <div className="text-xs uppercase tracking-[0.25em] text-slate-400">
                    Kontak
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{dosen.email}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default ProfilDosen