import { Link, useParams } from 'react-router-dom'
import { useState } from 'react'
import projects from '../data/projects'

function ProjectDetail() {
  const { jenis, id } = useParams()
  const [imgError, setImgError] = useState(false)

  const project = projects.find(
    (item) => item.jenis === jenis && item.id === Number(id)
  )

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-4">Project tidak ditemukan</h1>
        <Link
          to="/"
          className="inline-block px-5 py-3 rounded-xl bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
        >
          Kembali
        </Link>
      </div>
    )
  }

  const badgeClass =
    project.jenis === 'penelitian'
      ? 'bg-blue-100 text-blue-700'
      : 'bg-emerald-100 text-emerald-700'

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <Link
          to={`/project/${project.jenis}`}
          className="inline-block mb-8 px-5 py-3 rounded-xl bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
        >
          Kembali
        </Link>

        {!imgError && project.gambar ? (
          <img
            src={project.gambar}
            alt={project.judul}
            className="w-full h-96 object-cover rounded-3xl mb-8"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-96 rounded-3xl mb-8 bg-slate-200 flex items-center justify-center">
            <p className="text-slate-500 font-semibold">Preview Project</p>
          </div>
        )}

        <div className="mb-4">
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide ${badgeClass}`}
          >
            {project.jenis}
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold mb-5">{project.judul}</h1>

        <p className="text-gray-700 leading-8 text-lg">
          {project.deskripsiLengkap}
        </p>
      </div>
    </div>
  )
}

export default ProjectDetail