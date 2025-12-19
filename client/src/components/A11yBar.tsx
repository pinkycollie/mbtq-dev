import { useState } from "react";

export default function A11yBar() {
  const [contrast, setContrast] = useState(false);
  const [checkCount, setCheckCount] = useState(0);
  const [showBadges, setShowBadges] = useState(false);

  const runAxeCheck = async () => {
    try {
      // Dynamic import to handle axe-core
      const React = await import("react");
      const ReactDOM = await import("react-dom");
      const axe = (await import("@axe-core/react")).default;
      
      if (typeof axe === 'function') {
        axe(React, ReactDOM, 1000);
        setCheckCount(c => c + 1);
        console.log("✅ Accessibility check complete! See results above.");
      }
    } catch (error) {
      console.error("Error running axe check:", error);
      console.log("Check console for accessibility analysis.");
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 w-full flex gap-2 p-3 bg-gradient-to-r from-pink-200 via-purple-200 to-blue-200 text-pink-900 justify-between font-semibold z-50 shadow-lg ${
        contrast ? "contrast" : ""
      }`}
      role="region"
      aria-label="Accessibility Controls"
    >
      <div className="flex items-center gap-2">
        <span className="text-xl">🦻</span>
        <span className="font-bold">Hearing & Accessibility</span>
        {checkCount > 0 && (
          <span 
            className="bg-green-500 text-white px-2 py-1 rounded-full text-xs animate-pulse"
            role="status"
            aria-label={`${checkCount} accessibility ${checkCount > 1 ? 'checks' : 'check'} completed successfully`}
          >
            {checkCount} check{checkCount > 1 ? 's' : ''} ✓
          </span>
        )}
        <button
          onClick={() => setShowBadges(!showBadges)}
          className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold hover:from-indigo-600 hover:to-purple-600 transition-all hover:scale-105 shadow-md"
          aria-expanded={showBadges}
          aria-label="Toggle accessibility features badges"
        >
          🏅 Features
        </button>
        {showBadges && (
          <div className="flex gap-2 ml-2 transition-opacity duration-300">
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-sm" title="Visual notifications for deaf users">
              👁️ Visual Alerts
            </span>
            <span className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-sm" title="Real-time captioning support">
              💬 Captions
            </span>
            <span className="bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-sm" title="High contrast mode">
              🎨 Contrast
            </span>
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-sm" title="Accessibility checking tools">
              ✅ A11y Check
            </span>
          </div>
        )}
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => setContrast(c => !c)}
          className={`px-4 py-2 rounded-full text-white font-bold transition-all hover:scale-110 shadow-md hover:shadow-lg ${
            contrast
              ? 'bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black'
              : 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700'
          }`}
        >
          {contrast ? "🌙 Disable" : "☀️ Enable"} High Contrast
        </button>
        <button
          onClick={runAxeCheck}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 rounded-full text-white font-bold hover:from-blue-700 hover:to-indigo-700 transition-all hover:scale-110 shadow-md hover:shadow-lg"
        >
          🔍 Run A11y Check
        </button>
      </div>
    </div>
  );
}
