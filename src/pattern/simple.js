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
 *  v    v v v        v v v    v
 * vvv   v v vv      vv v v   vvv
 * vvv    vv v        v vv    vvv
 * vv      vvvv      vvvv      vv
 * v       vvvvv    vvvvv       v
 *         vv          vv
 *         vv          vv
 *     vvv vv  vv  vv  vv vvv
 *  v vvvvvvv  vvvvvv  vvvvvvv v
 *   vvvvvvv    vvvv    vvvvvvv
 *   vvvvvvvv    vv    vvvvvvvv
 *   v v  v vv        vv v  v v
 *   v v  v  v        v  v  v v
 *   v v  v              v  v v
 */
export const reindeer = join(
  repeat(' v    v v v        v v v    v '),
  repeat('vvv   v v vv      vv v v   vvv'),
  repeat('vvv    vv v        v vv    vvv'),
  repeat('vv      vvvv      vvvv      vv'),
  repeat('v       vvvvv    vvvvv       v'),
  repeat('        vv          vv        '),
  repeat('        vv          vv        '),
  repeat('    vvv vv  vv  vv  vv vvv    '),
  repeat(' v vvvvvvv  vvvvvv  vvvvvvv v '),
  repeat('  vvvvvvv    vvvv    vvvvvvv  '),
  repeat('  vvvvvvvv    vv    vvvvvvvv  '),
  repeat('  v v  v vv        vv v  v v  '),
  repeat('  v v  v  v        v  v  v v  '),
  repeat('  v v  v              v  v v  '),
);

export const reindeerRight = join(
  repeat('         v     '),
  repeat('      v   v    '),
  repeat('      v   v    '),
  repeat('       vvvv    '),
  repeat('          vvvv '),
  repeat('          vvv  '),
  repeat('          vv   '),
  repeat('   v     vvv   '),
  repeat('   vvvvvvvvv   '),
  repeat('    vvvvvvvv   '),
  repeat('    vvvvvvvvvv '),
  repeat('    vv       v '),
  repeat('  vvv        v '),
  repeat('  v          v '),
  repeat('  v         v  '),
  repeat(' v             '),
);

