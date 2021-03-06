import deckTheHalls from '../../assets/audio/deck_the_halls.mp3';

export const title = 'Deck the Halls';
export const audio = deckTheHalls;
export const bpm = 95;
export const tempo = Math.round(60000 / 95);
export const delay = 98 + (tempo / 4);
export const warmup = [null, null, 4, null, 3, null, 2, null, 1, null, 1, 2, 3, 4];
export const duration = Math.round(bpm * (64500 / 60000));
