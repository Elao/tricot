import React, { Component } from 'react';

export default class ShareButton extends Component {
  constructor() {
    super();

    this.clipboardDelay = 4000;
    this.clipboardTimeout = null;

    this.state = {
      linkIsCopied: false,
    };

    this.copyLinkToClipboard = this.copyLinkToClipboard.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.clipboardTimeout);
  }

  componentDidUpdate(prevProps) {
    const { link } = this.props;

    if (prevProps.link === link) {
      return;
    }

    if (link) {
      this.copyLinkToClipboard();
    }
  }

  /**
   * @param {Object} event
   */
  copyLinkToClipboard(event) {
    if (event) {
      event.preventDefault();
    }

    // Copy the link url to clipboard
    this.textLink.select();
    const isCopied = document.execCommand('copy');

    this.fadeClipboardLabel(isCopied);
  }

  /**
   * @param {Boolean} isCopied
   */
  fadeClipboardLabel(isCopied) {
    clearTimeout(this.clipboardTimeout);

    this.setState({ linkIsCopied: isCopied }, () => {
      this.clipboardTimeout = setTimeout(() => this.setState({ linkIsCopied: false }), this.clipboardDelay);
    });
  }

  render() {
    const { getLink, link, shared } = this.props;
    const { linkIsCopied } = this.state;

    if (shared) {
      return null;
    }

    if (link) {
      return (
        <div className="share-button share-button--box">
          <p className="share-button__link">
            <a className="icon past" onClick={this.copyLinkToClipboard} />
            <input
              className="share-button__clipboard"
              ref={(input) => { this.textLink = input; }}
              defaultValue={link}
            />
          </p>
          <div className={`clipboard-label clipboard-label--${linkIsCopied ? 'show' : 'hide'}`}>
            <span>Le lien a été copié dans le presse-papier !</span>
          </div>
        </div>
      );
    }

    return (
      <div className="share-button">
        <button type="button" className="share-button__button" onClick={getLink}>
          <span className="icon link"></span>
          Partager mon e-charpe
        </button>
      </div>
    );
  }
}
