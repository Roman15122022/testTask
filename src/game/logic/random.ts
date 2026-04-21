export const randomFloat = (
  min: number,
  max: number,
  rng: () => number = Math.random,
): number => min + (max - min) * rng();

export const randomInt = (
  min: number,
  max: number,
  rng: () => number = Math.random,
): number => Math.floor(randomFloat(min, max + 1, rng));
