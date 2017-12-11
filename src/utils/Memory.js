export const MUTED = 'muted';
export const SONG = 'song';
export const SCORE = 'score';

/**
 * Is muted?
 *
 * @param {Boolean} defaultValue
 *
 * @return {Boolean}
 */
export function isMuted(defaultValue = false) {
    return JSON.parse(localStorage.getItem(MUTED)) || defaultValue;
}

/**
 * Set muted
 *
 * @param {Boolean} muted
 */
export function setMuted(muted) {
    localStorage.setItem(MUTED, JSON.stringify(muted));
}

/**
 * Get song index
 *
 * @param {Number} defaultValue
 *
 * @return {Number}
 */
export function getSong(defaultValue = 0) {
    return JSON.parse(localStorage.getItem(SONG)) || defaultValue;
}

/*
 * Set song index
 *
 * @param {Number} index
 *
 * @return {Number}
 */
export function setSong(index) {
    localStorage.setItem(SONG, JSON.stringify(index));
}

/**
 * Get score
 *
 * @param {Number} song
 *
 * @return {Number}
 */
export function getScore(song = getSong()) {
    return JSON.parse(localStorage.getItem(`${SCORE}-${song}`)) || 0;
}

/**
 * Set score
 *
 * @param {Number} score
 * @param {Number} song
 */
export function setScore(score, song = getSong()) {
    if (score < getScore(song)) {
        return;
    }

    localStorage.setItem(`${SCORE}-${song}`, JSON.stringify(score));
}
