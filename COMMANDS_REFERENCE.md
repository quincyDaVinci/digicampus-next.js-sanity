# Monorepo Commands & Workflows

Quick reference for common tasks in the Digicampus monorepo.

## 📋 Command Quick Reference

### 🏃 Development (Daily Use)

```bash
# Start web app (run from root or packages/web)
npm run dev

# Start Sanity Studio (run from root or packages/studio)
npm run studio:dev

# Both at same time (2 terminal windows)
# Terminal 1:
npm run dev
# Terminal 2:
npm run studio:dev
```

### 🏗️ Building (Before Deployment)

```bash
# Build web app for production
npm run build

# Build Sanity Studio
npm run studio:build

# Full validation (lint + build web)
npm run validate
```

### 🚀 Deployment

```bash
# Deploy Studio to Sanity
npm run studio:deploy

# Deploy Web to Vercel (via GitHub integration)
# Just push to main branch, or use Vercel CLI:
vercel deploy --prod
```

### 🔧 Utilities

```bash
# Generate TypeScript types from Sanity schema
npm run typegen

# Check code quality
npm run lint

# Type check TypeScript
npx tsc --noEmit

# Start production web server
npm run start
```

---

## 🎯 Common Workflows

### Workflow 1: Daily Development

```bash
# 1. Start your terminals
npm run dev           # Terminal 1
npm run studio:dev    # Terminal 2

# 2. Make changes:
# - Edit web app code in packages/web/src/
# - Edit Studio schemas in packages/studio/schemaTypes/

# 3. Content in Studio → Updates in web app (real-time)

# 4. When ready to commit:
npm run validate      # Run full validation
git add .
git commit -m "Your changes"
git push
```

### Workflow 2: Adding New Content Type

```bash
# 1. Create schema in Studio
# Create file: packages/studio/schemaTypes/documents/yourtype.ts

# 2. Register schema
# Edit: packages/studio/schemaTypes/index.ts

# 3. Restart Studio (or hot reload)
npm run studio:dev

# 4. Generate types for web app
npm run typegen

# 5. Web app can now use the new type
```

### Workflow 3: Before Deploying

```bash
# 1. Full validation
npm run validate              # Web app lint + build
npm run studio:build          # Studio build
npm run typegen              # Update types

# 2. Check for TypeScript errors
npx tsc --noEmit

# 3. Visual check
npm run dev           # Terminal 1
npm run studio:dev    # Terminal 2
# Test everything works

# 4. Commit and push
git add .
git commit -m "Ready for deploy"
git push
```

### Workflow 4: Production Deployment

#### Web App (Vercel)

```bash
# Option 1: Automatic (recommended)
git push main
# → Vercel auto-deploys via GitHub integration

# Option 2: Manual Vercel CLI
npm install -g vercel
vercel deploy --prod
```

#### Studio (Sanity)

```bash
# Direct deployment
npm run studio:deploy

# Or if deploying from CI/CD
SANITY_AUTH_TOKEN=xxx npm run studio:deploy
```

---

## 📁 Package-Specific Commands

### Web App Only

Run from root or inside `packages/web/`:

```bash
# Development
npm run dev
npm run start
npm run build

# Code quality
npm run lint
npm run lint:a11y

# Testing
npm run test:a11y
npm run validate
```

### Studio Only

Run from root or inside `packages/studio/`:

```bash
# Development
npm run studio:dev

# Building & Deployment
npm run studio:build
npm run studio:deploy

# Utilities
npm run typegen
```

---

## 🔗 Workspace Commands

Use `--workspace` flag for specific packages:

```bash
# Run command in web package
npm --workspace=@digicampus/web run dev
npm -w @digicampus/web run build

# Run command in studio package
npm --workspace=@digicampus/studio run dev
npm -w @digicampus/studio run deploy

# Install in specific package
npm install --workspace=@digicampus/web
npm install --workspace=@digicampus/studio
```

---

## 🆘 Troubleshooting Commands

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Specific package reinstall
npm install --workspace=@digicampus/web
npm install --workspace=@digicampus/studio

# Check monorepo setup
npm -v                    # npm >= 7 required
node -v                   # Node >= 20.19.0

# Verify packages
npm --workspace=@digicampus/web ls
npm --workspace=@digicampus/studio ls

# Type check
npx tsc --noEmit

# Regenerate types
npm run typegen

