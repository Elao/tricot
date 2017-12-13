import { one } from './spacer';
import * as SIMPLE from './simple';
import * as MEDIUM from './medium';
import * as BIG from './big';
import * as HERO from './hero';

/**
 * Patterns dictionary
 *
 * @type {Array}
 */
export default [...new Set(
  one
    .concat(...SIMPLE.line)
    .concat(...SIMPLE.sin)
    .concat(...SIMPLE.largeSin)
    .concat(...SIMPLE.diamond)
    .concat(...SIMPLE.simpleHeart)
    .concat(...SIMPLE.square)
    .concat(...SIMPLE.largeLine)
    .concat(...SIMPLE.mediumLine)
    .concat(...SIMPLE.arrowsUpDown)
    .concat(...SIMPLE.croco)
    .concat(...SIMPLE.wave)
    .concat(...SIMPLE.crossAndBox)
    .concat(...MEDIUM.heart)
    .concat(...MEDIUM.largeLine)
    .concat(...MEDIUM.simpleTree)
    .concat(...MEDIUM.snowFlakeRect)
    .concat(...MEDIUM.line)
    .concat(...MEDIUM.holly)
    .concat(...MEDIUM.star)
    .concat(...MEDIUM.bell)
    .concat(...MEDIUM.snowFlakesSmall)
    .concat(...BIG.reindeer)
    .concat(...BIG.reindeerRight)
    .concat(...BIG.tree)
    .concat(...HERO.santa)
    .concat(...HERO.tree)
    .concat(...HERO.large)
)];
