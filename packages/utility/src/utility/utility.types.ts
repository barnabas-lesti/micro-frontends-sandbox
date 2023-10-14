import { type delay, type getRandomInteger } from './utility.functions';

export interface Utility {
  delay: typeof delay;
  getRandomInteger: typeof getRandomInteger;
}
