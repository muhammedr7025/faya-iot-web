import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ControlButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const ControlButton: React.FC<ControlButtonProps> = ({
  icon: Icon,
  label,
  isActive,
  onClick
}) => (
  <button
    onClick={onClick}
    className={`p-6 rounded-lg flex flex-col items-center justify-center transition-all
      ${isActive 
        ? 'bg-blue-600 text-white' 
        : 'bg-gray-700 text-gray-200 hover:bg-gray-600'}`}
  >
    <Icon size={32} />
    <span className="mt-2">{label}</span>
  </button>
);