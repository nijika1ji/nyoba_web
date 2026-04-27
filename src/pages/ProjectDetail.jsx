import { useParams } from 'react-router-dom'
import { useState } from 'react'
import projects from '../data/projects'
import Button from '../components/ui/Button'
import StateCard from '../components/ui/StateCard'

function ProjectDetail() {
  const { jenis, id } = useParams()
  const [imgError, setImgError] = useState(false)

  const project = projects.find(
    (item) => item.jenis === jenis && item.id === Number(id)
  )

  if (!project) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef5ff_45%,#ffffff_100%)] px-6 py-14">
        <div className="mx-auto max-w-4xl">
          <StateCard
            title="Project tidak ditemukan"
            message="Project yang kamu cari tidak tersedia. Kembali ke halaman project untuk melihat daftar kegiatan lainnya."
            variant="empty"
            action={{
              to: '/project/penelitian',
              label: 'Lihat daftar project',
              variant: 'secondary',
            }}
          />
        </div>
      </div>
    )
  }

  const badgeClass =
    project.jenis === 'penelitian'
      ? 'bg-blue-100 text-blue-700'
      : 'bg-emerald-100 text-emerald-700'

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef5ff_45%,#ffffff_100%)]">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <Button to={`/project/${project.jenis}`} variant="secondary" className="mb-8">
          Kembali
        </Button>

        {!imgError && project.gambar ? (
          <img
            src={project.gambar}
            alt={project.judul}
            className="mb-8 h-96 w-full rounded-3xl object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="mb-8 flex h-96 w-full items-center justify-center rounded-3xl bg-slate-200">
            <p className="font-semibold text-slate-500">Preview Project</p>
          </div>
        )}

        <div className="mb-4">
          <span
            className={`inline-block rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide ${badgeClass}`}
          >
            {project.jenis}
          </span>
        </div>

        <h1 className="mb-5 text-4xl font-bold md:text-5xl">{project.judul}</h1>

        <p className="text-lg leading-8 text-gray-700">{project.deskripsiLengkap}</p>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-xl font-bold text-slate-900">Langkah berikutnya</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            Tertarik mengembangkan project serupa atau butuh pendampingan lab? Lihat project lain atau hubungi tim laboratorium untuk diskusi lebih lanjut.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button to={`/project/${project.jenis}`} variant="primary">
              Lihat project lainnya
            </Button>
            <Button to="/kontak" variant="outline">
              Hubungi Laboratorium
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
