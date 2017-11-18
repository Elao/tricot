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

/**
 * Simple heart
 */
export const simpleHeart = join(
  repeat('   vv vv  '),
  repeat('   vvvvv  '),
  repeat('    vvv   '),
  repeat('     v    '),
);

/**
 * Saque with a point
 */
export const square = join(
  repeat('  vvvvv   '),
  repeat('  v   v   '),
  repeat('  v v v   '),
  repeat('  v   v   '),
  repeat('  vvvvv   '),
);
