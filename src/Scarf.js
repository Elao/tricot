import React, { Component } from 'react';
import { COLOR_RED, COLOR_WHITE, LINE, WIDTH, HEIGHT } from './pattern/constants';

export default class Scarf extends Component {
  /**
   * Create the SVG path for a crochet at the given position
   *
   * @param {Number} x
   * @param {Number} y
   *
   * @return {String}
   */
  static createCrochet(x, y) {
    return `M ${(x + 0.92) * WIDTH} ${(y + 0.4) * -HEIGHT} c-1.311,3.831,-3.481,6.562,-5.017,6.414c-1.536,0.148,-3.707,-2.582,-5.017,-6.414c-1.403,-4.098,-1.29,-7.905,0.25,-8.501c1.35,-0.523,3.349,1.592,4.767,4.878c1.417,-3.286,3.417,-5.401,4.767,-4.878c1.54,0.596,1.653,4.403,0.25,8.501z`;
  }

  constructor() {
    super();

    this.state = {
      x: 0,
      y: 0,
      white: '',
      red: '',
    };
  }

  /**
   * Append the given pattern the the scarf
   *
   * @param {String} pattern
   */
  append(pattern) {
    let { x, y, white, red } = this.state;

    Array.from(pattern).forEach((value, index) => {
      if (x >= LINE) {
        x = 0;
        y++;
      }

      const crochet = Scarf.createCrochet(x, y);

      if (value === 'v') {
        white += crochet;
      } else {
        red += crochet;
      }

      x++;
    });

    this.setState({ x, y, red, white });
  }

  render() {
    const { white, red, y } = this.state;
    const height = (y + 1) * HEIGHT;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        height={height}
        preserveAspectRatio="xMidYMax slice"
        viewBox={`0 ${-height} 720 ${height}`}
      >
        <path id="white" d={white} fill={COLOR_WHITE}></path>
        <path id="red" d={red} fill={COLOR_RED}></path>
      </svg>
    );
  }
}
