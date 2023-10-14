/**
 * Delays the execution of a callback function by a specified amount of time.
 * @param callback The function to execute after the delay.
 * @param options An optional object containing a `delay` property specifying the delay time in milliseconds.
 * @returns A promise that resolves with the result of the callback function.
 */
export function delay<CallbackResult>(
  callback: () => CallbackResult,
  options?: { delay?: number },
): Promise<CallbackResult> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(callback()), options?.delay || getRandomInteger(100, 1000));
  });
}

/**
 * Returns a random integer between the specified minimum and maximum values (inclusive).
 * @param min The minimum value of the range (inclusive).
 * @param max The maximum value of the range (inclusive).
 * @returns A random integer between the specified minimum and maximum values (inclusive).
 */
export function getRandomInteger(min: number, max: number): number {
  const minCeil = Math.ceil(min);
  const maxFloor = Math.floor(max);
  return Math.floor(Math.random() * (maxFloor - minCeil + 1)) + minCeil;
}
