export function generateRandomValue(min: number, max: number, digits: number = 0): number {
  return +((Math.random() * (max - min)) + min).toFixed(digits);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getRandomItems<T>(items: T[]): T[] {
  const start = generateRandomValue(0, items.length - 1);
  const end = generateRandomValue(start, items.length - 1);
  return items.slice(start, end);
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unknown error';
}
