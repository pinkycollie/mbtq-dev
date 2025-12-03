import { useState } from "react";
import { QuantumSnippets, A11yBar } from "@mbtq/quantum-core";
import { QuantumTerminal } from "@mbtq/terminal-tools";
import { QuantumAgentChat } from "@mbtq/ai-agent";
import { SaaSTemplateGen } from "@mbtq/codegen";
import { PinkSyncWidget } from "@mbtq/pinksync";
import Manifesto from "./components/Manifesto";

export default function App() {
  const [showManifesto, setShowManifesto] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-100 to-blue-50 font-sans antialiased">
      <header className="flex justify-between items-center p-6 bg-white shadow-lg border-b-4 border-fuchsia-500">
        <div>
          <h1 className="text-4xl font-bold text-fuchsia-600 tracking-tight flex items-center gap-2">
            ✨ mbtq Quantum Dev
          </h1>
          <span className="block text-sm text-blue-700 font-semibold mt-1">
            Code Universe · AI · Terminal · Accessibility · Real-time
          </span>
        </div>
        <button
          onClick={() => setShowManifesto(s => !s)}
          className="px-6 py-3 bg-blue-700 text-white rounded-full hover:bg-fuchsia-600 focus:outline-fuchsia-700 font-bold transition-colors"
        >
          {showManifesto ? "Hide" : "📜 Manifesto"}
        </button>
      </header>
      
      {showManifesto && <Manifesto />}
      
      <main className="relative mx-auto max-w-7xl px-6 py-12 pb-24">
        <section className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <QuantumAgentChat />
            <QuantumSnippets />
            <SaaSTemplateGen />
          </div>
          <div className="space-y-8">
            <QuantumTerminal />
          </div>
        </section>
        
        {/* Real-time PinkSync Widget - draggable/resizable */}
        <PinkSyncWidget 
          id="quantum-widget" 
          initial={{ x: 50, y: 200, w: 380, h: 240 }}
        />
      </main>
      
      <A11yBar />
      
      <footer className="text-center p-6 bg-fuchsia-900 text-white font-bold border-t-4 border-fuchsia-500">
        <p className="text-xl mb-2">mbtq.dev · Community. Culture. Power.</p>
        <p className="text-sm opacity-90">
          <a href="https://github.com/pinkycollie/mbtq-dev" className="underline hover:text-fuchsia-200">
            🌈 GitHub
          </a>
          {" · "}
          Quantum-inspired, radically inclusive development platform
        </p>
      </footer>
    </div>
  );
}
