import { NextRequest, NextResponse } from 'next/server'
import { getAnalysis, synthesizeReport } from '@/lib/openai'
import type { ValidationResult } from '@/lib/types'

const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const userLimit = rateLimitMap.get(ip)

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 })
    return true
  }

  if (userLimit.count >= 5) {
    return false
  }

  userLimit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Maximum 5 validations per hour.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { businessIdea } = body

    if (!businessIdea || typeof businessIdea !== 'string' || businessIdea.trim().length < 10) {
      return NextResponse.json(
        { error: 'Business idea must be at least 10 characters long.' },
        { status: 400 }
      )
    }

    if (businessIdea.length > 2000) {
      return NextResponse.json(
        { error: 'Business idea must be less than 2000 characters.' },
        { status: 400 }
      )
    }

    const [porter, buffett, collins] = await Promise.all([
      getAnalysis('Michael Porter', 'Five Forces Strategy', businessIdea),
      getAnalysis('Warren Buffett', 'Value Investing & Economic Moats', businessIdea),
      getAnalysis('Jim Collins', 'Good to Great Flywheel Effect', businessIdea),
    ])

    const { metronScore, verdict, verdictMessage } = synthesizeReport(
      businessIdea,
      porter,
      buffett,
      collins
    )

    const result: ValidationResult = {
      idea: businessIdea,
      porter,
      buffett,
      collins,
      metronScore,
      verdict,
      verdictMessage,
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Validation error:', error)
    return NextResponse.json(
      { error: 'Failed to validate business idea. Please try again.' },
      { status: 500 }
    )
  }
}

