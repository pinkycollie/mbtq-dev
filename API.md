# 🔌 API Integration Guide

## Overview

MBTQ.dev is designed to be extensible with various APIs, especially deaf-accessible services. This guide shows you how to integrate third-party APIs into your application.

---

## 🏗️ API Architecture

### Modular API System

The platform supports:
- **RESTful APIs**: Traditional HTTP APIs
- **GraphQL APIs**: Flexible query-based APIs
- **WebSocket APIs**: Real-time communication
- **Webhook Integrations**: Event-driven integrations

---

## 🛠️ Setting Up API Integrations

### Step 1: Create API Service Module

Create `client/src/services/api-service.ts`:

```typescript
// Generic API service wrapper
export class APIService {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(baseURL: string, apiKey?: string) {
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/json',
      ...(apiKey && { 'Authorization': `Bearer ${apiKey}` }),
    };
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.headers,
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.headers,
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }
}
```

### Step 2: Create Specific API Integrations

---

## 🦻 Deaf-Accessible API Integrations

### 1. Sign Language Translation APIs

#### SignLanguage.io (Example)

```typescript
// src/services/sign-language-api.ts
import { APIService } from './api-service';

interface TranslationResult {
  text: string;
  videoUrl: string;
  language: 'ASL' | 'BSL' | 'ISL';
}

export class SignLanguageAPI extends APIService {
  constructor() {
    super(
      'https://api.signlanguage.io/v1',
      import.meta.env.VITE_SIGN_LANGUAGE_API_KEY
    );
  }

  async translateToSign(text: string, language: 'ASL' | 'BSL' = 'ASL'): Promise<TranslationResult> {
    return this.post<TranslationResult>('/translate', {
      text,
      targetLanguage: language,
      format: 'video',
    });
  }

  async getSignVideo(wordId: string): Promise<{ videoUrl: string }> {
    return this.get<{ videoUrl: string }>(`/signs/${wordId}`);
  }
}

// Usage
const signAPI = new SignLanguageAPI();
const result = await signAPI.translateToSign('Hello, how are you?', 'ASL');
```

#### Integration in Component

```typescript
// src/components/SignLanguageTranslator.tsx
import { useState } from 'react';
import { SignLanguageAPI } from '../services/sign-language-api';

export default function SignLanguageTranslator() {
  const [text, setText] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const signAPI = new SignLanguageAPI();

  const handleTranslate = async () => {
    setLoading(true);
    try {
      const result = await signAPI.translateToSign(text);
      setVideoUrl(result.videoUrl);
    } catch (error) {
      console.error('Translation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Sign Language Translator</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate to sign language"
        className="w-full p-2 border rounded mb-4"
        rows={4}
      />
      <button
        onClick={handleTranslate}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Translating...' : 'Translate to ASL'}
      </button>
      {videoUrl && (
        <div className="mt-4">
          <video src={videoUrl} controls className="w-full rounded" />
        </div>
      )}
    </div>
  );
}
```

### 2. Closed Captioning APIs

#### Rev.ai / Deepgram Integration

```typescript
// src/services/captioning-api.ts
import { APIService } from './api-service';

interface CaptionResult {
  transcript: string;
  captions: Array<{
    text: string;
    startTime: number;
    endTime: number;
  }>;
}

export class CaptioningAPI extends APIService {
  constructor() {
    super(
      'https://api.deepgram.com/v1',
      import.meta.env.VITE_DEEPGRAM_API_KEY
    );
  }

  async transcribeAudio(audioFile: File): Promise<CaptionResult> {
    const formData = new FormData();
    formData.append('audio', audioFile);

    const response = await fetch(`${this.baseURL}/listen`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${import.meta.env.VITE_DEEPGRAM_API_KEY}`,
      },
      body: formData,
    });

    const data = await response.json();
    return {
      transcript: data.results.channels[0].alternatives[0].transcript,
      captions: data.results.channels[0].alternatives[0].words.map((word: any) => ({
        text: word.word,
        startTime: word.start,
        endTime: word.end,
      })),
    };
  }

  async getLiveTranscription(audioStream: MediaStream): Promise<WebSocket> {
    const ws = new WebSocket(
      `wss://api.deepgram.com/v1/listen?punctuate=true&interim_results=true`,
      ['token', import.meta.env.VITE_DEEPGRAM_API_KEY]
    );

    const mediaRecorder = new MediaRecorder(audioStream, {
      mimeType: 'audio/webm',
    });

    mediaRecorder.addEventListener('dataavailable', (event) => {
      if (event.data.size > 0 && ws.readyState === WebSocket.OPEN) {
        ws.send(event.data);
      }
    });

    mediaRecorder.start(250);

    return ws;
  }
}
```

### 3. Video Communication APIs

#### Agora / Twilio Video Integration

```typescript
// src/services/video-api.ts
export class VideoAPI {
  private appId: string;

  constructor() {
    this.appId = import.meta.env.VITE_AGORA_APP_ID;
  }

  async createChannel(channelName: string): Promise<string> {
    // Generate token for video channel
    const response = await fetch('/api/video/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ channelName }),
    });

    const { token } = await response.json();
    return token;
  }

  async joinChannel(channelName: string, token: string) {
    // Implementation depends on video SDK
    // This is a placeholder for the integration
    console.log('Joining channel:', channelName);
  }
}
```

---

## 🌐 General API Integrations

### Weather API Example

```typescript
// src/services/weather-api.ts
import { APIService } from './api-service';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
}

export class WeatherAPI extends APIService {
  constructor() {
    super('https://api.openweathermap.org/data/2.5');
  }

