import { Container, Graphics, Text, TextStyle } from 'pixi.js';

import { APP_WIDTH, HUD_HEIGHT } from '@/game/config';
import type { GameStatus } from '@/game/types';
import { ControlButton } from '@/game/ui/ControlButton';

export class Hud {
  readonly view = new Container();

  private readonly scoreText: Text;
  private readonly statusText: Text;
  private readonly herdText: Text;
  private readonly controlButton = new ControlButton('Start');

  constructor(onControlToggle: () => void) {
    const background = new Graphics();
    background.beginFill(0x172111, 0.96);
    background.drawRoundedRect(0, 0, APP_WIDTH, HUD_HEIGHT, 16);
    background.endFill();

    const divider = new Graphics();
    divider.lineStyle(2, 0x39502e, 1);
    divider.moveTo(0, HUD_HEIGHT - 1);
    divider.lineTo(APP_WIDTH, HUD_HEIGHT - 1);

    const labelStyle = new TextStyle({
      fill: 0xf4f8ef,
      fontFamily: 'Trebuchet MS',
      fontSize: 24,
      fontWeight: 'bold',
    });

    this.scoreText = new Text('Score: 0', labelStyle);
    this.scoreText.position.set(24, 22);

    this.statusText = new Text('Status: Ready', labelStyle);
    this.statusText.anchor.set(0.5, 0);
    this.statusText.position.set(APP_WIDTH / 2, 22);

    this.herdText = new Text('Herd: 0/5', labelStyle);
    this.herdText.anchor.set(1, 0);
    this.herdText.position.set(APP_WIDTH - 164, 22);

    this.controlButton.view.position.set(APP_WIDTH - 132, 18);
    this.controlButton.setOnPress(onControlToggle);

    this.view.addChild(
      background,
      divider,
      this.scoreText,
      this.statusText,
      this.herdText,
      this.controlButton.view,
    );
  }

  update(score: number, herdSize: number, herdLimit: number, status: GameStatus): void {
    this.scoreText.text = `Score: ${score}`;
    this.herdText.text = `Herd: ${herdSize}/${herdLimit}`;
    this.statusText.text =
      status === 'running'
        ? 'Status: Running'
        : status === 'stopped'
          ? 'Status: Stopped'
          : 'Status: Ready';
    this.controlButton.setLabel(status === 'running' ? 'Stop' : 'Start');
  }
}
