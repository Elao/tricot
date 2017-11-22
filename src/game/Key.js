import Enum from '../utils/Enum';

/**
 * Available Keys
 */
export default class Key extends Enum {

  static LEFT = 'ArrowLeft';
  static UP = 'ArrowUp';
  static RIGHT = 'ArrowRight';
  static DOWN = 'ArrowDown';

  static values = [
    Key.LEFT,
    //Key.UP,
    Key.RIGHT,
    Key.DOWN,
  ];

  static classes = {
    [Key.LEFT]: 'left',
    [Key.UP]: 'up',
    [Key.RIGHT]: 'right',
    [Key.DOWN]: 'down',
  };

  static getClass(value) {
    return this.classes[value];
  }
}
