'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'
import ResultsDisplay from './ResultsDisplay'
import type { ValidationResult } from '@/lib/types'

export default function ValidatorForm() {
  const [businessIdea, setBusinessIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ValidationResult | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setResult(null)

    if (businessIdea.trim().length < 10) {
      setError('Business idea must be at least 10 characters long.')
      return
    }

    if (businessIdea.length > 2000) {
      setError('Business idea must be less than 2000 characters.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ businessIdea }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to validate business idea')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="businessIdea" className="block text-sm font-medium text-navy-300 mb-2">
            Enter Your Business Idea
          </label>
          <textarea
            id="businessIdea"
            value={businessIdea}
            onChange={(e) => setBusinessIdea(e.target.value)}
            placeholder="Describe your business idea, product, or startup concept in detail..."
            className="w-full px-4 py-3 bg-navy-800/50 border border-navy-700 rounded-lg text-white placeholder-navy-500 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent resize-none"
            rows={6}
            disabled={loading}
          />
          <p className="mt-2 text-xs text-navy-400">
            {businessIdea.length} / 2000 characters
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || businessIdea.trim().length < 10}
          className="w-full px-8 py-4 bg-gold-500 hover:bg-gold-600 disabled:bg-navy-700 disabled:cursor-not-allowed text-navy-900 font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Consulting Strategic Minds...
            </>
          ) : (
            'Validate Business Idea'
          )}
        </button>
      </form>

      {result && <ResultsDisplay result={result} />}
    </div>
  )
}

