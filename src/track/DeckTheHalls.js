import deckTheHalls from '../../assets/audio/deck_the_halls.mp3';

export const title = 'Deck the Halls';
export const audio = deckTheHalls;
export const bpm = 95;
export const tempo = Math.round(60000 / 95);
export const delay = 98 + (tempo / 4);
export const warmup = [null, null, 1, '.', '.', '.', 2, '.', '.', '.', 3, '.', '.', '.', 1, 2, 3, 4];;
export const duration = 64500;
