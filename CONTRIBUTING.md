# 🤝 Contributing to MBTQ.dev

Thank you for your interest in contributing to MBTQ.dev! We welcome contributions from everyone, especially from:

- 🦻 Deaf and Hard of Hearing developers
- 🏳️‍🌈 LGBTQ+ community members
- ♿ Accessibility experts
- 💻 Anyone passionate about inclusive technology

---

## 🌟 Ways to Contribute

### 1. Report Bugs

Found a bug? Please open an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots (if applicable)
- Your environment (OS, browser, Node version)

### 2. Suggest Features

Have an idea? Open an issue with:
- Clear description of the feature
- Why it would be useful
- How it aligns with accessibility goals
- Optional: mockups or examples

### 3. Improve Documentation

Documentation improvements are always welcome:
- Fix typos or clarify instructions
- Add examples
- Translate documentation
- Add tutorials or guides

### 4. Submit Code

See the development workflow section below.

---

## 🚀 Development Workflow

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then:
git clone https://github.com/YOUR_USERNAME/mbtq-dev.git
cd mbtq-dev
```

### 2. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 3. Set Up Development Environment

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Copy environment variables
cp ../.env.example .env
# Edit .env with your configuration

# Start server
npm start

# In another terminal, start client
cd ../client
npm run dev
```

### 4. Make Your Changes

Follow our coding standards (see below).

### 5. Test Your Changes

```bash
# Run tests
cd client
npm test

# Run type checking
npm run build

# Test manually
npm run dev
```

### 6. Run Accessibility Checks

```bash
# In the browser, click "A11y Check" button
# Check console for any violations
# Fix any accessibility issues
```

### 7. Commit Your Changes

```bash
git add .
git commit -m "feat: add amazing new feature"
```

#### Commit Message Format

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add sign language video support
fix: resolve high contrast mode toggle issue
docs: update API integration guide
test: add tests for visual notification system
```

### 8. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub with:
- Clear title and description
- Reference any related issues
- Screenshots/videos (if UI changes)
- Test coverage information

---

## 📋 Code Standards

### TypeScript/JavaScript

- Use TypeScript for new code
- Follow existing code style
- Use meaningful variable names
- Add JSDoc comments for public APIs
- Avoid `any` type when possible

```typescript
// ✅ Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

function getUserProfile(userId: string): Promise<UserProfile> {
  // Implementation
}

// ❌ Avoid
function getUser(id: any): any {
  // Implementation
}
```

### React Components

- Use functional components with hooks
- Include proper TypeScript types
- Add ARIA labels for accessibility
- Use semantic HTML
- Keep components small and focused

```typescript
// ✅ Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  ariaLabel?: string;
}

