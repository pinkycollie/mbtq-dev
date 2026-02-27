#!/bin/bash

# Cleanup Script for mbtq-dev Repository
# This script removes VR-specific features that have been migrated to vr4deaf

set -e

echo "🧹 Starting cleanup of mbtq-dev repository..."
echo "This will remove VR-specific features that have been migrated to vr4deaf"
echo ""

# Remove VR-specific GitHub Actions
echo "📋 Removing VR-specific GitHub Actions workflows..."
rm -f .github/workflows/accessibility-audit.yml
rm -f .github/workflows/auto-release.yml
rm -f .github/workflows/deploy-preview.yml
rm -f .github/workflows/security-scan.yml
echo "✓ Workflows removed"

# Remove VR components
echo "📁 Removing VR-specific components..."
rm -rf client/src/components/dashboard
rm -rf client/src/components/case-management
rm -f client/src/components/__tests__/AgencyDashboard.test.tsx
echo "✓ Components removed"

# Remove VR AI services
echo "🤖 Removing VR-specific AI services..."
rm -rf client/src/services/ai
echo "✓ AI services removed"

# Remove VR documentation
echo "📚 Removing VR-specific documentation..."
rm -f docs/database-schema.md
echo "✓ Documentation removed"

# Restore original landing page
echo "🏠 Restoring original landing page..."
if [ -f "index.html.backup" ]; then
    mv index.html index.html.vr
    cp index.html.backup index.html
    echo "✓ Landing page restored (VR version saved as index.html.vr)"
else
    echo "⚠ Warning: index.html.backup not found, keeping current index.html"
fi

echo ""
echo "✅ Cleanup complete!"
echo ""
echo "Next steps:"
echo "1. Update client/package.json to remove VR-specific dependencies"
echo "2. Update ARCHITECTURE.md to restore original focus"
echo "3. Update client/src/test/setup.ts to remove ResizeObserver mock"
echo "4. Run 'npm install' in client directory"
echo "5. Run tests to verify everything still works"
echo ""
echo "See MIGRATION_TO_VR4DEAF.md for complete migration instructions"
