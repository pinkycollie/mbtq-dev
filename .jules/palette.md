## 2024-04-02 - Form Labels and Character Limits
**Learning:** In React components like `MBTQDevGenerator.tsx`, textareas handling potentially long inputs lacked explicit constraints and visual indicators, which can frustrate users who might type too much.
**Action:** Always associate `<label>` with `<input>` or `<textarea>` using `htmlFor` and `id`, and add a character counter (`maxLength` + visual count) to improve UX and prevent silent validation failures.
## 2024-05-18 - Avoid aria-live on interactive triggers
**Learning:** `aria-live` should be placed on a container element that exists in the DOM before the dynamic content is added or changed, rather than on the interactive element (like a button) that triggers the change. Screen readers monitor the `aria-live` region for changes, so if the region itself is added dynamically or if the attribute is on the trigger, the new content may not be announced correctly.
**Action:** Always wrap dynamic text or status updates in a dedicated `div` or `span` with `aria-live="polite"` (and often `aria-atomic="true"`) that is always present in the DOM, separate from the button that causes the update.
