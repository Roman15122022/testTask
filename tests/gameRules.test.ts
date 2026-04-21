import { describe, expect, it } from 'vitest';

import { YARD_BOUNDS } from '@/game/config';
import {
  canAddAnimalToHerd,
  canAnimalJoinHerd,
  hasReachedYard,
  isValidSpawnPosition,
} from '@/game/logic/gameRules';
import { generateSpawnPosition } from '@/game/logic/spawn';

describe('gameRules', () => {
  it('enforces the herd cap', () => {
    expect(canAddAnimalToHerd(4, 5)).toBe(true);
    expect(canAddAnimalToHerd(5, 5)).toBe(false);
  });

  it('captures animals only inside the allowed radius', () => {
    expect(canAnimalJoinHerd({ x: 0, y: 0 }, { x: 25, y: 20 }, 40)).toBe(true);
    expect(canAnimalJoinHerd({ x: 0, y: 0 }, { x: 45, y: 0 }, 40)).toBe(false);
  });

  it('detects deliveries once a follower reaches the yard', () => {
    expect(hasReachedYard({ x: YARD_BOUNDS.x + 8, y: YARD_BOUNDS.y + 8 }, YARD_BOUNDS)).toBe(true);
    expect(hasReachedYard({ x: YARD_BOUNDS.x - 20, y: YARD_BOUNDS.y - 20 }, YARD_BOUNDS)).toBe(false);
  });

  it('rejects invalid spawn points that overlap the yard or other entities', () => {
    expect(
      isValidSpawnPosition(
        { x: YARD_BOUNDS.x + 10, y: YARD_BOUNDS.y + 10 },
        12,
        960,
        640,
        YARD_BOUNDS,
        [],
        18,
      ),
    ).toBe(false);

    expect(
      isValidSpawnPosition(
        { x: 120, y: 120 },
        12,
        960,
        640,
        YARD_BOUNDS,
        [{ position: { x: 130, y: 120 }, radius: 18 }],
        18,
      ),
    ).toBe(false);
  });

  it('generates a valid spawn position when a deterministic RNG is provided', () => {
    const sequence = [0.1, 0.9, 0.55, 0.35];
    let index = 0;

    const spawn = generateSpawnPosition({
      fieldWidth: 960,
      fieldHeight: 640,
      radius: 12,
      yardBounds: YARD_BOUNDS,
      obstacles: [{ position: { x: 110, y: 110 }, radius: 18 }],
      minGap: 18,
      padding: 24,
      rng: () => {
        const value = sequence[index % sequence.length];
        index += 1;
        return value;
      },
    });

    expect(spawn).not.toBeNull();
    expect(
      isValidSpawnPosition(spawn!, 12, 960, 640, YARD_BOUNDS, [{ position: { x: 110, y: 110 }, radius: 18 }], 18),
    ).toBe(true);
  });
});
