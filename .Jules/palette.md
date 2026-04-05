## 2024-05-24 - Interactive List Items
**Learning:** Found an accessibility issue pattern where `<li>` elements had `onClick` handlers. These are not inherently keyboard focusable or operable by screen readers.
**Action:** When creating interactive lists, wrap the content in semantic `<button>` tags within the `<li>`. Use `w-full text-left` to maintain the block layout, add focus styles (`focus:outline-none focus-visible:ring-x`), and include appropriate ARIA attributes like `aria-expanded`.

## 2024-05-24 - Scrollable Region Accessibility
**Learning:** Scrollable dynamic logs (like ActionLog) with hidden overflows are inaccessible to keyboard users and screen readers unless they are explicitly focusable and have ARIA context. Also, empty logs offer no context to users without visual empty states.
**Action:** When implementing dynamically populating scrollable regions, add `tabIndex={0}`, `role="region"`, an `aria-labelledby` referencing the title, visible focus styles, `aria-live` for updates, and a helpful empty state message.
