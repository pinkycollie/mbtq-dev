# 🌈 mbtq Quantum Dev - Framework-Agnostic Development Platform

**Not another dev kit: This is culture, quantum agency, adaptive, inclusive.**

A production-ready, quantum-inspired **framework-agnostic** development platform with AI agents, real-time collaboration, multi-language code generation, accessibility-first design, and radical inclusivity. Built by and for the Deaf, Queer, and Disabled communities.

## 💎 What Makes This Legendary?

This isn't just another UI kit or starter template. **mbtq Quantum Dev** is a complete, extensible development ecosystem with **pure React components** that work anywhere:

- 🎯 **Framework Agnostic** - Pure React packages work with Vite, Next.js, Remix, Astro, Gatsby, or any React framework
- 🤖 **AI-Powered Development** - Conversational agents ready for OpenAI, Claude, Gemini, local Rust/Deno
- 🖥️ **Quantum Terminal** - Web-based shell with Deno, Rust, and JavaScript runtime support
- ✨ **Code Generation** - SaaS templates, Zod schemas, multi-language snippets (Rust, TypeScript, Deno, HTML)
- 🔄 **Real-time Sync** - Drag-drop-resize widgets with Socket.IO multiuser collaboration
- ♿ **Accessibility Native** - WCAG compliant, screen-reader optimized, high-contrast modes, axe-core integrated
- 🎨 **Quantum Snippets** - Multi-language code library with drag-drop-copy-export
- 🏗️ **Modular Monorepo** - Extensible architecture with workspace packages
- 🐳 **Docker Ready** - Full containerization for dev and production
- ⚡ **Turbo + pnpm** - Lightning-fast build system

---

## 🏗️ Monorepo Architecture

```
mbtq-quantum-dev/
├── apps/
│   └── web/              # Framework-agnostic React + Vite UI
│                         # (Easily adaptable to Next.js, Remix, Astro, etc.)
├── packages/
│   ├── quantum-core/     # Core widgets (A11yBar, QuantumSnippets)
│   ├── terminal-tools/   # QuantumTerminal with multi-runtime support
│   ├── ai-agent/         # QuantumAgentChat - conversational codegen
│   ├── codegen/          # SaaS template generator, Zod schemas
│   └── pinksync/         # Real-time drag/resize/sync widgets
├── server/               # Socket.IO backend for real-time features
├── docker/               # Docker compose and containerization
├── scripts/              # Development automation
├── pnpm-workspace.yaml   # Workspace configuration
├── turbo.json            # Turbo build pipeline
└── package.json          # Monorepo root
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+**
- **pnpm 8+** (recommended) or npm
- **Docker** (optional, for containerized development)

### Option 1: Local Development (Fastest)

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install all dependencies
pnpm install

# Start everything (server + web)
./scripts/dev.sh
```

Or start services individually:

```bash
# Terminal 1: Start Socket.IO server
cd server
npm install
npm start

# Terminal 2: Start web app
pnpm --filter @mbtq/web dev
```

The application will be available at:
- **Web App**: http://localhost:5173
- **Server**: http://localhost:4000

### Option 2: Docker Development

```bash
cd docker
docker-compose up
```

---

## ✨ Core Features

### 🤖 Quantum Agent Chat

AI-powered conversational assistant that helps you:
- Generate SaaS templates (dashboards, auth, landing pages)
- Create Zod schemas for type-safe APIs
- Write Rust, Deno, or TypeScript code
- Automate terminal commands
- Improve accessibility

**Ready for integration with:**
- OpenAI GPT-4
- Anthropic Claude
- Google Gemini
- Local Rust/Deno agents

### 🖥️ Quantum Terminal

Interactive web terminal with:
- Theme customization (dark, light, quantum)
- Command execution simulation
- Deno runtime integration (ready)
- Rust WASM support (ready)
- AI agent integration hooks

**Commands:** `help`, `clear`, `theme`, `deno`, `rust`, `agent`, `quantum`, `whoami`, `date`

### ✨ Quantum Snippets

Multi-language code snippet library:
- **Languages**: Zod, Rust, TypeScript, HTML, Deno
- Drag-and-drop to use
- Copy to clipboard
- Add custom snippets
- Export to SaaS templates

### 🏗️ SaaS Template Generator

Generate production-ready templates:
- **Dashboard** - Analytics, stats, tables
- **Authentication** - Login/signup forms
- **Landing Page** - Hero, features, CTA
- **REST API** - TypeScript + Zod validation

All templates are:
- Tailwind CSS styled
- Accessibility compliant
- Mobile responsive
- Copy/download ready

### 🌸 PinkSync Widgets

Real-time collaborative widgets:
- Drag and drop positioning
- Resize handles on all edges
- Socket.IO real-time sync
- Multi-user collaboration
- Visual alerts for Deaf users

### ♿ Accessibility Bar

Built-in accessibility controls:
- High contrast mode toggle
- Automated axe-core testing
- ARIA labels and roles
- Keyboard navigation support
- Screen reader optimization

---

## 📦 Package Overview

### `@mbtq/quantum-core`
Core UI components and accessibility features
- `QuantumSnippets` - Code snippet manager
- `A11yBar` - Accessibility controls

### `@mbtq/terminal-tools`
Terminal and command-line interfaces
- `QuantumTerminal` - Web-based terminal

### `@mbtq/ai-agent`
AI agent and conversational interfaces
- `QuantumAgentChat` - AI assistant

### `@mbtq/codegen`
Code generation and templating
- `SaaSTemplateGen` - Template generator

### `@mbtq/pinksync`
Real-time collaboration widgets
- `PinkSyncWidget` - Drag/resize/sync component

