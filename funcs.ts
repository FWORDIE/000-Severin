

export function random(min: number, max: number) {
    return Math.random() * (max - min) + min;
}
export const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));
