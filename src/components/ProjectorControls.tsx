import React from 'react';
import { ArrowUp, ArrowDown, Square } from 'lucide-react';
import { ControlButton } from './ControlButton';
import { MovementDirection } from '../types/projector';

interface ProjectorControlsProps {
  currentMovement: MovementDirection;
  onMovement: (direction: MovementDirection) => void;
}

export const ProjectorControls: React.FC<ProjectorControlsProps> = ({
  currentMovement,
  onMovement
}) => (
  <div className="grid grid-cols-3 gap-4">
    <ControlButton
      icon={ArrowUp}
      label="Up"
      isActive={currentMovement === 'up'}
      onClick={() => onMovement('up')}
    />
    
    <ControlButton
      icon={Square}
      label="Stop"
      isActive={currentMovement === 'stopped'}
      onClick={() => onMovement('stopped')}
    />
    
    <ControlButton
      icon={ArrowDown}
      label="Down"
      isActive={currentMovement === 'down'}
      onClick={() => onMovement('down')}
    />
  </div>
);