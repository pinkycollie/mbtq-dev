# Deployment Guide - MBTQ Content Fulfillment API

This guide covers deploying the Content Fulfillment API to production.

## Prerequisites

- PostgreSQL 14+ database (managed or self-hosted)
- Node.js 18+ runtime environment
- Domain name for the API (e.g., `api.videos.mbtq.dev`)
- SSL certificate for HTTPS

## Environment Setup

### 1. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE mbtq_fulfillment;
CREATE USER mbtq_api WITH PASSWORD 'secure_password_here';
GRANT ALL PRIVILEGES ON DATABASE mbtq_fulfillment TO mbtq_api;
```

### 2. Environment Variables

Create a `.env` file in the `server` directory:

```env
# Database
DATABASE_URL="postgresql://mbtq_api:secure_password@db-host:5432/mbtq_fulfillment?schema=public"

# Server
PORT=4000
NODE_ENV=production

# Optional: CORS origins
ALLOWED_ORIGINS=https://videos.mbtq.dev,https://creators.pinksync.io
```

### 3. Install Dependencies

```bash
cd server
npm ci --production
```

### 4. Build Application

```bash
npm run build
```

### 5. Run Database Migrations

```bash
npm run prisma:migrate
```

### 6. Generate Prisma Client

```bash
npm run prisma:generate
```

## Deployment Options

### Option 1: Node.js Server (PM2)

#### Install PM2

```bash
npm install -g pm2
```

#### Create PM2 Ecosystem File

Create `ecosystem.config.js` in the server directory:

```javascript
module.exports = {
  apps: [{
    name: 'mbtq-api',
    script: './dist/index.js',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 4000
    }
  }]
};
```

#### Start Application

```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Option 2: Docker Deployment

#### Create Dockerfile

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/
RUN npm ci
COPY . .
RUN npm run build
RUN npm run prisma:generate

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
EXPOSE 4000
CMD ["node", "dist/index.js"]
```

#### Create docker-compose.yml

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL=postgresql://mbtq_api:password@db:5432/mbtq_fulfillment
      - NODE_ENV=production
    depends_on:
      - db
  
  db:
    image: postgres:14-alpine
    environment:
      - POSTGRES_DB=mbtq_fulfillment
      - POSTGRES_USER=mbtq_api
      - POSTGRES_PASSWORD=secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

#### Build and Run

```bash
docker-compose up -d
```

### Option 3: Cloud Platform (Vercel/Railway/Render)

#### Railway

1. Connect GitHub repository
2. Add PostgreSQL plugin
3. Set environment variables:
   - `DATABASE_URL` (auto-populated by Railway)
   - `NODE_ENV=production`
4. Deploy

#### Render

1. Create new Web Service
2. Connect GitHub repository
3. Build command: `cd server && npm install && npm run build`
4. Start command: `cd server && npm run serve`
5. Add PostgreSQL database
6. Set environment variables

#### Vercel (Serverless)

Note: Requires modification for serverless deployment (separate WebSocket server)

## Nginx Reverse Proxy

If deploying behind Nginx:

```nginx
server {
    listen 80;
    server_name api.videos.mbtq.dev;
    
    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## SSL/TLS Setup

### Using Let's Encrypt (Certbot)

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d api.videos.mbtq.dev
```

## Post-Deployment

### 1. Health Check

```bash
curl https://api.videos.mbtq.dev/
```

### 2. Create Initial Company

Run seed script or manually create via Prisma Studio:

```bash
npx prisma studio
```

### 3. Monitor Logs

```bash
# PM2
pm2 logs mbtq-api

# Docker
docker-compose logs -f api

# Railway/Render
Check platform dashboard
```

### 4. Set Up Monitoring

Consider using:
- **Uptime monitoring**: UptimeRobot, Pingdom
- **Error tracking**: Sentry
- **Performance monitoring**: New Relic, DataDog
- **Log aggregation**: Loggly, Papertrail

## Security Checklist

- [ ] Use strong database passwords
- [ ] Enable SSL/TLS for API and database
- [ ] Set up firewall rules (only allow necessary ports)
- [ ] Implement rate limiting
- [ ] Regular security updates (npm audit)
- [ ] Backup database regularly
- [ ] Use environment variables (never commit secrets)
- [ ] Enable CORS only for trusted origins
- [ ] Implement request logging
- [ ] Set up webhook signature verification

## Backup Strategy

### Database Backups

```bash
# Daily backup script
pg_dump -h localhost -U mbtq_api mbtq_fulfillment > backup_$(date +%Y%m%d).sql

# Automated backups with cron
0 2 * * * pg_dump -h localhost -U mbtq_api mbtq_fulfillment > /backups/db_$(date +\%Y\%m\%d).sql
```

### File Backups

If storing files locally, implement regular backups or use cloud storage (S3, Google Cloud Storage).

## Scaling Considerations

### Horizontal Scaling

- Use load balancer (Nginx, HAProxy, AWS ALB)
- Scale API instances
- Use Redis for session storage
- Implement queue system (Bull, BeeQueue) for webhooks

### Database Scaling

- Read replicas for reporting queries
- Connection pooling (PgBouncer)
- Regular VACUUM and ANALYZE
- Index optimization

## Troubleshooting

### Server won't start

```bash
# Check logs
pm2 logs mbtq-api --err

# Verify environment variables
printenv | grep DATABASE_URL

# Test database connection
npm run prisma:migrate
```

### Database connection issues

- Verify DATABASE_URL format
- Check firewall rules
- Ensure database is running
- Test connection: `psql $DATABASE_URL`

### Webhook delivery failures

- Check webhook URL is accessible
- Verify HTTPS certificates
- Review webhook event logs via API
- Use `/api/webhooks/test` endpoint

## Maintenance

### Update Dependencies

```bash
npm update
npm audit fix
npm run build
pm2 restart mbtq-api
```

### Database Migrations

```bash
npm run prisma:migrate
pm2 restart mbtq-api
```

## Support

For issues or questions:
- GitHub Issues: https://github.com/pinkycollie/mbtq-dev/issues
- Documentation: https://mbtq.dev/docs
- Community: https://mbtq.dev/community

---

**MBTQ.dev © 2025. Community. Culture. Power.**
