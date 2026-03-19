import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Audio file is required' },
        { status: 400 }
      )
    }

    // Check if API URL is configured
    const apiUrl = process.env.AUDIO_ANALYZE_API_URL || process.env.FASTAPI_BASE_URL + '/audio/analyze'
    
    if (!apiUrl || apiUrl.includes('localhost:8000')) {
      // Return development message
      return NextResponse.json({
        error: 'Audio analysis API is currently under development',
        message: 'This feature is not yet available. Please check back later.',
        status: 'development'
      }, { status: 503 })
    }

    // If API URL is configured, forward the request
    const backendFormData = new FormData()
    backendFormData.append('file', file)

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: backendFormData,
    })

    if (!response.ok) {
      throw new Error(`Backend error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Audio analysis error:', error)
    
    return NextResponse.json({
      error: 'Audio analysis API is currently under development',
      message: 'This feature is not yet available. Please check back later.',
      status: 'development'
    }, { status: 503 })
  }
}