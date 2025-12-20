import { AgentStateEvent } from './types';

// Event Bus for state changes
export class StateEventBus {
  private listeners: Array<(event: AgentStateEvent) => void> = [];

  emit(event: AgentStateEvent): void {
    const eventWithTimestamp = {
      ...event,
      timestamp: event.timestamp || Date.now()
    };
    this.listeners.forEach(listener => listener(eventWithTimestamp));
  }

  subscribe(callback: (event: AgentStateEvent) => void): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback);
    };
  }
}

// Singleton instance for global state event bus
export const eventBus = new StateEventBus();
