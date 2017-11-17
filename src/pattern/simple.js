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

export const heart = join(
  repeat('    vv   vv    '),
  repeat('   vvvv vvvv   '),
  repeat('   vv vvv vv   '),
  repeat('   vv  v  vv   '),
  repeat('    vv   vv    '),
  repeat('     vv vv     '),
  repeat('      vvv      '),
  repeat('       v       '),
)

export const simpleHeart = join(
  repeat('   vv vv  '),
  repeat('   vvvvv  '),
  repeat('    vvv   '),
  repeat('     v    '),
)

export const square = join(
  repeat('  vvvvv   '),
  repeat('  v   v   '),
  repeat('  v v v   '),
  repeat('  v   v   '),
  repeat('  vvvvv   '),
)

export const littleReindeer = join(
  repeat('   vv vv     v v    '),
  repeat('    v v    v  v  v  '),
  repeat('     v     v vvv v  '),
  repeat('    vvv     v v v   '),
  repeat('   vvvvvvvv  vvv    '),
  repeat('   vv vvvvv   v     '),
  repeat('      vvvvv   v     '),
  repeat('      v   v   v     '),
  repeat('     vv  vv  vvv    '),
)

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

export const rex = join(
  repeat('  vv           '),
  repeat(' vvvv          '),
  repeat('vvvvv          '),
  repeat('vvvvv          '),
  repeat(' vvvv          '),
  repeat('   vv          '),
  repeat('   vvvvv       '),
  repeat('  vvvvvvvvvvvv '),
  repeat(' v vvvvvvvvvv  '),
  repeat('   vvvvvvvvv   '),
  repeat('  v vvvvvv     '),
  repeat('     vvv       '),
  repeat('     vvv       '),
  repeat('     v vv      '),
  repeat('     v  v      '),
  repeat('     v  v      '),
  repeat('    vv v       '),
);

export const rex2 = join(
  repeat('          vvvvvvvv  '),
  repeat('         vvv vvvvvvv'),
  repeat('         vvvvvvvvvvv'),
  repeat('         vvvvvvvvvvv'),
  repeat('         vvvvvv     '),
  repeat('         vvvvvvvvv  '),
  repeat('v      vvvvvvv      '),
  repeat('vv    vvvvvvvvvvv   '),
  repeat('vvv  vvvvvvvvv  v   '),
  repeat('vvvvvvvvvvvvvv      '),
  repeat('vvvvvvvvvvvvvv      '),
  repeat(' vvvvvvvvvvvv       '),
  repeat('  vvvvvvvvvv        '),
  repeat('    vvvvvvv         '),
  repeat('     vv  vv         '),
  repeat('     vv   v         '),
  repeat('     v    v         '),
  repeat('     vv   vv        '),
);

export const diplo = join(
  repeat('         vvv   '),
  repeat('         vvvv  '),
  repeat('         vv    '),
  repeat('         vv    '),
  repeat('         vv    '),
  repeat('         vv    '),
  repeat('         vv    '),
  repeat('         vv    '),
  repeat('     vvvvvv    '),
  repeat('    vvvvvvv    '),
  repeat('   vvvvvvvv    '),
  repeat('v vvvvvvvv     '),
  repeat('vvv vvvvvv     '),
  repeat(' v  vv  vv     '),
  repeat('    vv  vv     '),
  repeat('    vv  vv     '),
);

export const santa = join(
  repeat('      vv                                                    '),
  repeat('     v vv                                                   '),
  repeat('       vvv                                                  '),
  repeat('       vvv                                                  '),
  repeat('     vvvvv                                                  '),
  repeat('    vvvvv  vv                                               '),
  repeat('    vvvvvvvv                        v                v      '),
  repeat(' vvvvvvvvvv                       v  v             v  v     '),
  repeat('  v     vv                         vvvvv            vvvvv   '),
  repeat('  vvvvvv  vv                          vvvv             vvvv '),
  repeat('   vvvvvvvv vv         vv             vv               vv   '),
  repeat('   vvvvvvvvv vv       v  v           vvv              vvv   '),
  repeat('    vvvvvvvvv vv      v        vvvvvvvv         vvvvvvvv    '),
  repeat('    vvvvvvvvvv vv      v      vvvvvvvv         vvvvvvvv     '),
  repeat('     vvvvvvvvvv vvvv   vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv     '),
  repeat('     vvvvvvvvvvvvvvvvvvvv      v    vv          v    vv     '),
  repeat('     v  v    v     v    v     vv    vv         vv    vv     '),
  repeat('    v  v     v     v   v     v v   v v        v v   v v     '),
  repeat('  vvvvvvvvvvvvvvvvvvvvv      v  v     v       v  v     v    '),
);

