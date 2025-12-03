# Accessibility Guide

## Introduction

This guide provides comprehensive information on building accessible applications using the MBTQ Accessibility Dev Platform.

## WCAG 2.1 Guidelines

### Level A (Minimum)

Level A is the minimum level of conformance. All websites should meet these criteria:

#### 1.1.1 Non-text Content
- Provide text alternatives for all non-text content
- Images must have alt text
- Decorative images should use `alt=""` or `role="presentation"`

#### 1.3.1 Info and Relationships
- Use semantic HTML elements
- Use proper heading hierarchy (h1, h2, h3, etc.)
- Use lists for list content
- Use tables for tabular data

#### 2.1.1 Keyboard
- All functionality must be available via keyboard
- No keyboard traps
- Logical tab order

#### 3.1.1 Language of Page
- Declare the language of the page with `lang` attribute

#### 4.1.2 Name, Role, Value
- All form inputs must have labels
- Interactive elements must have accessible names

### Level AA (Recommended)

Level AA is the recommended standard for most websites:

#### 1.4.3 Contrast (Minimum)
- Normal text: 4.5:1 contrast ratio
- Large text (18pt+ or 14pt+ bold): 3:1 contrast ratio

#### 1.4.5 Images of Text
- Avoid using images of text
- Use real text whenever possible

#### 2.4.6 Headings and Labels
- Headings describe topic or purpose
- Labels clearly describe input purpose

#### 2.4.7 Focus Visible
- Keyboard focus indicator is visible
- Clear visual indication of focused element

#### 3.2.3 Consistent Navigation
- Navigation is consistent across pages
- Same order and location

### Level AAA (Enhanced)

Level AAA is the highest level of conformance:

#### 1.4.6 Contrast (Enhanced)
- Normal text: 7:1 contrast ratio
- Large text: 4.5:1 contrast ratio

#### 2.4.8 Location
- Information about user's location is available

#### 2.4.9 Link Purpose (Link Only)
- Purpose of link can be determined from link text alone

## Core Principles

### 1. Perceivable

Users must be able to perceive the information being presented.

**Best Practices:**
- Provide text alternatives
- Provide captions and alternatives for multimedia
- Create content that can be presented in different ways
- Make it easier for users to see and hear content

### 2. Operable

Users must be able to operate the interface.

**Best Practices:**
- Make all functionality available from keyboard
- Give users enough time to read and use content
- Do not use content that causes seizures
- Help users navigate and find content
- Make it easier to use inputs other than keyboard

### 3. Understandable

Users must be able to understand the information and operation of the interface.

**Best Practices:**
- Make text readable and understandable
- Make content appear and operate in predictable ways
- Help users avoid and correct mistakes

### 4. Robust

Content must be robust enough to be interpreted by a wide variety of user agents.

**Best Practices:**
- Maximize compatibility with current and future tools
- Use valid, semantic HTML
- Ensure compatibility with assistive technologies

## Common Accessibility Issues

### Issue 1: Missing Alt Text

❌ **Bad:**
```html
<img src="logo.png">
```

✅ **Good:**
```html
<img src="logo.png" alt="Company Logo">
```

### Issue 2: Poor Color Contrast

❌ **Bad:**
```css
color: #777777; /* Gray text on white background - 4.6:1 */
background: #FFFFFF;
```

✅ **Good:**
```css
color: #595959; /* Darker gray - 7:1 */
background: #FFFFFF;
```

### Issue 3: Missing Form Labels

❌ **Bad:**
```html
<input type="text" placeholder="Enter your name">
```

✅ **Good:**
```html
<label for="name">Name:</label>
<input type="text" id="name" name="name">
```

### Issue 4: Keyboard Traps

❌ **Bad:**
```javascript
// Modal that traps focus but doesn't allow escape
modalElement.focus();
```

✅ **Good:**
```javascript
// Use focus trap with escape key handler
const cleanup = KeyboardNavigationUtil.trapFocus(modalElement);
modalElement.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cleanup();
    closeModal();
  }
});
```

### Issue 5: Non-semantic HTML

❌ **Bad:**
```html
<div onclick="submit()">Submit</div>
```

✅ **Good:**
```html
<button type="submit">Submit</button>
```

## Testing Your Application

### Automated Testing

1. **Use the Accessibility Checker:**
```typescript
import { AccessibilityChecker } from '@mbtq/accessibility-dev-platform';

const checker = new AccessibilityChecker('AA');
const result = checker.checkHtml(document.body.innerHTML);

if (!result.passed) {
  console.error('Accessibility issues found:', result.errors);
}
```

2. **Use Browser DevTools:**
- Chrome DevTools: Lighthouse Accessibility Audit
- Firefox: Accessibility Inspector
- Edge: Accessibility Insights

### Manual Testing

1. **Keyboard Navigation:**
   - Tab through all interactive elements
   - Ensure logical tab order
   - Verify focus indicators are visible
   - Test with Tab, Shift+Tab, Enter, Space, Arrow keys

2. **Screen Reader Testing:**
   - NVDA (Windows - Free)
   - JAWS (Windows - Commercial)
   - VoiceOver (Mac/iOS - Built-in)
   - TalkBack (Android - Built-in)

3. **Visual Testing:**
   - Test with browser zoom at 200%
   - Test in high contrast mode
   - Test with different color schemes
   - Test with reduced motion preferences

## Assistive Technologies

### Screen Readers

Screen readers read content aloud for users who are blind or have low vision.

**How to support:**
- Use semantic HTML
- Provide proper ARIA labels
- Ensure proper reading order
- Test with actual screen readers

### Keyboard Only

Some users navigate entirely with keyboard.

**How to support:**
- All functionality available via keyboard
- Visible focus indicators
- Logical tab order
- No keyboard traps

### Voice Control

Users control the interface with voice commands.

**How to support:**
- Visible labels on all controls
- Proper labeling of interactive elements
- Avoid custom controls without proper roles

### Screen Magnification

Users zoom in on portions of the screen.

**How to support:**
- Responsive design
- Proper text sizing
- Avoid fixed layouts
- Support browser zoom

## Quick Reference

### HTML Checklist

- [ ] Use `<html lang="en">` (or appropriate language)
- [ ] Use semantic elements (header, nav, main, article, etc.)
- [ ] Proper heading hierarchy (h1 → h2 → h3, no skips)
- [ ] All images have alt text
- [ ] All form inputs have labels
- [ ] Use button elements for buttons
- [ ] Use link elements for navigation
- [ ] Tables have proper structure with th elements

### CSS Checklist

- [ ] Sufficient color contrast
- [ ] Focus indicators are visible
- [ ] Text is resizable
- [ ] Content reflows at 200% zoom
- [ ] No content disappears when zoomed
- [ ] Respect prefers-reduced-motion
- [ ] Respect prefers-contrast

### JavaScript Checklist

- [ ] Keyboard event handlers (not just mouse)
- [ ] Manage focus appropriately
- [ ] Update ARIA states dynamically
- [ ] Announce dynamic content changes
- [ ] No automatic timeouts without warning
- [ ] Provide keyboard alternatives for gestures

## Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Articles](https://webaim.org/articles/)
- [A11Y Project Checklist](https://www.a11yproject.com/checklist/)
- [Inclusive Components](https://inclusive-components.design/)

## Getting Help

If you need help with accessibility:

1. Check the documentation
2. Run automated accessibility checks
3. Review the examples in this guide
4. Test with actual users
5. Consult accessibility experts

Remember: Accessibility is not optional—it's a requirement for building inclusive applications that work for everyone.
