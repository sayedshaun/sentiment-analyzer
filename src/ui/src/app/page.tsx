'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TextAnalysis } from '@/components/analysis/text-analysis'
import { AudioAnalysis } from '@/components/analysis/audio-analysis'
import { PdfAnalysis } from '@/components/analysis/pdf-analysis'
import { UrlAnalysis } from '@/components/analysis/url-analysis'
import { Brain, FileAudio, FileText, Link2, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

export default function Home() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="glass-effect"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full hover-lift">
                <Brain className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Sentiment Analyzer
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced text analysis powered by AI. Analyze text, audio files, PDFs, and web URLs with intelligent insights.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="text" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8 glass-effect border border-slate-200 dark:border-slate-700">
              <TabsTrigger value="text" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Text</span>
              </TabsTrigger>
              <TabsTrigger value="audio" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">
                <FileAudio className="w-4 h-4" />
                <span className="hidden sm:inline">Audio</span>
              </TabsTrigger>
              <TabsTrigger value="pdf" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">PDF</span>
              </TabsTrigger>
              <TabsTrigger value="url" className="flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-900">
                <Link2 className="w-4 h-4" />
                <span className="hidden sm:inline">URL</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="text" className="space-y-6">
              <Card className="border-0 shadow-xl glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    Text Analysis
                  </CardTitle>
                  <CardDescription>
                    Enter your text below to get comprehensive AI-powered analysis and insights.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <TextAnalysis />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="audio" className="space-y-6">
              <Card className="border-0 shadow-xl glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileAudio className="w-5 h-5 text-green-600" />
                    Audio Analysis
                  </CardTitle>
                  <CardDescription>
                    Upload an audio file to extract and analyze its content using advanced speech recognition.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AudioAnalysis />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pdf" className="space-y-6">
              <Card className="border-0 shadow-xl glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-red-600" />
                    PDF Analysis
                  </CardTitle>
                  <CardDescription>
                    Upload a PDF document to extract text and receive detailed analysis of its content.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PdfAnalysis />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="url" className="space-y-6">
              <Card className="border-0 shadow-xl glass-effect">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link2 className="w-5 h-5 text-purple-600" />
                    URL Analysis
                  </CardTitle>
                  <CardDescription>
                    Enter a web URL to analyze its content and extract meaningful insights.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UrlAnalysis />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}