  async getCurrentWeather(city: string): Promise<WeatherData> {
    const data = await this.get<any>(
      `/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
    );

    return {
      temperature: data.main.temp,
      condition: data.weather[0].main,
      humidity: data.main.humidity,
    };
  }
}
```

### AI/LLM API Example

```typescript
// src/services/ai-api.ts
import { APIService } from './api-service';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatResponse {
  message: string;
  model: string;
}

export class AIAPI extends APIService {
  constructor() {
    super('https://api.openai.com/v1');
  }

  async chat(messages: ChatMessage[]): Promise<ChatResponse> {
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages,
      }),
    });

    const data = await response.json();
    return {
      message: data.choices[0].message.content,
      model: data.model,
    };
  }
}
```

---

## 🔐 API Security Best Practices

### 1. Never Expose Secret Keys in Frontend

```typescript
// ❌ BAD - Never do this
const API_KEY = 'sk_live_secret_key_12345';

// ✅ GOOD - Use environment variables
const API_KEY = import.meta.env.VITE_API_KEY;
```

### 2. Use Backend Proxy for Sensitive APIs

```javascript
// server/routes/api-proxy.js
const express = require('express');
const router = express.Router();

router.post('/deepgram/transcribe', async (req, res) => {
  // Call Deepgram API from backend with secret key
  const response = await fetch('https://api.deepgram.com/v1/listen', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${process.env.DEEPGRAM_SECRET_KEY}`,
    },
    body: req.body,
  });

  const data = await response.json();
  res.json(data);
});

module.exports = router;
```

### 3. Implement Rate Limiting

```typescript
// Rate limiting wrapper
export class RateLimitedAPI extends APIService {
  private requestQueue: Array<() => Promise<any>> = [];
  private requestsPerSecond: number;
  private lastRequestTime: number = 0;

  constructor(baseURL: string, apiKey: string, requestsPerSecond: number = 10) {
    super(baseURL, apiKey);
    this.requestsPerSecond = requestsPerSecond;
  }

  private async throttle<T>(fn: () => Promise<T>): Promise<T> {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequestTime;
    const minInterval = 1000 / this.requestsPerSecond;

    if (timeSinceLastRequest < minInterval) {
      await new Promise(resolve => 
        setTimeout(resolve, minInterval - timeSinceLastRequest)
      );
    }

    this.lastRequestTime = Date.now();
    return fn();
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.throttle(() => super.get<T>(endpoint));
  }
}
```

### 4. Handle API Errors Gracefully

```typescript
// Error handling wrapper
export class APIWithErrorHandling extends APIService {
  async safeRequest<T>(
    fn: () => Promise<T>,
    fallback: T
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      console.error('API request failed:', error);
      
      // Show user-friendly notification
      showVisualNotification({
        type: 'error',
        message: 'Service temporarily unavailable',
        duration: 5000,
      });
      
      return fallback;
    }
  }
}
```

---

## 📊 API Monitoring

### Track API Usage

```typescript
// src/services/api-monitor.ts
export class APIMonitor {
  private static requests: Map<string, number> = new Map();

  static trackRequest(apiName: string) {
    const count = this.requests.get(apiName) || 0;
    this.requests.set(apiName, count + 1);
  }

  static getUsage(): Record<string, number> {
    return Object.fromEntries(this.requests);
  }

  static reset() {
    this.requests.clear();
  }
}

// Usage in API service
export class MonitoredAPI extends APIService {
  async get<T>(endpoint: string): Promise<T> {
    APIMonitor.trackRequest(this.constructor.name);
    return super.get<T>(endpoint);
  }
}
```

---

## 🧪 Testing API Integrations

### Mock API Responses

```typescript
// src/services/__mocks__/sign-language-api.ts
import { vi } from 'vitest';

export class SignLanguageAPI {
  translateToSign = vi.fn().mockResolvedValue({
    text: 'Hello',
    videoUrl: 'https://example.com/video.mp4',
    language: 'ASL',
  });

  getSignVideo = vi.fn().mockResolvedValue({
    videoUrl: 'https://example.com/sign.mp4',
  });
}
```

### Test API Component

```typescript
// src/components/__tests__/SignLanguageTranslator.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignLanguageTranslator from '../SignLanguageTranslator';

vi.mock('../services/sign-language-api');

test('translates text to sign language', async () => {
  const user = userEvent.setup();
  render(<SignLanguageTranslator />);

  const input = screen.getByPlaceholderText(/enter text/i);
  await user.type(input, 'Hello');

  const button = screen.getByRole('button', { name: /translate/i });
  await user.click(button);

  await waitFor(() => {
    expect(screen.getByRole('video')).toBeInTheDocument();
  });
});
```

---

## 📚 Recommended Deaf-Accessible APIs

### Sign Language Services
- **SignAll**: Multi-language sign language translation
- **Signing Savvy**: ASL dictionary and learning
- **Spread the Sign**: International sign language dictionary

### Captioning Services
- **Rev.ai**: Automated speech recognition
- **Deepgram**: Real-time transcription
- **Otter.ai**: Meeting transcription
- **Web Captioner**: Browser-based captioning

### Video Communication
- **Agora**: Real-time video with quality optimization
- **Twilio Video**: Programmable video API
- **Daily.co**: Video conferencing API
- **Zoom SDK**: Video meetings integration

### Accessibility Testing
- **accessiBe**: Accessibility compliance
- **UserWay**: AI-powered accessibility
- **AudioEye**: Digital accessibility platform

---

## 🔗 Additional Resources

- [RapidAPI Hub](https://rapidapi.com/hub)
- [Public APIs Directory](https://github.com/public-apis/public-apis)
- [APIs.guru](https://apis.guru/)
- [Postman API Network](https://www.postman.com/explore)

---

**Last Updated**: 2025-12-15

For API integration help, please open a GitHub issue.
