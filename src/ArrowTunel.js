import React, { Component } from 'react';
import Key from './game/Key';

export default class ArrowTunel extends Component {
  constructor() {
    super();

    this.state = {
      width: 0,
    };

    this.renderArrow = this.renderArrow.bind(this);
    this.loadWidth = this.loadWidth.bind(this);
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

  loadWidth(slider) {
    if (slider) {
      this.setState({ width: slider.offsetWidth });
    }
  }

  getSliderStyle() {
    const { current, arrows, tempo } = this.props;
    const { width } = this.state;

    return {
      marginRight: `${-(current / arrows.length) * width}px`,
      transitionDuration: `${current < 0 ? 0 : tempo}ms`,
    };
  }

  render() {
    return (
      <div className="arrow-tunnel">
        <div className="arrow-tunnel__highlight"></div>
        <ul
          className="arrow-tunnel__slider"
          style={this.getSliderStyle()}
          ref={this.loadWidth}
        >
          {this.props.arrows.map(this.renderArrow)}
        </ul>
      </div>
    );
  }
}
