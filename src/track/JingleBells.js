import jingleBells from '../../assets/audio/jinglebells.mp3';

export const title = 'Jingle Bells';
export const audio = jingleBells;
export const bpm = 98;
export const tempo = Math.round(60000 / 190);
export const delay = 106;
export const warmup = [1, null, 2, null, 1, 2, 3, 4];
export const duration = Math.round(bpm * (83000 / 60000));
