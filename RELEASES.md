# 🏷️ Release Management & Semantic Versioning

## Overview

This guide covers version tagging, semantic versioning, and release management for MBTQ.dev. Whether you're a developer or non-developer, this guide will help you understand how to create, manage, and automate releases.

---

## 📋 Quick Reference

### Common Tag Names

**Production Releases:**
- `v1.0.0` - Major release
- `v1.1.0` - Minor release (new features)
- `v1.1.1` - Patch release (bug fixes)
- `v2.0.0` - Breaking changes

**Pre-Release Versions:**
- `v0.2.0-alpha` - Alpha version (early testing)
- `v0.2.0-beta` - Beta version (feature complete, testing)
- `v1.0.0-rc.1` - Release candidate
- `v5.9-beta.3` - Beta version 3

---

## 📚 Understanding Semantic Versioning

Semantic versioning (SemVer) follows the format: **MAJOR.MINOR.PATCH**

```
v2.3.4
│ │ │
│ │ └─ PATCH: Bug fixes (backwards compatible)
│ └─── MINOR: New features (backwards compatible)
└───── MAJOR: Breaking changes (not backwards compatible)
```

### When to Increment Each Number

#### MAJOR (v1.0.0 → v2.0.0)
Increment when you make **breaking changes** that are not backwards compatible:
- Removing or renaming public APIs
- Changing function signatures
- Major architectural changes
- Changes that require users to modify their code

**Examples:**
```
v1.5.2 → v2.0.0  (Removed old authentication API)
v2.3.1 → v3.0.0  (Changed database schema significantly)
```

#### MINOR (v1.0.0 → v1.1.0)
Increment when you add **new features** in a backwards compatible manner:
- Adding new features
- Adding new API endpoints
- Enhancing existing functionality
- Deprecating features (but still working)

**Examples:**
```
v1.0.0 → v1.1.0  (Added new AI integration features)
v1.5.0 → v1.6.0  (Added real-time collaboration)
```

#### PATCH (v1.0.0 → v1.0.1)
Increment when you make **bug fixes** that are backwards compatible:
- Fixing bugs
- Security patches
- Performance improvements
- Documentation updates

**Examples:**
```
v1.0.0 → v1.0.1  (Fixed login bug)
v2.3.4 → v2.3.5  (Security patch)
```

---

## 🏁 Pre-Release Versions

Use pre-release identifiers for versions not ready for production.

### Format

```
v1.0.0-alpha
v1.0.0-beta
v1.0.0-rc.1
```

### Common Pre-Release Tags

| Tag | When to Use | Example |
|-----|-------------|---------|
| `alpha` | Early development, unstable | `v0.1.0-alpha` |
| `beta` | Feature complete, testing | `v1.0.0-beta` |
| `rc` (Release Candidate) | Final testing before release | `v1.0.0-rc.1` |

### Pre-Release Progression Example

```
v1.0.0-alpha     → Early testing
v1.0.0-alpha.2   → Alpha version 2
v1.0.0-beta      → Feature complete
v1.0.0-beta.2    → Beta version 2
v1.0.0-rc.1      → Release candidate 1
v1.0.0           → Production release
```

---

## 🚀 Creating a Release

### Step 1: Update Version Number

Update version in `package.json` files:

```bash
# Client
cd client
npm version major  # For v1.0.0 → v2.0.0
npm version minor  # For v1.0.0 → v1.1.0
npm version patch  # For v1.0.0 → v1.0.1

# Server
cd server
npm version major|minor|patch
```

Or manually edit:
```json
{
  "name": "mbtq-pinksync-client",
  "version": "1.1.0"
}
```

### Step 2: Commit Changes

```bash
git add client/package.json server/package.json
git commit -m "chore: bump version to v1.1.0"
git push
```

### Step 3: Create Git Tag

```bash
# Create annotated tag (recommended)
git tag -a v1.1.0 -m "Release v1.1.0: Added new AI features"

# Push tag to GitHub
git push origin v1.1.0

# Or push all tags
git push --tags
```

### Step 4: Create GitHub Release

**Option A: Using GitHub Web Interface**

1. Go to your repository on GitHub
2. Click "Releases" (right sidebar)
3. Click "Draft a new release"
4. Fill in details:
   - **Tag version**: `v1.1.0` (use existing tag or create new)
   - **Release title**: `v1.1.0 - Feature Name`
   - **Description**: What's new, bug fixes, breaking changes
   - **Pre-release**: Check if this is a beta/alpha version
   - **Set as latest release**: Check for production releases
5. Click "Publish release"

**Option B: Using GitHub CLI**

```bash
# Install GitHub CLI if not already
# https://cli.github.com/

# Create release
gh release create v1.1.0 \
  --title "v1.1.0 - New AI Features" \
  --notes "Added GPT-4 integration, improved accessibility"

# Create pre-release
gh release create v1.0.0-beta \
  --title "v1.0.0-beta" \
  --notes "Beta version for testing" \
  --prerelease
```

### Step 5: Write Release Notes

Good release notes should include:

```markdown
## What's New in v1.1.0

### ✨ New Features
- Added AI-powered code generation
- Real-time collaboration improvements
- New accessibility features

### 🐛 Bug Fixes
- Fixed login authentication issue (#123)
- Resolved mobile responsive layout bug (#124)

### 🔧 Improvements
- Better error handling
- Improved performance by 30%

### ⚠️ Breaking Changes
None

### 📦 Upgrade Instructions
```bash
npm install mbtq-dev@1.1.0
```

### 🙏 Contributors
Thank you to @user1, @user2 for contributions!
```

---

## 🤖 Automated Releases

### Using GitHub Actions

