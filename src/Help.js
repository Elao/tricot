import React, { Component } from 'react';

export default class Help extends Component {
  render() {
    return (
      <div className="rules">
        Appuyez sur
        <span className="icon arrow left"></span>
        <span className="icon arrow down"></span>
        <span className="icon arrow right"></span>
        pour commencer.
      </div>
    );
  }
}
