import { Link } from 'react-router-dom'

export default function BlogCard({ post }) {
  const date = post.created_at
    ? new Date(post.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : null

  return (
    <Link to={`/blog/${post.slug}`} className="card flex flex-col gap-3 group h-full">
      {post.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {post.tags.slice(0, 3).map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
      )}

      <h3 className="text-base font-semibold text-white group-hover:text-indigo-400 transition-colors leading-snug">
        {post.title}
      </h3>

      {post.summary && (
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 flex-1">{post.summary}</p>
      )}

      <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 dark:border-gray-800/60 mt-auto">
        {date && <span className="text-xs text-gray-600">{date}</span>}
        <span className="btn-ghost text-xs ml-auto">
          Read more
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
      </div>
    </Link>
  )
}
