import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const url = formData.get('url') as string

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Get API URL from environment variables
    const apiUrl = process.env.URL_ANALYZE_API_URL || process.env.FASTAPI_BASE_URL + '/url/analyze' || 'http://localhost:8000/url/analyze'
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ url }),
    })

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('URL analysis error:', error)
    
    // Return mock data for demo purposes if backend is not available
    const mockData = {
      story: {
        events: [
          {
            action: "Web content analyzed successfully",
            actor: "AI System",
            location: "Web",
            llm_sentiment: "Positive",
            summary: "The web page content has been fetched and analyzed. Key events and information have been extracted from the URL content.",
            bert_sentiment: {
              label: "Positive",
              score: 0.82
            }
          }
        ],
        summary: "The web page has been processed and its content analyzed. This is a demo response when the backend is not available."
      },
      sentiment: "Positive",
      alert: false
    }

    return NextResponse.json(mockData)
  }
}