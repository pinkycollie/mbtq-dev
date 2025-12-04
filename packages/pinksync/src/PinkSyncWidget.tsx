import React, { useRef, useEffect, useState } from "react";
import interact from "interactjs";
import { io, Socket } from "socket.io-client";

interface PinkSyncWidgetProps {
  id?: string;
  initial?: { x: number; y: number; w: number; h: number };
  socketUrl?: string;
}

export function PinkSyncWidget({ 
  id = 'default', 
  initial = { x: 100, y: 120, w: 420, h: 220 },
  socketUrl = import.meta.env.VITE_SOCKET_SERVER_URL || "http://localhost:4000"
}: PinkSyncWidgetProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [coord, setCoord] = useState(initial);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(socketUrl);
    setSocket(socketInstance);

    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('🌸 PinkSync connected:', socketInstance.id);
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('PinkSync disconnected');
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [socketUrl]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box || !socket) return;

    interact(box)
      .draggable({
        listeners: {
          move(ev) {
            setCoord(prevCoord => {
              const newCoord = {
                ...prevCoord,
                x: prevCoord.x + ev.dx,
                y: prevCoord.y + ev.dy
              };
              socket.emit("move", { id, ...newCoord });
              return newCoord;
            });
          }
        }
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
          move(ev) {
            setCoord(prevCoord => {
              const newCoord = {
                ...prevCoord,
                w: ev.rect.width,
                h: ev.rect.height
              };
              socket.emit("resize", { id, ...newCoord });
              return newCoord;
            });
          }
        },
        modifiers: [
          interact.modifiers.restrictSize({ min: { width: 180, height: 120 } })
        ]
      });

    socket.on("sync", (change: any) => {
      if (change.id === id) {
        setCoord(change);
      }
    });

    return () => {
      interact(box).unset();
      socket.off("sync");
    };
  }, [boxRef, socket, id]);

  const triggerVisualAlert = () => {
    if (socket) {
      socket.emit("visual-alert", {
        msg: "Deaf priority visual alert triggered!",
        id
      });
      alert("🌸 Visual alert sent to all connected users!");
    }
  };

  return (
    <div
      ref={boxRef}
      style={{
        position: "absolute",
        left: coord.x,
        top: coord.y,
        width: coord.w,
        height: coord.h,
        zIndex: 5,
      }}
      className="bg-gradient-to-br from-pink-50 to-fuchsia-50 border-2 border-fuchsia-600 rounded-lg shadow-2xl p-4 focus:outline-fuchsia-600 cursor-move"
      tabIndex={0}
      aria-label="Movable PinkSync Widget"
      role="region"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-fuchsia-700 text-lg flex items-center gap-2">
          🌸 PinkSync Widget
          {isConnected && (
            <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" title="Connected"></span>
          )}
        </h3>
        <div className="text-xs text-gray-500 font-mono bg-white px-2 py-1 rounded">
          {coord.w}×{coord.h}
        </div>
      </div>
      
      <div className="mb-3">
        <p className="text-sm text-gray-700 mb-2">
          ✨ Drag, resize, sync in real-time. All changes are live for every team member!
        </p>
        <div className="text-xs text-gray-600 space-y-1">
          <div>📍 Position: ({Math.round(coord.x)}, {Math.round(coord.y)})</div>
          <div>📐 Size: {Math.round(coord.w)} × {Math.round(coord.h)}</div>
          <div>🔗 Status: {isConnected ? '✓ Connected' : '✗ Disconnected'}</div>
        </div>
      </div>

      <button
        onClick={triggerVisualAlert}
        className="w-full px-4 py-2 bg-fuchsia-700 text-white rounded-lg hover:bg-fuchsia-800 font-bold transition-colors focus:outline-fuchsia-900"
        aria-live="polite"
      >
        🔔 Trigger Visual Alert
      </button>

      <div className="mt-3 pt-3 border-t border-fuchsia-200">
        <p className="text-xs text-gray-500 italic">
          💡 Real-time multiuser collaboration with Socket.IO
        </p>
      </div>
    </div>
  );
}