---

## 🔧 Development

### Build All Packages

```bash
pnpm build
```

### Run Specific Package

```bash
pnpm --filter @mbtq/web dev
pnpm --filter @mbtq/quantum-core build
```

### Add New Package

```bash
mkdir -p packages/my-package/src
cd packages/my-package
# Create package.json
# Add to pnpm-workspace.yaml (auto-detected)
```

### Using Turbo

```bash
# Run dev across all packages
turbo run dev

# Build everything in parallel
turbo run build

# Lint all packages
turbo run lint
```

---

## 🐳 Docker

### Development

```bash
cd docker
docker-compose up
```

### Production Build

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

---

## 🎨 Customization

### Theme Colors

Edit `apps/web/tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        fuchsia: { /* custom shades */ },
        blue: { /* custom shades */ },
      }
    }
  }
}
```

### Add AI Backend

Connect to your preferred AI service in `packages/ai-agent/src/QuantumAgentChat.tsx`:

```typescript
// Example: OpenAI integration
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [{ role: 'user', content: userMessage }]
  })
});
```

### Add Deno Runtime

Create a Deno service:

```typescript
// server/deno-runtime.ts
import { serve } from "https://deno.land/std/http/server.ts";

serve((req) => {
  return new Response("Quantum Deno Runtime!");
}, { port: 8000 });
```

### Add Rust Backend

Create a Rust API service with Actix-web or Rocket and integrate via HTTP or WASM.

---

## 🎯 Framework Agnostic Design

The platform is **intentionally framework-agnostic**. All packages (`@mbtq/*`) are pure React components with zero framework dependencies:

- ✅ **Current**: React + Vite (fast dev, optimized builds)
- ✅ **Easy Migration**: Next.js, Remix, Astro, Gatsby, etc.
- ✅ **Pure React**: Components work in any React environment
- ✅ **No Lock-in**: Swap build tools or frameworks anytime

### Migrating to Next.js (if desired)

```bash
# 1. Create Next.js app structure
cd apps
npx create-next-app@latest nextjs-app --typescript --tailwind
cd nextjs-app

# 2. Add workspace packages
npm install @mbtq/quantum-core @mbtq/terminal-tools @mbtq/ai-agent @mbtq/codegen @mbtq/pinksync

# 3. Import components in pages/index.tsx
import { QuantumAgentChat } from '@mbtq/ai-agent';
import { QuantumTerminal } from '@mbtq/terminal-tools';
// ... use as normal React components
```

### Migrating to Remix, Astro, or Other Frameworks

Same approach - install workspace packages and import as React components. The packages are framework-agnostic by design.

---

## 🔌 Extensibility

This platform is designed to be extended with:

- **@mbtq/deafauth** - Sign language video authentication
- **@mbtq/video** - Accessible video chat
- **@mbtq/github-html** - Import HTML from GitHub repos
- **@mbtq/figma-sync** - Real-time design collaboration
- **Custom AI agents** - Plug in any LLM or local model
- **Rust/Deno modules** - Native performance services

---

## 🎭 The mbtq.dev Manifesto

Click the **Manifesto** button in the app to view our community principles:

- 🏳️‍🌈 Empower Deaf, Queer, Disabled creators with world-class tools
- 🤖 AI must serve culture, not erase it
- ♿ Design has radical inclusivity baked in
- 🌐 Our code is Open—a community, not a product
- ✨ If it doesn't make you smile, remix it until it does

---

## 🤝 Contributing

PRs welcome! We especially encourage contributions from:

- Deaf and Hard of Hearing developers
- LGBTQ+ community members
- Accessibility experts
- Anyone passionate about inclusive technology

### Contribution Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test accessibility (run A11y Check in the app)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

---

## 📝 Environment Variables

Create `.env` files in relevant packages:

### `apps/web/.env`

```env
VITE_SOCKET_SERVER_URL=http://localhost:4000
VITE_AI_BACKEND_URL=https://api.your-ai-service.com
```

### `server/.env`

```env
PORT=4000
CORS_ORIGIN=*
```

---

## 🧪 Testing

```bash
# Run tests across all packages
pnpm test

# Run accessibility tests
# (Open app and click "Run A11y Check")
```

---

## 📚 Documentation

- **Architecture**: See `/docs/architecture.md` (coming soon)
- **API Reference**: See `/docs/api.md` (coming soon)
- **Component Library**: See `/docs/components.md` (coming soon)

---

## 🔗 Links

- **Website**: [mbtq.dev](https://mbtq.dev)
- **GitHub**: [github.com/pinkycollie/mbtq-dev](https://github.com/pinkycollie/mbtq-dev)
- **Issues**: [Report bugs or request features](https://github.com/pinkycollie/mbtq-dev/issues)

---

## 📄 License

Open source. See LICENSE for details.

---

## 💖 Acknowledgments

Built with love by the mbtq.dev community.

Special thanks to all Deaf, Queer, and Disabled contributors who make this platform possible.

**This is quantum. This is radical. This is inclusive. This is mbtq.dev.**

---

## 🌟 What's Next?

- [ ] Add more AI agent backends (OpenAI, Claude, Gemini integration)
- [ ] Implement Deno runtime execution
- [ ] Add Rust WASM modules
- [ ] Create more SaaS templates
- [ ] Build VS Code extension
- [ ] Add video conferencing with sign language support
- [ ] Implement GitHub HTML import feature
- [ ] Create Figma design sync
- [ ] Add more accessibility features
- [ ] Build mobile app

---

**mbtq.dev © 2025. Community. Culture. Power.**

**Not common. Not just code. A quantum revolution.** 🌈✨🚀
