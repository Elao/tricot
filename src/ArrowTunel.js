import React, { Component } from 'react';
import Key from './game/Key';

export default class ArrowTunel extends Component {
  constructor() {
    super();

    this.slider = null;

    this.renderArrow = this.renderArrow.bind(this);
    this.setSlider = this.setSlider.bind(this);
  }

  /**
   * Load Slider element
   *
   * @param {Element} slider
   */
  setSlider(slider) {
    this.slider = slider;
  }

  /**
   * Get slider CSS transition
   *
   * @return {String}
   */
  getSliderStyle() {
    const { current, arrows, tempo } = this.props;
    const height = this.slider ? this.slider.offsetHeight : 0;

    return {
      transform: `translateY(${(current / arrows.length) * height}px)`,
      transitionDuration: `${current < 0 ? 0 : tempo}ms`,
    };
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
      'icon arrow',
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
      <li key={`${arrow}-${index}`} className={classes.join(' ')}></li>
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
          ref={this.setSlider}
        >
          {arrows.map(this.renderArrow)}
        </ul>
      </div>
    );
  }
}
