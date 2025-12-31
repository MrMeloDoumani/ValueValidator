'use client'

interface ScoreDisplayProps {
  score: number
}

export default function ScoreDisplay({ score }: ScoreDisplayProps) {
  const getScoreColor = () => {
    if (score > 85) return 'text-gold-400'
    if (score > 65) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBg = () => {
    if (score > 85) return 'bg-gold-500/10 border-gold-500/30'
    if (score > 65) return 'bg-yellow-500/10 border-yellow-500/30'
    return 'bg-red-500/10 border-red-500/30'
  }

  return (
    <div className={`${getScoreBg()} border-2 rounded-2xl p-8 text-center`}>
      <p className="text-sm text-navy-300 uppercase tracking-wider mb-2">Metron Value Score</p>
      <div className={`text-7xl font-bold ${getScoreColor()} mb-2`}>{score}</div>
      <div className="text-2xl text-navy-400">/ 100</div>
    </div>
  )
}

