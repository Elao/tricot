/**
 * Colors
 *
 * @type {String}
 */
export const COLOR_RED = '#f63f3a';
export const COLOR_WHITE = '#ffffff';

/**
 * Point size
 *
 * @type {Number}
 */
export const WIDTH = 12;
export const HEIGHT = 12;
export const LINE = 60;

/**
 * Repeat a pattern to fit the width of the line
 *
 * @param {String} pattern
 * @param {Number} line
 *
 * @return {String}
 */
export function repeat(pattern, line = LINE) {
  return pattern.repeat(line / pattern.length);
}

/**
 * Concatenate strings
 *
 * @param {...String} lines
 *
 * @return {String}
 */
export function join(...lines) {
  return lines.reverse().join('');
}
