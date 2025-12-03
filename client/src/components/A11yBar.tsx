import { useState } from "react";

export default function A11yBar() {
  const [contrast, setContrast] = useState(false);

  const runAxeCheck = async () => {
    try {
      // Dynamic import to handle axe-core
      const React = await import("react");
      const ReactDOM = await import("react-dom");
      const axe = (await import("@axe-core/react")).default;
      
      if (typeof axe === 'function') {
        axe(React, ReactDOM, 1000);
        alert("Accessibility check complete. Check console for details.");
      }
    } catch (error) {
      console.error("Error running axe check:", error);
      alert("Check console for accessibility analysis.");
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full flex gap-2 p-2 bg-pink-200 text-pink-900 justify-between font-semibold z-50 ${
        contrast ? "contrast" : ""
      }`}
      role="region"
      aria-label="Accessibility Controls"
    >
      <span>♿ Accessibility Mode</span>
      <div className="flex gap-2">
        <button
          onClick={() => setContrast(c => !c)}
          className="bg-pink-600 px-3 py-1 rounded text-white font-bold hover:bg-pink-700"
        >
          {contrast ? "Disable" : "Enable"} High Contrast
        </button>
        <button
          onClick={runAxeCheck}
          className="bg-pink-600 px-3 py-1 rounded text-white font-bold hover:bg-pink-700"
        >
          Run A11y Check
        </button>
      </div>
    </div>
  );
}
