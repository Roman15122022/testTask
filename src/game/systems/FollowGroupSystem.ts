import { FOLLOW_SPACING, FOLLOW_SPEED } from '../config';
import { Hero } from '../entities/Hero';
import { Animal } from '../entities/Animal';
import { distance } from '../logic/vector';

export class FollowGroupSystem {
  update(hero: Hero, animals: Animal[], deltaSeconds: number): void {
    let leaderPosition = hero.position;

    for (const animal of animals) {
      const gap = distance(animal.position, leaderPosition);

      if (gap > FOLLOW_SPACING) {
        const closableDistance = Math.min(FOLLOW_SPEED * deltaSeconds, gap - FOLLOW_SPACING);
        const step = closableDistance / gap;

        animal.setPosition({
          x: animal.position.x + (leaderPosition.x - animal.position.x) * step,
          y: animal.position.y + (leaderPosition.y - animal.position.y) * step,
        });
      }

      leaderPosition = animal.position;
    }
  }
}
