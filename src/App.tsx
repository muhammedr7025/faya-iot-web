import React from 'react';
import { MovementDirection } from './types/projector';
import { StatusIndicator } from './components/StatusIndicator';
import { StatusCheckButton } from './components/StatusCheckButton';
import { ErrorDisplay } from './components/ErrorDisplay';
import { ProjectorControls } from './components/ProjectorControls';
import { useProjectorState } from './hooks/useProjectorState';
import { projectorService } from './services/projectorService';
import { formatError } from './utils/errorHandling';

export default function App() {
  const { state, error, setError } = useProjectorState();

  const handleMovement = async (direction: MovementDirection) => {
    try {
      setError(null);
      await projectorService.updateMovement(direction);
    } catch (err) {
      setError(formatError(err, 'Failed to update projector movement'));
    }
  };

  const handleStatusCheck = async () => {
    try {
      setError(null);
      await projectorService.checkStatus();
    } catch (err) {
      setError(formatError(err, 'Failed to check projector status'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Projector Screen Control
        </h1>
        
        <div className="space-y-6">
          <ErrorDisplay error={error} />
          <StatusIndicator isOnline={state.isOnline} />
          <ProjectorControls
            currentMovement={state.movement}
            onMovement={handleMovement}
          />
          <StatusCheckButton onClick={handleStatusCheck} />
        </div>
      </div>
    </div>
  );
}