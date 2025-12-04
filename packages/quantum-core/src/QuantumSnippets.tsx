import { useState } from 'react';

export function QuantumSnippets() {
  const [snips, setSnips] = useState([
    { lang: 'zod', code: 'const user = z.object({ name: z.string(), email: z.string().email() });', emoji: '🔷' },
    { lang: 'rust', code: 'fn main() { println!("Quantum mbtq"); }', emoji: '🦀' },
    { lang: 'typescript', code: 'type User = { name: string; email: string; };', emoji: '💠' },
    { lang: 'html', code: '<section>🌈 Powered by mbtq.dev</section>', emoji: '🌐' },
    { lang: 'deno', code: 'console.log("Deno quantum runtime!");', emoji: '🦕' }
  ]);
  
  const [newSnippet, setNewSnippet] = useState({ lang: '', code: '', emoji: '✨' });

  const addSnippet = () => {
    if (newSnippet.code && newSnippet.lang) {
      setSnips([...snips, { ...newSnippet }]);
      setNewSnippet({ lang: '', code: '', emoji: '✨' });
    }
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Snippet copied to clipboard! 📋');
  };

  return (
    <section className="rounded bg-white p-4 shadow mb-8 border-2 border-fuchsia-200" aria-label="Quantum Snippets">
      <h2 className="text-2xl font-bold text-fuchsia-700 mb-4">✨ Quantum Snippets</h2>
      <p className="text-sm text-gray-600 mb-4">Multi-language code snippets: Zod, Rust, TypeScript, HTML, Deno</p>
      
      <ul className="space-y-3 mb-4">
        {snips.map((snip, i) => (
          <li 
            key={i} 
            draggable 
            className="border border-gray-200 rounded p-3 hover:border-fuchsia-400 transition-colors cursor-move"
            onDragStart={(e) => e.dataTransfer.setData('text/plain', snip.code)}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-blue-600 uppercase px-2 py-1 bg-blue-50 rounded">
                {snip.emoji} {snip.lang}
              </span>
              <button
                onClick={() => copyToClipboard(snip.code)}
                className="text-xs px-2 py-1 bg-fuchsia-100 text-fuchsia-700 rounded hover:bg-fuchsia-200"
                aria-label={`Copy ${snip.lang} snippet`}
              >
                📋 Copy
              </button>
            </div>
            <pre className="bg-gray-50 rounded p-2 text-xs font-mono overflow-x-auto">
              <code>{snip.code}</code>
            </pre>
          </li>
        ))}
      </ul>

      <div className="border-t pt-4 mt-4">
        <h3 className="text-sm font-bold text-fuchsia-600 mb-2">Add New Snippet</h3>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Language (e.g., rust, zod, deno)"
            value={newSnippet.lang}
            onChange={(e) => setNewSnippet({ ...newSnippet, lang: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-fuchsia-500"
            aria-label="Snippet language"
          />
          <textarea
            placeholder="Code snippet..."
            value={newSnippet.code}
            onChange={(e) => setNewSnippet({ ...newSnippet, code: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-fuchsia-500 font-mono text-sm"
            rows={3}
            aria-label="Snippet code"
          />
          <button 
            onClick={addSnippet}
            className="w-full px-4 py-2 bg-fuchsia-600 text-white rounded font-bold hover:bg-fuchsia-700 focus:outline-fuchsia-500"
          >
            ➕ Add Snippet
          </button>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 italic">
        💡 Drag snippets to use them, customize themes, and export to SaaS templates
      </div>
    </section>
  );
}
