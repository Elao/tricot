import React, { Component } from 'react';
import BELL from '../audio/bell.mp3';
import FIRE from '../audio/fire.mp3';
import WIND from '../audio/wind.mp3';
import SONG from '../audio/christmas_song.mp3';
import MERRY_CHRISTMAS from '../audio/merry_christmas.mp3';

export default class AudioPlayer extends Component {
  constructor() {
    super();

    this.bell = new Audio(BELL);
    this.bellBis = new Audio(BELL);
    this.fire = new Audio(FIRE);
    this.wind = new Audio(WIND);
    this.song = new Audio(SONG);
    this.final = new Audio(MERRY_CHRISTMAS);
    this.bellTrack = null;

    this.fire.loop = true;
    this.wind.loop = true;
    this.song.loop = true;
    this.song.bpm = 130;

    this.song.volume = 0.6;
    this.bell.volume = 0.8;
    this.bellBis.volume = 0.8;
    this.fire.volume = 1;
    this.wind.volume = 0.5;

    this.playBell = this.playBell.bind(this);
    this.stop = this.stop.bind(this);

    this.fire.play();
    this.wind.play();
  }

  start(tempo, delay = 0) {
    if (this.bellTrack) {
      return;
    }

    const { duration } = this.bell;

    this.bell.playbackRate = tempo / (duration * 1000);
    this.bellBis.playbackRate = this.bell.playbackRate;
    this.song.playbackRate = tempo / (60 / this.song.bpm * 1000);

    setTimeout(() => {
      this.song.play();
      this.bellTrack = setInterval(this.playBell, tempo);
    }, delay);
  }

  stop() {
    if (this.bellTrack) {
      this.bellTrack = clearInterval(this.bellTrack);
    }

    this.final.play();
    //this.fire.pause();
    //this.wind.pause();
    this.song.pause();
  }

  /**
   * Play bell
   */
  playBell() {
    const { ended, currentTime } = this.bell;

    if (currentTime === 0 || ended) {
      this.bell.play();
    } else {
      this.bellBis.play();
    }
  }

  render() {
    return null;
  }
}
