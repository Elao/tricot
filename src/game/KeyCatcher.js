export default class KeyCatcher {
  /**
   * @param {Array} keys
   * @param {Function} onKey
   */
  constructor(keys, onKey) {
    this.keys = keys;
    this.onKey = onKey;
    this.key = null;

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);

    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
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

  onKeyUp() {
    this.setKey(null);
  }

  setKey(key = null) {
    if (key !== this.key) {
      this.key = key;
      this.onKey(this.key);
    }
  }
}
