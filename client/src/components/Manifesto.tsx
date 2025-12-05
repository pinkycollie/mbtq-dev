import { useState } from "react";

const MANIFESTO_ITEMS = [
  { text: "Empower Deaf, Queer, Disabled creators with world-class tools.", emoji: "💪" },
  { text: "AI must serve culture, not erase it. Every output expresses pride and care.", emoji: "🤖" },
  { text: "Design has radical inclusivity baked in: Bright. Bold. Accessible. Everybody counts.", emoji: "🎨" },
  { text: "Our code is Open—a community, not a product.", emoji: "💻" },
  { text: "If it doesn't make you smile, remix it until it does.", emoji: "😊" },
];

export default function Manifesto() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  
  return (
    <aside className="p-8 bg-gradient-to-br from-fuchsia-100 via-blue-50 to-yellow-100 rounded-xl shadow-2xl m-4 text-xl font-bold text-fuchsia-700 border-4 border-fuchsia-600 animate-[slideDown_0.5s_ease-out]">
      <h2 className="text-3xl mb-2 flex items-center gap-2">
        mbtq.dev Manifesto <span className="animate-bounce">✨</span>
      </h2>
      <ul className="list-none ml-0 mt-4 text-base text-blue-800 space-y-3">
        {MANIFESTO_ITEMS.map((item, index) => (
          <li
            key={index}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedItem === index
                ? 'bg-fuchsia-200 shadow-lg scale-105'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            onClick={() => setSelectedItem(selectedItem === index ? null : index)}
          >
            <span className="text-2xl mr-2">{item.emoji}</span>
            {item.text}
            {selectedItem === index && (
              <span className="ml-2 text-pink-600 animate-pulse">← You clicked me! 💖</span>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-6 text-center">
        <p className="text-sm text-purple-700 font-normal italic">
          Click on any item to highlight it! ✨
        </p>
      </div>
    </aside>
  );
}
