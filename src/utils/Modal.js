import React, { Component } from 'react';

export default class Modal extends Component {
  constructor() {
    super();

    this.state = {
      open: false,
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    const { hash } = window.location;

    if (hash === `#${this.props.hash}`) {
      this.open();
    }
  }

  open() {
    this.setState({ open: true });
  }

  close() {
    this.setState({ open: false });
  }

  renderButton() {
    const { icon, label, hash } = this.props;

    return (
      <button className={`modal--${hash}--button ${icon ? `icon ${icon}` : ''}`} onClick={this.open}>
        {label || ''}
      </button>
    );
  }

  render() {
    const { open } = this.state;

    if (!open) {
      return this.renderButton();
    }

    const { hash, children } = this.props;

    return (
      <div>
        <div className="modal__blur"></div>
        <div className={`modal modal--${hash}`}>
          <button className="icon close" onClick={this.close}></button>
          {children}
        </div>
      </div>
    );
  }
}
