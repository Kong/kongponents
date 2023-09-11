export * from './strings';
export * from './kongponents';
export function sleep(ms = 2200) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
