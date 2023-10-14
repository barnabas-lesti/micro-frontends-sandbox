import { createLogger, log } from './logger';
import { delay, getRandomInteger } from './utility';

export { type LogPayload } from './logger';
export type Utilities = ReturnType<typeof createUtilitiesObject>;

export function attachUtilities(): void {
  if (!window.mfsUtilities) {
    window.mfsUtilities = createUtilitiesObject();
  }
}

function createUtilitiesObject() {
  return {
    delay,
    getRandomInteger,
    createLogger,
    log,
  };
}
