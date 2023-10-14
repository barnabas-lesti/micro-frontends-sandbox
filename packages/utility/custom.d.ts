import { type Utilities } from './src';

declare global {
  interface Window {
    mfsUtilities: Utilities;
  }
}
