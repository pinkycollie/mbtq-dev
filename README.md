# MBTQ Accessibility Dev Platform

A comprehensive, accessibility-focused development platform with all cores, features, tools, templates, and workflows. Built with auto DevOps that adhere to and adapt for users' accessibility needs.

## 🎯 Features

### Core Accessibility Modules

- **Accessibility Checker**: Comprehensive HTML accessibility validation
- **ARIA Validator**: Validates ARIA attributes and roles
- **Color Contrast Checker**: WCAG 2.1 compliant contrast ratio checking
- **Keyboard Navigation Utilities**: Focus management and keyboard navigation
- **Screen Reader Support**: Utilities for screen reader compatibility

### Accessible Component Templates

- Accessible Buttons
- Accessible Form Inputs
- Accessible Modal Dialogs
- Accessible Navigation Menus
- Accessible Tab Panels
- Accessible Alerts

### Auto DevOps Integration

- Automated accessibility testing in CI/CD
- Daily accessibility audits
- Automatic dependency updates
- Adaptive accessibility features detection

## 📦 Installation

```bash
npm install @mbtq/accessibility-dev-platform
```

## 🚀 Quick Start

### Check HTML Accessibility

```typescript
import { AccessibilityChecker } from '@mbtq/accessibility-dev-platform';

const checker = new AccessibilityChecker('AA'); // WCAG Level: A, AA, or AAA
const html = '<img src="photo.jpg">'; // Missing alt attribute

const result = checker.checkHtml(html);
console.log(`Passed: ${result.passed}`);
console.log(`Total Issues: ${result.totalIssues}`);
console.log(`Errors: ${result.errors.length}`);
console.log(`Warnings: ${result.warnings.length}`);
```

### Validate ARIA Attributes

```typescript
import { AriaValidator } from '@mbtq/accessibility-dev-platform';

const element = '<div role="button" aria-pressed="true">Click me</div>';
const validation = AriaValidator.validateElement(element);

if (!validation.isValid) {
  console.log('Errors:', validation.errors);
}
```

### Check Color Contrast

```typescript
import { ColorContrastChecker } from '@mbtq/accessibility-dev-platform';

const result = ColorContrastChecker.checkContrast(
  '#000000', // foreground
  '#FFFFFF', // background
  16,        // font size
  false      // is bold
);

console.log(`Contrast Ratio: ${result.ratio}:1`);
console.log(`WCAG AA: ${result.passesAA ? '✓' : '✗'}`);
console.log(`WCAG AAA: ${result.passesAAA ? '✓' : '✗'}`);
```

### Keyboard Navigation

```typescript
import { KeyboardNavigationUtil } from '@mbtq/accessibility-dev-platform';

// Get all focusable elements
const focusable = KeyboardNavigationUtil.getFocusableElements(document);

// Trap focus within a modal
const container = document.getElementById('modal');
const cleanup = KeyboardNavigationUtil.trapFocus(container);

// Later, remove focus trap
cleanup();

// Create skip link
const skipLink = KeyboardNavigationUtil.createSkipLink('main-content');
document.body.prepend(skipLink);
```

### Screen Reader Support

```typescript
import { ScreenReaderUtil } from '@mbtq/accessibility-dev-platform';

// Announce to screen readers
ScreenReaderUtil.announce('Form submitted successfully', 'polite');

// Create screen reader only text
const srText = ScreenReaderUtil.createSrOnlyText('Additional context for screen readers');

// Add description to element
const button = document.getElementById('delete-btn');
ScreenReaderUtil.addDescription(button, 'This will permanently delete the item');
```

### Use Accessible Templates

```typescript
import {
  createAccessibleButton,
  createAccessibleInput,
  createAccessibleModal,
  createAccessibleNav,
  createAccessibleTabs,
  createAccessibleAlert,
} from '@mbtq/accessibility-dev-platform';

// Create accessible button
const button = createAccessibleButton({
  text: 'Submit Form',
  type: 'submit',
  variant: 'primary',
  ariaLabel: 'Submit the contact form',
});

// Create accessible input
const input = createAccessibleInput({
  id: 'email',
  label: 'Email Address',
  type: 'email',
  required: true,
  helperText: 'We will never share your email',
});

// Create accessible modal
const modal = createAccessibleModal({
  id: 'confirm-modal',
  title: 'Confirm Action',
  content: 'Are you sure you want to proceed?',
});
```

## 🎨 WCAG Compliance Levels

The platform supports three WCAG 2.1 conformance levels:

- **Level A**: Minimum compliance (basic accessibility)
- **Level AA**: Standard compliance (recommended for most sites)
- **Level AAA**: Enhanced compliance (highest level)

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm test -- --coverage

# Run linter
npm run lint

# Run accessibility check
npm run accessibility:check
```

## 🔄 CI/CD Integration

The platform includes three GitHub Actions workflows:

1. **CI/CD Pipeline** (`.github/workflows/ci-cd.yml`)
   - Linting and testing
   - Accessibility audits
   - Build and packaging
   - Security scanning
   - Automatic publishing

2. **Accessibility Testing** (`.github/workflows/accessibility-testing.yml`)
   - WCAG compliance checks
   - Color contrast validation
   - Keyboard navigation reminders

3. **Auto DevOps** (`.github/workflows/auto-devops.yml`)
   - Daily accessibility audits
   - Automatic dependency updates
   - Adaptive features checking
   - Documentation verification

## 📋 Accessibility Checklist

When using this platform, ensure you:

- [ ] Use semantic HTML elements
- [ ] Provide text alternatives for non-text content
- [ ] Ensure sufficient color contrast (4.5:1 for normal text)
- [ ] Make all functionality keyboard accessible
- [ ] Provide clear focus indicators
- [ ] Use ARIA attributes correctly
- [ ] Structure content with proper headings
- [ ] Label all form inputs
- [ ] Provide skip links for navigation
- [ ] Test with screen readers
- [ ] Support user preferences (reduced motion, high contrast)

## 🌐 Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)

## 🤝 Contributing

Contributions are welcome! Please ensure all changes:

1. Follow WCAG 2.1 Level AA guidelines minimum
2. Include appropriate tests
3. Pass all accessibility checks
4. Update documentation

## 📄 License

MIT

## 🔗 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Resources](https://webaim.org/)
- [Deque University](https://dequeuniversity.com/)

## 💬 Support

For issues, questions, or contributions, please visit the [GitHub repository](https://github.com/pinkycollie/mbtq-dev).

---

**Built with ♿ accessibility in mind**
