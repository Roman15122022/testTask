import { Graphics } from 'pixi.js';
import { HERO_RADIUS, HERO_SPEED } from '../config';
import { clamp, moveTowards } from '../logic/vector';
export class Hero {
    constructor(initialPosition) {
        Object.defineProperty(this, "radius", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: HERO_RADIUS
        });
        Object.defineProperty(this, "view", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "position", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "target", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.position = { ...initialPosition };
        this.target = { ...initialPosition };
        this.view = new Graphics();
        this.draw();
        this.syncView();
    }
    setTarget(position, maxWidth, maxHeight) {
        this.target = {
            x: clamp(position.x, this.radius, maxWidth - this.radius),
            y: clamp(position.y, this.radius, maxHeight - this.radius),
        };
    }
    update(deltaSeconds) {
        this.position = moveTowards(this.position, this.target, HERO_SPEED * deltaSeconds);
        this.syncView();
    }
    draw() {
        this.view.clear();
        this.view.beginFill(0xcf3b2e);
        this.view.drawCircle(0, 0, this.radius);
        this.view.endFill();
        this.view.lineStyle(3, 0xfff5f5, 0.45);
        this.view.drawCircle(0, 0, this.radius + 1.5);
    }
    syncView() {
        this.view.position.set(this.position.x, this.position.y);
    }
}
