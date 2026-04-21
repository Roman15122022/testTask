import { ANIMAL_RADIUS, FIELD_BOUNDS, HERO_RADIUS, MAX_ACTIVE_ANIMALS, MIN_ENTITY_GAP, SPAWN_INTERVAL_SECONDS, SPAWN_PADDING, } from '../config';
import { generateSpawnPosition } from '../logic/spawn';
import { randomFloat } from '../logic/random';
export class SpawnSystem {
    constructor(options) {
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "spawnInSeconds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "rng", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.rng = options.rng ?? Math.random;
        this.spawnInSeconds = this.nextInterval();
    }
    update(deltaSeconds, heroPosition, animals) {
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
    nextInterval() {
        return randomFloat(SPAWN_INTERVAL_SECONDS.min, SPAWN_INTERVAL_SECONDS.max, this.rng);
    }
}
