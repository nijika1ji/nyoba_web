import { motion as Motion } from 'framer-motion'

function Profil() {
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

  const fokusLab = [
    {
      title: 'Elektronika',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',
    },
    {
      title: 'Instrumentasi',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras mattis consectetur purus sit amet fermentum.',
    },
    {
      title: 'Jaringan Sensor',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacinia bibendum nulla sed consectetur.',
    },
    {
      title: 'Sistem Kendali',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui, sed posuere consectetur est at lobortis.',
    },
  ]

  return (
    <main className="overflow-x-hidden bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800" />

        <Motion.div
          className="absolute -left-16 top-8 h-72 w-72 rounded-full bg-blue-400/15 blur-3xl"
          animate={{ x: [0, 18, 0], y: [0, 12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <Motion.div
          className="absolute right-0 top-20 h-72 w-72 rounded-full bg-cyan-300/10 blur-3xl"
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
              className="mb-5 text-sm font-semibold uppercase tracking-[0.35em] text-blue-300"
            >
              Profil Laboratorium
            </Motion.p>

            <Motion.h1
              variants={fadeUp}
              className="text-4xl font-extrabold leading-tight text-white md:text-6xl"
            >
              Laboratorium Riset Elektronika dan Instrumentasi
            </Motion.h1>

            <Motion.p
              variants={fadeUp}
              className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante venenatis dapibus posuere velit aliquet. Donec
              ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula
              porta felis euismod semper.
            </Motion.p>
          </Motion.div>
        </div>
      </section>

      {/* TENTANG LAB */}
      <section className="relative z-20 overflow-hidden rounded-t-[2.5rem] bg-gradient-to-b from-slate-100 via-blue-50 to-white">
        <Motion.div
          className="absolute -left-24 top-8 h-72 w-72 rounded-full bg-blue-200/25 blur-3xl"
          animate={{ x: [0, 16, 0], y: [0, 10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />

        <Motion.div
          className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-sky-200/20 blur-3xl"
          animate={{ x: [0, -16, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-20 pb-24">
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-700">
              Tentang Lab
            </p>

            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
              Gambaran Umum Laboratorium
            </h2>

            <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              posuere consectetur est at lobortis. Maecenas faucibus mollis
              interdum. Donec sed odio dui. Integer posuere erat a ante
              venenatis dapibus posuere velit aliquet.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
              commodo cursus magna, vel scelerisque nisl consectetur et. Aenean
              lacinia bibendum nulla sed consectetur. Cras justo odio, dapibus
              ac facilisis in, egestas eget quam.
            </p>

            <p className="mt-4 text-base leading-8 text-slate-600 md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam id
              dolor id nibh ultricies vehicula ut id elit. Vivamus sagittis
              lacus vel augue laoreet rutrum faucibus dolor auctor.
            </p>
          </Motion.div>
        </div>
      </section>

      {/* FOKUS LAB */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <Motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mb-12 text-center"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-blue-700">
              Fokus Laboratorium
            </p>
            <h2 className="text-3xl font-bold text-slate-900 md:text-5xl">
              Bidang Pengembangan
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              posuere erat a ante venenatis dapibus posuere velit aliquet.
            </p>
          </Motion.div>

          <Motion.div
            variants={staggerWrap}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
          >
            {fokusLab.map((item) => (
              <Motion.div
                key={item.title}
                variants={cardReveal}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <div className="h-12 w-12 rounded-2xl bg-blue-100" />
                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                  {item.desc}
                </p>
              </Motion.div>
            ))}
          </Motion.div>
        </div>
      </section>
    </main>
  )
}

export default Profil