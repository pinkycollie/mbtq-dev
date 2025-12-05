# 🌈 MBTQ-dev Starter Kit for  (mbtq.dev)

A production-grade, real-time, drag-resize-accessible React starter for Deaf/Queer adaptive workspaces with integrated Content Fulfillment API.

## 💎 What Makes This Legendary?

**This isn't just another UI kit.** This is a culture-first, accessibility-native, real-time collaborative development platform built by and for the LGBTQ+ and Deaf communities.

### ✨ Core Features

- **🎨 Movable, Resizable Widgets** - Built with Interact.js for smooth, intuitive drag-and-drop
- **🔄 Real-time Multiuser Sync** - Socket.IO powered collaboration
- **♿ Accessibility First** - WCAG compliant, screen-reader optimized, ARIA-enhanced
- **🎭 High Contrast Toggle** - Adaptive visual modes for low vision users
- **🔍 Built-in A11y Testing** - Integrated axe-core for automatic accessibility analysis
- **🏳️‍🌈 Queer & Deaf Culture** - Visual alerts, manifesto, community-driven design
- **⚡ Modern Tech Stack** - React 18, TypeScript, Vite, Tailwind CSS
- **🔌 Modular Architecture** - Ready for DeafAuth, video, AI, and more plug-ins
- **🎯 Content Fulfillment API** - Full-stack API for video requests and creator fulfillment

## 🏗️ Architecture

### Frontend (`client/`)
React-based UI with real-time collaboration and accessibility features.

### Backend API (`server/`)
TypeScript REST API with:
- PostgreSQL database with Prisma ORM
- API key authentication
- Webhook system for notifications
- Creator matching algorithm
- Complete OpenAPI documentation

See [Server README](./server/README.md) for detailed API documentation.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

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
npm install
npm run prisma:generate  # Generate Prisma client
npm run dev              # Start development server
```

The server will start on `http://localhost:4000`

For production deployment, see [Server Deployment Guide](./server/DEPLOYMENT.md).

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
│   │   │   ├── PinkSyncWidget.tsx    # Draggable/resizable widget
│   │   │   ├── A11yBar.tsx           # Accessibility controls
│   │   │   └── Manifesto.tsx         # Community manifesto
│   │   ├── App.tsx                   # Main application
│   │   ├── main.tsx                  # Entry point
│   │   └── index.css                 # Global styles
│   ├── index.html
│   └── package.json
├── server/                    # Backend API & Socket.IO server
│   ├── src/
│   │   ├── middleware/        # Authentication middleware
│   │   ├── routes/            # API endpoints
│   │   ├── services/          # Business logic (webhooks, etc.)
│   │   ├── types/             # TypeScript types
│   │   └── index.ts           # Server entry point
│   ├── prisma/
│   │   ├── schema.prisma      # Database schema
│   │   ├── migrations/        # Database migrations
│   │   └── seed.ts            # Sample data
│   ├── openapi.yaml           # API documentation
│   ├── README.md              # Server documentation
│   ├── DEPLOYMENT.md          # Deployment guide
│   └── package.json
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind + custom theme
├── tsconfig.json              # TypeScript config
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

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Minimal web framework
- **TypeScript** - Type-safe development
- **Socket.IO** - Real-time bidirectional communication
- **PostgreSQL** - Relational database
- **Prisma** - Modern ORM for type-safe database access
- **CORS** - Cross-origin resource sharing

## ♿ Accessibility Features

### Built-in Support
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Screen reader optimization
- ✅ High contrast mode toggle
- ✅ Focus management
- ✅ Semantic HTML
- ✅ Automated axe-core testing

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

## 🎯 Content Fulfillment API

The backend includes a complete API for managing video requests and creator fulfillment:

### Key Features
- **Request Management** - Create and track video requests
- **Creator Bidding** - Creators can bid on requests
- **Project Fulfillment** - Track project completion
- **Webhook Notifications** - Real-time status updates
- **API Key Authentication** - Secure access control
- **Auto-matching** - Smart creator matching algorithm

### API Documentation
- [Server README](./server/README.md) - Complete API guide
- [OpenAPI Spec](./server/openapi.yaml) - API specifications
- [Deployment Guide](./server/DEPLOYMENT.md) - Production deployment

### Quick API Examples

**Create a video request:**
```bash
curl -X POST http://localhost:4000/api/requests \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "title": "ASL Video for Product Launch",
    "description": "Need ASL interpretation...",
    "serviceType": "sign-language",
    "requirements": {"skills": ["ASL"]},
    "budget": 500
  }'
```

**Register webhook:**
```bash
curl -X POST http://localhost:4000/api/webhooks/register \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{"webhookUrl": "https://your-site.com/webhook"}'
```

See [server/README.md](./server/README.md) for complete documentation.

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

## 🔗 Links

- **Website**: [mbtq.dev](https://mbtq.dev)
- **GitHub**: [github.com/pinkycollie/mbtq-dev](https://github.com/pinkycollie/mbtq-dev)
- **Documentation**: Coming soon

## 💖 Acknowledgments

Built with love by the mbtq.dev community.

Special thanks to all AI Agents who make this platform possible.

---

**mbtq.dev © 2025. Community. Culture. Power.**
