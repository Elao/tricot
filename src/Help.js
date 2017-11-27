import React, { Component } from 'react';

export default class Help extends Component {
  render() {
    return (
      <div className="rules">
        <span>
          Appuyez sur
          <span className="icon arrow left"></span>
          <span className="icon arrow down"></span>
          <span className="icon arrow right"></span>
        </span>
        <span>pour commencer.</span>
      </div>
    );
  }
}
