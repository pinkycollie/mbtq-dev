# 🚀 Production Deployment Guide

## Overview

This guide walks you through deploying MBTQ.dev to production environments. We cover multiple deployment strategies to suit different needs.

---

## 📋 Pre-Deployment Checklist

Before deploying to production, ensure you have:

- [ ] All environment variables configured
- [ ] Security review completed
- [ ] All tests passing
- [ ] Build successful locally
- [ ] Database migrations ready (if applicable)
- [ ] Backup strategy in place
- [ ] Monitoring setup configured
- [ ] SSL certificates ready
- [ ] Domain configured (if using custom domain)
- [ ] CI/CD pipeline tested

---

## 🏗️ Deployment Options

### Option 1: GitHub Pages (Static Frontend Only)

**Best for**: Frontend-only deployments, documentation sites

**Current Setup**: Already configured in `.github/workflows/deploy.yml`

**Steps**:
1. Push to `main` branch
2. GitHub Actions automatically builds and deploys
3. Site available at `https://[username].github.io/[repo-name]/`

**Limitations**:
- Static content only
- No backend server
- No server-side rendering

### Option 2: Vercel (Frontend + Serverless)

**Best for**: Full-stack apps with serverless backend

**Steps**:
1. Install Vercel CLI: `npm install -g vercel`
2. Login: `vercel login`
3. Deploy: `cd client && vercel`
4. Configure environment variables in Vercel dashboard
5. Set up production deployment: `vercel --prod`

**Environment Variables**:
```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SOCKET_SERVER_URL=your-socket-server-url
```

**Advantages**:
- Automatic HTTPS
- Global CDN
- Serverless functions support
- Zero configuration
- Automatic scaling

### Option 3: Netlify (Frontend + Functions)

**Best for**: JAMstack applications

**Steps**:
1. Connect GitHub repository to Netlify
2. Configure build settings:
   - Build command: `cd client && npm run build`
   - Publish directory: `client/dist`
3. Add environment variables
4. Deploy

**netlify.toml** configuration:
```toml
[build]
  base = "client"
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
```

### Option 4: Docker + Cloud Platform (Full Control)

**Best for**: Complete control, enterprise deployments

#### AWS Deployment

**Using ECS (Elastic Container Service)**:

1. Build Docker images:
```bash
docker-compose build
```

2. Push to ECR (Elastic Container Registry):
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin [account-id].dkr.ecr.us-east-1.amazonaws.com
docker tag mbtq-dev-client:latest [account-id].dkr.ecr.us-east-1.amazonaws.com/mbtq-dev-client:latest
docker push [account-id].dkr.ecr.us-east-1.amazonaws.com/mbtq-dev-client:latest
```

3. Create ECS task definition
4. Deploy to ECS service

**Using EC2**:

1. Launch EC2 instance
2. Install Docker and Docker Compose
3. Clone repository
4. Configure environment variables
5. Run: `docker-compose up -d`

#### Google Cloud Platform (Cloud Run)

1. Build and push to Google Container Registry:
```bash
gcloud builds submit --tag gcr.io/[PROJECT-ID]/mbtq-dev-client ./client
gcloud builds submit --tag gcr.io/[PROJECT-ID]/mbtq-dev-server ./server
```

2. Deploy to Cloud Run:
```bash
gcloud run deploy mbtq-dev-client --image gcr.io/[PROJECT-ID]/mbtq-dev-client --platform managed
gcloud run deploy mbtq-dev-server --image gcr.io/[PROJECT-ID]/mbtq-dev-server --platform managed
```

#### Digital Ocean (App Platform)

1. Connect GitHub repository
2. Configure app:
   - Web service (client)
   - Backend service (server)
3. Add environment variables
4. Deploy

### Option 5: Traditional VPS (Full Control)

**Best for**: Custom infrastructure needs

**Steps**:

1. **Provision VPS** (DigitalOcean, Linode, Vultr)

2. **Initial Setup**:
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install Nginx
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2
```

3. **Deploy Application**:
```bash
# Clone repository
git clone https://github.com/pinkycollie/mbtq-dev.git
cd mbtq-dev

# Install dependencies
cd client && npm ci && npm run build && cd ..
cd server && npm ci && cd ..

# Start server with PM2
cd server
pm2 start index.js --name mbtq-server
pm2 save
pm2 startup
```

4. **Configure Nginx**:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend
    location / {
        root /path/to/mbtq-dev/client/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Socket.IO
    location /socket.io {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
    }
}
```

5. **Setup SSL with Let's Encrypt**:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 🔐 Environment Configuration

### Production Environment Variables

**Client** (`.env.production`):
```env
VITE_SUPABASE_URL=https://your-prod-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-prod-anon-key
VITE_SOCKET_SERVER_URL=https://api.your-domain.com
VITE_API_BASE_URL=https://api.your-domain.com
VITE_ENABLE_ANALYTICS=true
NODE_ENV=production
```

**Server** (`.env`):
```env
PORT=4000
NODE_ENV=production
CORS_ORIGIN=https://your-domain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
SESSION_SECRET=your-secure-secret
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Managing Secrets

**For Cloud Platforms**:
- Use platform-specific secret managers (AWS Secrets Manager, Google Secret Manager, etc.)
- Never commit secrets to git
- Use GitHub Secrets for CI/CD pipelines

