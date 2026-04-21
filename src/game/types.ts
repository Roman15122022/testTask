export interface Vector2 {
  x: number;
  y: number;
}

export interface WorldBounds {
  width: number;
  height: number;
}

export interface RectangleBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type AnimalState = 'idle' | 'following' | 'delivered';
export type GameStatus = 'menu' | 'running' | 'stopped';

export interface SpawnObstacle {
  position: Vector2;
  radius: number;
}
