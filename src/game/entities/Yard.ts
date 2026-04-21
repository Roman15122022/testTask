import { Graphics } from 'pixi.js';

import type { RectangleBounds } from '@/game/types';

export class Yard {
  readonly bounds: RectangleBounds;
  readonly view: Graphics;

  constructor(bounds: RectangleBounds) {
    this.bounds = { ...bounds };
    this.view = new Graphics();

    this.draw();
  }

  private draw(): void {
    this.view.clear();
    this.view.beginFill(0xf2d64c);
    this.view.drawRoundedRect(
      this.bounds.x,
      this.bounds.y,
      this.bounds.width,
      this.bounds.height,
      18,
    );
    this.view.endFill();
    this.view.lineStyle(4, 0xe59f2b, 0.9);
    this.view.drawRoundedRect(
      this.bounds.x,
      this.bounds.y,
      this.bounds.width,
      this.bounds.height,
      18,
    );
  }
}
