import { Container, Graphics, Text, TextStyle } from 'pixi.js';

export class ControlButton {
  readonly view = new Container();

  private readonly background = new Graphics();
  private readonly labelText: Text;
  private readonly width: number;
  private readonly height: number;

  private hovered = false;
  private onPress: (() => void) | null = null;

  constructor(label: string, width = 120, height = 42) {
    this.width = width;
    this.height = height;

    this.labelText = new Text(
      label,
      new TextStyle({
        fill: 0xf9fff0,
        fontFamily: 'Trebuchet MS',
        fontSize: 20,
        fontWeight: 'bold',
      }),
    );
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

  setLabel(label: string): void {
    this.labelText.text = label;
  }

  setOnPress(handler: () => void): void {
    this.onPress = handler;
  }

  private redraw(): void {
    this.background.clear();
    this.background.beginFill(this.hovered ? 0x4d7f3f : 0x355a2f);
    this.background.drawRoundedRect(0, 0, this.width, this.height, 12);
    this.background.endFill();
    this.background.lineStyle(2, this.hovered ? 0xbde37e : 0x8cba6d, 1);
    this.background.drawRoundedRect(0, 0, this.width, this.height, 12);
  }
}
