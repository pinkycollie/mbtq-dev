# 🤖 Auto DevOps & Automated Deployment

## Overview

This guide covers automated DevOps, continuous deployment, and automatic updates for MBTQ.dev. Learn how to set up automated workflows for building, testing, and deploying your applications - whether you're a developer or not.

---

## 🎯 What is Auto DevOps?

**Auto DevOps** automatically handles:
- 🔄 **Automatic Updates**: Dependencies stay current
- 🧪 **Automatic Testing**: Code is tested before deployment
- 🚀 **Automatic Deployment**: Changes go live automatically
- 📦 **Automatic Building**: Code is built and packaged
- 🔐 **Automatic Security**: Vulnerabilities are detected
- 📊 **Automatic Monitoring**: Track app health

### For Non-Developers

Think of Auto DevOps like a **robot assistant** that:
- Tests your app to make sure it works ✅
- Builds your app automatically 🏗️
- Deploys it to the internet 🌐
- Updates libraries and packages 📦
- Alerts you if something breaks 🚨

---

## 🚀 Quick Start: Enable Auto DevOps

### Option 1: Use GitHub Actions (Recommended)

**Already Set Up!** MBTQ.dev comes with Auto DevOps pre-configured:

✅ **CI/CD Pipeline** (`.github/workflows/ci.yml`)
- Automatic testing
- Security scanning
- Build verification
- Accessibility checks

✅ **Auto Deployment** (`.github/workflows/deploy.yml`)
- Deploy to GitHub Pages
- Automatic on `main` branch updates

✅ **Dependency Updates** (`.github/dependabot.yml`)
- Automatic dependency updates
- Security vulnerability patches

**To enable for your fork:**
1. Fork the repository
2. Enable GitHub Actions in Settings → Actions
3. Push to `main` branch → Auto deployment starts!

### Option 2: Connect Your Own Repository

Want to use MBTQ.dev platform for your own repository?

1. **Copy the workflow files:**
```bash
# In your project
mkdir -p .github/workflows
cp mbtq-dev/.github/workflows/* .github/workflows/
cp mbtq-dev/.github/dependabot.yml .github/
```

2. **Customize for your project:**
Edit `.github/workflows/ci.yml` and update:
- Repository name
- Build commands
- Test commands
- Deployment targets

3. **Commit and push:**
```bash
git add .github/
git commit -m "feat: add auto DevOps workflows"
git push
```

---

## 🔄 Automatic Updates

### Dependabot (Automated Dependency Updates)

**Already configured** in `.github/dependabot.yml`:

```yaml
version: 2
updates:
  # Client dependencies
  - package-ecosystem: "npm"
    directory: "/client"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10

  # Server dependencies
  - package-ecosystem: "npm"
    directory: "/server"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

**What it does:**
- ✅ Checks for updates weekly
- ✅ Creates pull requests automatically
- ✅ Includes changelogs
- ✅ Runs tests before merging
- ✅ Security updates are prioritized

**How to use:**
1. Dependabot creates a PR
2. Review the changes
3. Merge if tests pass
4. Auto deployment happens!

### Manual Dependency Updates

```bash
# Update all dependencies
npm update

# Check for outdated packages
npm outdated

# Update specific package
npm update package-name

# Update to latest (including major versions)
npm install package-name@latest
```

---

## 🧪 Automatic Testing

### Current Test Setup

**Client Tests** (Vitest + React Testing Library):
```bash
cd client
npm test              # Run tests
npm run test:coverage # Check coverage
```

**CI Automatic Testing:**
Every push triggers:
1. Unit tests
2. Integration tests
3. Accessibility tests
4. Type checking
5. Build verification

### Adding Tests to Your Code

```typescript
// Example: components/__tests__/MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import MyComponent from '../MyComponent';

test('renders component correctly', () => {
  render(<MyComponent />);
  expect(screen.getByText('Hello')).toBeInTheDocument();
});
```

When you push code:
```bash
git add .
git commit -m "feat: add new component"
git push  # Tests run automatically!
```

---

## 🚀 Automatic Deployment

### GitHub Pages Deployment

**Current Setup:**
- Deploys to: `https://pinkycollie.github.io/mbtq-dev/`
- Triggers: Push to `main` branch
- Workflow: `.github/workflows/deploy.yml`

**How it works:**
```
Push to main → Tests run → Build succeeds → Deploy to GitHub Pages
```

### Deploy to Other Platforms

#### Vercel (Recommended for Full-Stack)

1. **Connect repository:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel auto-detects settings

2. **Configure:**
   ```bash
   # Project Settings
   Build Command: cd client && npm run build
   Output Directory: client/dist
   Install Command: cd client && npm install
   ```

