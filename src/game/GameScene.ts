import { Container, FederatedPointerEvent, Graphics, Rectangle } from 'pixi.js';

import {
  ANIMAL_RADIUS,
  CAPTURE_RADIUS,
  FIELD_BOUNDS,
  HUD_HEIGHT,
  INITIAL_ANIMAL_COUNT,
  MAX_HERD_SIZE,
  MIN_ENTITY_GAP,
  SPAWN_PADDING,
  YARD_BOUNDS,
} from '@/game/config';
import { Animal } from '@/game/entities/Animal';
import { Hero } from '@/game/entities/Hero';
import { Yard } from '@/game/entities/Yard';
import { canAddAnimalToHerd, canAnimalJoinHerd, hasReachedYard } from '@/game/logic/gameRules';
import { randomInt } from '@/game/logic/random';
import { generateSpawnPosition } from '@/game/logic/spawn';
import type { GameStatus, Vector2 } from '@/game/types';
import { PatrolSystem } from '@/game/systems/PatrolSystem';
import { FollowGroupSystem } from '@/game/systems/FollowGroupSystem';
import { SpawnSystem } from '@/game/systems/SpawnSystem';
import { Hud } from '@/game/ui/Hud';
import { MenuOverlay } from '@/game/ui/MenuOverlay';

export class GameScene {
  readonly view = new Container();

  private readonly hud = new Hud(() => {
    this.toggleGame();
  });
  private readonly field = new Container();
  private readonly background = new Graphics();
  private readonly menuOverlay = new MenuOverlay();
  private readonly hero: Hero;
  private readonly yard = new Yard(YARD_BOUNDS);
  private readonly patrolSystem = new PatrolSystem(YARD_BOUNDS);
  private readonly followGroupSystem = new FollowGroupSystem();
  private readonly spawnSystem: SpawnSystem;

  private nextAnimalId = 1;
  private score = 0;
  private animals: Animal[] = [];
  private herd: Animal[] = [];
  private gameStatus: GameStatus = 'menu';

  constructor(private readonly rng: () => number = Math.random) {
    this.hero = new Hero({ x: 110, y: FIELD_BOUNDS.height / 2 });
    this.spawnSystem = new SpawnSystem({
      yardBounds: YARD_BOUNDS,
      onSpawn: (position) => {
        this.createAnimal(position);
      },
      rng: this.rng,
    });

    this.drawField();
    this.field.y = HUD_HEIGHT;
    this.field.addChild(this.background, this.yard.view, this.hero.view);
    this.menuOverlay.view.y = HUD_HEIGHT;
    this.view.addChild(this.hud.view, this.field, this.menuOverlay.view);

    this.spawnInitialAnimals();
    this.menuOverlay.show('menu', () => {
      this.startGame();
    });
    this.hud.update(this.score, this.herd.length, MAX_HERD_SIZE, this.gameStatus);
  }

  update(deltaSeconds: number): void {
    if (this.gameStatus !== 'running') {
      this.hud.update(this.score, this.herd.length, MAX_HERD_SIZE, this.gameStatus);
      return;
    }

    this.hero.update(deltaSeconds);
    this.patrolSystem.update(this.animals, deltaSeconds);
    this.captureNearbyAnimals();
    this.followGroupSystem.update(this.hero, this.herd, deltaSeconds);
    this.deliverAnimals();
    this.spawnSystem.update(deltaSeconds, this.hero.position, this.animals);
    this.hud.update(this.score, this.herd.length, MAX_HERD_SIZE, this.gameStatus);
  }

