import React from 'react';
import { Power } from 'lucide-react';

interface StatusCheckButtonProps {
  onClick: () => void;
}

export const StatusCheckButton: React.FC<StatusCheckButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full p-4 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg flex items-center justify-center gap-2 transition-all"
  >
    <Power size={20} />
    <span>Check Device Status</span>
  </button>
);