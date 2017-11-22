import React, { Component } from 'react';
import Key from './game/Key';

export default class ArrowTunel extends Component {
  constructor() {
    super();

    this.renderArrow = this.renderArrow.bind(this);
  }

  /**
   * Get slider CSS transition
   *
   * @return {String}
   */
  getSliderStyle(height = 20) {
    const { current, arrows, tempo } = this.props;

    if (current === null) {
      return {
        transform: `translate3d(0, ${(-1 * height)}vh, 0)`,
        transitionDuration: '0ms',
      };
    }

    return {
      transform: `translateY(${(current * height)}vh)`,
      transitionDuration: `${arrows.length === 0 ? 0 : tempo}ms`,
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

  renderHighlight(arrow) {
    const { pressed } = this.props;
    const classes = [
      'icon arrow',
      Key.getClass(arrow),
      `${Key.getClass(arrow)}--empty`,
    ];

    if (arrow === pressed) {
      classes.push('active');
    }

    return <li className={classes.join(' ')}></li>;
  }

  render() {
    const { arrows } = this.props;

    return (
      <div className="arrow-tunnel">
        <ul className="arrow-tunnel__highlight">
          {this.renderHighlight(Key.LEFT)}
          {this.renderHighlight(Key.DOWN)}
          {this.renderHighlight(Key.RIGHT)}
        </ul>
        <ul className="arrow-tunnel__slider" style={this.getSliderStyle()}>
          {arrows.map(this.renderArrow)}
        </ul>
      </div>
    );
  }
}
