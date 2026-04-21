import { isValidSpawnPosition } from './gameRules';
export const generateSpawnPosition = ({ fieldWidth, fieldHeight, radius, yardBounds, obstacles, minGap, padding, attempts = 40, rng = Math.random, }) => {
    const minX = radius + padding;
    const maxX = fieldWidth - radius - padding;
    const minY = radius + padding;
    const maxY = fieldHeight - radius - padding;
    for (let attempt = 0; attempt < attempts; attempt += 1) {
        const position = {
            x: minX + (maxX - minX) * rng(),
            y: minY + (maxY - minY) * rng(),
        };
        if (isValidSpawnPosition(position, radius, fieldWidth, fieldHeight, yardBounds, obstacles, minGap)) {
            return position;
        }
    }
    return null;
};
