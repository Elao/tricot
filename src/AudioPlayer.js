import React, { Component } from 'react';
import BELL from '../audio/bell.mp3';
import FIRE from '../audio/fire.mp3';
import WIND from '../audio/wind.mp3';
import SONG from '../audio/christmas_song.mp3';
import MERRY_CHRISTMAS from '../audio/merry_christmas.mp3';

export default class AudioPlayer extends Component {
  constructor() {
    super();

    this.state = {
      muted: null,
    };

    this.bellInterval = null;

    this.bell = new Audio(BELL);
    this.bellBis = new Audio(BELL);
    this.fire = new Audio(FIRE);
    this.wind = new Audio(WIND);
    this.song = new Audio(SONG);
    this.final = new Audio(MERRY_CHRISTMAS);

    this.fire.loop = true;
    this.wind.loop = true;
    this.song.loop = true;
    this.song.bpm = 130;
    this.bell.delay = 110;

    this.song.volume = 0.6;
    this.bell.volume = 0.8;
    this.bellBis.volume = 0.8;
    this.fire.volume = 1;
    this.wind.volume = 0.5;

    this.playBell = this.playBell.bind(this);
    this.toggle = this.toggle.bind(this);
    this.end = this.end.bind(this);
    this.onMute = this.onMute.bind(this);
  }

  componentDidMount() {
    this.mute(JSON.parse(localStorage.getItem('muted')) || false);

    this.fire.play();
    this.wind.play();
  }

  /**
   * Start the in-game song with the given tempo
   *
   * @param {Number} tempo
   * @param {Number} delay
   */
  start(tempo, delay = 0) {
    if (this.bellInterval) {
      return;
    }

    const { duration } = this.bell;

    this.bell.playbackRate = tempo / (duration * 1000);
    this.bellBis.playbackRate = this.bell.playbackRate;
    this.song.playbackRate = tempo / (60 / this.song.bpm * 1000);

    setTimeout(() => {
      this.song.play();
      this.bellInterval = setInterval(this.playBell, tempo);
    }, delay - this.bell.delay);
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

  /**
   * End
   */
  end() {
    if (this.bellInterval) {
      this.bellInterval = clearInterval(this.bellInterval);
    }

    this.final.play();
    this.song.pause();
  }

  /**
   * Mute / unmute the audio
   *
   * @param {Boolean} muted
   */
  mute(muted = !this.state.muted) {
    this.setState({ muted }, this.onMute);
  }

  /**
   * On mute changed
   */
  onMute() {
    const { muted } = this.state;

    this.bell.muted = muted;
    this.bellBis.muted = muted;
    this.fire.muted = muted;
    this.wind.muted = muted;
    this.song.muted = muted;
    this.final.muted = muted;

    localStorage.setItem('muted', JSON.stringify(muted));
  }

  /**
   * Toggle
   */
  toggle() {
    this.mute();
  }

  render() {
    const { muted } = this.state;

    return (<button className={`audio ${muted ? 'off' : 'on'}`} onClick={this.toggle} />);
  }
}
