import { Application } from 'pixi.js';
import { APP_HEIGHT, APP_WIDTH } from './config';
import { GameScene } from './GameScene';
export class GameApp {
    constructor(mountNode) {
        Object.defineProperty(this, "mountNode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: mountNode
        });
        Object.defineProperty(this, "app", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Application({
                antialias: true,
                backgroundAlpha: 0,
                width: APP_WIDTH,
                height: APP_HEIGHT,
            })
        });
        Object.defineProperty(this, "scene", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new GameScene()
        });
    }
    mount() {
        this.app.stage.addChild(this.scene.view);
        this.app.ticker.add(() => {
            this.scene.update(this.app.ticker.deltaMS / 1000);
        });
        this.mountNode.replaceChildren(this.app.view);
    }
}
