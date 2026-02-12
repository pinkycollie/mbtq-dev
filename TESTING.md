# 🧪 Testing Guide

## Overview

This guide covers the testing strategy and practices for MBTQ.dev, including unit tests, integration tests, accessibility tests, and end-to-end tests.

---

## 🏗️ Testing Stack

### Frontend Testing
- **Vitest**: Fast unit test framework
- **React Testing Library**: Component testing
- **jsdom**: DOM environment for tests
- **@testing-library/jest-dom**: Custom matchers
- **@testing-library/user-event**: User interaction simulation

### Backend Testing
- **Jest** (optional): For server tests
- **Supertest** (optional): API endpoint testing

### Accessibility Testing
- **@axe-core/react**: Automated accessibility testing
- **Pa11y** (optional): CLI accessibility testing

### E2E Testing
- **Playwright** (recommended): Browser automation
- **Cypress** (alternative): E2E testing framework

---

## 🚀 Running Tests

### Client Tests

```bash
cd client

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- A11yBar.test.tsx
```

### Server Tests

```bash
cd server

# Run tests (when implemented)
npm test
```

---

## 📝 Writing Tests

### Unit Tests

**Example: Component Test**

```typescript
// src/components/__tests__/A11yBar.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import A11yBar from '../A11yBar'

describe('A11yBar Component', () => {
  it('renders accessibility bar', () => {
    render(<A11yBar />)
    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('toggles high contrast mode', async () => {
    const user = userEvent.setup()
    render(<A11yBar />)
    
    const button = screen.getByRole('button', { name: /high contrast/i })
    await user.click(button)
    
    expect(document.body.classList.contains('high-contrast')).toBe(true)
  })
})
```

**Example: Utility Function Test**

```typescript
// src/utils/__tests__/validators.test.ts
import { describe, it, expect } from 'vitest'
import { validateEmail, sanitizeInput } from '../validators'

describe('Validators', () => {
  describe('validateEmail', () => {
    it('validates correct email', () => {
      expect(validateEmail('test@example.com')).toBe(true)
    })

    it('rejects invalid email', () => {
      expect(validateEmail('invalid-email')).toBe(false)
    })
  })

  describe('sanitizeInput', () => {
    it('removes HTML tags', () => {
      expect(sanitizeInput('<script>alert("xss")</script>'))
        .toBe('alert("xss")')
    })
  })
})
```

### Integration Tests

**Example: API Integration Test**

```typescript
// src/services/__tests__/api.test.ts
import { describe, it, expect, vi } from 'vitest'
import { fetchUserData } from '../api'

// Mock fetch
global.fetch = vi.fn()

describe('API Service', () => {
  it('fetches user data successfully', async () => {
    const mockData = { id: 1, name: 'Test User' }
    
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    } as Response)

    const data = await fetchUserData(1)
    expect(data).toEqual(mockData)
  })

  it('handles fetch errors', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

    await expect(fetchUserData(1)).rejects.toThrow('Network error')
  })
})
```

### Accessibility Tests

**Example: Automated A11y Test**

```typescript
// src/components/__tests__/App.a11y.test.tsx
import { describe, it } from 'vitest'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import App from '../App'

expect.extend(toHaveNoViolations)

describe('App Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<App />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

### Visual Notification Tests

```typescript
// src/components/__tests__/VisualNotificationSystem.test.tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import VisualNotificationSystem, { showVisualNotification } from '../VisualNotificationSystem'

describe('VisualNotificationSystem', () => {
  it('displays notification when event triggered', async () => {
    render(<VisualNotificationSystem />)
    
    showVisualNotification({
      type: 'success',
      message: 'Test notification',
      duration: 3000,
    })

    await waitFor(() => {
      expect(screen.getByText('Test notification')).toBeInTheDocument()
    })
  })

  it('dismisses notification after duration', async () => {
    vi.useFakeTimers()
    render(<VisualNotificationSystem />)
    
    showVisualNotification({
      type: 'info',
      message: 'Temporary message',
      duration: 1000,
    })

    await waitFor(() => {
      expect(screen.getByText('Temporary message')).toBeInTheDocument()
    })

    vi.advanceTimersByTime(1000)

    await waitFor(() => {
      expect(screen.queryByText('Temporary message')).not.toBeInTheDocument()
    })

    vi.useRealTimers()
  })
})
```

---

## 🎭 End-to-End Testing

### Playwright Setup

```bash
# Install Playwright
npm install -D @playwright/test
npx playwright install
```

**playwright.config.ts**:
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

**Example E2E Test**:
```typescript
// e2e/accessibility.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Accessibility Features', () => {
  test('high contrast toggle works', async ({ page }) => {
    await page.goto('/');
    
    // Click high contrast button
    await page.click('button:has-text("High Contrast")');
    
    // Verify high contrast mode is active
    const body = await page.locator('body');
    await expect(body).toHaveClass(/high-contrast/);
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/');
    
    // Tab through focusable elements
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
  });

  test('visual notifications display', async ({ page }) => {
    await page.goto('/');
    
    // Trigger a notification
    await page.click('button:has-text("Test Notification")');
    
    // Verify notification appears
    await expect(page.locator('[role="alert"]')).toBeVisible();
  });
});
```

---

## ♿ Accessibility Testing

### Manual Testing Checklist

- [ ] All interactive elements accessible via keyboard
- [ ] Tab order is logical
- [ ] Focus indicators are visible
- [ ] Screen reader announces all content correctly
- [ ] Images have alt text
- [ ] Forms have proper labels
- [ ] Color contrast meets WCAG AA standards
- [ ] Text can be zoomed to 200%
- [ ] No content relies solely on audio cues

### Automated Accessibility Testing

```bash
# Install Pa11y CLI
npm install -g pa11y

