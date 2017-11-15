import Key from './Key';

export default class Game {
  /**
   * A key everyX second
   *
   * @type {Number}
   */
  static TEMPO = 1000;

  /**
   * Zone when you must presse the key
   *
   * @type {Number}
   */
  static ZONE = 0.3;

  /**
   * @param {Function} onTick
   * @param {Function} onSuccess
   * @param {Function} onError
   */
  constructor(onTick, onSuccess, onError) {
    this.callbacks = { onTick, onSuccess, onError };
    this.partition = Game.generatePartition();
    this.current = null;
    this.time = null;
    this.interval = null;

    this.tick = this.tick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  /**
   * Generate a partition of the given length
   *
   * @param {Number} length
   *
   * @return {Array}
   */
  static generatePartition(length = 50) {
    return new Array(length).fill(null).map(value => Key.getRandom());
  }

  /**
   * Start the game
   */
  start() {
    if (!this.interval) {
      window.addEventListener('keydown', this.onKeyDown);
      this.interval = setInterval(this.tick, Game.TEMPO);
      this.current = null;
      this.time = null;
      this.tick();
    }
  }

  /**
   * FIN DU GAME
   */
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.current = null;
      this.time = null;
    }
  }

  /**
   * On key down
   *
   * @param {Event} event
   */
  onKeyDown(event) {
    this.validate(event.key);
  }

  /**
   * Tick
   */
  tick() {
    if (this.partition.length === 0) {
      return this.stop();
    }

    if (this.current !== null) {
      this.callbacks.onError();
    }

    this.time = Date.now();
    this.current = this.partition.shift();
    this.callbacks.onTick(this.current,this.partition);
  }

  /**
   * Validate the answer
   *
   * @param {String} answer
   * @param {Date} date
   */
  validate(answer, date = Date.now()) {
    if (!this.current) {
      return;
    }

    const { TEMPO, ZONE } = this.constructor;
    const time = (date - this.time) / TEMPO;

    if ((time <= ZONE) && (answer === this.current)) {
      this.callbacks.onSuccess();
    } else {
      this.callbacks.onError();
    }

    this.current = null;
  }
}
