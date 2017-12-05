import React, { Component } from 'react';
import { COLOR_RED, COLOR_WHITE, LINE, WIDTH, HEIGHT } from './pattern/constants';
import Generator from './pattern/Generator';
import pompom from '../assets/images/pompom.svg';

export default class Scarf extends Component {
  /**
   * Create the SVG path for a crochet at the given position
   *
   * @param {Number} x
   * @param {Number} y
   *
   * @return {String}
   */
  static createCrochet(x, y = 0) {
    const pX = (x + 0.92) * WIDTH - 5;
    const pY = (y + 0.4) * HEIGHT + 4;

    return `M ${pX} ${pY} a 2.8 8.5 -19 1 0 0 10 M ${pX} ${pY} a 2.8 8.5 19 1 1 0 10 z`;
  }

  /**
   * Generate random pompoms
   *
   * @param {Number} length
   *
   * @return {Array}
   */
  static generatePompoms(length = 18) {
    return new Array(length).fill(null).map(() => Math.random() > 0.5);
  }

  constructor() {
    super();

    this.white = '';
    this.red = '';
    this.pompoms = this.constructor.generatePompoms();

    this.renderPompom = this.renderPompom.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { lines, answers } = nextProps;
    const current = this.props.answers.length;

    if (answers.length && answers.length > current) {
      answers.slice(current).forEach((success, index) => {
        const line = lines[index + current];
        const y = lines.length - (current + index + 1);
        this.append(success ? line : Generator.messUp(line), y);
      });
    } else if (answers.length < current) {
      this.reset();
    }
  }

  /**
   * Append the given pattern the the scarf
   *
   * @param {String} pattern
   */
  append(pattern, y) {
    Array.from(pattern).forEach((value, index) => {
      const crochet = Scarf.createCrochet(index, y);

      if (value === 'v') {
        this.white += crochet;
      } else {
        this.red += crochet;
      }
    });
  }

  /**
   * Reset scarf content
   */
  reset() {
    this.white = '';
    this.red = '';
    this.pompoms = this.constructor.generatePompoms();
  }

  /**
   * Render pompom
   *
   * @param {Boolean} reverse
   * @param {Number} index
   *
   * @return {Component}
   */
  renderPompom(reverse, index) {
    const scale = reverse ? -1 : 1;
    const width = (LINE * WIDTH) / this.pompoms.length;

    return (
      <use
        key={index}
        xlinkHref={`${pompom}#pompom`}
        x={index * width * scale - (reverse ? width : 0)}
        y={0}
        transform={`scale(${scale}, 1)`}
      ></use>
    );
  }

  render() {
    const { answers, lines } = this.props;
    const { pompoms, white, red } = this;
    const pompomHeight = 90;
    const end = lines.length > 0 && lines.length === answers.length;
    const patternHeight = lines.length * HEIGHT;
    const svgHeight = patternHeight + pompomHeight * 2;
    const currentHeight = (answers.length * HEIGHT) + (pompomHeight * (end ? 2 : 1));

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        height={currentHeight}
        preserveAspectRatio="xMidYMin slice"
        viewBox={`0 ${svgHeight - currentHeight - pompomHeight} ${LINE * WIDTH} ${currentHeight}`}
      >
        <rect id="background" x="3" y="8" width="714" height={Math.max(patternHeight - 12, 0)} fill="#681615" />
        <g id="knit-end" transform="translate(0, 12) scale(1, -1)">
          {pompoms.map(this.renderPompom)}
        </g>
        <g id="knit-start" transform={`translate(0, ${patternHeight - 8})`}>
          {pompoms.map(this.renderPompom)}
        </g>
        <path id="white" d={white} fill={COLOR_WHITE}></path>
        <path id="red" d={red} fill={COLOR_RED}></path>
      </svg>
    );
  }
}
