export const LEFT = 'ArrowLeft';
export const RIGHT = 'ArrowRight';
export const DOWN = 'ArrowDown';

/**
 * CSS classes
 *
 * @type {Object}
 */
export const values = [
  LEFT,
  RIGHT,
  DOWN,
];

/**
 * CSS classes
 *
 * @type {Object}
 */
export const classes = new Map([
  [LEFT, 'left'],
  [RIGHT, 'right'],
  [DOWN, 'down'],
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
