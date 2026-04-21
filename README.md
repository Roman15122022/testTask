# Herdsman Prototype

Simple 2D mini-game prototype built with `TypeScript`, `Vite`, and `PixiJS` for the HTML5 Engineer test task.

## Run

```bash
npm install
npm run dev
```

Build and test:

```bash
npm run test
npm run build
```

## Gameplay

- The hero is a red circle on a green field.
- Animals are white circles spawned at random valid positions.
- The yellow area is the yard destination.
- Click anywhere on the field to move the hero.
- Animals close to the hero join the herd up to a maximum of 5.
- Herded animals trail behind the hero and increase the score when they reach the yard.
- Optional extras are included: random timed spawning and idle patrol behavior for free animals.

## Architecture

- `GameApp` initializes Pixi, mounts the canvas, and drives the update loop.
- `GameScene` owns the current game state and coordinates entities, HUD, and systems.
- Entity classes (`Hero`, `Animal`, `Yard`) encapsulate visual state plus behavior local to the entity.
- Systems (`FollowGroupSystem`, `PatrolSystem`, `SpawnSystem`) keep movement, AI, and spawning logic isolated from rendering bootstrap code.
- Pure logic helpers in `src/game/logic` are intentionally separated so gameplay rules can be tested without Pixi.

## OOP and SOLID

- **Single Responsibility Principle**: scene orchestration, rendering, spawning, following, and patrol decisions are split into dedicated classes/modules.
- **Open/Closed Principle**: new systems such as different spawn rules or follow behaviors can be added without rewriting scene bootstrap code.
- **Liskov / Interface safety**: entities expose small, stable APIs (`setPosition`, `setState`, `update`) so scene logic can work with them predictably.
- **Interface Segregation**: pure gameplay helpers are independent from Pixi-specific rendering concerns.
- **Dependency Inversion**: systems consume configuration values and callbacks instead of directly constructing unrelated dependencies.

## Patterns and Best Practices

- **Composition over monoliths**: the scene composes entities and systems rather than mixing every rule into one file.
- **Configuration-driven values**: gameplay constants live in `config.ts`, which keeps tuning simple and avoids magic numbers across modules.
- **Pure function core**: capture checks, herd-cap rules, yard delivery checks, and spawn validation are extracted to deterministic helpers.
- **Thin rendering layer**: Pixi primitives are used only for drawing and frame updates, while rules remain framework-agnostic where practical.

## Code Style and Framework Notes

- Strict TypeScript is enabled to make state transitions explicit.
- Naming is intent-first: scene for orchestration, entities for stateful actors, systems for reusable rules.
- Comments are kept minimal and code is structured to stay readable without heavy annotation.
- PixiJS is used as the rendering/game framework layer without React, Vue, or Angular.