# Test a page
pa11y http://localhost:5173

# Test with specific WCAG level
pa11y --standard WCAG2AA http://localhost:5173

# Generate HTML report
pa11y --reporter html http://localhost:5173 > a11y-report.html
```

### Lighthouse CI

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run Lighthouse
lhci autorun --collect.url=http://localhost:5173
```

---

## 📊 Coverage Reports

### Viewing Coverage

```bash
cd client
npm run test:coverage

# Coverage report will be generated in coverage/
# Open coverage/index.html in browser
```

### Coverage Goals

- **Statements**: >80%
- **Branches**: >75%
- **Functions**: >80%
- **Lines**: >80%

### Coverage Configuration

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      lines: 80,
      functions: 80,
      branches: 75,
      statements: 80,
    }
  }
})
```

---

## 🔄 Continuous Integration

### GitHub Actions Testing Workflow

Already configured in `.github/workflows/ci.yml`:

- ✅ Dependency security scanning
- ✅ Linting and type checking
- ✅ Unit tests
- ✅ Build verification
- ✅ Accessibility checks

### Pre-commit Hooks

Install Husky for pre-commit testing:

```bash
npm install -D husky
npx husky install
npx husky add .husky/pre-commit "cd client && npm test"
```

---

## 🎯 Testing Best Practices

### DO's ✅

1. **Test user behavior, not implementation**
   ```typescript
   // Good
   await user.click(screen.getByRole('button', { name: 'Submit' }))
   
   // Avoid
   wrapper.instance().handleSubmit()
   ```

2. **Use semantic queries**
   ```typescript
   // Good
   screen.getByRole('button', { name: 'Save' })
   screen.getByLabelText('Email')
   
   // Avoid
   screen.getByTestId('save-button')
   ```

3. **Test accessibility**
   ```typescript
   // Verify ARIA labels
   expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Close')
   ```

4. **Mock external dependencies**
   ```typescript
   vi.mock('socket.io-client', () => ({
     io: vi.fn(() => ({
       on: vi.fn(),
       emit: vi.fn(),
     })),
   }))
   ```

5. **Clean up after tests**
   ```typescript
   afterEach(() => {
     cleanup()
     vi.clearAllMocks()
   })
   ```

### DON'Ts ❌

1. **Don't test implementation details**
2. **Don't rely on snapshot tests alone**
3. **Don't test third-party libraries**
4. **Don't make tests dependent on each other**
5. **Don't hardcode test data that could change**

---

## 🐛 Debugging Tests

### Debug in VS Code

Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Vitest Tests",
  "runtimeExecutable": "npm",
  "runtimeArgs": ["test", "--", "--run"],
  "console": "integratedTerminal"
}
```

### Debug Specific Test

```bash
# Run single test file with debugging
npm test -- A11yBar.test.tsx --reporter=verbose

# Debug with inspector
node --inspect-brk node_modules/.bin/vitest A11yBar.test.tsx
```

### Visual Debugging with Playwright

```bash
# Run tests in headed mode
npx playwright test --headed

# Debug mode
npx playwright test --debug

# Show trace viewer
npx playwright show-trace trace.zip
```

---

## 📈 Test Metrics

### Track These Metrics

- **Test Coverage**: >80% goal
- **Test Execution Time**: <5 minutes
- **Flaky Tests**: 0 tolerance
- **Test Failures**: Fix immediately
- **Accessibility Violations**: 0 tolerance

### Generate Test Report

```bash
# Vitest HTML report
npm test -- --reporter=html

# Playwright HTML report
npx playwright show-report
```

---

## 🔗 Testing Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Last Updated**: 2025-12-15

For questions or issues with testing, please open a GitHub issue.
