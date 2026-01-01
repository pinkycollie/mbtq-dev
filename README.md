# 🌈 MBTQ.dev - AI-Powered Full-Stack Development Platform

[![CI/CD Pipeline](https://github.com/pinkycollie/mbtq-dev/actions/workflows/ci.yml/badge.svg)](https://github.com/pinkycollie/mbtq-dev/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/pinkycollie/mbtq-dev/actions/workflows/deploy.yml/badge.svg)](https://github.com/pinkycollie/mbtq-dev/actions/workflows/deploy.yml)
[![License](https://img.shields.io/badge/license-Open%20Source-blue.svg)](https://github.com/pinkycollie/mbtq-dev)
[![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Accessibility](https://img.shields.io/badge/A11y-WCAG%20Compliant-green?logo=accessibility)](https://www.w3.org/WAI/WCAG21/quickref/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**A transparent, open-source generative AI development starter** that teaches and guides developers to build full-stack applications with modern tools like Supabase, Next.js, and React.

> 🌐 **Live Demo**: [https://pinkycollie.github.io/mbtq-dev/](https://pinkycollie.github.io/mbtq-dev/)
> 
> 📖 **Documentation**: 
> - [Quick Start for Non-Developers](./QUICK_START_GUIDE.md) - 🎯 **Start here if you're new!**
> - [Connect Your Repository](./REPOSITORY_INTEGRATION.md) - 🔗 Integrate MBTQ.dev with your project
> - [AI Agent Guide](./docs/AI-AGENT-GUIDE.md) - 🤖 Meet Quinn, your AI development assistant with Fibonrose task validation
> - [Architecture Overview](./ARCHITECTURE.md) - System architecture and design
> - [Deployment Guide](./DEPLOYMENT.md) - Complete production deployment guide
> - [Auto DevOps Guide](./AUTO_DEVOPS.md) - 🚀 Automated deployment and updates
> - [Release Management](./RELEASES.md) - 🏷️ Semantic versioning and tagging
> - [Security Policy](./SECURITY.md) - Security best practices and policies
> - [Testing Guide](./TESTING.md) - Testing strategy and practices
> - [API Integration Guide](./API.md) - Integrating third-party APIs
> - [Git Manager Guide](./GIT_MANAGER.md) - Advanced Git commands and workflows
> - [Contributing Guide](./CONTRIBUTING.md) - How to contribute
> - [Backend Connector Guide](./BACKEND_CONNECTOR_GUIDE.md) - Complete Supabase & API integration guide
> - [GitHub Pages Setup](./GITHUB_PAGES_SETUP.md) - Deploy your own instance
> - [LLM Integration Guide](./llm-deno-supabase.md) - Advanced AI integration patterns

## 📢 Platform Evolution

**Important Update:** MBTQ.dev was originally created as a platform to help deaf entrepreneurs with idea validation, building, growth, and management. These core **business features have been migrated to the BUSINESS MAGICIAN platform**, powered by 360 Magicians (Generative AI).

**Current Focus:** MBTQ.dev now serves as an educational and starter kit platform focusing on:
- 🤖 Generative AI integration for full-stack apps
- 🔌 Backend connectors (Supabase, APIs, databases)
- ⚡ Modern framework templates (Next.js, React)
- ♿ Accessibility-first development
- 📚 Teaching developers to find and integrate APIs
- 🎨 Production-ready starter kits
- 🐳 Docker containerization and deployment
- 🔒 Security best practices and CI/CD pipelines
- 🧪 Comprehensive testing infrastructure

## 💎 What Makes This Platform Unique?

**Built by and for the LGBTQ+ and Deaf communities**, this is a culture-first, accessibility-native platform that combines:
- Real-time collaborative development tools
- Generative AI guidance for building full-stack applications
- Transparent documentation and open-source philosophy

### ✨ Core Features

#### 🤖 Generative AI Integration
- **AI-Powered Development** - Learn to integrate GPT-4, Claude, and Gemini into your apps
- **Full-Stack Templates** - Production-ready examples with AI features
- **Best Practices** - Enterprise-grade patterns for LLM integration

#### 🔌 Backend Connectors
- **Supabase Integration** - Complete guides for auth, database, storage, and edge functions
- **API Discovery** - Learn how to find, evaluate, and integrate third-party APIs
- **Real-time Features** - WebSocket, Server-Sent Events, and real-time database sync

#### ⚡ Modern Framework Support
- **React 18** - Current implementation with TypeScript
- **Next.js Ready** - Documentation and examples for Next.js migration
- **Vite/Build Tools** - Modern build configuration (can be replaced with framework-specific tools)

#### ♿ Accessibility First
- **WCAG Compliant** - Screen-reader optimized, ARIA-enhanced
- **Visual Notifications** - Deaf-friendly notification system (no audio cues)
- **Caption Widget** - Real-time captioning support for video content
- **High Contrast Toggle** - Adaptive visual modes for low vision users
- **Keyboard Navigation** - Full keyboard accessibility
- **Built-in A11y Testing** - Integrated axe-core for automatic accessibility analysis

#### 🏳️‍🌈 Community & Culture
- **Queer & Deaf Culture** - Community-driven design principles
- **Open Source** - Transparent development, community contributions welcome
- **Educational Focus** - Teach and guide, not just provide solutions

## 🤖 AI Development Assistant (Quinn)

Meet **Quinn**, your MBTQ development assistant powered by the **Fibonrose Task Validation System**.

### What is Quinn?

Quinn is an AI agent specifically designed to help you build and maintain the MBTQ platform. Quinn provides:

- 🏗️ **Code Architecture Guidance** - Get expert advice on structuring your code
- ⚡ **Feature Implementation** - Step-by-step assistance building new features
- 🐛 **Debugging Assistance** - Help diagnosing and fixing issues
- 📝 **PR Review & Suggestions** - Automated code review with actionable feedback
- 📚 **Documentation Generation** - Auto-generate docs from your code
- ✅ **Best Practices Consultation** - Ensure you're following React/TypeScript standards

### 🌹 Fibonrose Task Validation System

**Fibonrose** ensures tasks are truly complete, not just marked as "done". It combines:
- **Fibonacci sequence** for proportional validation based on complexity
- **Evidence-based completion** with verifiable checkpoints
- **Progressive confidence** as each milestone is confirmed

#### How It Works:

1. **Task Creation** - Quinn assesses complexity (0-9) and creates Fibonacci-based checkpoints
2. **Progress Tracking** - Confirm milestones with evidence (commits, tests, screenshots)
3. **Completion Validation** - Only complete when ALL checkpoints are verified

#### Example:

```markdown
Task: Add loading spinner component (Complexity 3)

🌹 Fibonrose Checklist:
- [x] Checkpoint 1: Component created (commit: abc123)
- [x] Checkpoint 2: Styled and responsive (screenshot: spinner.png)
- [x] Checkpoint 3: Tests passing (coverage: 100%)

Status: ✅ COMPLETE - All confirmations validated!
```

#### Task Complexity Levels:

| Complexity | Confirmations | Example |
|-----------|---------------|---------|
| 0-1 | 1 | Fix typo, update docs |
| 2 | 2 | Add component prop, update config |
| 3 | 3 | Create UI component, add API endpoint |
| 4 | 5 | Implement feature with tests |
| 5 | 8 | Build complete feature |
| 6+ | 13+ | Major architectural changes |

### Getting Started with Quinn

1. **Create an issue** describing your task or question
2. **Quinn responds** with guidance and creates a Fibonrose checklist if applicable
3. **Confirm checkpoints** as you complete them with evidence
4. **Task validated** automatically when all confirmations are in

📖 **Full Guide**: [AI Agent Guide](./docs/AI-AGENT-GUIDE.md)

---

## 🚀 Getting Started

### Quick Start Options

#### Option 1: Use Current React + Vite Setup (Fastest)
For rapid prototyping and learning, the current setup is ready to go.

#### Option 2: Migrate to Next.js (Recommended for Production)
Next.js provides better performance, SEO, and full-stack capabilities. See our [Next.js Migration Guide](./docs/nextjs-migration.md) (coming soon).

### Prerequisites

- Node.js 18+
- npm or yarn
- A Supabase account (free tier available at [supabase.com](https://supabase.com))

### Current Setup (React + Vite)

### 1. Install Dependencies

#### Client
```bash
cd client
npm install
```

#### Server
```bash
cd server
npm install
```

### 2. Start Backend

```bash
cd server
npm start
```

The server will start on `http://localhost:4000`

### 3. Start Frontend

```bash
cd client
npm run dev
```

The client will start on `http://localhost:5173`

### 4. Open Your Browser

Navigate to [http://localhost:5173/](http://localhost:5173/)

## 🏗️ Project Structure

```
mbtq-pinksync-starter-kit/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── PinkSyncWidget.tsx           # Draggable/resizable widget
│   │   │   ├── A11yBar.tsx                  # Accessibility controls
│   │   │   ├── Manifesto.tsx                # Community manifesto
│   │   │   ├── VisualNotificationSystem.tsx # Deaf-accessible notifications
│   │   │   ├── CaptionWidget.tsx            # Real-time captions
│   │   │   └── __tests__/                   # Component tests
│   │   ├── test/
│   │   │   └── setup.ts                     # Test configuration
│   │   ├── App.tsx                          # Main application
│   │   ├── main.tsx                         # Entry point
│   │   └── index.css                        # Global styles
│   ├── Dockerfile                           # Client Docker config
│   ├── nginx.conf                           # Nginx production config
│   ├── vitest.config.ts                     # Test configuration
│   └── package.json
├── server/                    # Socket.IO backend
│   ├── index.js              # Real-time sync server with security
│   ├── Dockerfile            # Server Docker config
│   └── package.json
├── .github/
│   ├── workflows/
│   │   ├── ci.yml            # CI/CD pipeline
│   │   └── deploy.yml        # GitHub Pages deployment
│   └── dependabot.yml        # Automated dependency updates
├── docker-compose.yml         # Multi-container orchestration
├── DEPLOYMENT.md             # Production deployment guide
├── SECURITY.md               # Security policies
├── TESTING.md                # Testing guide
├── API.md                    # API integration guide
├── CONTRIBUTING.md           # Contribution guidelines
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind + custom theme
├── tsconfig.json             # TypeScript config
└── README.md
```

## 🎨 Technology Stack

### Frontend
- **React 18** - Modern, component-based UI
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling with custom mbtq theme
- **Interact.js** - Best-in-class drag and resize
- **Socket.IO Client** - Real-time communication
- **axe-core** - Automated accessibility testing
- **Vitest** - Fast unit test framework
- **React Testing Library** - Component testing

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Minimal web framework
- **Socket.IO** - Real-time bidirectional communication
- **Helmet** - Security headers middleware
- **express-rate-limit** - Rate limiting protection
- **dotenv** - Environment configuration
- **CORS** - Cross-origin resource sharing

### DevOps & Deployment
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Production web server
- **GitHub Actions** - CI/CD automation
- **Dependabot** - Automated dependency updates

## ♿ Accessibility Features

### Built-in Support
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Screen reader optimization
- ✅ Visual notifications (no audio cues)
- ✅ Caption widget for video content
- ✅ High contrast mode toggle
- ✅ Focus management
- ✅ Semantic HTML
- ✅ Automated axe-core testing

### Deaf-Specific Features
- **Visual Notification System** - All alerts are visual, no audio cues
- **Caption Widget** - Real-time caption display with customizable styling
- **Sign Language Ready** - Components ready for sign language API integration
- **Video Communication Support** - Optimized for video-based communication

### Accessibility Bar
The bottom bar provides:
- **High Contrast Toggle** - Switch between normal and high-contrast modes
- **A11y Check** - Run automated accessibility analysis (results in console)

## 🔄 Real-time Features

### Sync Events
- **Move** - Widget position updates broadcast to all connected clients
- **Resize** - Widget dimension changes sync in real-time
- **Visual Alerts** - Deaf-priority notifications system

### How It Works
1. Client connects to Socket.IO server
2. User interacts with widget (drag/resize)
3. Events emit to server
4. Server broadcasts to all other clients
5. All clients update in real-time

---

## 🚀 Production Features

### Security
- ✅ **Helmet.js** - Security headers (XSS, clickjacking protection)
- ✅ **Rate Limiting** - Prevent API abuse
- ✅ **CORS Configuration** - Secure cross-origin requests
- ✅ **Environment Variables** - Secure credential management
- ✅ **Input Validation** - Prevent injection attacks
- ✅ **No Secrets in Code** - Best practices enforced

### CI/CD Pipeline
- ✅ **Automated Testing** - Unit and integration tests on every commit
- ✅ **Type Checking** - TypeScript validation
- ✅ **Security Scanning** - npm audit for vulnerabilities
- ✅ **Build Verification** - Ensure builds succeed
- ✅ **Accessibility Checks** - Automated a11y testing
- ✅ **Automated Deployment** - GitHub Actions workflow

### Testing
- ✅ **Unit Tests** - Vitest + React Testing Library
- ✅ **Component Tests** - Test user interactions
- ✅ **Accessibility Tests** - axe-core integration
- ✅ **Test Coverage** - Track code coverage
- ✅ **CI Integration** - Tests run on every PR

### Docker Support
- ✅ **Client Dockerfile** - Nginx-based production container
- ✅ **Server Dockerfile** - Node.js production container
- ✅ **Docker Compose** - Multi-container orchestration
- ✅ **Health Checks** - Container health monitoring
- ✅ **Optimized Images** - Alpine-based for small footprint

### Monitoring & Observability
- ✅ **Health Endpoints** - `/health` for monitoring
- ✅ **Structured Logging** - Environment-aware logging
- ✅ **Error Tracking Ready** - Sentry integration prepared
- ✅ **Performance Monitoring** - Ready for analytics integration

---

## 🎭 The mbtq.dev Manifesto

Click the **Manifesto** button to view our community principles:

- Empower Deaf, Queer, Disabled creators with world-class tools
- AI must serve culture, not erase it
- Design has radical inclusivity baked in
- Our code is Open—a community, not a product
- If it doesn't make you smile, remix it until it does

## 🔌 Extensibility

This starter kit is designed to be extended with:

- **@mbtq.dev/deafauth** - Sign language video authentication
- **@mbtq.dev/ai-gen** - AI-powered accessible code generation
- **@mbtq.dev/video** - Accessible video chat
- **GitHub HTML Import** - Import and preview HTML from repositories
- **Figma Sync** - Real-time design collaboration

## 🛠️ Development

### Build for Production

```bash
cd client
npm run build
```

### Preview Production Build

```bash
cd client
npm run preview
```

### Environment Variables

Create a `.env` file in the client directory:

```env
VITE_SOCKET_SERVER_URL=http://localhost:4000
```

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  fuchsia: { /* your colors */ },
  blue: { /* your colors */ },
  pink: { /* your colors */ },
}
```

### Adding Widgets

Create new components in `client/src/components/` and import them in `App.tsx`:

```tsx
import MyWidget from "./components/MyWidget";

// In App.tsx
<MyWidget socket={socket} />
```

## 🤝 Contributing

PRs welcome! We especially encourage contributions from:

- Deaf and Hard of Hearing developers
- LGBTQ+ community members
- Accessibility experts
- Anyone passionate about inclusive technology

### Contribution Guidelines

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test accessibility (run A11y Check)
5. Submit a pull request

## 📝 License

Open source. See LICENSE for details.

## 🤖 Generative AI & Supabase Integration Guide

### Setting Up Your Supabase Backend

1. **Create a Supabase Project**
   - Visit [supabase.com](https://supabase.com) and create a free account
   - Create a new project and note your project URL and anon key

2. **Install Supabase Client**
   ```bash
   npm install @supabase/supabase-js
   ```

3. **Initialize Supabase in Your App**
   ```typescript
   import { createClient } from '@supabase/supabase-js'

   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
   const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

   export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   ```

4. **Add Environment Variables**
   Create a `.env` file:
   ```env
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   VITE_SOCKET_SERVER_URL=http://localhost:4000
   ```

### Key Supabase Features

#### Authentication
```typescript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword'
})

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword'
})

// Get current user
const { data: { user } } = await supabase.auth.getUser()
```

#### Database Operations
```typescript
// Insert data
const { data, error } = await supabase
  .from('users')
  .insert({ name: 'John', email: 'john@example.com' })

// Query data
const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('email', 'john@example.com')

// Update data
const { data, error } = await supabase
  .from('users')
  .update({ name: 'Jane' })
  .eq('id', userId)

// Delete data
const { data, error } = await supabase
  .from('users')
  .delete()
  .eq('id', userId)
```

#### Real-time Subscriptions
```typescript
// Subscribe to changes
const channel = supabase
  .channel('public:posts')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => {
      console.log('Change received!', payload)
    }
  )
  .subscribe()

// Unsubscribe when done
supabase.removeChannel(channel)
```

#### Storage
```typescript
// Upload file
const { data, error } = await supabase.storage
  .from('avatars')
  .upload('public/avatar.png', file)

// Get public URL
const { data } = supabase.storage
  .from('avatars')
  .getPublicUrl('public/avatar.png')
```

### Integrating Generative AI

For complete AI integration patterns with Deno Edge Functions and multiple LLM providers, see our comprehensive guide:

📖 **[LLM + Deno + Supabase Architecture Guide](./llm-deno-supabase.md)**

This guide covers:
- Multi-model AI routing (GPT-4, Claude, Gemini)
- Cost optimization strategies
- Edge function deployment
- Real-time AI streaming
- Security and guardrails
- Production-grade patterns

### Finding and Using APIs

1. **API Discovery Resources**
   - [RapidAPI](https://rapidapi.com) - Marketplace of APIs
   - [Postman Public API Network](https://www.postman.com/explore) - API discovery
   - [Public APIs](https://github.com/public-apis/public-apis) - Curated list

2. **Integration Pattern**
   ```typescript
   // Example: Weather API integration
   async function getWeather(city: string) {
     const response = await fetch(
       `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
     )
     return response.json()
   }
   ```

3. **Best Practices**
   - Always store API keys in environment variables
   - Use server-side endpoints to protect keys
   - Implement rate limiting and caching
   - Handle errors gracefully
   - Read API documentation thoroughly

### Building Full-Stack Apps with MBTQ.dev

1. **Frontend**: Use our React templates or migrate to Next.js
2. **Backend**: Supabase for database, auth, and storage
3. **APIs**: Integrate third-party services as needed
4. **AI Features**: Use Supabase Edge Functions with LLM APIs
5. **Deployment**: Vercel/Netlify for frontend, Supabase handles backend

## 🎯 Migration to BUSINESS MAGICIAN

For business-focused features (idea validation, market research, business planning), visit the **BUSINESS MAGICIAN** platform powered by 360 Magicians AI:

- ✓ Idea Validation & Market Research
- ✓ Business Plan Generation
- ✓ Growth Strategy Planning
- ✓ Managed Services for Entrepreneurs
- ✓ Deaf Entrepreneur Support

These features are now handled by specialized AI agents on the BUSINESS MAGICIAN platform.

## 🔗 Links

- **Website**: [mbtq.dev](https://mbtq.dev)
- **GitHub**: [github.com/pinkycollie/mbtq-dev](https://github.com/pinkycollie/mbtq-dev)
- **Documentation**: Coming soon

## 💖 Acknowledgments

Built with love by the mbtq.dev community.

Special thanks to all AI Agents who make this platform possible.

---

**mbtq.dev © 2025. Community. Culture. Power.**
