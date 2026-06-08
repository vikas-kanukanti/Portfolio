export default function ExperienceCard({ exp, isLast }) {
  return (
    <div className="relative flex gap-5 sm:gap-6">
      {/* Timeline spine */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-3 h-3 rounded-full gradient-bg mt-1.5 shadow-[0_0_10px_2px_rgba(99,102,241,0.4)] shrink-0" />
        {!isLast && <div className="w-px flex-1 bg-gradient-to-b from-indigo-500/40 to-transparent mt-2 min-h-8" />}
      </div>

      {/* Card */}
      <div className="card mb-8 flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
          <div className="min-w-0">
            <h3 className="text-base font-semibold text-white leading-snug">{exp.role}</h3>
            <p className="text-indigo-400 font-medium text-sm">{exp.company}</p>
          </div>
          <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-100/60 border border-gray-200/60 dark:bg-gray-800/60 dark:border-gray-700/60 px-2.5 py-1 rounded-full shrink-0 w-fit">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {exp.start_date} – {exp.end_date || 'Present'}
          </span>
        </div>

        {exp.description && (
          <p className="text-sm text-gray-400 mb-4 leading-relaxed">{exp.description}</p>
        )}

        {exp.highlights?.length > 0 && (
          <ul className="space-y-2">
            {exp.highlights.map((h, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-gray-400">
                <span className="text-indigo-400 mt-0.5 shrink-0">▸</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
