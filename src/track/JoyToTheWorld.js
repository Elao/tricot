import joyToTheWorld from '../../assets/audio/joy_to_the_world.mp3';

export const title = 'Joy to the World';
export const audio = joyToTheWorld;
export const bpm = 85;
export const tempo = Math.round(60000 / 120);
export const delay = 98;
export const warmup = [3, null, null, null, 2, null, null, null, 1, null, null, null, 1, 2, 3, 4];
export const duration = Math.round(bpm * (78000 / 60000));
