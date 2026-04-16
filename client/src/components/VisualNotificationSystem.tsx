import { useEffect, useState, useCallback, memo } from 'react';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface VisualNotification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

interface VisualNotificationProps {
  notification: VisualNotification;
  onDismiss: (id: string) => void;
}

const notificationStyles = {
  info: 'bg-blue-500 border-blue-700',
  success: 'bg-green-500 border-green-700',
  warning: 'bg-yellow-500 border-yellow-700',
  error: 'bg-red-500 border-red-700',
};

const notificationIcons = {
  info: 'ℹ️',
  success: '✅',
  warning: '⚠️',
  error: '❌',
};

/**
 * VisualNotificationComponent - Deaf-accessible visual notification
 * Replaces audio alerts with prominent visual indicators
 */
// ⚡ Bolt Optimization: Memoize VisualNotificationComponent
// 💡 What: Wrapped VisualNotificationComponent with React.memo()
// 🎯 Why: Prevents re-rendering existing notifications when a new notification is added to the list. Unnecessary re-renders would otherwise re-trigger the useEffect cleanup and reset the active timer for dismissing the notification.
// 📊 Impact: Prevents visual glitches where notifications stay on screen longer than intended because their timers keep resetting on every new notification.
const VisualNotificationComponent = memo(function VisualNotificationComponent({ notification, onDismiss }: VisualNotificationProps) {
  useEffect(() => {
    if (notification.duration) {
      const timer = setTimeout(() => {
        onDismiss(notification.id);
      }, notification.duration);
      return () => clearTimeout(timer);
    }
  }, [notification, onDismiss]);

  return (
    <div
      className={`${notificationStyles[notification.type]} 
        text-white px-6 py-4 rounded-lg shadow-2xl 
        border-l-4 animate-bounce-in
        flex items-start gap-4 min-w-[300px] max-w-[500px]`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <span className="text-3xl flex-shrink-0" aria-hidden="true">
        {notificationIcons[notification.type]}
      </span>
      <div className="flex-1">
        <p className="font-bold text-lg">{notification.message}</p>
      </div>
      <button
        onClick={() => onDismiss(notification.id)}
        className="text-white hover:text-gray-200 text-2xl font-bold flex-shrink-0"
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
});

/**
 * VisualNotificationSystem - Container for managing multiple visual notifications
 * Designed for deaf users - all notifications are visual, no audio
 */
export default function VisualNotificationSystem() {
  const [notifications, setNotifications] = useState<VisualNotification[]>([]);

  useEffect(() => {
    // Listen for custom events to show notifications
    const handleShowNotification = (event: CustomEvent<Omit<VisualNotification, 'id'>>) => {
      const notification: VisualNotification = {
        ...event.detail,
        id: `notification-${Date.now()}-${Math.random()}`,
      };
      setNotifications((prev) => [...prev, notification]);
    };

    window.addEventListener('show-visual-notification' as any, handleShowNotification);
    return () => {
      window.removeEventListener('show-visual-notification' as any, handleShowNotification);
    };
  }, []);

  // ⚡ Bolt Optimization: Wrap dismiss handler in useCallback
  // 💡 What: Wrapped dismissNotification in useCallback.
  // 🎯 Why: Ensures the function reference remains stable across re-renders of the parent system. This is required for the child's React.memo to be effective.
  // 📊 Impact: Combined with React.memo on the child, avoids O(n) re-renders of all visible notifications when the list changes.
  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <div 
      className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none"
      role="region"
      aria-label="Notifications"
    >
      {notifications.map((notification) => (
        <div key={notification.id} className="pointer-events-auto">
          <VisualNotificationComponent
            notification={notification}
            onDismiss={dismissNotification}
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Helper function to trigger visual notifications
 * Usage: showVisualNotification({ type: 'success', message: 'Saved!', duration: 3000 })
 */
export function showVisualNotification(
  notification: Omit<VisualNotification, 'id'>
) {
  window.dispatchEvent(
    new CustomEvent('show-visual-notification', {
      detail: notification,
    })
  );
}
