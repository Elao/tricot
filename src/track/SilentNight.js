import silentNight from '../../assets/audio/silent_night.mp3';

export const title = 'Silent Night';
export const audio = silentNight;
export const bpm = 175;
export const tempo = Math.round(60000 / 160);
export const delay = 90 + (tempo / 4);
export const warmup = [null, null, 1, null, 2, null, 1, 2, 3 ,4];
export const duration = 73000;
