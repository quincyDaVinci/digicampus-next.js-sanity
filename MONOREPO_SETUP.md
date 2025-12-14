# Digicampus Monorepo

This is a monorepo project containing separate applications for the frontend and CMS.

## Structure

```
digicampus/
├── packages/
│   ├── web/              # Next.js frontend app (deployed to Vercel)
│   │   ├── src/
│   │   ├── public/
│   │   ├── next.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── studio/           # Sanity Studio (deployed to Sanity)
│       ├── sanity.config.ts
│       ├── schemaTypes/
│       ├── lib/
│       ├── structure.ts
│       └── package.json
│
├── .github/              # Shared GitHub workflows
├── docs/                 # Shared documentation
├── tsconfig.json         # Root TypeScript config
├── package.json          # Root workspace config
└── README.md
```

## Getting Started

### Prerequisites
- Node.js >= 20.19.0
- npm >= 10

### Installation

```bash
# Install dependencies for all packages
npm install

# Or install specific package dependencies
npm install --workspace=@digicampus/web
npm install --workspace=@digicampus/studio
```

## Available Commands

### Web App Commands (Next.js)

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Run accessibility validation
npm run validate
```

### Studio Commands (Sanity)

```bash
# Run Sanity Studio in development
npm run studio:dev

# Build Sanity Studio
npm run studio:build

# Deploy to Sanity
npm run studio:deploy

# Generate TypeScript types from schema
npm run typegen
```

## Development Workflow

### Working on the Web App

```bash
# Start the Next.js development server
npm run dev

# The app runs at http://localhost:3000
# Studio is accessible at http://localhost:3000/geheimelocatie/[[...tool]]/
```

### Working on the Studio

```bash
# Start Sanity Studio in development mode
npm run studio:dev

# Studio runs at http://localhost:3333
```

### Running Both Simultaneously

You can run both in separate terminal windows:

**Terminal 1 - Web App:**
```bash
npm run dev
```

**Terminal 2 - Sanity Studio:**
```bash
npm run studio:dev
```

## Deployment

### Deploy Web App to Vercel

The web app is in `packages/web`. Connect your Git repository to Vercel:

1. Go to [Vercel](https://vercel.com)
2. Import your repository
3. Set the root directory to `packages/web`
4. Configure environment variables
5. Deploy

**Vercel Configuration:**
```
Root Directory: packages/web
Build Command: npm install --workspace=@digicampus/web && npm --workspace=@digicampus/web run build
Install Command: npm install
Start Command: npm --workspace=@digicampus/web run start
```

### Deploy Studio to Sanity

The Sanity Studio is in `packages/studio`.

```bash
# From the root:
npm run studio:deploy

# Or from the studio package:
cd packages/studio
npm run deploy
```

## Project Configuration

### Environment Variables

Each package has its own environment requirements:

**`packages/web/.env.local`:**
```
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**`packages/studio`:**
Uses the same Sanity credentials from `packages/studio/env.ts`

### TypeScript Configuration

- **Root `tsconfig.json`**: Base configuration for the monorepo
- **`packages/web/tsconfig.json`**: Next.js specific configuration
- **`packages/studio/tsconfig.json`**: Sanity Studio specific configuration

## Sharing Code Between Packages

Currently, code is not shared between packages. If you need to share utilities:

1. Create a `packages/shared` package
2. Add it to the root `package.json` workspaces
3. Import shared utilities in other packages

Example:
```typescript
import { someUtility } from '@digicampus/shared'
```

## Package Scripts Reference

### Root Level

| Command | Description |
|---------|-------------|
| `npm run dev` | Start web development server |
| `npm run build` | Build web app for production |
| `npm run start` | Start production web server |
| `npm run lint` | Run ESLint |
| `npm run validate` | Run linting and build |
| `npm run studio:dev` | Start Sanity Studio |
| `npm run studio:build` | Build Sanity Studio |
| `npm run studio:deploy` | Deploy to Sanity |
| `npm run typegen` | Generate types from Sanity schema |

## Migration Notes

This project was restructured from a single Next.js + Sanity app to a monorepo with separate packages for:

1. **Independent Deployment**: Each app can be deployed separately to its target platform
2. **Clear Separation of Concerns**: Frontend and CMS code is clearly separated
3. **Scalability**: Easier to add more packages (shared utilities, APIs, etc.) if needed

### Key Changes

- Studio is now in `packages/studio` instead of `sanity/`
- Web app remains in `packages/web` with the same structure
- Root `package.json` uses npm workspaces to manage both packages
- Each package has its own `package.json`, `tsconfig.json`, and configuration files

### If You Have Old References

Old import paths:
```typescript
import { something } from '../../sanity/lib'
```

Are still valid since Sanity is in `packages/studio`. If you move Sanity content, update imports accordingly.

## Troubleshooting

### Dependencies not found

Run `npm install` from the root to install all workspace dependencies.

### Build failures

Make sure you're running the correct build command for each package. Use:
- `npm run build` for web app
- `npm run studio:build` for studio

### Port conflicts

- Web app defaults to port 3000
- Sanity Studio defaults to port 3333

Change ports with environment variables if needed.

## Contributing

When making changes:

1. Keep web and studio changes isolated to their packages
2. Update tests for any modified functionality
3. Run validation before committing: `npm run validate`
4. For studio changes, run: `npm run typegen` to update types

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [Sanity Studio Configuration](https://www.sanity.io/docs/studio)

## License

See LICENSE file for details.
