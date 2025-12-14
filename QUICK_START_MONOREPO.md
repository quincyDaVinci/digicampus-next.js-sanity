# Quick Start Guide - Digicampus Monorepo

Welcome! This is a modern Next.js + Sanity monorepo with separate deployment targets.

## 📦 Project Structure

```
digicampus/
├── packages/web/       → Next.js frontend (→ Vercel)
├── packages/studio/    → Sanity Studio (→ Sanity)
└── Root config files   → Workspace management
```

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies

```bash
npm install
```

This installs dependencies for all packages using npm workspaces.

### 2. Configure Environment

Copy example env file to web package:

```bash
cp packages/web/.env.example packages/web/.env.local
```

Update `packages/web/.env.local` with your Sanity credentials:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Get these values from [Sanity Manage](https://sanity.io/manage).

### 3. Start Development

**Option A: Run web app only**
```bash
npm run dev
```
→ Opens http://localhost:3000

**Option B: Run studio only**
```bash
npm run studio:dev
```
→ Opens http://localhost:3333

**Option C: Run both (recommended)**

Open two terminal windows:

**Terminal 1:**
```bash
npm run dev
```

**Terminal 2:**
```bash
npm run studio:dev
```

## 📝 Common Commands

### Development
| Command | What it does |
|---------|------------|
| `npm run dev` | Start web app dev server |
| `npm run studio:dev` | Start Sanity Studio |
| `npm run lint` | Check code quality |

### Building
| Command | What it does |
|---------|------------|
| `npm run build` | Build web app for production |
| `npm run studio:build` | Build Sanity Studio |

### Deployment
| Command | What it does |
|---------|------------|
| `npm run studio:deploy` | Deploy Studio to Sanity |

### Utilities
| Command | What it does |
|---------|------------|
| `npm run typegen` | Generate TypeScript types from Sanity schema |

## 🎨 Where to Make Changes

### Web App (`packages/web/`)
- **Pages & Components**: `src/components/` and `src/app/`
- **Styles**: `src/app/globals.css` (design tokens)
- **Utilities**: `src/lib/`
- **Types**: `src/types/`

### Sanity Studio (`packages/studio/`)
- **Schema**: `schemaTypes/documents/` and `schemaTypes/modules/`
- **Configuration**: `sanity.config.ts`
- **Queries**: `lib/queries/`
- **Structure**: `structure.ts`

## 🌐 Access Points

**During Development:**
- **Web App**: http://localhost:3000
- **Sanity Studio**: http://localhost:3333
- **Studio in Web App**: http://localhost:3000/geheimelocatie/[[...tool]]/
- **Sanity Vision**: http://localhost:3333/vision

**After Deployment:**
- **Web App**: https://yourdomain.vercel.app
- **Studio**: https://yourproject.sanity.studio

## 🔐 Authentication

### Access Sanity Studio Locally

When running `npm run studio:dev`, the first time you'll need to:
1. Choose your Sanity project
2. Log in with your Sanity account

### Access Sanity Studio Online

Go to: https://manage.sanity.io → Select your project → Open Studio

## 📚 Documentation

- **[MONOREPO_SETUP.md](./MONOREPO_SETUP.md)** - Complete setup guide
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - How to deploy to Vercel & Sanity
- **[packages/web/README.md](./packages/web/README.md)** - Web app documentation
- **[packages/studio/README.md](./packages/studio/README.md)** - Studio documentation

## 🆘 Troubleshooting

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

### Dependencies Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
npx tsc --noEmit
npm run typegen
```

### Can't Access Studio
- Make sure `npm run studio:dev` is running
- Check http://localhost:3333
- Check SANITY_PROJECT_ID in env variables

## 🎯 Next Steps

1. **Start the dev server**: `npm run dev` and `npm run studio:dev`
2. **Create content**: Open studio at http://localhost:3333
3. **View content**: Check http://localhost:3000
4. **Make changes**: Edit code and refresh browser
5. **Deploy**: Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 💡 Pro Tips

- Use the VS Code workspace: `digicampus.code-workspace` for better workspace management
- Install ESLint and Prettier VS Code extensions for better DX
- Run `npm run validate` before committing code
- Use `npm run typegen` after schema changes to update types
- Check [QUICK_START.md](./QUICK_START.md) for content creation guide

## 📞 Need Help?

- **Sanity**: https://www.sanity.io/docs
- **Next.js**: https://nextjs.org/docs
- **Project Issues**: Check the main README

---

**Happy coding!** 🎉

For detailed information, see the documentation files listed above.
