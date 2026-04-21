import { Container, Graphics, Text, TextStyle } from 'pixi.js';
import { FIELD_BOUNDS } from '../config';
import { ControlButton } from './ControlButton';
export class MenuOverlay {
    constructor() {
        Object.defineProperty(this, "view", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Container()
        });
        Object.defineProperty(this, "titleText", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "messageText", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "actionButton", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new ControlButton('Start', 168, 50)
        });
        const dimmer = new Graphics();
        dimmer.beginFill(0x081106, 0.55);
        dimmer.drawRoundedRect(0, 0, FIELD_BOUNDS.width, FIELD_BOUNDS.height, 18);
        dimmer.endFill();
        dimmer.eventMode = 'static';
        const panelWidth = 420;
        const panelHeight = 220;
        const panel = new Graphics();
        panel.beginFill(0x132011, 0.95);
        panel.drawRoundedRect(0, 0, panelWidth, panelHeight, 22);
        panel.endFill();
        panel.lineStyle(3, 0x88c967, 0.95);
        panel.drawRoundedRect(0, 0, panelWidth, panelHeight, 22);
        panel.position.set((FIELD_BOUNDS.width - panelWidth) / 2, (FIELD_BOUNDS.height - panelHeight) / 2);
        this.titleText = new Text('Herdsman', new TextStyle({
            fill: 0xf4f8ef,
            fontFamily: 'Trebuchet MS',
            fontSize: 34,
            fontWeight: 'bold',
        }));
        this.titleText.anchor.set(0.5, 0);
        this.titleText.position.set(FIELD_BOUNDS.width / 2, panel.y + 28);
        this.messageText = new Text('Collect animals and bring them to the yard.', new TextStyle({
            fill: 0xd8e8d0,
            fontFamily: 'Trebuchet MS',
            fontSize: 20,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: panelWidth - 56,
        }));
        this.messageText.anchor.set(0.5, 0);
        this.messageText.position.set(FIELD_BOUNDS.width / 2, panel.y + 92);
        this.actionButton.view.position.set((FIELD_BOUNDS.width - 168) / 2, panel.y + panelHeight - 78);
        this.view.visible = false;
        this.view.addChild(dimmer, panel, this.titleText, this.messageText, this.actionButton.view);
    }
    show(status, onAction) {
        this.view.visible = true;
        this.actionButton.setOnPress(onAction);
        if (status === 'menu') {
            this.titleText.text = 'Herdsman';
            this.messageText.text = 'Collect animals, gather a herd of up to five, and deliver them to the yard.';
            this.actionButton.setLabel('Start');
            return;
        }
        this.titleText.text = 'Game Stopped';
        this.messageText.text = 'The field is paused. Press Start when you want to continue the current run.';
        this.actionButton.setLabel('Start');
    }
    hide() {
        this.view.visible = false;
    }
}
