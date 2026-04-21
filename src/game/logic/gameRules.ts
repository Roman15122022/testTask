import type { RectangleBounds, SpawnObstacle, Vector2 } from '../types';
import { distance } from './vector';

export const canAddAnimalToHerd = (herdSize: number, herdCap: number): boolean =>
  herdSize < herdCap;

export const canAnimalJoinHerd = (
  heroPosition: Vector2,
  animalPosition: Vector2,
  captureRadius: number,
): boolean => distance(heroPosition, animalPosition) <= captureRadius;

export const hasReachedYard = (
  position: Vector2,
  yardBounds: RectangleBounds,
  margin = 0,
): boolean =>
  position.x >= yardBounds.x - margin &&
  position.x <= yardBounds.x + yardBounds.width + margin &&
  position.y >= yardBounds.y - margin &&
  position.y <= yardBounds.y + yardBounds.height + margin;

export const circleIntersectsRectangle = (
  position: Vector2,
  radius: number,
  bounds: RectangleBounds,
): boolean => {
  const nearestX = Math.max(bounds.x, Math.min(position.x, bounds.x + bounds.width));
  const nearestY = Math.max(bounds.y, Math.min(position.y, bounds.y + bounds.height));

  return distance(position, { x: nearestX, y: nearestY }) <= radius;
};

export const isValidSpawnPosition = (
  position: Vector2,
  radius: number,
  fieldWidth: number,
  fieldHeight: number,
  yardBounds: RectangleBounds,
  obstacles: SpawnObstacle[],
  minGap: number,
): boolean => {
  if (
    position.x - radius < 0 ||
    position.x + radius > fieldWidth ||
    position.y - radius < 0 ||
    position.y + radius > fieldHeight
  ) {
    return false;
  }

  if (circleIntersectsRectangle(position, radius + minGap, yardBounds)) {
    return false;
  }

  return obstacles.every(
    (obstacle) => distance(position, obstacle.position) >= radius + obstacle.radius + minGap,
  );
};
