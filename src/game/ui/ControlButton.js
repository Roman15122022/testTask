import { Container, Graphics, Text, TextStyle } from 'pixi.js';
export class ControlButton {
    constructor(label, width = 120, height = 42) {
        Object.defineProperty(this, "view", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Container()
        });
        Object.defineProperty(this, "background", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Graphics()
        });
        Object.defineProperty(this, "labelText", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "width", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "height", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hovered", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "onPress", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        this.width = width;
        this.height = height;
        this.labelText = new Text(label, new TextStyle({
            fill: 0xf9fff0,
            fontFamily: 'Trebuchet MS',
            fontSize: 20,
            fontWeight: 'bold',
        }));
        this.labelText.anchor.set(0.5);
        this.labelText.position.set(width / 2, height / 2);
        this.view.eventMode = 'static';
        this.view.cursor = 'pointer';
        this.view.addChild(this.background, this.labelText);
        this.view.on('pointertap', () => {
            this.onPress?.();
        });
        this.view.on('pointerover', () => {
            this.hovered = true;
            this.redraw();
        });
        this.view.on('pointerout', () => {
            this.hovered = false;
            this.redraw();
        });
        this.redraw();
    }
    setLabel(label) {
        this.labelText.text = label;
    }
    setOnPress(handler) {
        this.onPress = handler;
    }
    redraw() {
        this.background.clear();
        this.background.beginFill(this.hovered ? 0x4d7f3f : 0x355a2f);
        this.background.drawRoundedRect(0, 0, this.width, this.height, 12);
        this.background.endFill();
        this.background.lineStyle(2, this.hovered ? 0xbde37e : 0x8cba6d, 1);
        this.background.drawRoundedRect(0, 0, this.width, this.height, 12);
    }
}
