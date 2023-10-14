import { type Utilities } from '@mfs/utility';

declare global {
  interface Window {
    mfsUtilities: Utilities;
  }
}
