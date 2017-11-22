export default class KeyCatcher {
  /**
   * @param {Array} keys
   * @param {Function} onKey
   */
  constructor(keys, onKey) {
    this.keys = keys;
    this.onKey = onKey;
    this.key = null;
    this.touch = null;

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('touchstart', this.onTouchStart);
    window.addEventListener('touchend', this.onTouchEnd);
  }

  /**
   * On key down
   *
   * @param {Event} event
   */
  onKeyDown(event) {
    const { key } = event;

    if (!this.keys.accepts(key)) {
      return;
    }

    event.preventDefault();

    this.setKey(key);
  }

  /**
   * On key up
   */
  onKeyUp() {
    this.setKey(null);
  }

  /**
   * On touch start
   *
   * @param {Event} event
   */
  onTouchStart(event) {
    const { values } = this.keys;
    const x = event.changedTouches[0].clientX;
    const index = Math.floor(x / (window.innerWidth / values.length));

    this.setKey(values[index]);
  }

  /**
   * On touch end
   *
   * @param {Event} event
   */
  onTouchEnd(event) {
    const { touches } = event;

    if (touches.length === 0) {
      this.setKey(null);
    }
  }

  /**
   * Set current key
   *
   * @param {String} key
   */
  setKey(key = null) {
    if (key !== this.key) {
      this.key = key;
      this.onKey(this.key);
    }
  }
}
