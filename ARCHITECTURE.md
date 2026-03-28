# 🚀 Architecture Overview

## System Architecture

MBTQ.dev is a full-stack, production-ready platform designed for accessibility-first development with a focus on deaf and LGBTQ+ communities.

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Browser)                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   React UI   │  │ Visual Alert │  │   Caption    │          │
│  │  Components  │  │    System    │  │   Widget     │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│           │                │                  │                  │
│           └────────────────┴──────────────────┘                  │
│                            │                                     │
└────────────────────────────┼─────────────────────────────────────┘
                             │
                    ┌────────┴────────┐
                    │   HTTP/WSS      │
                    └────────┬────────┘
                             │
┌────────────────────────────┼─────────────────────────────────────┐
│                      Server Layer                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Express + Socket.IO Server                              │   │
│  │  • Security Middleware (Helmet, Rate Limiting)           │   │
│  │  • CORS Configuration                                    │   │
│  │  • Health Checks                                         │   │
│  │  • Real-time Communication                               │   │
│  └──────────────────────────────────────────────────────────┘   │
└───────────────────────────────────────────────────────────────────┘
                             │
                    ┌────────┴────────┐
                    │   External APIs  │
                    └────────┬────────┘
                             │
┌────────────────────────────┼─────────────────────────────────────┐
│                    External Services                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐                 │
│  │  Supabase  │  │Sign Language│  │ Captioning │                 │
│  │  Backend   │  │    APIs     │  │  Services  │                 │
│  └────────────┘  └────────────┘  └────────────┘                 │
└───────────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Client Architecture

```
client/
├── src/
│   ├── components/           # React Components
│   │   ├── PinkSyncWidget.tsx          # Draggable widget
│   │   ├── A11yBar.tsx                 # Accessibility controls
│   │   ├── Manifesto.tsx               # Community manifesto
│   │   ├── VisualNotificationSystem.tsx # Deaf-accessible alerts
│   │   └── CaptionWidget.tsx           # Real-time captions
│   ├── services/             # API Integration Layer (future)
│   │   ├── api-service.ts             # Base API service
│   │   ├── sign-language-api.ts       # Sign language integration
│   │   └── captioning-api.ts          # Captioning services
│   ├── test/                 # Test Configuration
│   └── App.tsx               # Main application
├── Dockerfile                # Production container
└── nginx.conf               # Production web server config
```

### Server Architecture

```
server/
├── index.js                  # Main server file
│   ├── Security Layer
│   │   ├── Helmet.js        # Security headers
│   │   ├── CORS             # Cross-origin control
│   │   └── Rate Limiting    # DDoS protection
│   ├── Socket.IO Layer
│   │   ├── Connection management
│   │   ├── Event broadcasting
│   │   └── Visual alerts
│   └── Health Checks
└── Dockerfile               # Production container
```

---

## Data Flow

### Real-time Communication Flow

```
User Action (Client A)
    │
    ├─ Drag/Resize Widget
    │
    ├─ Emit event to Socket.IO Server
    │      │
    │      └─ Server receives event
    │             │
    │             ├─ Broadcast to all other clients
    │             │
    │             └─ Client B, C, D receive update
    │                    │
    │                    └─ Update UI in real-time
    │
    └─ Visual notification displayed
```

### API Integration Flow

```
Client Component
    │
    ├─ Make API request
    │      │
    │      ├─ Via APIService wrapper
    │      │      │
    │      │      └─ Add authentication
    │      │
    │      └─ Optional: Route through backend proxy (for sensitive APIs)
    │             │
    │             └─ Server handles API key securely
    │
    ├─ Receive response
    │
    └─ Update UI / Show visual notification
```

---

## Security Architecture

### Security Layers