**For Traditional VPS**:
- Store `.env` files outside web root
- Use proper file permissions: `chmod 600 .env`
- Consider using tools like `dotenv-vault` for secret management

---

## 📊 Monitoring Setup

### Error Tracking (Sentry)

1. Sign up at [sentry.io](https://sentry.io)
2. Create new project
3. Add Sentry DSN to environment variables
4. Install Sentry SDK:
```bash
cd client
npm install @sentry/react
```

5. Initialize in `main.tsx`:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### Performance Monitoring

**Options**:
- Google Analytics
- Plausible Analytics (privacy-friendly)
- Cloudflare Analytics
- Custom monitoring with Grafana/Prometheus

### Uptime Monitoring

**Services**:
- UptimeRobot (free)
- Pingdom
- StatusCake
- Better Uptime

---

## 🔄 CI/CD Pipeline

### GitHub Actions Deployment

Already configured in `.github/workflows/ci.yml`

**Features**:
- Automated testing
- Security scanning
- Build verification
- Accessibility checks
- Automated deployment on success

### Deployment Workflow

```yaml
deploy:
  name: Deploy to Production
  runs-on: ubuntu-latest
  needs: [security, lint, build, accessibility]
  if: github.ref == 'refs/heads/main'
  steps:
    - name: Deploy to Vercel
      run: |
        npm install -g vercel
        cd client
        vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## 🔙 Backup Strategy

### Database Backups (Supabase)

Supabase provides automatic backups for paid plans. For manual backups:

```bash
# Using pg_dump for PostgreSQL
pg_dump -h your-db-host -U postgres -d your-db > backup.sql
```

### File Backups

```bash
# Backup application files
tar -czf mbtq-backup-$(date +%Y%m%d).tar.gz /path/to/mbtq-dev

# Upload to S3
aws s3 cp mbtq-backup-$(date +%Y%m%d).tar.gz s3://your-backup-bucket/
```

### Automated Backup Script

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"

# Create backup
tar -czf $BACKUP_DIR/mbtq-$DATE.tar.gz /path/to/mbtq-dev

# Keep only last 7 days
find $BACKUP_DIR -name "mbtq-*.tar.gz" -mtime +7 -delete

# Upload to cloud storage
# aws s3 cp $BACKUP_DIR/mbtq-$DATE.tar.gz s3://your-bucket/
```

Add to crontab: `0 2 * * * /path/to/backup.sh`

---

## 🚨 Rollback Procedure

### Quick Rollback

**Docker-based**:
```bash
docker-compose down
git checkout previous-working-commit
docker-compose up -d
```

**PM2-based**:
```bash
pm2 stop all
git checkout previous-working-commit
cd client && npm run build && cd ..
pm2 restart all
```

**Cloud Platforms**:
Most platforms (Vercel, Netlify, Heroku) support one-click rollback in their dashboards.

---

## 📈 Scaling Strategy

### Horizontal Scaling

**Load Balancer Setup** (Nginx):
```nginx
upstream backend {
    server backend1.example.com:4000;
    server backend2.example.com:4000;
    server backend3.example.com:4000;
}

server {
    location / {
        proxy_pass http://backend;
    }
}
```

### Database Scaling

**Supabase**:
- Upgrade to larger instance
- Enable read replicas
- Use connection pooling

### Caching Strategy

**Redis for session/data caching**:
```javascript
const redis = require('redis');
const client = redis.createClient({
  url: process.env.REDIS_URL
});

// Cache example
app.get('/api/data', async (req, res) => {
  const cached = await client.get('data');
  if (cached) return res.json(JSON.parse(cached));
  
  const data = await fetchData();
  await client.setEx('data', 3600, JSON.stringify(data));
  res.json(data);
});
```

---

## 🔍 Health Checks

### Application Health Endpoint

Already implemented in `server/index.js`:
```javascript
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});
```

### Monitoring Health Checks

```bash
# Simple health check script
#!/bin/bash
response=$(curl -s -o /dev/null -w "%{http_code}" https://your-domain.com/health)
if [ $response -ne 200 ]; then
    echo "Health check failed: $response"
    # Send alert
fi
```

---

## 📞 Support & Troubleshooting

### Common Issues

**Build Failures**:
- Check Node.js version (requires 18+)
- Verify all dependencies installed: `npm ci`
- Clear build cache: `rm -rf node_modules dist && npm install`

**CORS Errors**:
- Verify `CORS_ORIGIN` environment variable
- Check backend CORS configuration
- Ensure URLs match exactly (http vs https)

**Socket.IO Connection Issues**:
- Verify WebSocket support
- Check firewall rules
- Verify `VITE_SOCKET_SERVER_URL` is correct

**Performance Issues**:
- Enable gzip compression
- Use CDN for static assets
- Optimize images
- Enable browser caching

---

## 📚 Additional Resources

- [GitHub Pages Setup Guide](./GITHUB_PAGES_SETUP.md)
- [Backend Connector Guide](./BACKEND_CONNECTOR_GUIDE.md)
- [Security Policy](./SECURITY.md)
- [Testing Guide](./TESTING.md)

---

**Last Updated**: 2025-12-15

For questions or issues, please open a GitHub issue.
