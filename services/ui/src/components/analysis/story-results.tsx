'use client'

import { AnalysisResult } from '@/types/analysis'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Calendar, 
  MapPin, 
  Users, 
  Activity, 
  AlertTriangle, 
  TrendingUp,
  TrendingDown,
  Minimize,
  Brain,
  Clock
} from 'lucide-react'

interface StoryResultsProps {
  result: AnalysisResult
  title?: string
}

export function StoryResults({ result, title = "Analysis Results" }: StoryResultsProps) {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case 'negative':
        return <TrendingDown className="w-4 h-4 text-red-600" />
      default:
        return <Minimize className="w-4 h-4 text-gray-600" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200'
      case 'negative':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 border-gray-200'
    }
  }

  const getLLMSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'text-green-700 bg-green-50 dark:text-green-300 dark:bg-green-950'
      case 'negative':
        return 'text-red-700 bg-red-50 dark:text-red-300 dark:bg-red-950'
      default:
        return 'text-gray-700 bg-gray-50 dark:text-gray-300 dark:bg-gray-950'
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Alert Warning */}
      {result.alert && (
        <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 dark:text-orange-200">
            This analysis contains sensitive or potentially concerning content that requires attention.
          </AlertDescription>
        </Alert>
      )}

      {/* Overall Summary */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-blue-600" />
            {title}
          </CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {getSentimentIcon(result.sentiment)}
              <Badge className={getSentimentColor(result.sentiment)}>
                Overall Sentiment: {result.sentiment}
              </Badge>
            </div>
            {result.alert && (
              <Badge variant="outline" className="border-orange-200 text-orange-800 dark:border-orange-700 dark:text-orange-200">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Alert
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                Story Summary
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                {result.story.summary}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Events Timeline */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Events Timeline
          </CardTitle>
          <CardDescription>
            Detailed breakdown of {result.story.events.length} key events identified in the analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {result.story.events.map((event, index) => (
              <div key={index} className="relative">
                {/* Timeline connector */}
                {index < result.story.events.length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-slate-200 dark:bg-slate-700" />
                )}
                
                <div className="flex gap-4">
                  {/* Event number */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  
                  {/* Event content */}
                  <div className="flex-1 space-y-4">
                    {/* Event header */}
                    <div className="flex flex-wrap items-center gap-3">
                      <h4 className="font-semibold text-lg">{event.action}</h4>
                      <Badge className={getLLMSentimentColor(event.llm_sentiment)}>
                        {getSentimentIcon(event.llm_sentiment)}
                        {event.llm_sentiment}
                      </Badge>
                    </div>

                    {/* Event details */}
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">Actor:</span>
                          <span className="text-muted-foreground">{event.actor}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">Location:</span>
                          <span className="text-muted-foreground">{event.location}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Brain className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">BERT Sentiment:</span>
                          <Badge variant="outline" className={getSentimentColor(event.bert_sentiment.label)}>
                            {event.bert_sentiment.label} ({Math.round(event.bert_sentiment.score * 100)}%)
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Event summary */}
                    <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                      <p className="text-sm leading-relaxed">{event.summary}</p>
                    </div>

                    {/* Extract date if present in summary */}
                    {event.summary.includes('/') && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>
                          {event.summary.match(/\d{1,2}\/\d{1,2}\/\d{4}/)?.map(match => formatDate(match)).join(', ')}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {index < result.story.events.length - 1 && <Separator className="mt-6" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistics Summary */}
      <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-600" />
            Analysis Statistics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{result.story.events.length}</div>
              <div className="text-sm text-muted-foreground">Total Events</div>
            </div>
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {result.story.events.filter(e => e.llm_sentiment === 'Positive').length}
              </div>
              <div className="text-sm text-muted-foreground">Positive Events</div>
            </div>
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {result.story.events.filter(e => e.llm_sentiment === 'Negative').length}
              </div>
              <div className="text-sm text-muted-foreground">Negative Events</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}