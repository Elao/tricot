import { encode, decode } from 'base64-arraybuffer';
import { LINE } from './constants';
import Dictionary from './Dictionary';
import Songs from '../track';
import { one } from './spacer';
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

    /**
     * Load a scarf from Base64 string
     *
     * @param {String} base64
     *
     * @return {Object}
     */
    static load(base64) {
        const buffer = decode(base64);
        const song = new Int16Array(buffer, 0, 2)[0];
        const view = new Int16Array(buffer, 2);
        const lines = [];
        const answers = [];

        if (song < 0 || song >= Songs.length) {
            throw new Error('Invalid song');
        }

        Array.from(view).forEach((lineNumber, index) => {
            answers[index] = lineNumber >= 0;
            lines[index] = Dictionary[Math.abs(lineNumber) - 1];

            if (typeof lines[index] === 'undefined') {
                throw new Error('Invalid pattern');
            }
        });

        return { song, lines, answers };
    }

    /**
     * Export a scarf to Base64 string
     *
     * @param {Number} song
     * @param {Array} lines
     * @param {Array} answers
     *
     * @return {String}
     */
    static export(song, lines, answers = []) {
        const buffer = new ArrayBuffer((1 + lines.length) * 2);
        const songView = new Int16Array(buffer, 0, 2);
        const view = new Int16Array(buffer, 2);

        songView[0] = song;

        lines.forEach((line, index) => {
            const success = typeof answers[index] === 'boolean' && answers[index];
            const lineNumber = Dictionary.indexOf(line) + 1;

            view[index] = lineNumber * (success ? 1 : -1);
        });

        return encode(buffer);
    }
}
