'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Send, Sparkles, AlertTriangle } from 'lucide-react'
import { AnalysisResult } from '@/types/analysis'
import { StoryResults } from './story-results'

export function TextAnalysis() {
  const [text, setText] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeText = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('text', text)

      const response = await fetch('/api/analyze/text', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      // Check if it's an error response
      if (data.error) {
        setError(data.error || 'An error occurred during analysis')
        return
      }
      
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="text-input" className="text-sm font-medium">
            Enter your text
          </label>
          <Textarea
            id="text-input"
            placeholder="Paste or type the text you want to analyze..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[150px] resize-none border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            {text.length} characters
          </span>
          <Button 
            onClick={analyzeText} 
            disabled={loading || !text.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Analyze Text
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <div className="flex-1 space-y-2">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Analyzing your text...
                </p>
                <Progress value={66} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Display */}
      {result && !loading && (
        <StoryResults 
          result={result} 
          title="Text Analysis Results" 
        />
      )}
    </div>
  )
}