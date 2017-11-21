import { repeat } from './constants';

/**
 * vvvvvvvvvv
 */
export const line = [
  repeat('v'),
];

/**
 *  v v v v v
 * v v v v v v
 */
export const sin = [
  repeat(' v'),
  repeat('v '),
];

/**
 *   v   v   v   v   v
 *  v v v v v v v v v v
 * v   v   v   v   v   v
 */
export const largeSin = [
  repeat('  v '),
  repeat(' v v'),
  repeat('v   '),
];

/**
 * Simple heart
 */
export const simpleHeart = [
  repeat('   vv vv  '),
  repeat('   vvvvv  '),
  repeat('    vvv   '),
  repeat('     v    '),
];

/**
 * Saque with a point
 */
export const square = [
  repeat('  vvvvv   '),
  repeat('  v   v   '),
  repeat('  v v v   '),
  repeat('  v   v   '),
  repeat('  vvvvv   '),
];

export const largeLine = [
  repeat('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv'),
  repeat('v   v v v   v v v   v v v   v v v   v v v   v v v   v v v   '),
  repeat('v v vv vv v vv vv v vv vv v vv vv v vv vv v vv vv v vv vv v '),
  repeat('v   v v v   v v v   v v v   v v v   v v v   v v v   v v v   '),
  repeat('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv'),
];
