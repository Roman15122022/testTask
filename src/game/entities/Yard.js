import { Graphics } from 'pixi.js';
export class Yard {
    constructor(bounds) {
        Object.defineProperty(this, "bounds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "view", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.bounds = { ...bounds };
        this.view = new Graphics();
        this.draw();
    }
    draw() {
        this.view.clear();
        this.view.beginFill(0xf2d64c);
        this.view.drawRoundedRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, 18);
        this.view.endFill();
        this.view.lineStyle(4, 0xe59f2b, 0.9);
        this.view.drawRoundedRect(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height, 18);
    }
}
