/**
 * Enum.js by @ogizanagi
 */
class Enum {
  /**
   * @param {String|Integer} value One of the possible enum values
   */
  constructor(value) {
    if (!this.constructor.accepts(value)) {
      throw new Error(
        `Invalid value for "${this.constructor.name}" enum type.` +
        `Expected one of ${JSON.stringify(this.values)}. Got "${value}".`,
      );
    }

    this.value = value;
  }

  /**
   * @param {String|Integer} value
   *
   * @return {Boolean} True if the value is an acceptable value for the enum type
   */
  static accepts(value) {
    return this.values.indexOf(value) !== -1;
  }

  /**
   * Get value if accepter, otherwise default value
   *
   * @param {String|Int} value
   * @param {String|Int|null} defaultValue
   *
   * @return {String|Int|null}
   */
  static mask(value, defaultValue = null) {
    return this.accepts(value) ? value : defaultValue;
  }

  /**
   * Get the human readable value
   *
   * @param {String|Integer} value
   */
  static readableFor(value) {
    return this.readables[value];
  }

  /**
   * Get random value from the set
   *
   * @return {String|Integer}
   */
  static getRandom() {
    return this.values[Math.floor(Math.random() * this.values.length)];
  }

  /**
   * Return the value, whether it's an instance of the value itself.
   *
   * @param {Enum|String} value
   *
   * @return {String|null}
   */
  static parse(value = null) {
    if (value === null) {
      return null;
    }

    return (value instanceof this ? value : new this(value)).value;
  }

  /**
   * @param {String|Integer} value
   *
   * @return {Boolean} True if the enum instance has given value
   */
  is(value) {
    return value === this.value;
  }

  /**
   * Returns the human readable version of the enum instance
   *
   * @return {String}
   */
  getReadable() {
    return this.constructor.readableFor(this.value);
  }

  /**
   * Returns the human readable version of the enum instance
   *
   * @return {String}
   */
  toString() {
    return this.getReadable();
  }
}

export default Enum;
