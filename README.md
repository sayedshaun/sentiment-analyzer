# Sentiment Analyzer

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.10+-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.119.1-green.svg)](https://fastapi.tiangolo.com/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

A comprehensive AI-powered sentiment analysis platform that processes multiple content types including text, audio, documents, and web URLs. Built with modern technologies for scalable, multilingual content analysis.

## 🌟 Features

### 📝 Multi-Modal Analysis
- **Text Analysis**: Direct sentiment analysis of text input
- **Audio Analysis**: Speech-to-text transcription with sentiment analysis
- **Document Analysis**: PDF, DOCX, PPTX file processing
- **URL Analysis**: Web content extraction and analysis

### 🤖 AI-Powered Insights
- **LLM Integration**: Support for Ollama, Google Gemini, and OpenAI models
- **Sentiment Classification**: BERT-based Bangla sentiment analysis
- **Feature Extraction**: Structured event and story analysis
- **Multilingual Support**: Optimized for Bangla language processing

### 🏗️ Architecture
- **Microservices**: Modular backend services (BERT, STT, LLM)
- **FastAPI Backend**: High-performance REST API
- **Modern Frontend**: Next.js 15 with responsive UI
- **Docker Support**: Containerized deployment with CPU/CUDA options

### 🎨 User Experience
- **Beautiful UI**: Gradient design with glass morphism
- **Theme Support**: Dark/light mode toggle
- **Responsive Design**: Mobile-first approach
- **Real-time Feedback**: Loading states and progress indicators

## 🏛️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐
│   Frontend UI   │    │   Backend API   │
│   (Next.js)     │◄──►│   (FastAPI)     │
└─────────────────┘    └─────────────────┘
                              │
                    ┌─────────┼─────────┐
                    │         │         │
            ┌───────▼───┐ ┌──▼───┐ ┌───▼────┐
            │   BERT   │ │ STT  │ │  Ollama │
            │Classifier│ │Service│ │   LLM   │
            └───────────┘ └──────┘ └────────┘
```

## 📋 Prerequisites

- **Docker & Docker Compose**: For containerized deployment
- **Python 3.10+**: For local development
- **Node.js 18+**: For frontend development
- **Ollama**: For local LLM inference (optional, can use cloud APIs)
- **FFmpeg**: For audio processing
- **Tesseract OCR**: For document processing

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sentiment-analyzer
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and settings
   ```

3. **Start services**
   ```bash
   # For CPU-only deployment
   docker-compose -f docker-compose.cpu.yaml up -d

   # For CUDA-enabled deployment (if GPU available)
   docker-compose -f docker-compose.cuda.yaml up -d
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - API Docs: http://localhost:8012/docs
   - Health Check: http://localhost:8012/health

### Local Development

1. **Backend Setup**
   ```bash
   # Install Python dependencies
   pip install -r requirements.txt

   # Start Ollama (if using local LLM)
   ollama serve

   # Pull required models
   ollama pull qwen3:0.6b

   # Start backend
   uvicorn main:app --host 0.0.0.0 --port 8000
   ```

2. **Frontend Setup**
   ```bash
   cd ui
   npm install
   npm run dev
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# LLM Configuration
OLLAMA_MODEL=qwen3:0.6b
OLLAMA_HOST=localhost  # or host.docker.internal for Docker
OLLAMA_PORT=11434

# Optional Cloud APIs
GOOGLE_MODEL=gemini-pro
OPENAI_MODEL=gpt-4

# Service URLs (for Docker)
BERT_CLASSIFIER_URL=http://sentiment-analyzer-bert:8000/predict
TTS_URL=http://sentiment-analyzer-tts:8000/transcribe

# Models
TTS_MODEL=hishab/titu_stt_bn_fastconformer
BERT_MODEL=SayedShaun/bangla-classifier-multiclass
```

### Model Setup

**Ollama Models:**
```bash
ollama pull qwen3:0.6b  # Main analysis model
```

**Hugging Face Models:**
- BERT Classifier: `SayedShaun/bangla-classifier-multiclass`
- STT Model: `hishab/titu_stt_bn_fastconformer`

## 📖 API Usage

### Text Analysis

```bash
curl -X POST "http://localhost:8012/text/analyze" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "text=Your text here"
```

**Response:**
```json
{
  "story": {
    "events": [
      {
        "summary": "Event description",
        "bert_sentiment": {
          "label": "POSITIVE",
          "score": 0.95
        }
      }
    ],
    "summary": "Overall story summary"
  }
}
```

### Audio Analysis

```bash
curl -X POST "http://localhost:8012/audio/analyze" \
  -F "file=@audio.wav"
```

### Document Analysis

```bash
curl -X POST "http://localhost:8012/document/analyze" \
  -F "file=@document.pdf"
```

### URL Analysis

```bash
curl -X POST "http://localhost:8012/url/analyze" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "url=https://example.com"
```

## 🧪 Testing

### Run Tests
```bash
# Backend tests
python -m pytest

# With coverage
python -m pytest --cov=src
```

### Jupyter Notebook
```bash
jupyter notebook notebook.ipynb
```

## 🛠️ Development

### Project Structure
```
sentiment-analyzer/
├── src/                    # Backend source code
│   ├── api/               # API routes
│   ├── genai/             # AI/ML components
│   ├── config.py          # Configuration
│   └── logging.py         # Logging setup
├── services/              # Microservices
│   ├── bert/              # Sentiment classifier
│   ├── stt/               # Speech-to-text
│   └── ollama/            # LLM service
├── ui/                    # Frontend application
├── docs/                  # Documentation
└── docker-compose.*.yaml  # Docker configurations
```

### Adding New Features

1. **Backend**: Add routes in `src/api/v1/`
2. **Frontend**: Add components in `ui/src/components/`
3. **Services**: Create new service in `services/`
4. **Update Docker**: Modify compose files for new services

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use TypeScript for frontend components
- Write tests for new features
- Update documentation
- Ensure Docker compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [LangChain](https://www.langchain.com/) - LLM application framework
- [Ollama](https://ollama.ai/) - Local LLM runtime
- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Check the [documentation](docs/) folder
- Review API docs at `/docs` endpoint

---

**Made with ❤️ by [Sayed Shaun](https://github.com/sayedshaun)**


