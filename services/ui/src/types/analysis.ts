export interface BertSentiment {
  label: string;
  score: number;
}

export interface StoryEvent {
  action: string;
  actor: string;
  location: string;
  llm_sentiment: string;
  summary: string;
  bert_sentiment: BertSentiment;
}

export interface Story {
  events: StoryEvent[];
  summary: string;
}

export interface AnalysisResult {
  story: Story;
  sentiment: string;
  alert: boolean;
}

export interface AnalysisResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}