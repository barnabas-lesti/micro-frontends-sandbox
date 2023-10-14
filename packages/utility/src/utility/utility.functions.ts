export function delay<CallbackResult>(
  callback: () => CallbackResult,
  options?: { delay?: number },
): Promise<CallbackResult> {
  return new Promise((resolve) => {
    window.setTimeout(() => resolve(callback()), options?.delay || getRandomInteger(100, 1000));
  });
}

export function getRandomInteger(min: number, max: number): number {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}
