export interface FrameworkAnalysis {
  score: number
  strength: string
  weakness: string
  analysis: string
}

export interface ValidationResult {
  idea: string
  porter: FrameworkAnalysis
  buffett: FrameworkAnalysis
  collins: FrameworkAnalysis
  metronScore: number
  verdict: 'PROTECT & INVEST' | 'GOOD, NOT GREAT' | 'PASS'
  verdictMessage: string
}

export interface ValidationRequest {
  businessIdea: string
}

