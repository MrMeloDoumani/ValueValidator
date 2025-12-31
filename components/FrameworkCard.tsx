'use client'

interface FrameworkCardProps {
  title: string
  subtitle: string
  score: number
  strength: string
  weakness: string
  analysis: string
  icon: string
}

export default function FrameworkCard({
  title,
  subtitle,
  score,
  strength,
  weakness,
  analysis,
  icon,
}: FrameworkCardProps) {
  const getScoreColor = () => {
    if (score > 85) return 'text-gold-400'
    if (score > 65) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="bg-navy-800/50 border border-navy-700 rounded-xl p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-2xl mb-1">{icon}</div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-navy-400">{subtitle}</p>
        </div>
        <div className={`text-3xl font-bold ${getScoreColor()}`}>{score}</div>
      </div>

      <div className="space-y-3 pt-4 border-t border-navy-700">
        <div>
          <p className="text-xs text-navy-400 uppercase tracking-wide mb-1">Strength</p>
          <p className="text-navy-200">{strength}</p>
        </div>
        <div>
          <p className="text-xs text-navy-400 uppercase tracking-wide mb-1">Critical Weakness</p>
          <p className="text-navy-200">{weakness}</p>
        </div>
        <div>
          <p className="text-xs text-navy-400 uppercase tracking-wide mb-1">Analysis</p>
          <p className="text-navy-300 italic">&ldquo;{analysis}&rdquo;</p>
        </div>
      </div>
    </div>
  )
}

