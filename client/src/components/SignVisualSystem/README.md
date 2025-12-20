# Sign Visual System

A deaf-accessible visual state communication system for agent interactions.

## Overview

The Sign Visual System provides a persistent, visual representation of agent states through a dedicated panel (the "Signer"). It implements the philosophy that "sign leads, text follows" - making system state visible through prominent visual indicators rather than relying on text or audio cues.

## Architecture

The system is built from modular, reusable components:

### Core Components

- **SignerPanel**: Persistent, dockable panel that displays current agent state
- **ActionLog**: Historical view of agent activities
- **ConfidenceCue**: Visual indicator of system confidence/certainty
- **StateEventBus**: Event system for state change notifications

### State Machine

The system defines 8 distinct agent states:

- `IDLE`: System ready to receive input
- `LISTENING`: Processing user intent
- `PROCESSING`: Reasoning through options
- `VALIDATING`: Checking constraints
- `EXECUTING`: Performing action
- `COMPLETED`: Action finished successfully
- `ERROR`: Issue requiring attention
- `NEEDS_INPUT`: Waiting for user input

Each state has semantic visual properties:
- **Visual label**: Short text description
- **Color**: Semantic color coding
- **Icon**: Visual symbol from lucide-react
- **Motion**: Animation style (pulse, spin, bounce, etc.)
- **Meaning**: Explanatory text

## Usage

### Basic Integration

```tsx
import { SignVisualSystem } from './components/SignVisualSystem';

function App() {
  return <SignVisualSystem />;
}
```

### Using Individual Components

```tsx
import { 
  SignerPanel, 
  ActionLog, 
  ConfidenceCue,
  eventBus,
  AGENT_STATES 
} from './components/SignVisualSystem';

// Emit state changes
eventBus.emit({
  current: AGENT_STATES.PROCESSING,
  actor: 'MyAgent',
  confidence: 0.85,
  requiresUser: false
});

// Subscribe to state changes
useEffect(() => {
  const unsubscribe = eventBus.subscribe((event) => {
    console.log('State changed:', event);
  });
  return unsubscribe;
}, []);
```

### SignerPanel Props

```tsx
<SignerPanel 
  state={{
    current: AGENT_STATES.PROCESSING,
    actor: 'AgentName',
    confidence: 0.85,
    requiresUser: false
  }}
  size="medium"  // 'small' | 'medium' | 'large'
  position="right"  // 'left' | 'center' | 'right'
/>
```

### ConfidenceCue Props

```tsx
<ConfidenceCue confidence={0.75} />
```

### ActionLog Props

```tsx
<ActionLog events={eventHistory} />
```

## Design Philosophy

- **Sign visuals reflect system state, not text output**: The visual representation is the primary communication channel
- **Every agent action emits a visible state change**: No silent processing or hidden waits
- **Confidence and uncertainty are first-class signals**: The system openly communicates its certainty level
- **Deaf-accessible by default**: All communication through visual channels
- **If the system thinks, it signs**: Transparency in all operations

## Accessibility Features

- High-contrast color coding
- Large, clear icons
- Persistent visual indicators
- No reliance on audio cues
- Screen reader compatible with ARIA labels
- Keyboard accessible controls

## Customization

### Adding New States

Edit `types.ts` to add new states to `AGENT_STATES`, then add semantic mapping in `semantics.tsx`:

```tsx
export const AGENT_STATES = {
  // ... existing states
  MY_NEW_STATE: 'my_new_state'
} as const;

// In semantics.tsx
export const STATE_SEMANTICS = {
  // ... existing semantics
  [AGENT_STATES.MY_NEW_STATE]: {
    visual: 'Custom Label',
    color: 'bg-teal-500',
    icon: MyIcon,
    motion: 'pulse',
    meaning: 'Doing something custom'
  }
};
```

### Styling

The system uses Tailwind CSS classes. Customize colors, sizes, and animations by modifying the component classes.

## Integration with mbtq.dev

The Sign Visual System is designed to integrate seamlessly with other mbtq.dev components:

- Works alongside `A11yBar` for comprehensive accessibility
- Compatible with `VisualNotificationSystem` for alerts
- Can be embedded in `PinkSyncWidget` or standalone

## Testing

Tests are included for all core components. Run tests with:

```bash
npm test
```

See `__tests__/SignVisualSystem.test.tsx` for examples.
