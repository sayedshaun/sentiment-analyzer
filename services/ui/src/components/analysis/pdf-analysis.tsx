'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Upload, FileText, Eye, X, CheckCircle, AlertTriangle, Wrench } from 'lucide-react'
import { AnalysisResult } from '@/types/analysis'
import { StoryResults } from './story-results'

export function PdfAnalysis() {
  const [file, setFile] = useState<File | null>(null)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile)
        setError(null)
        setResult(null)
      } else {
        setError('Please select a valid PDF file')
      }
    }
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const droppedFile = event.dataTransfer.files[0]
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile)
      setError(null)
      setResult(null)
    } else {
      setError('Please select a valid PDF file')
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const analyzePdf = async () => {
    if (!file) return

    setLoading(true)
    setError(null)
    setResult(null)
    setUploadProgress(0)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/analyze/pdf', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      
      if (!response.ok) {
        if (data.status === 'development') {
          setError(data.message || 'PDF analysis is currently under development')
          return
        }
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during analysis')
    } finally {
      setLoading(false)
      setTimeout(() => setUploadProgress(0), 1000)
    }
  }

  const removeFile = () => {
    setFile(null)
    setResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Development Notice */}
      <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
        <Wrench className="h-4 w-4 text-orange-600" />
        <AlertDescription className="text-orange-800 dark:text-orange-200">
          <strong>Under Development:</strong> PDF analysis is currently being developed. This feature will be available soon.
        </AlertDescription>
      </Alert>

      {/* File Upload Area */}
      <div className="space-y-4">
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            file
              ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950'
              : 'border-slate-300 hover:border-slate-400 dark:border-slate-600 dark:hover:border-slate-500'
          }`}
        >
          {!file ? (
            <div className="space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-pink-600 flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-lg font-medium">Drop your PDF file here</p>
                <p className="text-sm text-muted-foreground">or click to browse</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
                id="pdf-upload"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="border-red-200 hover:bg-red-50 dark:border-red-800 dark:hover:bg-red-950"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose PDF File
              </Button>
              <p className="text-xs text-muted-foreground">
                Supports PDF documents up to 50MB
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-red-600" />
              </div>
              <div className="space-y-2">
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <div className="flex justify-center gap-2">
                <Button
                  onClick={analyzePdf}
                  disabled={loading}
                  className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Analyze PDF
                    </>
                  )}
                </Button>
                <Button
                  onClick={removeFile}
                  variant="outline"
                  disabled={loading}
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Upload Progress */}
        {loading && uploadProgress > 0 && (
          <Card className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-red-800 dark:text-red-200">
                    Extracting and processing...
                  </span>
                  <span className="text-red-800 dark:text-red-200">
                    {uploadProgress}%
                  </span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}
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
      {loading && !uploadProgress && (
        <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <div className="flex-1 space-y-2">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Extracting text from PDF...
                </p>
                <Progress value={33} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Display */}
      {result && !loading && (
        <StoryResults 
          result={result} 
          title="PDF Analysis Results" 
        />
      )}
    </div>
  )
}