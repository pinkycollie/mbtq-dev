# API Documentation

## Table of Contents

- [AccessibilityChecker](#accessibilitychecker)
- [AriaValidator](#ariavalidator)
- [ColorContrastChecker](#colorcontrastchecker)
- [KeyboardNavigationUtil](#keyboardnavigationutil)
- [ScreenReaderUtil](#screenreaderutil)
- [Component Templates](#component-templates)

---

## AccessibilityChecker

Validates HTML content for accessibility issues based on WCAG 2.1 guidelines.

### Constructor

```typescript
new AccessibilityChecker(wcagLevel?: 'A' | 'AA' | 'AAA')
```

**Parameters:**
- `wcagLevel` (optional): WCAG conformance level. Default: `'AA'`

### Methods

#### `checkHtml(html: string): AccessibilityCheckResult`

Checks HTML content for accessibility issues.

**Parameters:**
- `html`: HTML string to check

**Returns:** `AccessibilityCheckResult` object containing:
- `passed`: boolean - Whether all checks passed
- `totalIssues`: number - Total number of issues found
- `errors`: Array of critical accessibility issues
- `warnings`: Array of accessibility warnings
- `info`: Array of informational messages
- `summary`: Object with counts by severity

**Example:**
```typescript
const checker = new AccessibilityChecker('AA');
const result = checker.checkHtml('<img src="photo.jpg">');
console.log(result.passed); // false - missing alt
```

#### `setWcagLevel(level: 'A' | 'AA' | 'AAA'): void`

Sets the WCAG conformance level.

#### `getWcagLevel(): 'A' | 'AA' | 'AAA'`

Gets the current WCAG conformance level.

---

## AriaValidator

Validates ARIA attributes and roles for proper usage.

### Static Methods

#### `validateRole(role: string): AriaValidationResult`

Validates an ARIA role.

**Parameters:**
- `role`: ARIA role to validate

**Returns:** Validation result with errors and warnings

**Example:**
```typescript
const result = AriaValidator.validateRole('button');
console.log(result.isValid); // true
```

#### `validateAriaAttributes(role: string, attributes: Record<string, string>): AriaValidationResult`

Validates ARIA attributes for a given role.

**Parameters:**
- `role`: ARIA role
- `attributes`: Object with ARIA attribute key-value pairs

**Example:**
```typescript
const result = AriaValidator.validateAriaAttributes('checkbox', {
  'aria-checked': 'true'
});
console.log(result.isValid); // true
```

#### `validateElement(element: string): AriaValidationResult`

Validates an entire HTML element string for ARIA compliance.

**Parameters:**
- `element`: HTML element string

**Example:**
```typescript
const result = AriaValidator.validateElement(
  '<div role="button" aria-pressed="true">Click</div>'
);
```

#### `extractAriaAttributes(element: string): Record<string, string>`

Extracts ARIA attributes from an HTML element string.

#### `extractRole(element: string): string | null`

Extracts the role attribute from an HTML element string.

---

## ColorContrastChecker

Checks color contrast ratios for WCAG compliance.

### Static Methods

#### `calculateContrastRatio(color1: string, color2: string): number`

Calculates the contrast ratio between two colors.

**Parameters:**
- `color1`: Hex color (e.g., `'#000000'`)
- `color2`: Hex color (e.g., `'#FFFFFF'`)

**Returns:** Contrast ratio as a number

**Example:**
```typescript
const ratio = ColorContrastChecker.calculateContrastRatio('#000000', '#FFFFFF');
console.log(ratio); // 21
```

#### `checkContrast(foreground: string, background: string, fontSize?: number, isBold?: boolean): ColorContrastResult`

Checks if a color combination meets WCAG standards.

**Parameters:**
- `foreground`: Foreground color (hex)
- `background`: Background color (hex)
- `fontSize`: Font size in pixels (default: 16)
- `isBold`: Whether text is bold (default: false)

**Returns:** Object with:
- `ratio`: Calculated contrast ratio
- `passesAA`: Whether it passes WCAG AA
- `passesAAA`: Whether it passes WCAG AAA
- `wcagLevel`: 'AAA', 'AA', or 'Fail'

**Example:**
```typescript
const result = ColorContrastChecker.checkContrast('#000000', '#FFFFFF', 16, false);
console.log(result.passesAA); // true
console.log(result.ratio); // 21
```

#### `getRecommendedRatio(fontSize: number, isBold?: boolean): string`

Gets the recommended contrast ratio for given text properties.

---

## KeyboardNavigationUtil

Provides utilities for managing keyboard navigation and focus.

### Static Methods

#### `getFocusableElements(container?: HTMLElement | Document): HTMLElement[]`

Gets all focusable elements within a container.

**Parameters:**
- `container`: Container to search (default: document)

**Returns:** Array of focusable HTML elements

#### `trapFocus(container: HTMLElement): () => void`

Traps keyboard focus within a container (useful for modals).

**Parameters:**
- `container`: Container element

**Returns:** Cleanup function to remove the focus trap

**Example:**
```typescript
const modal = document.getElementById('modal');
const cleanup = KeyboardNavigationUtil.trapFocus(modal);
// Later: cleanup();
```

#### `focusFirst(container: HTMLElement): boolean`

Moves focus to the first focusable element in a container.

**Returns:** `true` if an element was focused

#### `handleArrowNavigation(e: KeyboardEvent, elements: HTMLElement[], currentIndex: number, options?: object): number`

Handles arrow key navigation between elements.

**Parameters:**
- `e`: Keyboard event
- `elements`: Array of elements to navigate
- `currentIndex`: Current focused element index
- `options`: Optional configuration
  - `vertical`: Use up/down arrows (default: false)
  - `circular`: Wrap around at ends (default: true)

**Returns:** New focused element index

#### `createSkipLink(targetId: string, linkText?: string): HTMLElement`

Creates an accessible skip link element.

**Parameters:**
- `targetId`: ID of element to skip to
- `linkText`: Link text (default: "Skip to main content")

**Returns:** Skip link element

#### `isFocusable(element: HTMLElement): boolean`

Checks if an element is focusable.

---

## ScreenReaderUtil

Provides utilities for screen reader support.

### Static Methods

#### `createLiveRegion(role?: string, politeness?: string): HTMLElement`

Creates a live region for announcements.

**Parameters:**
- `role`: ARIA role ('status', 'alert', 'log')
- `politeness`: 'polite' or 'assertive'

**Returns:** Live region element

#### `announce(message: string, priority?: string): void`

Announces a message to screen readers.

**Parameters:**
- `message`: Message to announce
- `priority`: 'polite' or 'assertive' (default: 'polite')

**Example:**
```typescript
ScreenReaderUtil.announce('Form submitted successfully');
```

#### `createSrOnlyText(text: string): HTMLSpanElement`

Creates visually hidden but screen-reader-accessible text.

#### `addDescription(element: HTMLElement, description: string): void`

Adds a screen-reader-only description to an element.

#### `getSrOnlyStyles(): string`

Returns CSS for screen-reader-only content.

#### `isAccessibleToScreenReaders(element: HTMLElement): boolean`

Checks if an element is accessible to screen readers.

#### `announceLoading(message?: string): HTMLElement`

Creates a loading announcement.

#### `removeLoadingAnnouncement(liveRegion: HTMLElement, completeMessage?: string): void`

Removes a loading announcement.

---

## Component Templates

Functions that generate accessible HTML component templates.

### `createAccessibleButton(props: AccessibleButtonProps): string`

Creates an accessible button.

**Props:**
- `text`: Button text (required)
- `onClick`: Click handler
- `type`: 'button' | 'submit' | 'reset'
- `variant`: 'primary' | 'secondary' | 'danger'
- `disabled`: boolean
- `ariaLabel`: string
- `ariaDescribedBy`: string
- `icon`: string

### `createAccessibleInput(props: AccessibleInputProps): string`

Creates an accessible form input.

**Props:**
- `id`: Input ID (required)
- `label`: Label text (required)
- `type`: Input type
- `required`: boolean
- `placeholder`: string
- `helperText`: string
- `errorText`: string
- `value`: string

### `createAccessibleModal(props: AccessibleModalProps): string`

Creates an accessible modal dialog.

**Props:**
- `id`: Modal ID (required)
- `title`: Modal title (required)
- `content`: Modal content (required)
- `closeButtonText`: string

### `createAccessibleNav(props: AccessibleNavProps): string`

Creates an accessible navigation menu.

**Props:**
- `items`: Array of menu items (required)
- `ariaLabel`: string

### `createAccessibleTabs(props: AccessibleTabsProps): string`

Creates accessible tab panels.

**Props:**
- `tabs`: Array of tab items (required)
- `defaultTab`: number

### `createAccessibleAlert(props: AccessibleAlertProps): string`

Creates an accessible alert.

**Props:**
- `type`: 'info' | 'success' | 'warning' | 'error' (required)
- `message`: Alert message (required)
- `dismissible`: boolean

---

## TypeScript Interfaces

### AccessibilityIssue

```typescript
interface AccessibilityIssue {
  id: string;
  type: 'error' | 'warning' | 'info';
  severity: 'critical' | 'serious' | 'moderate' | 'minor';
  message: string;
  element?: string;
  wcagLevel: 'A' | 'AA' | 'AAA';
  wcagCriteria: string;
  helpUrl?: string;
  suggestion?: string;
}
```

### AccessibilityCheckResult

```typescript
interface AccessibilityCheckResult {
  passed: boolean;
  totalIssues: number;
  errors: AccessibilityIssue[];
  warnings: AccessibilityIssue[];
  info: AccessibilityIssue[];
  summary: {
    critical: number;
    serious: number;
    moderate: number;
    minor: number;
  };
}
```

### AriaValidationResult

```typescript
interface AriaValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}
```

### ColorContrastResult

```typescript
interface ColorContrastResult {
  ratio: number;
  passesAA: boolean;
  passesAAA: boolean;
  wcagLevel: 'AAA' | 'AA' | 'Fail';
}
```

---

For more examples and usage patterns, see the [README](./README.md) and [Accessibility Guide](./docs/ACCESSIBILITY.md).
