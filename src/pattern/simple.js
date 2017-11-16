import { join, repeat } from './constants';

/**
 *
 */
export const spacer = join(
  repeat(' '),
);

/**
 * vvvvvvvvvv
 */
export const line = join(
  repeat('v'),
);

/**
 *  v v v v v
 * v v v v v v
 */
export const sin = join(
  repeat(' v'),
  repeat('v '),
);

/**
 *   v   v   v   v   v
 *  v v v v v v v v v v
 * v   v   v   v   v   v
 */
export const largeSin = join(
  repeat('  v '),
  repeat(' v v'),
  repeat('v   '),
);