```
┌─────────────────────────────────────────────────────────────┐
│  Layer 1: Network Security                                   │
│  • HTTPS/TLS                                                 │
│  • Security Headers (Helmet.js)                              │
│  • CORS Policy                                               │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────────┐
│  Layer 2: Application Security                               │
│  • Rate Limiting                                             │
│  • Input Validation                                          │
│  • XSS Prevention                                            │
│  • CSRF Protection                                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────────┐
│  Layer 3: Data Security                                      │
│  • Environment Variables                                     │
│  • Secrets Management                                        │
│  • Row Level Security (Supabase)                             │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────┴──────────────────────────────────────┐
│  Layer 4: Monitoring & Auditing                              │
│  • Dependency Scanning (Dependabot)                          │
│  • Security Audits (npm audit)                               │
│  • CodeQL Analysis                                           │
│  • Health Checks                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Deployment Architecture

### Development Environment

```
┌─────────────────────────────────────────────────────────────┐
│  Development Setup                                           │
│                                                              │
│  Client: http://localhost:5173 (Vite Dev Server)            │
│  Server: http://localhost:4000 (Node.js + Socket.IO)        │
│                                                              │
│  • Hot Module Replacement                                   │
│  • Development Environment Variables                        │
│  • Debug Mode Enabled                                       │
└─────────────────────────────────────────────────────────────┘
```

### Production Deployment Options

#### Option 1: Docker Deployment

```
┌─────────────────────────────────────────────────────────────┐
│  Docker Compose Stack                                        │
│                                                              │
│  ┌───────────────────────┐  ┌────────────────────────────┐ │
│  │  Client Container     │  │  Server Container          │ │
│  │  • Nginx:Alpine       │  │  • Node:18-Alpine          │ │
│  │  • Port 3000:80       │  │  • Port 4000:4000          │ │
│  │  • Static Files       │  │  • Socket.IO               │ │
│  └───────────────────────┘  └────────────────────────────┘ │
│             │                           │                   │
│             └───────────┬───────────────┘                   │
│                         │                                   │
│                  Docker Network                             │
└─────────────────────────────────────────────────────────────┘
```

#### Option 2: Serverless Deployment (Vercel)

```
┌─────────────────────────────────────────────────────────────┐
│  Vercel Platform                                             │
│                                                              │
│  Frontend: Static Site + Edge Functions                     │
│  Backend: Serverless Functions (Optional)                   │
│  CDN: Global Distribution                                   │
│  SSL: Automatic HTTPS                                       │
└─────────────────────────────────────────────────────────────┘
```

#### Option 3: Traditional VPS

```
┌─────────────────────────────────────────────────────────────┐
│  VPS Server (Ubuntu/Debian)                                 │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐ │
│  │  Nginx (Reverse Proxy)                                │ │
│  │  • Port 80/443                                        │ │
│  │  • SSL Termination                                    │ │
│  │  • Load Balancing                                     │ │
│  └───────────┬──────────────────────────┬────────────────┘ │
│              │                           │                  │
│  ┌───────────▼───────────┐  ┌───────────▼─────────────┐   │
│  │  Static Files         │  │  Node.js (PM2)          │   │
│  │  /var/www/mbtq-dev    │  │  Socket.IO Server       │   │
│  └───────────────────────┘  └─────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## CI/CD Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  Git Push to GitHub                                          │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│  GitHub Actions Workflow Triggered                           │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ├─ Job 1: Security Scanning
                       │     ├─ npm audit (client)
                       │     ├─ npm audit (server)
                       │     └─ Dependency checks
                       │
                       ├─ Job 2: Linting & Type Check
                       │     ├─ TypeScript compilation
                       │     └─ ESLint (optional)
                       │
                       ├─ Job 3: Build
                       │     ├─ Install dependencies
                       │     ├─ Build client
                       │     └─ Upload artifacts
                       │
                       ├─ Job 4: Accessibility Testing
                       │     ├─ Build preview
                       │     └─ Run a11y checks
                       │
                       └─ Job 5: Deploy (on main branch)
                             ├─ GitHub Pages (client)
                             └─ Or cloud platform
```

---

## Accessibility Architecture

### Visual Notification System

```
Event/Alert
    │
    ├─ Audio Alert? ❌ (Excluded for deaf accessibility)
    │
    └─ Visual Notification
           │
           ├─ Type: info | success | warning | error
           ├─ Icon: Emoji indicator
           ├─ Color: High contrast background
           ├─ Position: Top-right corner
           ├─ Duration: Auto-dismiss or manual
           └─ ARIA: role="alert" aria-live="assertive"
```

### Caption System Architecture

```
Video/Audio Content
    │
    ├─ Real-time Captioning API
    │     │
    │     ├─ Speech-to-Text conversion
    │     └─ WebSocket stream
    │
    └─ Caption Widget
          │
          ├─ Configurable Settings
          │     ├─ Font size (small/medium/large)
          │     ├─ Background (black/white/transparent)
          │     └─ Position (top/bottom)
          │
          └─ Display
                ├─ High contrast text
                ├─ ARIA live region
                └─ Keyboard accessible controls
