import { useState, useEffect } from 'react';
import { ProjectorState } from '../types/projector';
import { projectorService } from '../services/projectorService';

export const useProjectorState = () => {
  const [state, setState] = useState<ProjectorState>({
    isOnline: false,
    movement: 'stopped',
    lastUpdated: Date.now()
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    try {
      unsubscribe = projectorService.subscribeToState(setState);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to projector service');
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  return { state, error, setError };
};