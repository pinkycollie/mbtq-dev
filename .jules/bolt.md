## 2024-03-29 - React Memoization on Background Elements
**Learning:** Found multiple unmemoized background animation components (`FloatingEmoji`) in `App.tsx` that re-render whenever the main application state (theme, active view, celebration) changes. Also, static arrays inside components (`MBTQDevGenerator`) are recreated on every text input stroke.
**Action:** Apply `React.memo` to pure presentational or independently-stateful background components to prevent unnecessary React render cycles when the parent state updates, and move static arrays out of components.

## 2025-04-02 - High-Frequency Socket Emissions in interactjs Drag
**Learning:** interact.js fires 'move' events for virtually every pixel dragged. Directly coupling network requests (`socket.emit`) to these highly frequent DOM events overloads the network stack and Node server with a massive volume of tiny events, which causes potential lag and memory consumption without meaningful benefit for real-time syncing.
**Action:** Always decouple or throttle network emissions from high-frequency DOM/mouse events (like scroll, move, or resize). A simple ~50ms throttle combined with a final synchronization on the `end` event provides a smooth real-time appearance while severely reducing network chatter (by ~80-90%).
