import React from 'react';

interface ConfidenceCueProps {
  confidence: number;
  type?: 'bar';
}

export const ConfidenceCue: React.FC<ConfidenceCueProps> = ({ confidence }) => {
  const getColor = () => {
    if (confidence >= 0.8) return 'bg-green-500';
    if (confidence >= 0.5) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-400">Certainty:</span>
      <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all duration-300`}
          style={{ width: `${confidence * 100}%` }}
        />
      </div>
      <span className="text-sm font-mono text-gray-300">
        {Math.round(confidence * 100)}%
      </span>
    </div>
  );
};
