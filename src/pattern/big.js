import { join, repeat } from './constants';

/**
 * Reindeers with hearts
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

/**
 * Reindeer looking to the right
 */
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
