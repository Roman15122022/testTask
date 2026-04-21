export const randomFloat = (min, max, rng = Math.random) => min + (max - min) * rng();
export const randomInt = (min, max, rng = Math.random) => Math.floor(randomFloat(min, max + 1, rng));
