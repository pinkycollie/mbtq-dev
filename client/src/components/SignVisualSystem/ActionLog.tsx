import React from 'react';
import { AgentStateEvent } from './types';
import { STATE_SEMANTICS } from './semantics';

interface ActionLogProps {
  events: AgentStateEvent[];
}

// ⚡ Bolt Optimization: Memoize ActionLog Component
// 💡 What: Wrapped ActionLog component in React.memo()
// 🎯 Why: ActionLog is a child of SignVisualSystem and frequently re-renders when parent state (like panel size/position) changes, but it only depends on the `events` prop.
// 📊 Impact: Prevents unnecessary complete re-renders of the event log list when unrelated parent state changes.
export const ActionLog: React.FC<ActionLogProps> = React.memo(({ events }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-4 max-h-64 overflow-y-auto">
      <h3 className="text-lg font-bold text-white mb-3">Agent Activity</h3>
      <div className="space-y-2">
        {events.map((event, idx) => {
          const semantic = STATE_SEMANTICS[event.current];
          // ⚡ Bolt Optimization: Use unique ID for React keys instead of array index
          // 💡 What: Changed the key from `idx` to `event.id` (or fallback to a robust identifier).
          // 🎯 Why: Since `events` are prepended (`[event, ...prev]`), using array indices as keys forces React to mutate the DOM for EVERY item in the list when a new event is added (O(n) complexity).
          // 📊 Impact: Reduces DOM mutations from O(n) to O(1) on list updates, making large list rendering significantly faster and smoother.
          return (
            <div key={event.id || `${event.timestamp}-${idx}`} className="flex items-start gap-3 text-sm">
              <span className={`${semantic.color} w-2 h-2 rounded-full mt-1.5 flex-shrink-0`} />
              <div className="flex-1">
                <span className="text-gray-300 font-medium">{semantic.visual}</span>
                <span className="text-gray-500 mx-2">·</span>
                <span className="text-gray-400">{semantic.meaning}</span>
                {event.actor && (
                  <span className="text-gray-600 text-xs ml-2">({event.actor})</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
