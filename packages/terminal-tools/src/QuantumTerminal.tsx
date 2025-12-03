import { useState, useRef, useEffect } from 'react';

interface Command {
  input: string;
  output: string;
  timestamp: Date;
}

export function QuantumTerminal() {
  const [output, setOutput] = useState<Command[]>([
    { input: '', output: '🌈 mbtq Quantum Terminal v1.0\n✨ Welcome to the quantum dev environment\n💫 Ready for Deno, Rust, JavaScript, and AI agent integration\n\nType "help" for available commands\n', timestamp: new Date() }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light' | 'quantum'>('dark');
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let result = '';

    switch (trimmedCmd) {
      case 'help':
        result = `Available commands:
  help       - Show this help message
  clear      - Clear terminal
  theme      - Cycle through themes
  deno       - Show Deno runtime info
  rust       - Show Rust integration status
  agent      - AI agent status
  quantum    - Display quantum stats
  whoami     - Show user info
  date       - Current date/time`;
        break;
      case 'clear':
        setOutput([{ input: '', output: '🌈 Terminal cleared\n', timestamp: new Date() }]);
        setCurrentInput('');
        return;
      case 'theme':
        const themes: ('dark' | 'light' | 'quantum')[] = ['dark', 'light', 'quantum'];
        const currentIndex = themes.indexOf(theme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        setTheme(nextTheme);
        result = `Theme changed to: ${nextTheme}`;
        break;
      case 'deno':
        result = '🦕 Deno Runtime: Ready\nVersion: 1.39.0 (simulated)\nTypeScript: Native support ✓\nPermissions: Secure by default';
        break;
      case 'rust':
        result = '🦀 Rust Integration: Active\nWASM: Enabled ✓\nPerformance: Optimized\nMemory Safety: Guaranteed';
        break;
      case 'agent':
        result = '🤖 AI Agent: Online\nPluggable backends: OpenAI, Claude, Gemini, Local\nStatus: Ready for quantum codegen';
        break;
      case 'quantum':
        result = `⚛️ Quantum Stats:
Entangled connections: ${Math.floor(Math.random() * 100)}
Superposition states: Active
Quantum coherence: 99.7%
mbtq power level: OVER 9000! 🌈`;
        break;
      case 'whoami':
        result = '👤 quantum-dev-user\n🏳️‍🌈 Part of mbtq.dev community\n✨ Culture-first developer';
        break;
      case 'date':
        result = new Date().toString();
        break;
      case '':
        return;
      default:
        result = `Command not found: ${cmd}\nType "help" for available commands\n\n⟶ In production: This would route to Deno/Rust backend or AI agent`;
    }

    setOutput(prev => [...prev, { input: cmd, output: result, timestamp: new Date() }]);
    setCurrentInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(currentInput);
    }
  };

  const themeClasses = {
    dark: 'bg-black text-green-400',
    light: 'bg-gray-50 text-gray-800',
    quantum: 'bg-gradient-to-br from-purple-900 via-blue-900 to-fuchsia-900 text-cyan-300'
  };

  const promptColors = {
    dark: 'text-green-500',
    light: 'text-blue-600',
    quantum: 'text-fuchsia-400'
  };

  return (
    <section 
      className={`rounded-lg ${themeClasses[theme]} p-4 shadow-lg font-mono min-h-[400px] flex flex-col border-2 border-fuchsia-500`}
      aria-label="Quantum Terminal"
    >
      <div className="flex justify-between items-center mb-3 pb-2 border-b border-current">
        <h2 className={`text-xl font-bold ${promptColors[theme]}`}>
          🖥️ Quantum Terminal
        </h2>
        <div className="flex gap-2 text-xs">
          <button 
            onClick={() => setTheme('dark')}
            className={`px-2 py-1 rounded ${theme === 'dark' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            aria-label="Dark theme"
          >
            Dark
          </button>
          <button 
            onClick={() => setTheme('light')}
            className={`px-2 py-1 rounded ${theme === 'light' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            aria-label="Light theme"
          >
            Light
          </button>
          <button 
            onClick={() => setTheme('quantum')}
            className={`px-2 py-1 rounded ${theme === 'quantum' ? 'bg-fuchsia-600 text-white' : 'bg-gray-700 text-gray-300'}`}
            aria-label="Quantum theme"
          >
            Quantum
          </button>
        </div>
      </div>
      
      <div 
        ref={outputRef}
        className="flex-1 overflow-y-auto mb-3 text-sm whitespace-pre-wrap"
        style={{ minHeight: '300px', maxHeight: '400px' }}
      >
        {output.map((cmd, idx) => (
          <div key={idx} className="mb-2">
            {cmd.input && (
              <div className={`${promptColors[theme]} font-bold`}>
                $ {cmd.input}
              </div>
            )}
            <div className="pl-2">{cmd.output}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className={`${promptColors[theme]} font-bold`}>$</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`flex-1 bg-transparent border-none outline-none ${theme === 'light' ? 'text-gray-800' : ''}`}
          placeholder="Type a command..."
          aria-label="Terminal command input"
          autoFocus
        />
      </div>

      <div className="mt-3 pt-3 border-t border-current flex gap-2 text-xs">
        <button 
          onClick={() => executeCommand('help')}
          className="px-3 py-1 bg-fuchsia-600 text-white rounded hover:bg-fuchsia-700 font-bold"
        >
          📚 Help
        </button>
        <button 
          onClick={() => executeCommand('clear')}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 font-bold"
        >
          🧹 Clear
        </button>
        <button 
          onClick={() => alert('🤖 AI Agent integration: Connect to OpenAI, Claude, Gemini, or local Rust/Deno agent')}
          className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 font-bold"
        >
          🤖 Add Agent
        </button>
      </div>
    </section>
  );
}
