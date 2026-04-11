## 2024-05-24 - Interactive List Items
**Learning:** Found an accessibility issue pattern where `<li>` elements had `onClick` handlers. These are not inherently keyboard focusable or operable by screen readers.
**Action:** When creating interactive lists, wrap the content in semantic `<button>` tags within the `<li>`. Use `w-full text-left` to maintain the block layout, add focus styles (`focus:outline-none focus-visible:ring-x`), and include appropriate ARIA attributes like `aria-expanded`.

## 2025-02-14 - Explicit Form Labels & Required State Feedback
**Learning:** Encountered an accessibility issue where inputs lacked explicitly associated labels (missing `htmlFor` and `id` pair), depriving screen readers of their accessible names. Also noticed a UX pattern where submit buttons were disabled based on required input, but with no inline feedback provided explaining the required state.
**Action:** Always use explicit `htmlFor` attributes on labels targeting input `id`s. Add screen-reader-only text (e.g. `(Required)`) for mandatory fields, and use `aria-live` regions or inline helpers to explain exactly why a form is not ready to submit.

## 2024-04-11 - Dynamic Scrollable Regions
**Learning:** When making dynamically populating scrollable regions (like action logs or activity feeds) accessible, simply applying `aria-live` is insufficient. The region itself needs to be discoverable and navigable.
**Action:** Always wrap dynamically populating scrollable list containers with `tabIndex={0}`, `role="region"`, an `aria-labelledby` referencing the list's title, visible focus styles (`focus-visible`), `aria-live="polite"`, and ensure a visible empty state is present when there are no items to provide context.
