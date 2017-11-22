export const LEFT = 'ArrowLeft';
export const DOWN = 'ArrowDown';
export const RIGHT = 'ArrowRight';

/**
 * CSS classes
 *
 * @type {Object}
 */
export const values = [
  LEFT,
  DOWN,
  RIGHT,
];

/**
 * CSS classes
 *
 * @type {Object}
 */
export const classes = new Map([
  [LEFT, 'left'],
  [DOWN, 'down'],
  [RIGHT, 'right'],
]);

/**
 * Get class
 *
 * @param {String} value
 *
 * @return {String}
 */
export function getClass(value) {
  return classes.get(value);
}

/**
 * Get random value from the set
 *
 * @return {String|Integer}
 */
export function getRandom() {
  return values[Math.floor(Math.random() * values.length)];
}

/**
 * Generate an array of the given length filled with random values
 *
 * @param {Number} length
 *
 * @return {Array}
 */
export function getRandoms(length = 50) {
  return new Array(length).fill(null).map(() => getRandom());
}

/**
 * Does the value exist in the set?
 *
 * @param {String} value
 *
 * @return {Boolean}
 */
export function accepts(value) {
  return values.includes(value);
}
