import React, { Component } from 'react';

export default class Scroller extends Component {
    constructor() {
        super();

        this.frame = null;
        this.now = null;
        this.previous = null;
        this.to = null;
        this.velocity = null;

        this.scroll = this.scroll.bind(this);
        this.update = this.update.bind(this);
    }

    get top() {
        return this.props.direction === 'top';
    }

    get bottom() {
        return this.props.direction === 'bottom';
    }

    /**
     * Get current Y scroll vzlue
     *
     * @return {Number}
     */
    getY() {
        return  window.pageYOffset || document.documentElement.scrollTop;
    }

    /**
     * Start scrolling
     */
    scroll() {
        if (!this.frame) {
            this.previous = null;
            this.to = this.top ? 0 : document.body.scrollHeight;
            this.velocity = (this.top ? -1 : 1) * this.props.speed;
            this.now = Date.now() - 1;
            this.frame = requestAnimationFrame(this.update);
        }
    }

    /**
     * Stop scrolling
     */
    stop() {
        if (this.frame) {
            cancelAnimationFrame(this.frame);
            this.frame = null;
        }
    }

    /**
     * Update
     */
    update() {
        this.frame = requestAnimationFrame(this.update);

        const { velocity, to, top, now, previous } = this;
        const current = this.getY();

        if (previous === current) {
            return this.stop();
        }

        this.now = Date.now();
        this.previous = current;

        const y = current + velocity * (this.now - now);

        window.scrollTo(0, Math[top ? 'max' : 'min'](y, to));
    }

    render() {
        const { direction } = this.props;
        const className = `scroller icon ${this.top ? 'select-open' : 'select-closed'}`;

        return <button type="button" className={className} onClick={this.scroll}></button>
    }
}
