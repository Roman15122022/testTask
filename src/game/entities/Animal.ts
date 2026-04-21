import { Graphics } from 'pixi.js';

import { ANIMAL_RADIUS } from '@/game/config';
import type { AnimalState, Vector2 } from '@/game/types';

export class Animal {
  readonly id: number;
  readonly radius = ANIMAL_RADIUS;
  readonly view: Graphics;

  position: Vector2;
  state: AnimalState = 'idle';
  patrolTarget: Vector2 | null = null;
  patrolCooldown = 0;

  constructor(id: number, initialPosition: Vector2) {
    this.id = id;
    this.position = { ...initialPosition };
    this.view = new Graphics();

    this.redraw();
    this.syncView();
  }

  setState(state: AnimalState): void {
    this.state = state;
    this.redraw();
  }

  setPosition(position: Vector2): void {
    this.position = { ...position };
    this.syncView();
  }

  destroy(): void {
    this.view.destroy();
  }

  private redraw(): void {
    this.view.clear();

    const fillColor = this.state === 'following' ? 0xf8fbff : 0xffffff;
    const outlineColor = this.state === 'following' ? 0x7aa2ff : 0xd5dde8;

    this.view.beginFill(fillColor);
    this.view.drawCircle(0, 0, this.radius);
    this.view.endFill();
    this.view.lineStyle(2, outlineColor, 1);
    this.view.drawCircle(0, 0, this.radius);
  }

  private syncView(): void {
    this.view.position.set(this.position.x, this.position.y);
  }
}
