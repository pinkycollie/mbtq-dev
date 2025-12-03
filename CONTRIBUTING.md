# Contributing to MBTQ Accessibility Dev Platform

Thank you for your interest in contributing! This document provides guidelines for contributing to the platform.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## How to Contribute

### Reporting Issues

- Check existing issues before creating a new one
- Use a clear and descriptive title
- Provide detailed steps to reproduce the issue
- Include environment information (browser, OS, etc.)

### Submitting Changes

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`npm test`)
5. Run linter (`npm run lint`)
6. Run accessibility checks
7. Commit your changes (`git commit -m 'Add amazing feature'`)
8. Push to the branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

## Development Setup

```bash
# Clone the repository
git clone https://github.com/pinkycollie/mbtq-dev.git
cd mbtq-dev

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run linter
npm run lint
```

## Coding Standards

### TypeScript

- Use TypeScript strict mode
- Add type annotations for all functions
- Avoid using `any` type
- Document public APIs with JSDoc comments

### Accessibility

- Follow WCAG 2.1 Level AA guidelines minimum
- Test with keyboard navigation
- Test with screen readers
- Ensure color contrast meets standards
- Use semantic HTML
- Include proper ARIA attributes

### Testing

- Write tests for all new features
- Maintain 80%+ code coverage
- Test edge cases and error conditions
- Use descriptive test names

### Code Style

- Use Prettier for formatting
- Follow ESLint rules
- Use meaningful variable names
- Keep functions small and focused
- Add comments for complex logic

## Commit Messages

Follow conventional commit format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/tooling changes

Example: `feat: add keyboard navigation to modal component`

## Pull Request Process

1. Update documentation for any API changes
2. Add tests for new functionality
3. Ensure all tests pass
4. Ensure no linting errors
5. Update CHANGELOG.md
6. Request review from maintainers

## Accessibility Testing Checklist

Before submitting your PR, verify:

- [ ] Keyboard navigation works properly
- [ ] Screen reader announcements are correct
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators are visible
- [ ] All interactive elements are focusable
- [ ] ARIA attributes are used correctly
- [ ] Semantic HTML is used
- [ ] No automatic timeouts without warning
- [ ] Zoom to 200% works correctly
- [ ] Respects user preferences (reduced motion, etc.)

## Questions?

Feel free to open an issue for questions or reach out to the maintainers.

Thank you for contributing to make the web more accessible! ♿
