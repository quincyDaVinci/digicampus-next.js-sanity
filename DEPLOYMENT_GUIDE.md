# Deployment Guide

This guide covers deploying the monorepo to production: the web app to Vercel and the Sanity Studio to Sanity.

## Overview

The monorepo has two independent deployment targets:

1. **Web App** (`packages/web`) → **Vercel**
2. **Sanity Studio** (`packages/studio`) → **Sanity**

Each can be deployed independently on its own schedule.

## Prerequisites

- GitHub repository with this code
- [Vercel account](https://vercel.com)
- [Sanity account](https://www.sanity.io)
- Node.js >= 20.19.0

## 1. Deploying the Web App to Vercel

### Initial Setup

**Step 1: Connect Repository to Vercel**

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Click "Import"

**Step 2: Configure Build Settings**

In the "Configure Project" screen:

| Setting | Value |
|---------|-------|
| **Framework Preset** | Next.js |
| **Root Directory** | `packages/web` |
| **Build Command** | `npm install --workspace=@digicampus/web && npm --workspace=@digicampus/web run build` |
| **Output Directory** | `.next` |
| **Install Command** | `npm install` |
| **Development Command** | `npm --workspace=@digicampus/web run dev` |

**Step 3: Set Environment Variables**

Add these environment variables in "Environment Variables":

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SANITY_STUDIO_HOST=studio.sanity.io
```

Get values from:
- Sanity project: [Sanity Manage](https://sanity.io/manage)
- Your domain: your production domain

**Step 4: Deploy**

Click "Deploy" and wait for the deployment to complete.

### Continuous Deployment

After initial setup, deployments happen automatically:

- **Production**: Every push to `main` branch
- **Preview**: Every push to any branch (creates preview URL)
- **Pull Requests**: Creates a preview for each PR

### Custom Domain

1. In Vercel project settings
2. Go to "Domains"
3. Click "Add Domain"
4. Enter your domain
5. Follow DNS configuration instructions
6. Verify domain

### Environment Secrets

For sensitive data (not shown in Vercel UI):

1. Go to project "Settings" → "Environment Variables"
2. Add variable with toggle for "Sensitive"
3. The value won't appear in logs/builds

## 2. Deploying Sanity Studio

### Initial Setup

**Step 1: Authenticate with Sanity**

```bash
# From root or packages/studio:
npm run studio:deploy

# Or use Sanity CLI directly:
cd packages/studio
sanity deploy
```

You'll be prompted to:
1. Log in to your Sanity account
2. Select or create a Studio
3. Choose your Sanity project

**Step 2: First Deployment**

The deployment process:
1. Validates the schema
2. Builds the Studio
3. Uploads to Sanity's CDN
4. Updates your Studio URL

After successful deployment, your Studio is available at:
```
https://{studio-name}.sanity.studio
```

### Subsequent Deployments

After schema or Studio configuration changes:

```bash
npm run studio:deploy
```

Or from root:
```bash
npm run studio:deploy
```

The deployment updates:
- Schema definitions
- Custom components
- Desk structure
- Plugins and configuration

**Note**: Your content (documents) is never affected by redeployment.

### Using Sanity-Hosted Studio

You can also use Sanity's managed Studio hosting:

1. Go to [Sanity Manage](https://sanity.io/manage)
2. Select your project
3. Settings → Studio
4. Enable "Sanity-managed Studio"

This hosts the Studio on Sanity's infrastructure without needing local deployment, but you still need to deploy schema changes.

## 3. Environment Variables Setup

### Required for Both Apps

These must be set in both Vercel and Sanity environments:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID      # From Sanity project
NEXT_PUBLIC_SANITY_DATASET         # Usually "production"
NEXT_PUBLIC_SANITY_API_VERSION     # In YYYY-MM-DD format
NEXT_PUBLIC_SANITY_STUDIO_HOST     # studio.sanity.io or custom
```

### Web App Only (Vercel)

```bash
NEXT_PUBLIC_SITE_URL               # Your production domain
NEXT_PUBLIC_VERCEL_URL             # Auto-set by Vercel
```

### Studio Only

```bash
SANITY_AUTH_TOKEN                  # For automated deployments
```

To create `SANITY_AUTH_TOKEN`:

1. Go to [Sanity Manage](https://sanity.io/manage)
2. Select your project
3. Settings → API → Tokens
4. Create new token with:
   - Read access to production
   - Write access (for automated deploys)
5. Copy the token
6. Add to Vercel environment variables if using CI/CD

## 4. CI/CD Integration

### GitHub Actions for Web App

Create `.github/workflows/deploy-web.yml`:

```yaml
name: Deploy Web App

on:
  push:
    branches: [main]
    paths:
      - 'packages/web/**'
      - 'package.json'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm install --workspace=@digicampus/web
      
      - name: Build
        run: npm --workspace=@digicampus/web run build
      
      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
        run: |
          npm install -g vercel
          vercel deploy --prod --token=$VERCEL_TOKEN
```

### GitHub Actions for Studio

Create `.github/workflows/deploy-studio.yml`:

```yaml
name: Deploy Studio

on:
  push:
    branches: [main]
    paths:
      - 'packages/studio/**'
      - 'package.json'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: npm install --workspace=@digicampus/studio
      
      - name: Deploy to Sanity
        env:
          SANITY_AUTH_TOKEN: ${{ secrets.SANITY_AUTH_TOKEN }}
        run: npm --workspace=@digicampus/studio run deploy
```

**Setup secrets:**
1. Go to GitHub repository → Settings → Secrets and variables
2. Create `VERCEL_TOKEN` from your Vercel account
3. Create `SANITY_AUTH_TOKEN` from your Sanity project

## 5. Deployment Checklist

### Before Each Deployment

- [ ] All tests pass: `npm run lint`
- [ ] Build succeeds: `npm run build` (for web)
- [ ] Schema validates: `npm run build` (for studio)
- [ ] All dependencies updated
- [ ] Environment variables configured
- [ ] Content is published in Sanity (drafts won't show)

### Web App Pre-Deploy

```bash
npm run validate          # Lint + build
npm run build            # Verify production build
```

### Studio Pre-Deploy

```bash
npm run studio:build     # Verify build
```

### Post-Deploy Verification

**Web App (Vercel):**
1. Visit production URL
2. Check API calls to Sanity
3. Verify content loads
4. Test dark mode, language switching
5. Check mobile responsiveness

**Studio:**
1. Visit `{studio}.sanity.studio`
2. Verify schema appears correctly
3. Try creating/editing a document
4. Check custom components work
5. Verify publishing works

## 6. Rollback Procedures

### Rolling Back Web App

**Option 1: Via Vercel UI**
1. Go to Vercel project → Deployments
2. Find previous good deployment
3. Click "..." → "Promote to Production"

**Option 2: Redeploy Previous Commit**
```bash
git checkout <previous-commit>
npm run build
# Vercel will auto-deploy via Git integration
```

### Rolling Back Studio

Since Studio changes don't affect content:

1. Revert code changes: `git revert <commit>`
2. Redeploy: `npm run studio:deploy`

Content remains unchanged during Studio rollbacks.

## 7. Monitoring & Logging

### Vercel

- **Analytics**: Go to project → Analytics tab
- **Logs**: Deployments tab → click deployment → "Build Logs"
- **Errors**: Functions tab → Runtime logs
- **Performance**: Monitoring tab → Web Vitals

### Sanity

- **Activity**: In Sanity project → Activity feed
- **Usage**: Settings → Billing → Usage
- **API calls**: Monitor via API usage
- **Errors**: Studio error logs in browser DevTools

## 8. Troubleshooting

### Build Fails on Vercel

1. Check "Build Logs" for specific error
2. Verify environment variables are set
3. Run locally: `npm run build`
4. Check for missing dependencies

### Studio Won't Deploy

```bash
# Clear Sanity cache
rm -rf .sanity

# Reinstall
npm install --workspace=@digicampus/studio

# Verify project ID
cat packages/studio/env.ts

# Try again
npm run studio:deploy
```

### Content Not Showing

1. Check document is published (not draft)
2. Verify Sanity credentials in web app
3. Check API version matches
4. Test GROQ query in Vision tool

### Performance Issues

**Web App:**
- Check Vercel Analytics
- Monitor bundle size
- Use Next.js Image component
- Enable ISR for static pages

**Studio:**
- Check plugin load times
- Simplify schema if needed
- Clear browser cache

## 9. Security Best Practices

- Keep `SANITY_AUTH_TOKEN` secret (never commit)
- Use Vercel's secret management for sensitive env vars
- Rotate tokens regularly
- Monitor API usage for unusual activity
- Use CORS restrictions on Sanity API
- Keep dependencies updated

## 10. Disaster Recovery

### If Web App Goes Down

1. Check Vercel status: [vercel.com/status](https://vercel.com/status)
2. Review error logs in Vercel
3. Rollback to last known good deployment
4. Check Sanity API is responding
5. Verify DNS/domain settings

### If Studio Goes Down

1. Sanity Studio can usually be recovered via Sanity dashboard
2. Content is safe (Studio just displays it)
3. Can deploy fresh Studio: `npm run studio:deploy`

## 11. Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Deployment Configuration](https://vercel.com/docs/projects/environment-variables)
- [Sanity Deployment](https://www.sanity.io/docs/hosting)
- [Sanity CLI Deploy](https://www.sanity.io/docs/cli#deploy)
- [GitHub Actions](https://docs.github.com/en/actions)

## Support

For deployment issues:
- **Vercel Support**: [Vercel Discussions](https://github.com/vercel/vercel/discussions)
- **Sanity Support**: [Sanity Forum](https://www.sanity.io/community) / Support

---

**Last Updated**: December 2024
