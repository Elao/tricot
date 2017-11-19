import { LINE } from './constants';
import { one, two } from './spacer';
import * as SIMPLE from './simple';
import * as COMPOSED from './composed';
import * as MEDIUM from './medium';
import * as BIG from './big';
import * as HERO from './hero';

export default class Generator {
    /**
     * Generate a full pattern
     *
     * @param {Number} composed
     *
     * @return {Array}
     */
    static generate(composed) {
        const lines = [];

        lines.push(
            ...this.random(SIMPLE),
            ...this.random(COMPOSED),
            ...this.random(MEDIUM),
            ...this.random(COMPOSED),
            ...this.random(SIMPLE),
            ...this.random(BIG),
            ...this.random(SIMPLE),
            ...this.random(COMPOSED),
            ...this.random(MEDIUM),
            ...this.random(COMPOSED),
            ...this.random(SIMPLE),
        );

        return lines;
    }

    /**
     * Mess up a line with the given number of errors
     *
     * @param {String} line
     * @param {Number} errors
     *
     * @return {String}
     */
    static messUp(line, errors = 3) {
        const messedUp = Array.from(line);

        for (let i = 0; i < errors; i++) {
            const index = Math.floor(Math.random() * messedUp.length);

            messedUp[index] = messedUp[index] === 'v' ? ' ' : 'v';
        }

        return messedUp.join('');
    }

    /**
     * Get a random pattern within the given set
     *
     * @param {Array} patterns
     *
     * @return {Array}
     */
    static random(patterns, spacer = one) {
        const values = Object.values(patterns);
        const pattern = values[Math.floor(Math.random() * values.length)];

        return this.margin(pattern.slice(0).reverse());
    }

    /**
     * Adds margin before and after the given pattern
     *
     * @param {Array} pattern
     * @param {Array} spacer
     *
     * @return {Array}
     */
    static margin(pattern, spacer = one) {
        return [
            ...spacer,
            ...pattern,
            ...spacer,
        ];
    }
}
