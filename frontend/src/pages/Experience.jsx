import { useEffect, useState } from 'react'
import { getExperiences } from '../api'
import ExperienceCard from '../components/ExperienceCard'

export default function Experience() {
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getExperiences().then(setExperiences).finally(() => setLoading(false))
  }, [])

  return (
    <section className="container-page py-16 sm:py-20">
      <h1 className="section-title">Experience</h1>
      <p className="section-sub">My professional journey</p>

      <div className="max-w-2xl">
        {loading ? (
          <div className="space-y-5">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card h-40 animate-pulse bg-gray-800/30" />
            ))}
          </div>
        ) : experiences.length === 0 ? (
          <p className="text-gray-500">No experience entries yet.</p>
        ) : (
          <div>
            {experiences.map((e, i) => (
              <ExperienceCard key={e.id} exp={e} isLast={i === experiences.length - 1} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
