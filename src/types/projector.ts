export type MovementDirection = 'up' | 'down' | 'stopped';

export interface ProjectorState {
  isOnline: boolean;
  movement: MovementDirection;
  lastUpdated: number;
}