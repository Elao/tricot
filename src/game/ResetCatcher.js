export default class ResetCatcher {
  /**
   * @param {Array} keys
   * @param {Function} callback
   */
  constructor(keys, callback) {
    this.keys = keys;
    this.callback = callback;
    this.target = null;

    this.onKey = this.onKey.bind(this);
    this.onTouch = this.onTouch.bind(this);
    this.setTarget = this.setTarget.bind(this);
  }

  setTarget(target) {
    this.target = target;
    this.attachEvents();
  }

  attachEvents() {
    window.addEventListener('keydown', this.onKey);
    this.target.addEventListener('touchstart', this.onTouch);
  }

  detachEvents() {
    window.removeEventListener('keydown', this.onKey);
    this.target.removeEventListener('touchstart', this.onTouch);
  }

  /**
   * On key
   *
   * @param {Event} event
   */
  onKey(event) {
    const { key } = event;

    if (this.keys.accepts(key)) {
      event.preventDefault();
      this.callback();
    }
  }

  /**
   * On touch
   */
  onTouch() {
    this.callback();
  }
}
