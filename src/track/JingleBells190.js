import jingleBells from '../../assets/audio/jinglebells_190.mp3';

export const title = 'Jingle Bells';
export const audio = jingleBells;
export const bpm = null;
export const tempo = Math.round(60000 / 190);
export const delay = 150;
export const warmup = [1, null, 2, null, 1, 2, 3, 4];
export const duration = Math.round(190 * (63000 / 60000));
