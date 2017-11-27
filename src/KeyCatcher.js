import React, { Component } from 'react';

export default class KeyCatcher extends Component {
  constructor() {
    super();

    this.key = null;

    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  /**
   * On key down
   *
   * @param {Event} event
   */
  onKeyDown(event) {
    const { key } = event;
    const { keys } = this.props;

    if (!keys.accepts(key)) {
      return;
    }

    event.preventDefault();

    this.setKey(key);
  }

  onKeyUp() {
    this.setKey(null);
  }

  setKey(key = null) {
    if (key !== this.key) {
      this.key = key;
      this.props.onKey(this.key);
    }
  }

  render() {
    return null;
  }
}
