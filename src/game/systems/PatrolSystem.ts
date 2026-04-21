import { FIELD_BOUNDS, MIN_ENTITY_GAP, PATROL_INTERVAL_SECONDS, PATROL_SPEED } from '../config';
import { Animal } from '../entities/Animal';
import { generateSpawnPosition } from '../logic/spawn';
import { randomFloat } from '../logic/random';
import { distance, moveTowards } from '../logic/vector';
import type { RectangleBounds } from '../types';

export class PatrolSystem {
  constructor(
    private readonly yardBounds: RectangleBounds,
    private readonly rng: () => number = Math.random,
  ) {}

  update(animals: Animal[], deltaSeconds: number): void {
    for (const animal of animals) {
      if (animal.state !== 'idle') {
        continue;
      }

      animal.patrolCooldown -= deltaSeconds;

      const shouldPickNextTarget =
        !animal.patrolTarget ||
        distance(animal.position, animal.patrolTarget) < 8 ||
        animal.patrolCooldown <= 0;

      if (shouldPickNextTarget) {
        animal.patrolTarget = this.createPatrolTarget(animal);
        animal.patrolCooldown = randomFloat(
          PATROL_INTERVAL_SECONDS.min,
          PATROL_INTERVAL_SECONDS.max,
          this.rng,
        );
      }

      if (!animal.patrolTarget) {
        continue;
      }

      animal.setPosition(
        moveTowards(animal.position, animal.patrolTarget, PATROL_SPEED * deltaSeconds),
      );
    }
  }

  private createPatrolTarget(animal: Animal) {
    return (
      generateSpawnPosition({
        fieldWidth: FIELD_BOUNDS.width,
        fieldHeight: FIELD_BOUNDS.height,
        radius: animal.radius,
        yardBounds: this.yardBounds,
        obstacles: [],
        minGap: MIN_ENTITY_GAP,
        padding: 24,
        attempts: 20,
        rng: this.rng,
      }) ?? { ...animal.position }
    );
  }
}
