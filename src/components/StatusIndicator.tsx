import React from 'react';

interface StatusIndicatorProps {
  isOnline: boolean;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ isOnline }) => (
  <div className="flex items-center justify-between bg-gray-700 p-4 rounded-lg">
    <span className="text-gray-200">Device Status</span>
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></div>
      <span className="text-gray-200">{isOnline ? 'Online' : 'Offline'}</span>
    </div>
  </div>
);