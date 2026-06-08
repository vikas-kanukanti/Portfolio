import { Link } from 'react-router-dom'

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:vikaskanukanti@gmail.com',
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-200/80 dark:border-gray-800/80 bg-white dark:bg-gray-950 mt-auto">
      <div className="container-page py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg gradient-bg flex items-center justify-center text-white text-xs font-bold">VK</div>
              <span className="font-semibold text-white text-sm">Vikas Kanukanti</span>
            </Link>
            <p className="text-xs text-gray-600">Software Engineer</p>
          </div>

          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-500 hover:text-indigo-500 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 border border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-all duration-200"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200/60 dark:border-gray-800/60 text-center text-xs text-gray-500 dark:text-gray-700">
          © {new Date().getFullYear()} Vikas Kanukanti. Built with FastAPI &amp; React.
        </div>
      </div>
    </footer>
  )
}
