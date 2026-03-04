
## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Integration

The app is designed to work with your FastAPI backend. Configure your backend URL by setting the `FASTAPI_URL` environment variable:

```bash
export FASTAPI_URL=http://localhost:8000
```

### API Endpoints

The frontend expects the following endpoints:

- `POST /text_analyze` - Analyze text content
- `POST /audio_analyze` - Analyze audio files
- `POST /pdf_analyze` - Analyze PDF documents  
- `POST /url_analyze` - Analyze web URLs

### Response Format

The API should return responses in this format:

```json
{
  "summary": "Content summary",
  "sentiment": "positive|negative|neutral",
  "key_points": ["Point 1", "Point 2"],
  "entities": ["Entity 1", "Entity 2"],
  "topics": ["Topic 1", "Topic 2"],
  "confidence": 0.85,
  "processing_time": 1.2
}
```

## Components

### Analysis Components
- `TextAnalysis` - Text input and analysis
- `AudioAnalysis` - Audio file upload and analysis
- `PdfAnalysis` - PDF file upload and analysis
- `UrlAnalysis` - URL input and analysis

### UI Components
- Modern card-based layout
- Tab navigation for different analysis types
- Progress indicators and loading states
- Error handling and user feedback
- Responsive design

## Features in Detail

### Text Analysis
- Large text area with character counter
- Real-time validation
- Comprehensive results display with:
  - Content summary
  - Sentiment analysis with confidence scores
  - Key points extraction
  - Named entities recognition
  - Topic identification

### Audio Analysis
- Drag-and-drop audio file upload
- File type validation
- Upload progress tracking
- Support for common audio formats (MP3, WAV, M4A)
- Transcription and analysis results

### PDF Analysis
- PDF file upload with drag-and-drop
- File size validation (up to 50MB)
- Text extraction and processing
- Document analysis with structured results

### URL Analysis
- URL input with validation
- Quick access buttons for popular sites
- Content fetching and analysis
- Real-time processing status

## Styling

The app features:
- Modern gradient backgrounds
- Glass morphism effects
- Smooth animations
- Custom scrollbars
- Hover states and micro-interactions
- Dark/light theme support