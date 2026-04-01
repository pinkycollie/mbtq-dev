## 2024-03-29 - React Memoization on Background Elements
**Learning:** Found multiple unmemoized background animation components (`FloatingEmoji`) in `App.tsx` that re-render whenever the main application state (theme, active view, celebration) changes. Also, static arrays inside components (`MBTQDevGenerator`) are recreated on every text input stroke.
**Action:** Apply `React.memo` to pure presentational or independently-stateful background components to prevent unnecessary React render cycles when the parent state updates, and move static arrays out of components.
## 2024-04-01 - Batching Sequential DB Writes
**Learning:** The POST `/api/requests/:id/accept-bid` endpoint was executing 5 separate, sequential Prisma queries to update request, bid statuses, log status changes, and create projects. This pattern blocks node thread longer and adds 5x database latency over the wire on a critical workflow path.
**Action:** When executing multiple writes logically related to a single domain event (like accepting a bid), use `prisma.$transaction([])` to send them as a single roundtrip. This ensures atomicity and cuts the network overhead down to a single call.
