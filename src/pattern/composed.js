import { one, two } from './spacer';
import { spacer, line, sin, largeSin } from './simple';

export const twoLineLargeSin = [
  ...line,
  ...one,
  ...largeSin,
  ...one,
  ...line,
];

export const twoLine = [
  ...line,
  ...line,
];


export const sinSinsin = [
  ...sin,
  ...one,
  ...largeSin,
  ...one,
  ...sin,
];
