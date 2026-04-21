import { Graphics } from 'pixi.js';

import { HERO_RADIUS, HERO_SPEED } from '../config';
import type { Vector2 } from '../types';
import { clamp, moveTowards } from '../logic/vector';

export class Hero {
  readonly radius = HERO_RADIUS;
  readonly view: Graphics;

  position: Vector2;
  private target: Vector2;

  constructor(initialPosition: Vector2) {
    this.position = { ...initialPosition };
    this.target = { ...initialPosition };
    this.view = new Graphics();

    this.draw();
    this.syncView();
  }

  setTarget(position: Vector2, maxWidth: number, maxHeight: number): void {
    this.target = {
      x: clamp(position.x, this.radius, maxWidth - this.radius),
      y: clamp(position.y, this.radius, maxHeight - this.radius),
    };
  }

  update(deltaSeconds: number): void {
    this.position = moveTowards(this.position, this.target, HERO_SPEED * deltaSeconds);
    this.syncView();
  }

  private draw(): void {
    this.view.clear();
    this.view.beginFill(0xcf3b2e);
    this.view.drawCircle(0, 0, this.radius);
    this.view.endFill();
    this.view.lineStyle(3, 0xfff5f5, 0.45);
    this.view.drawCircle(0, 0, this.radius + 1.5);
  }

  private syncView(): void {
    this.view.position.set(this.position.x, this.position.y);
  }
}
