import { useState } from "react";
import { io } from "socket.io-client";
import PinkSyncWidget from "./components/PinkSyncWidget";
import A11yBar from "./components/A11yBar";
import Manifesto from "./components/Manifesto";

const socket = io(import.meta.env.VITE_SOCKET_SERVER_URL || "http://localhost:4000");

export default function App() {
  const [showManifesto, setShowManifesto] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-100 to-blue-50 font-mbtq antialiased relative">
      <header className="flex justify-between items-center p-6 bg-white shadow">
        <div>
          <h1 className="text-3xl font-bold text-fuchsia-600 tracking-tight">🌈 mbtq.dev</h1>
          <span className="block text-xs text-blue-700 font-semibold">Next-gen queer & deaf dev platform</span>
        </div>
        <button
          onClick={() => setShowManifesto(s => !s)}
          className="px-4 py-2 bg-blue-700 text-white rounded-full hover:bg-fuchsia-600 focus:outline-fuchsia-700"
        >
          {showManifesto ? "Hide" : "Manifesto"}
        </button>
      </header>
      {showManifesto && <Manifesto />}
      <main className="relative mx-auto max-w-7xl pt-12 flex flex-col gap-16 min-h-[80vh]">
        <PinkSyncWidget
          socket={socket}
          id="main"
          initial={{ x: 100, y: 80, w: 420, h: 220 }}
        />
        {/* Plug in other community widgets here (DeafAuth, GithubHTML, etc.) */}
      </main>
      <A11yBar />
      <footer className="text-center p-5 bg-white text-fuchsia-700 font-bold">
        mbtq.dev · Community. Culture. Power. <a href="https://github.com/pinkycollie/mbtq-dev" className="underline hover:text-fuchsia-600">GitHub</a>
      </footer>
    </div>
  );
}
