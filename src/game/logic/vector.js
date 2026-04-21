export const distance = (a, b) => {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
};
export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
export const moveTowards = (origin, target, maxDistance) => {
    const remaining = distance(origin, target);
    if (remaining === 0 || remaining <= maxDistance) {
        return { ...target };
    }
    const step = maxDistance / remaining;
    return {
        x: origin.x + (target.x - origin.x) * step,
        y: origin.y + (target.y - origin.y) * step,
    };
};
