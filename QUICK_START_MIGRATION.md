# Quick Start: Moving PR #25 to vr4deaf

## TL;DR

PR #25 added VR agency platform features to mbtq-dev. These need to be moved to a new dedicated repository: `github.com/pinkycollie/vr4deaf`.

## Files Prepared for You

1. **MIGRATION_TO_VR4DEAF.md** - Complete migration instructions
2. **VR4DEAF_README.md** - README for the new vr4deaf repository
3. **cleanup-mbtq-dev.sh** - Script to clean up mbtq-dev after migration
4. **PR25_CLOSURE_COMMENT.md** - Text to use when closing PR #25
5. **index.html.backup** - Original mbtq-dev landing page (to restore)

## Quick Steps

### 1. Create New Repository (2 minutes)

```bash
# On GitHub:
# 1. Go to https://github.com/new
# 2. Owner: pinkycollie
# 3. Repository name: vr4deaf
# 4. Description: "VR Agency Platform for Vocational Rehabilitation, LGBTQ+, and Deaf Services"
# 5. Public repository
# 6. Add README (you'll replace it)
# 7. Create repository
```

### 2. Set Up vr4deaf (5 minutes)

```bash
# Clone new repo
git clone https://github.com/pinkycollie/vr4deaf.git
cd vr4deaf

# Create structure
mkdir -p .github/workflows
mkdir -p client/src/components/{dashboard,case-management,__tests__}
mkdir -p client/src/services/ai
mkdir -p docs

# Copy VR4DEAF_README.md as README.md
# (Get it from this PR branch)
```

### 3. Copy Files from mbtq-dev (10 minutes)

From the mbtq-dev repository (PR #25 branch: `copilot/add-agency-dashboard-system`):

```bash
cd /path/to/mbtq-dev
git checkout copilot/add-agency-dashboard-system

# Copy GitHub Actions
cp .github/workflows/accessibility-audit.yml /path/to/vr4deaf/.github/workflows/
cp .github/workflows/auto-release.yml /path/to/vr4deaf/.github/workflows/
cp .github/workflows/deploy-preview.yml /path/to/vr4deaf/.github/workflows/
cp .github/workflows/security-scan.yml /path/to/vr4deaf/.github/workflows/

# Copy components
cp client/src/components/dashboard/* /path/to/vr4deaf/client/src/components/dashboard/
cp client/src/components/case-management/* /path/to/vr4deaf/client/src/components/case-management/
cp client/src/components/__tests__/AgencyDashboard.test.tsx /path/to/vr4deaf/client/src/components/__tests__/

# Copy AI services
cp client/src/services/ai/* /path/to/vr4deaf/client/src/services/ai/

# Copy documentation
cp docs/database-schema.md /path/to/vr4deaf/docs/

# Copy VR sections from ARCHITECTURE.md
# (Edit manually to extract the 25-year vision sections)
```

### 4. Set Up vr4deaf package.json (3 minutes)

Create `/path/to/vr4deaf/client/package.json`:

```json
{
  "name": "vr4deaf",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest"
  },
  "dependencies": {
    "@axe-core/react": "^4.11.0",
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-tabs": "^1.0.4",
    "@tanstack/react-query": "^5.17.19",
    "date-fns": "^3.0.6",
    "lucide-react": "^0.562.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.49.3",
    "recharts": "^2.10.4",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^18.3.27",
    "@types/react-dom": "^18.3.7",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.9.3",
    "vite": "^7.2.6",
    "vitest": "^2.1.9"
  }
}
```

### 5. Commit and Push vr4deaf (2 minutes)

```bash
cd /path/to/vr4deaf
git add .
git commit -m "Initial commit: VR agency platform migrated from mbtq-dev PR #25"
git push origin main
```

### 6. Clean Up mbtq-dev (5 minutes)

```bash
cd /path/to/mbtq-dev
git checkout main

# Run cleanup script from this PR branch
git checkout copilot/move-pull-request-to-new-repo -- cleanup-mbtq-dev.sh index.html.backup
bash cleanup-mbtq-dev.sh

# Manual cleanups:
# 1. Edit client/package.json - remove VR dependencies
# 2. Edit client/package-lock.json - run npm install to update
# 3. Edit ARCHITECTURE.md - remove VR 25-year vision sections
# 4. Edit client/src/test/setup.ts - remove ResizeObserver mock

# Verify tests still pass
cd client
npm install
npm test

# Commit cleanup
git add .
git commit -m "Remove VR agency features (migrated to vr4deaf repository)"
git push origin main
```

### 7. Close PR #25 (1 minute)

1. Go to PR #25: https://github.com/pinkycollie/mbtq-dev/pull/25
2. Add comment using text from `PR25_CLOSURE_COMMENT.md`
3. Close the PR
4. Link to new vr4deaf repository in the comment

### 8. Update Documentation (5 minutes)

**In mbtq-dev README.md**, add under "Related Projects":
```markdown
## Related Projects

- [vr4deaf](https://github.com/pinkycollie/vr4deaf) - VR Agency Platform for vocational rehabilitation agencies, LGBTQ+ organizations, and Deaf services
```

**In vr4deaf README.md**, add under "History":
```markdown
## History

This project originated from [PR #25](https://github.com/pinkycollie/mbtq-dev/pull/25) in the mbtq-dev repository. It has been moved to its own dedicated repository to focus specifically on vocational rehabilitation agency needs.
```

## Verification Checklist

After completing all steps:

- [ ] vr4deaf repository exists and is public
- [ ] vr4deaf has all VR files copied
- [ ] vr4deaf builds successfully (`npm install && npm run build`)
- [ ] vr4deaf tests pass (`npm test`)
- [ ] mbtq-dev has been cleaned up
- [ ] mbtq-dev builds successfully
- [ ] mbtq-dev tests pass
- [ ] PR #25 is closed with migration note
- [ ] Both READMEs link to each other
- [ ] GitHub Pages configured for vr4deaf (optional)

## Time Estimate

- **Total Time**: ~30 minutes
- **Break Down**:
  - Create repo: 2 min
  - Set up structure: 5 min
  - Copy files: 10 min
  - Configure package.json: 3 min
  - Commit vr4deaf: 2 min
  - Clean mbtq-dev: 5 min
  - Close PR: 1 min
  - Update docs: 5 min

## Need Help?

See detailed instructions in:
- `MIGRATION_TO_VR4DEAF.md` - Complete migration guide
- `VR4DEAF_README.md` - vr4deaf repository README

## Support

For questions or issues during migration:
1. Check the detailed guides above
2. Review PR #25 comments
3. Open an issue in mbtq-dev repository

---

**Remember**: The goal is to have two focused repositories:
- **mbtq-dev**: AI development platform
- **vr4deaf**: VR agency platform

Both projects will be stronger with dedicated focus! 💜
