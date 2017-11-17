import React, { Component } from 'react';
import Key from './game/Key';

export default class ArrowTunel extends Component {
  constructor() {
    super();

    this.renderArrow = this.renderArrow.bind(this);
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
    const { current } = this.props;
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

    return (
      <li key={`${arrow}-${index}`} className={classes.join(' ')}>
        <span>{Key.getSymbol(arrow)}</span>
      </li>
    );
  }

  getSliderStyle() {
    const { current } = this.props;

    return {
      marginRight: (current - 1) * -80,
    };
  }

  render() {
    return (
      <div className="arrow-tunnel">
        <div className="arrow-tunnel__highlight"></div>
        <ul className="arrow-tunnel__slider" style={this.getSliderStyle()}>
          {this.props.arrows.map(this.renderArrow)}
        </ul>
      </div>
    );
  }
}
