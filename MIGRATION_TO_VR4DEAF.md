# Migration Guide: Moving VR Agency Platform to vr4deaf Repository

## Overview

This document provides instructions for moving the VR Agency Platform features from PR #25 in the mbtq-dev repository to a new dedicated repository at `github.com/pinkycollie/vr4deaf`.

## Why This Migration?

The VR agency platform features added in PR #25 represent a specialized application for vocational rehabilitation agencies, which is distinct from mbtq-dev's core purpose as a generative AI development platform. Moving these features to a dedicated repository will:

1. Allow focused development on VR agency needs
2. Restore mbtq-dev to its original AI platform focus
3. Enable better branding and positioning for each project
4. Simplify maintenance and contributions

## Files to Move to vr4deaf Repository

### GitHub Actions Workflows
```
.github/workflows/accessibility-audit.yml
.github/workflows/auto-release.yml
.github/workflows/deploy-preview.yml
.github/workflows/security-scan.yml
```

### Client Components
```
client/src/components/dashboard/AgencyDashboard.tsx
client/src/components/dashboard/AgencySelector.tsx
client/src/components/dashboard/DashboardMetrics.tsx
client/src/components/case-management/CaseList.tsx
client/src/components/__tests__/AgencyDashboard.test.tsx
```

### AI Services
```
client/src/services/ai/AIJobMatcher.ts
client/src/services/ai/AIEligibilityScreener.ts
client/src/services/ai/AIReportGenerator.ts
```

### Documentation
```
docs/database-schema.md
```

### Package Dependencies (to add to vr4deaf)
```json
{
  "@radix-ui/react-dialog": "^1.0.5",
  "@radix-ui/react-select": "^2.0.0",
  "@radix-ui/react-tabs": "^1.0.4",
  "@tanstack/react-query": "^5.17.19",
  "date-fns": "^3.0.6",
  "react-hook-form": "^7.49.3",
  "recharts": "^2.10.4",
  "zod": "^3.22.4"
}
```

### Configuration Updates
- VR-specific sections from `ARCHITECTURE.md` (25-year vision, etc.)
- VR-focused `index.html` content

## Manual Migration Steps

### Step 1: Create vr4deaf Repository

```bash
# Create new repository on GitHub: pinkycollie/vr4deaf
# Initialize with README describing VR platform
```

### Step 2: Set Up vr4deaf Project Structure

```bash
# Clone the new repo
git clone https://github.com/pinkycollie/vr4deaf.git
cd vr4deaf

# Set up basic structure
mkdir -p .github/workflows
mkdir -p client/src/components/dashboard
mkdir -p client/src/components/case-management
mkdir -p client/src/services/ai
mkdir -p docs
```

### Step 3: Copy Files from mbtq-dev

From the mbtq-dev repository, copy the files listed above to the corresponding locations in vr4deaf.

```bash
# From mbtq-dev repository root
# Copy GitHub Actions
cp .github/workflows/accessibility-audit.yml ../vr4deaf/.github/workflows/
cp .github/workflows/auto-release.yml ../vr4deaf/.github/workflows/
cp .github/workflows/deploy-preview.yml ../vr4deaf/.github/workflows/
cp .github/workflows/security-scan.yml ../vr4deaf/.github/workflows/

# Copy components
cp -r client/src/components/dashboard ../vr4deaf/client/src/components/
cp -r client/src/components/case-management ../vr4deaf/client/src/components/
cp client/src/components/__tests__/AgencyDashboard.test.tsx ../vr4deaf/client/src/components/__tests__/

# Copy AI services
cp -r client/src/services/ai ../vr4deaf/client/src/services/

# Copy documentation
cp docs/database-schema.md ../vr4deaf/docs/
```

### Step 4: Update vr4deaf Configuration

Create/update these files in vr4deaf:

**package.json** - Add VR-specific dependencies:
```json
{
  "name": "vr4deaf",
  "version": "1.0.0",
  "description": "VR Agency Platform for Vocational Rehabilitation, LGBTQ+, and Deaf Services",
  "dependencies": {
    "@radix-ui/react-dialog": "^1.0.5",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-tabs": "^1.0.4",
    "@tanstack/react-query": "^5.17.19",
    "date-fns": "^3.0.6",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.49.3",
    "recharts": "^2.10.4",
    "zod": "^3.22.4"
  }
}
```