# Full validation
npm run validate
npm run lint
npm run build
npm run studio:build
```

---

## 📊 Project Structure Reference

### Key Files to Know

```
digicampus/
├── package.json                    ← Root (edit workspace config here)
├── packages/
│   ├── web/
│   │   ├── src/                   ← Your Next.js code
│   │   ├── public/                ← Static assets
│   │   ├── package.json           ← Web dependencies
│   │   ├── next.config.ts         ← Next.js config
│   │   └── .env.local             ← Sanity credentials
│   │
│   └── studio/
│       ├── schemaTypes/           ← Content schemas
│       ├── sanity.config.ts       ← Studio config
│       ├── sanity.cli.ts          ← CLI config
│       ├── structure.ts           ← Studio organization
│       ├── package.json           ← Studio dependencies
│       └── env.ts                 ← Sanity config
│
└── Documentation/
    ├── QUICK_START_MONOREPO.md
    ├── MONOREPO_SETUP.md
    ├── DEPLOYMENT_GUIDE.md
    └── packages/*/README.md
```

### Environment Variables

**Web App** (`packages/web/.env.local`):
```
NEXT_PUBLIC_SANITY_PROJECT_ID=...
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Studio** (usually in `packages/studio/env.ts`):
```
SANITY_PROJECT_ID=... (same as web)
SANITY_DATASET=production (same as web)
```

---

## 🎯 Development URLs

### Local Development

```
http://localhost:3000           # Web app
http://localhost:3333           # Sanity Studio
http://localhost:3000/geheimelocatie/[[...tool]]/    # Studio embedded in web
```

### Production

```
https://yourdomain.com                    # Web app (Vercel)
https://yourproject.sanity.studio         # Studio (Sanity)
```

---

## 🔍 Status Checks

### Before Committing

```bash
# 1. Lint check
npm run lint

# 2. Build check
npm run build

# 3. Type check
npx tsc --noEmit

# 4. Full validation
npm run validate
```

### Before Deploying

```bash
# 1. Web app
npm run build        # Build
npm run validate     # Full validation

# 2. Studio
npm run studio:build # Build

# 3. Start servers
npm run dev          # Terminal 1
npm run studio:dev   # Terminal 2
# Test everything manually

# 4. Deploy
npm run studio:deploy  # If deploying Studio
# For web, push to main branch (Vercel auto-deploys)
```

---

## 📚 Related Documentation

- **Setup**: [QUICK_START_MONOREPO.md](./QUICK_START_MONOREPO.md)
- **Complete Guide**: [MONOREPO_SETUP.md](./MONOREPO_SETUP.md)
- **Deployment**: [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
- **Web App**: [packages/web/README.md](./packages/web/README.md)
- **Studio**: [packages/studio/README.md](./packages/studio/README.md)

---

## ⚡ Pro Tips

### VS Code
```bash
# Open workspace for better experience
code digicampus.code-workspace
```

### Watch Mode (during development)
```bash
# Usually happens automatically, but if not:
npm run dev --watch
```

### Check Dependencies
```bash
# See all installed packages
npm ls

# See outdated packages
npm outdated

# Check for vulnerabilities
npm audit
```

### Git Workflows
```bash
# Always validate before pushing
npm run validate
git add .
git commit -m "message"
git push

# Studio deployment (if using manual deploy)
npm run studio:deploy
```

---

## 🚨 Emergency Commands

### Complete Reset
```bash
# Nuclear option (clears everything)
rm -rf node_modules package-lock.json .next .sanity
npm install
npm run dev
```

### Port Conflicts
```bash
# Use different port
npm run dev -- -p 3001        # Web on 3001
npm run studio:dev -- -p 3334 # Studio on 3334
```

### Clear Caches
```bash
# Next.js cache
rm -rf .next

# Sanity cache
rm -rf .sanity

# TypeScript cache
rm -rf tsconfig.tsbuildinfo
```

---

## 📖 Useful Docs

- npm Workspaces: https://docs.npmjs.com/cli/v7/using-npm/workspaces
- Next.js: https://nextjs.org/docs
- Sanity: https://www.sanity.io/docs
- Vercel: https://vercel.com/docs

---

**Quick Cheat Sheet:**
```bash
npm install                # Install all
npm run dev               # Start web
npm run studio:dev        # Start studio
npm run validate          # Check everything
npm run studio:deploy     # Deploy studio
```

Keep this file handy for daily development!
