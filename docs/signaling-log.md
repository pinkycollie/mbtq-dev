# WebRTC Signaling Monitor

This dashboard view provides a real-time, deaf-accessible log of all WebRTC signaling messages flowing through the PinkSync Mesh.

## Features

- **Live log:** Messages update instantly as they arrive.
- **Filter by Room ID:** Search for video room and isolate its traffic.
- **Filter by Message Type:** Toggle color-coded buttons for offer, answer, candidate.
- **Clear Log:** Reset the view for a fresh debugging session.
- **Accessibility:** Keyboard navigation, ARIA labels, screen-reader support.

## Backend Requirements

- WebSocket endpoint streaming signaling messages (`wss://localhost:4000/ws/signals`).
- Each message should be a JSON object:
  ```json
  {
    "sender": "user123",
    "room_id": "abc123",
    "message_type": "offer",
    "payload": { ... },
    "timestamp": "2025-09-15T20:18:00Z"
  }
  ```

## Usage

1. Start the backend WebSocket server.
2. Open `/signals` in the API Explorer dashboard.
3. Use room and type filters to inspect specific signaling flows.
4. Use "Clear" to reset the log for new sessions.

## Customization

- Update the WebSocket URL in `SignalingLogView.jsx` if needed.
- Extend with advanced features (export, replay, etc.) as required.
