import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-lg shadow-gray-200/60 dark:shadow-black/20 border-b border-gray-200/80 dark:border-gray-800/80'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container-page flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-indigo-950/50 group-hover:scale-105 transition-transform">
            VK
          </div>
          <span className="font-bold text-gray-900 dark:text-white hidden sm:block">Vikas Kanukanti</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10A5 5 0 0012 7z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <div className="w-5 flex flex-col gap-1.5">
            <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-current rounded transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-80 border-t border-gray-200/80 dark:border-gray-800/80' : 'max-h-0'
        }`}
      >
        <div className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-md px-4 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800/60'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
