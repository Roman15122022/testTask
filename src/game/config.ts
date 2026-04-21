import type { RectangleBounds, WorldBounds } from '@/game/types';

export const HUD_HEIGHT = 76;
export const FIELD_BOUNDS: WorldBounds = {
  width: 960,
  height: 640,
};
export const APP_WIDTH = FIELD_BOUNDS.width;
export const APP_HEIGHT = HUD_HEIGHT + FIELD_BOUNDS.height;

export const HERO_RADIUS = 18;
export const HERO_SPEED = 260;

export const ANIMAL_RADIUS = 12;
export const FOLLOW_SPEED = 220;
export const FOLLOW_SPACING = 34;
export const CAPTURE_RADIUS = 58;
export const MAX_HERD_SIZE = 5;

export const INITIAL_ANIMAL_COUNT = {
  min: 6,
  max: 10,
};

export const YARD_BOUNDS: RectangleBounds = {
  x: FIELD_BOUNDS.width - 220,
  y: FIELD_BOUNDS.height - 170,
  width: 180,
  height: 130,
};

export const SPAWN_INTERVAL_SECONDS = {
  min: 2.5,
  max: 5.5,
};

export const PATROL_INTERVAL_SECONDS = {
  min: 1.5,
  max: 4,
};

export const PATROL_SPEED = 70;
export const SPAWN_PADDING = 32;
export const MIN_ENTITY_GAP = 18;
export const MAX_ACTIVE_ANIMALS = 18;
