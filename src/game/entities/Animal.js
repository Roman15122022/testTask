import { Graphics } from 'pixi.js';
import { ANIMAL_RADIUS } from '../config';
export class Animal {
    constructor(id, initialPosition) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "radius", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ANIMAL_RADIUS
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
        Object.defineProperty(this, "state", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'idle'
        });
        Object.defineProperty(this, "patrolTarget", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "patrolCooldown", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        this.id = id;
        this.position = { ...initialPosition };
        this.view = new Graphics();
        this.redraw();
        this.syncView();
    }
    setState(state) {
        this.state = state;
        this.redraw();
    }
    setPosition(position) {
        this.position = { ...position };
        this.syncView();
    }
    destroy() {
        this.view.destroy();
    }
    redraw() {
        this.view.clear();
        const fillColor = this.state === 'following' ? 0xf8fbff : 0xffffff;
        const outlineColor = this.state === 'following' ? 0x7aa2ff : 0xd5dde8;
        this.view.beginFill(fillColor);
        this.view.drawCircle(0, 0, this.radius);
        this.view.endFill();
        this.view.lineStyle(2, outlineColor, 1);
        this.view.drawCircle(0, 0, this.radius);
    }
    syncView() {
        this.view.position.set(this.position.x, this.position.y);
    }
}
