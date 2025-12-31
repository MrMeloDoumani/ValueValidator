import { GoogleGenerativeAI } from '@google/generative-ai'

function getGeminiClient() {
  const apiKey = process.env.GOOGLE_AI_API_KEY
  if (!apiKey) {
    throw new Error('GOOGLE_AI_API_KEY environment variable is not set')
  }
  return new GoogleGenerativeAI(apiKey)
}

export interface FrameworkAnalysis {
  score: number
  strength: string
  weakness: string
  analysis: string
}

export async function getAnalysis(
  persona: string,
  framework: string,
  businessIdea: string
): Promise<FrameworkAnalysis> {
  const prompt = `You are ${persona}, the legendary strategist. 
Analyze the user's business idea strictly through your framework: ${framework}.

Your Output format MUST be a valid JSON object:
{
    "score": (Integer 0-100 based on strength of the idea in your framework),
    "strength": "The single biggest strength detected",
    "weakness": "The single biggest flaw detected",
    "analysis": "A concise 3-sentence deep dive applying your specific principles."
}
Do not be polite. Be accurate. Accuracy = Trust.

Business Idea: ${businessIdea}

Respond ONLY with valid JSON, no other text.`

  try {
    const genAI = getGeminiClient()
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const content = response.text()

    if (!content) {
      throw new Error('No response from Gemini')
    }

    const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
    const parsed = JSON.parse(cleanedContent) as FrameworkAnalysis

    if (typeof parsed.score !== 'number' || parsed.score < 0 || parsed.score > 100) {
      throw new Error('Invalid score in response')
    }

    return parsed
  } catch (error) {
    console.error(`Error consulting ${persona}:`, error)
    
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error('Full error details:', {
      message: errorMessage,
      stack: error instanceof Error ? error.stack : '',
      persona,
    })
    
    if (error instanceof Error) {
      if (errorMessage.includes('API key') || errorMessage.includes('API_KEY') || errorMessage.includes('401') || errorMessage.includes('403')) {
        return {
          score: 0,
          strength: 'API Key Error',
          weakness: 'Authentication failed',
          analysis: `API Error: ${errorMessage}. Please verify your GOOGLE_AI_API_KEY in Vercel.`,
        }
      }
      
      if (errorMessage.includes('model') || errorMessage.includes('404') || errorMessage.includes('not found')) {
        return {
          score: 0,
          strength: 'Model Error',
          weakness: 'Model not available',
          analysis: `Model Error: ${errorMessage}. The model name may be incorrect.`,
        }
      }
      
      if (errorMessage.includes('quota') || errorMessage.includes('429')) {
        return {
          score: 0,
          strength: 'Quota Error',
          weakness: 'API limit exceeded',
          analysis: `Quota Error: ${errorMessage}. Please check your Google AI API quota.`,
        }
      }
    }
    
    return {
      score: 0,
      strength: 'Error',
      weakness: 'Error',
      analysis: `Failed: ${errorMessage}. Check Vercel function logs for full details.`,
    }
  }
}

export function synthesizeReport(
  idea: string,
  porter: FrameworkAnalysis,
  buffett: FrameworkAnalysis,
  collins: FrameworkAnalysis
): { metronScore: number; verdict: 'PROTECT & INVEST' | 'GOOD, NOT GREAT' | 'PASS'; verdictMessage: string } {
  const metronScore = Math.round((porter.score + buffett.score + collins.score) / 3)

  let verdict: 'PROTECT & INVEST' | 'GOOD, NOT GREAT' | 'PASS'
  let verdictMessage: string

  if (metronScore > 85) {
    verdict = 'PROTECT & INVEST'
    verdictMessage = 'This is a Fortress. High prolificacy, high defense.'
  } else if (metronScore > 65) {
    verdict = 'GOOD, NOT GREAT'
    verdictMessage = 'It has holes in the moat. Needs strategic tightening.'
  } else {
    verdict = 'PASS'
    verdictMessage = 'The foundation is weak. It will likely fail under pressure.'
  }

  return { metronScore, verdict, verdictMessage }
}

