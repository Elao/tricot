import * as DeckTheHalls from './DeckTheHalls';
import * as JoyToTheWorld from './JoyToTheWorld';
import * as SilentNight from './SilentNight';
import * as JingleBells from './JingleBells';

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

export default songs;
