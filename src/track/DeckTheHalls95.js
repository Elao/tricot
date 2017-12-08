import deckTheHalls from '../../assets/audio/deck_the_halls95.mp3';

export const title = 'Deck the Halls';
export const audio = deckTheHalls;
export const bpm = null;
export const tempo = Math.round(60000 / 95);
export const delay = 99 + (tempo / 4);
export const warmup = [null, null, 4, null, 3, null, 2, null, 1, null, 1, 2, 3, 4];
export const duration = Math.round(95 * (64000 / 60000));
