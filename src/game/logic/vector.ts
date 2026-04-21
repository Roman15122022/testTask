import type { Vector2 } from '../types';

export const distance = (a: Vector2, b: Vector2): number => {
  const dx = a.x - b.x;
  const dy = a.y - b.y;

  return Math.hypot(dx, dy);
};

export const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

export const moveTowards = (origin: Vector2, target: Vector2, maxDistance: number): Vector2 => {
  const remaining = distance(origin, target);

  if (remaining === 0 || remaining <= maxDistance) {
    return { ...target };
  }

  const step = maxDistance / remaining;

  return {
    x: origin.x + (target.x - origin.x) * step,
    y: origin.y + (target.y - origin.y) * step,
  };
};
