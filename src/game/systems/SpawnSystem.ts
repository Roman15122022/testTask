import {
  ANIMAL_RADIUS,
  FIELD_BOUNDS,
  HERO_RADIUS,
  MAX_ACTIVE_ANIMALS,
  MIN_ENTITY_GAP,
  SPAWN_INTERVAL_SECONDS,
  SPAWN_PADDING,
} from '@/game/config';
import { Animal } from '@/game/entities/Animal';
import { randomFloat } from '@/game/logic/random';
import { generateSpawnPosition } from '@/game/logic/spawn';
import type { RectangleBounds, Vector2 } from '@/game/types';

interface SpawnSystemOptions {
  yardBounds: RectangleBounds;
  onSpawn: (position: Vector2) => void;
  rng?: () => number;
}

export class SpawnSystem {
  private spawnInSeconds: number;
  private readonly rng: () => number;

  constructor(private readonly options: SpawnSystemOptions) {
    this.rng = options.rng ?? Math.random;
    this.spawnInSeconds = this.nextInterval();
  }

  update(deltaSeconds: number, heroPosition: Vector2, animals: Animal[]): void {
    if (animals.length >= MAX_ACTIVE_ANIMALS) {
      return;
    }

    this.spawnInSeconds -= deltaSeconds;

    if (this.spawnInSeconds > 0) {
      return;
    }

    const position = generateSpawnPosition({
      fieldWidth: FIELD_BOUNDS.width,
      fieldHeight: FIELD_BOUNDS.height,
      radius: ANIMAL_RADIUS,
      yardBounds: this.options.yardBounds,
      obstacles: [
        { position: heroPosition, radius: HERO_RADIUS },
        ...animals.map((animal) => ({
          position: animal.position,
          radius: animal.radius,
        })),
      ],
      minGap: MIN_ENTITY_GAP,
      padding: SPAWN_PADDING,
      rng: this.rng,
    });

    if (position) {
      this.options.onSpawn(position);
    }

    this.spawnInSeconds = this.nextInterval();
  }

  private nextInterval(): number {
    return randomFloat(SPAWN_INTERVAL_SECONDS.min, SPAWN_INTERVAL_SECONDS.max, this.rng);
  }
}
