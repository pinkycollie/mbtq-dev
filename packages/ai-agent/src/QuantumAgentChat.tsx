import { useState, useRef, useEffect } from 'react';

interface Message {
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export function QuantumAgentChat() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      sender: 'ai', 
      text: '👋 Hello! I\'m your Quantum AI Agent. I can help you with:\n\n• Generate SaaS templates\n• Create Zod schemas\n• Write Rust, Deno, or TypeScript code\n• Refactor existing code\n• Terminal automation\n• Accessibility improvements\n\nWhat would you like to build today?', 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      sender: 'user',
      text: content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing with intelligent responses
    setTimeout(() => {
      let aiResponse = '';
      const lowerContent = content.toLowerCase();

      if (lowerContent.includes('saas') || lowerContent.includes('template')) {
        aiResponse = `🎨 Generating SaaS template based on your needs...\n\nI can create:\n• Dashboard with analytics\n• User authentication flow\n• Billing integration\n• Admin panel\n• API endpoints\n\nWould you like a specific template? Just describe your use case!`;
      } else if (lowerContent.includes('zod') || lowerContent.includes('schema')) {
        aiResponse = `🔷 Here's a Zod schema example:\n\n\`\`\`typescript\nimport { z } from 'zod';\n\nconst UserSchema = z.object({\n  name: z.string().min(2),\n  email: z.string().email(),\n  age: z.number().positive().optional(),\n  role: z.enum(['admin', 'user', 'guest'])\n});\n\ntype User = z.infer<typeof UserSchema>;\n\`\`\`\n\nNeed a different schema?`;
      } else if (lowerContent.includes('rust')) {
        aiResponse = `🦀 Rust code generation:\n\n\`\`\`rust\nuse actix_web::{get, web, App, HttpServer, Responder};\n\n#[get("/api/quantum")]\nasync fn quantum_handler() -> impl Responder {\n    web::Json(serde_json::json!({\n        "status": "quantum_ready",\n        "power": 9001\n    }))\n}\n\n#[actix_web::main]\nasync fn main() -> std::io::Result<()> {\n    HttpServer::new(|| {\n        App::new().service(quantum_handler)\n    })\n    .bind(("127.0.0.1", 8080))?\n    .run()\n    .await\n}\n\`\`\``;
      } else if (lowerContent.includes('deno')) {
        aiResponse = `🦕 Deno example:\n\n\`\`\`typescript\n// main.ts\nimport { serve } from "https://deno.land/std/http/server.ts";\n\nserve((req) => {\n  return new Response("🌈 Quantum Deno Server!", {\n    headers: { "content-type": "text/plain" },\n  });\n}, { port: 8000 });\n\`\`\`\n\nRun with: \`deno run --allow-net main.ts\``;
      } else if (lowerContent.includes('terminal') || lowerContent.includes('command')) {
        aiResponse = `🖥️ I can help with terminal automation! Here are some quantum commands:\n\n• \`quantum build\` - Build with optimization\n• \`quantum test\` - Run comprehensive tests\n• \`quantum deploy\` - Deploy to production\n• \`quantum agent\` - Start AI assistance mode\n\nWhat terminal task do you need help with?`;
      } else if (lowerContent.includes('accessibility') || lowerContent.includes('a11y')) {
        aiResponse = `♿ Accessibility is our priority! I can help with:\n\n• ARIA labels and roles\n• Keyboard navigation\n• Screen reader optimization\n• Color contrast checking\n• Semantic HTML structure\n• Focus management\n\nWhat accessibility feature would you like to implement?`;
      } else {
        aiResponse = `🤖 Quantum Agent analyzing: "${content}"\n\nI'm ready to generate code, templates, or provide guidance. Here are some things I excel at:\n\n• Full-stack SaaS development\n• Type-safe APIs with Zod\n• Rust/Deno/TypeScript codebases\n• Accessibility-first design\n• Real-time features\n\nCan you provide more details about what you'd like to build?`;
      }

      const aiMessage: Message = {
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const quickActions = [
    { label: 'Dashboard Template', prompt: 'Generate a SaaS dashboard template' },
    { label: 'Zod Schema', prompt: 'Create a Zod schema for user authentication' },
    { label: 'Rust API', prompt: 'Generate a Rust REST API with Actix-web' },
    { label: 'A11y Check', prompt: 'How do I improve accessibility in my app?' }
  ];

  return (
    <section 
      className="rounded-lg bg-gradient-to-br from-fuchsia-50 to-blue-50 p-5 shadow-lg mb-4 border-2 border-fuchsia-300 flex flex-col"
      aria-label="AI Quantum Agent Chat"
      style={{ maxHeight: '600px' }}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-fuchsia-200">
        <h2 className="text-2xl font-bold text-fuchsia-700 flex items-center gap-2">
          🤖 Quantum Agent
        </h2>
        <div className="flex gap-1">
          <span className="h-3 w-3 rounded-full bg-green-500 animate-pulse" title="Online"></span>
          <span className="text-xs text-gray-600 font-semibold">Ready</span>
        </div>
      </div>

      <div className="flex gap-2 mb-3 flex-wrap">
        {quickActions.map((action, idx) => (
          <button
            key={idx}
            onClick={() => sendMessage(action.prompt)}
            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold hover:bg-blue-200 transition-colors"
          >
            {action.label}
          </button>
        ))}
      </div>

      <div 
        className="flex-1 overflow-y-auto mb-4 space-y-3 pr-2"
        style={{ minHeight: '300px', maxHeight: '400px' }}
      >
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.sender === 'ai' 
                  ? 'bg-white border border-blue-200 text-blue-900' 
                  : 'bg-fuchsia-600 text-white'
              }`}
            >
              <div className="text-xs font-bold mb-1 opacity-70">
                {msg.sender === 'ai' ? '🤖 AI' : '👤 You'}
              </div>
              <div className="text-sm whitespace-pre-wrap">{msg.text}</div>
              <div className="text-xs opacity-50 mt-1">
                {msg.timestamp.toLocaleTimeString()}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-blue-200 rounded-lg p-3 text-blue-900">
              <div className="text-xs font-bold mb-1 opacity-70">🤖 AI</div>
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="border-t-2 border-fuchsia-200 pt-3">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 rounded-lg border-2 border-fuchsia-300 p-3 focus:outline-none focus:border-fuchsia-500 resize-none"
            placeholder="Ask for SaaS templates, Zod schemas, Rust/Deno code, terminal help, or anything else..."
            rows={2}
            aria-label="Chat input"
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}
            className="px-6 py-2 bg-fuchsia-600 text-white rounded-lg font-bold hover:bg-fuchsia-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send ✨
          </button>
        </div>
        <div className="text-xs text-gray-500 mt-2 italic">
          💡 Framework-agnostic • Ready for OpenAI, Claude, Gemini, or local Rust/Deno agents
        </div>
      </div>
    </section>
  );
}
