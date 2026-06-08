import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogPost } from '../api'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    getBlogPost(slug).then(setPost).catch(() => setError(true)).finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="container-page py-16 max-w-3xl">
        <div className="h-5 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-10" />
        <div className="h-9 w-3/4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-4" />
        <div className="h-4 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse mb-8" />
        <div className="space-y-3">
          {[100, 90, 95, 85, 92, 88].map((w, i) => (
            <div key={i} className="h-4 bg-gray-100 dark:bg-gray-800/60 rounded animate-pulse" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="container-page py-20 text-center">
        <p className="text-gray-400 mb-6">Post not found.</p>
        <Link to="/blog" className="btn-primary">Back to Blog</Link>
      </div>
    )
  }

  const date = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <article className="container-page py-16 max-w-3xl animate-fade-up">
      <Link to="/blog" className="btn-ghost mb-10 inline-flex">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
        </svg>
        Back to Blog
      </Link>

      <header className="mb-8">
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        )}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white leading-tight mb-4">{post.title}</h1>
        {date && <span className="text-sm text-gray-500">{date}</span>}
      </header>

      {post.summary && (
        <p className="text-lg text-gray-400 border-l-2 border-indigo-500 pl-5 mb-10 italic leading-relaxed">
          {post.summary}
        </p>
      )}

      <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-[15px] sm:text-base">
        {post.content}
      </div>
    </article>
  )
}
