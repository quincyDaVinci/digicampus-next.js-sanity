# Monorepo Migration Checklist

This document tracks the migration from a single app to a monorepo structure with separate web and studio packages.

## Migration Status: IN PROGRESS

### Phase 1: Structure Setup ✅
- [x] Create `/packages/web` and `/packages/studio` directories
- [x] Update root `package.json` with workspace configuration
- [x] Create `packages/web/package.json` with Next.js dependencies
- [x] Create `packages/studio/package.json` with Sanity dependencies
- [x] Create separate `tsconfig.json` files for each package
- [x] Update ESLint configuration for web package

### Phase 2: File Migration (PENDING)

#### Web Package (`packages/web`)
- [ ] Copy `src/` directory
- [ ] Copy `public/` directory
- [ ] Copy `next-env.d.ts`
- [ ] Copy `.env.local` and environment files
- [ ] Copy `sanity-types-augment.d.ts`
- [ ] Copy `sanity.types.ts`
- [ ] Copy `next-env.d.ts`
- [ ] Update imports in web files if necessary
- [ ] Move shared config files:
  - [x] `next.config.ts`
  - [x] `postcss.config.mjs`
  - [x] `eslint.config.mjs`
  - [ ] `tailwind.config.ts`

#### Studio Package (`packages/studio`)
- [ ] Copy `sanity/` contents to `packages/studio/`
- [ ] Ensure all schema files are in `packages/studio/schemaTypes/`
- [ ] Verify `sanity.config.ts` location
- [ ] Verify `sanity.cli.ts` location
- [ ] Update any internal imports in Studio files
- [ ] Verify `sanity/env.ts` → `packages/studio/env.ts`

### Phase 3: Configuration Updates (PENDING)

**Root Configuration Files to Keep/Update:**
- [x] `package.json` - workspace configuration
- [x] `tsconfig.json` - root TypeScript config
- [ ] `.gitignore` - update paths
- [ ] `.env.local` - move to packages as needed
- [ ] `.github/workflows/` - update if using CI/CD

**Files to Keep in Root (Shared):**
- [ ] `.git/` - Git configuration
- [ ] `.github/` - GitHub workflows
- [ ] `docs/` - Shared documentation
- [ ] `scripts/` - If shared utilities exist

### Phase 4: Documentation (PENDING)
- [x] Create `MONOREPO_SETUP.md` - Complete setup guide
- [ ] Create `packages/web/README.md` - Web app documentation
- [ ] Create `packages/studio/README.md` - Studio documentation
- [ ] Update main `README.md` with monorepo info
- [ ] Update CI/CD pipeline documentation

### Phase 5: Testing & Verification (PENDING)
- [ ] Test `npm install` from root
- [ ] Test `npm run dev` (web app)
- [ ] Test `npm run studio:dev` (studio)
- [ ] Test `npm run build` (web app)
- [ ] Test `npm run studio:build` (studio)
- [ ] Test `npm run lint`
- [ ] Verify TypeScript compilation: `npx tsc --noEmit`
- [ ] Test Sanity type generation: `npm run typegen`
- [ ] Verify environment variables work in both packages
- [ ] Test Vercel deployment configuration
- [ ] Test Sanity Studio deployment

### Phase 6: Cleanup (PENDING)
- [ ] Delete old `sanity/` directory (after confirming migration)
- [ ] Delete root-level config files that moved to packages
- [ ] Delete any duplicate files
- [ ] Update `.gitignore` patterns
- [ ] Remove old build artifacts in root

### Phase 7: Final Updates (PENDING)
- [ ] Update GitHub workflows to account for monorepo structure
- [ ] Create `.nvmrc` if needed in each package
- [ ] Set up VS Code workspace file (optional): `digicampus.code-workspace`
- [ ] Document deployment procedures
- [ ] Create development workflow documentation

## Before and After Structure

### Before (Single App)
```
digicampus/
├── src/                    (Next.js code)
├── sanity/                 (Studio code)
├── public/
├── scripts/
├── package.json           (Mixed dependencies)
├── next.config.ts
├── sanity.config.ts      (At root)
├── tsconfig.json         (Mixed config)
└── ...
```

### After (Monorepo)
```
digicampus/
├── packages/
│   ├── web/              (Next.js app)
│   │   ├── src/
│   │   ├── public/
│   │   ├── next.config.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── studio/           (Sanity Studio)
│       ├── sanity.config.ts
│       ├── schemaTypes/
│       ├── package.json
│       └── tsconfig.json
├── scripts/              (Shared scripts)
├── docs/                 (Shared docs)
├── package.json          (Root workspace)
├── tsconfig.json         (Root base config)
└── .github/              (Shared CI/CD)
```

## Next Steps

1. **Complete Phase 2**: Copy remaining files to their respective packages
2. **Update imports**: Verify all imports work in new structure
3. **Test thoroughly**: Run all dev and build commands
4. **Update CI/CD**: Modify GitHub Actions for monorepo structure
5. **Deploy**: Test Vercel and Sanity deployments

## Important Notes

- **Workspace dependencies**: Use `npm install --workspace=@digicampus/web` for package-specific installs
- **Script commands**: Use `npm --workspace=@digicampus/web run build` for package-specific scripts
- **Path references**: Update any hardcoded paths that reference old `sanity/` location
- **Environment variables**: May need separate `.env` files in each package
- **Git history**: Existing Git history is preserved; files are just reorganized

## Rollback Procedure (If Needed)

If issues arise, you can revert by:
1. Restoring the original `sanity/` folder
2. Restoring the original root `package.json`
3. Deleting the `packages/` directory
4. Running `npm install` again

However, it's recommended to complete the migration and test thoroughly before considering rollback.

## Questions or Issues?

Refer to:
- `MONOREPO_SETUP.md` for configuration details
- Individual package `README.md` files for package-specific guidance
- Sanity documentation: https://www.sanity.io/docs
- Next.js documentation: https://nextjs.org/docs
