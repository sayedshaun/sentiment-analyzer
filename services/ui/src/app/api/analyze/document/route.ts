import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'File is required' },
        { status: 400 }
      )
    }

    // Get API URL from environment variables
    const apiUrl = process.env.DOCUMENT_ANALYZE_API_URL || process.env.FASTAPI_BASE_URL + '/document/analyze'

    if (!apiUrl || apiUrl.includes('localhost:8000')) {
      // Return development message
      return NextResponse.json({
        error: 'Document analysis API is currently under development',
        message: 'This feature is not yet available. Please check back later.',
        status: 'development'
      }, { status: 503 })
    }

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
    console.error('Document analysis error:', error)

    return NextResponse.json({
      error: 'Document analysis API is currently under development',
      message: 'This feature is not yet available. Please check back later.',
      status: 'development'
    }, { status: 503 })
  }
}
