import { useEffect, useState } from 'react'
import { getBlogPosts } from '../api'
import BlogCard from '../components/BlogCard'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogPosts().then(setPosts).finally(() => setLoading(false))
  }, [])

  return (
    <section className="container-page py-16 sm:py-20">
      <h1 className="section-title">Blog</h1>
      <p className="section-sub">Thoughts on software, tools, and craft</p>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="card h-48 animate-pulse bg-gray-800/30" />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <svg className="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          No posts published yet.
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((p) => <BlogCard key={p.id} post={p} />)}
        </div>
      )}
    </section>
  )
}
