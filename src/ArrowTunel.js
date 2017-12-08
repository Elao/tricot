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
        transform: `translate3d(0, ${-height}vh, 0)`,
        transitionDuration: '0ms',
      };
    }

    const duration = arrows.length + warmup.length;

    return {
      transform: `translate3d(0, ${(duration - 1) * height}vh, 0)`,
      transitionDuration: `${duration * tempo}ms`,
    };
  }

  /**
   * Render one arrow
   *
   * @param {String} arrow
   * @param {Number} index
   *
   * @return {Component}
   */
  renderArrow(arrow, index) {
    const { answers } = this.props;
    let classeName = `icon arrow ${Key.getClass(arrow)}`;

    if (index < answers.length) {
      classeName = classeName.concat(answers[index] ? ' success' : ' error');
    }

    return <li key={`${arrow}-${index}`} className={classeName}></li>;
  }

  renderHighlight(arrow) {
    const { pressed, arrows, current, tempo } = this.props;
    const style = { animationDuration: `${tempo}ms` };
    let classeName = `icon arrow ${Key.getClass(arrow)}`;

    if (arrow !== pressed) {
      classeName = classeName.concat(` ${Key.getClass(arrow)}--empty`);
    }

    if (arrow === arrows[current]) {
      classeName = classeName.concat(' active');
    }

    return <li style={style} className={classeName}></li>;
  }

  renderCountdown(value, index) {
    const { current, warmup, tempo } = this.props;
    const style = { animationDelay: `${current !== null ? tempo * 0.5 : 0}ms` };
    let className = 'arrow countdown';

    if ((current !== null) && (current + warmup.length) >= index) {
      className = className.concat(' success');
    }

    return <li key={`countdown-${index}`} style={style} className={className}>{value}</li>;
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