  private drawField(): void {
    this.background.clear();
    this.background.beginFill(0x4f8d44);
    this.background.drawRoundedRect(0, 0, FIELD_BOUNDS.width, FIELD_BOUNDS.height, 18);
    this.background.endFill();

    this.background.beginFill(0x76b35b, 0.24);
    this.background.drawRoundedRect(24, 24, FIELD_BOUNDS.width - 48, FIELD_BOUNDS.height - 48, 22);
    this.background.endFill();

    this.background.lineStyle(3, 0x2c5f27, 0.95);
    this.background.drawRoundedRect(0, 0, FIELD_BOUNDS.width, FIELD_BOUNDS.height, 18);
    this.background.lineStyle(2, 0x7dc272, 0.45);
    this.background.drawRoundedRect(24, 24, FIELD_BOUNDS.width - 48, FIELD_BOUNDS.height - 48, 22);

    this.background.eventMode = 'static';
    this.background.hitArea = new Rectangle(0, 0, FIELD_BOUNDS.width, FIELD_BOUNDS.height);
    this.background.cursor = 'crosshair';
    this.background.on('pointerdown', this.handlePointerDown);
  }

  private readonly handlePointerDown = (event: FederatedPointerEvent): void => {
    if (this.gameStatus !== 'running') {
      return;
    }

    const localPosition = event.getLocalPosition(this.field);
    this.hero.setTarget(localPosition, FIELD_BOUNDS.width, FIELD_BOUNDS.height);
  };

  private startGame(): void {
    this.gameStatus = 'running';
    this.menuOverlay.hide();
    this.hud.update(this.score, this.herd.length, MAX_HERD_SIZE, this.gameStatus);
  }

  private stopGame(): void {
    this.gameStatus = 'stopped';
    this.menuOverlay.show('stopped', () => {
      this.startGame();
    });
    this.hud.update(this.score, this.herd.length, MAX_HERD_SIZE, this.gameStatus);
  }

  private toggleGame(): void {
    if (this.gameStatus === 'running') {
      this.stopGame();
      return;
    }

    this.startGame();
  }

  private spawnInitialAnimals(): void {
    const amount = randomInt(INITIAL_ANIMAL_COUNT.min, INITIAL_ANIMAL_COUNT.max, this.rng);

    for (let index = 0; index < amount; index += 1) {
      const position = generateSpawnPosition({
        fieldWidth: FIELD_BOUNDS.width,
        fieldHeight: FIELD_BOUNDS.height,
        radius: ANIMAL_RADIUS,
        yardBounds: YARD_BOUNDS,
        obstacles: [
          { position: this.hero.position, radius: this.hero.radius },
          ...this.animals.map((animal) => ({
            position: animal.position,
            radius: animal.radius,
          })),
        ],
        minGap: MIN_ENTITY_GAP,
        padding: SPAWN_PADDING,
        rng: this.rng,
      });

      if (position) {
        this.createAnimal(position);
      }
    }
  }

  private createAnimal(position: Vector2): void {
    const animal = new Animal(this.nextAnimalId, position);

    this.nextAnimalId += 1;
    this.animals.push(animal);
    this.field.addChild(animal.view);
    this.field.setChildIndex(this.hero.view, this.field.children.length - 1);
  }

  private captureNearbyAnimals(): void {
    for (const animal of this.animals) {
      if (animal.state !== 'idle') {
        continue;
      }

      if (
        canAddAnimalToHerd(this.herd.length, MAX_HERD_SIZE) &&
        canAnimalJoinHerd(this.hero.position, animal.position, CAPTURE_RADIUS)
      ) {
        animal.setState('following');
        animal.patrolTarget = null;
        animal.patrolCooldown = 0;
        this.herd.push(animal);
      }
    }
  }

  private deliverAnimals(): void {
    const delivered = this.herd.filter((animal) => hasReachedYard(animal.position, this.yard.bounds, 4));

    if (delivered.length === 0) {
      return;
    }

    for (const animal of delivered) {
      animal.setState('delivered');
      this.score += 1;
      this.herd = this.herd.filter((current) => current.id !== animal.id);
      this.animals = this.animals.filter((current) => current.id !== animal.id);
      this.field.removeChild(animal.view);
      animal.destroy();
    }
  }
}