```

---

## Technology Stack Overview

### Frontend Stack

```
┌─────────────────────────────────────────────────────────────┐
│  Presentation Layer                                          │
│  • React 18 (UI Components)                                 │
│  • TypeScript (Type Safety)                                 │
│  • Tailwind CSS (Styling)                                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│  Build & Development                                         │
│  • Vite (Build Tool & Dev Server)                           │
│  • PostCSS & Autoprefixer                                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│  Libraries & Utilities                                       │
│  • Socket.IO Client (Real-time)                             │
│  • Interact.js (Drag & Drop)                                │
│  • axe-core (Accessibility Testing)                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│  Testing                                                     │
│  • Vitest (Unit Tests)                                      │
│  • React Testing Library (Component Tests)                  │
│  • jsdom (DOM Simulation)                                   │
└─────────────────────────────────────────────────────────────┘
```

### Backend Stack

```
┌─────────────────────────────────────────────────────────────┐
│  Runtime & Framework                                         │
│  • Node.js 18+ (JavaScript Runtime)                         │
│  • Express (Web Framework)                                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│  Real-time Communication                                     │
│  • Socket.IO (WebSocket Management)                         │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│  Security Middleware                                         │
│  • Helmet.js (Security Headers)                             │
│  • express-rate-limit (Rate Limiting)                       │
│  • CORS (Cross-Origin Control)                              │
│  • dotenv (Environment Configuration)                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Scalability Considerations

### Horizontal Scaling

```
┌─────────────────────────────────────────────────────────────┐
│  Load Balancer (Nginx/Cloud LB)                              │
└──────────────┬──────────────┬──────────────┬────────────────┘
               │              │              │
       ┌───────▼──────┐ ┌────▼──────┐ ┌─────▼──────┐
       │ Server 1     │ │ Server 2  │ │ Server 3   │
       │ Node.js      │ │ Node.js   │ │ Node.js    │
       │ Socket.IO    │ │ Socket.IO │ │ Socket.IO  │
       └──────────────┘ └───────────┘ └────────────┘
               │              │              │
       ┌───────▼──────────────▼──────────────▼────────────┐
       │  Shared Session Store (Redis)                    │
       │  • Socket.IO Adapter                             │
       │  • Session Management                            │
       └──────────────────────────────────────────────────┘
```

### Caching Strategy

```
┌─────────────────────────────────────────────────────────────┐
│  CDN (Static Assets)                                         │
│  • JavaScript bundles                                       │
│  • CSS files                                                │
│  • Images                                                   │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│  Application Server                                          │
│  • Dynamic content                                          │
│  • API responses                                            │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│  Redis Cache                                                 │
│  • Session data                                             │
│  • API response cache                                       │
│  • Rate limiting counters                                   │
└─────────────────────────────────────────────────────────────┘
```

---

## Monitoring & Observability

```
┌─────────────────────────────────────────────────────────────┐
│  Application Metrics                                         │
│  • Response times                                           │
│  • Request counts                                           │
│  • Error rates                                              │
│  • WebSocket connections                                    │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│  Error Tracking (Sentry)                                     │
│  • JavaScript errors                                        │
│  • API errors                                               │
│  • Performance issues                                       │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│  Infrastructure Monitoring                                   │
│  • Server health                                            │
│  • Database connections                                     │
│  • Memory usage                                             │
│  • CPU usage                                                │
└──────────────────────┬──────────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────────┐
│  Log Aggregation                                             │
│  • Application logs                                         │
│  • Access logs                                              │
│  • Error logs                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Future Architecture Enhancements

### Planned Improvements

1. **Microservices Architecture**
   - Separate services for different features
   - Independent scaling
   - Better fault isolation

2. **Message Queue Integration**
   - RabbitMQ or AWS SQS
   - Async job processing
   - Better scalability

3. **GraphQL API**
   - Flexible data fetching
   - Reduced over-fetching
   - Better client-server communication

4. **Service Mesh**
   - Istio or Linkerd
   - Advanced traffic management
   - Enhanced observability

---

**Last Updated**: 2025-12-15

For implementation details, see the respective documentation files.

## 🌐 Network & Infrastructure Endpoints

### Database (Postgres)
- **Pathway API**: `db.hhgmgvhrmebkiscphirp.supabase.co`
- **PinkSync API**: `db.ubvtrnhabtlpznqbuzrx.supabase.co`

### Storage & S3
- **Pathway S3**: `https://hhgmgvhrmebkiscphirp.supabase.co/storage/v1/s3`
- **PinkSync S3**: `https://ubvtrnhabtlpznqbuzrx.supabase.co/storage/v1/s3`
