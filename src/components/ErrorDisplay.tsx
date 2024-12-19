import React from 'react';

interface ErrorDisplayProps {
  error: string | null;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg text-sm">
      {error}
    </div>
  );
};