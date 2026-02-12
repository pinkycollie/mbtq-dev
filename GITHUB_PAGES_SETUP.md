# 🚀 GitHub Pages Deployment Guide

## How to Deploy MBTQ.dev to GitHub Pages

This guide will help you deploy your MBTQ.dev application to GitHub Pages for free hosting.

---

## 📋 Prerequisites

- A GitHub account
- Your MBTQ.dev repository on GitHub
- Admin access to the repository

---

## 🔧 Setup Instructions

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/pinkycollie/mbtq-dev`
2. Click on **Settings** (top menu)
3. In the left sidebar, click **Pages** (under "Code and automation")
4. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - This allows the workflow to deploy automatically

### Step 2: Verify Workflow File

The repository already includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that will:
1. Build your React application
2. Copy the root `index.html` and `404.html` files
3. Deploy to GitHub Pages automatically

### Step 3: Trigger Deployment

The deployment will happen automatically when you:
- Push to the `main` branch
- Or manually trigger it from the Actions tab

To manually trigger:
1. Go to the **Actions** tab in your repository
2. Click on "Deploy to GitHub Pages" workflow
3. Click "Run workflow" > "Run workflow"

### Step 4: Wait for Deployment

The deployment process takes 2-5 minutes:
1. Go to the **Actions** tab
2. Watch the workflow progress
3. Wait for both "build" and "deploy" jobs to complete (green checkmarks ✓)

### Step 5: Access Your Site

Once deployed, your site will be available at:

```
https://pinkycollie.github.io/mbtq-dev/
```

Or your custom domain if configured.

---

## 🎨 What Gets Deployed

### Landing Page (Root)
- **File**: `/index.html`
- **URL**: `https://pinkycollie.github.io/mbtq-dev/`
- Modern landing page explaining the platform and migration to BUSINESS MAGICIAN

### 404 Page
- **File**: `/404.html`
- **URL**: Any non-existent page (e.g., `/this-does-not-exist`)
- Custom error page with helpful navigation

### React Application
- **Source**: `/client/src/`
- **Build Output**: `/client/dist/`
- Full React application with all features

---

## 🔍 Troubleshooting

### Issue: "Site Not Found" or 404

**Solution 1: Check GitHub Pages Settings**
1. Go to Settings > Pages
2. Verify "Source" is set to "GitHub Actions"
3. Check if deployment is complete in Actions tab

**Solution 2: Wait for Propagation**
- GitHub Pages can take 5-10 minutes to propagate
- Clear your browser cache
- Try incognito/private browsing mode

### Issue: Build Fails

**Check the Actions tab for errors:**

1. Go to Actions tab
2. Click on the failed workflow run
3. Expand the failed step to see error details

**Common fixes:**
- Ensure all dependencies are in `package.json`
- Check if there are TypeScript errors
- Verify node version compatibility

### Issue: Blank Page After Deployment

**Solution: Check Vite Config**

If you see a blank page, you may need to set the base path in `vite.config.ts`:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: 'client',
  base: '/mbtq-dev/', // Add this line
  server: {
    port: 5173,
  },
})
```

### Issue: Assets Not Loading (404 for CSS/JS)

This happens when the base path is incorrect. Update `vite.config.ts` as shown above.

---

## 🔄 Updating Your Deployed Site

Whenever you push changes to the `main` branch, GitHub Actions will automatically:
1. Rebuild your application
2. Redeploy to GitHub Pages

No manual intervention needed!

---

## 🌐 Custom Domain (Optional)

### To use a custom domain (e.g., mbtq.dev):

1. **Buy a domain** from a registrar (Namecheap, GoDaddy, etc.)

2. **Add custom domain in GitHub:**
   - Go to Settings > Pages
   - Under "Custom domain", enter your domain (e.g., `mbtq.dev`)
   - Click Save

3. **Configure DNS with your registrar:**

   Add these DNS records:

   ```
   Type: A
   Name: @
   Value: 185.199.108.153

   Type: A
   Name: @
   Value: 185.199.109.153

   Type: A
   Name: @
   Value: 185.199.110.153

   Type: A
   Name: @
   Value: 185.199.111.153

   Type: CNAME
   Name: www
   Value: pinkycollie.github.io
   ```

4. **Enable HTTPS:**
   - Wait for DNS to propagate (can take 24-48 hours)
   - In GitHub Settings > Pages, check "Enforce HTTPS"

---

## 📊 Monitoring Your Site

### GitHub Actions History
- View all deployments in the **Actions** tab
- Each deployment shows:
  - Duration
  - Status (success/failure)
  - Logs for debugging

### GitHub Pages Insights
- Go to Settings > Pages
- View deployment history
- Check current status

---

## 🎯 Alternative Deployment Options

If you prefer not to use GitHub Pages, here are alternatives:

### Vercel (Recommended for Next.js)
1. Sign up at [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Vercel auto-detects settings and deploys
4. Free tier includes:
   - Automatic deployments
   - Custom domains
   - SSL certificates
   - Edge functions

### Netlify
1. Sign up at [netlify.com](https://netlify.com)
2. Connect your GitHub repository
3. Build settings:
   - Build command: `cd client && npm run build`
   - Publish directory: `client/dist`
4. Deploy!

### Cloudflare Pages
1. Sign up at [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connect GitHub
3. Configure build:
   - Build command: `cd client && npm run build`
   - Build output: `client/dist`

---

## 🔒 Security Notes

### Environment Variables on GitHub Pages

**Important:** GitHub Pages is a static hosting service. Any environment variables in your code will be visible in the built JavaScript.

**Best Practice:**
- Never put sensitive keys in frontend code
- Use Supabase's "anon" key (safe for frontend)
- Keep "service role" keys in backend only
- Use Supabase Edge Functions for sensitive operations

### Example of Safe Environment Variables:
```env
# ✅ Safe for GitHub Pages (public)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJxxx...

# ❌ NEVER put these in frontend
SUPABASE_SERVICE_ROLE_KEY=xxx
DATABASE_PASSWORD=xxx
SECRET_API_KEY=xxx
```

---

## 📞 Need Help?

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [MBTQ.dev GitHub Issues](https://github.com/pinkycollie/mbtq-dev/issues)

---

## ✅ Checklist

Before deploying, make sure:

- [ ] GitHub Pages is enabled in Settings
- [ ] Source is set to "GitHub Actions"
- [ ] Workflow file exists at `.github/workflows/deploy.yml`
- [ ] All code is pushed to `main` branch
- [ ] Build succeeds locally (`cd client && npm run build`)
- [ ] Environment variables are properly configured
- [ ] No sensitive keys in frontend code

---

**MBTQ.dev © 2025 | Community. Culture. Power. 💜**
