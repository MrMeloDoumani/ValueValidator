import OpenAI from 'openai'

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set')
  }
  return new OpenAI({
    apiKey,
  })
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
  const systemPrompt = `You are ${persona}, the legendary strategist. 
Analyze the user's business idea strictly through your framework: ${framework}.

Your Output format MUST be a valid JSON object:
{
    "score": (Integer 0-100 based on strength of the idea in your framework),
    "strength": "The single biggest strength detected",
    "weakness": "The single biggest flaw detected",
    "analysis": "A concise 3-sentence deep dive applying your specific principles."
}
Do not be polite. Be accurate. Accuracy = Trust.`

  try {
    const openai = getOpenAIClient()
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Business Idea: ${businessIdea}` },
      ],
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('No response from OpenAI')
    }

    return JSON.parse(content) as FrameworkAnalysis
  } catch (error) {
    console.error(`Error consulting ${persona}:`, error)
    return {
      score: 0,
      strength: 'Error',
      weakness: 'Error',
      analysis: 'Failed to generate analysis. Please try again.',
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