**README.md** - Create VR platform-specific readme:
```markdown
# VR4Deaf - VR Agency Platform

The #1 AI Platform for VR Workforce Agencies, LGBTQ+ Organizations, and Deaf Services.

## Features
- Multi-tenant agency dashboard
- AI-powered job matching
- Automated RSA-911 reporting
- Comprehensive accessibility (WCAG 2.1 AA)
- Deaf-first design

## Get Started
[Installation and setup instructions]
```

**ARCHITECTURE.md** - Copy the 25-year vision section from mbtq-dev

### Step 5: Clean Up mbtq-dev Repository

Remove VR-specific features from mbtq-dev to restore its original focus.

## Files to Remove from mbtq-dev

After moving to vr4deaf, these files should be removed from mbtq-dev:

```bash
# Remove VR-specific workflows
rm .github/workflows/accessibility-audit.yml
rm .github/workflows/auto-release.yml
rm .github/workflows/deploy-preview.yml
rm .github/workflows/security-scan.yml

# Remove VR components
rm -rf client/src/components/dashboard
rm -rf client/src/components/case-management
rm client/src/components/__tests__/AgencyDashboard.test.tsx

# Remove VR AI services
rm -rf client/src/services/ai

# Remove VR documentation
rm docs/database-schema.md

# Restore original files
mv index.html.backup index.html  # Restore original landing page
```

## Files to Update in mbtq-dev

### client/package.json
Remove VR-specific dependencies:
```json
{
  "dependencies": {
    // Remove these:
    // "@radix-ui/react-dialog": "^1.0.5",
    // "@radix-ui/react-select": "^2.0.0",
    // "@radix-ui/react-tabs": "^1.0.4",
    // "@tanstack/react-query": "^5.17.19",
    // "date-fns": "^3.0.6",
    // "react-hook-form": "^7.49.3",
    // "recharts": "^2.10.4",
    // "zod": "^3.22.4"
  }
}
```

### ARCHITECTURE.md
Remove the VR-specific 25-year vision sections and restore focus on AI development platform.

### client/src/test/setup.ts
Remove ResizeObserver mock (only needed for recharts):
```typescript
// Remove these lines:
// global.ResizeObserver = class ResizeObserver {
//   observe() {}
//   unobserve() {}
//   disconnect() {}
// };
```

## Communication Strategy

1. **Comment on PR #25** in mbtq-dev:
   ```
   This PR's VR agency platform features have been migrated to a dedicated repository: 
   https://github.com/pinkycollie/vr4deaf
   
   This allows both projects to focus on their specific missions:
   - mbtq-dev: AI development platform
   - vr4deaf: VR agency platform
   
   Closing this PR as the work continues in vr4deaf.
   ```

2. **Create README link** in mbtq-dev pointing to vr4deaf:
   ```markdown
   ## Related Projects
   
   - [vr4deaf](https://github.com/pinkycollie/vr4deaf) - VR Agency Platform for vocational rehabilitation agencies
   ```

3. **Create announcement** in vr4deaf README:
   ```markdown
   ## History
   
   This project originated from PR #25 in the mbtq-dev repository. It has been moved to 
   its own dedicated repository to focus specifically on vocational rehabilitation agency needs.
   ```

## Verification Checklist

After migration, verify:

- [ ] All VR files are present in vr4deaf
- [ ] vr4deaf builds and runs successfully
- [ ] VR tests pass in vr4deaf
- [ ] mbtq-dev has been cleaned up
- [ ] mbtq-dev still builds and runs
- [ ] Original mbtq-dev tests still pass
- [ ] Documentation updated in both repos
- [ ] PR #25 is closed with migration note
- [ ] GitHub Pages configured for vr4deaf (if needed)

## Next Steps for vr4deaf

1. Set up continuous integration
2. Configure GitHub Pages deployment
3. Add comprehensive README with screenshots
4. Create contribution guidelines
5. Set up issue templates for VR-specific features
6. Establish release process

## Next Steps for mbtq-dev

1. Restore original focus in documentation
2. Remove VR-specific GitHub Actions
3. Update landing page to original purpose
4. Re-run all tests to ensure nothing breaks
5. Update README to mention vr4deaf as related project

---

**Last Updated**: 2025-12-19  
**Migration Status**: Pending Manual Execution  
**Target Repository**: github.com/pinkycollie/vr4deaf
