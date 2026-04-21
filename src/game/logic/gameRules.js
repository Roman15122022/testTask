import { distance } from './vector';
export const canAddAnimalToHerd = (herdSize, herdCap) => herdSize < herdCap;
export const canAnimalJoinHerd = (heroPosition, animalPosition, captureRadius) => distance(heroPosition, animalPosition) <= captureRadius;
export const hasReachedYard = (position, yardBounds, margin = 0) => position.x >= yardBounds.x - margin &&
    position.x <= yardBounds.x + yardBounds.width + margin &&
    position.y >= yardBounds.y - margin &&
    position.y <= yardBounds.y + yardBounds.height + margin;
export const circleIntersectsRectangle = (position, radius, bounds) => {
    const nearestX = Math.max(bounds.x, Math.min(position.x, bounds.x + bounds.width));
    const nearestY = Math.max(bounds.y, Math.min(position.y, bounds.y + bounds.height));
    return distance(position, { x: nearestX, y: nearestY }) <= radius;
};
export const isValidSpawnPosition = (position, radius, fieldWidth, fieldHeight, yardBounds, obstacles, minGap) => {
    if (position.x - radius < 0 ||
        position.x + radius > fieldWidth ||
        position.y - radius < 0 ||
        position.y + radius > fieldHeight) {
        return false;
    }
    if (circleIntersectsRectangle(position, radius + minGap, yardBounds)) {
        return false;
    }
    return obstacles.every((obstacle) => distance(position, obstacle.position) >= radius + obstacle.radius + minGap);
};
