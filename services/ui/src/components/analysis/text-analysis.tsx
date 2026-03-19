'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Send, Plus, X, AlertTriangle } from 'lucide-react'
import { AnalysisResult } from '@/types/analysis'
import { StoryResults } from './story-results'

const SUPPORTED_FILE_TYPES = ['PDF', 'DOCX', 'PPTX', 'TXT', 'PNG', 'JPG', 'JPEG', 'MP3', 'WAV', 'M4A', 'OGG', 'FLAC', 'AAC']

export function TextAnalysis() {
  const [text, setText] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const analyzeText = async () => {
    if (!file && !text.trim()) {
      setError('Please enter some text or upload a supported file to analyze')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()

      let apiPath = '/api/analyze/text'

      if (file) {
        // route to audio analyzer if an audio file is provided
        if (file.type.startsWith('audio/') || /\.(mp3|wav|m4a|ogg|flac|aac)$/i.test(file.name)) {
          apiPath = '/api/analyze/audio'
        } else {
          apiPath = '/api/analyze/document'
        }
        formData.append('file', file)
      } else {
        formData.append('text', text)
      }

      const response = await fetch(apiPath, {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setError(null)
    setResult(null)
  }

  const removeFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    setResult(null)
    setError(null)
  }

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="text-input" className="text-sm font-medium">
            {file ? 'File selected (text input will be ignored)' : 'Send a message'}
          </label>
          <Textarea
            id="text-input"
            placeholder="Type your message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[200px] resize-none border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="border-slate-200 dark:border-slate-700"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Upload file</span>
            </Button>
            <p className="text-sm text-muted-foreground">
              Supported: <span className="font-medium">{SUPPORTED_FILE_TYPES.join(', ')}</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {file ? `${file.name} selected` : `${text.length} characters`}
            </span>
            <Button
              onClick={analyzeText}
              disabled={loading || (!file && !text.trim())}
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
                  Analyze
                </>
              )}
            </Button>
            {file && (
              <Button variant="ghost" size="icon" onClick={removeFile}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*,.mp3,.wav,.m4a,.ogg,.flac,.aac,.pdf,.docx,.pptx,.txt,.png,.jpg,.jpeg"
          onChange={handleFileSelect}
          className="hidden"
        />
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