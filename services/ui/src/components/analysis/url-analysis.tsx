'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Link2, Globe, ExternalLink, CheckCircle, AlertTriangle } from 'lucide-react'
import { AnalysisResult } from '@/types/analysis'
import { StoryResults } from './story-results'

export function UrlAnalysis() {
  const [url, setUrl] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeUrl = async () => {
    if (!url.trim()) {
      setError('Please enter a URL to analyze')
      return
    }

    // Basic URL validation
    try {
      new URL(url)
    } catch {
      setError('Please enter a valid URL (e.g., https://example.com)')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      formData.append('url', url)

      const response = await fetch('/api/analyze/url', {
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

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      analyzeUrl()
    }
  }

  const getDomainFromUrl = (urlString: string) => {
    try {
      return new URL(urlString).hostname
    } catch {
      return urlString
    }
  }

  return (
    <div className="space-y-6">
      {/* URL Input Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="url-input" className="text-sm font-medium">
            Enter URL to analyze
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="url-input"
                type="url"
                placeholder="https://example.com/article"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 border-slate-200 dark:border-slate-700 focus:border-purple-500 dark:focus:border-purple-400"
              />
            </div>
            <Button 
              onClick={analyzeUrl} 
              disabled={loading || !url.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4 mr-2" />
                  Analyze
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUrl('https://www.prothomalo.com')}
            className="text-xs"
          >
            Prothom Alo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUrl('https://www.bbc.com/news')}
            className="text-xs"
          >
            BBC News
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setUrl('https://techcrunch.com')}
            className="text-xs"
          >
            TechCrunch
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
        <Card className="border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
              <div className="flex-1 space-y-2">
                <p className="text-sm font-medium text-purple-800 dark:text-purple-200">
                  Fetching and analyzing URL content...
                </p>
                <Progress value={66} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Display */}
      {result && !loading && (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
          {/* URL Info Card */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{getDomainFromUrl(url)}</p>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 flex items-center gap-1"
                  >
                    {url}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <StoryResults 
            result={result} 
            title="URL Analysis Results" 
          />
        </div>
      )}
    </div>
  )
}