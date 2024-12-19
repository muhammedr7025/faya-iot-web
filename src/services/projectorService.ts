import { ref, set, onValue, get, DatabaseReference } from 'firebase/database';
import { db } from './firebase';
import { MovementDirection, ProjectorState } from '../types/projector';

const MOVEMENT_REF = 'movement';
const STATUS_REF = 'status/status';

const getRef = (path: string): DatabaseReference => {
  try {
    return ref(db, path);
  } catch (error) {
    console.error('Failed to get database reference:', error);
    throw error;
  }
};

const handleDatabaseError = (error: unknown, operation: string) => {
  console.error(`Firebase ${operation} failed:`, error);
  throw error;
};

export const projectorService = {
  subscribeToState: (callback: (state: ProjectorState) => void) => {
    try {
      // Subscribe to movement state
      const movementRef = getRef(MOVEMENT_REF);
      const statusRef = getRef(STATUS_REF);
      
      // Combine both subscriptions
      const unsubscribeMovement = onValue(movementRef, (movementSnapshot) => {
        const movementData = movementSnapshot.val() || { up: false, down: false };
        
        onValue(statusRef, (statusSnapshot) => {
          const isOnline = statusSnapshot.val() || false;
          
          let movement: MovementDirection = 'stopped';
          if (movementData.up) movement = 'up';
          if (movementData.down) movement = 'down';
          
          callback({
            isOnline,
            movement,
            lastUpdated: Date.now()
          });
        });
      });
      
      return unsubscribeMovement;
    } catch (error) {
      handleDatabaseError(error, 'subscription setup');
    }
  },

  updateMovement: async (direction: MovementDirection) => {
    try {
      const movementRef = getRef(MOVEMENT_REF);
      
      const movementState = {
        up: direction === 'up',
        down: direction === 'down'
      };
      
      await set(movementRef, movementState);
    } catch (error) {
      handleDatabaseError(error, 'movement update');
    }
  },

  checkStatus: async () => {
    try {
      const statusRef = getRef(STATUS_REF);
      // Set status to false when button is clicked
      await set(statusRef, false);
    } catch (error) {
      handleDatabaseError(error, 'status check');
    }
  }
};