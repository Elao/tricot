import React, { Component } from 'react';

export default class Fullscreen extends Component {

    static isAvailable() {
        const { fullscreenEnabled, webkitFullscreenEnabled, mozFullScreenEnabled, msFullscreenEnabled } = document;

        return fullscreenEnabled || webkitFullscreenEnabled || mozFullScreenEnabled || msFullscreenEnabled;
    }

    static isFullscreen() {
        const { fullscreenElement, webkitFullscreenElement, mozFullScreenElement, msFullscreenElement } = document;

        return !!(fullscreenElement || webkitFullscreenElement || mozFullScreenElement || msFullscreenElement);
    }

    static enter(target = document.documentElement) {
        if (typeof target.requestFullscreen === 'function') { return target.requestFullscreen(); }
        if (typeof target.webkitRequestFullscreen === 'function') { return target.webkitRequestFullscreen(); }
        if (typeof target.mozRequestFullScreen === 'function') { return target.mozRequestFullScreen(); }
        if (typeof target.msRequestFullscreen === 'function') { return target.msRequestFullscreen(); }
    }

    static exit(target = document) {
        if (typeof target.exitFullscreen === 'function') { return target.exitFullscreen(); }
        if (typeof target.webkitExitFullscreen === 'function') { return target.webkitExitFullscreen(); }
        if (typeof target.mozExitFullScreen === 'function') { return target.mozExitFullScreen(); }
        if (typeof target.mozCancelFullScreen === 'function') { return target.mozCancelFullScreen(); }
        if (typeof target.msExitFullscreen === 'function') { return target.msExitFullscreen(); }
    }

    constructor() {
        super();

        this.state = {
            available: false,
            fullscreen: false,
        };

        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({ available: this.constructor.isAvailable() });

        document.addEventListener('fullscreenchange', this.onChange);
        document.addEventListener('webkitfullscreenchange', this.onChange);
        document.addEventListener('mozfullscreenchange', this.onChange);
        document.addEventListener('MSFullscreenChange', this.onChange);
    }

    onChange() {
        this.setState({ fullscreen: this.constructor.isFullscreen() });
    }

    toggle() {
        const { isFullscreen, exit, enter } = this.constructor;

        return isFullscreen() ? exit() : enter();
    }

    render() {
        const { available, fullscreen } = this.state;

        if (!available) {
            return null;
        }

        return <button className={`fullscreen icon ${fullscreen ? 'fullscreen-off' : 'fullscreen-on'}`} onClick={this.toggle} />
    }
}
