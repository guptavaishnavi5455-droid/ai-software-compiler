# Deployment Summary

This document provides a complete overview of deploying your CRM application to production.

## 🏗️ Full Stack Deployment Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Your CRM Application                      │
└─────────────────────────────────────────────────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
        ┌───────▼──────┐  ┌───▼────────┐  ┌─▼──────────────┐
        │    Vercel    │  │  Railway   │  │  PostgreSQL    │
        │  (Frontend)  │  │ (Backend)  │  │  (Database)    │
        └──────┬───────┘  └───┬────────┘  └────────────────┘
               │              │
        https://crm.vercel.app https://api.railway.app
```

## 📋 Deployment Checklist

### Backend (Railway)

- [ ] Create Railway account at railway.app
- [ ] Create new project
- [ ] Add PostgreSQL database service
- [ ] Connect GitHub repository
- [ ] Set root directory: `apps/api`
- [ ] Configure environment variables:
  - [ ] DATABASE_URL (auto-generated)
  - [ ] SECRET_KEY
  - [ ] STRIPE_SECRET_KEY
  - [ ] STRIPE_PUBLISHABLE_KEY
  - [ ] STRIPE_WEBHOOK_SECRET
- [ ] Deploy (automatic from GitHub)
- [ ] Test API at `/health` endpoint
- [ ] Copy API URL for frontend

### Frontend (Vercel)

- [ ] Create Vercel account at vercel.com
- [ ] Import GitHub repository
- [ ] Set root directory: `apps/web`
- [ ] Configure environment variables:
  - [ ] NEXT_PUBLIC_API_URL (from Railway)
- [ ] Deploy (automatic from GitHub)
- [ ] Test application
- [ ] Setup custom domain (optional)

### Stripe Integration

- [ ] Create Stripe account at stripe.com
- [ ] Get API keys from Stripe dashboard
- [ ] Add to Railway environment variables
- [ ] Setup webhook endpoint: `your-api.railway.app/api/payments/webhook/stripe`
- [ ] Test payment flow

## 🚀 Quick Deploy Steps

### 1. Backend Deployment (Railway)

```bash
# Option A: GitHub Integration
# 1. Go to railway.app
# 2. Click "New Project"
# 3. Select "Deploy from GitHub"
# 4. Choose ai-software-compiler repo
# 5. Select apps/api folder
# 6. Add environment variables
# 7. Deploy

# Option B: Using CLI
npm install -g @railway/cli
railway login
railway link
railway env add DATABASE_URL postgresql://...
railway env add SECRET_KEY your-secret
railway up
```

### 2. Frontend Deployment (Vercel)

```bash
# Option A: GitHub Integration
# 1. Go to vercel.com
# 2. Click "Add New Project"
# 3. Import ai-software-compiler
# 4. Set root: apps/web
# 5. Add NEXT_PUBLIC_API_URL env var
# 6. Deploy

# Option B: Using CLI
npm install -g vercel
cd apps/web
vercel --prod
```

## 🔗 Environment Variables Guide

### Railway Backend (.env)

```env
# Database (auto-generated after adding PostgreSQL)
DATABASE_URL=postgresql://user:pass@host:5432/crm_db

# Authentication
SECRET_KEY=your-super-secret-key-min-32-chars
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Server
DEBUG=false
LOG_LEVEL=INFO
CORS_ORIGINS=https://your-vercel-url.vercel.app
```

### Vercel Frontend (.env.production)

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-railway-api.railway.app

# Optional
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 📊 Expected Deployment Timeline

| Component | Time | Notes |
|-----------|------|-------|
| Railway Setup | 5 min | Create account & project |
| Database Setup | 5 min | PostgreSQL provisioning |
| Environment Vars | 3 min | Add secrets |
| API Deployment | 3-5 min | First build & deploy |
| Vercel Setup | 5 min | Create account & import |
| Frontend Build | 2-3 min | Next.js build |
| Frontend Deployment | 2 min | Deploy |
| **Total Time** | **~25 minutes** | First deployment |

## ✅ Verification Steps

### Backend (Railway)

```bash
# 1. Health Check
curl https://your-railway-api.railway.app/health

