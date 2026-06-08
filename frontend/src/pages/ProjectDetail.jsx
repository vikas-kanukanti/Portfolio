import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProject } from '../api'

export default function ProjectDetail() {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    getProject(id).then(setProject).catch(() => setError(true)).finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="container-page py-16 max-w-4xl">
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-10" />
        <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-4" />
        <div className="h-5 w-full bg-gray-100 dark:bg-gray-800/60 rounded animate-pulse mb-2" />
        <div className="h-5 w-5/6 bg-gray-100 dark:bg-gray-800/60 rounded animate-pulse mb-10" />
        <div className="h-64 w-full bg-gray-100 dark:bg-gray-800/40 rounded-2xl animate-pulse" />
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-gray-500 mb-6">Project not found.</p>
        <Link to="/projects" className="btn-primary">Back to Projects</Link>
      </div>
    )
  }

  return (
    <article className="container-page py-16 sm:py-20 max-w-4xl animate-fade-up">
      <Link to="/projects" className="btn-ghost mb-10 inline-flex">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        All Projects
      </Link>

      <header className="mb-10">
        {project.featured && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 px-2.5 py-1 rounded-full mb-4">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Featured
          </span>
        )}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight mb-5">
          {project.title}
        </h1>
        {project.description && (
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
            {project.description}
          </p>
        )}
      </header>

      {project.image_url && (
        <div className="mb-10 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800">
          <img
            src={project.image_url}
            alt={project.title}
            className="w-full object-cover max-h-[480px]"
          />
        </div>
      )}

      {!project.image_url && (
        <div className="mb-10 w-full h-48 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-200 dark:border-indigo-500/20 flex items-center justify-center">
          <svg className="w-14 h-14 text-indigo-400/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </div>
      )}

      <div className="flex flex-wrap gap-3 mb-12">
        {project.github_url && (
          <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="btn-primary">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View on GitHub
          </a>
        )}
        {project.live_url && (
          <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="btn-outline">
            Live Demo
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>

      {project.tech_stack?.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.tech_stack.map((t) => (
              <span key={t} className="tag !text-sm !px-3 !py-1">{t}</span>
            ))}
          </div>
        </section>
      )}

      <div className="card-flat grid sm:grid-cols-2 gap-6">
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Status</div>
          <div className="text-sm font-semibold text-gray-900 dark:text-white">
            {project.featured ? 'Featured Project' : 'Project'}
          </div>
        </div>
        {project.created_at && (
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">Added</div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white">
              {new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
