import React, { Component } from 'react';
import Key from './game/Key';

export default class ArrowTunel extends Component {
  constructor() {
    super();

    this.renderArrow = this.renderArrow.bind(this);
    this.renderCountdown = this.renderCountdown.bind(this);
  }

  /**
   * Get slider CSS transition
   *
   * @return {String}
   */
  getSliderStyle(height = 20) {
    const { current, warmup, arrows, tempo } = this.props;

    if (current === null) {
      return {
        transform: `translate3d(0, ${(-height)}vh, 0)`,
        transitionDuration: '0ms',
      };
    }

    return {
      transform: `translateY(${((current + warmup) * height)}vh)`,
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

  renderCountdown(value, index) {
    const { current, warmup, tempo } = this.props;
    const classes = ['arrow countdown'];
    const style = { animationDelay: `${tempo * 0.5}ms` };

    if ((current + warmup) >= index) {
      classes.push('success');
    }

    return <li key={`countdown-${index}`} style={style} className={classes.join(' ')}>
      {index + 1}
    </li>;
  }

  render() {
    const { arrows, warmup, current } = this.props;

    return (
      <div className="arrow-tunnel">
        <ul className="arrow-tunnel__highlight">
          {this.renderHighlight(Key.LEFT)}
          {this.renderHighlight(Key.DOWN)}
          {this.renderHighlight(Key.RIGHT)}
        </ul>
        <ul className="arrow-tunnel__slider" style={this.getSliderStyle()}>
          {current !== null && new Array(warmup).fill(null).map(this.renderCountdown)}
          {arrows.map(this.renderArrow)}
        </ul>
      </div>
    );
  }
}
