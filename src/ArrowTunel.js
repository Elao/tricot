import React, { Component } from 'react';
import Key from './game/Key';

export default class ArrowTunel extends Component {
  constructor() {
    super();

    this.state = {
      width: 0,
    };

    this.renderArrow = this.renderArrow.bind(this);
    this.renderWarmup = this.renderWarmup.bind(this);
    this.loadWidth = this.loadWidth.bind(this);
  }

  /**
   * Load width from Slider element
   *
   * @param {Element} slider
   */
  loadWidth(slider) {
    if (slider) {
      this.setState({ width: slider.offsetWidth });
    }
  }

  /**
   * Get slider CSS transition
   *
   * @return {String}
   */
  getSliderStyle() {
    const { current, arrows, warmup, tempo } = this.props;
    const { width } = this.state;
    const x = current + warmup;

    return {
      marginRight: `${-(x / (arrows.length + warmup)) * width}px`,
      transitionDuration: `${x < 0 ? 0 : tempo}ms`,
    };
  }

  /**
   * Render warmup counter
   *
   * @param {null} value
   * @param {Number} index
   *
   * @return {Component}
   */
  renderWarmup(value, index) {
    const { warmup } = this.props;

    return (
      <li key={`warmup-${index}`} className="arrow warmup">
        <span>{warmup - index}</span>
      </li>
    );
  }

  /**
   * Render one arrows
   *
   * @param {String} arrow
   * @param {Number} index
   *
   * @return {Component}
   */
  renderArrow(arrow, index) {
    const { current, answers } = this.props;
    const classes = [
      'arrow',
      Key.getClass(arrow),
    ];

    if (index < current) {
      classes.push(`active`);
    }

    if (index === current) {
      classes.push(`current`);
    }

    if (index < answers.length) {
      classes.push(answers[index] ? 'success' : 'error');
    }

    return (
      <li key={`${arrow}-${index}`} className={classes.join(' ')}>
        <span>{Key.getSymbol(arrow)}</span>
      </li>
    );
  }

  render() {
    const { arrows } = this.props;

    return (
      <div className="arrow-tunnel">
        <div className="arrow-tunnel__highlight"></div>
        <ul
          className="arrow-tunnel__slider"
          style={this.getSliderStyle()}
          ref={this.loadWidth}
        >
          {new Array(this.props.warmup).fill(null).map(this.renderWarmup)}
          {arrows.map(this.renderArrow)}
        </ul>
      </div>
    );
  }
}
