import { FIELD_BOUNDS, MIN_ENTITY_GAP, PATROL_INTERVAL_SECONDS, PATROL_SPEED } from '../config';
import { generateSpawnPosition } from '../logic/spawn';
import { randomFloat } from '../logic/random';
import { distance, moveTowards } from '../logic/vector';
export class PatrolSystem {
    constructor(yardBounds, rng = Math.random) {
        Object.defineProperty(this, "yardBounds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: yardBounds
        });
        Object.defineProperty(this, "rng", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: rng
        });
    }
    update(animals, deltaSeconds) {
        for (const animal of animals) {
            if (animal.state !== 'idle') {
                continue;
            }
            animal.patrolCooldown -= deltaSeconds;
            const shouldPickNextTarget = !animal.patrolTarget ||
                distance(animal.position, animal.patrolTarget) < 8 ||
                animal.patrolCooldown <= 0;
            if (shouldPickNextTarget) {
                animal.patrolTarget = this.createPatrolTarget(animal);
                animal.patrolCooldown = randomFloat(PATROL_INTERVAL_SECONDS.min, PATROL_INTERVAL_SECONDS.max, this.rng);
            }
            if (!animal.patrolTarget) {
                continue;
            }
            animal.setPosition(moveTowards(animal.position, animal.patrolTarget, PATROL_SPEED * deltaSeconds));
        }
    }
    createPatrolTarget(animal) {
        return (generateSpawnPosition({
            fieldWidth: FIELD_BOUNDS.width,
            fieldHeight: FIELD_BOUNDS.height,
            radius: animal.radius,
            yardBounds: this.yardBounds,
            obstacles: [],
            minGap: MIN_ENTITY_GAP,
            padding: 24,
            attempts: 20,
            rng: this.rng,
        }) ?? { ...animal.position });
    }
}
