import { useEffect, useState } from 'react'
import { getProjects } from '../api'
import ProjectCard from '../components/ProjectCard'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    getProjects().then(setProjects).finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'featured' ? projects.filter((p) => p.featured) : projects

  return (
    <section className="container-page py-16 sm:py-20">
      <div className="mb-10">
        <h1 className="section-title">Projects</h1>
        <p className="section-sub !mb-6">All the things I've worked on</p>

        {/* Filter tabs */}
        <div className="inline-flex bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-1 gap-1">
          {[['all', 'All'], ['featured', 'Featured']].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilter(val)}
              className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all ${
                filter === val
                  ? 'gradient-bg text-white shadow-md shadow-indigo-950/50'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="card h-72 animate-pulse bg-gray-200/60 dark:bg-gray-800/30" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          No projects found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      )}
    </section>
  )
}
