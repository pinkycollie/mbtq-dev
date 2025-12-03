/**
 * MBTQ Accessibility Dev Platform
 * Main entry point
 */

// Core modules
export { AccessibilityChecker } from './core/accessibility-checker';
export type {
  AccessibilityIssue,
  AccessibilityCheckResult,
} from './core/accessibility-checker';

export { AriaValidator } from './core/aria-validator';
export type { AriaValidationResult } from './core/aria-validator';

export { ColorContrastChecker } from './core/color-contrast-checker';
export type { ColorContrastResult } from './core/color-contrast-checker';

// Utilities
export { KeyboardNavigationUtil } from './utils/keyboard-navigation';
export type { FocusableElement } from './utils/keyboard-navigation';

export { ScreenReaderUtil } from './utils/screen-reader';

// Templates
export {
  createAccessibleButton,
  createAccessibleInput,
  createAccessibleModal,
  createAccessibleNav,
  createAccessibleTabs,
  createAccessibleAlert,
} from './templates/components';

export type {
  AccessibleButtonProps,
  AccessibleInputProps,
  AccessibleModalProps,
  AccessibleNavProps,
  AccessibleTabsProps,
  AccessibleAlertProps,
  MenuItem,
  TabItem,
} from './templates/components';
