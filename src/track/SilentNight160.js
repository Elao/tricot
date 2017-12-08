import silentNight from '../../assets/audio/silent_night_160.mp3';

export const title = 'Silent Night';
export const audio = silentNight;
export const bpm = null;
export const tempo = Math.round(60000 / 160);
export const delay = 102 + (tempo / 4);
export const warmup = [null, null, 1, null, 2, null, 1, 2, 3 ,4];
export const duration = Math.round(160 * (80000 / 60000));
