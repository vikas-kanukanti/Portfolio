const levelLabel = (p) => {
  if (p >= 90) return { label: 'Expert', color: 'text-emerald-400' }
  if (p >= 75) return { label: 'Advanced', color: 'text-indigo-400' }
  if (p >= 60) return { label: 'Proficient', color: 'text-purple-400' }
  return { label: 'Learning', color: 'text-amber-400' }
}

export default function SkillBadge({ skill }) {
  const level = levelLabel(skill.proficiency)

  return (
    <div className="card flex flex-col gap-3 hover:scale-[1.01] active:scale-100">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-white text-sm">{skill.name}</span>
        <span className={`text-xs font-medium ${level.color}`}>{level.label}</span>
      </div>
      <div className="relative h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 gradient-bg rounded-full transition-all duration-700 ease-out"
          style={{ width: `${skill.proficiency}%` }}
        />
      </div>
      <span className="text-xs text-gray-600">{skill.proficiency}%</span>
    </div>
  )
}
