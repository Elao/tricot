import React, { Component } from 'react';
import * as Key from './game/Key';

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
      transform: `translateY(${((current + warmup.length) * height)}vh)`,
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
    const { answers } = this.props;
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
    const { pressed, arrows, current, tempo } = this.props;
    const expected = arrows[current];
    const style = { animationDuration: `${tempo}ms` };
    const classes = [
      'icon arrow',
      Key.getClass(arrow),
    ];

    if (arrow !== pressed) {
      classes.push(`${Key.getClass(arrow)}--empty`);
    }

    if (arrow === expected) {
      classes.push('active');
    }

    return <li style={style} className={classes.join(' ')}></li>;
  }

  renderCountdown(value, index) {
    const { current, warmup, tempo } = this.props;
    const classes = ['arrow countdown'];
    const style = { animationDelay: `${tempo * 0.5}ms` };

    if ((current + warmup.length) >= index) {
      classes.push('success');
    }

    return <li key={`countdown-${index}`} style={style} className={classes.join(' ')}>
      {value}
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
          {current !== null && warmup.map(this.renderCountdown)}
          {current !== null && arrows.map(this.renderArrow)}
        </ul>
      </div>
    );
  }
}
