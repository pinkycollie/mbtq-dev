## 2024-05-24 - Interactive List Items
**Learning:** Found an accessibility issue pattern where `<li>` elements had `onClick` handlers. These are not inherently keyboard focusable or operable by screen readers.
**Action:** When creating interactive lists, wrap the content in semantic `<button>` tags within the `<li>`. Use `w-full text-left` to maintain the block layout, add focus styles (`focus:outline-none focus-visible:ring-x`), and include appropriate ARIA attributes like `aria-expanded`.

## 2025-02-14 - Explicit Form Labels & Required State Feedback
**Learning:** Encountered an accessibility issue where inputs lacked explicitly associated labels (missing `htmlFor` and `id` pair), depriving screen readers of their accessible names. Also noticed a UX pattern where submit buttons were disabled based on required input, but with no inline feedback provided explaining the required state.
**Action:** Always use explicit `htmlFor` attributes on labels targeting input `id`s. Add screen-reader-only text (e.g. `(Required)`) for mandatory fields, and use `aria-live` regions or inline helpers to explain exactly why a form is not ready to submit.

## 2025-04-08 - Accessible Dynamic Scrollable Regions
**Learning:** When creating dynamically updating scrollable regions (like activity logs), they are often invisible to screen reader users and keyboard navigators. They require a specific combination of attributes (`tabIndex={0}`, `role="region"`, `aria-labelledby`, and visible focus rings) to be discoverable, and `aria-live="polite"` to read out new items naturally. Empty states are also critical for providing context before any dynamic content arrives.
**Action:** Always apply the full accessibility suite (`tabIndex`, `role`, `aria-labelledby`, `focus-visible:ring`, and `aria-live`) to dynamically populating scrollable list containers. Include empty states to prevent confusion for both visual and non-visual users.

## 2025-05-18 - Explicit Focus Indicators and ARIA on Toggle Groups
**Learning:** Found custom toggle button groups in `SignVisualSystem.tsx` lacking semantic grouping and explicit state indicators, making them difficult to use for keyboard-only or screen reader users. Simply toggling visual classes is insufficient for accessibility.
**Action:** When creating custom toggle button groups, wrap the group in a container with `role="group"` and an `aria-labelledby` linking to a visible label. Ensure individual toggle states are communicated via the `aria-pressed` attribute, and always provide explicit visual focus indicators (like `focus-visible:ring-x focus-visible:ring-offset-x`) for keyboard navigation.
