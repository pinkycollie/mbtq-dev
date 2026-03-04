# 🔧 Git Manager - Advanced Git Commands and Their Usage

This comprehensive guide covers advanced Git commands with practical examples to help you manage your repository effectively.

---

## Table of Contents

- [1. git stash - Temporarily Save Changes](#1-git-stash---temporarily-save-changes)
- [2. git cherry-pick - Apply Specific Commits](#2-git-cherry-pick---apply-specific-commits)
- [3. git revert - Safely Undo Commits](#3-git-revert---safely-undo-commits)
- [4. git reset - Move Branch Pointer](#4-git-reset---move-branch-pointer)
- [5. Bonus: Combining Commands](#5-bonus-combining-commands)
- [Safety Tips](#safety-tips)

---

## 1. `git stash` - Temporarily Save Changes

**Purpose**: Save your uncommitted changes (both staged and unstaged) without committing them, allowing you to switch branches or work on something else.

### Basic Usage

```bash
# Save current changes to stash
git stash

# Save with a descriptive message
git stash save "Work in progress on login feature"

# Stash including untracked files
git stash -u

# Stash including untracked and ignored files
git stash -a
```

### Retrieving Stashed Changes

```bash
# List all stashes
git stash list

# Apply the most recent stash (keeps it in stash list)
git stash apply

# Apply a specific stash
git stash apply stash@{2}

# Apply and remove the most recent stash
git stash pop

# Apply specific stash and remove it
git stash pop stash@{1}
```

### Managing Stashes

```bash
# View stash contents
git stash show

# View detailed diff of a stash
git stash show -p stash@{0}

# Delete a specific stash
git stash drop stash@{1}

# Delete all stashes
git stash clear

# Create a branch from a stash
git stash branch new-feature-branch stash@{0}
```

### Example Workflow

```bash
# You're working on feature-branch
git checkout feature-branch
# ... making changes to file.js ...

# Urgent bug fix needed on main branch
git stash save "WIP: new validation logic"

# Switch to main branch
git checkout main
# ... fix the bug and commit ...

# Return to your feature work
git checkout feature-branch
git stash pop
```

---

## 2. `git cherry-pick` - Apply Specific Commits

**Purpose**: Apply changes from specific commits to your current branch without merging entire branches.

### Basic Usage

```bash
# Cherry-pick a single commit
git cherry-pick <commit-hash>

# Cherry-pick multiple commits
git cherry-pick <commit-hash-1> <commit-hash-2>

# Cherry-pick a range of commits
git cherry-pick <start-commit-hash>..<end-commit-hash>
```

### Advanced Options

```bash
# Cherry-pick without auto-commit
git cherry-pick -n <commit-hash>
git cherry-pick --no-commit <commit-hash>

# Cherry-pick and edit the commit message
git cherry-pick -e <commit-hash>
git cherry-pick --edit <commit-hash>

# Cherry-pick and append a line noting the original commit
git cherry-pick -x <commit-hash>

# Continue after resolving conflicts
git cherry-pick --continue

# Abort the cherry-pick operation
git cherry-pick --abort

# Skip the current commit during cherry-pick
git cherry-pick --skip
```

### Example Workflow

```bash
# You have a bug fix in develop branch that you need in production
git checkout production
git log develop --oneline  # Find the commit hash (e.g., a1b2c3d)

# Cherry-pick the specific bug fix
git cherry-pick a1b2c3d

# If there are conflicts:
# 1. Resolve conflicts in affected files
# 2. Stage the resolved files
git add resolved-file.js

# 3. Continue the cherry-pick
git cherry-pick --continue
```

### Practical Example

```bash
# Scenario: You need commits from feature-branch
# Commit abc123: "Add user validation"
# Commit def456: "Fix validation bug"

git checkout main
git cherry-pick abc123 def456

# Or cherry-pick a range (excluding start-commit)
git cherry-pick start-commit..end-commit
```

---

## 3. `git revert` - Safely Undo Commits

**Purpose**: Create a new commit that undoes the changes from a previous commit. Safe for shared branches because it doesn't rewrite history.

### Basic Usage

```bash
# Revert the most recent commit
git revert HEAD

# Revert a specific commit
git revert <commit-hash>

# Revert multiple commits
git revert <commit-hash-1> <commit-hash-2>

# Revert a range of commits
git revert <oldest-commit>..<newest-commit>
```

### Advanced Options

```bash
# Revert without auto-committing (stage changes only)
git revert -n <commit-hash>
git revert --no-commit <commit-hash>

# Revert and edit the commit message
git revert -e <commit-hash>

# Revert a merge commit (specify parent)
git revert -m 1 <merge-commit-hash>

# Continue after resolving conflicts
git revert --continue

# Abort the revert operation
git revert --abort
```

### Example Workflow

```bash
# View commit history
git log --oneline

# Output:
# a1b2c3d (HEAD -> main) Add payment feature
# f4e5d6c Update user profile
# 7g8h9i0 Fix login bug

# Revert the payment feature commit
git revert a1b2c3d

# This creates a new commit that undoes a1b2c3d

# Revert multiple commits without auto-committing
git revert --no-commit f4e5d6c
git revert --no-commit 7g8h9i0
git commit -m "Revert profile and login changes"
```

### When to Use Revert vs Reset

```bash
# Use REVERT when:
# - Working on shared/public branches
# - You want to keep history of the undo
# - Others have already pulled the commits

# Use RESET when:
# - Working on local/private branches
# - You want to completely remove commits
# - No one else has the commits
```

---

## 4. `git reset` - Move Branch Pointer

**Purpose**: Move the current branch pointer to a different commit, potentially changing the staging area and working directory. **Use with caution on shared branches!**

### Three Modes

#### **Soft Reset** (Keep changes staged)
```bash
# Move HEAD but keep changes in staging area
git reset --soft <commit-hash>

# Reset last commit but keep changes staged
git reset --soft HEAD~1
```

#### **Mixed Reset** (Default - Unstage changes)
```bash
# Move HEAD and unstage changes (but keep in working directory)
git reset <commit-hash>
git reset --mixed <commit-hash>

# Unstage a specific file
git reset HEAD <file>

# Reset last commit, unstage changes
git reset HEAD~1
```

#### **Hard Reset** (Discard all changes)
```bash
# Move HEAD and discard all changes (DESTRUCTIVE!)
git reset --hard <commit-hash>

# Reset to last commit, discard all changes
git reset --hard HEAD

# Reset to remote branch state
git reset --hard origin/main
```

### Common Usage Patterns

```bash
# Undo last commit, keep changes unstaged
git reset HEAD~1

# Undo last 3 commits, keep changes staged
git reset --soft HEAD~3

# Completely remove last commit and all changes
git reset --hard HEAD~1

# Reset to a specific commit
git reset --hard a1b2c3d

# Unstage a file
git reset HEAD file.txt

# Reset a specific file to a previous version
git reset <commit-hash> -- path/to/file.txt
```

### Example Workflow

```bash
# Scenario 1: You want to undo the last commit but keep the changes
git reset --soft HEAD~1
# Now you can modify files and recommit

# Scenario 2: You made several commits that should be one commit
git reset --soft HEAD~3
git commit -m "Combined feature implementation"

# Scenario 3: You want to completely discard recent work
git reset --hard HEAD~2

# Scenario 4: You want to match remote branch exactly
git fetch origin
git reset --hard origin/main
```

### Reset vs Revert Comparison

```bash
# RESET - Moves branch pointer (rewrites history)
# Before: A -- B -- C -- D (HEAD)
git reset --hard B
# After:  A -- B (HEAD)
# Commits C and D are removed from history

# REVERT - Creates new commit (preserves history)
# Before: A -- B -- C -- D (HEAD)
git revert D
# After:  A -- B -- C -- D -- D' (HEAD)
# D' is a new commit that undoes D
```

---

## 5. Bonus: Combining Commands

### Example 1: Clean Up Local Commits Before Pushing

```bash
# You have 5 messy commits locally
git reset --soft HEAD~5
git commit -m "Implement complete user authentication feature"
git push origin feature-branch
```

### Example 2: Save Work, Switch Context, Return

```bash
# Save current work
git stash save "Half-done payment integration"

# Switch to hotfix
git checkout main
git checkout -b hotfix/urgent-bug
# ... fix bug ...
git commit -m "Fix critical security issue"

# Return to original work
git checkout feature-branch
git stash pop
```

### Example 3: Apply Specific Changes from Another Branch

```bash
# Get specific commits from experimental branch
git log experimental --oneline
git cherry-pick abc123 def456

# If conflicts occur
# ... resolve conflicts ...
git add .
git cherry-pick --continue
```

### Example 4: Undo a Public Mistake Safely

```bash
# Bad commit was pushed to shared branch
git revert <bad-commit-hash>
git push origin main

# NOT recommended on shared branch:
# git reset --hard HEAD~1  # This would cause problems!
```

---

## Safety Tips

### 1. Before Hard Reset: Always Create a Backup Branch
```bash
git branch backup-branch
git reset --hard <commit-hash>
```

### 2. Check What You're Reverting/Resetting
```bash
git log --oneline -n 5
git show <commit-hash>
```

### 3. Use Reflog to Recover "Lost" Commits
```bash
git reflog
git reset --hard HEAD@{2}
```

### 4. Never Force Push Without Team Agreement
```bash
# Dangerous on shared branches:
git push --force

# Safer alternative:
git push --force-with-lease
```

---

## Best Practices

### When Working with Shared Branches
- ✅ Use `git revert` to undo commits
- ✅ Communicate with your team before force-pushing
- ✅ Use `git stash` to temporarily save work
- ❌ Avoid `git reset --hard` on shared branches

### When Working on Local Branches
- ✅ Use `git reset` to clean up commits before pushing
- ✅ Use `git stash` to switch context quickly
- ✅ Use `git cherry-pick` to selectively apply commits
- ✅ Create backup branches before destructive operations

### General Guidelines
1. **Read before executing**: Understand what each command does
2. **Check your branch**: Know if you're on a shared or local branch
3. **Verify your changes**: Use `git status` and `git log` frequently
4. **Communicate**: Keep your team informed of significant history changes
5. **Test after recovering**: After using reflog or reset, test your code

---

## Quick Reference

| Command | Purpose | Safe for Shared Branches? |
|---------|---------|---------------------------|
| `git stash` | Temporarily save changes | ✅ Yes |
| `git cherry-pick` | Apply specific commits | ✅ Yes |
| `git revert` | Undo commits with new commit | ✅ Yes |
| `git reset --soft` | Undo commits, keep changes staged | ⚠️ Use caution |
| `git reset --mixed` | Undo commits, unstage changes | ⚠️ Use caution |
| `git reset --hard` | Undo commits, discard changes | ❌ No |

---

## Additional Resources

- [Official Git Documentation](https://git-scm.com/doc)
- [Git Branching Model](https://nvie.com/posts/a-successful-git-branching-model/)
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)

---

**Remember**: These advanced Git commands give you powerful control over your repository history. Use `revert` for shared branches and `reset` for local changes. Always communicate with your team when making significant history changes!

---

**Last Updated**: 2025-12-20

For more development guides, see:
- [Contributing Guide](./CONTRIBUTING.md)
- [Quick Start Guide](./QUICK_START.md)
- [Deployment Guide](./DEPLOYMENT.md)
