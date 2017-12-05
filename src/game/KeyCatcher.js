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
    this.prevent = this.prevent.bind(this);
  }

  attachEvents() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    window.addEventListener('touchstart', this.onTouchStart);
    window.addEventListener('touchend', this.onTouchEnd);
    window.addEventListener('touchmove', this.prevent);
  }

  detachEvents() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    window.removeEventListener('touchstart', this.onTouchStart);
    window.removeEventListener('touchend', this.onTouchEnd);
    window.removeEventListener('touchmove', this.prevent);
  }

  /**
   * On key down
   *
   * @param {Event} event
   */
  onKeyDown(event) {
    const { key } = event;

    if (this.keys.accepts(key)) {
      event.preventDefault();
      this.setKey(key);
    }
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
    event.preventDefault();

    const { changedTouches } = event;
    const { clientX } = changedTouches[0];
    const { values } = this.keys;
    const index = Math.floor(clientX / (window.innerWidth / values.length));

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

  prevent(event) {
    event.preventDefault();
  }

  /**
   * Set current key
   *
   * @param {String} key
   * @param {Number} time
   */
  setKey(key = null, time = Date.now()) {
    if (key !== this.key) {
      this.key = key;
      this.onKey(this.key, time);
    }
  }
}
