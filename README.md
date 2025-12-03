# Accessibility Dev Platform

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
# 🌈 PinkSync Starter Kit for LGBTQ (mbtq.dev)

A production-grade, real-time, drag-resize-accessible React starter for Deaf/Queer adaptive workspaces.

## 💎 What Makes This Legendary?

**This isn't just another UI kit.** This is a culture-first, accessibility-native, real-time collaborative development platform built by and for the LGBTQ+ and Deaf communities.

### ✨ Core Features

- **🎨 Movable, Resizable Widgets** - Built with Interact.js for smooth, intuitive drag-and-drop
- **🔄 Real-time Multiuser Sync** - Socket.IO powered collaboration
- **♿ Accessibility First** - WCAG compliant, screen-reader optimized, ARIA-enhanced
- **🎭 High Contrast Toggle** - Adaptive visual modes for low vision users
- **🔍 Built-in A11y Testing** - Integrated axe-core for automatic accessibility analysis
- **🏳️‍🌈 Queer & Deaf Culture** - Visual alerts, manifesto, community-driven design
- **⚡ Modern Tech Stack** - React 18, TypeScript, Vite, Tailwind CSS
- **🔌 Modular Architecture** - Ready for DeafAuth, video, AI, and more plug-ins

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### 1. Install Dependencies

#### Client
```bash
cd client
npm install
```

#### Server
```bash
cd server
npm install
```

### 2. Start Backend

```bash
cd server
npm start
```

The server will start on `http://localhost:4000`

### 3. Start Frontend

```bash
cd client
npm run dev
```

The client will start on `http://localhost:5173`

### 4. Open Your Browser

Navigate to [http://localhost:5173/](http://localhost:5173/)

## 🏗️ Project Structure

```
mbtq-pinksync-starter-kit/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── PinkSyncWidget.tsx    # Draggable/resizable widget
│   │   │   ├── A11yBar.tsx           # Accessibility controls
│   │   │   └── Manifesto.tsx         # Community manifesto
│   │   ├── App.tsx                   # Main application
│   │   ├── main.tsx                  # Entry point
│   │   └── index.css                 # Global styles
│   ├── index.html
│   └── package.json
├── server/                    # Socket.IO backend
│   ├── index.js              # Real-time sync server
│   └── package.json
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind + custom theme
├── tsconfig.json             # TypeScript config
└── README.md
```

## 🎨 Technology Stack

### Frontend
- **React 18** - Modern, component-based UI
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first styling with custom mbtq theme
- **Interact.js** - Best-in-class drag and resize
- **Socket.IO Client** - Real-time communication
- **axe-core** - Automated accessibility testing

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Minimal web framework
- **Socket.IO** - Real-time bidirectional communication
- **CORS** - Cross-origin resource sharing

## ♿ Accessibility Features

### Built-in Support
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Screen reader optimization
- ✅ High contrast mode toggle
- ✅ Focus management
- ✅ Semantic HTML
- ✅ Automated axe-core testing

### Accessibility Bar
The bottom bar provides:
- **High Contrast Toggle** - Switch between normal and high-contrast modes
- **A11y Check** - Run automated accessibility analysis (results in console)

## 🔄 Real-time Features

### Sync Events
- **Move** - Widget position updates broadcast to all connected clients
- **Resize** - Widget dimension changes sync in real-time
- **Visual Alerts** - Deaf-priority notifications system

### How It Works
1. Client connects to Socket.IO server
2. User interacts with widget (drag/resize)
3. Events emit to server
4. Server broadcasts to all other clients
5. All clients update in real-time

## 🎭 The mbtq.dev Manifesto

Click the **Manifesto** button to view our community principles:

- Empower Deaf, Queer, Disabled creators with world-class tools
- AI must serve culture, not erase it
- Design has radical inclusivity baked in
- Our code is Open—a community, not a product
- If it doesn't make you smile, remix it until it does

## 🔌 Extensibility

This starter kit is designed to be extended with:

- **@mbtq.dev/deafauth** - Sign language video authentication
- **@mbtq.dev/ai-gen** - AI-powered accessible code generation
- **@mbtq.dev/video** - Accessible video chat
- **GitHub HTML Import** - Import and preview HTML from repositories
- **Figma Sync** - Real-time design collaboration

## 🛠️ Development

### Build for Production

```bash
cd client
npm run build
```

### Preview Production Build

```bash
cd client
npm run preview
```

### Environment Variables

Create a `.env` file in the client directory:

```env
VITE_SOCKET_SERVER_URL=http://localhost:4000
```

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  fuchsia: { /* your colors */ },
  blue: { /* your colors */ },
  pink: { /* your colors */ },
}
```

### Adding Widgets

Create new components in `client/src/components/` and import them in `App.tsx`:

```tsx
import MyWidget from "./components/MyWidget";

// In App.tsx
<MyWidget socket={socket} />
```

## 🤝 Contributing

PRs welcome! We especially encourage contributions from:

- Deaf and Hard of Hearing developers
- LGBTQ+ community members
- Accessibility experts
- Anyone passionate about inclusive technology

### Contribution Guidelines

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test accessibility (run A11y Check)
5. Submit a pull request

## 📝 License

Open source. See LICENSE for details.

## 🔗 Links

- **Website**: [mbtq.dev](https://mbtq.dev)
- **GitHub**: [github.com/pinkycollie/mbtq-dev](https://github.com/pinkycollie/mbtq-dev)
- **Documentation**: Coming soon

## 💖 Acknowledgments

Built with love by the mbtq.dev community.

Special thanks to all Deaf, Queer, and Disabled contributors who make this platform possible.

---

**mbtq.dev © 2025. Community. Culture. Power.**
