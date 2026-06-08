import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProjects, getSkills } from '../api'
import ProjectCard from '../components/ProjectCard'
import SkillBadge from '../components/SkillBadge'

const stats = [
  { value: '3+', label: 'Years Experience' },
  { value: '10+', label: 'Projects Built' },
  { value: '5+', label: 'Technologies' },
]

const techPills = ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Docker', 'TailwindCSS']

export default function Home() {
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(() => {
    getProjects(true).then(setProjects).catch(() => {})
    getSkills().then(setSkills).catch(() => {})
  }, [])

  const skillsByCategory = skills.reduce((acc, s) => {
    const cat = s.category || 'Other'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(s)
    return acc
  }, {})

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative overflow-hidden mesh-bg">
        <div className="container-page pt-20 pb-24 sm:pt-28 sm:pb-32">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

            {/* Left: text */}
            <div className="flex-1 text-center lg:text-left animate-fade-up">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Open to new opportunities
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight tracking-tight mb-5 text-balance">
                Hi, I'm{' '}
                <span className="gradient-text">Vikas</span>
                <br />
                <span className="gradient-text">Kanukanti</span>
              </h1>

              <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                Software Engineer crafting scalable backend APIs and fast, beautiful frontends.
                I turn complex problems into clean, maintainable code.
              </p>

              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
                <Link to="/projects" className="btn-primary">
                  View My Work
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link to="/contact" className="btn-outline">Get in Touch</Link>
                <a href="mailto:vikaskanukanti@gmail.com" className="btn-ghost">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  vikaskanukanti@gmail.com
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-6 sm:gap-10 justify-center lg:justify-start">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold gradient-text">{s.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: floating code card */}
            <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md animate-fade-in">
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-2xl scale-110" />

                <div className="relative card-flat overflow-hidden">
                  {/* Window chrome */}
                  <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
                    <div className="w-3 h-3 rounded-full bg-red-500/70" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    <span className="ml-2 text-xs text-gray-600 font-mono">portfolio.py</span>
                  </div>

                  {/* Fake code */}
                  <pre className="font-mono text-xs sm:text-sm leading-relaxed text-left overflow-x-auto">
<code><span className="text-purple-400">class </span><span className="text-indigo-300">Developer</span><span className="text-gray-400">:</span>{'\n'}
<span className="text-gray-500">  </span><span className="text-blue-400">name </span><span className="text-gray-400">= </span><span className="text-emerald-400">"Vikas Kanukanti"</span>{'\n'}
<span className="text-gray-500">  </span><span className="text-blue-400">role </span><span className="text-gray-400">= </span><span className="text-emerald-400">"Software Engineer"</span>{'\n'}
<span className="text-gray-500">  </span><span className="text-blue-400">stack </span><span className="text-gray-400">= [</span>{'\n'}
<span className="text-emerald-400">    "FastAPI"</span><span className="text-gray-400">,</span>{' '}<span className="text-emerald-400">"React"</span><span className="text-gray-400">,</span>{'\n'}
<span className="text-emerald-400">    "Python"</span><span className="text-gray-400">,</span>{' '}<span className="text-emerald-400">"TailwindCSS"</span>{'\n'}
<span className="text-gray-400">  ]</span>{'\n'}
{'\n'}
<span className="text-gray-500">  </span><span className="text-purple-400">def </span><span className="text-yellow-300">solve</span><span className="text-gray-400">(self, problem):</span>{'\n'}
<span className="text-gray-500">    </span><span className="text-purple-400">return </span><span className="text-emerald-400">"clean code ✓"</span>
</code>
                  </pre>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    {techPills.map((t) => (
                      <span key={t} className="tag text-xs">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-slate-50 dark:from-gray-950 to-transparent pointer-events-none" />
      </section>

      {/* ── Featured Projects ─────────────────────────── */}
      {projects.length > 0 && (
        <section className="container-page py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-title">Featured Projects</h2>
              <p className="section-sub !mb-0">Things I've built</p>
            </div>
            <Link to="/projects" className="btn-ghost hidden sm:inline-flex">
              All projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
          <div className="mt-6 text-center sm:hidden">
            <Link to="/projects" className="btn-outline">See all projects</Link>
          </div>
        </section>
      )}

      {/* ── Skills ─────────────────────────────────────── */}
      {Object.keys(skillsByCategory).length > 0 && (
        <section className="border-t border-gray-200/60 dark:border-gray-800/60 py-20">
          <div className="container-page">
            <h2 className="section-title">Skills</h2>
            <p className="section-sub">Technologies I work with daily</p>
            <div className="space-y-12">
              {Object.entries(skillsByCategory).map(([cat, catSkills]) => (
                <div key={cat}>
                  <div className="flex items-center gap-3 mb-5">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">{cat}</h3>
                    <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
                  </div>
                  <div className="grid xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {catSkills.map((s) => <SkillBadge key={s.id} skill={s} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ─────────────────────────────────────── */}
      <section className="container-page py-20">
        <div className="relative overflow-hidden rounded-2xl gradient-bg p-px">
          <div className="bg-white dark:bg-gray-950 rounded-2xl px-8 sm:px-12 py-12 sm:py-14 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">Let's work together</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
              I'm currently open to new opportunities. Whether you have a project in mind or just want to chat, feel free to reach out.
            </p>
            <Link to="/contact" className="btn-primary">
              Get in touch
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
