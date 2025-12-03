# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-03

### Added

#### Core Features
- **Accessibility Checker**: Comprehensive HTML accessibility validation
  - Image alt text validation
  - Heading hierarchy checking
  - Form label validation
  - Link accessibility checking
  - Landmark region validation
  - Language declaration checking
  - Tabindex validation
  - WCAG 2.1 Level A, AA, and AAA support

- **ARIA Validator**: Complete ARIA attribute validation
  - Role validation against ARIA 1.2 spec
  - Required property checking per role
  - Attribute value validation
  - Element accessibility validation

- **Color Contrast Checker**: WCAG-compliant contrast checking
  - Hex to RGB conversion
  - Relative luminance calculation
  - Contrast ratio calculation
  - AA and AAA compliance checking
  - Support for normal and large text
  - Recommended ratio guidance

- **Keyboard Navigation Utilities**: Focus management
  - Focusable element detection
  - Focus trapping for modals
  - Arrow key navigation handling
  - Skip link creation
  - Focusability checking

- **Screen Reader Utilities**: Assistive technology support
  - Live region creation
  - Announcement system
  - Screen-reader-only text
  - Description addition
  - Accessibility checking

#### Component Templates
- Accessible button component
- Accessible form input component
- Accessible modal dialog component
- Accessible navigation menu component
- Accessible tab panel component
- Accessible alert component

#### Developer Tools
- CLI tool for accessibility checking
- Color contrast demo
- Verbose output mode
- JSON output format

#### Auto DevOps
- CI/CD pipeline with GitHub Actions
- Automated accessibility testing workflow
- Daily accessibility audits
- Automatic dependency updates
- Pre-commit hooks for accessibility checks
- CodeQL security scanning
- Adaptive accessibility features detection

#### Documentation
- Comprehensive README with examples
- Detailed accessibility guide
- WCAG 2.1 guidelines documentation
- Code of conduct
- Contributing guidelines
- Example accessible HTML page

#### Testing
- 60 comprehensive unit tests
- Test coverage for all core modules
- Jest test framework configuration
- TypeScript test support

#### Build & Development
- TypeScript configuration with strict mode
- ESLint with accessibility rules
- Prettier code formatting
- Husky pre-commit hooks
- NPM package configuration

### Dependencies
- TypeScript 5.3.3
- Jest 29.7.0
- ESLint 8.56.0 with jsx-a11y plugin
- Prettier 3.1.1
- Axe-core 4.8.0
- WCAG-contrast 3.0.0

[1.0.0]: https://github.com/pinkycollie/mbtq-dev/releases/tag/v1.0.0
