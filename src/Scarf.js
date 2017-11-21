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
  static createCrochet(x, y) {
    const pX = (x + 0.92) * WIDTH - 5 ;
    const pY = (y + 0.4) * -HEIGHT - 4;

    return `M ${pX} ${pY} a 2.8 8.5 -19 1 0 0 10 M ${pX} ${pY} a 2.8 8.5 19 1 1 0 10 z`;
  }

  constructor() {
    super();

    this.state = {
      x: LINE,
      y: -1,
      white: '',
      red: '',
      pompoms: [],
    };

    this.renderPompom = this.renderPompom.bind(this);
  }

  componentDidMount() {
    this.setState({
      pompoms: new Array(20).fill(null).map(value => Math.random() > 0.5)
    });
  }

  componentWillReceiveProps(nextProps) {
    const { lines, answers} = nextProps;
    const current = this.props.answers.length;

    if (answers.length && answers.length > current) {
      const content = answers
        .slice(current)
        .map((success, index) => success ? lines[index + current] : Generator.messUp(lines[index + current]))
        .join('');

      this.append(content);
    } else if (answers.length < current) {
      this.setState({
        x: LINE,
        y: -1,
        white: '',
        red: '',
      });
    }
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

  /**
   * Render pompom
   *
   * @param {Boolean} reverse
   * @param {Number} index
   *
   * @return {Component}
   */
  renderPompom(reverse, index) {
    const { answers } = this.props;
    const scale = reverse ? -1 : 1;
    const width = (LINE * WIDTH) / this.state.pompoms.length;

    return (
      <use
        key={index}
        xlinkHref={`${pompom}#pompom`}
        x={index * width * (reverse ? -1 : 1) - (reverse ? width : 0)}
        y={0}
        transform={`scale(${reverse ? -1 : 1}, 1)`}
      ></use>
    );
  }

  render() {
    const { tempo, answers, lines } = this.props;
    const { white, red, y, pompoms } = this.state;
    const pompomHeight = 90;
    const end = lines.length > 0 && lines.length === answers.length;
    const patternheight = answers.length * HEIGHT + 8;
    const svgHeight = patternheight + pompomHeight + (end ? pompomHeight : 0);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        height={svgHeight}
        preserveAspectRatio="xMidYMax slice"
        viewBox={`0 ${-(patternheight + (end ? pompomHeight : 0))} ${LINE * WIDTH} ${svgHeight}`}
      >
        <g id="knit-end" transform={`translate(0, ${-(lines.length * HEIGHT - 10)}) scale(1, -1)`}>
          {pompoms.map(this.renderPompom)}
        </g>
        <g id="knit-start" transform="translate(0, -10)">
          {pompoms.map(this.renderPompom)}
        </g>
        <rect id="background" x="3" y={11 - patternheight} width="714" height={Math.max(patternheight - 18, 0)} fill="#681615" />
        <path id="white" d={white} fill={COLOR_WHITE}></path>
        <path id="red" d={red} fill={COLOR_RED}></path>
      </svg>
    );
  }
}
