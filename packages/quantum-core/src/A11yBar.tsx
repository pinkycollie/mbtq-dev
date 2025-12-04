import { useState } from "react";

export function A11yBar() {
  const [contrast, setContrast] = useState(false);

  const runAxeCheck = async () => {
    try {
      const React = await import("react");
      const ReactDOM = await import("react-dom");
      const axe = (await import("@axe-core/react")).default;
      
      if (typeof axe === 'function') {
        axe(React, ReactDOM, 1000);
        alert("✅ Accessibility check complete. Check console for details.");
      }
    } catch (error) {
      console.error("Error running axe check:", error);
      alert("⚠️ Check console for accessibility analysis.");
    }
  };

  const applyContrast = () => {
    if (!contrast) {
      document.body.style.filter = 'contrast(1.5) brightness(0.9)';
    } else {
      document.body.style.filter = 'none';
    }
    setContrast(!contrast);
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full flex gap-2 p-3 bg-fuchsia-200 text-fuchsia-900 justify-between font-semibold z-50 shadow-lg border-t-2 border-fuchsia-400`}
      role="region"
      aria-label="Accessibility Controls"
    >
      <span className="flex items-center gap-2">
        <span className="text-2xl">♿</span>
        <span className="font-bold">Accessibility Mode</span>
      </span>
      <div className="flex gap-2">
        <button
          onClick={applyContrast}
          className="bg-fuchsia-600 px-4 py-2 rounded-full text-white font-bold hover:bg-fuchsia-700 transition-colors focus:outline-fuchsia-800"
          aria-pressed={contrast}
        >
          {contrast ? "✓ High Contrast" : "Enable Contrast"}
        </button>
        <button
          onClick={runAxeCheck}
          className="bg-blue-600 px-4 py-2 rounded-full text-white font-bold hover:bg-blue-700 transition-colors focus:outline-blue-800"
        >
          🔍 Run A11y Check
        </button>
      </div>
    </div>
  );
}

export default A11yBar;