export default function Button({ 
  label, 
  onClick, 
  variant = 'primary',
  ariaLabel 
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
      aria-label={ariaLabel || label}
    >
      {label}
    </button>
  );
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow existing color scheme
- Ensure sufficient color contrast (WCAG AA)
- Make interactive elements clearly visible
- Support both light and dark modes

```tsx
// ✅ Good - High contrast, clear focus states
<button className="px-4 py-2 bg-blue-600 text-white rounded 
  hover:bg-blue-700 focus:outline-none focus:ring-2 
  focus:ring-blue-500 focus:ring-offset-2">
  Click Me
</button>
```

### Accessibility Requirements

All contributions MUST meet these accessibility standards:

#### ✅ Keyboard Navigation
- All interactive elements must be keyboard accessible
- Tab order must be logical
- Focus indicators must be visible

#### ✅ Screen Reader Support
- Use semantic HTML (`<nav>`, `<main>`, `<button>`, etc.)
- Include ARIA labels where needed
- Ensure dynamic content is announced

```tsx
// ✅ Good
<button aria-label="Close modal" onClick={onClose}>
  <span aria-hidden="true">×</span>
</button>

<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

#### ✅ Visual Accessibility
- Minimum 4.5:1 color contrast for normal text
- Minimum 3:1 for large text
- Don't rely solely on color to convey information
- Support high contrast mode

#### ✅ Deaf Accessibility
- Provide visual alternatives for audio cues
- Include captions for video content
- Use visual notifications instead of sound alerts
- Support sign language where applicable

```tsx
// ✅ Good - Visual notification instead of sound
showVisualNotification({
  type: 'success',
  message: 'File uploaded successfully',
  duration: 3000
});

// ❌ Bad - Audio-only notification
playSound('success.mp3');
```

---

## 🧪 Testing Requirements

### Unit Tests

- Write tests for new features
- Aim for >80% code coverage
- Test user interactions, not implementation

```typescript
// Example test
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

test('shows notification when button clicked', async () => {
  const user = userEvent.setup();
  render(<MyComponent />);
  
  await user.click(screen.getByRole('button', { name: 'Notify' }));
  
  expect(screen.getByRole('alert')).toHaveTextContent('Success!');
});
```

### Accessibility Tests

```typescript
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('has no accessibility violations', async () => {
  const { container } = render(<MyComponent />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

## 🔍 Code Review Process

### What Reviewers Look For

1. **Functionality**: Does it work as intended?
2. **Accessibility**: Does it meet all a11y requirements?
3. **Code Quality**: Is it readable and maintainable?
4. **Tests**: Are tests included and passing?
5. **Documentation**: Are changes documented?
6. **Performance**: Are there any performance concerns?

### Response Time

- Initial review: Within 3-5 days
- Follow-up reviews: Within 2 days
- We appreciate your patience!

### Addressing Feedback

- Respond to all review comments
- Ask questions if unclear
- Make requested changes
- Mark conversations as resolved

---

## 🏷️ Issue Labels

- `good first issue`: Great for newcomers
- `help wanted`: We need help with this
- `bug`: Something isn't working
- `enhancement`: New feature request
- `documentation`: Documentation improvements
- `accessibility`: Accessibility-related
- `deaf-friendly`: Specific to deaf accessibility
- `high priority`: Urgent issues

---

## 💬 Communication

### Getting Help

- **GitHub Discussions**: General questions
- **GitHub Issues**: Bug reports, feature requests
- **Pull Request Comments**: Code-specific questions

### Code of Conduct

We are committed to providing a welcoming and inclusive environment:

- Be respectful and considerate
- Welcome diverse perspectives
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

Unacceptable behavior includes:
- Harassment or discrimination
- Trolling or insulting comments
- Personal attacks
- Unwelcome sexual attention
- Other conduct that would be inappropriate in a professional setting

---

## 🎓 Learning Resources

### Accessibility
- [WebAIM: Web Accessibility In Mind](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Deque University](https://dequeuniversity.com/)

### React & TypeScript
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Library](https://testing-library.com/)

### Deaf Culture & Accessibility
- [NAD: National Association of the Deaf](https://www.nad.org/)
- [World Federation of the Deaf](https://wfdeaf.org/)
- [Deaf Culture Resources](https://www.lifeprint.com/asl101/pages-layout/deaf-culture.htm)

---

## 🏷️ Release Process

### For Maintainers

When creating a new release, follow these steps:

#### Using the Release Script (Recommended)

```bash
# Patch release (bug fixes)
./scripts/release.sh patch

# Minor release (new features)
./scripts/release.sh minor

# Major release (breaking changes)
./scripts/release.sh major

# Pre-release versions
./scripts/release.sh minor -p beta      # v1.1.0-beta
./scripts/release.sh patch -p alpha     # v1.0.1-alpha
./scripts/release.sh minor -p rc.1      # v1.1.0-rc.1

# Dry run (see what would happen)
./scripts/release.sh minor -d

# Custom version
./scripts/release.sh custom 2.5.0
```

The script will:
1. ✅ Validate git working directory is clean
2. ✅ Update version in `package.json` files
3. ✅ Commit version changes
4. ✅ Create git tag (e.g., `v1.1.0`)
5. ✅ Push changes and tag to GitHub
6. ✅ Trigger automatic release workflow

#### Manual Release Process

If you prefer to create releases manually:

```bash
# 1. Update versions
cd client && npm version minor && cd ..
cd server && npm version minor && cd ..

# 2. Commit changes
git add client/package.json server/package.json
git commit -m "chore: bump version to v1.1.0"

# 3. Create and push tag
git tag -a v1.1.0 -m "Release v1.1.0"
git push && git push --tags
```

#### After Tagging

Once a tag is pushed:
1. GitHub Actions automatically runs the release workflow
2. Tests are executed
3. Security scans are performed
4. Build artifacts are created
5. GitHub release is created
6. Production deployment happens (for stable releases)

#### Writing Release Notes

On GitHub, go to Releases and edit the auto-generated release:

**Good Release Notes Include:**
- ✨ New features
- 🐛 Bug fixes
- 🔧 Improvements
- ⚠️ Breaking changes (if any)
- 📦 Upgrade instructions
- 🙏 Contributor acknowledgments

**Example:**
```markdown
## What's New in v1.1.0

### ✨ New Features
- Added AI-powered code generation (#123)
- Real-time collaboration improvements (#124)

### 🐛 Bug Fixes
- Fixed login authentication issue (#125)

### 🔧 Improvements
- Better error handling
- Performance improvements

### 🙏 Contributors
Thanks to @user1, @user2 for their contributions!
```

For more details, see:
- 📖 [RELEASES.md](./RELEASES.md) - Complete guide to semantic versioning and releases
- 🤖 [AUTO_DEVOPS.md](./AUTO_DEVOPS.md) - Automated deployment and DevOps guide

---

## 🎉 Recognition

Contributors will be:
- Listed in our README
- Mentioned in release notes
- Celebrated in our community

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

## ❓ Questions?

Don't hesitate to ask! Open an issue with your question, and we'll be happy to help.

---

**Thank you for making MBTQ.dev better for everyone! 💜**

---

## 🚀 Quick Start Checklist

Before submitting your first contribution:

- [ ] Read this guide
- [ ] Fork the repository
- [ ] Set up development environment
- [ ] Create a branch for your changes
- [ ] Make your changes
- [ ] Write/update tests
- [ ] Run accessibility checks
- [ ] Commit with conventional commit message
- [ ] Push and create pull request
- [ ] Respond to review feedback

---

**Last Updated**: 2025-12-15
