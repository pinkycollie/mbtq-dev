#!/bin/bash

# MBTQ.dev Release Script
# Creates a new release with semantic versioning

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
print_header() {
    echo -e "\n${BLUE}========================================${NC}"
    echo -e "${BLUE}  MBTQ.dev Release Manager${NC}"
    echo -e "${BLUE}========================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if git is clean
check_git_status() {
    if [[ -n $(git status -s) ]]; then
        print_error "Working directory is not clean. Please commit or stash your changes."
        git status -s
        exit 1
    fi
    print_success "Working directory is clean"
}

# Get current version from package.json
get_current_version() {
    local version=$(node -p "require('./client/package.json').version")
    echo "$version"
}

# Parse version components
parse_version() {
    local version=$1
    # Remove 'v' prefix if present
    version=${version#v}
    
    # Extract major, minor, patch
    IFS='.' read -r major minor patch_full <<< "$version"
    
    # Handle pre-release versions (e.g., 1.0.0-alpha)
    IFS='-' read -r patch prerelease <<< "$patch_full"
    
    echo "$major $minor $patch $prerelease"
}

# Increment version
increment_version() {
    local current=$1
    local type=$2
    
    read -r major minor patch prerelease <<< $(parse_version "$current")
    
    case $type in
        major)
            major=$((major + 1))
            minor=0
            patch=0
            ;;
        minor)
            minor=$((minor + 1))
            patch=0
            ;;
        patch)
            patch=$((patch + 1))
            ;;
        *)
            print_error "Invalid version type: $type"
            exit 1
            ;;
    esac
    
    echo "$major.$minor.$patch"
}

# Update package.json version
update_package_version() {
    local new_version=$1
    
    print_info "Updating client/package.json..."
    cd client
    npm version "$new_version" --no-git-tag-version
    cd ..
    
    print_info "Updating server/package.json..."
    cd server
    npm version "$new_version" --no-git-tag-version
    cd ..
    
    print_success "Version updated to $new_version in package.json files"
}

# Create git tag
create_git_tag() {
    local version=$1
    local tag="v$version"
    local message=$2
    
    print_info "Creating git tag: $tag"
    git tag -a "$tag" -m "$message"
    print_success "Git tag created: $tag"
}

# Push changes
push_changes() {
    local tag=$1
    
    print_info "Pushing changes to remote..."
    git push origin main
    print_success "Changes pushed to main"
    
    print_info "Pushing tag: $tag"
    git push origin "$tag"
    print_success "Tag pushed: $tag"
}

# Get repository name from git remote
get_repo_name() {
    git remote get-url origin | sed 's/.*github.com[:/]\(.*\)\.git/\1/'
}

# Show usage
show_usage() {
    cat << EOF
Usage: $0 [OPTIONS] <version-type>

Version Types:
  major     Increment major version (1.0.0 -> 2.0.0)
  minor     Increment minor version (1.0.0 -> 1.1.0)
  patch     Increment patch version (1.0.0 -> 1.0.1)
  custom    Specify custom version

Options:
  -h, --help              Show this help message
  -p, --prerelease TYPE   Add pre-release identifier (alpha, beta, rc)
  -d, --dry-run           Show what would happen without making changes
  -m, --message MESSAGE   Custom release message

Examples:
  $0 patch                    # Create v1.0.1 from v1.0.0
  $0 minor                    # Create v1.1.0 from v1.0.0
  $0 major                    # Create v2.0.0 from v1.0.0
  $0 custom 2.5.0             # Create v2.5.0
  $0 minor -p beta            # Create v1.1.0-beta
  $0 patch -p rc.1            # Create v1.0.1-rc.1
  $0 patch -d                 # Dry run for patch release
  $0 minor -m "Add new features"  # Custom message

EOF
}

# Main script
main() {
    print_header
    
    # Parse arguments
    local version_type=""
    local prerelease=""
    local dry_run=false
    local custom_message=""
    local custom_version=""
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_usage
                exit 0
                ;;
            -p|--prerelease)
                prerelease="$2"
                shift 2
                ;;
            -d|--dry-run)
                dry_run=true
                shift
                ;;
            -m|--message)
                custom_message="$2"
                shift 2
                ;;
            major|minor|patch)
                version_type="$1"
                shift
                ;;
            custom)
                version_type="custom"
                custom_version="$2"
                shift 2
                ;;
            *)
                print_error "Unknown option: $1"
                show_usage
                exit 1
                ;;
        esac
    done
    
    # Validate version type
    if [[ -z "$version_type" ]]; then
        print_error "Version type is required"
        show_usage
        exit 1
    fi
    
    # Check git status
    check_git_status
    
    # Get current version
    local current_version=$(get_current_version)
    print_info "Current version: v$current_version"
    
    # Calculate new version
    local new_version
    if [[ "$version_type" == "custom" ]]; then
        new_version="$custom_version"
    else
        new_version=$(increment_version "$current_version" "$version_type")
    fi
    
    # Add pre-release suffix if specified
    if [[ -n "$prerelease" ]]; then
        new_version="$new_version-$prerelease"
    fi
    
    local new_tag="v$new_version"
    print_info "New version: $new_tag"
    
    # Prepare release message
    local release_message
    if [[ -n "$custom_message" ]]; then
        release_message="$custom_message"
    else
        release_message="Release $new_tag"
    fi
    
    # Dry run mode
    if [[ "$dry_run" == true ]]; then
        print_warning "DRY RUN MODE - No changes will be made"
        echo ""
        echo "Would perform the following actions:"
        echo "  1. Update version in package.json files to: $new_version"
        echo "  2. Commit changes with message: 'chore: bump version to $new_tag'"
        echo "  3. Create git tag: $new_tag"
        echo "  4. Tag message: $release_message"
        echo "  5. Push changes to remote"
        echo "  6. Push tag to remote"
        echo ""
        print_info "Run without -d flag to actually create the release"
        exit 0
    fi
    
    # Confirm release
    echo ""
    print_warning "About to create release: $new_tag"
    read -p "Continue? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Release cancelled"
        exit 1
    fi
    
    # Update versions
    update_package_version "$new_version"
    
    # Commit changes
    print_info "Committing version changes..."
    git add client/package.json server/package.json
    git commit -m "chore: bump version to $new_tag"
    print_success "Changes committed"
    
    # Create tag
    create_git_tag "$new_version" "$release_message"
    
    # Push changes
    push_changes "$new_tag"
    
    # Success message
    echo ""
    print_success "Release $new_tag created successfully! 🎉"
    echo ""
    print_info "What happens next:"
    echo "  1. GitHub Actions will automatically:"
    echo "     - Run tests"
    echo "     - Perform security scan"
    echo "     - Build the release"
    echo "     - Create GitHub release"
    if [[ ! "$new_version" =~ (alpha|beta|rc) ]]; then
        echo "     - Deploy to production (GitHub Pages)"
    else
        echo "     - Mark as pre-release (not deployed to production)"
    fi
    echo ""
    local repo_name=$(get_repo_name)
    print_info "View release progress:"
    echo "  https://github.com/$repo_name/actions"
    echo ""
    print_info "Create release notes on GitHub:"
    echo "  https://github.com/$repo_name/releases/new?tag=$new_tag"
    echo ""
}

# Run main function
main "$@"
