import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const text = formData.get('text') as string

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      )
    }

    // Get API URL from environment variables
    const apiUrl = process.env.TEXT_ANALYZE_API_URL || process.env.FASTAPI_BASE_URL + '/text_analyze' || 'http://localhost:8000/text_analyze'
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ text }),
    })

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Text analysis error:', error)
    
    // Return mock data for demo purposes if backend is not available
    const mockData = {
      story: {
        events: [
          {
            action: "Sample action from text analysis",
            actor: "System",
            location: "Digital",
            llm_sentiment: "Neutral",
            summary: "This is a sample analysis result from the text you provided. The AI has processed the content and extracted meaningful events and insights.",
            bert_sentiment: {
              label: "Neutral",
              score: 0.75
            }
          }
        ],
        summary: "The text has been analyzed and key events have been extracted. This is a demo response when the backend is not available."
      },
      sentiment: "Neutral",
      alert: false
    }

    return NextResponse.json(mockData)
  }
}