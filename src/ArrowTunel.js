import React, { Component } from 'react';

export default class ArrowTunel extends Component {
  constructor() {
    super();

    this.renderArrow = this.renderArrow.bind(this);
  }

  /**
   * Render one arrows
   *
   * @param {String} arrow "up|down|left|right"
   * @param {Number} index
   *
   * @return {Component}
   */
  renderArrow(arrow, index) {
    return (<span key={`${arrow}-${index}`} className={`arrow ${arrow}`}></span>);
  }

  render() {
    return (
      <div className="arrow-tunnel">
        {this.props.arrows.map(this.renderArrow)}
        <div className="arrow-tunnel__highlight"></div>
      </div>
    );
  }
}
