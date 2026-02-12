# 🎯 Quick Start Guide - MBTQ.dev

## Welcome to MBTQ.dev!

This guide will get you up and running with the MBTQ.dev platform in 5 minutes.

---

## 🚀 What is MBTQ.dev?

MBTQ.dev is a **transparent, open-source generative AI development platform** that teaches you how to build full-stack applications with:
- 🤖 Generative AI (GPT-4, Claude, Gemini)
- 🔌 Supabase backend (database, auth, storage)
- ⚡ Modern frameworks (React, Next.js)
- ♿ Accessibility-first design
- 🎨 Production-ready templates

### What Happened to Business Features?

The original **business validation and entrepreneurship features** have migrated to the **BUSINESS MAGICIAN** platform (powered by 360 Magicians AI). MBTQ.dev now focuses on **developer tools and education**.

---

## 📖 Three Ways to Use MBTQ.dev

### 1. 🌐 View the Live Site
Visit: **[https://pinkycollie.github.io/mbtq-dev/](https://pinkycollie.github.io/mbtq-dev/)**
- See the landing page
- Try the React app at `/app/`
- Read the documentation

### 2. 💻 Run Locally
```bash
# Clone the repository
git clone https://github.com/pinkycollie/mbtq-dev.git
cd mbtq-dev

# Install client dependencies
cd client
npm install

# Start development server
npm run dev

# Visit http://localhost:5173
```

### 3. 🚀 Deploy Your Own
Follow the [GitHub Pages Setup Guide](./GITHUB_PAGES_SETUP.md) to deploy your own version.

---

## 📚 Documentation Guide

### Start Here
1. **[README.md](./README.md)** - Overview, features, quick start
2. **[This file](./QUICK_START.md)** - You are here!

### Building Apps
3. **[BACKEND_CONNECTOR_GUIDE.md](./BACKEND_CONNECTOR_GUIDE.md)** - Learn Supabase
   - How to set up authentication
   - Database operations (CRUD)
   - Real-time features
   - File storage
   - Edge functions
   - API integration

### Deploying
4. **[GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md)** - Deploy your app
   - GitHub Pages setup
   - Custom domains
   - Alternative hosting (Vercel, Netlify)

### Advanced AI
5. **[llm-deno-supabase.md](./llm-deno-supabase.md)** - Enterprise AI patterns
   - Multi-model routing
   - Cost optimization
   - Edge functions with AI
   - Production architecture

### Changes Made
6. **[MODERNIZATION_SUMMARY.md](./MODERNIZATION_SUMMARY.md)** - What changed
   - Complete changelog
   - All improvements
   - Migration notes

---

## 🎓 Learning Path

### Beginner: Hello World with Supabase

**Goal**: Display data from Supabase in your React app

1. **Set up Supabase** (5 minutes)
   - Go to [supabase.com](https://supabase.com)
   - Create free account
   - Create new project
   - Copy URL and anon key

2. **Install Supabase** (1 minute)
   ```bash
   cd client
   npm install @supabase/supabase-js
   ```

3. **Create Supabase client** (2 minutes)
   
   Create `client/src/lib/supabase.ts`:
   ```typescript
   import { createClient } from '@supabase/supabase-js'

   const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
   const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

   export const supabase = createClient(supabaseUrl, supabaseKey)
   ```

4. **Add environment variables** (1 minute)
   
   Create `client/.env`:
   ```env
   VITE_SUPABASE_URL=your-url-here
   VITE_SUPABASE_ANON_KEY=your-key-here
   ```

5. **Use in component** (5 minutes)
   ```typescript
   import { useEffect, useState } from 'react'
   import { supabase } from './lib/supabase'

   function MyComponent() {
     const [data, setData] = useState([])

     useEffect(() => {
       async function fetchData() {
         const { data } = await supabase
           .from('your_table')
           .select('*')
         setData(data || [])
       }
       fetchData()
     }, [])

     return <div>{JSON.stringify(data)}</div>
   }
   ```

**Next**: Read [BACKEND_CONNECTOR_GUIDE.md](./BACKEND_CONNECTOR_GUIDE.md) for authentication, real-time, and more!

---

### Intermediate: Add Authentication

**Goal**: Let users sign up and sign in

Read: [BACKEND_CONNECTOR_GUIDE.md - Authentication Section](./BACKEND_CONNECTOR_GUIDE.md#-authentication)

Key concepts:
- Sign up new users
- Sign in existing users
- Listen to auth state changes
- Protect routes

Time: 30 minutes

---

### Advanced: Real-time Features

**Goal**: Update UI automatically when data changes

Read: [BACKEND_CONNECTOR_GUIDE.md - Real-time Section](./BACKEND_CONNECTOR_GUIDE.md#-real-time-features)

Key concepts:
- Subscribe to table changes
- Broadcast messages
- Real-time chat
- Live updates

Time: 45 minutes

---

### Expert: AI Integration

**Goal**: Add generative AI to your app

Read: [llm-deno-supabase.md](./llm-deno-supabase.md)

Key concepts:
- Edge functions with AI APIs
- Multi-model routing
- Cost optimization
- Streaming responses

Time: 2-3 hours

---

## 🛠️ Common Tasks

### Run Development Server
```bash
cd client
npm run dev
# Visit http://localhost:5173
```

### Build for Production
```bash
cd client
npm run build
# Output: client/dist/
```

### Build for GitHub Pages
```bash
cd client
npm run build -- --base=/mbtq-dev/app/
# Output includes correct paths for GitHub Pages
```

### Start Backend Server
```bash
cd server
npm install
npm start
# Runs on http://localhost:4000
```

### Deploy to GitHub Pages
Push to `main` branch - GitHub Actions handles the rest!

---

## 🔍 Troubleshooting

### "Module not found" errors
```bash
cd client
rm -rf node_modules package-lock.json
npm install
```

### "Cannot connect to Supabase"
1. Check `.env` file exists in `client/` directory
2. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
3. Restart dev server after adding `.env`

### "Page not found" on GitHub Pages
1. Wait 5-10 minutes for deployment
2. Check Actions tab for errors
3. Clear browser cache
4. See [GITHUB_PAGES_SETUP.md](./GITHUB_PAGES_SETUP.md) troubleshooting section

### Build fails with TypeScript errors
```bash
cd client
npx tsc --noEmit
# Fix errors shown, then:
npm run build
```

---

## 🎨 Example Projects You Can Build

### 1. Todo App with Real-time Sync
- User authentication
- Create/read/update/delete todos
- Real-time updates across devices
- **Time**: 2-3 hours
- **Guide**: BACKEND_CONNECTOR_GUIDE.md

### 2. AI Chat Application
- User authentication
- Chat with GPT-4/Claude
- Store conversation history
- Real-time typing indicators
- **Time**: 4-6 hours
- **Guide**: llm-deno-supabase.md

### 3. File Sharing Platform
- User authentication
- File upload to Supabase Storage
- Share files with others
- Download tracking
- **Time**: 3-4 hours
- **Guide**: BACKEND_CONNECTOR_GUIDE.md (Storage section)

### 4. Collaborative Notes
- Real-time editing
- User presence
- Version history
- Rich text editing
- **Time**: 6-8 hours
- **Guides**: BACKEND_CONNECTOR_GUIDE.md + Real-time section

---

## 🌟 Key Features

### Already Built In
- ✅ React 18 with TypeScript
- ✅ Tailwind CSS styling
- ✅ Drag & drop widgets (Interact.js)
- ✅ Real-time sync (Socket.IO)
- ✅ Accessibility testing (axe-core)
- ✅ High contrast mode
- ✅ Screen reader optimized

### Ready to Add
- 🔌 Supabase backend (follow guide)
- 🤖 AI features (follow guide)
- 🎨 Your custom features!

---

## 💡 Tips for Success

1. **Start Small**: Follow the Beginner path first
2. **Read the Guides**: 2,600+ lines of documentation available
3. **Use Examples**: Copy/paste code from guides and modify
4. **Test Locally**: Always test before deploying
5. **Check Security**: Never commit `.env` files
6. **Ask for Help**: Open GitHub issues if stuck

---

## 📞 Get Help

- **Documentation**: You're reading it! Check the other guides.
- **GitHub Issues**: [github.com/pinkycollie/mbtq-dev/issues](https://github.com/pinkycollie/mbtq-dev/issues)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- **React Docs**: [react.dev](https://react.dev)

---

## 🚀 Next Steps

1. Choose your path:
   - 🌐 **Just exploring?** Visit the live site
   - 💻 **Want to learn?** Follow the Beginner path
   - 🚀 **Building something?** Read BACKEND_CONNECTOR_GUIDE.md
   - 🎨 **Ready to deploy?** Read GITHUB_PAGES_SETUP.md

2. Join the community:
   - ⭐ Star the repo: [github.com/pinkycollie/mbtq-dev](https://github.com/pinkycollie/mbtq-dev)
   - 💬 Open discussions
   - 🐛 Report bugs
   - 🎁 Contribute code

3. Build something amazing!
   - The platform is yours to use
   - All code is open source
   - Community-driven development
   - Accessibility-first always

---

## 🎯 Goals of MBTQ.dev

1. **Teach**: Show developers how to build full-stack apps
2. **Guide**: Provide clear documentation and examples
3. **Empower**: Give tools for accessibility and AI
4. **Connect**: Build community around inclusive development
5. **Inspire**: Make development accessible to everyone

---

**Ready to start? Pick a guide and dive in! 🚀**

---

**MBTQ.dev © 2025 | Community. Culture. Power. 💜**

*Built with love by the MBTQ.dev community for developers everywhere.*
