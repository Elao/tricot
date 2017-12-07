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
 *   v   v   v   v   v
 *  v v v v v v v v v v
 * v   v   v   v   v   v
 *  v v v v v v v v v v
 *   v   v   v   v   v
 */
export const diamond = [
  repeat('  v '),
  repeat(' v v'),
  repeat('v   '),
  repeat(' v v'),
  repeat('  v '),
]

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
  repeat('vvvvvvvvvv'),
  repeat('   v v v  '),
  repeat('v  vv vv  '),
  repeat('   v v v  '),
  repeat('vvvvvvvvvv'),
];

export const mediumLine = [
  repeat('vv'),
  repeat(' v'),
  repeat('v '),
  repeat('vv'),
];

export const arrowsUpDown = [
  repeat('v   v   '),
  repeat(' v v    '),
  repeat('  v   v '),
  repeat('     v v'),
  repeat('v   v   '),
];

export const croco = [
  repeat('v   '),
  repeat(' v v'),
  repeat('v   '),
  repeat('  v '),
  repeat(' vvv'),
  repeat('vvvv'),
];

export const zalando2 = [
  repeat('v    '),
  repeat(' v  v'),
  repeat('  vv '),
];

export const zalando5 = [
  repeat('  v   v   v '),
  repeat(' v   vvv   v'),
  repeat('v   vv vv   '),
  repeat(' v   vvv   v'),
  repeat('  v   v   v '),
];
