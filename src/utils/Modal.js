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
    const { icon, label } = this.props;

    return (
      <button type="button" className={icon ? `icon ${icon}` : ''} onClick={this.open}>
        {label || ''}
      </button>
    );
  }

  render() {
    const { open } = this.state;

    if (!open) {
      return null;
    }

    const { hash, children } = this.props;

    return (
      <div>
        <div className="modal__blur" onClick={this.close}></div>
        <div className={`modal modal--${hash}`}>
          <button type="button" className="icon close" onClick={this.close}></button>
          {children}
        </div>
      </div>
    );
  }
}
