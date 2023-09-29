export function getRandomInteger(min: number, max: number): number {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}

export function delay<T>(callback: () => T, options?: { delay?: number }): Promise<T> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(callback()), options?.delay || getRandomInteger(100, 1000));
  });
}