Create `.github/workflows/release.yml`:

```yaml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install dependencies
        run: |
          cd client && npm ci
          cd ../server && npm ci

      - name: Run tests
        run: |
          cd client && npm test

      - name: Build
        run: |
          cd client && npm run build

      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          generate_release_notes: true
          draft: false
          prerelease: ${{ contains(github.ref, 'alpha') || contains(github.ref, 'beta') || contains(github.ref, 'rc') }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

      - name: Deploy to production
        if: "!contains(github.ref, 'alpha') && !contains(github.ref, 'beta') && !contains(github.ref, 'rc')"
        run: |
          # Add deployment commands here
          echo "Deploying to production..."
```

### Automatic Version Bumping

Use tools like `semantic-release` for fully automated versioning:

```bash
npm install --save-dev semantic-release @semantic-release/git @semantic-release/changelog
```

Configure `.releaserc.json`:
```json
{
  "branches": ["main"],
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git",
    "@semantic-release/github"
  ]
}
```

---

## 📊 Version History Best Practices

### Keep a CHANGELOG.md

Maintain a `CHANGELOG.md` file following [Keep a Changelog](https://keepachangelog.com/) format:

```markdown
# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- New feature X

## [1.1.0] - 2025-12-20

### Added
- AI-powered code generation
- Real-time collaboration features

### Fixed
- Login authentication bug
- Mobile layout issues

### Changed
- Improved error handling

## [1.0.0] - 2025-12-01

Initial release
```

---

## 🎯 Release Strategy

### For MBTQ.dev Platform

**Development Flow:**
```
main (stable) ─────> v1.0.0, v1.1.0, v2.0.0
  │
  ├─ develop ──────> v1.1.0-beta
  │
  └─ feature/* ────> v1.1.0-alpha
```

**Release Cadence:**
- **Major releases**: Every 6-12 months (breaking changes)
- **Minor releases**: Every 1-2 months (new features)
- **Patch releases**: As needed (bug fixes)
- **Pre-releases**: Continuous (development/testing)

### Version Support

- **Current major version**: Full support
- **Previous major version**: Security updates only (6 months)
- **Older versions**: Unsupported

---

## 🛠️ Tools & Scripts

### Quick Release Script

Create `scripts/release.sh`:

```bash
#!/bin/bash

# Usage: ./scripts/release.sh [major|minor|patch]

VERSION_TYPE=${1:-patch}

echo "Creating $VERSION_TYPE release..."

# Update version in client
cd client
npm version $VERSION_TYPE --no-git-tag-version
CLIENT_VERSION=$(node -p "require('./package.json').version")
cd ..

# Update version in server
cd server
npm version $VERSION_TYPE --no-git-tag-version
cd ..

# Commit changes
git add client/package.json server/package.json
git commit -m "chore: bump version to v$CLIENT_VERSION"

# Create tag
git tag -a "v$CLIENT_VERSION" -m "Release v$CLIENT_VERSION"

# Push
git push && git push --tags

echo "Release v$CLIENT_VERSION created successfully!"
echo "Now go to GitHub to publish the release."
```

Make it executable:
```bash
chmod +x scripts/release.sh
```

Use it:
```bash
./scripts/release.sh minor  # Creates v1.1.0 from v1.0.0
./scripts/release.sh major  # Creates v2.0.0 from v1.0.0
./scripts/release.sh patch  # Creates v1.0.1 from v1.0.0
```

---

## 🔍 Checking Current Version

```bash
# View all tags
git tag -l

# View latest tag
git describe --tags --abbrev=0

# View current version in package.json
cat client/package.json | grep version
cat server/package.json | grep version
```

---

## 🌟 Best Practices

### ✅ Do's

- ✅ Use semantic versioning
- ✅ Prefix tags with `v` (v1.0.0, not 1.0.0)
- ✅ Write clear, detailed release notes
- ✅ Test before releasing
- ✅ Tag from a stable commit
- ✅ Use pre-release versions for testing
- ✅ Keep CHANGELOG.md updated
- ✅ Document breaking changes
- ✅ Automate when possible

### ❌ Don'ts

- ❌ Don't skip version numbers
- ❌ Don't reuse tag names
- ❌ Don't release without testing
- ❌ Don't forget to document changes
- ❌ Don't make breaking changes in minor/patch versions
- ❌ Don't release directly to production without pre-release testing

---

## 🎓 For Non-Developers

### What is a Release?

A **release** is like publishing a new version of your app. Think of it like:
- **v1.0.0**: Your app's first official launch 🎉
- **v1.1.0**: Added new features (like adding new rooms to a house)
- **v1.0.1**: Fixed bugs (like fixing a leaky faucet)
- **v2.0.0**: Major changes (like rebuilding the house)

### When to Create a Release?

- ✨ **New features**: Create a minor release (v1.1.0)
- 🐛 **Bug fixes**: Create a patch release (v1.0.1)
- 🔄 **Big changes**: Create a major release (v2.0.0)
- 🧪 **Testing**: Create a pre-release (v1.0.0-beta)

### Simple Release Checklist

- [ ] Make sure everything works
- [ ] Update version number
- [ ] Write what changed
- [ ] Create release on GitHub
- [ ] Tell your users about it

---

## 📞 Support

For questions about releases:
- 📖 Check this guide first
- 💬 Ask in GitHub Discussions
- 🐛 Report issues on GitHub
- 📧 Contact maintainers

---

## 📚 Additional Resources

- [Semantic Versioning Specification](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [GitHub Releases Documentation](https://docs.github.com/en/repositories/releasing-projects-on-github)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Last Updated**: 2025-12-20

**mbtq.dev © 2025. Community. Culture. Power.**
