import { useRef, useEffect, useState } from "react";
import interact from "interactjs";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
  id: string;
  initial: { x: number; y: number; w: number; h: number };
};

export default function PinkSyncWidget({ socket, id, initial }: Props) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [coord, setCoord] = useState(initial);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    interact(box)
      .draggable({
        listeners: {
          move(ev) {
            setCoord(coords => ({
              ...coords,
              x: coords.x + ev.dx,
              y: coords.y + ev.dy,
            }));
            socket.emit("move", { id, x: coord.x + ev.dx, y: coord.y + ev.dy });
          },
        },
      })
      .resizable({
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
          move(ev) {
            let newW = ev.rect.width;
            let newH = ev.rect.height;
            setCoord(coords => ({
              ...coords,
              w: newW,
              h: newH,
            }));
            socket.emit("resize", { id, w: newW, h: newH });
          },
        },
        modifiers: [
          interact.modifiers.restrictSize({ min: { width: 180, height: 120 } }),
        ],
      });

    socket.on("sync", (change: any) => {
      if (change.id === id) setCoord(change);
    });

    return () => {
      interact(box).unset();
      socket.off("sync");
    };
    // eslint-disable-next-line
  }, [boxRef, socket, id]);

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
      className="bg-pink-50 border border-pink-500 rounded shadow p-4 focus:outline-pink-600"
      tabIndex={0}
      aria-label="Movable PinkSync Widget"
      role="region"
    >
      <h3 className="font-bold text-pink-700">🌸 PinkSync Widget</h3>
      <div>
        <p>
          Drag, resize in real-time. All changes are synced for every team member!
        </p>
        <button
          onClick={() =>
            socket.emit("visual-alert", {
              msg: "Deaf priority visual alert triggered!",
            })
          }
          className="mt-2 px-4 py-2 bg-pink-700 text-white rounded hover:bg-pink-800"
          aria-live="polite"
        >
          Trigger Visual Alert
        </button>
      </div>
    </div>
  );
}
