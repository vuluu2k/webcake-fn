#!/bin/bash

# release.sh - Automated release script for webcake-fn

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
error() {
    echo -e "${RED}❌ Error: $1${NC}" >&2
    exit 1
}

success() {
    echo -e "${GREEN}✓ $1${NC}"
}

info() {
    echo -e "${BLUE}→ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if we're on main branch
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "main" ]; then
    error "Must be on main branch. Current branch: $current_branch"
fi

# Check if working directory is clean
if ! git diff-index --quiet HEAD --; then
    warning "Working directory has uncommitted changes"
    read -p "Continue anyway? (y/n): " continue_anyway
    if [ "$continue_anyway" != "y" ]; then
        exit 1
    fi
fi

# Get current version
CURRENT_VERSION=$(node -p "require('./package.json').version")
info "Current version: $CURRENT_VERSION"

# Get release type
echo ""
echo "Select release type:"
echo "1) patch  - Bug fixes (1.0.0 → 1.0.1)"
echo "2) minor  - New features (1.0.0 → 1.1.0)"
echo "3) major  - Breaking changes (1.0.0 → 2.0.0)"
echo "4) custom - Enter version manually"
read -p "Choice (1-4): " choice

case $choice in
    1)
        release_type="patch"
        ;;
    2)
        release_type="minor"
        ;;
    3)
        release_type="major"
        ;;
    4)
        read -p "Enter version (e.g., 1.0.1): " custom_version
        if [ -z "$custom_version" ]; then
            error "Version cannot be empty"
        fi
        release_type="custom"
        NEW_VERSION=$custom_version
        ;;
    *)
        error "Invalid choice"
        ;;
esac

# Calculate new version if not custom
if [ "$release_type" != "custom" ]; then
    npm version $release_type --no-git-tag-version --dry-run > /dev/null 2>&1
    NEW_VERSION=$(npm version $release_type --no-git-tag-version --dry-run 2>&1 | grep -oP "v\K[0-9]+\.[0-9]+\.[0-9]+")
fi

info "New version will be: $NEW_VERSION"
read -p "Continue? (y/n): " confirm
if [ "$confirm" != "y" ]; then
    exit 1
fi

# Update version in package.json
info "Updating version in package.json..."
npm version $NEW_VERSION --no-git-tag-version
success "Version updated to $NEW_VERSION"

# Build
info "Building library..."
npm run build
if [ $? -ne 0 ]; then
    error "Build failed!"
fi
success "Build completed"

# Check if CHANGELOG.md needs update
if [ -f "CHANGELOG.md" ]; then
    if ! grep -q "## \[$NEW_VERSION\]" CHANGELOG.md; then
        warning "CHANGELOG.md doesn't have entry for v$NEW_VERSION"
        read -p "Update CHANGELOG.md now? (y/n): " update_changelog
        if [ "$update_changelog" = "y" ]; then
            info "Please update CHANGELOG.md manually"
            read -p "Press Enter when done..."
        fi
    fi
fi

# Commit changes
info "Committing changes..."
git add .
git commit -m "chore: Bump version to $NEW_VERSION" || true
success "Changes committed"

# Create tag
info "Creating tag v$NEW_VERSION..."
git tag -a "v$NEW_VERSION" -m "Release v$NEW_VERSION

See CHANGELOG.md for details."
success "Tag v$NEW_VERSION created"

# Push to GitHub
info "Pushing to GitHub..."
git push origin main
git push origin "v$NEW_VERSION"
success "Pushed to GitHub"

# Create GitHub release (if gh CLI is available)
if command -v gh &> /dev/null; then
    info "Creating GitHub release..."
    if [ -f "CHANGELOG.md" ]; then
        gh release create "v$NEW_VERSION" \
            --title "Release v$NEW_VERSION" \
            --notes-file CHANGELOG.md \
            --target main
    else
        gh release create "v$NEW_VERSION" \
            --title "Release v$NEW_VERSION" \
            --notes "Release v$NEW_VERSION" \
            --target main
    fi
    success "GitHub release created"
else
    warning "GitHub CLI (gh) not found. Skipping GitHub release creation."
    info "You can create release manually at: https://github.com/YOUR_USERNAME/webcake-fn/releases"
fi

# Publish to npm
read -p "Publish to npm? (y/n): " publish_npm
if [ "$publish_npm" = "y" ]; then
    info "Publishing to npm..."
    npm publish
    if [ $? -eq 0 ]; then
        success "Published to npm: webcake-fn@$NEW_VERSION"
        info "🔗 https://www.npmjs.com/package/webcake-fn"
    else
        error "Failed to publish to npm"
    fi
fi

echo ""
success "Release v$NEW_VERSION completed successfully! 🎉"
info "Tag: v$NEW_VERSION"
info "Version: $NEW_VERSION"
if [ "$publish_npm" = "y" ]; then
    info "NPM: https://www.npmjs.com/package/webcake-fn"
fi

