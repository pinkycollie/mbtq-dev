import { useState } from 'react';

interface Template {
  name: string;
  code: string;
  language: string;
}

export function SaaSTemplateGen({ prompt = '' }: { prompt?: string }) {
  const [selectedTemplate, setSelectedTemplate] = useState('dashboard');
  const [customPrompt, setCustomPrompt] = useState(prompt);

  const templates: Record<string, Template> = {
    dashboard: {
      name: 'Dashboard',
      language: 'html',
      code: `<!-- SaaS Dashboard Template -->
<div class="bg-gradient-to-br from-fuchsia-50 to-blue-50 min-h-screen p-8">
  <header class="mb-8">
    <h1 class="text-4xl font-bold text-fuchsia-700">📊 Dashboard</h1>
    <p class="text-gray-600">Welcome back, quantum developer!</p>
  </header>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div class="bg-white rounded-lg p-6 shadow-lg border-2 border-fuchsia-200">
      <h3 class="text-xl font-bold text-fuchsia-600">Users</h3>
      <p class="text-4xl font-bold text-blue-700 mt-2">1,247</p>
      <p class="text-sm text-gray-500 mt-1">↑ 12% this month</p>
    </div>
    <div class="bg-white rounded-lg p-6 shadow-lg border-2 border-blue-200">
      <h3 class="text-xl font-bold text-blue-600">Revenue</h3>
      <p class="text-4xl font-bold text-fuchsia-700 mt-2">$24.5K</p>
      <p class="text-sm text-gray-500 mt-1">↑ 8% this month</p>
    </div>
    <div class="bg-white rounded-lg p-6 shadow-lg border-2 border-green-200">
      <h3 class="text-xl font-bold text-green-600">Active</h3>
      <p class="text-4xl font-bold text-green-700 mt-2">892</p>
      <p class="text-sm text-gray-500 mt-1">Online now</p>
    </div>
  </div>
  
  <div class="bg-white rounded-lg p-6 shadow-lg">
    <h2 class="text-2xl font-bold text-fuchsia-700 mb-4">Recent Activity</h2>
    <table class="w-full">
      <thead>
        <tr class="border-b-2 border-fuchsia-200">
          <th class="text-left py-2">User</th>
          <th class="text-left py-2">Action</th>
          <th class="text-left py-2">Time</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b border-gray-200">
          <td class="py-2">john@example.com</td>
          <td class="py-2">Created project</td>
          <td class="py-2">2 mins ago</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`
    },
    auth: {
      name: 'Authentication',
      language: 'html',
      code: `<!-- SaaS Authentication Template -->
<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-fuchsia-100 to-blue-50 p-4">
  <div class="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md border-2 border-fuchsia-300">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-fuchsia-700">🌈 mbtq.dev</h1>
      <p class="text-gray-600 mt-2">Sign in to your quantum workspace</p>
    </div>
    
    <form class="space-y-4">
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Email</label>
        <input 
          type="email" 
          placeholder="your@email.com"
          class="w-full px-4 py-3 border-2 border-fuchsia-200 rounded-lg focus:outline-none focus:border-fuchsia-500"
        />
      </div>
      
      <div>
        <label class="block text-sm font-bold text-gray-700 mb-2">Password</label>
        <input 
          type="password" 
          placeholder="••••••••"
          class="w-full px-4 py-3 border-2 border-fuchsia-200 rounded-lg focus:outline-none focus:border-fuchsia-500"
        />
      </div>
      
      <button 
        type="submit"
        class="w-full py-3 bg-fuchsia-600 text-white font-bold rounded-lg hover:bg-fuchsia-700 transition-colors"
      >
        Sign In ✨
      </button>
    </form>
    
    <div class="mt-6 text-center">
      <a href="#" class="text-sm text-fuchsia-600 hover:text-fuchsia-700">Forgot password?</a>
      <p class="text-sm text-gray-600 mt-4">Don't have an account? <a href="#" class="text-fuchsia-600 font-bold">Sign up</a></p>
    </div>
    
    <div class="mt-6 pt-6 border-t border-gray-200">
      <p class="text-xs text-gray-500 text-center">♿ Accessible • 🏳️‍🌈 Inclusive • ✨ Quantum</p>
    </div>
  </div>
</div>`
    },
    landing: {
      name: 'Landing Page',
      language: 'html',
      code: `<!-- SaaS Landing Page Template -->
<div class="min-h-screen bg-gradient-to-br from-fuchsia-100 via-blue-50 to-pink-50">
  <nav class="p-6 flex justify-between items-center">
    <div class="text-2xl font-bold text-fuchsia-700">🌈 QuantumSaaS</div>
    <div class="flex gap-4">
      <a href="#" class="px-4 py-2 text-fuchsia-700 font-semibold hover:text-fuchsia-800">Features</a>
      <a href="#" class="px-4 py-2 text-fuchsia-700 font-semibold hover:text-fuchsia-800">Pricing</a>
      <button class="px-6 py-2 bg-fuchsia-600 text-white font-bold rounded-full hover:bg-fuchsia-700">
        Get Started
      </button>
    </div>
  </nav>
  
  <section class="text-center py-20 px-4">
    <h1 class="text-6xl font-bold text-fuchsia-700 mb-6">
      Build Quantum-Powered<br/>SaaS Applications
    </h1>
    <p class="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
      The most inclusive, accessible, and powerful development platform for modern creators
    </p>
    <div class="flex gap-4 justify-center">
      <button class="px-8 py-4 bg-fuchsia-600 text-white text-lg font-bold rounded-full hover:bg-fuchsia-700">
        Start Free Trial ✨
      </button>
      <button class="px-8 py-4 bg-white text-fuchsia-700 text-lg font-bold rounded-full border-2 border-fuchsia-600 hover:bg-fuchsia-50">
        Watch Demo
      </button>
    </div>
  </section>
  
  <section class="py-20 px-4 bg-white">
    <h2 class="text-4xl font-bold text-center text-fuchsia-700 mb-12">Features</h2>
    <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <div class="p-6 border-2 border-fuchsia-200 rounded-lg">
        <div class="text-4xl mb-4">🤖</div>
        <h3 class="text-xl font-bold text-fuchsia-700 mb-2">AI-Powered</h3>
        <p class="text-gray-600">Intelligent codegen and automation</p>
      </div>
      <div class="p-6 border-2 border-blue-200 rounded-lg">
        <div class="text-4xl mb-4">♿</div>
        <h3 class="text-xl font-bold text-blue-700 mb-2">Accessible First</h3>
        <p class="text-gray-600">WCAG compliant by default</p>
      </div>
      <div class="p-6 border-2 border-pink-200 rounded-lg">
        <div class="text-4xl mb-4">🔄</div>
        <h3 class="text-xl font-bold text-pink-700 mb-2">Real-time Sync</h3>
        <p class="text-gray-600">Collaborate instantly</p>
      </div>
    </div>
  </section>
  
  <footer class="py-12 px-4 bg-fuchsia-900 text-white text-center">
    <p class="text-lg font-bold">mbtq.dev © 2025 • Community. Culture. Power.</p>
  </footer>
</div>`
    },
    api: {
      name: 'REST API (TypeScript)',
      language: 'typescript',
      code: `// SaaS REST API Template with Zod validation
import { z } from 'zod';

// Zod schemas for type safety
const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(2),
  role: z.enum(['admin', 'user', 'guest']),
  createdAt: z.date()
});

const CreateUserSchema = UserSchema.omit({ id: true, createdAt: true });

type User = z.infer<typeof UserSchema>;
type CreateUser = z.infer<typeof CreateUserSchema>;

// API Routes
export const routes = {
  // GET /api/users
  getUsers: async () => {
    const users: User[] = [/* fetch from DB */];
    return { success: true, data: users };
  },
  
  // POST /api/users
  createUser: async (body: unknown) => {
    const validated = CreateUserSchema.parse(body);
    const newUser: User = {
      id: crypto.randomUUID(),
      ...validated,
      createdAt: new Date()
    };
    // Save to DB
    return { success: true, data: newUser };
  },
  
  // GET /api/users/:id
  getUser: async (id: string) => {
    const user: User | null = null; // fetch from DB
    if (!user) throw new Error('User not found');
    return { success: true, data: user };
  }
};

// ✨ Ready for Deno, Node.js, or Bun!`
    }
  };

  const generateTemplate = () => {
    const template = templates[selectedTemplate];
    return template;
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('Template copied to clipboard! ✨');
  };

  const downloadTemplate = (template: Template) => {
    const extension = template.language === 'typescript' ? 'ts' : 'html';
    const blob = new Blob([template.code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentTemplate = generateTemplate();

  return (
    <section className="rounded-lg bg-gradient-to-br from-yellow-50 to-orange-50 p-6 shadow-lg mt-4 border-2 border-yellow-300">
      <h2 className="text-2xl font-bold text-yellow-700 mb-4 flex items-center gap-2">
        🏗️ SaaS Template Generator
      </h2>
      
      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Select Template Type:
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(templates).map(([key, template]) => (
            <button
              key={key}
              onClick={() => setSelectedTemplate(key)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                selectedTemplate === key
                  ? 'bg-yellow-600 text-white'
                  : 'bg-white text-yellow-700 border-2 border-yellow-300 hover:bg-yellow-100'
              }`}
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-700 mb-2">
          Or describe your custom template:
        </label>
        <textarea
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          className="w-full px-4 py-3 border-2 border-yellow-300 rounded-lg focus:outline-none focus:border-yellow-500"
          placeholder="E.g., 'Create a user profile page with settings'"
          rows={2}
        />
      </div>

      <div className="bg-white rounded-lg p-4 border-2 border-yellow-300">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-yellow-700">
            Generated: {currentTemplate.name}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => copyCode(currentTemplate.code)}
              className="px-3 py-1 bg-yellow-600 text-white rounded text-sm font-bold hover:bg-yellow-700"
            >
              📋 Copy
            </button>
            <button
              onClick={() => downloadTemplate(currentTemplate)}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm font-bold hover:bg-blue-700"
            >
              💾 Download
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded p-4 overflow-x-auto">
          <pre className="text-xs font-mono">
            <code>{currentTemplate.code}</code>
          </pre>
        </div>
      </div>

      <div className="mt-4 p-4 bg-yellow-100 rounded-lg border border-yellow-300">
        <p className="text-sm text-yellow-800">
          <strong>💡 Pro Tip:</strong> In production, connect to AI agents (OpenAI, Claude, Gemini) 
          for intelligent template generation based on natural language prompts. Export to Zod schemas, 
          Rust structs, or Deno modules!
        </p>
      </div>
    </section>
  );
}
