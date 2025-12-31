'use client'

interface VerdictBadgeProps {
  verdict: 'PROTECT & INVEST' | 'GOOD, NOT GREAT' | 'PASS'
  message: string
}

export default function VerdictBadge({ verdict, message }: VerdictBadgeProps) {
  const getVerdictStyles = () => {
    switch (verdict) {
      case 'PROTECT & INVEST':
        return 'bg-gold-500/20 border-gold-500 text-gold-400'
      case 'GOOD, NOT GREAT':
        return 'bg-yellow-500/20 border-yellow-500 text-yellow-400'
      case 'PASS':
        return 'bg-red-500/20 border-red-500 text-red-400'
    }
  }

  return (
    <div className={`${getVerdictStyles()} border-2 rounded-xl p-6 text-center`}>
      <h3 className="text-2xl font-bold mb-2">{verdict}</h3>
      <p className="text-navy-200">{message}</p>
    </div>
  )
}

