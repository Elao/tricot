import * as DeckTheHalls from './DeckTheHalls95';
import * as JoyToTheWorld from './JoyToTheWorld120';
import * as SilentNight from './SilentNight160';
import * as JingleBells from './JingleBells190';

const songs = [
  DeckTheHalls,
  JoyToTheWorld,
  SilentNight,
  JingleBells,
];

songs.sort((songA, songB) => {
  if (songA.tempo > songB.tempo) {
    return -1;
  }

  if (songA.tempo < songB.tempo) {
    return 1;
  }

  return 0;
});

songs.forEach((song, index) => song.difficulty = index + 1);

export default songs;