3. **Environment Variables:**
   - Add in Vercel dashboard
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_SOCKET_SERVER_URL`

4. **Auto Deploy:**
   - Every push to `main` → Auto deploy
   - PRs → Preview deployments
   - Rollback available in dashboard

**GitHub Actions + Vercel:**
```yaml
# .github/workflows/vercel-deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
          working-directory: ./client
```

#### Netlify

1. **Connect in Netlify dashboard:**
   - Link GitHub repository
   - Configure build settings

2. **netlify.toml:**
```toml
[build]
  base = "client"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[context.production.environment]
  NODE_VERSION = "18"
```

3. **Auto deploys** on push to `main`

#### Docker + Cloud Platforms

**AWS ECS, Google Cloud Run, Azure:**

```yaml
# .github/workflows/docker-deploy.yml
name: Docker Deploy

on:
  push:
    branches: [main]
    tags: ['v*']

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build Docker image
        run: docker-compose build
      
      - name: Push to registry
        run: |
          # Push to AWS ECR, Google GCR, etc.
          
      - name: Deploy to cloud
        run: |
          # Deploy commands
```

---

## 🔐 Automatic Security Scanning

### Current Security Features

**npm audit** (runs on every push):
```yaml
- name: Security audit
  run: |
    cd client && npm audit --audit-level=high
    cd ../server && npm audit --audit-level=high
```

**GitHub Security:**
- Dependabot security updates
- Secret scanning
- Code scanning (CodeQL)

### Enable Advanced Security

1. **Go to repository Settings → Security**
2. **Enable:**
   - Dependabot alerts ✅
   - Dependabot security updates ✅
   - Code scanning ✅
   - Secret scanning ✅

3. **Add CodeQL workflow:**
```yaml
# .github/workflows/codeql.yml
name: CodeQL

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  analyze:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: github/codeql-action/init@v3
        with:
          languages: javascript, typescript
      - uses: github/codeql-action/analyze@v3
```

---

## 📊 Automatic Monitoring

### Health Checks

**Built-in health endpoint** (`server/index.js`):
```javascript
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});
```

**Monitor with:**
- UptimeRobot (free)
- Pingdom
- StatusCake

### Error Tracking

**Add Sentry for automatic error tracking:**

1. **Install:**
```bash
cd client
npm install @sentry/react
```

2. **Configure:**
```typescript
// client/src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

3. **Automatic error reporting:**
- Runtime errors → Sentry
- Build errors → GitHub Actions logs
- Deploy errors → Platform logs

---

## 🌊 Deployment Strategies

### Strategy 1: Continuous Deployment (CD)

**Every commit to `main` → Production**

```yaml
# Simple CD
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Run tests
      - name: Build
      - name: Deploy to production
```

**Best for:**
- Small teams
- Low-risk applications
- Rapid iteration

### Strategy 2: Continuous Delivery

**Commits → Staging, Manual → Production**

```yaml
# Auto deploy to staging
on:
  push:
    branches: [main]

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to staging

# Manual production deploy
on:
  workflow_dispatch:

jobs:
  deploy-production:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
```

**Best for:**
- Enterprise applications
- Regulated industries
- High-risk changes

### Strategy 3: Release-Based Deployment

**Only tagged releases → Production**

```yaml
# Deploy on version tags
on:
  push:
    tags:
      - 'v*'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy version ${{ github.ref_name }}
```

**Best for:**
- Scheduled releases
- Version control
- Multiple environments

---

## 🔧 Connecting User Repositories

### For Platform Users

**MBTQ.dev can connect to your own repositories!**

#### Option 1: Fork and Customize

1. **Fork MBTQ.dev:**
```bash
# On GitHub, click "Fork"
# Clone your fork
git clone https://github.com/YOUR_USERNAME/mbtq-dev.git
```

2. **Customize for your project:**
```bash
# Update package.json names
# Modify components
# Add your features
```

3. **Auto DevOps works automatically!**
   - Push to `main` → Auto deploy
   - Dependencies → Auto update
   - Security → Auto scan

#### Option 2: Use as Template

1. **Copy workflow files to your project:**
```bash
cp -r mbtq-dev/.github .github
cp mbtq-dev/docker-compose.yml .
cp mbtq-dev/Dockerfile .
```

2. **Customize workflows:**
```yaml
# Update repository name
# Update build commands
# Update deploy target
```

3. **Enable GitHub Actions**

#### Option 3: Supabase Integration

**Connect MBTQ.dev with your Supabase project:**

