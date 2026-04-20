import { Link } from 'react-router'
import { useState } from 'react'

function ProjectCard({ item }) {
  const [imgError, setImgError] = useState(false)

  const badgeClass =
    item.jenis === 'penelitian'
      ? 'bg-blue-100 text-blue-700'
      : 'bg-emerald-100 text-emerald-700'

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition duration-300">
      <div className="grid md:grid-cols-[320px_1fr]">
        {!imgError && item.gambar ? (
          <img
            src={item.gambar}
            alt={item.judul}
            className="w-full h-72 md:h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="h-72 md:h-full bg-slate-200 flex items-center justify-center px-6 text-center">
            <p className="text-slate-500 font-semibold">Preview Project</p>
          </div>
        )}

        <div className="p-8 flex flex-col justify-center">
          <div className="mb-4">
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide ${badgeClass}`}
            >
              {item.jenis}
            </span>
          </div>

          <Link
            to={`/project/${item.jenis}/${item.id}`}
            className="text-2xl md:text-3xl font-bold text-slate-900 hover:text-blue-700 transition mb-4"
          >
            {item.judul}
          </Link>

          <p className="text-gray-700 leading-8">{item.deskripsiSingkat}</p>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard