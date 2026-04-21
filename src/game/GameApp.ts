import { Application } from 'pixi.js';

import { APP_HEIGHT, APP_WIDTH } from '@/game/config';
import { GameScene } from '@/game/GameScene';

export class GameApp {
  private readonly app = new Application({
    antialias: true,
    backgroundAlpha: 0,
    width: APP_WIDTH,
    height: APP_HEIGHT,
  });

  private readonly scene = new GameScene();

  constructor(private readonly mountNode: HTMLElement) {}

  mount(): void {
    this.app.stage.addChild(this.scene.view);
    this.app.ticker.add(() => {
      this.scene.update(this.app.ticker.deltaMS / 1000);
    });

    this.mountNode.replaceChildren(this.app.view as HTMLCanvasElement);
  }
}
