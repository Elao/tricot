import deckTheHalls from '../../assets/audio/deck_the_halls_95.mp3';

export const title = 'Deck the Halls';
export const audio = deckTheHalls;
export const bpm = null;
export const tempo = Math.round(60000 / 95);
export const delay = 99 + (tempo / 4);
export const warmup = [null, null, null, null, null, null, 1, 2, 3, 4];
export const duration = Math.round(95 * (64000 / 60000));