1. **Get Supabase credentials:**
   - Go to [supabase.com](https://supabase.com)
   - Create project
   - Copy URL and anon key

2. **Add to your fork:**
```bash
# .env
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key
```

3. **Add to GitHub Secrets:**
   - Settings → Secrets → New secret
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`

4. **Auto deployment includes Supabase!**

---

## 🎓 For Non-Developers

### Getting Started Checklist

- [ ] **Fork the repository** (GitHub: click "Fork")
- [ ] **Enable GitHub Actions** (Settings → Actions)
- [ ] **Make a small change** (edit README.md)
- [ ] **Commit and push** (GitHub website: edit → commit)
- [ ] **Watch the magic** ✨ (Actions tab shows progress)
- [ ] **View your site** (Settings → Pages → link)

### Simple Deployment Flow

```
1. You edit a file on GitHub 📝
   ↓
2. GitHub Actions starts 🤖
   ↓
3. Tests run automatically 🧪
   ↓
4. Build happens automatically 🏗️
   ↓
5. Deploy happens automatically 🚀
   ↓
6. Your site is live! 🎉
```

### No Code Deployment

**Just use the GitHub web interface:**
1. Click a file
2. Click "Edit" (pencil icon)
3. Make changes
4. Scroll down, click "Commit changes"
5. Wait 2-3 minutes
6. Your changes are live!

---

## 🔍 Monitoring Your Auto DevOps

### Check Workflow Status

```bash
# View workflow runs
gh run list

# View specific run
gh run view RUN_ID

# Watch live
gh run watch
```

**Or on GitHub:**
- Go to "Actions" tab
- See all workflows
- Green ✅ = Success
- Red ❌ = Failed (click for details)

### Debugging Failed Deployments

1. **Go to Actions tab**
2. **Click failed workflow**
3. **Expand failed step**
4. **Read error message**
5. **Fix issue**
6. **Push again** → Auto retry!

Common fixes:
- Test failure → Fix test
- Build failure → Fix code
- Deploy failure → Check secrets/env vars

---

## 📦 Pre-Built Workflows

### Available Workflows

**CI/CD Pipeline** (`.github/workflows/ci.yml`):
- ✅ Lint code
- ✅ Run tests
- ✅ Security scan
- ✅ Build verification
- ✅ Accessibility checks

**Deployment** (`.github/workflows/deploy.yml`):
- ✅ Build production
- ✅ Deploy to GitHub Pages
- ✅ Cache optimization

**Dependency Updates** (`.github/dependabot.yml`):
- ✅ npm packages
- ✅ GitHub Actions
- ✅ Security patches

### Custom Workflows

**Create** `.github/workflows/custom.yml`:
```yaml
name: My Custom Workflow

on:
  push:
    branches: [main]

jobs:
  custom-job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: My custom step
        run: |
          echo "Hello from custom workflow!"
          # Add your commands
```

---

## 🎯 Best Practices

### ✅ Do's

- ✅ Test locally before pushing
- ✅ Keep workflows simple
- ✅ Use caching for speed
- ✅ Monitor deployment logs
- ✅ Set up notifications
- ✅ Use staging environments
- ✅ Keep secrets secure
- ✅ Document custom workflows

### ❌ Don'ts

- ❌ Don't skip tests
- ❌ Don't deploy without testing
- ❌ Don't commit secrets
- ❌ Don't ignore failed workflows
- ❌ Don't deploy on Friday afternoon 😉
- ❌ Don't deploy without backup plan

---

## 🆘 Troubleshooting

### Common Issues

**"Workflow not running"**
- Check GitHub Actions are enabled
- Verify workflow syntax
- Check branch protection rules

**"Build failing"**
- Review build logs
- Test locally: `npm run build`
- Check dependencies

**"Deployment failing"**
- Verify secrets are set
- Check environment variables
- Review deploy logs

**"Tests failing"**
- Run locally: `npm test`
- Check test environment
- Review test logs

---

## 🔗 Integration Examples

### Slack Notifications

```yaml
- name: Slack notification
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### Email Notifications

```yaml
- name: Send email
  uses: dawidd6/action-send-mail@v3
  with:
    server_address: smtp.gmail.com
    server_port: 465
    username: ${{ secrets.EMAIL_USERNAME }}
    password: ${{ secrets.EMAIL_PASSWORD }}
    subject: Deployment Complete
    body: Your app is live!
```

### Discord Notifications

```yaml
- name: Discord notification
  uses: sarisia/actions-status-discord@v1
  with:
    webhook: ${{ secrets.DISCORD_WEBHOOK }}
```

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [Docker Documentation](https://docs.docker.com/)

---

## 🚀 Next Steps

1. ✅ Enable Auto DevOps (already done!)
2. 🔧 Customize workflows for your needs
3. 📊 Set up monitoring
4. 🔐 Enable security scanning
5. 🎯 Deploy and iterate!

---

**Last Updated**: 2025-12-20

**mbtq.dev © 2025. Community. Culture. Power.**
