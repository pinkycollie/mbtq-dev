# 🔗 Connect Your Repository to MBTQ.dev Platform

This guide helps you integrate MBTQ.dev's automation features with your own repository.

---

## 🎯 Overview

You can use MBTQ.dev's features in three ways:

1. **Fork MBTQ.dev** - Get everything pre-configured ✅ **Easiest**
2. **Use as Template** - Copy workflows to your project
3. **Manual Integration** - Pick specific features

---

## ✅ Option 1: Fork MBTQ.dev (Recommended)

**Best for:** Starting a new project or learning

### Steps:

1. **Fork the repository:**
   - Go to [github.com/pinkycollie/mbtq-dev](https://github.com/pinkycollie/mbtq-dev)
   - Click "Fork" (top right)
   - Wait for GitHub to create your copy

2. **Enable GitHub Actions:**
   - Go to your fork → Settings → Actions
   - Select "Allow all actions and reusable workflows"
   - Click "Save"

3. **Enable GitHub Pages:**
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `main`, Folder: `/` (root)
   - Click "Save"

4. **Customize for your project:**
   ```bash
   # Clone your fork
   git clone https://github.com/YOUR_USERNAME/mbtq-dev.git
   cd mbtq-dev
   
   # Update package.json names
   # Edit client/package.json and server/package.json
   ```

5. **Push changes:**
   ```bash
   git add .
   git commit -m "feat: customize for my project"
   git push
   ```

**Done!** You now have:
- ✅ Automatic deployments
- ✅ Automated testing
- ✅ Security scanning
- ✅ Dependency updates
- ✅ Release management

---

## 📦 Option 2: Use as Template

**Best for:** Integrating into an existing project

### Copy Workflow Files

```bash
# In your project root
mkdir -p .github/workflows

# Copy CI/CD workflows
curl -o .github/workflows/ci.yml \
  https://raw.githubusercontent.com/pinkycollie/mbtq-dev/main/.github/workflows/ci.yml

curl -o .github/workflows/deploy.yml \
  https://raw.githubusercontent.com/pinkycollie/mbtq-dev/main/.github/workflows/deploy.yml

curl -o .github/workflows/release.yml \
  https://raw.githubusercontent.com/pinkycollie/mbtq-dev/main/.github/workflows/release.yml

# Copy Dependabot config
curl -o .github/dependabot.yml \
  https://raw.githubusercontent.com/pinkycollie/mbtq-dev/main/.github/dependabot.yml
```

### Customize Workflows

Edit the workflow files to match your project:

#### 1. Update `ci.yml`

```yaml
# Change working directories
working-directory: ./client  # Change to your frontend path

# Update build/test commands
run: npm test                # Change to your test command
run: npm run build           # Change to your build command
```

#### 2. Update `deploy.yml`

```yaml
# Update deployment paths
publish_dir: ./client/dist   # Change to your build output

# Update domain (if using custom domain)
cname: yourdomain.com
```

#### 3. Update `release.yml`

```yaml
# Update paths if needed
working-directory: ./client
```

#### 4. Update `dependabot.yml`

```yaml
# Update directory paths
directory: "/client"         # Your frontend path
directory: "/server"         # Your backend path (if any)
directory: "/"               # Root dependencies
```

### Commit and Push

```bash
git add .github/
git commit -m "feat: add MBTQ.dev automation workflows"
git push
```

---

## 🔧 Option 3: Manual Integration

**Best for:** Picking specific features only

### Feature 1: Automatic Deployment

**Add to `.github/workflows/deploy.yml`:**

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install and build
        run: |
          npm ci
          npm run build
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Feature 2: Automated Testing

**Add to `.github/workflows/test.yml`:**

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
```

### Feature 3: Dependency Updates

**Add `.github/dependabot.yml`:**

```yaml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

### Feature 4: Release Automation

**Add to `.github/workflows/release.yml`:**

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          generate_release_notes: true
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 🔗 Connect Supabase Backend

### Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Create account (free)
3. Create new project
4. Note your:
   - Project URL
   - Anon key
   - Service role key (keep secret!)

### Step 2: Add to GitHub Secrets

1. Go to your repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add these secrets:
   - `SUPABASE_URL`: Your project URL
   - `SUPABASE_ANON_KEY`: Your anon key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your service role key

### Step 3: Use in Code

**Client-side** (`src/supabase.ts`):

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

**Environment file** (`.env`):

```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Step 4: Add to Workflows

```yaml
- name: Build with Supabase
  env:
    VITE_SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
    VITE_SUPABASE_ANON_KEY: ${{ secrets.SUPABASE_ANON_KEY }}
  run: npm run build
```

---

## 🌐 Deploy to Other Platforms

### Vercel

**Connect your repository:**

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel auto-detects settings
4. Add environment variables
5. Deploy!

**Auto-deploy on push:**
- Every push to `main` → Production
- Every PR → Preview deployment

### Netlify

**Deploy via netlify.toml:**

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[context.production.environment]
  NODE_VERSION = "18"
```

**Connect repository:**
1. Go to [netlify.com](https://netlify.com)
2. Import from GitHub
3. Configure build settings
4. Deploy!

---

## 🛠️ Advanced: Multiple Environments

### Setup

**Create environment-specific workflows:**

```yaml
# .github/workflows/deploy-staging.yml
name: Deploy Staging

on:
  push:
    branches: [develop]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: staging
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to staging
        run: |
          # Deploy to staging environment
```

```yaml
# .github/workflows/deploy-production.yml
name: Deploy Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v4
      - name: Deploy to production
        run: |
          # Deploy to production environment
```

### Environment Variables

**GitHub Settings:**
1. Settings → Environments
2. Create `staging` and `production`
3. Add environment-specific secrets
4. Add protection rules (for production)

---

## 📊 Monitoring & Analytics

### Add Health Checks

```javascript
// server/index.js
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version
  });
});
```

### Monitor with Uptime Robot

1. Sign up at [uptimerobot.com](https://uptimerobot.com) (free)
2. Add monitor:
   - Type: HTTP(s)
   - URL: `https://your-app.com/health`
   - Interval: 5 minutes
3. Get alerts if down

---

## 🔐 Security Best Practices

### Secrets Management

**Never commit secrets!** Always use:
- GitHub Secrets for CI/CD
- Environment variables locally
- `.env` files (add to `.gitignore`)

**Check `.gitignore`:**

```gitignore
# Environment files
.env
.env.local
.env.production

# API keys
**/secrets/
*.key
*.pem
```

### Enable Security Features

**In GitHub Settings → Security:**
- ✅ Dependabot alerts
- ✅ Dependabot security updates
- ✅ Code scanning
- ✅ Secret scanning

---

## 📚 Example Projects

### Basic Static Site

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci && npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### Full-Stack App with Database

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - name: Run database migrations
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_KEY: ${{ secrets.SUPABASE_SERVICE_KEY }}
        run: npm run db:migrate
      - run: npm run build
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 🆘 Troubleshooting

### Workflows Not Running

**Check:**
1. Actions are enabled (Settings → Actions)
2. Workflow file syntax is correct
3. Branch name matches workflow trigger

### Deployment Failing

**Check:**
1. Build succeeds locally: `npm run build`
2. Environment variables are set
3. Secrets are correctly named
4. Output directory is correct

### Dependabot Not Working

**Check:**
1. `dependabot.yml` is in `.github/` directory
2. Directory paths are correct
3. Dependabot is enabled (Settings → Code security)

---

## 🎓 Next Steps

1. ✅ Choose integration option
2. ✅ Set up workflows
3. ✅ Configure secrets
4. ✅ Test deployment
5. ✅ Enable monitoring
6. ✅ Set up releases

---

## 📞 Get Help

**Need assistance?**
- 💬 [GitHub Discussions](https://github.com/pinkycollie/mbtq-dev/discussions)
- 🐛 [Report Issues](https://github.com/pinkycollie/mbtq-dev/issues)
- 📖 [Read Documentation](./README.md)

---

**Last Updated**: 2025-12-20

**mbtq.dev © 2025. Community. Culture. Power.**
