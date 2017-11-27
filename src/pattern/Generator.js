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
     * @param {Number} length Number of line to generate
     *
     * @return {Array}
     */
    static generate(length) {
        const lines = [...this.random(this.getValues(HERO))];
        let iteration = 1;

        while (lines.length < length) {
            const big = (iteration++ % 3 === 0);
            const type = big ? Object.assign({}, MEDIUM, BIG) :  Object.assign({}, SIMPLE, COMPOSED);
            const pool = this.getValues(type, (length - lines.length) / 2);
            const pattern = pool !== null ? this.random(pool) : one;

            lines.unshift(...pattern);
            lines.push(...pattern.reverse());
        }

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
    static messUp(line, errors = LINE / 10) {
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
     * @param {Array} spacer
     *
     * @return {Array}
     */
    static random(patterns, spacer = one) {
        const pattern = patterns[Math.floor(Math.random() * patterns.length)];

        return this.margin(pattern.slice(0).reverse(), spacer);
    }

    /**
     * Filter patterns values by size
     *
     * @param {Array} patterns
     * @param {Number} limit
     * @param {Array} spacer
     *
     * @return {Array|null}
     */
    static getValues(patterns, limit = null, spacer = one) {
        let values = Object.values(patterns);

        if (limit !== null) {
            values = values.filter(value => (value.length + (spacer.length * 2)) <= limit);
        }

        return values.length ? values : null;
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
