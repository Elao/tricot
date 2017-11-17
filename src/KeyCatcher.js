import React, { Component } from 'react';

export default class KeyCatcher extends Component {
  constructor() {
    super();

    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  /**
   * On key down
   *
   * @param {Event} event
   */
  onKeyDown(event) {
    const { key } = event;
    const { keys, onKey } = this.props;

    if (!keys.accepts(key)) {
      return;
    }

    event.preventDefault();

    onKey(key);
  }

  render() {
    return null;
  }
}