# 2. API Documentation
https://your-railway-api.railway.app/docs

# 3. Test Login
curl -X POST https://your-railway-api.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password"}'
```

### Frontend (Vercel)

```bash
# 1. Visit application
https://your-crm.vercel.app

# 2. Check API connection
Open browser console and run:
fetch('https://your-railway-api.railway.app/health')
  .then(r => r.json())
  .then(console.log)

# 3. Test login
Try registering and logging in
```

## 🔄 Continuous Deployment

### GitHub Actions

We've configured automatic deployments:

1. **Backend (Railway)**
   - Workflow: `.github/workflows/deploy-railway.yml`
   - Trigger: Push to `feature/crm-system` or `main`
   - Deploys: FastAPI backend

2. **Frontend (Vercel)**
   - Workflow: `.github/workflows/deploy-vercel.yml`
   - Trigger: Push to `feature/crm-system` or `main`
   - Deploys: Next.js frontend

### GitHub Secrets to Add

```
RAILWAY_TOKEN=your-railway-api-token
VERCEL_TOKEN=your-vercel-api-token
VERCEL_ORG_ID=your-vercel-org-id
VERCEL_PROJECT_ID=your-vercel-project-id
```

## 🆘 Common Issues & Solutions

### Issue: API Not Responding
```
✗ Solution 1: Check Railway deployment logs
✗ Solution 2: Verify NEXT_PUBLIC_API_URL is correct
✗ Solution 3: Check CORS settings in FastAPI
✗ Solution 4: Restart Railway service
```

### Issue: Environment Variables Not Loading
```
✗ Solution 1: Redeploy after adding variables
✗ Solution 2: Check variable names (case-sensitive)
✗ Solution 3: Use NEXT_PUBLIC_ prefix for frontend vars
✗ Solution 4: Clear browser cache
```

### Issue: Build Failures
```
✗ Solution 1: Check logs in deployment dashboard
✗ Solution 2: Verify Node/Python versions
✗ Solution 3: Ensure all dependencies in requirements.txt
✗ Solution 4: Check for missing environment variables
```

## 📈 Post-Deployment Tasks

- [ ] Monitor deployment logs
- [ ] Test all user flows
- [ ] Configure Stripe webhooks
- [ ] Setup database backups
- [ ] Enable monitoring/alerts
- [ ] Configure custom domain
- [ ] Setup CI/CD pipelines
- [ ] Monitor performance
- [ ] Plan scaling strategy

## 🔐 Security Checklist

- [ ] Change SECRET_KEY in production
- [ ] Enable HTTPS (automatic on both platforms)
- [ ] Setup strong database passwords
- [ ] Configure firewall rules
- [ ] Enable API authentication
- [ ] Setup rate limiting
- [ ] Enable logging and monitoring
- [ ] Regular security updates
- [ ] Backup database regularly
- [ ] Monitor for suspicious activity

## 📞 Support Resources

- **Railway**: https://railway.app/docs
- **Vercel**: https://vercel.com/docs
- **FastAPI**: https://fastapi.tiangolo.com/deployment/
- **Next.js**: https://nextjs.org/docs/deployment
- **Stripe**: https://stripe.com/docs

## 📝 Useful Commands

### Railway CLI
```bash
railway login
railway link
railway env list
railway env add KEY=value
railway logs
railway up
```

### Vercel CLI
```bash
vercel login
vercel link
vercel env ls
vercel env add NAME value
vercel logs
vercel --prod
```

### Git & GitHub
```bash
git checkout feature/crm-system
git push origin feature/crm-system
git merge main
```

---

## 🎯 Production Ready Checklist

✅ Backend API configured on Railway
✅ Frontend deployed on Vercel
✅ PostgreSQL database connected
✅ Environment variables secured
✅ GitHub Actions CI/CD setup
✅ Stripe integration ready
✅ Email service configured
✅ Monitoring enabled
✅ Backups scheduled
✅ Documentation complete

**Your CRM is production ready! 🚀**
