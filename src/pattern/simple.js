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
 *
 */
export const reindeer = join(
  repeat(' v    v v v     v v v    v '),
  repeat('vvv   v v vv   vv v v   vvv'),
  repeat('vvv    vv v     v vv    vvv'),
  repeat('vv      vvvv   vvvv      vv'),
  repeat('v       vvvvv vvvvv       v'),
  repeat('        vv       vv        '),
  repeat('        vv       vv        '),
  repeat('    vvv vv vv vv vv vvv    '),
  repeat(' v vvvvvvv vvvvv vvvvvvv v '),
  repeat('  vvvvvvv   vvv   vvvvvvv  '),
  repeat('  vvvvvvvv   v   vvvvvvvv  '), 
  repeat('  v v  v vv     vv v  v v  '),
  repeat('  v v  v  v     v  v  v v  '),
  repeat('  v v  v           v v v   '),
);
